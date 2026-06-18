"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How does Eva work?",
    a: "Eva aggregates your deposited ETH across multiple battle-tested DeFi protocols — including Aave, Compound, and Curve — using automated smart contract strategies. Our algorithms rebalance allocations in real-time to maximise yield while managing risk. You simply deposit and monitor your returns from the dashboard.",
  },
  {
    q: "What is the minimum investment?",
    a: "The minimum deposit is $100 worth of ETH at the time of investment. There is no maximum cap. You can scale your position at any time by making additional deposits through your connected wallet.",
  },
  {
    q: "Can I withdraw anytime?",
    a: "Standard withdrawals are processed within 24–72 hours depending on liquidity pool conditions. Emergency withdrawals are available at any time, subject to a small early-exit fee. Your funds always remain in your non-custodial smart contract position — we never lock your capital without notice.",
  },
  {
    q: "How are returns generated?",
    a: "Returns come from multiple yield sources: lending interest (supplying assets to Aave and Compound), liquidity provision fees (Curve and Uniswap V3 concentrated liquidity ranges), and automated compounding that reinvests earnings back into the highest-yielding positions every 24 hours.",
  },
  {
    q: "How secure is Eva?",
    a: "All smart contracts have been independently audited by leading Web3 security firms. The platform is fully non-custodial — only you control your private keys. We use Chainlink price oracles, automated circuit breakers, and real-time on-chain monitoring to protect your position around the clock.",
  },
  {
    q: "Which wallets are supported?",
    a: "Eva supports MetaMask, Coinbase Wallet, WalletConnect (compatible with 300+ wallets including Rainbow, Trust Wallet, and Ledger Live), and most browser-native Ethereum wallet extensions. Mobile wallets that support WalletConnect v2 are fully supported.",
  },
];

export const Faq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#0F1115] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono uppercase tracking-wider text-white/40"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-3"
          >
            Common questions.
          </motion.h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-white/10 bg-[#121418]"
                    : "border-white/5 bg-[#121418]/60 hover:border-white/8"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-5 text-left cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-medium text-white">{faq.q}</span>
                  <span
                    className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isOpen
                        ? "border-white/20 bg-white/5 text-white"
                        : "border-white/10 text-white/40"
                    }`}
                  >
                    {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-white/50 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
