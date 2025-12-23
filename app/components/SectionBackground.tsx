"use client";

import { motion } from "framer-motion";

export default function SectionBackground() {
  return (
    <>
      {/* --- BACKGROUND FX --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Horizontal Lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-px bg-linear-to-r from-transparent via-pink-500/20 to-transparent w-full"
            style={{ top: `${10 + i * 15}%` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 14 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        {/* Vertical Lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute w-px bg-linear-to-b from-transparent via-purple-500/20 to-transparent h-full"
            style={{ left: `${10 + i * 15}%` }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 18 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
    </>
  );
}
