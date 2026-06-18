"use client";

import React from "react";
import { useApp } from "./AppContext";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  const { portfolioBalance, todayEarnings, roi, setDepositModalOpen, setConnectModalOpen, isWalletConnected } = useApp();

  // Framer Motion SVG path draw animation

  const handleInvestClick = () => {
    if (isWalletConnected) {
      setDepositModalOpen(true);
    } else {
      setConnectModalOpen(true);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#050505]">
      {/* Background spotlights & glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full glow-spotlight pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] rounded-full glass-glow-blue opacity-70 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Side: Headline & Copy */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Institutional Yield, Simplified
          </motion.div>

          {/* Large Bold Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6"
          >
            The Easiest Way to Invest in DeFi.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-white/50 font-normal leading-relaxed max-w-xl mb-10"
          >
            Deposit ETH once. Our automated yield strategies work in the background while you monitor everything from a beautiful dashboard.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              onClick={handleInvestClick}
              className="px-8 py-4 rounded-full bg-white hover:bg-neutral-200 text-black font-semibold text-sm transition-all duration-200 shadow-lg shadow-white/5 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Invest Now
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <a
              href="#performance"
              className="px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              View Performance
            </a>
          </motion.div>
        </div>

        {/* Right Side: Interactive 3D Dashboard Mockup */}
        <div className="lg:col-span-6 flex justify-center relative">
          
          {/* Main Floating Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", duration: 1.2, delay: 0.2 }}
            className="w-full max-w-[480px] glass-panel rounded-2xl p-6 shadow-2xl relative animate-float select-none"
          >
            {/* Spotlight Glow inside card */}
            <div className="absolute top-0 right-0 w-32 h-32 glass-glow-emerald rounded-full pointer-events-none opacity-40" />

            {/* Header: Wallet State */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold font-mono">Ξ</div>
                <span className="text-xs font-mono text-white/50">ETH Vault</span>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xxs font-semibold flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                APY: {roi}%
              </div>
            </div>

            {/* Balances Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                <span className="text-[10px] uppercase tracking-wider text-white/40 block">Current Balance</span>
                <span className="text-xl font-bold text-white mt-1 block font-mono">
                  ${portfolioBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                <span className="text-[10px] uppercase tracking-wider text-white/40 block">Today's Earnings</span>
                <span className="text-xl font-bold text-emerald-400 mt-1 block font-mono">
                  +${todayEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </span>
              </div>
            </div>

            {/* Custom SVG Line Graph */}
            <div className="relative h-36 w-full mb-6 bg-white/[0.01] border border-white/5 rounded-xl p-2 overflow-hidden">
              <span className="text-[9px] text-white/30 absolute top-2 left-2">Historical Yield Growth</span>
              <svg className="w-full h-full pt-6" viewBox="0 0 100 50" preserveAspectRatio="none">
                {/* Background Grid Lines */}
                <line x1="0" y1="12.5" x2="100" y2="12.5" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                <line x1="0" y1="37.5" x2="100" y2="37.5" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />

                {/* Animated Path */}
                <motion.path
                  d="M0 45 C 15 42, 25 35, 40 30 C 55 25, 65 15, 80 12 C 90 10, 95 6, 100 5"
                  fill="none"
                  stroke="url(#chart-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.5, ease: "easeInOut" as const }}
                />

                {/* Area Gradient Defs */}
                <defs>
                  <linearGradient id="chart-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="60%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Glowing Pulse Dot */}
              <div className="absolute top-[8px] right-[4px] w-2 h-2">
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
                <div className="relative w-2 h-2 bg-emerald-400 rounded-full" />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleInvestClick}
                className="py-2.5 rounded-lg bg-white text-black font-semibold text-xs transition-colors duration-200 hover:bg-neutral-200 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowUpRight className="w-3.5 h-3.5" />
                Deposit
              </button>
              <button
                onClick={handleInvestClick}
                className="py-2.5 rounded-lg bg-white/5 text-white/80 border border-white/10 font-semibold text-xs transition-all duration-200 hover:bg-white/10 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <ArrowDownLeft className="w-3.5 h-3.5" />
                Withdraw
              </button>
            </div>
          </motion.div>

          {/* Decorative Floating Glass Card 1 (Top Left) */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ type: "spring", duration: 1.4, delay: 0.5 }}
            className="absolute top-10 -left-12 hidden md:block bg-white/[0.02] backdrop-blur-lg border border-white/10 rounded-xl p-3 shadow-xl max-w-[170px] pointer-events-none"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[10px] text-blue-400">💧</div>
              <div>
                <span className="text-[9px] text-white/40 uppercase block">Yield Stream</span>
                <span className="text-xs font-semibold text-white font-mono">Auto-Compounding</span>
              </div>
            </div>
          </motion.div>

          {/* Decorative Floating Glass Card 2 (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ type: "spring", duration: 1.4, delay: 0.6 }}
            className="absolute bottom-6 -right-10 hidden md:block bg-[#121418]/60 backdrop-blur-lg border border-white/10 rounded-xl p-3 shadow-xl pointer-events-none"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-white/80">Secured with Chainlink VRF</span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
