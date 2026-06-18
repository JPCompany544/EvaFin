"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, TrendingUp, Eye } from "lucide-react";

const blocks = [
  {
    icon: <Zap className="w-6 h-6 text-amber-400" />,
    label: "One Tap Investing",
    title: "Zero complexity.\nMaximum yield.",
    description:
      "No liquidity pools to manage. No impermanent loss calculations. No gas optimisation headaches. Connect, deposit, and let our algorithms handle everything. You focus on your portfolio — we handle the protocol layer.",
    highlight: "No complicated DeFi",
    glowClass: "from-amber-500/10",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-blue-400" />,
    label: "Institutional Strategies",
    title: "Professional-grade\nautomated alpha.",
    description:
      "Our proprietary yield engine continuously scans Aave, Compound, Curve and Uniswap V3 pools to allocate capital at optimal rates. The same quantitative strategies used by DeFi hedge funds — now accessible to everyone.",
    highlight: "Professional automated strategies",
    glowClass: "from-blue-500/10",
  },
  {
    icon: <Eye className="w-6 h-6 text-emerald-400" />,
    label: "Transparent",
    title: "Every transaction.\nOn-chain and visible.",
    description:
      "We don't hold your assets off-chain. Everything happens in publicly-auditable Ethereum smart contracts. Verify your balance, yields, and strategy allocations on Etherscan at any moment — no trust required.",
    highlight: "Every transaction visible",
    glowClass: "from-emerald-500/10",
  },
];

export const WhyUs: React.FC = () => {
  return (
    <section className="py-24 bg-[#0F1115] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-wider text-white/40"
          >
            Why Eva
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-3"
          >
            Built different.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {blocks.map((b, idx) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group relative overflow-hidden rounded-2xl bg-[#121418] border border-white/5 p-8 hover:border-white/10 transition-all duration-300"
            >
              {/* Corner radial glow */}
              <div className={`absolute top-0 left-0 w-40 h-40 bg-gradient-to-br ${b.glowClass} to-transparent rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-105 transition-transform">
                    {b.icon}
                  </div>
                  <span className="text-xs font-mono text-white/30 uppercase tracking-wider">{b.label}</span>
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight mb-4 whitespace-pre-line leading-tight">
                  {b.title}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed mb-8">{b.description}</p>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/50">
                  <span className="w-1 h-1 rounded-full bg-white/30" />
                  {b.highlight}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
