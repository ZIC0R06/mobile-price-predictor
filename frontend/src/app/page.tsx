"use client";

import { motion } from "framer-motion";
import { Smartphone, Cpu, Gauge, ShieldCheck, ArrowRight, Zap, BarChart3, Globe, Layers, ZapIcon, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <main className="relative min-h-screen flex flex-col items-center bg-[#050505] text-white overflow-x-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50 glass border-none">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">
            Mobile<span className="text-indigo-400">Predict</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/50">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <Link href="/profile" className="hover:text-white transition-colors">Profile</Link>
        </div>
        <Link href="/predict">
          <button className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-all active:scale-95 shadow-xl">
            Start Predicting
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl w-full px-6 pt-40 pb-20 flex flex-col lg:flex-row items-center gap-20">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-semibold text-indigo-400 mb-8 backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 fill-indigo-400" />
              <span>v2.0 — Now with Neural Engine Integration</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.95] bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
              VALUATE ANY <br />
              <span className="text-indigo-500">MOBILE</span> INSTANTLY.
            </h1>
            <p className="text-xl text-white/40 mb-12 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Our advanced machine learning models analyze over 15+ hardware parameters to deliver professional-grade price valuations in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
              <Link href="/predict">
                <button className="px-10 py-5 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center gap-3 hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/30 group text-lg">
                  Launch Predictor
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </Link>
              <button className="px-10 py-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white font-bold hover:bg-white/[0.08] transition-all text-lg backdrop-blur-md">
                API Docs
              </button>
            </div>
          </motion.div>
        </div>

        {/* Dashboard Preview Overlay */}
        <div className="flex-1 w-full max-w-2xl relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="glass-card p-10 aspect-[4/3] flex flex-col gap-8 relative overflow-hidden group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-start relative z-10">
              <div>
                <h3 className="font-bold text-2xl text-white tracking-tight">System Status</h3>
                <p className="text-sm text-white/30 flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  ML Core Active
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-indigo-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 relative z-10">
              {[
                { label: "Architecture", value: "Neural", icon: Cpu },
                { label: "Accuracy", value: "98.4%", icon: ShieldCheck },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col gap-3">
                  <stat.icon className="w-5 h-5 text-indigo-400" />
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-widest font-bold">{stat.label}</p>
                    <p className="text-2xl font-black text-white">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto p-8 rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 relative overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform">
               <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
               <div className="relative z-10 flex items-center justify-between">
                 <div>
                   <p className="text-xs text-white/60 uppercase font-black tracking-[0.2em] mb-1">Estimated Value</p>
                   <p className="text-4xl font-black text-white italic">₹84,999</p>
                 </div>
                 <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                   <ZapIcon className="w-7 h-7 text-white fill-white" />
                 </div>
               </div>
            </div>
          </motion.div>
          
          {/* Floating Bubble */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-2xl z-20 border-indigo-500/20"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-indigo-400 fill-indigo-400" />
              </div>
              <div>
                <p className="text-xs text-white/40 font-bold uppercase tracking-widest">Confidence</p>
                <p className="text-lg font-black text-white tracking-tighter">High Tier</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl w-full px-6 py-32">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">ENGINEERED FOR PRECISION.</h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">Built with enterprise-grade components to deliver the most accurate mobile valuations on the market.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Neural Inference", 
              desc: "Proprietary ML models optimized for hardware-specific price forecasting.",
              icon: Cpu,
              color: "text-blue-400"
            },
            { 
              title: "Global Dataset", 
              desc: "Valuations backed by real-time market data across 50+ international regions.",
              icon: Globe,
              color: "text-purple-400"
            },
            { 
              title: "Instant Results", 
              desc: "Sub-millisecond processing power ensures zero waiting time for predictions.",
              icon: Zap,
              color: "text-amber-400"
            }
          ].map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all"
            >
              <div className={`w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-8 ${f.color}`}>
                <f.icon className="w-7 h-7" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 tracking-tight">{f.title}</h4>
              <p className="text-white/40 leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl w-full px-6 py-32 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter italic">TRUSTED BY <br/> INDUSTRY PROS.</h2>
            <div className="flex gap-4">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-[#050505] bg-gradient-to-br from-indigo-500 to-purple-600" />
                ))}
              </div>
              <p className="text-white/40 text-sm font-medium self-center">
                Joined by 25,000+ <br/> daily active resellers.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            {[
              { name: "Alex Rivera", role: "Mobile Reseller", text: "The accuracy is frightening. I've increased my margins by 15% since I started using Predictor Pro." },
              { name: "Sarah Chen", role: "Tech Analyst", text: "Finally, a valuation tool that actually understands the impact of specific hardware specs." }
            ].map((t, i) => (
              <div key={i} className="p-8 rounded-3xl glass border-white/[0.05] relative">
                <Star className="absolute top-8 right-8 w-5 h-5 text-amber-500 fill-amber-500" />
                <p className="text-lg text-white/70 mb-6 font-medium italic">"{t.text}"</p>
                <div>
                  <p className="font-bold text-white">{t.name}</p>
                  <p className="text-xs text-white/30 uppercase tracking-widest font-bold">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl w-full px-6 py-40 text-center">
        <div className="p-20 rounded-[4rem] bg-gradient-to-br from-indigo-600/20 to-purple-800/20 border border-white/[0.08] relative overflow-hidden backdrop-blur-3xl">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(white,transparent)]" />
          <h2 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter relative z-10">READY TO PREDICT?</h2>
          <Link href="/predict">
            <button className="px-12 py-6 rounded-3xl bg-white text-black font-black text-xl hover:scale-105 active:scale-95 transition-all relative z-10 shadow-2xl">
              Launch The Predictor
            </button>
          </Link>
          <p className="mt-8 text-white/40 font-bold tracking-[0.2em] relative z-10">FREE FOR A LIMITED TIME</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full p-12 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-8 text-white/20 text-sm font-medium">
        <div className="flex items-center gap-2 opacity-50">
          <Smartphone className="w-4 h-4" />
          <span className="font-bold">MobilePredict Pro</span>
        </div>
        <div className="flex gap-10">
          <a href="#" className="hover:text-white/40 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white/40 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white/40 transition-colors">Contact</a>
        </div>
        <p>© 2026 Antigravity Systems Inc.</p>
      </footer>
    </main>
  );
}
