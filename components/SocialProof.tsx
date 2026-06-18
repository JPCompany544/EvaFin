"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "James Whitfield",
    country: "🇬🇧",
    location: "London, UK",
    invested: "$24,000",
    growth: "+22.4%",
    duration: "14 months",
    quote:
      "I've tried three other DeFi platforms. None came close to Eva in terms of reliability, UX, and actual yield. It just works.",
    initials: "JW",
    avatarColor: "#3B82F6",
  },
  {
    name: "Sophia Andersson",
    country: "🇸🇪",
    location: "Stockholm, SE",
    invested: "$51,000",
    growth: "+31.1%",
    duration: "22 months",
    quote:
      "As someone with a background in finance, I was sceptical. But the transparency — every tx on-chain — won me over completely.",
    initials: "SA",
    avatarColor: "#10B981",
  },
  {
    name: "Marcus Fontaine",
    country: "🇫🇷",
    location: "Paris, FR",
    invested: "$8,500",
    growth: "+14.8%",
    duration: "9 months",
    quote:
      "Started with a small amount to test. Six months later I moved my full DeFi allocation here. The dashboard alone is worth it.",
    initials: "MF",
    avatarColor: "#8B5CF6",
  },
  {
    name: "Aiko Tanaka",
    country: "🇯🇵",
    location: "Tokyo, JP",
    invested: "$120,000",
    growth: "+18.7%",
    duration: "18 months",
    quote:
      "The institutional-grade strategies and non-custodial design gave me the confidence to move a significant position into Eva.",
    initials: "AT",
    avatarColor: "#F59E0B",
  },
  {
    name: "David Okonkwo",
    country: "🇳🇬",
    location: "Lagos, NG",
    invested: "$5,200",
    growth: "+19.3%",
    duration: "11 months",
    quote:
      "Easy on-boarding, excellent mobile experience, and steady returns. Eva is the best DeFi investment product I've used.",
    initials: "DO",
    avatarColor: "#EC4899",
  },
];

export const SocialProof: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const count = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + count) % count);
  const next = () => setCurrent((c) => (c + 1) % count);

  // Show 3 cards at a time on desktop, 1 on mobile
  const visible = [
    testimonials[(current) % count],
    testimonials[(current + 1) % count],
    testimonials[(current + 2) % count],
  ];

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-blue-500/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-mono uppercase tracking-wider text-white/40"
            >
              Investors
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mt-2"
            >
              Trusted worldwide.
            </motion.h2>
          </div>

          {/* Nav Arrows */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cards — desktop shows 3, mobile 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visible.map((t, i) => (
            <motion.div
              key={`${t.name}-${current}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`bg-[#121418] border border-white/5 rounded-2xl p-6 flex flex-col gap-5 ${
                i > 0 ? "hidden md:flex" : "flex"
              }`}
            >
              {/* Stats Row */}
              <div className="flex gap-3">
                <div className="flex-1 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-wide">Invested</p>
                  <p className="text-sm font-bold text-white font-mono mt-0.5">{t.invested}</p>
                </div>
                <div className="flex-1 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15 text-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-wide">Growth</p>
                  <p className="text-sm font-bold text-emerald-400 font-mono mt-0.5">{t.growth}</p>
                </div>
                <div className="flex-1 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                  <p className="text-[10px] text-white/40 uppercase tracking-wide">Duration</p>
                  <p className="text-sm font-bold text-white font-mono mt-0.5">{t.duration}</p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-white/60 leading-relaxed italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                  style={{ backgroundColor: `${t.avatarColor}30`, border: `1px solid ${t.avatarColor}40` }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">
                    {t.country} {t.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === current % count ? "w-6 bg-white" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
