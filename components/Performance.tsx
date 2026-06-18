"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, ArrowUpRight } from "lucide-react";

const performanceData = [
  { month: "Jul", value: 10000 },
  { month: "Aug", value: 10840 },
  { month: "Sep", value: 11200 },
  { month: "Oct", value: 11750 },
  { month: "Nov", value: 12400 },
  { month: "Dec", value: 13100 },
  { month: "Jan", value: 13850 },
  { month: "Feb", value: 14600 },
  { month: "Mar", value: 15480 },
  { month: "Apr", value: 16200 },
  { month: "May", value: 17050 },
  { month: "Jun", value: 17890 },
];

const monthlyReturns = [
  { month: "Jun", pct: "+2.8%" },
  { month: "May", pct: "+2.5%" },
  { month: "Apr", pct: "+4.7%" },
  { month: "Mar", pct: "+5.3%" },
  { month: "Feb", pct: "+1.9%" },
  { month: "Jan", pct: "+5.7%" },
];

const allocations = [
  { name: "Aave Lending", pct: 38, color: "#3B82F6" },
  { name: "Curve Stable", pct: 27, color: "#10B981" },
  { name: "Uniswap V3 LP", pct: 20, color: "#8B5CF6" },
  { name: "Compound V3", pct: 15, color: "#F59E0B" },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel rounded-lg p-3 shadow-xl text-xs">
        <p className="text-white/50 mb-1">{label}</p>
        <p className="text-emerald-400 font-bold text-sm font-mono">
          ${payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export const Performance: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section id="performance" className="py-24 bg-[#0F1115] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-wider text-blue-400"
          >
            Performance
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-3 mb-6"
          >
            Real Performance. <br className="hidden sm:block" />
            <span className="text-white/50">Real Transparency.</span>
          </motion.h2>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Chart — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-[#121418] border border-white/5 rounded-2xl p-6"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Portfolio Value</p>
                <p className="text-3xl font-bold text-white font-mono">$17,890</p>
                <p className="text-sm text-emerald-400 flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3.5 h-3.5" /> +78.9% since inception
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Current APY</p>
                <p className="text-2xl font-bold text-emerald-400 font-mono">14.85%</p>
              </div>
            </div>

            <div className="h-52 w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="perfGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                      width={40}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#10B981"
                      strokeWidth={2}
                      fill="url(#perfGradient)"
                      dot={false}
                      activeDot={{ r: 4, fill: "#10B981", strokeWidth: 0 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full rounded-lg bg-white/[0.02] animate-pulse" />
              )}
            </div>
          </motion.div>

          {/* Right Column: Monthly Returns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#121418] border border-white/5 rounded-2xl p-6 flex flex-col"
          >
            <p className="text-xs text-white/40 uppercase tracking-wider mb-5">Monthly Returns</p>
            <div className="flex flex-col gap-3 flex-1">
              {monthlyReturns.map((r) => (
                <div key={r.month} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-white/40 w-8">{r.month}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${parseFloat(r.pct) * 14}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      className="h-full rounded-full bg-emerald-500"
                    />
                  </div>
                  <span className="text-xs font-mono text-emerald-400 w-12 text-right">{r.pct}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-xs text-white/40 mb-1">Avg. Monthly Return</p>
              <p className="text-2xl font-bold text-white font-mono">+3.82%</p>
            </div>
          </motion.div>

          {/* Allocation Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3 bg-[#121418] border border-white/5 rounded-2xl p-6"
          >
            <p className="text-xs text-white/40 uppercase tracking-wider mb-6">Strategy Allocation</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allocations.map((a) => (
                <div key={a.name} className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-white/60">{a.name}</span>
                    <span className="text-xs font-mono text-white">{a.pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${a.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: a.color }}
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: a.color }} />
                    <span className="text-[10px] text-white/30">Active</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
