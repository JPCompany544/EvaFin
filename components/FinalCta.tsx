"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useApp } from "./AppContext";

export const FinalCta: React.FC = () => {
  const { setDepositModalOpen, setConnectModalOpen, isWalletConnected } = useApp();

  const handleInvest = () => {
    if (isWalletConnected) setDepositModalOpen(true);
    else setConnectModalOpen(true);
  };

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Layered lighting effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-emerald-500/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative rounded-3xl border border-white/8 bg-[#0F1115]/80 backdrop-blur-sm p-12 sm:p-16 overflow-hidden"
        >
          {/* Inner glow corners */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-5 block"
          >
            Get Started Today
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight"
          >
            Start Growing Your<br />
            <span className="text-white/50">Crypto Today.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base text-white/50 leading-relaxed mb-10 max-w-lg mx-auto"
          >
            Deposit once. Track everything from your dashboard.
            Withdraw whenever eligible. No lock-ins, no complexity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={handleInvest}
              className="px-8 py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer shadow-lg shadow-white/5"
            >
              Invest Now
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="#how-it-works"
              className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center cursor-pointer"
            >
              Learn How It Works
            </a>
          </motion.div>

          {/* Trust micro-signals */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/30">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-500" />
              Non-custodial
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-blue-500" />
              Audited contracts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-white/30" />
              $100 minimum
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-white/30" />
              Withdraw anytime
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
