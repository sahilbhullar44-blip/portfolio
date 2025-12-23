"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Cpu } from "lucide-react";
import { getSystemSpecs } from "@/app/actions";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const cpuRef = useRef(null);
  const [cpuText, setCpuText] = useState("CORE_i9"); // Initialize with default
  const [subText, setSubText] = useState("128 THREADS"); // Initialize with default

  // Pre-calculate deterministic values to avoid calling Math.random during render
  const pathAnimations = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        duration: 2 + ((i * 0.3) % 1),
        delay: (i * 0.25) % 2,
      })),
    []
  );

  useEffect(() => {
    const fetchSystemData = async () => {
      const specs = await getSystemSpecs();
      setCpuText(specs.cpuModel.toUpperCase());
      setSubText(`${specs.threads} THREADS`);
    };

    fetchSystemData();
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(contentRef.current, {
        y: 200,
        opacity: 0,
        ease: "none",
      });

      gsap.from(cpuRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-black pt-20 md:pt-0 hero-section"
    >
      {/* Background Circuit Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-linear-to-r from-transparent via-cyan-500/20 to-transparent w-full"
            style={{ top: `${20 + i * 15}%` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute w-px bg-linear-to-b from-transparent via-cyan-500/20 to-transparent h-full"
            style={{ left: `${20 + i * 15}%` }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
        {/* Left Column: Info */}
        <div ref={contentRef} className="flex flex-col items-start space-y-6">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs border border-cyan-900/50 bg-cyan-950/30 px-3 py-1 rounded-full">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
            <span>SYSTEM_READY</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
            FULL STACK
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-purple-600">
              ARCHITECT
            </span>
          </h1>

          <div className="font-mono text-sm text-gray-400 space-y-2 border-l-2 border-cyan-900 pl-4">
            {[...Array(3)].map((_, index) => {
              const text = [
                "OPTIMIZING KERNEL PROCESSES...",
                "ALLOCATING MEMORY BLOCKS...",
                "EXECUTING MAIN THREAD",
              ][index];
              return (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    color: index === 2 ? "#ffffff" : "#94a3b8",
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.5,
                    ease: "easeOut",
                  }}
                  className={index === 2 ? "text-white" : ""}
                >
                  {text}
                </motion.p>
              );
            })}
          </div>
          <p className="text-gray-400 max-w-md text-lg font-light">
            Designing high-performance digital infrastructure with precision
            engineering.
          </p>
        </div>

        {/* Right Column: CPU Visual */}
        <div ref={cpuRef} className="relative flex items-center justify-center">
          {/* CPU Container */}
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            {/* Circuit Traces (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]"
              viewBox="0 0 400 400"
            >
              <defs>
                <linearGradient
                  id="traceGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                  <stop offset="50%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                </linearGradient>
              </defs>

              {/* Animated Paths */}
              {[...Array(8)].map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const x1 = 200 + Math.cos(angle) * 80;
                const y1 = 200 + Math.sin(angle) * 80;
                const x2 = 200 + Math.cos(angle) * 180;
                const y2 = 200 + Math.sin(angle) * 180;

                return (
                  <motion.path
                    key={i}
                    d={`M ${x1} ${y1} L ${x2} ${y2}`}
                    stroke="url(#traceGrad)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                      pathLength: [0, 1, 0],
                      opacity: [0, 1, 0],
                      strokeDashoffset: [0, -100],
                    }}
                    transition={{
                      duration: pathAnimations[i].duration,
                      repeat: Infinity,
                      ease: "linear",
                      delay: pathAnimations[i].delay,
                    }}
                  />
                );
              })}
            </svg>

            {/* Main CPU Chip */}
            <div className="absolute inset-0 m-auto w-40 h-40 md:w-56 md:h-56 bg-zinc-900 border-2 border-cyan-500/50 rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.15)] z-20 overflow-hidden group">
              {/* Inner Grid Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-size-[10px_10px]" />

              {/* Core Pulse */}
              <motion.div
                className="absolute inset-0 bg-cyan-500/10"
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Chip Content */}
              <div className="relative z-30 flex flex-col items-center">
                <Cpu size={48} className="text-cyan-400 mb-2" />
                <div className="text-cyan-100 font-mono font-bold text-xl tracking-widest text-center">
                  {cpuText}
                </div>
                <div className="text-cyan-500/70 font-mono text-[10px] mt-1">
                  {subText}
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-cyan-500" />
              <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-cyan-500" />
              <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-cyan-500" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-cyan-500" />
            </div>

            {/* Floating Particles around CPU */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                animate={{
                  x: Math.cos(i) * 140,
                  y: Math.sin(i) * 140,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-2 text-gray-500 font-mono text-xs pointer-events-none"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-px h-12 bg-linear-to-b from-cyan-500 to-transparent"></div>
        SCROLL_TO_PROCESS
      </motion.div>
    </section>
  );
};

export default Hero;
