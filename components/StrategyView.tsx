"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ShieldCheck,
  Globe,
  Lock,
  FileCheck,
  Copy,
  ExternalLink,
  Users,
  Activity,
  Calendar,
  Clock,
  ChevronRight,
  TrendingUp
} from "lucide-react";

// Inline ETH Icon
const EthIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.925 23.96l-9.813-5.797L15.925 32l9.825-13.837-9.825 5.797zM16.075 0L6.25 16.326l9.825 5.808 9.813-5.808L16.075 0z" fill="#627EEA" />
  </svg>
);

interface StrategyViewProps {
  onBack: () => void;
  onDepositClick: () => void;
  ethPrice: number;
}

type FilterType = "7D" | "30D" | "90D" | "1Y" | "All";

export const StrategyView: React.FC<StrategyViewProps> = ({ onBack, onDepositClick, ethPrice }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("30D");
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [copiedContract, setCopiedContract] = useState(false);

  // Performance historical data mappings
  const chartData = useMemo(() => {
    return {
      "7D": {
        points: [100.0, 100.12, 100.25, 100.31, 100.48, 100.55, 100.68],
        labels: ["Jun 12", "Jun 13", "Jun 14", "Jun 15", "Jun 16", "Jun 17", "Jun 18"],
        returnPct: "+0.68%",
        subtitle: "Past 7 Days"
      },
      "30D": {
        points: [100.0, 100.3, 100.1, 100.6, 101.2, 100.9, 101.5, 101.8, 102.1, 101.9, 102.4, 102.6, 102.85],
        labels: ["May 20", "May 25", "May 30", "Jun 04", "Jun 09", "Jun 14", "Jun 18"],
        returnPct: "+2.85%",
        subtitle: "Past 30 Days"
      },
      "90D": {
        points: [100.0, 101.2, 100.8, 102.5, 103.1, 102.9, 104.5, 105.2, 106.1, 105.8, 107.4, 108.42],
        labels: ["Mar 20", "Apr 09", "Apr 29", "May 19", "Jun 08", "Jun 18"],
        returnPct: "+8.42%",
        subtitle: "Past 30 Days"
      },
      "1Y": {
        points: [100.0, 102.5, 105.8, 104.2, 109.5, 114.2, 112.8, 119.5, 125.2, 122.9, 131.5, 135.5],
        labels: ["Jun 25", "Sep 25", "Dec 25", "Mar 26", "Jun 26"],
        returnPct: "+35.50%",
        subtitle: "Past Year"
      },
      "All": {
        points: [100.0, 104.2, 108.5, 112.4, 110.8, 118.5, 126.2, 122.8, 134.5, 142.1, 138.6, 148.2],
        labels: ["Dec 25", "Feb 26", "Apr 26", "Jun 26"],
        returnPct: "+48.20%",
        subtitle: "Since Inception"
      }
    };
  }, []);

  // Map data points into dynamic SVG viewBox coordinates
  const svgPaths = useMemo(() => {
    const points = chartData[activeFilter].points;
    const width = 500;
    const height = 160;
    const minVal = Math.min(...points);
    const maxVal = Math.max(...points);
    const range = maxVal - minVal || 1;

    const pathString = points.map((val, idx) => {
      const x = (idx / (points.length - 1)) * width;
      // 10px vertical margins
      const y = height - 10 - ((val - minVal) / range) * (height - 25);
      return `${idx === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");

    const areaString = `${pathString} L ${width} ${height} L 0 ${height} Z`;

    return { linePath: pathString, areaPath: areaString };
  }, [activeFilter, chartData]);

  const copyContractAddress = () => {
    navigator.clipboard.writeText("0x42f89ef67dbad901abcf81290325a7251ea029ae");
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  return (
    <div className="w-full max-w-[620px] px-4 flex flex-col items-center pb-32 pt-2 relative z-10">

      {/* Back Button */}
      <div className="w-full flex justify-start mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-white/40 hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back
        </button>
      </div>

      {/* Title Header */}
      <div className="w-full text-left mb-6">
        <h1 className="text-[28px] font-bold text-white tracking-tight leading-tight">
          Strategy
        </h1>
        <p className="text-xs text-white/40 font-medium mt-1 uppercase tracking-wider">
          Automated Ethereum Yield Strategy
        </p>
      </div>

      {/* HERO CARD */}
      <div className="w-full bg-[#0d0e12] border border-white/[0.04] rounded-2xl p-6 mb-6 orange-glow-border relative overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Strategy Name</span>
            <h2 className="text-xl font-bold text-white mt-1">Automated ETH Yield</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-white/[0.04] pt-4 mb-4 text-xs">
          <div>
            <span className="text-white/30 block mb-0.5">Network</span>
            <span className="font-semibold text-white flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#627EEA]" /> Ethereum Mainnet
            </span>
          </div>
          <div>
            <span className="text-white/30 block mb-0.5">Minimum Deposit</span>
            <span className="font-semibold text-white font-mono">$100</span>
          </div>
          <div>
            <span className="text-white/30 block mb-0.5">Current Allocation</span>
            <span className="font-semibold text-white flex items-center gap-1">
              <EthIcon className="w-3.5 h-3.5" /> 100% ETH
            </span>
          </div>
          <div>
            <span className="text-white/30 block mb-0.5">Expected APY</span>
            <span className="font-semibold text-[#fb923c] font-mono">35.5%</span>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-3 text-center">
          <span className="text-[10px] text-white/20 tracking-wider">
            Updated in real time.
          </span>
        </div>
      </div>

      {/* SECTION 1 — HOW IT WORKS */}
      <div className="w-full bg-[#0d0e12] border border-white/[0.04] rounded-2xl p-6 mb-6 orange-glow-border">
        <h3 className="text-sm font-bold text-white mb-3 uppercase tracking-wider">
          How It Works
        </h3>
        <p className="text-xs text-white/50 leading-relaxed font-medium">
          Your deposited ETH is allocated into automated on-chain yield strategies. The protocol continuously manages positions according to predefined rules designed to generate yield without requiring manual trading from the investor.
        </p>
      </div>

      {/* SECTION 2 — PERFORMANCE */}
      <div className="w-full bg-[#0d0e12] border border-white/[0.04] rounded-2xl p-6 mb-6 orange-glow-border">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Performance
          </h3>
          {/* Timeframe selector */}
          <div className="flex gap-1 bg-black/30 border border-white/5 p-1 rounded-lg">
            {(["7D", "30D", "90D", "1Y", "All"] as FilterType[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`text-[9px] font-bold px-2 py-1.5 rounded transition-all cursor-pointer ${activeFilter === tab
                    ? "bg-[#ea580c] text-white"
                    : "text-white/40 hover:text-white/80"
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-4 gap-2 mb-6 border-b border-white/[0.04] pb-5 text-center">
          <div>
            <span className="text-[10px] text-white/30 block mb-1">30D Return</span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {chartData["30D"].returnPct}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-white/30 block mb-1">90D Return</span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {chartData["90D"].returnPct}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-white/30 block mb-1">Since Launch</span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {chartData["All"].returnPct}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-white/30 block mb-1">Current APY</span>
            <span className="text-xs font-mono font-bold text-[#fb923c]">
              35.5%
            </span>
          </div>
        </div>

        {/* Graph Details Header */}
        <div className="flex justify-between items-end mb-4 px-1">
          <div>
            <span className="text-[10px] text-white/30 uppercase tracking-wider">Yield Return ({chartData[activeFilter].subtitle})</span>
            <span className="text-base font-bold text-emerald-400 font-mono block">
              {chartData[activeFilter].returnPct}
            </span>
          </div>
          <span className="text-[10px] text-white/30 flex items-center gap-1 font-mono">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> APY 35.5%
          </span>
        </div>

        {/* The SVG Line / Area Graph */}
        <div className="w-full h-40 bg-black/10 border border-white/[0.02] rounded-xl p-3 relative overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 500 160" preserveAspectRatio="none">
            <defs>
              <linearGradient id="area-glow-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="line-glow-grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="50%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="0" y1="40" x2="500" y2="40" stroke="rgba(255,255,255,0.02)" strokeDasharray="3 3" />
            <line x1="0" y1="80" x2="500" y2="80" stroke="rgba(255,255,255,0.02)" strokeDasharray="3 3" />
            <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.02)" strokeDasharray="3 3" />

            {/* Glowing Area Fill */}
            <motion.path
              d={svgPaths.areaPath}
              fill="url(#area-glow-grad)"
              animate={{ d: svgPaths.areaPath }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
            />

            {/* Glowing Line Stroke */}
            <motion.path
              d={svgPaths.linePath}
              stroke="url(#line-glow-grad)"
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              animate={{ d: svgPaths.linePath }}
              transition={{ type: "spring", stiffness: 90, damping: 18 }}
            />
          </svg>
        </div>

        {/* X-Axis Labels */}
        <div className="flex justify-between items-center mt-2.5 px-1 text-[9px] text-white/30 font-mono">
          {chartData[activeFilter].labels.map((lbl, idx) => (
            <span key={lbl + idx}>{lbl}</span>
          ))}
        </div>
      </div>

      {/* SECTION 3 — SECURITY */}
      <div className="w-full bg-[#0d0e12] border border-white/[0.04] rounded-2xl p-6 mb-6 orange-glow-border">
        <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">
          Security
        </h3>

        {/* 2x2 Grid of Feature Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#12131a]/85 border border-white/[0.03] rounded-xl p-4 flex flex-col gap-3">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#fb923c]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-white/30 block mb-0.5">Smart Contract</span>
              <span className="text-xs font-bold text-white">Status Verified</span>
            </div>
          </div>

          <div className="bg-[#12131a]/85 border border-white/[0.03] rounded-xl p-4 flex flex-col gap-3">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#fb923c]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-white/30 block mb-0.5">Ethereum Network</span>
              <span className="text-xs font-bold text-white">Mainnet Strategy</span>
            </div>
          </div>

          <div className="bg-[#12131a]/85 border border-white/[0.03] rounded-xl p-4 flex flex-col gap-3">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#fb923c]">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-white/30 block mb-0.5">Asset Custody</span>
              <span className="text-xs font-bold text-white">Non-Custodial</span>
            </div>
          </div>

          <div className="bg-[#12131a]/85 border border-white/[0.03] rounded-xl p-4 flex flex-col gap-3">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#fb923c]">
              <FileCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-white/30 block mb-0.5">Auditing Check</span>
              <span className="text-xs font-bold text-white">Audit Available</span>
            </div>
          </div>
        </div>

        {/* View Security Details Button */}
        <button
          onClick={() => setShowSecurityModal(true)}
          className="w-full h-11 border border-white/[0.06] hover:bg-white/[0.03] transition-colors rounded-xl text-xs font-semibold text-white/80 hover:text-white cursor-pointer"
        >
          View Security Details
        </button>
      </div>

      {/* SECTION 4 — WITHDRAWALS */}
      <div className="w-full bg-[#0d0e12] border border-white/[0.04] rounded-2xl p-6 mb-6 orange-glow-border">
        <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">
          Withdrawals
        </h3>

        <div className="flex flex-col gap-4 text-xs font-medium">
          <div className="flex justify-between items-center py-0.5">
            <span className="text-white/40">Minimum Holding Period</span>
            <span className="font-semibold text-white">None</span>
          </div>
          <div className="flex justify-between items-center py-0.5 border-t border-white/[0.04] pt-3">
            <span className="text-white/40">Withdrawal Availability</span>
            <span className="font-semibold text-white">Instant / Anytime</span>
          </div>
          <div className="flex justify-between items-center py-0.5 border-t border-white/[0.04] pt-3">
            <span className="text-white/40">Settlement</span>
            <span className="font-semibold text-white">On-Chain Settlement</span>
          </div>
          <div className="flex justify-between items-center py-0.5 border-t border-white/[0.04] pt-3">
            <span className="text-white/40">Network</span>
            <span className="font-semibold text-white">Ethereum Mainnet</span>
          </div>
          <div className="flex justify-between items-center py-0.5 border-t border-white/[0.04] pt-3">
            <span className="text-white/40">Processing Time</span>
            <span className="font-semibold text-white">~5 Minutes</span>
          </div>
        </div>
      </div>

      {/* SECTION 5 — TRANSPARENCY */}
      <div className="w-full bg-[#0d0e12] border border-white/[0.04] rounded-2xl p-6 mb-6 orange-glow-border">
        <h3 className="text-sm font-bold text-white mb-5 uppercase tracking-wider">
          Transparency
        </h3>

        {/* Grid of Metric Cards */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-[#12131a]/85 border border-white/[0.03] rounded-xl p-4">
            <span className="text-white/30 block mb-1">Total Value Locked</span>
            <span className="text-base font-bold text-white font-mono">$4,248,912</span>
          </div>
          <div className="bg-[#12131a]/85 border border-white/[0.03] rounded-xl p-4">
            <span className="text-white/30 block mb-1">Number of Investors</span>
            <span className="text-base font-bold text-white font-mono">1,842</span>
          </div>
          <div className="bg-[#12131a]/85 border border-white/[0.03] rounded-xl p-4">
            <span className="text-white/30 block mb-1">Strategy Launch Date</span>
            <span className="text-base font-bold text-white font-mono">Dec 14, 2025</span>
          </div>
          <div className="bg-[#12131a]/85 border border-white/[0.03] rounded-xl p-4">
            <span className="text-white/30 block mb-1">Last Strategy Update</span>
            <span className="text-base font-bold text-white font-mono">10 minutes ago</span>
          </div>
        </div>
      </div>

      {/* SECTION 6 — ABOUT EVAFIN */}
      <div className="w-full bg-[#0d0e12] border border-white/[0.04] rounded-2xl p-6 orange-glow-border">
        <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
          About
        </h3>

        <p className="text-xs text-white/50 leading-relaxed font-medium mb-6">
          EvaFin builds automated investment strategies that simplify access to decentralized finance through a streamlined one-tap investing experience.
        </p>

        <div className="flex flex-col gap-4 text-xs font-medium">
          <div className="flex justify-between items-center py-0.5">
            <span className="text-white/40">Operating Network</span>
            <span className="font-semibold text-white">Ethereum</span>
          </div>
          <div className="flex justify-between items-center py-0.5 border-t border-white/[0.04] pt-3">
            <span className="text-white/40">Platform</span>
            <span className="font-semibold text-white">Telegram Mini App</span>
          </div>
          <div className="flex justify-between items-center py-0.5 border-t border-white/[0.04] pt-3">
            <span className="text-white/40">Strategy Type</span>
            <span className="font-semibold text-white">Automated Yield</span>
          </div>
          <div className="flex justify-between items-center py-0.5 border-t border-white/[0.04] pt-3">
            <span className="text-white/40">Support</span>
            <span className="font-semibold text-[#fb923c] flex items-center gap-1 cursor-pointer hover:underline">
              Telegram <ExternalLink className="w-3 h-3" />
            </span>
          </div>
          <div className="flex justify-between items-center py-0.5 border-t border-white/[0.04] pt-3">
            <span className="text-white/40">Documentation</span>
            <span className="font-semibold text-[#fb923c] flex items-center gap-1 cursor-pointer hover:underline">
              Available <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* STICKY BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#07080a]/80 backdrop-blur-md border-t border-white/[0.05] py-4 px-6 flex justify-center">
        <div className="w-full max-w-[588px] flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs px-1">
            <div className="flex flex-col">
              <span className="text-[10px] text-white/30 uppercase tracking-wider">Minimum Deposit</span>
              <span className="font-bold text-white font-mono mt-0.5">$100</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-white/30 uppercase tracking-wider">Expected APY</span>
              <span className="font-bold text-[#fb923c] font-mono mt-0.5">35.5%</span>
            </div>
          </div>
          <button
            onClick={onDepositClick}
            className="w-full h-12 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-[#d97606] via-[#ea580c] to-[#dc2626] hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer shadow-lg shadow-orange-950/20 flex items-center justify-center gap-2"
          >
            Deposit
          </button>
        </div>
      </div>

      {/* SECURITY DETAILS DIALOG POPUP */}
      <AnimatePresence>
        {showSecurityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSecurityModal(false)}
              className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#0d0e12] border border-white/5 p-6 shadow-2xl z-10 orange-glow-border"
            >
              <h4 className="text-base font-bold text-white mb-4 tracking-tight flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" /> Security Verification
              </h4>

              <div className="flex flex-col gap-4 text-xs font-medium text-white/70 leading-relaxed mb-6">
                <p>
                  EvaFin strategies run on fully verified Ethereum Mainnet smart contracts that are non-custodial. Funds reside in pool contracts and can only be withdrawn to the depositor&apos;s address.
                </p>

                <div className="bg-white/[0.02] border border-white/5 rounded-lg p-3">
                  <span className="text-[10px] text-white/30 block mb-1">Contract Address</span>
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[11px] text-white/80 select-all">
                      0x42f89ef67dbad901abcf81290325a7251ea029ae
                    </span>
                    <button
                      onClick={copyContractAddress}
                      className="p-1 hover:bg-white/5 rounded text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {copiedContract && (
                    <span className="text-[9px] text-emerald-400 font-bold block mt-1">
                      Address copied!
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.03]">
                    <span>PeckShield Audit</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      Passed <CheckIcon />
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.03]">
                    <span>CertiK Audit Score</span>
                    <span className="text-emerald-400 font-bold">94/100</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Admin Controls</span>
                    <span className="text-white font-bold">3-of-5 Multi-Sig</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowSecurityModal(false)}
                className="w-full h-11 bg-white/5 hover:bg-white/10 transition-colors rounded-xl text-xs font-bold text-white cursor-pointer"
              >
                Close Details
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Auxiliary Check Icon
const CheckIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-emerald-400" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
