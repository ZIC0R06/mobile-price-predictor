"use client";

import { motion } from "framer-motion";
import { Smartphone, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass-card p-10 relative z-10 border-white/10"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="w-10 h-10 rounded-xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-600/20 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tighter">Mobile<span className="text-purple-400">Predict</span></span>
          </Link>
          <h1 className="text-3xl font-black tracking-tighter mb-2">Create Account</h1>
          <p className="text-sm text-white/40 font-medium">Join 25,000+ professionals today</p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 pl-12 text-white font-medium focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 pl-12 text-white font-medium focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
              <input 
                type="password" 
                placeholder="Create a strong password"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 pl-12 text-white font-medium focus:outline-none focus:border-purple-500/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-start gap-3 px-1 py-2">
            <div className="w-5 h-5 rounded border border-white/10 mt-0.5 flex items-center justify-center"><CheckCircle2 className="w-3 h-3 text-white/20" /></div>
            <p className="text-[10px] text-white/40 font-medium leading-relaxed">
              By signing up, you agree to our <span className="text-white/60 underline">Terms</span> and <span className="text-white/60 underline">Privacy Policy</span>.
            </p>
          </div>

          <button className="w-full bg-white text-black font-black py-4 rounded-2xl shadow-xl hover:bg-white/90 transition-all active:scale-[0.98]">
            Get Started
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-white/40 font-medium">
          Already have an account? <Link href="/login" className="text-purple-400 font-bold">Sign in</Link>
        </p>
      </motion.div>
    </main>
  );
}
