"use client";

import React from "react";
import { Link2, DollarSign, Zap, LineChart } from "lucide-react";
import { motion } from "framer-motion";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Connect Wallet",
      description: "Securely link your MetaMask, Coinbase, or preferred wallet extension in one click.",
      details: "Metamask & WalletConnect supported",
      icon: <Link2 className="w-5 h-5 text-blue-400" />,
      glowColor: "group-hover:bg-blue-500/10",
      borderColor: "group-hover:border-blue-500/20",
    },
    {
      num: "02",
      title: "Choose Amount",
      description: "Specify the amount of ETH you want to deposit. Strategies begin at a low minimum.",
      details: "Minimum investment: $100",
      icon: <DollarSign className="w-5 h-5 text-purple-400" />,
      glowColor: "group-hover:bg-purple-500/10",
      borderColor: "group-hover:border-purple-500/20",
    },
    {
      num: "03",
      title: "One Tap Investment",
      description: "Confirm the smart contract deposit transaction directly inside your Web3 wallet.",
      details: "Approve transaction. Done.",
      icon: <Zap className="w-5 h-5 text-emerald-400" />,
      glowColor: "group-hover:bg-emerald-500/10",
      borderColor: "group-hover:border-emerald-500/20",
    },
    {
      num: "04",
      title: "Watch It Grow",
      description: "Yield strategies compound autonomously. Monitor earnings live from your dashboard.",
      details: "Track earnings in real time",
      icon: <LineChart className="w-5 h-5 text-amber-400" />,
      glowColor: "group-hover:bg-amber-500/10",
      borderColor: "group-hover:border-amber-500/20",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Subtle backdrop glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-mono uppercase tracking-wider text-emerald-400"
          >
            Onboarding
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-3 mb-6"
          >
            Invest in under 60 seconds.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 text-base"
          >
            No complex setup, no order books. We automate the technical barriers of DeFi so you can allocate assets instantly.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`group relative rounded-2xl bg-[#121418]/65 border border-white/5 p-6 overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${step.borderColor}`}
            >
              {/* Card Radial Glow */}
              <div className={`absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-transparent to-transparent ${step.glowColor}`} />

              {/* Number and Icon Header */}
              <div className="flex justify-between items-start mb-6">
                <span className="text-sm font-mono text-white/25 group-hover:text-white/40 transition-colors">
                  {step.num}
                </span>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:scale-105">
                  {step.icon}
                </div>
              </div>

              {/* Text Description */}
              <h3 className="text-lg font-semibold text-white mb-2 transition-transform duration-300 group-hover:translate-x-0.5">
                {step.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Detail Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/5 text-xxs font-mono text-white/60">
                <span className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-emerald-500 transition-colors" />
                {step.details}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
