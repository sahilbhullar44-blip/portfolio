"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Terminal,
  ArrowDownToLine,
  ArrowUpFromLine,
  Eye,
  AlertCircle,
} from "lucide-react";

const techPool = [
  {
    id: "next",
    name: "Next.js",
    type: "FRAMEWORK",
    size: "0x99",
    color: "text-white",
    border: "border-white/40",
    bg: "bg-white/5",
  },
  {
    id: "react",
    name: "React.js",
    type: "UI_LIB",
    size: "0x4A",
    color: "text-cyan-400",
    border: "border-cyan-500/50",
    bg: "bg-cyan-500/10",
  },
  {
    id: "ts",
    name: "TypeScript",
    type: "LANG",
    size: "0x1A",
    color: "text-blue-400",
    border: "border-blue-500/50",
    bg: "bg-blue-500/10",
  },
  {
    id: "node",
    name: "Node.js",
    type: "RUNTIME",
    size: "0x2F",
    color: "text-green-400",
    border: "border-green-500/50",
    bg: "bg-green-500/10",
  },
  {
    id: "express",
    name: "Express",
    type: "BACKEND",
    size: "0x3E",
    color: "text-yellow-400",
    border: "border-yellow-500/50",
    bg: "bg-yellow-500/10",
  },
  {
    id: "mongo",
    name: "MongoDB",
    type: "NO_SQL",
    size: "0xD4",
    color: "text-emerald-500",
    border: "border-emerald-500/50",
    bg: "bg-emerald-500/10",
  },
  {
    id: "pg",
    name: "Postgres",
    type: "DB_SQL",
    size: "0xC2",
    color: "text-purple-400",
    border: "border-purple-500/50",
    bg: "bg-purple-500/10",
  },
];

interface TechItem {
  id: string;
  name: string;
  type: string;
  size: string;
  color: string;
  border: string;
  bg: string;
  instanceId?: number;
}

const TechStack = () => {
  const [stack, setStack] = useState<TechItem[]>([]);
  const [isPeeking, setIsPeeking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const controlsRef = useRef(null);
  const stackRef = useRef(null);
  const idCounterRef = useRef(0);

  // Auto-Push Effect
  useEffect(() => {
    if (!hasStarted) return;

    const interval = setInterval(() => {
      setStack((prev) => {
        if (prev.length >= 6) {
          clearInterval(interval);
          return prev;
        }
        const nextItem = {
          ...techPool[prev.length % techPool.length],
          instanceId: ++idCounterRef.current,
        };
        return [...prev, nextItem];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasStarted]);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          onEnter: () => setHasStarted(true),
        },
      });

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          controlsRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          stackRef.current,
          {
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6"
        );
    },
    { scope: containerRef }
  );

  const handlePush = () => {
    if (stack.length >= 6) {
      triggerError("STACK_OVERFLOW_EXCEPTION");
      return;
    }
    setError(null);
    const nextItem = {
      ...techPool[stack.length % techPool.length],
      instanceId: ++idCounterRef.current,
    };
    setStack((prev) => [...prev, nextItem]);
    setIsPeeking(false);
  };

  const handlePop = () => {
    if (stack.length === 0) {
      triggerError("STACK_UNDERFLOW_EXCEPTION");
      return;
    }
    setError(null);
    setStack((prev) => prev.slice(0, -1));
    setIsPeeking(false);
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      triggerError("NULL_POINTER_EXCEPTION");
      return;
    }
    setError(null);
    setIsPeeking(true);
    setTimeout(() => setIsPeeking(false), 1500);
  };

  const triggerError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 2000);
  };

  return (
    <section
      id="stack"
      ref={containerRef}
      className="min-h-screen bg-[#050505] py-12 md:py-24 relative overflow-hidden flex items-center justify-center"
    >
      {/* Background Gradient Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
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
              duration: 14 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>
      {/* Section Shadow Overlays */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#080808] via-[#080808]/50 to-transparent pointer-events-none z-1"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#050505] via-[#050505]/50 to-transparent pointer-events-none z-1"></div>
      <div className="container mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center relative z-10">
        <div>
          <div ref={titleRef}>
            <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
              <Terminal className="text-cyan-400" size={20} />
              <h2 className="text-3xl md:text-5xl font-bold text-white font-mono">
                SYSTEM_<span className="text-cyan-400">MEMORY</span>
              </h2>
            </div>
            <p className="text-gray-400 text-sm md:text-lg mb-6 md:mb-10 max-w-lg leading-relaxed">
              Full-stack expertise spanning MERN architecture, realtime systems,
              multi-tenant SaaS, and modern DevOps workflows.
            </p>
          </div>

          <div
            ref={controlsRef}
            className="bg-[#0a0a0a] border border-white/10 rounded-xl p-4 md:p-6 mb-6 md:mb-8 shadow-2xl shadow-cyan-900/5 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6 text-[10px] md:text-xs font-mono text-gray-500">
              <span>STATUS: READY</span>
              <span>MEM_ADDR: 0x7FFF</span>
            </div>
            <div className="flex gap-2 md:gap-4">
              <button
                onClick={handlePush}
                className="flex-1 py-3 md:py-4 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 font-mono rounded flex flex-col items-center gap-1 md:gap-2 interactive"
              >
                <ArrowDownToLine size={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">PUSH()</span>
              </button>
              <button
                onClick={handlePop}
                className="flex-1 py-3 md:py-4 bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 font-mono rounded flex flex-col items-center gap-1 md:gap-2 interactive"
              >
                <ArrowUpFromLine size={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">POP()</span>
              </button>
              <button
                onClick={handlePeek}
                className="flex-1 py-3 md:py-4 bg-yellow-600/10 hover:bg-yellow-600/20 border border-yellow-500/30 text-yellow-400 font-mono rounded flex flex-col items-center gap-1 md:gap-2 interactive"
              >
                <Eye size={16} className="md:w-5 md:h-5" />
                <span className="text-xs md:text-sm">PEEK()</span>
              </button>
            </div>
            <div className="mt-4 h-8 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {error ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-red-500 font-mono text-xs flex items-center gap-2"
                  >
                    <AlertCircle size={14} />
                    {error}
                  </motion.div>
                ) : (
                  <span className="text-gray-600 font-mono text-xs">
                    {" "}
                    Waiting for instructions...{" "}
                  </span>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div
          ref={stackRef}
          className="relative h-[350px] md:h-[500px] w-full max-w-md mx-auto"
        >
          <motion.div
            className="absolute -left-8 md:-left-12 z-20 flex items-center gap-1 md:gap-2 text-cyan-400 font-mono text-[10px] md:text-xs"
            animate={{ bottom: Math.max(32, stack.length * 72 + 32) }}
          >
            <span>SP</span>
            <span className="w-4 md:w-8 h-px bg-cyan-400"></span>
          </motion.div>
          <div className="h-full w-full border-x-2 border-b-2 border-white/10 rounded-b-xl bg-white/2 backdrop-blur-sm relative p-2 md:p-4 flex flex-col-reverse gap-2 md:gap-3 overflow-hidden">
            <div className="absolute right-2 top-0 bottom-0 flex flex-col justify-between text-[10px] font-mono text-gray-800 pointer-events-none select-none py-4 text-right">
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i}>0x00{8 - i}0</span>
              ))}
            </div>
            <AnimatePresence mode="popLayout">
              {stack.map((item, index) => {
                const isTop = index === stack.length - 1;
                return (
                  <motion.div
                    key={item.instanceId || item.id}
                    layout
                    initial={{ opacity: 0, y: -100, scale: 0.8 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      borderColor: isTop && isPeeking ? "#fbbf24" : "",
                    }}
                    exit={{
                      opacity: 0,
                      y: -50,
                      scale: 0.5,
                      filter: "blur(10px)",
                    }}
                    className={`relative h-12 md:h-16 w-full rounded border ${item.border} ${item.bg} flex items-center justify-between px-3 md:px-4 shrink-0`}
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <span
                        className={`font-bold font-mono text-sm md:text-base ${item.color}`}
                      >
                        {item.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
