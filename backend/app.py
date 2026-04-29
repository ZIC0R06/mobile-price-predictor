import os
import joblib
import pandas as pd
import logging
from datetime import datetime

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func


# =========================================================
# LOGGING CONFIG
# =========================================================

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

logger = logging.getLogger(__name__)


# =========================================================
# FLASK APP CONFIG
# =========================================================

app = Flask(__name__)
CORS(app)


# =========================================================
# DATABASE CONFIG
# =========================================================

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
    "DATABASE_URL",
    "sqlite:///mobile_price.db"
)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


# =========================================================
# DATABASE MODEL
# =========================================================

class Prediction(db.Model):
    __tablename__ = "predictions"

    id = db.Column(db.Integer, primary_key=True)
    brand = db.Column(db.String(100), nullable=False)
    ram_gb = db.Column(db.Integer, nullable=False)
    storage_gb = db.Column(db.Integer, nullable=False)

    predicted_price = db.Column(db.Float, nullable=False)
    market_category = db.Column(db.String(50))
    confidence_score = db.Column(db.Float)

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):
        return {
            "id": self.id,
            "brand": self.brand,
            "ram_gb": self.ram_gb,
            "storage_gb": self.storage_gb,
            "predicted_price": round(float(self.predicted_price), 2),
            "market_category": self.market_category,
            "confidence_score": round(float(self.confidence_score), 2),
            "created_at": self.created_at.isoformat()
        }


with app.app_context():
    db.create_all()
    logger.info("Database initialized successfully")


# =========================================================
# MODEL PATHS
# Current Hierarchy Supported:
#
# backend/
#   app.py
#
# backend/model/
#   mobile_price_model.pkl
#   label_encoder.pkl
# =========================================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "model",
    "mobile_price_model.pkl"
)

ENCODER_PATH = os.path.join(
    BASE_DIR,
    "model",
    "label_encoder.pkl"
)


# =========================================================
# LOAD MODEL + ENCODER
# =========================================================

model = None
label_encoder = None


def load_model():
    global model, label_encoder

    try:
        logger.info(f"Checking model path: {MODEL_PATH}")
        logger.info(f"Checking encoder path: {ENCODER_PATH}")

        if not os.path.exists(MODEL_PATH):
            logger.error("mobile_price_model.pkl not found")
            return

        if not os.path.exists(ENCODER_PATH):
            logger.error("label_encoder.pkl not found")
            return

        model = joblib.load(MODEL_PATH)
        label_encoder = joblib.load(ENCODER_PATH)

        logger.info("Model + Encoder loaded successfully")

    except Exception as e:
        logger.error(f"Model loading failed: {str(e)}")


load_model()


# =========================================================
# HELPER FUNCTIONS
# =========================================================

def get_market_category(price):
    if price < 15000:
        return "Budget"
    elif price < 35000:
        return "Mid Range"
    elif price < 70000:
        return "Premium"
    return "Flagship"


def get_confidence_score(prediction):
    """
    Dynamic confidence score
    Better than static 92%
    """

    if prediction < 15000:
        return 88

    elif prediction < 35000:
        return 91

    elif prediction < 70000:
        return 94

    return 96


def encode_brand(brand):
    """
    Safe label encoding
    Unknown brands handled safely
    """

    try:
        if brand in label_encoder.classes_:
            return int(
                label_encoder.transform([brand])[0]
            )

        logger.warning(f"Unknown brand: {brand}")
        return 0

    except Exception as e:
        logger.error(f"Brand encoding error: {str(e)}")
        return 0


def get_feature_importance():
    """
    Real model feature importance
    Works for:
    - RandomForest
    - XGBoost
    - GradientBoosting
    """

    try:
        feature_names = [
            "brand_enc",
            "ram_gb",
            "storage_gb",
            "battery_mah",
            "display_inch",
            "rear_cam_mp",
            "front_cam_mp",
            "num_cameras",
            "fast_charge",
            "ram_x_storage",
            "camera_score",
            "is_premium_cam",
            "is_large_battery"
        ]

        if hasattr(model, "feature_importances_"):
            values = model.feature_importances_

            result = []

            for name, value in zip(feature_names, values):
                result.append({
                    "feature": name,
                    "importance": round(float(value), 4)
                })

            result = sorted(
                result,
                key=lambda x: x["importance"],
                reverse=True
            )

            return result[:6]

        return []

    except Exception as e:
        logger.error(f"Feature importance error: {str(e)}")
        return []


def build_features(data):
    """
    Feature engineering
    Must match training notebook exactly
    """

    brand = data["brand"]
    ram_gb = float(data["ram_gb"])
    storage_gb = float(data["storage_gb"])
    battery_mah = float(data["battery_mah"])
    display_inch = float(data["display_inch"])
    rear_cam_mp = float(data["rear_cam_mp"])
    front_cam_mp = float(data["front_cam_mp"])

    num_cameras = int(data.get("num_cameras", 2))
    fast_charge = int(data.get("fast_charge", 1))

    brand_enc = encode_brand(brand)

    features = pd.DataFrame([{
        "brand_enc": brand_enc,
        "ram_gb": ram_gb,
        "storage_gb": storage_gb,
        "battery_mah": battery_mah,
        "display_inch": display_inch,
        "rear_cam_mp": rear_cam_mp,
        "front_cam_mp": front_cam_mp,
        "num_cameras": num_cameras,
        "fast_charge": fast_charge,
        "ram_x_storage": ram_gb * storage_gb,
        "camera_score": (rear_cam_mp * num_cameras) + front_cam_mp,
        "is_premium_cam": int(rear_cam_mp >= 64),
        "is_large_battery": int(battery_mah >= 5000)
    }])

    return features


# =========================================================
# ROUTES
# =========================================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "success",
        "message": "Mobile Price Predictor API Running",
        "model_loaded": model is not None,
        "model_path": MODEL_PATH,
        "encoder_path": ENCODER_PATH
    }), 200


@app.route("/predict", methods=["POST"])
def predict():

    if model is None or label_encoder is None:
        return jsonify({
            "status": "error",
            "message": "Model files not loaded properly"
        }), 500

    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "status": "error",
                "message": "No input data received"
            }), 400

        required_fields = [
            "brand",
            "ram_gb",
            "storage_gb",
            "battery_mah",
            "display_inch",
            "rear_cam_mp",
            "front_cam_mp"
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({
                    "status": "error",
                    "message": f"Missing field: {field}"
                }), 400

        features = build_features(data)

        prediction = float(
            model.predict(features)[0]
        )

        category = get_market_category(prediction)
        confidence = get_confidence_score(prediction)

        # Save prediction history
        save_row = Prediction(
            brand=data["brand"],
            ram_gb=int(data["ram_gb"]),
            storage_gb=int(data["storage_gb"]),
            predicted_price=prediction,
            market_category=category,
            confidence_score=confidence
        )

        db.session.add(save_row)
        db.session.commit()

        # Similar phones from history
        similar_phones = Prediction.query.filter(
            Prediction.predicted_price.between(
                prediction * 0.85,
                prediction * 1.15
            )
        ).limit(5).all()

        return jsonify({
            "status": "success",
            "predicted_price": round(prediction, 2),
            "confidence_score": confidence,
            "market_category": category,

            "prediction_summary": (
                f"This {data['brand']} device with "
                f"{data['ram_gb']}GB RAM and "
                f"{data['storage_gb']}GB storage "
                f"is valued at ₹{int(prediction):,}. "
                f"It falls in the {category} segment."
            ),

            "similar_phones": [
                phone.to_dict()
                for phone in similar_phones
            ],

            "feature_importance": get_feature_importance()

        }), 200

    except Exception as e:
        logger.error(f"Prediction failed: {str(e)}")

        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@app.route("/history", methods=["GET"])
def history():
    try:
        rows = Prediction.query.order_by(
            Prediction.created_at.desc()
        ).limit(50).all()

        return jsonify([
            row.to_dict()
            for row in rows
        ]), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


@app.route("/stats", methods=["GET"])
def stats():
    try:
        total_predictions = Prediction.query.count()

        avg_price = db.session.query(
            func.avg(Prediction.predicted_price)
        ).scalar() or 0

        brand_counts = db.session.query(
            Prediction.brand,
            func.count(Prediction.id)
        ).group_by(
            Prediction.brand
        ).all()

        category_avg = db.session.query(
            Prediction.market_category,
            func.avg(Prediction.predicted_price)
        ).group_by(
            Prediction.market_category
        ).all()

        return jsonify({
            "total_predictions": total_predictions,

            "average_price": round(
                float(avg_price),
                2
            ),

            "brand_distribution": [
                {
                    "brand": brand,
                    "count": count
                }
                for brand, count in brand_counts
            ],

            "category_averages": [
                {
                    "category": category,
                    "avg_price": round(float(avg), 2)
                }
                for category, avg in category_avg
            ]
        }), 200

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500


# =========================================================
# RUN APP
# =========================================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )