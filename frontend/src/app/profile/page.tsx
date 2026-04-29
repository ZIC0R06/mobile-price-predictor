"use client";

import { motion } from "framer-motion";
import { 
  User, Settings, History, Bookmark, 
  ArrowLeft, Smartphone, Zap, ShieldCheck, Mail, MapPin, Loader2
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/history`);
        const data = await res.json();
        setHistory(data.slice(0, 10)); // Just the last 10 for profile
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
          </Link>
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <Settings className="w-5 h-5 text-white/40" />
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: User Card */}
          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 rounded-[3rem] glass border-white/10 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-indigo-600/20 to-transparent" />
              <div className="relative z-10">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto mb-6 border-4 border-[#050505] flex items-center justify-center text-3xl font-black italic">
                  JD
                </div>
                <h2 className="text-3xl font-black tracking-tight mb-2">John Doe</h2>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-white/30 mb-8">Premium Reseller</p>
                
                <div className="flex flex-col gap-4 text-left">
                  <div className="flex items-center gap-4 text-white/40 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>john.doe@resell.pro</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/40 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Silicon Valley, CA</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5">
               <h4 className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-6">Subscription Tier</h4>
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                   <span className="font-bold">Neural Pro Plan</span>
                 </div>
                 <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest underline cursor-pointer">Upgrade</span>
               </div>
            </div>
          </div>

          {/* Right Column: History & Stats */}
          <div className="lg:col-span-2 space-y-12">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { label: "Queries", value: history.length, icon: Smartphone },
                { label: "Saved", value: "12", icon: Bookmark },
                { label: "Accuracy", value: "98%", icon: ShieldCheck },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 flex flex-col gap-2">
                  <stat.icon className="w-4 h-4 text-indigo-400" />
                  <p className="text-2xl font-black tracking-tight">{stat.value}</p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/20">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* History Section */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black tracking-tighter flex items-center gap-3">
                  <History className="w-6 h-6 text-indigo-500" />
                  PERSONAL HISTORY
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Showing Last 10</span>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="flex justify-center p-20"><Loader2 className="w-8 h-8 animate-spin text-white/10" /></div>
                ) : (
                  history.map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between group hover:bg-white/[0.04] transition-all"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center font-black text-indigo-400 italic">
                          {item.brand[0]}
                        </div>
                        <div>
                          <p className="font-bold text-white tracking-tight">{item.brand}</p>
                          <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.1em]">{item.market_category} • {item.ram_gb}GB</p>

                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-white italic">₹{item.predicted_price.toLocaleString()}</p>
                        <p className="text-[10px] text-white/20 font-medium uppercase tracking-widest">{new Date(item.created_at).toLocaleDateString()}</p>
                      </div>
                    </motion.div>
                  ))
                )}
                {!loading && history.length === 0 && (
                  <div className="text-center p-20 glass rounded-3xl border-dashed border-white/5">
                    <p className="text-white/20 font-bold uppercase tracking-widest">No activity found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
