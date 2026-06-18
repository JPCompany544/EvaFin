"use client";

import React from "react";
import { X, MessageCircle, Send } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0F1115] border-t border-white/5 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4 group w-fit">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shrink-0">
                <span className="font-extrabold text-black text-sm">E</span>
              </div>
              <span className="font-semibold text-white text-base tracking-tight">
                Eva<span className="text-white/40 font-normal">.invest</span>
              </span>
            </a>
            <p className="text-sm text-white/40 leading-relaxed max-w-[200px]">
              Institutional DeFi yield, made simple for everyone.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                aria-label="Twitter / X"
              >
                <X className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                aria-label="Discord"
              >
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-all"
                aria-label="Telegram"
              >
                <Send className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Product</p>
            <ul className="flex flex-col gap-3">
              {["How It Works", "Performance", "Security", "Strategies"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Company</p>
            <ul className="flex flex-col gap-3">
              {["About", "Blog", "Careers", "Press"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Legal</p>
            <ul className="flex flex-col gap-3">
              {["Privacy Policy", "Terms of Service", "Security", "Documentation"].map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Eva.invest Ltd. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            DeFi involves risk. Past performance does not guarantee future returns.
          </p>
        </div>
      </div>
    </footer>
  );
};
