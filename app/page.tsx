"use client";

import React, { useState, useRef } from "react";
import { useApp } from "@/components/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, Maximize, Settings, LogOut } from "lucide-react";
import { StrategyView } from "@/components/StrategyView";

// Inline ETH Icon
const EthIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.925 23.96l-9.813-5.797L15.925 32l9.825-13.837-9.825 5.797zM16.075 0L6.25 16.326l9.825 5.808 9.813-5.808L16.075 0z" fill="#627EEA" />
  </svg>
);

// Inline Maple Logo leaf
const MapleLeafIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C10 6 7 8.5 4 10C8 11 10 13.5 11 17.5C12 13.5 14 11 18 10C15 8.5 13 6 12 2Z" fill="url(#leaf-grad)" />
    <path d="M12 7C11.33 9.67 9.33 11.33 7.33 12.33C9.33 13 10.67 14.67 11.33 17.33C12 14.67 13.33 13 15.33 12.33C13.33 11.33 12 9.67 12 7Z" fill="url(#leaf-grad-inner)" />
    <defs>
      <linearGradient id="leaf-grad" x1="4" y1="2" x2="18" y2="17.5" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FB923C" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
      <linearGradient id="leaf-grad-inner" x1="7.33" y1="7" x2="15.33" y2="17.33" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FDBA74" />
        <stop offset="100%" stopColor="#F97316" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Home() {
  const {
    isWalletConnected,
    walletAddress,
    setConnectModalOpen,
    portfolioBalance,
    ethBalance,
    simulateDeposit,
    ethPrice,
    isActionLoading,
    toasts,
    removeToast,
    disconnectWallet,
  } = useApp();

  // Navigation state (Layer 1 Home vs Layer 2 Strategy view)
  const [currentView, setCurrentView] = useState<"home" | "strategy">("home");

  // Input states
  const [ethAmount, setEthAmount] = useState<string>("0");

  // DOM Refs for scroll routing and focus
  const depositCardRef = useRef<HTMLFormElement>(null);
  const depositInputRef = useRef<HTMLInputElement>(null);

  const handleWalletClick = () => {
    if (!isWalletConnected) {
      setConnectModalOpen(true);
    } else {
      if (window.confirm("Do you want to disconnect your wallet?")) {
        disconnectWallet();
      }
    }
  };

  const handleMaxClick = () => {
    if (!isWalletConnected) {
      setConnectModalOpen(true);
      return;
    }
    // Leave a small 0.006 ETH gas buffer so they can perform the transaction
    const maxVal = Math.max(0, ethBalance - 0.006);
    setEthAmount(maxVal.toFixed(5));
  };

  const handleDepositSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isWalletConnected) {
      setConnectModalOpen(true);
      return;
    }
    const amount = Number(ethAmount);
    if (amount <= 0) {
      return;
    }

    await simulateDeposit(amount);
    setEthAmount("0");
  };

  // Switch view back to Home, scroll to the Deposit form card and focus the input field
  const handleStrategyDepositClick = () => {
    setCurrentView("home");
    setTimeout(() => {
      if (depositCardRef.current) {
        depositCardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (depositInputRef.current) {
        depositInputRef.current.focus();
      }
    }, 350);
  };

  return (
    <main className="min-h-screen w-full bg-[#07080a] text-white flex flex-col items-center justify-start font-sans select-none overflow-x-hidden relative dot-grid pb-20">
      {/* Ambient background glow spotlight */}
      <div className="absolute inset-0 ambient-spotlight pointer-events-none z-0" />

      {/* Toast notifications */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`p-4 rounded-xl border backdrop-blur-md shadow-2xl flex items-start gap-3 pointer-events-auto cursor-pointer ${toast.type === "success"
                  ? "bg-[#09140f]/95 border-[#10B981]/20 text-white"
                  : toast.type === "error"
                    ? "bg-[#140909]/95 border-[#EF4444]/20 text-white"
                    : "bg-[#0d0e12]/95 border-white/10 text-white"
                }`}
              onClick={() => removeToast(toast.id)}
            >
              {toast.type === "success" ? (
                <div className="w-5 h-5 rounded-full bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-center text-[#10B981] shrink-0 mt-0.5 text-xs font-bold">
                  ✓
                </div>
              ) : toast.type === "error" ? (
                <div className="w-5 h-5 rounded-full bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444] shrink-0 mt-0.5 text-xs font-bold">
                  !
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/50 shrink-0 mt-0.5 text-xs font-bold">
                  i
                </div>
              )}
              <div className="flex-1 text-xs font-medium leading-relaxed">
                {toast.message}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeToast(toast.id);
                }}
                className="text-white/20 hover:text-white transition-colors text-xs font-semibold px-1"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* TOP HEADER */}
      <header className="w-full h-[64px] border-b border-white/[0.04] bg-[#07080a]/60 backdrop-blur-md flex items-center justify-between px-8 z-10">
        {/* Left side Logo */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView("home")}>
            <MapleLeafIcon className="w-6 h-6" />
            <span className="text-lg font-bold tracking-tight text-white font-sans">EvaFin</span>
          </div>
        </div>

        {/* Right side Wallet Connection */}
        <button
          onClick={handleWalletClick}
          className={`h-9 px-5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 cursor-pointer flex items-center gap-2 group ${isWalletConnected
              ? "bg-[#0d0e12]/80 border-[#10B981]/25 text-[#10B981] hover:border-[#EF4444]/30 hover:text-[#EF4444] hover:bg-[#140909]/20"
              : "bg-[#0d0e12]/40 border-white/[0.08] hover:border-white/20 text-white/80 hover:text-white"
            }`}
        >
          {isWalletConnected ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] group-hover:bg-[#EF4444] animate-pulse" />
              <span className="group-hover:hidden">{walletAddress}</span>
              <span className="hidden group-hover:flex items-center gap-1">
                <LogOut className="w-3 h-3" /> Disconnect
              </span>
            </>
          ) : (
            "Connect Wallet"
          )}
        </button>
      </header>

      {/* VIEW CONTENT SWITCHER */}
      <AnimatePresence mode="wait">
        {currentView === "home" ? (
          <motion.div
            key="home-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full max-w-[620px] flex flex-col items-center mt-12 px-4 z-10"
          >
            {/* PORTFOLIO BALANCE SECTION */}
            <div className="w-full bg-[#0d0e12] border border-white/[0.04] rounded-2xl px-6 py-5 mb-4 orange-glow-border">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] text-white/35 font-medium uppercase tracking-widest mb-1.5">
                    Portfolio
                  </span>
                  <span className="text-[28px] font-semibold text-white tracking-tight leading-none">
                    {isWalletConnected ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(portfolioBalance) : "$0.00"}
                  </span>
                  <span className="text-[12px] text-white/25 mt-1.5">
                    {isWalletConnected ? `${ethBalance.toFixed(5)} ETH` : "No active positions"}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-center text-white/20">
                  <MapleLeafIcon className="w-5 h-5 opacity-30" />
                </div>
              </div>
            </div>

            {/* RICH STRATEGY GATEWAY CARD */}
            <div
              onClick={() => setCurrentView("strategy")}
              className="w-full bg-[#0d0e12] border border-white/[0.04] rounded-2xl p-5 mb-4 hover:border-white/10 hover:bg-white/[0.03] transition-all cursor-pointer group orange-glow-border"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-white tracking-tight">ETH Yield Strategy</span>
              </div>

              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-2xl font-bold text-[#fb923c] font-mono leading-none">35.5% APY</span>
                  <span className="text-[10px] text-white/30 font-medium">Ethereum Mainnet</span>
                </div>

                <div className="text-right flex flex-col gap-1 items-end">
                  <span className="text-xs font-bold text-white font-mono leading-none">&gt;$4.2M TVL</span>
                  <span className="text-[10px] text-[#fb923c] flex items-center gap-0.5 font-semibold mt-0.5">
                    Tap to view <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </span>
                </div>
              </div>
            </div>

            {/* MAIN DEPOSIT CARD */}
            <form
              ref={depositCardRef}
              onSubmit={handleDepositSubmit}
              className="w-full bg-[#0d0e12] border border-white/[0.04] rounded-2xl p-6 shadow-2xl relative overflow-hidden orange-glow-border"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-base font-bold text-white tracking-tight">Deposit</span>
                <EthIcon className="w-5 h-5 border border-[#0d0e12] rounded-full" />
              </div>

              {/* ETH Input Section */}
              <div className="bg-black/20 border border-white/[0.03] rounded-xl p-4 mb-3 relative">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2 px-1">
                    <EthIcon className="w-4.5 h-4.5" />
                    <span className="text-xs font-semibold text-white">ETH</span>
                  </div>
                  <input
                    ref={depositInputRef}
                    type="number"
                    step="any"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    className="bg-transparent text-xl font-semibold text-white text-right border-none outline-none w-32 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <button
                    type="button"
                    onClick={handleMaxClick}
                    className="text-[#fb923c] font-semibold hover:text-[#f97316] transition-colors cursor-pointer"
                  >
                    MAX
                  </button>
                  <span className="text-white/30">
                    Wallet {isWalletConnected ? `${ethBalance.toFixed(5)} ETH` : "0.00000 ETH"}
                  </span>
                </div>
              </div>

              {/* Details Row */}
              <div className="border-t border-white/[0.04] pt-4 mb-6 text-left">
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/30 font-medium uppercase tracking-wider">
                    Estimated annual yield
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <EthIcon className="w-3.5 h-3.5 rounded-full" />
                    <span className="text-xs font-bold text-white font-mono">35.5%</span>
                  </div>
                </div>
              </div>

              {/* Connect / Action Button */}
              <button
                type="submit"
                disabled={isActionLoading}
                className="w-full h-[50px] rounded-xl font-bold text-sm tracking-wide text-white transition-all bg-gradient-to-r from-[#d97606] via-[#ea580c] to-[#dc2626] hover:brightness-110 active:scale-[0.99] cursor-pointer shadow-lg shadow-orange-950/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isActionLoading && <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                {isActionLoading ? "Processing..." : "Deposit"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="strategy-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="w-full flex justify-center mt-6"
          >
            <StrategyView
              onBack={() => setCurrentView("home")}
              onDepositClick={handleStrategyDepositClick}
              ethPrice={ethPrice}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOTTOM RIGHT FLOATING SOCIALS / ACTIONS TOOLBAR */}
      <div className="fixed bottom-6 right-8 flex items-center gap-1.5 z-50">
        <button className="w-7 h-7 rounded bg-[#0d0e12] border border-white/[0.06] text-white/40 hover:text-white flex items-center justify-center transition-colors cursor-pointer hover:bg-[#16171d]">
          <Volume2 className="w-3.5 h-3.5" />
        </button>
        <button className="w-7 h-7 rounded bg-[#0d0e12] border border-white/[0.06] text-white/40 hover:text-white flex items-center justify-center transition-colors cursor-pointer hover:bg-[#16171d]">
          <Maximize className="w-3.5 h-3.5" />
        </button>
        <button className="w-7 h-7 rounded bg-[#0d0e12] border border-white/[0.06] text-white/40 hover:text-white flex items-center justify-center transition-colors cursor-pointer hover:bg-[#16171d]">
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>
    </main>
  );
}
