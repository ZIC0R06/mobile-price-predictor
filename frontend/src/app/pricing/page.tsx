"use client";

import { motion } from "framer-motion";
import { Smartphone, Check, Zap, Star, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "0",
      desc: "For hobbyists and explorers",
      features: ["5 Predictions / day", "Basic Analytics", "Global Brand Access", "Community Support"],
      button: "Get Started",
      premium: false
    },
    {
      name: "Neural Pro",
      price: "29",
      desc: "For professional resellers",
      features: ["Unlimited Predictions", "Advanced Neural Insights", "Export valuation PDF", "Priority API Access", "24/7 Premium Support"],
      button: "Upgrade Now",
      premium: true
    },
    {
      name: "Enterprise",
      price: "99",
      desc: "For large retail chains",
      features: ["Custom Model Training", "Bulk Batch Processing", "Team Analytics Dashboard", "SLA Guarantee", "Dedicated Account Manager"],
      button: "Contact Sales",
      premium: false
    }
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Nav */}
        <header className="flex justify-between items-center mb-24">
          <Link href="/" className="flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-white" />
            <span className="font-bold text-xl tracking-tighter">Mobile<span className="text-indigo-400">Predict</span></span>
          </Link>
          <Link href="/dashboard" className="text-xs font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Dashboard</Link>
        </header>

        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-black text-indigo-400 mb-6"
          >
            <Zap className="w-3.5 h-3.5 fill-indigo-400" />
            <span>TRANSPARENT PRICING</span>
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">CHOOSE YOUR <br/> <span className="text-indigo-500">POWER</span>.</h1>
          <p className="text-white/40 text-lg max-w-xl mx-auto font-medium">Unlock the full potential of our neural valuation engine with precision-engineered plans.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`p-10 rounded-[3rem] border transition-all duration-500 ${
                plan.premium 
                ? "bg-indigo-600 border-indigo-400 shadow-2xl shadow-indigo-600/20 scale-105" 
                : "bg-white/[0.02] border-white/[0.08] hover:border-white/[0.2] hover:bg-white/[0.03]"
              }`}
            >
              {plan.premium && (
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-widest text-white">Most Popular</span>
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
              )}
              <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
              <p className={`text-sm mb-8 font-medium ${plan.premium ? "text-white/80" : "text-white/30"}`}>{plan.desc}</p>
              
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-5xl font-black">₹{plan.price}</span>
                <span className={`text-xs font-bold uppercase tracking-widest ${plan.premium ? "text-white/60" : "text-white/20"}`}>/ month</span>
              </div>

              <div className="space-y-5 mb-12">
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.premium ? "bg-white/20" : "bg-indigo-500/10"}`}>
                      <Check className={`w-3 h-3 ${plan.premium ? "text-white" : "text-indigo-400"}`} />
                    </div>
                    <span className={`text-sm font-medium ${plan.premium ? "text-white" : "text-white/70"}`}>{f}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-5 rounded-2xl font-black text-sm transition-all active:scale-[0.98] ${
                plan.premium 
                ? "bg-white text-indigo-600 shadow-xl" 
                : "bg-white/[0.05] border border-white/[0.1] text-white hover:bg-white/[0.1]"
              }`}>
                {plan.button}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Proof */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 opacity-30">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Bank-level Security</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">No Hidden Fees</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">Cancel Anytime</span>
          </div>
        </div>
      </div>
    </main>
  );
}
