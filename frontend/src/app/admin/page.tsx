"use client";

import { motion } from "framer-motion";
import { 
  ShieldAlert, Activity, Users, Database, Globe, 
  Cpu, Server, HardDrive, BarChart, Settings, ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const metrics = [
    { label: "API Uptime", value: "99.99%", status: "healthy", icon: Activity },
    { label: "Neural Load", value: "12.4%", status: "low", icon: Cpu },
    { label: "Database Health", value: "Optimal", status: "healthy", icon: Database },
    { label: "Active Nodes", value: "14", status: "active", icon: Server },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12 selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="w-10 h-10 rounded-xl glass flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-indigo-500" />
              SYSTEM CONTROL
            </h1>
          </div>
          <div className="flex gap-4">
             <div className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Monitoring
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((m, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden"
            >
              <m.icon className="w-5 h-5 text-indigo-500 mb-6" />
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">{m.label}</p>
              <p className="text-3xl font-black">{m.value}</p>
              <div className="absolute top-8 right-8">
                 <div className={`w-2 h-2 rounded-full ${m.status === 'healthy' ? 'bg-green-500' : 'bg-blue-500'}`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Monitor */}
          <div className="lg:col-span-2 glass-card p-10">
             <div className="flex justify-between items-center mb-10">
               <h3 className="text-xl font-bold tracking-tight">Latency Distribution</h3>
               <BarChart className="w-5 h-5 text-white/20" />
             </div>
             <div className="h-64 flex items-end gap-2 px-4">
               {[40, 60, 45, 90, 65, 40, 30, 70, 85, 50, 45, 95].map((h, i) => (
                 <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-lg transition-all hover:bg-indigo-500/40 cursor-help" style={{height: `${h}%`}} />
               ))}
             </div>
             <div className="mt-8 flex justify-between text-[10px] font-black uppercase tracking-widest text-white/20">
               <span>00:00</span>
               <span>Inference Latency (ms)</span>
               <span>23:59</span>
             </div>
          </div>

          {/* Traffic Monitor */}
          <div className="glass-card p-10 flex flex-col">
             <h3 className="text-xl font-bold tracking-tight mb-8">Regional Traffic</h3>
             <div className="space-y-6 flex-1">
               {[
                 { country: "United States", traffic: 45, color: "bg-blue-500" },
                 { country: "India", traffic: 32, color: "bg-indigo-500" },
                 { country: "United Kingdom", traffic: 15, color: "bg-purple-500" },
                 { country: "Germany", traffic: 8, color: "bg-pink-500" },
               ].map((c, i) => (
                 <div key={i} className="space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                     <span className="text-white/40">{c.country}</span>
                     <span>{c.traffic}%</span>
                   </div>
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className={`h-full ${c.color} rounded-full`} style={{width: `${c.traffic}%`}} />
                   </div>
                 </div>
               ))}
             </div>
             <button className="mt-10 w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
               View Full Logs
             </button>
          </div>
        </div>

        {/* System Logs */}
        <div className="mt-8 glass-card p-10">
           <h3 className="text-xl font-bold tracking-tight mb-8">Inference Queue</h3>
           <div className="space-y-4">
             {[
               { id: "TX-4522", type: "PREDICT", brand: "Apple", time: "2s ago", latency: "142ms" },
               { id: "TX-4521", type: "SIMILAR", brand: "Samsung", time: "12s ago", latency: "89ms" },
               { id: "TX-4520", type: "PREDICT", brand: "Google", time: "45s ago", latency: "210ms" },
             ].map((log, i) => (
               <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.01] border border-white/5 text-[10px] font-medium">
                 <div className="flex items-center gap-6">
                   <span className="font-black text-indigo-400">{log.id}</span>
                   <span className="px-2 py-0.5 rounded bg-white/5 text-white/40">{log.type}</span>
                   <span className="text-white/70">{log.brand} Node</span>
                 </div>
                 <div className="flex items-center gap-6">
                   <span className="text-white/20">{log.time}</span>
                   <span className="font-black text-green-500">{log.latency}</span>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </main>
  );
}
