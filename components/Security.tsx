"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, Cpu, Globe, Server } from "lucide-react";

const features = [
  {
    icon: <Shield className="w-5 h-5 text-emerald-400" />,
    title: "Smart Contract Security",
    description: "All contracts are fully audited by leading Web3 security firms. Zero vulnerabilities shipped to production.",
    badge: "Audited",
    badgeColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: <Cpu className="w-5 h-5 text-blue-400" />,
    title: "Automated Risk Management",
    description: "Real-time monitoring with circuit breakers. Positions auto-close if risk thresholds are exceeded.",
    badge: "Active",
    badgeColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: <Lock className="w-5 h-5 text-purple-400" />,
    title: "Non-Custodial",
    description: "Your private keys never leave your wallet. We never hold your funds — only smart contracts do.",
    badge: "Self-Custody",
    badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: <Eye className="w-5 h-5 text-amber-400" />,
    title: "Transparent On-Chain Activity",
    description: "Every deposit, withdrawal, and yield event is verifiable on Etherscan. Nothing is hidden.",
    badge: "On-Chain",
    badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: <Globe className="w-5 h-5 text-cyan-400" />,
    title: "Ethereum Network",
    description: "Built exclusively on Ethereum mainnet — the most battle-tested, decentralised blockchain in the world.",
    badge: "Mainnet",
    badgeColor: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: <Server className="w-5 h-5 text-rose-400" />,
    title: "Professional Infrastructure",
    description: "Redundant RPC nodes, 99.9% uptime SLA, and automated keeper bots to ensure your yield never stops.",
    badge: "99.9% Uptime",
    badgeColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
];

export const Security: React.FC = () => {
  return (
    <section id="security" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-wider text-emerald-400"
          >
            Trust & Safety
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-3 mb-6"
          >
            Built with Security First.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50 text-base"
          >
            Enterprise-grade security architecture. Every layer is hardened so you can invest with complete confidence.
          </motion.p>
        </div>

        {/* Large Shield Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="flex justify-center mb-16"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-2xl shadow-emerald-500/10">
              <Shield className="w-12 h-12 text-emerald-400" />
            </div>
            {/* Orbiting pings */}
            <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group p-6 rounded-2xl bg-[#121418] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 group-hover:bg-white/8 transition-colors">
                  {f.icon}
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${f.badgeColor}`}>
                  {f.badge}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
