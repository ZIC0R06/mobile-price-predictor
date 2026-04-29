"use client";

import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, Cpu, Battery, Maximize2, Camera, Box, ArrowLeft, 
  Loader2, CheckCircle2, TrendingUp, AlertCircle, Info, Zap, 
  Download, Copy, ShieldCheck, BarChart3, PieChart
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import dynamic from 'next/dynamic';

// We can use standard imports for Recharts now that the SSR crash is handled by the mounted check
import { 
  BarChart, Bar, Tooltip, ResponsiveContainer, Cell, PieChart as RePieChart, Pie 
} from 'recharts';

// --- Constants ---
const BRANDS = ["Samsung", "Apple", "Xiaomi", "OnePlus", "Oppo", "Vivo", "Realme", "Nokia", "Motorola", "Google"];
const RAM_OPTIONS = [2, 4, 6, 8, 12, 16, 24, 32, 64];
const STORAGE_OPTIONS = [32, 64, 128, 256, 512, 1024, 2048];
const MARKET_DATA = [
  { category: 'Budget', price: 15000, color: '#94a3b8', isTarget: false },
  { category: 'Mid-Range', price: 35000, color: '#6366f1', isTarget: false },
  { category: 'Premium', price: 70000, color: '#a855f7', isTarget: false },
  { category: 'Flagship', price: 120000, color: '#ec4899', isTarget: false },
];

export default function PredictPage() {
  const resultRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    brand: "Samsung", ram_gb: 8, storage_gb: 128, battery_mah: 5000,
    display_inch: 6.5, rear_cam_mp: 64, front_cam_mp: 16
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "brand" ? value : Number(value) }));
  };

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.status === "success") {
        setTimeout(() => {
          setResult(data);
          setLoading(false);
        }, 1200);
      } else {
        throw new Error(data.message);
      }
    } catch (err: any) {
      setError(err.message || "Engine Error");
      setLoading(false);
    }
  };

  const exportPDF = async () => {
    if (!resultRef.current) return;
    
    // Dynamic import to avoid SSR issues
    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const canvas = await html2canvas(resultRef.current, { backgroundColor: '#050505', scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`valuation-${formData.brand}.pdf`);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12 selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl glass flex items-center justify-center group-hover:bg-white/10 transition-all">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Neural Terminal</span>
          </Link>
          <div className="flex gap-4">
             <Link href="/dashboard" className="px-5 py-2 rounded-xl glass text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-all">Analytics</Link>
             <Link href="/pricing" className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/20">Pro Plan</Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Input Panel */}
          <div className="space-y-12">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
               <h1 className="text-6xl font-black tracking-tighter mb-4 leading-none">VALUATE <br/><span className="text-indigo-500">ASSETS</span>.</h1>
               <p className="text-white/30 font-medium leading-relaxed max-w-sm">Input hardware specifications to trigger the neural valuation engine.</p>
            </motion.div>

            <form onSubmit={handlePredict} className="glass-card p-10 space-y-8 border-white/10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="md:col-span-2 space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Brand Identity</label>
                   <select name="brand" value={formData.brand} onChange={handleInputChange} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-bold appearance-none">
                     {BRANDS.map(b => <option key={b} value={b} className="bg-[#111]">{b}</option>)}
                   </select>
                 </div>
                 {[
                   { name: "ram_gb", label: "RAM (GB)", icon: Cpu, type: "select", options: RAM_OPTIONS },
                   { name: "storage_gb", label: "Storage (GB)", icon: Box, type: "select", options: STORAGE_OPTIONS },
                   { name: "battery_mah", label: "Battery (mAh)", icon: Battery, type: "number" },
                   { name: "display_inch", label: "Display (Inches)", icon: Maximize2, type: "number", step: "0.1" },
                   { name: "rear_cam_mp", label: "Rear Camera (MP)", icon: Camera, type: "number" },
                   { name: "front_cam_mp", label: "Front Camera (MP)", icon: Smartphone, type: "number" },
                 ].map((field) => (
                   <div key={field.name} className="space-y-2">
                     <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 flex items-center gap-2">
                       <field.icon className="w-3 h-3" /> {field.label}
                     </label>
                     {field.type === "select" ? (
                       <select 
                         name={field.name} value={(formData as any)[field.name]} onChange={handleInputChange}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-bold appearance-none focus:border-indigo-500/50 transition-all"
                       >
                         {field.options?.map(opt => <option key={opt} value={opt} className="bg-[#111]">{opt === 1024 ? "1TB" : opt === 2048 ? "2TB" : `${opt} GB`}</option>)}
                       </select>
                     ) : (
                       <input 
                         type="number" step={field.step || "1"} name={field.name} 
                         value={(formData as any)[field.name]} onChange={handleInputChange}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 font-bold focus:border-indigo-500/50 transition-all"
                       />
                     )}
                   </div>
                 ))}
               </div>
               <button 
                 type="submit" disabled={loading}
                 className="w-full bg-indigo-600 hover:bg-indigo-500 py-6 rounded-2xl font-black text-white shadow-2xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-4 active:scale-[0.98]"
               >
                 {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Zap className="w-5 h-5 fill-white" /> EXECUTE INFERENCE</>}
               </button>
            </form>
          </div>

          {/* Result Panel */}
          <div className="relative min-h-[600px]">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div key="skeleton" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-8 glass-card p-10 border-white/5">
                  <div className="h-4 w-32 bg-white/5 rounded-full animate-pulse" />
                  <div className="h-20 w-full bg-white/10 rounded-2xl animate-pulse" />
                  <div className="grid grid-cols-2 gap-6"><div className="h-24 bg-white/5 rounded-3xl animate-pulse" /><div className="h-24 bg-white/5 rounded-3xl animate-pulse" /></div>
                  <div className="h-64 bg-white/[0.02] rounded-[3rem] animate-pulse" />
                </motion.div>
              )}

              {result && (
                <motion.div ref={resultRef} key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                  <div className="glass-card p-10 border-indigo-500/30 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 flex gap-3">
                       <button onClick={exportPDF} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><Download className="w-4 h-4" /></button>
                       <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"><Copy className="w-4 h-4" /></button>
                    </div>

                    <div className="space-y-8">
                       <div>
                         <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Neural Valuation Output</p>
                         <h2 className="text-8xl font-black italic tracking-tighter">₹{result.predicted_price.toLocaleString()}</h2>
                       </div>
                       <div className="grid grid-cols-2 gap-6">
                         <div className="p-6 rounded-3xl bg-indigo-500/10 border border-indigo-500/20">
                            <TrendingUp className="w-4 h-4 text-indigo-400 mb-2" />
                            <p className="text-2xl font-black">{result.market_category}</p>
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Market Segment</p>
                         </div>
                         <div className="p-6 rounded-3xl bg-purple-500/10 border border-purple-500/20">
                            <ShieldCheck className="w-4 h-4 text-purple-400 mb-2" />
                            <p className="text-2xl font-black">{Number(result.confidence_score).toFixed(1)}%</p>
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Confidence Index</p>
                         </div>
                       </div>
                       <p className="text-sm text-white/40 leading-relaxed italic">"{result.prediction_summary}"</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Feature Importance */}
                    <div className="glass-card p-8">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2"><PieChart className="w-3 h-3" /> Hardware Weightage</h4>
                      <div className="h-40 w-full">
                         {mounted && (
                          <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                              <Pie 
                                data={result.feature_importance} 
                                dataKey="importance" 
                                nameKey="feature" 
                                innerRadius={40} 
                                outerRadius={60} 
                                paddingAngle={5}
                                stroke="none"
                              >
                                {result.feature_importance.map((_: any, i: number) => (
                                  <Cell key={`cell-${i}`} fill={['#818cf8', '#c084fc', '#f472b6', '#fb7185', '#fbbf24', '#34d399'][i % 6]} />
                                ))}
                              </Pie>
                              <Tooltip 
                                contentStyle={{backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px', fontSize: '10px'}}
                                itemStyle={{color: '#fff', fontSize: '10px', textTransform: 'capitalize'}}
                              />
                            </RePieChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>

                    {/* Market Position */}
                    <div className="glass-card p-8">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-6 flex items-center gap-2"><BarChart3 className="w-3 h-3" /> Market Index</h4>
                      <div className="h-40 w-full">
                         {mounted && (
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[...MARKET_DATA, { category: 'YOU', price: result.predicted_price, isTarget: true, color: "#6366f1" }].sort((a,b)=>a.price-b.price)}>
                              <Bar dataKey="price" radius={[4,4,0,0]}>
                                {[...MARKET_DATA, { category: 'YOU', price: result.predicted_price, isTarget: true }].sort((a,b)=>a.price-b.price).map((entry, i) => (
                                  <Cell key={`bar-${i}`} fill={entry.isTarget ? '#6366f1' : (entry as any).color || '#444'} fillOpacity={entry.isTarget ? 1 : 0.3} />
                                ))}
                              </Bar>
                              <Tooltip 
                                cursor={{fill: 'transparent'}}
                                contentStyle={{backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px', fontSize: '10px'}}
                                formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, 'Price']}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Similar suggestions */}
                  <div className="space-y-4">
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-2">Contextual Benchmarks</h4>
                     <div className="grid grid-cols-1 gap-3">
                       {result.similar_phones.map((item: any, i: number) => (
                         <div key={i} className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex justify-between items-center group hover:bg-white/[0.05] transition-all">
                           <div className="flex items-center gap-4">
                             <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center font-black text-xs text-indigo-400 italic">{item.brand[0]}</div>
                             <span className="font-bold text-sm">{item.brand} <span className="text-white/20 font-medium">({item.ram_gb}GB/{item.storage_gb}GB)</span></span>
                           </div>
                           <span className="font-black text-sm text-indigo-400">₹{item.predicted_price.toLocaleString()}</span>
                         </div>
                       ))}
                     </div>
                  </div>
                </motion.div>
              )}

              {!loading && !result && (
                <div className="h-full flex flex-col items-center justify-center space-y-8 glass-card border-dashed border-white/10 opacity-30">
                   <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"><Zap className="w-10 h-10 text-white/10" /></div>
                   <div className="text-center"><p className="text-[10px] font-black uppercase tracking-[0.3em]">Engine Standby</p><p className="text-xs text-white/20 mt-2 italic font-medium">Execute inference to visualize neural insights.</p></div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
