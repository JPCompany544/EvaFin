"use client";

import React, { useState } from "react";
import { useApp } from "./AppContext";
import { X, ArrowLeft, Download, ShieldCheck, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Custom Fallback Icons
const MetaMaskFallbackIcon: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M29.5 14.5l-2.8-5.7-8-6.2-2.7 5.7L21 13.5l-5 2.5-5-2.5 5-5.2-2.7-5.7-8 6.2-2.8 5.7 2.2 4.4 7.2 2 1.4 7.6 4.2-6.6 4.2 6.6 1.4-7.6 7.2-2 2.2-4.4z" fill="#E2761B"/>
    <path d="M16 11.5l-2.7-5.7-10.8 8.4 2.8 5.7 10.7-8.4zm0 0l2.7-5.7 10.8 8.4-2.8 5.7-10.7-8.4z" fill="#E4761B" opacity="0.8"/>
    <path d="M16 16l-5-2.5 1.5 5.5 3.5 2.5 3.5-2.5 1.5-5.5-5 2.5z" fill="#D7C3B3"/>
    <path d="M16 26.5l-4.2-6.6-1.4 7.6 5.6 2.5 5.6-2.5-1.4-7.6-4.2 6.6z" fill="#233447"/>
  </svg>
);

const TrustWalletFallbackIcon: React.FC = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.5 4.5 5 5.5 3 6v6.5c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6c-2-.5-5.5-1.5-9-4zm0 2.4c2.8 1.85 5.6 2.65 7.2 3.05V12.5c0 4.35-2.9 8.35-7.2 9.5-4.3-1.15-7.2-5.15-7.2-9.5V7.45c1.6-.4 4.4-1.2 7.2-3.05z" fill="#05A0FF" />
  </svg>
);

export const ConnectModal: React.FC = () => {
  const { isConnectModalOpen, setConnectModalOpen, connectWallet, isActionLoading, announcedProviders } = useApp();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [showInstallGuide, setShowInstallGuide] = useState<string | null>(null);

  // Check if wallet is installed (EIP-6963 or Legacy properties)
  const getWalletStatus = (name: string) => {
    if (typeof window === "undefined") return false;

    if (name === "MetaMask") {
      const hasEIP6963 = announcedProviders.some((p) => p.info.rdns === "io.metamask");
      const hasLegacy = window.ethereum?.isMetaMask && !window.ethereum?.isTrust;
      const hasMultiple = window.ethereum?.providers?.some((p: any) => p.isMetaMask && !p.isTrust);
      return hasEIP6963 || hasLegacy || hasMultiple;
    }

    if (name === "Trust Wallet") {
      const hasEIP6963 = announcedProviders.some((p) => p.info.rdns === "com.trustwallet.extension");
      const hasLegacy = !!window.trustwallet || window.ethereum?.isTrust;
      const hasMultiple = window.ethereum?.providers?.some((p: any) => p.isTrust);
      return hasEIP6963 || hasLegacy || hasMultiple;
    }

    return false;
  };

  const wallets = [
    {
      name: "MetaMask",
      description: "Connect to MetaMask extension",
      fallbackIcon: <MetaMaskFallbackIcon />,
      rdns: "io.metamask",
      downloadUrl: "https://metamask.io/download/",
    },
    {
      name: "Trust Wallet",
      description: "Connect to Trust Wallet extension",
      fallbackIcon: <TrustWalletFallbackIcon />,
      rdns: "com.trustwallet.extension",
      downloadUrl: "https://trustwallet.com/download/",
    },
  ];

  const handleConnectClick = async (wallet: typeof wallets[0]) => {
    const isInstalled = getWalletStatus(wallet.name);
    
    if (!isInstalled) {
      setShowInstallGuide(wallet.name);
      return;
    }

    setSelectedWallet(wallet.name);
    await connectWallet(wallet.name);
    setSelectedWallet(null);
  };

  const getAnnouncedIcon = (rdns: string) => {
    const found = announcedProviders.find((p) => p.info.rdns === rdns);
    return found ? found.info.icon : null;
  };

  return (
    <AnimatePresence>
      {isConnectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isActionLoading && setConnectModalOpen(false)}
            className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#0d0e12] border border-white/5 p-6 shadow-2xl z-10 orange-glow-border"
          >
            {/* Close button */}
            <button
              disabled={isActionLoading}
              onClick={() => {
                setConnectModalOpen(false);
                setShowInstallGuide(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-white/5 text-white/40 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Switcher */}
            <AnimatePresence mode="wait">
              {isActionLoading ? (
                <motion.div
                  key="connecting"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center justify-center py-10 text-center"
                >
                  <div className="relative w-16 h-16 mb-6">
                    <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                    <div className="absolute inset-0 rounded-full border-2 border-t-[#ea580c] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">
                    Connecting to {selectedWallet}
                  </h3>
                  <p className="text-sm text-white/50">
                    Confirm the connection request in your wallet window.
                  </p>
                </motion.div>
              ) : showInstallGuide ? (
                // Installation Guide Screen
                <motion.div
                  key="install-guide"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button
                    onClick={() => setShowInstallGuide(null)}
                    className="flex items-center gap-2 text-xs font-semibold text-[#fb923c] hover:text-[#f97316] mb-5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back to Wallets
                  </button>

                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white tracking-tight">
                      Install {showInstallGuide}
                    </h3>
                    <p className="text-sm text-white/50 mt-1">
                      You need the browser extension to connect this wallet.
                    </p>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-xl p-5 mb-6">
                    <div className="flex flex-col gap-4 text-sm">
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-xs font-semibold flex items-center justify-center text-white/60 shrink-0">
                          1
                        </div>
                        <p className="text-white/70 leading-relaxed">
                          Click download below to install the extension for your browser.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-xs font-semibold flex items-center justify-center text-white/60 shrink-0">
                          2
                        </div>
                        <p className="text-white/70 leading-relaxed">
                          After installing, refresh this page to establish the connection.
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={wallets.find((w) => w.name === showInstallGuide)?.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-12 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#d97606] via-[#ea580c] to-[#dc2626] hover:brightness-110 flex items-center justify-center gap-2 shadow-lg transition-all"
                  >
                    <Download className="w-4 h-4" /> Download Extension
                  </a>
                </motion.div>
              ) : (
                // Wallet List Selection Screen
                <motion.div
                  key="select-wallet"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-white tracking-tight">
                      Connect Wallet
                    </h3>
                    <p className="text-sm text-white/50 mt-1">
                      Select a supported Web3 wallet extension.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    {wallets.map((wallet) => {
                      const isInstalled = getWalletStatus(wallet.name);
                      const announcedIcon = getAnnouncedIcon(wallet.rdns);

                      return (
                        <button
                          key={wallet.name}
                          onClick={() => handleConnectClick(wallet)}
                          className="w-full flex items-center gap-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 text-left transition-all duration-200 group cursor-pointer"
                        >
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 group-hover:scale-105 transition-transform overflow-hidden p-1.5">
                            {announcedIcon ? (
                              <img
                                src={announcedIcon}
                                alt={wallet.name}
                                className="w-full h-full object-contain"
                              />
                            ) : (
                              wallet.fallbackIcon
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-white group-hover:translate-x-0.5 transition-transform">
                                {wallet.name}
                              </span>
                              {isInstalled ? (
                                <span className="flex items-center gap-1 text-[9px] font-bold text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded border border-[#10B981]/20">
                                  <ShieldCheck className="w-2.5 h-2.5" /> Installed
                                </span>
                              ) : (
                                <span className="flex items-center gap-0.5 text-[9px] font-bold text-white/40 bg-white/5 px-1.5 py-0.5 rounded">
                                  Download
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-white/40 mt-1">
                              {wallet.description}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex justify-between items-center px-1">
                    <span className="text-[10px] text-white/20">
                      Supports Trust Wallet & MetaMask
                    </span>
                    <a
                      href="https://ethereum.org/en/wallets/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-white/40 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <HelpCircle className="w-3 h-3" /> Learn about wallets
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
