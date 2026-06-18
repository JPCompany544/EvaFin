"use client";

import React, { useEffect, useState, useRef } from "react";
import { ShieldAlert, TrendingUp, Users, Calendar, Settings } from "lucide-react";
import { motion, useInView } from "framer-motion";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.5,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = 30; // 30ms intervals
    const steps = totalMiliseconds / incrementTime;
    const incrementValue = (end - start) / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      start += incrementValue;
      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration, isInView]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};

export const TrustBar: React.FC = () => {
  const metrics = [
    {
      label: "Total Value Locked",
      val: 148251902,
      prefix: "$",
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
    },
    {
      label: "Active Investors",
      val: 14845,
      suffix: "+",
      icon: <Users className="w-4 h-4 text-blue-400" />,
    },
    {
      label: "Years Operating",
      val: 4,
      suffix: "+",
      icon: <Calendar className="w-4 h-4 text-purple-400" />,
    },
    {
      label: "Strategies Running",
      val: 12,
      icon: <Settings className="w-4 h-4 text-amber-400" />,
    },
    {
      label: "Smart Contracts",
      val: 100,
      suffix: "% Audited",
      icon: <ShieldAlert className="w-4 h-4 text-emerald-400" />,
    },
  ];

  return (
    <section className="py-12 bg-[#0F1115] border-y border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {metrics.map((metric, idx) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-[#121418] border border-white/5 shadow-lg flex flex-col items-start gap-3 hover:border-white/10 transition-colors duration-200"
            >
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                {metric.icon}
              </div>
              <div>
                <span className="text-white/40 text-[10px] uppercase tracking-wider block">
                  {metric.label}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-white mt-1 block font-mono tracking-tight">
                  <AnimatedCounter
                    value={metric.val}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
