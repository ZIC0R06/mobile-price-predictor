"use client";

import { motion } from "framer-motion";
import { Smartphone, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-10 relative z-10 border-white/10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tighter">Mobile<span className="text-indigo-400">Predict</span></span>
          </Link>
          <h1 className="text-3xl font-black tracking-tighter mb-2">Welcome Back</h1>
          <p className="text-sm text-white/40 font-medium">Log in to your neural dashboard</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 pl-12 text-white font-medium focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Password</label>
              <a href="#" className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Forgot?</a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 pl-12 text-white font-medium focus:outline-none focus:border-indigo-500/50 transition-all"
              />
            </div>
          </div>

          <button className="w-full bg-white text-black font-black py-4 rounded-2xl shadow-xl hover:bg-white/90 transition-all active:scale-[0.98]">
            Sign In
          </button>
        </form>

        <div className="mt-8">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
            <div className="relative flex justify-center text-[10px]"><span className="bg-[#0b0b0b] px-4 font-black uppercase tracking-widest text-white/20">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              <span className="text-sm font-bold">Github</span>
            </button>

            <button className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] transition-all">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-1.94 5.42-7.84 5.42-5.09 0-9.23-4.22-9.23-9.42s4.14-9.42 9.23-9.42c2.9 0 4.84 1.24 5.95 2.3l2.6-2.5C19.34 1.94 16.2 0 12.48 0 5.58 0 0 5.58 0 12.48s5.58 12.48 12.48 12.48c7.2 0 12-5.06 12-12.2 0-.83-.09-1.45-.25-2.08H12.48z"/></svg>
              <span className="text-sm font-bold">Google</span>
            </button>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-white/40 font-medium">
          Don't have an account? <Link href="/signup" className="text-indigo-400 font-bold">Sign up for free</Link>
        </p>
      </motion.div>
    </main>
  );
}
