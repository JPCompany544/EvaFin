"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "./AppContext";
import { Wallet, LogOut, Shield, ArrowUpRight, Menu, X } from "lucide-react";

export const Header: React.FC = () => {
  const { isWalletConnected, walletAddress, setConnectModalOpen, disconnectWallet } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-4 bg-[#050505]/75 backdrop-blur-md border-b border-white/5"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg bg-white flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <span className="font-extrabold text-black text-lg font-sans tracking-tight">E</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-500/10 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white font-sans">
            Eva<span className="text-white/40 font-normal">.invest</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#how-it-works"
            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
          >
            How It Works
          </a>
          <a
            href="#performance"
            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
          >
            Performance
          </a>
          <a
            href="#security"
            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
          >
            Security
          </a>
          <a
            href="#faq"
            className="text-sm text-white/60 hover:text-white transition-colors duration-200"
          >
            FAQ
          </a>
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          {isWalletConnected ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-mono text-white/90">{walletAddress}</span>
              </div>
              <button
                onClick={disconnectWallet}
                className="p-2.5 rounded-full bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-white/60 hover:text-red-400 transition-all duration-200"
                title="Disconnect Wallet"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConnectModalOpen(true)}
              className="relative overflow-hidden px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors duration-200 flex items-center gap-2 group cursor-pointer"
            >
              <Wallet className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              Connect Wallet
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-white/5 text-white/70 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[68px] bg-[#050505] border-b border-white/5 py-6 px-6 flex flex-col gap-6 animate-fade-in-up">
          <nav className="flex flex-col gap-4">
            <a
              href="#how-it-works"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base text-white/70 hover:text-white"
            >
              How It Works
            </a>
            <a
              href="#performance"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base text-white/70 hover:text-white"
            >
              Performance
            </a>
            <a
              href="#security"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base text-white/70 hover:text-white"
            >
              Security
            </a>
            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base text-white/70 hover:text-white"
            >
              FAQ
            </a>
          </nav>
          
          <div className="pt-4 border-t border-white/5">
            {isWalletConnected ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 w-full justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm font-mono text-white/90">{walletAddress}</span>
                </div>
                <button
                  onClick={() => {
                    disconnectWallet();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setConnectModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white text-black text-sm font-medium"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
