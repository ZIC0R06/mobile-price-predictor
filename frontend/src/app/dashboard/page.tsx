"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, History, TrendingUp, Smartphone, 
  ArrowLeft, Loader2, BarChart3, PieChart as PieIcon, Activity, Star
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, LineChart, Line
} from 'recharts';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, historyRes] = await Promise.all([
          fetch(`${API_URL}/stats`),
          fetch(`${API_URL}/history`)
        ]);
        const statsData = await statsRes.json();
        const historyData = await historyRes.json();
        setStats(statsData);
        setHistory(historyData);
      } catch (err) {
        console.error("Failed to fetch dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
            </Link>
            <h1 className="text-5xl font-black tracking-tighter">ANALYTICS <span className="text-indigo-500">ENGINE</span></h1>
          </div>
          <div className="flex gap-4">
            <Link href="/predict">
              <button className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 transition-all">
                New Prediction
              </button>
            </Link>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Queries", value: stats?.total_predictions || 0, icon: Activity, color: "text-blue-400" },
            { label: "Avg valuation", value: `₹${(stats?.average_price || 0).toLocaleString()}`, icon: TrendingUp, color: "text-green-400" },
            { label: "Top Brand", value: stats?.brand_distribution?.[0]?.brand || "N/A", icon: Star, color: "text-amber-400" },
            { label: "System Health", value: "99.9%", icon: Smartphone, color: "text-purple-400" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] glass border-white/5 relative overflow-hidden"
            >
              <div className={`w-12 h-12 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-6 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-xs font-black uppercase tracking-widest text-white/30 mb-2">{stat.label}</p>
              <p className="text-3xl font-black text-white">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Brand Distribution */}
          <div className="glass-card p-10">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-bold tracking-tight">Market Intelligence</h3>
               <PieIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats?.brand_distribution || []}
                    cx="50%" cy="50%"
                    innerRadius={60} outerRadius={100}
                    paddingAngle={5}
                    dataKey="count"
                    nameKey="brand"
                  >
                    {(stats?.brand_distribution || []).map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#f97316'][index % 5]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px'}}
                    itemStyle={{color: '#fff'}}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
               {(stats?.brand_distribution || []).slice(0, 5).map((b: any, i: number) => (
                 <div key={i} className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full" style={{backgroundColor: ['#6366f1', '#a855f7', '#ec4899', '#f43f5e', '#f97316'][i % 5]}} />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">{b.brand}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Category Averages */}
          <div className="glass-card p-10">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-xl font-bold tracking-tight">Segment Valuations</h3>
               <BarChart3 className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.category_averages || []}>
                  <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 10}} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px'}}
                    itemStyle={{color: '#fff'}}
                  />
                  <Bar dataKey="avg_price" radius={[6, 6, 0, 0]} fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Predictions */}
        <div className="glass-card p-10">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-bold tracking-tight">Real-time Stream</h3>
              <History className="w-5 h-5 text-indigo-400" />
           </div>
           <div className="overflow-x-auto">
             <table className="w-full text-left">
               <thead>
                 <tr className="border-b border-white/5">
                   <th className="pb-6 text-[10px] uppercase font-black tracking-widest text-white/30">Device</th>
                   <th className="pb-6 text-[10px] uppercase font-black tracking-widest text-white/30">Specs</th>
                   <th className="pb-6 text-[10px] uppercase font-black tracking-widest text-white/30">Valuation</th>
                   <th className="pb-6 text-[10px] uppercase font-black tracking-widest text-white/30">Tier</th>
                   <th className="pb-6 text-[10px] uppercase font-black tracking-widest text-white/30">Timestamp</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                 {history.map((item, i) => (
                   <tr key={i} className="group hover:bg-white/[0.01] transition-colors">
                     <td className="py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-white/[0.03] flex items-center justify-center font-bold text-xs text-indigo-400">
                            {item.brand[0]}
                          </div>
                          <span className="font-bold">{item.brand}</span>
                        </div>
                     </td>
                     <td className="py-6">
                        <span className="text-xs text-white/40 font-medium">{item.ram_gb}GB / {item.storage_gb}GB</span>
                     </td>
                     <td className="py-6">
                        <span className="font-black">₹{item.predicted_price.toLocaleString()}</span>
                     </td>
                     <td className="py-6">
                        <div className="inline-flex px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                          {item.market_category}
                        </div>

                     </td>
                     <td className="py-6">
                        <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">
                          {new Date(item.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </main>
  );
}
