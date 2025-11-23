/* eslint-disable react/jsx-no-comment-textnodes */
"use client";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
import {
  Cpu,
  Mail,
  Terminal,
  Linkedin,
  ArrowDownToLine,
  ArrowUpFromLine,
  Eye,
  AlertCircle,
  FileJson,
  FileCode,
  FileText,
  Folder,
  ChevronRight,
  Layout,
  HardDrive,
  Search,
  Smartphone,
  Server,
  X,
  Box,
} from "lucide-react";

import { getSystemSpecs } from "@/app/actions";
import Link from "next/link";

// --- 1. CUSTOM CURSOR COMPONENT ---
const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovering(
        !!(
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.closest(".interactive")
        )
      );
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border border-cyan-400/50 rounded-full pointer-events-none z-40"
        animate={{
          x: mousePos.x - 24,
          y: mousePos.y - 24,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.8 }}
      />
    </>
  );
};

// --- 2. BOOT LOADER COMPONENT ---
const BootLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const bootSequence = [
      { text: "INITIALIZING KERNEL...", delay: 200 },
      { text: "LOADING MODULES...", delay: 600 },
      { text: "VERIFYING INTEGRITY...", delay: 1000 },
      { text: "MOUNTING FILESYSTEM...", delay: 1400 },
      { text: "ESTABLISHING NETWORK CONNECTION...", delay: 1800 },
      { text: "STARTING UI SERVICES...", delay: 2200 },
      { text: "SYSTEM READY.", delay: 2600 },
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < bootSequence.length) {
        const currentLog = bootSequence[currentIndex];
        if (currentLog) {
          setLogs((prev) => [...prev, currentLog.text]);
        }
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 400);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-black z-100 flex flex-col items-center justify-center font-mono text-xs md:text-sm text-cyan-400 p-8"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="w-full max-w-md space-y-4">
        <div className="border-b border-cyan-500/30 pb-2 mb-4 flex justify-between items-end">
          <span className="text-lg font-bold">Sahilpreet Singh BIOS v1.0</span>
          <span>{new Date().getFullYear()}</span>
        </div>

        <div className="h-48 overflow-hidden flex flex-col justify-end space-y-1 font-mono">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-cyan-500/50">
                [{new Date().toLocaleTimeString()}]
              </span>
              <span>{log}</span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 space-y-2">
          <div className="flex justify-between text-xs text-cyan-500/70">
            <span>LOADING RESOURCES</span>
            <span>{progress}%</span>
          </div>
          <div className="h-1 w-full bg-cyan-900/30 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- 3. HERO SECTION (CPU ARCHITECTURE) ---
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

// --- 4. ABOUT SECTION (THEME: IDE INSPECTOR) ---
const About = () => {
  const [activeFile, setActiveFile] = useState("readme.md");
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const editorRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(editorRef.current, {
        scrollTrigger: {
          trigger: editorRef.current,
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  const files = [
    // ================= README.md =================
    {
      id: "readme.md",
      name: "README.md",
      icon: <FileText size={16} />,
      color: "text-yellow-400",
      content: (
        <div className="space-y-4 font-mono text-sm md:text-base text-gray-300 leading-relaxed">
          <p className="text-gray-500">/**</p>
          <p className="text-gray-500">&nbsp;* @author Sahilpreet Singh</p>
          <p className="text-gray-500">
            &nbsp;* @desc Software Engineer — MERN, Realtime Systems,
            Multi-Tenant Architecture
          </p>
          <p className="text-gray-500">&nbsp;*/</p>

          <br />
          <p>
            <span className="text-purple-400">const</span>{" "}
            <span className="text-blue-400">aboutMe</span>{" "}
            <span className="text-white">=</span>{" "}
            <span className="text-yellow-400">`</span>
          </p>

          <p className="pl-4">
            I am a Software Engineer from Amritsar with hands-on experience in
            building scalable multi-tenant apps, realtime modules, MongoDB
            aggregation pipelines, ETL automation, and clean React/Next.js
            frontends.
          </p>

          <p className="pl-4">
            Currently contributing at Tickmark.io, where I work on RBAC systems,
            agenda scheduling, realtime notifications, and transforming audio
            feedback into automated tasks using ETL + AI workflows.
          </p>

          <p className="pl-4">
            I love working on production-grade applications, clean system
            design, component architecture, and writing code that is expressive
            and maintainable.
          </p>

          <p>
            <span className="text-yellow-400">`;</span>
          </p>
        </div>
      ),
    },

    // ================= stats.json (UPDATED with more data) =================
    {
      id: "stats.json",
      name: "stats.json",
      icon: <FileJson size={16} />,
      color: "text-purple-400",
      content: (
        <div className="font-mono text-sm md:text-base space-y-1">
          <p>
            <span className="text-yellow-400">{"{"}</span>
          </p>

          <div className="pl-6 space-y-2 border-l border-white/10 ml-2">
            <p>
              <span className="text-blue-400">&quot;name&quot;</span>:{" "}
              <span className="text-green-400">
                &quot;Sahilpreet Singh&quot;
              </span>
              ,
            </p>
            <p>
              <span className="text-blue-400">
                &quot;experience_years&quot;
              </span>
              :{" "}
              <span className="text-green-400">
                &quot;Since 2023 (2+ years)&quot;
              </span>
              ,
            </p>

            <p>
              <span className="text-blue-400">&quot;role&quot;</span>:{" "}
              <span className="text-green-400">
                &quot;Software Development Engineer&quot;
              </span>
              ,
            </p>

            <p>
              <span className="text-blue-400">&quot;location&quot;</span>:{" "}
              <span className="text-green-400">
                &quot;Timmowal, Amritsar, Punjab, India&quot;
              </span>
              ,
            </p>

            <p>
              <span className="text-blue-400">&quot;email&quot;</span>:{" "}
              <span className="text-green-400">
                &quot;sahilbhullar44@gmail.com&quot;
              </span>
              ,
            </p>

            <p>
              <span className="text-blue-400">&quot;phone&quot;</span>:{" "}
              <span className="text-green-400">&quot;+91 8198014292&quot;</span>
              ,
            </p>

            <p>
              <span className="text-blue-400">&quot;currently_at&quot;</span>:{" "}
              <span className="text-green-400">&quot;Tickmark.io&quot;</span>,
            </p>

            <p>
              <span className="text-blue-400">&quot;top_skills&quot;</span>:{" "}
              <span className="text-green-400">
                [&quot;React&quot;,&quot;Next.js&quot;,&quot;Node.js&quot;,&quot;Expressjs&quot;,&quot;MongoDB&quot;,&quot;TypeScript&quot;,&quot;Socket.io&quot;]
              </span>
              ,
            </p>

            <p>
              <span className="text-blue-400">&quot;other_tools&quot;</span>:{" "}
              <span className="text-green-400">
                [&quot;Docker&quot;,&quot;AWS&quot;,&quot;TanStack
                Query&quot;,&quot;Swagger&quot;]
              </span>
              ,
            </p>

            <p>
              <span className="text-blue-400">&quot;languages&quot;</span>:{" "}
              <span className="text-green-400">
                [&quot;English&quot;,&quot;Punjabi&quot;,&quot;Hindi&quot;]
              </span>
              ,
            </p>

            <p>
              <span className="text-blue-400">&quot;github&quot;</span>:{" "}
              <span className="text-green-400">
                &quot;https://github.com/sahilbhullar44-blip&quot;
              </span>
              ,
            </p>

            <p>
              <span className="text-blue-400">&quot;linkedin&quot;</span>:{" "}
              <span className="text-green-400">
                &quot;https://www.linkedin.com/in/sahilpreet-singh-3042b02a5/&quot;
              </span>
              ,
            </p>
          </div>

          <p>
            <span className="text-yellow-400">{"}"}</span>
          </p>
        </div>
      ),
    },

    // ================= history.log (FULL DETAILED with Education colored) =================
    {
      id: "history.log",
      name: "history.log",
      icon: <FileCode size={16} />,
      color: "text-blue-400",
      content: (
        <div className="font-mono text-sm md:text-base space-y-10">
          {/* ---------- TICKMARK.IO ---------- */}
          <div className="flex gap-4">
            <div className="w-px bg-white/20 relative">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full 
            bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
              ></div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">
                  Nov 2024 – Present
                </span>
                <span className="text-gray-500 text-xs">[CURRENT ROLE]</span>
              </div>

              <p className="text-white font-bold text-lg">
                Software Development Engineer @ Tickmark.io
              </p>

              <p className="text-gray-400">
                Leading backend + realtime modules for a multi-tenant SaaS
                project management platform.
              </p>

              <ul className="list-disc pl-6 text-gray-400 space-y-1">
                <li>
                  Built RBAC-based multi-tenant structure with permissions,
                  roles & workspace control.
                </li>
                <li>
                  Created Agenda Scheduling module with recurring meetings,
                  timezone logic & cron reminders.
                </li>
                <li>
                  Developed advanced MongoDB aggregation pipelines for analytics
                  & multi-tenant separation.
                </li>
                <li>
                  Implemented ETL automation: converting patient audio feedback
                  → structured tasks.
                </li>
                <li>
                  Integrated Socket.io for realtime notifications, task updates
                  & live sync.
                </li>
              </ul>
            </div>
          </div>

          {/* ---------- BESTJOBCOURSES ---------- */}
          <div className="flex gap-4">
            <div className="w-px bg-white/20 relative">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full 
            bg-lime-400 shadow-[0_0_10px_rgba(132,204,22,0.5)]"
              ></div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lime-400 font-bold">
                  Nov 2024 – Present
                </span>
              </div>

              <p className="text-white font-bold text-lg">
                Teaching — BestJobCourses (Tickmark Branch)
              </p>

              <p className="text-gray-400 text-sm">
                Conducting training for MS Office, Google Apps, CCA
                certification & JavaScript DOM.
              </p>
            </div>
          </div>

          {/* ---------- SCHOOL OF CODING ---------- */}
          <div className="flex gap-4">
            <div className="w-px bg-white/20 relative">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full 
            bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
              ></div>
            </div>

            <div className="space-y-2">
              <span className="text-amber-400 font-bold">
                May 2024 – Oct 2025
              </span>

              <p className="text-white font-bold text-lg">
                Associate Developer @ School Of Coding (UK)
              </p>

              <ul className="list-disc pl-6 text-gray-400 space-y-1">
                <li>
                  Developed full-stack features for educational dashboards &
                  admin systems.
                </li>
                <li>
                  Built responsive UIs & optimized backend APIs using MongoDB
                  aggregations.
                </li>
                <li>
                  Created an educational drag-and-drop environmental awareness
                  game.
                </li>
              </ul>
            </div>
          </div>

          {/* ---------- SIMBAQUARTZ INTERN ---------- */}
          <div className="flex gap-4">
            <div className="w-px bg-white/20 relative">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full 
            bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.6)]"
              ></div>
            </div>

            <div className="space-y-2">
              <span className="text-violet-400 font-bold">
                Apr 2023 – Apr 2024
              </span>

              <p className="text-white font-bold text-lg">
                Intern / Developer Trainee @ SimbaQuartz
              </p>

              <ul className="list-disc pl-6 text-gray-400 space-y-1">
                <li>
                  Worked on Node.js API development & integration with MongoDB
                  schemas.
                </li>
                <li>
                  Collaborated with frontend teams to ship production features.
                </li>
                <li>
                  Participated in sprints, debugging sessions & QA cycles.
                </li>
              </ul>
            </div>
          </div>

          {/* ---------- SIMBAQUARTZ APPRENTICE ---------- */}
          <div className="flex gap-4">
            <div className="w-px bg-white/20 relative">
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full 
            bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
              ></div>
            </div>

            <div className="space-y-2">
              <span className="text-sky-400 font-bold">
                Jan 2023 – Mar 2023
              </span>

              <p className="text-white font-bold text-lg">
                Apprentice @ SimbaQuartz
              </p>

              <p className="text-gray-400 text-sm">
                Assisted in backend development & testing; gained practical
                exposure to real-world projects.
              </p>
            </div>
          </div>

          {/* ---------- EDUCATION (COLORED) ---------- */}
          <div className="flex gap-4">
            <div className="w-px bg-white/20 relative"></div>

            <div className="space-y-1">
              <p className="text-white font-bold text-lg">Education</p>
              <p>
                <span className="text-indigo-300 font-semibold">
                  B.Sc. Information Technology
                </span>
                <span className="text-gray-400">
                  {" "}
                  — Sri Guru Angad Dev College
                </span>
                <span className="ml-2 text-amber-300"> (May 2023)</span>
              </p>
              <p className="mt-1">
                <span className="text-white font-bold">Achievement:</span>{" "}
                <span className="text-emerald-300">
                  District Topper (1st Rank)
                </span>
              </p>

              <p className="text-gray-400 mt-2">
                <span className="font-bold text-white">Key skills:</span>{" "}
                <span className="text-green-300">
                  React, Next.js, Node.js, MongoDB (aggregation), TypeScript,
                  Socket.io, ETL
                </span>
              </p>
            </div>
          </div>
        </div>
      ),
    },

    // ================= certificates.js =================
    {
      id: "certificates.js",
      name: "certificates.js",
      icon: <FileText size={16} />,
      color: "text-emerald-400",
      fileUrl:
        "https://53haygcbhbeqdgjo.public.blob.vercel-storage.com/Sahilpreet%20Singh%20-%20Cv.pdf",
      content: (
        <div className="space-y-3 font-mono text-sm md:text-base text-gray-300">
          <h3 className="text-white font-bold">Certificates</h3>
          <ul className="pl-4 list-disc text-gray-300 space-y-1">
            <li>ISO Certified Web Designing — Simbacourse</li>
            <li>ISO Certified Node.js Development — Simbacourse</li>
            <li>ISO Certified CCA Certificate — Simbacourse</li>
            <li>React.js Course — CodeProg.com</li>
          </ul>
          <p className="mt-3 text-gray-400">Full resume available here:</p>
          <Link
            className="underline text-sky-300"
            href={
              "https://53haygcbhbeqdgjo.public.blob.vercel-storage.com/Sahilpreet%20Singh%20-%20Cv.pdf"
            }
            target="_blank"
          >
            Open Resume (PDF)
          </Link>{" "}
        </div>
      ),
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen bg-[#080808] py-24 flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Gradient Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-px bg-linear-to-r from-transparent via-purple-500/20 to-transparent w-full"
            style={{ top: `${15 + i * 14}%` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute w-px bg-linear-to-b from-transparent via-purple-500/20 to-transparent h-full"
            style={{ left: `${15 + i * 14}%` }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 16 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
      {/* Section Shadow Overlays */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-black via-black/50 to-transparent pointer-events-none z-1"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#050505] via-[#050505]/50 to-transparent pointer-events-none z-1"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div ref={titleRef} className="mb-12 flex items-end gap-4">
          <h2 className="text-4xl md:text-6xl font-bold text-white font-mono">
            SOURCE_<span className="text-purple-400">CODE</span>
          </h2>
        </div>

        <div
          ref={editorRef}
          className="w-full max-w-6xl mx-auto bg-[#0d0d0d] rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 flex flex-col md:flex-row h-[500px]"
        >
          {/* SIDEBAR */}
          <div className="w-full md:w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col">
            <div className="p-3 text-xs font-bold text-gray-500 tracking-widest flex items-center gap-2">
              <Layout size={14} /> EXPERIENCE EDITOR
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              <div className="px-4 py-1 text-gray-400 text-sm flex items-center gap-1">
                <ChevronRight size={14} className="rotate-90" />
                <Folder size={14} className="text-blue-400" />
                <span className="font-bold text-gray-300">files</span>
              </div>
              <div className="pl-4">
                {files.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => setActiveFile(file.id)}
                    className={`w-full text-left px-4 py-1.5 text-sm font-mono flex items-center gap-2 transition-colors border-l-2 ${
                      activeFile === file.id
                        ? "bg-white/5 text-white border-cyan-400"
                        : "text-gray-500 border-transparent hover:text-gray-300"
                    }`}
                  >
                    {file.icon}
                    {file.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* EDITOR */}
          <div className="flex-1 flex flex-col bg-[#111]">
            <div className="flex bg-[#0a0a0a] border-b border-white/5 overflow-x-auto hide-scrollbar">
              {files.map((file) => (
                <button
                  key={file.id}
                  onClick={() => setActiveFile(file.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-mono min-w-[120px] border-r border-white/5 transition-colors ${
                    activeFile === file.id
                      ? "bg-[#111] text-white border-t-2 border-t-cyan-400"
                      : "text-gray-500 hover:bg-[#111]/50"
                  }`}
                >
                  <span className={file.color}>{file.icon}</span>
                  {file.name}
                </button>
              ))}
            </div>
            <div className="p-6 md:p-10 h-full overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFile}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {files.find((f) => f.id === activeFile)?.content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 5. INTERACTIVE MEMORY STACK ---
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
      className="min-h-screen bg-[#050505] py-24 relative overflow-hidden flex items-center justify-center"
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
      <div className="container mx-auto px-4 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div>
          <div ref={titleRef}>
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="text-cyan-400" size={24} />
              <h2 className="text-4xl md:text-5xl font-bold text-white font-mono">
                SYSTEM_<span className="text-cyan-400">MEMORY</span>
              </h2>
            </div>
            <p className="text-gray-400 text-lg mb-10 max-w-lg leading-relaxed">
              Managing technology expertise using a LIFO (Last-In, First-Out)
              data structure.
            </p>
          </div>

          <div
            ref={controlsRef}
            className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6 mb-8 shadow-2xl shadow-cyan-900/5 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6 text-xs font-mono text-gray-500">
              <span>STATUS: READY</span>
              <span>MEM_ADDR: 0x7FFF</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handlePush}
                className="flex-1 py-4 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 text-blue-400 font-mono rounded flex flex-col items-center gap-2 interactive"
              >
                <ArrowDownToLine size={20} />
                <span>PUSH()</span>
              </button>
              <button
                onClick={handlePop}
                className="flex-1 py-4 bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 font-mono rounded flex flex-col items-center gap-2 interactive"
              >
                <ArrowUpFromLine size={20} />
                <span>POP()</span>
              </button>
              <button
                onClick={handlePeek}
                className="flex-1 py-4 bg-yellow-600/10 hover:bg-yellow-600/20 border border-yellow-500/30 text-yellow-400 font-mono rounded flex flex-col items-center gap-2 interactive"
              >
                <Eye size={20} />
                <span>PEEK()</span>
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
          className="relative h-[500px] w-full max-w-md mx-auto"
        >
          <motion.div
            className="absolute -left-12 z-20 flex items-center gap-2 text-cyan-400 font-mono text-xs"
            animate={{ bottom: Math.max(32, stack.length * 72 + 32) }}
          >
            <span>SP</span>
            <span className="w-8 h-px bg-cyan-400"></span>
          </motion.div>
          <div className="h-full w-full border-x-2 border-b-2 border-white/10 rounded-b-xl bg-white/2 backdrop-blur-sm relative p-4 flex flex-col-reverse gap-3 overflow-hidden">
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
                    className={`relative h-16 w-full rounded border ${item.border} ${item.bg} flex items-center justify-between px-4 shrink-0`}
                  >
                    <div className="flex items-center gap-3">
                      {/* <div
                        className={`w-2 h-2 rounded-full ${item.color.replace(
                          "text-",
                          "bg-"
                        )}`}
                      ></div> */}
                      <span className={`font-bold font-mono ${item.color}`}>
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

const systemData = {
  root: [
    { id: "fullstack", name: "Fullstack_Dev", type: "folder", icon: Server },
    { id: "ai_ml", name: "AI_Intelligence", type: "folder", icon: Cpu },
    { id: "mobile", name: "Mobile_Apps", type: "folder", icon: Smartphone },
    { id: "tools", name: "Sys_Utils", type: "folder", icon: Terminal },
  ],

  files: {
    // ---------------- FULLSTACK PROJECTS ----------------
    fullstack: [
      {
        name: "tickmark.io",
        size: "7.3 MB",
        date: "2024-11-15",
        desc: "Multi-tenant management platform with RBAC permissions, team/task modules and realtime updates.",
        tech: [
          "React",
          "Node.js",
          "MongoDB",
          "Express",
          "Socket.io",
          "TypeScript",
          "RBAC",
          "Cron",
          "Aggregation Pipelines",
        ],
        status: "Production",
        color: "text-blue-400",
      },

      {
        name: "amritsar.com",
        size: "5.5 MB",
        date: "2024-09-30",
        desc: "Live streaming platform with YouTube integration, realtime chat and content moderation.",
        tech: ["Next.js", "Express", "TypeScript", "Socket.io"],
        status: "Production",
        color: "text-red-400",
      },

      {
        name: "sofa_studio",
        size: "3.6 MB",
        date: "2024-10-15",
        desc: "Admin dashboard for managing sofa designs with TanStack Query integration.",
        tech: ["Next.js", "Node.js", "TanStack Query", "TypeScript"],
        status: "Stable",
        color: "text-purple-400",
      },

      {
        name: "shivshaktifastfood",
        size: "4.1 MB",
        date: "2024-08-10",
        desc: "Food ordering web app with product management and live order tracking.",
        tech: ["Next.js", "MongoDB"],
        status: "Production",
        color: "text-orange-400",
      },

      {
        name: "super_choice_services",
        size: "3.9 MB",
        date: "2024-07-20",
        desc: "Multilingual appointment booking platform with automated notifications.",
        tech: ["Next.js", "MongoDB", "i18n"],
        status: "Active",
        color: "text-green-400",
      },

      {
        name: "best_micro_garden",
        size: "3.4 MB",
        date: "2024-06-15",
        desc: "Service management system with advanced MongoDB filtering and category management.",
        tech: ["React", "MongoDB", "Aggregation Pipelines"],
        status: "Active",
        color: "text-yellow-400",
      },

      {
        name: "space_project",
        size: "2.7 MB",
        date: "2024-05-20",
        desc: "Interactive mission timeline visualization dashboard with animations.",
        tech: ["React", "CSS Animations", "Component Architecture"],
        status: "Stable",
        color: "text-indigo-400",
      },
    ],

    // ---------------- AI / ML ----------------
    ai_ml: [
      {
        name: "medfeed.ai",
        size: "600 MB",
        date: "2024-09-12",
        desc: "AI-powered ETL system that converts patient audio feedback into actionable tasks using speech-to-text and NLP.",
        tech: ["Python", "ChatGPT API", "Whisper", "FastAPI"],
        status: "Active",
        color: "text-pink-400",
      },
    ],

    // ---------------- MOBILE ----------------
    mobile: [
      {
        name: "memeSake",
        size: "38 MB",
        date: "2024-06-09",
        desc: "React Native mobile app for uploading, managing and browsing meme content with optimized performance.",
        tech: ["React Native"],
        status: "Beta",
        color: "text-lime-400",
      },
    ],

    // ---------------- TOOLS ----------------
    tools: [
      {
        name: "mongodb_etl_pipeline.js",
        size: "18 KB",
        date: "2024-11-10",
        desc: "High-performance MongoDB ETL pipeline for processing patient feedback with sentiment analysis and task generation.",
        tech: ["MongoDB Aggregation", "Node.js", "TypeScript", "ETL"],
        status: "Production",
        color: "text-emerald-400",
      },

      {
        name: "swagger_documentation.yaml",
        size: "15 KB",
        date: "2024-11-10",
        desc: "OpenAPI documentation for Tickmark.io backend APIs covering authentication, scheduling and team management.",
        tech: ["OpenAPI", "Swagger", "YAML"],
        status: "Documentation",
        color: "text-sky-400",
      },

      {
        name: "agenda_cron_service.js",
        size: "7 KB",
        date: "2024-11-15",
        desc: "Timezone-aware cron service for managing meeting reminders and schedule expiration in Tickmark's Agenda module.",
        tech: ["Node.js", "Cron", "MongoDB"],
        status: "Utility",
        color: "text-gray-300",
      },
    ],
  },
};

// const DashboardView = () => (
//   <div className="p-6 space-y-6 h-full overflow-y-auto custom-scrollbar">
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//       {/* CPU WIDGET */}
//       <div className="bg-[#111] border border-white/10 p-4 rounded-lg relative overflow-hidden group">
//         <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
//            <Cpu size={40} className="text-blue-500" />
//         </div>
//         <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-2">CPU_Load</h3>
//         <div className="text-2xl font-bold text-white mb-4">34% <span className="text-xs text-gray-500 font-normal">/ 3.2GHz</span></div>
//         <div className="flex items-end gap-1 h-12 w-full">
//            {[40, 60, 30, 80, 50, 20, 45, 70, 30, 55, 40, 25].map((h, i) => (
//              <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-blue-500/20 hover:bg-blue-500/60 transition-colors rounded-sm"></div>
//            ))}
//         </div>
//       </div>

//       {/* MEMORY WIDGET */}
//       <div className="bg-[#111] border border-white/10 p-4 rounded-lg relative overflow-hidden group">
//         <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
//            <HardDrive size={40} className="text-purple-500" />
//         </div>
//         <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Memory</h3>
//         <div className="text-2xl font-bold text-white mb-4">12.4GB <span className="text-xs text-gray-500 font-normal">/ 16GB</span></div>
//         <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
//            <div className="h-full w-[78%] bg-purple-500"></div>
//         </div>
//         <div className="flex justify-between text-[10px] text-gray-500">
//            <span>Used: 78%</span>
//            <span>Cached: 1.2GB</span>
//         </div>
//       </div>

//        {/* UPTIME WIDGET */}
//        <div className="bg-[#111] border border-white/10 p-4 rounded-lg relative overflow-hidden group">
//         <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
//            <Clock size={40} className="text-green-500" />
//         </div>
//         <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Sys_Uptime</h3>
//         <div className="text-2xl font-bold text-white mb-2">14d 2h 12m</div>
//         <p className="text-[10px] text-gray-500 mb-4">Last reboot: Kernel patch v4.2</p>
//         <div className="flex items-center gap-2 text-xs text-green-400 bg-green-900/10 py-1 px-2 rounded w-fit border border-green-900/30">
//            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
//            System Healthy
//         </div>
//       </div>
//     </div>

//     {/* SYSTEM LOGS */}
//     <div className="bg-[#111] border border-white/10 rounded-lg p-4 flex-1">
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
//           <Terminal size={14} /> System_Event_Log
//         </h3>
//         <span className="text-[10px] text-blue-400 cursor-pointer hover:underline">Clear Logs</span>
//       </div>
//       <div className="font-mono text-xs space-y-2 h-48 overflow-y-auto custom-scrollbar p-2 bg-black/40 rounded border border-white/5">
//         <div className="flex gap-3 text-gray-400">
//           <span className="text-gray-600">[14:02:22]</span>
//           <span>Starting daemon process &amp;quot;watcher_v2&amp;quot;...</span>
//         </div>
//         <div className="flex gap-3 text-gray-400">
//           <span className="text-gray-600">[14:02:23]</span>
//           <span className="text-green-400">Connection established: 192.168.1.42:8080</span>
//         </div>
//         <div className="flex gap-3 text-gray-400">
//           <span className="text-gray-600">[14:03:01]</span>
//           <span>Cron job &amp;quot;backup_db&amp;quot; executed successfully.</span>
//         </div>
//         <div className="flex gap-3 text-gray-400">
//           <span className="text-gray-600">[14:05:12]</span>
//           <span className="text-yellow-400">Warning: High memory usage detected on thread #4.</span>
//         </div>
//         <div className="flex gap-3 text-gray-400">
//           <span className="text-gray-600">[14:06:45]</span>
//           <span>User &amp;quot;Admin&amp;quot; authenticated via SSH key.</span>
//         </div>
//         <div className="flex gap-3 text-gray-400">
//           <span className="text-gray-600">[14:10:00]</span>
//           <span className="text-blue-400">Package update available: react-scripts@5.0.2</span>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const NetworkView = () => (
//   <div className="p-6 h-full overflow-y-auto custom-scrollbar flex flex-col gap-6">
//     {/* REGIONAL MAP SIMULATION */}
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <div className="bg-[#111] border border-white/10 rounded-lg p-4">
//         <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
//           <Globe size={14} /> Global_Nodes
//         </h3>
//         <div className="space-y-3">
//           {[
//             { region: "US-East (N. Virginia)", status: "Active", latency: "24ms", color: "text-green-400" },
//             { region: "EU-West (Ireland)", status: "Active", latency: "88ms", color: "text-green-400" },
//             { region: "AP-South (Mumbai)", status: "Congested", latency: "142ms", color: "text-yellow-400" },
//             { region: "SA-East (São Paulo)", status: "Active", latency: "112ms", color: "text-green-400" },
//           ].map((node, i) => (
//             <div key={i} className="flex items-center justify-between p-2 hover:bg-white/5 rounded transition-colors border-b border-white/5 last:border-0">
//                <div className="flex items-center gap-3">
//                  <div className={`w-2 h-2 rounded-full ${node.color === 'text-green-400' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
//                  <span className="text-xs text-gray-300">{node.region}</span>
//                </div>
//                <div className="flex items-center gap-4 text-xs font-mono">
//                   <span className={node.color}>{node.status}</span>
//                   <span className="text-gray-500 w-12 text-right">{node.latency}</span>
//                </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="bg-[#111] border border-white/10 rounded-lg p-4 flex flex-col">
//          <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
//             <Activity size={14} /> Traffic_Analysis
//          </h3>
//          <div className="flex-1 flex items-end gap-1 px-2 border-b border-l border-white/10 min-h-[150px] relative">
//             {/* Grid Lines */}
//             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
//                <div className="w-full h-px bg-white"></div>
//                <div className="w-full h-px bg-white"></div>
//                <div className="w-full h-px bg-white"></div>
//                <div className="w-full h-px bg-white"></div>
//             </div>
//             {Array.from({ length: 20 }, (_, i) => {
//                const height = 20 + (i * 3) % 60 + 10;
//                return (
//                  <div
//                    key={i}
//                    className="flex-1 bg-cyan-500/30 hover:bg-cyan-400 transition-all duration-300 rounded-t-sm"
//                    style={{ height: `${height}%` }}
//                  ></div>
//                )
//             })}
//          </div>
//          <div className="flex justify-between mt-2 text-[10px] text-gray-500 font-mono">
//             <span>00:00</span>
//             <span>12:00</span>
//             <span>23:59</span>
//          </div>
//       </div>
//     </div>

//     {/* SECURITY MODULE */}
//     <div className="bg-[#111] border border-white/10 rounded-lg p-4">
//       <div className="flex items-center justify-between mb-4">
//          <h3 className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-2">
//             <Shield size={14} /> Firewall_Status
//          </h3>
//          <span className="text-xs text-green-400 border border-green-900/30 bg-green-900/10 px-2 py-0.5 rounded">Active</span>
//       </div>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//          <div className="bg-black/40 p-3 rounded border border-white/5">
//             <span className="text-[10px] text-gray-500 block mb-1">Inbound Rules</span>
//             <span className="text-lg text-white font-mono">1,240</span>
//          </div>
//          <div className="bg-black/40 p-3 rounded border border-white/5">
//             <span className="text-[10px] text-gray-500 block mb-1">Outbound Rules</span>
//             <span className="text-lg text-white font-mono">856</span>
//          </div>
//          <div className="bg-black/40 p-3 rounded border border-white/5">
//             <span className="text-[10px] text-gray-500 block mb-1">Threats Blocked</span>
//             <span className="text-lg text-red-400 font-mono">12</span>
//          </div>
//          <div className="bg-black/40 p-3 rounded border border-white/5">
//             <span className="text-[10px] text-gray-500 block mb-1">Proxy Latency</span>
//             <span className="text-lg text-blue-400 font-mono">4ms</span>
//          </div>
//       </div>
//     </div>
//   </div>
// );

const Projects = () => {
  // Supports: 'dashboard', 'network', 'fullstack', 'ai_ml', 'mobile', 'tools'
  const [activeFolder, setActiveFolder] = useState("fullstack");
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Desktop default
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false); // Mobile default
  const [mounted, setMounted] = useState(false);
  const [viewTransition, setViewTransition] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Initial Mount Animation
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // View Transition Animation
  useEffect(() => {
    const startTimer = setTimeout(() => setViewTransition(true), 0);
    const endTimer = setTimeout(() => setViewTransition(false), 300);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(endTimer);
    };
  }, [activeFolder]);

  // Viewport Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isInView && (e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInView]);

  // Handle Folder Selection
  const handleFolderClick = (folderId: string) => {
    if (folderId === activeFolder) return;
    setActiveFolder(folderId);
    setMobileSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const getBreadcrumb = () => {
    return (
      systemData.root.find((f) => f.id === activeFolder)?.name || activeFolder
    );
  };

  // Render File Grid
  const renderMainContent = () => {
    const allFiles =
      systemData.files[activeFolder as keyof typeof systemData.files] || [];
    const currentFiles = searchQuery
      ? allFiles.filter(
          (file) =>
            file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.tech.some((tech) =>
              tech.toLowerCase().includes(searchQuery.toLowerCase())
            )
        )
      : allFiles;

    return (
      <div className="flex-1 p-3 md:p-6 overflow-y-auto custom-scrollbar pb-20">
        {/* Empty State */}
        {currentFiles.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
            <Box size={48} className="mb-4" />
            <p className="font-mono text-xs">NO OBJECTS FOUND</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          {currentFiles.map((file, idx) => (
            <div
              key={file.name + idx}
              className={`group relative bg-[#111] hover:bg-[#161616] active:bg-[#1a1a1a] border border-white/5 hover:border-white/20 p-3 md:p-4 rounded-lg transition-all duration-500 cursor-pointer overflow-hidden interactive transform ${
                viewTransition
                  ? "opacity-0 translate-y-4 scale-95"
                  : "opacity-100 translate-y-0 scale-100"
              }`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

              <div className="flex items-start gap-3 md:gap-4 relative z-10">
                <div className="mt-1 p-2 md:p-3 bg-black border border-white/10 rounded-md shadow-inner group-hover:border-blue-500/30 transition-colors shrink-0">
                  <FileCode
                    size={20}
                    className={`${file.color} md:w-6 md:h-6`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1 gap-2">
                    <h4
                      className={`text-sm font-bold truncate ${file.color} group-hover:underline`}
                    >
                      {file.name}
                    </h4>
                    <span className="hidden xs:inline-block text-[10px] text-gray-600 font-mono border border-gray-800 px-1.5 rounded bg-black whitespace-nowrap">
                      {file.size}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                    {file.desc}
                  </p>

                  <div className="flex items-center gap-2 flex-wrap">
                    {file.tech.map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] text-gray-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 whitespace-nowrap"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metadata Footer */}
              <div className="mt-3 md:mt-4 pt-2 md:pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-gray-600 font-mono">
                <span>{file.date}</span>
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      file.status === "Production" ||
                      file.status === "Published" ||
                      file.status === "Stable"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  <span className="truncate max-w-[80px] sm:max-w-none">
                    {file.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`mt-8 text-center transition-opacity duration-500 ${
            viewTransition ? "opacity-0" : "opacity-30"
          }`}
        >
          <p className="text-[10px] text-gray-500 font-mono">
            -- END OF DIRECTORY --
          </p>
          <p className="text-[10px] text-gray-600">
            {currentFiles.length} object(s)
          </p>
        </div>
      </div>
    );
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-[#050505] py-8 md:py-24 px-2 md:px-8 relative overflow-hidden min-h-screen flex flex-col items-center justify-center font-mono"
    >
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

      {/* --- TITLE --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 mb-6 md:mb-12 text-center px-2"
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-3 md:mb-4">
          <Folder className="text-cyan-400 w-6 h-6 md:w-10 md:h-10" />
          <h2 className="text-2xl min-[360px]:text-3xl md:text-5xl font-bold">
            <span className="text-white">PROJECT_</span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">
              ARCHIVE
            </span>
          </h2>
        </div>
        <p className="text-gray-500 text-xs md:text-base max-w-lg md:max-w-2xl mx-auto leading-relaxed px-4">
          Secure system access. Browse encrypted directories for full-stack
          apps, AI models, and tools.
        </p>
      </motion.div>

      {/* --- MAIN OS WINDOW --- */}
      <div
        className={`relative z-10 w-full max-w-6xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-1000 ease-out h-[80vh] ${
          mounted
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-20 scale-95"
        }`}
        style={{ boxShadow: "0 0 50px -12px rgba(0, 255, 128, 0.1)" }}
      >
        {/* 1. WINDOW TITLE BAR (Optimized for 320px) */}
        <div className="bg-[#111] border-b border-white/5 p-2 flex items-center justify-between select-none shrink-0 z-20 gap-2">
          {/* Left: Window Controls + Label */}
          <div className="flex items-center gap-2 px-1 min-w-0">
            {/* Traffic Lights */}
            <div className="flex gap-1.5 shrink-0">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors shadow-[0_0_8px_rgba(234,179,8,0.6)]" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            </div>

            {/* Title Label (Hides on tiny screens) */}
            <span className="text-gray-400 text-[10px] md:text-xs tracking-widest uppercase flex items-center gap-2 min-w-0">
              <HardDrive
                size={12}
                className="text-blue-400 shrink-0 hidden min-[360px]:block"
              />
              <span className="hidden sm:inline">System_Explorer</span>
              <span className="hidden sm:inline text-gray-600">//</span>
              <span className="hidden md:inline max-w-[100px] truncate">
                {getBreadcrumb()}
              </span>
            </span>
          </div>

          {/* Right: Search Bar (Adaptive Width) */}
          <div className="flex items-center shrink-0">
            <div className="bg-black border border-white/10 rounded px-2 py-1 flex items-center gap-2 w-28 min-[360px]:w-32 md:w-64 transition-all focus-within:w-36 md:focus-within:w-72 focus-within:border-white/20">
              <Search size={12} className="text-gray-500 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-[10px] md:text-xs text-white placeholder-gray-600 flex-1 w-full min-w-0"
              />
            </div>
          </div>
        </div>

        {/* 2. WINDOW CONTENT BODY */}
        <div className="flex flex-1 overflow-hidden relative">
          {/* MOBILE SIDEBAR OVERLAY (Click to close) */}
          <AnimatePresence>
            {isMobileSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileSidebarOpen(false)}
                className="absolute inset-0 bg-black/80 z-20 md:hidden backdrop-blur-sm"
              />
            )}
          </AnimatePresence>

          {/* SIDEBAR NAVIGATION (Adaptive) */}
          <div
            className={`
                bg-[#080808] border-r border-white/5 flex flex-col justify-between 
                transition-all duration-300 ease-in-out z-30
                /* Mobile Styles: Absolute, Drawer behavior */
                absolute md:relative h-full top-0 left-0
                ${
                  isMobileSidebarOpen
                    ? "translate-x-0 w-[80%] max-w-[250px] shadow-2xl"
                    : "-translate-x-full w-[80%] max-w-[250px]"
                }
                
                /* Desktop Styles: Relative, Collapse/Expand behavior */
                md:translate-x-0 
                ${isSidebarOpen ? "md:w-64" : "md:w-16 md:overflow-hidden"}
            `}
          >
            <div className="p-4 space-y-6">
              {/* Mobile Close Button */}
              <div className="md:hidden flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                <span className="text-gray-500 text-xs font-bold uppercase">
                  Navigate
                </span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="text-gray-400 p-1 hover:bg-white/10 rounded"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Locations Group (Folders) */}
              <div>
                <h3
                  className={`text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 pl-2 transition-opacity duration-300 ${
                    !isSidebarOpen && "md:opacity-0"
                  }`}
                >
                  Locations
                </h3>
                <div className="space-y-1">
                  {systemData.root.map((folder) => {
                    const Icon = folder.icon;
                    const isActive = activeFolder === folder.id;

                    return (
                      <div
                        key={folder.id}
                        onClick={() => handleFolderClick(folder.id)}
                        className={`
                          flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-all duration-300 border border-transparent 
                          ${
                            isActive
                              ? "bg-gray-800 text-white border-white/10"
                              : "text-gray-400 hover:bg-white/5 hover:text-white"
                          }
                        `}
                        title={folder.name}
                      >
                        <Icon
                          size={18}
                          className={`shrink-0 ${
                            isActive ? "text-white" : "text-gray-500"
                          }`}
                        />
                        <span
                          className={`text-xs font-medium tracking-wide whitespace-nowrap transition-opacity duration-300 ${
                            !isSidebarOpen
                              ? "md:opacity-0 md:hidden"
                              : "opacity-100"
                          }`}
                        >
                          {folder.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Storage Info (Hidden when collapsed) */}
            <div
              className={`p-4 border-t border-white/5 hidden md:block transition-all duration-300 ${
                !isSidebarOpen
                  ? "opacity-0 translate-y-4 pointer-events-none"
                  : "opacity-100 translate-y-0"
              }`}
            >
              
            </div>
          </div>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 bg-[#0c0c0c] flex flex-col relative w-full overflow-hidden">
            {/* Address Bar / Breadcrumbs */}
            <div className="h-10 md:h-12 border-b border-white/5 flex items-center px-2 md:px-4 gap-2 bg-[#0a0a0a] shrink-0">
              {/* Mobile Sidebar Toggle */}
              <div
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden mr-1 text-gray-400 p-1.5 border border-white/10 rounded cursor-pointer hover:bg-white/5 active:scale-95 transition-transform shrink-0"
              >
                <Layout size={16} />
              </div>

              {/* Desktop Sidebar Toggle */}
              <div
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="hidden md:block mr-2 text-gray-400 p-1 border border-white/10 rounded cursor-pointer hover:bg-white/5 transition-colors"
              >
                <Layout size={14} />
              </div>

              {/* Breadcrumbs (Scrollable on small screens) */}
              <div className="flex items-center text-[10px] md:text-xs text-gray-500 overflow-x-auto no-scrollbar mask-linear-fade flex-1 min-w-0">
                <span className="hover:text-white cursor-pointer transition-colors shrink-0">
                  root
                </span>
                <ChevronRight size={12} className="mx-1 shrink-0" />
                <span className="hover:text-white cursor-pointer transition-colors shrink-0">
                  system
                </span>
                <ChevronRight size={12} className="mx-1 shrink-0" />
                <span
                  className={`
                    px-2 py-0.5 rounded border whitespace-nowrap
                    ${
                      activeFolder === "network"
                        ? "text-blue-400 bg-blue-400/10 border-blue-400/20"
                        : "text-purple-400 bg-purple-400/10 border-purple-400/20"
                    } 
                  `}
                >
                  {getBreadcrumb()}
                </span>
              </div>
            </div>

            {/* Dynamic Content */}
            <div
              className={`flex-1 overflow-y-auto transition-opacity duration-300 ${
                viewTransition ? "opacity-50" : "opacity-100"
              }`}
            >
              {renderMainContent()}
            </div>

            {/* Bottom Status Bar */}
            <div className="bg-[#080808] border-t border-white/5 px-2 md:px-4 py-1.5 flex justify-between items-center text-[9px] md:text-[10px] text-gray-500 font-mono select-none shrink-0 z-10">
              <div className="flex gap-2 md:gap-4">
                <span className="hover:text-white cursor-pointer hidden min-[360px]:inline">
                  READ-ONLY
                </span>
                <span className="hover:text-white cursor-pointer">UTF-8</span>
              </div>
              <div className="flex gap-2 items-center">
                <div
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${
                    activeFolder === "network" ? "bg-blue-500" : "bg-green-500"
                  } animate-pulse`}
                ></div>
                <span>
                  {activeFolder === "network" ? "NET_ACTIVE" : "ONLINE"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 7. DEVELOPER CONTACT FORM ---
import { sendEmail } from "./actions";

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef(null);
  const formRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(formRef.current, {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("name", formState.name);
    formData.append("email", formState.email);
    formData.append("message", formState.message);

    const result = await sendEmail(formData);

    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
      setFormState({ name: "", email: "", message: "" });
      // setTimeout(() => setIsSubmitted(false), 3000);
    } else {
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-32 bg-black relative overflow-hidden"
    >
      {/* Background Gradient Lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent w-full"
            style={{ top: `${15 + i * 18}%` }}
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 11 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute w-px bg-linear-to-b from-transparent via-cyan-500/20 to-transparent h-full"
            style={{ left: `${15 + i * 18}%` }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>
      {/* Section Shadow Overlays */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-[#050505] via-[#050505]/50 to-transparent pointer-events-none z-1"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black via-black/50 to-transparent pointer-events-none z-1"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-cyan-900 to-transparent"></div>
      <div className="max-w-6xl mx-auto px-4 md:px-10 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-6xl font-bold text-white mb-6">
            {`Let's `}
            <span className="text-cyan-400">Execute</span>
            <br />
            {`New Ideas.`}
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-md">
            Have a project in mind? Send me a git push request (or just a
            message).
          </p>
          <div className="space-y-6">
            <Link
              href="mailto:sahilbhullar44@gmail.com"
              className="flex items-center gap-4 text-white/80 hover:text-cyan-400 transition-colors interactive group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                <Mail size={20} />
              </div>
              <span className="font-mono text-lg">
                sahilbhullar44@gmail.com
              </span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/sahilpreet-singh-3042b02a5/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white/80 hover:text-cyan-400 transition-colors interactive group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-400/50 transition-colors">
                <Linkedin size={20} />
              </div>
              <span className="font-mono text-lg">LinkedIn Profile</span>
            </Link>
          </div>
        </div>
        <div
          ref={formRef}
          className="w-full bg-[#0d0d0d] rounded-xl border border-white/10 overflow-hidden shadow-2xl shadow-cyan-900/10"
        >
          <div className="bg-[#1a1a1a] px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
              <Terminal size={12} />
              contact.tsx
            </div>
            <div className="w-10"></div>
          </div>
          <div className="p-6 md:p-8 font-mono text-sm relative">
            <div className="absolute left-4 top-8 bottom-8 w-6 flex flex-col gap-[1.6rem] text-gray-700 text-right select-none pointer-events-none font-mono text-sm leading-relaxed">
              <span>01</span>
              <span>02</span>
              <span>03</span>
              <span>04</span>
              <span>05</span>
            </div>
            <form onSubmit={handleSubmit} className="pl-8 space-y-6">
              <div className="group">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-purple-400">const</span>
                  <span className="text-blue-400">sender</span>
                  <span className="text-white">=</span>
                  <span className="text-gray-400"></span>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    placeholder="Your Name"
                    className="bg-transparent border-none outline-none text-green-400 placeholder-gray-600 min-w-[150px] flex-1 interactive focus:ring-0 p-0"
                  />
                  <span className="text-gray-400">;</span>
                </div>
              </div>
              <div className="group">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-purple-400">const</span>
                  <span className="text-blue-400">email</span>
                  <span className="text-white">=</span>
                  <span className="text-gray-400"></span>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="bg-transparent border-none outline-none text-green-400 placeholder-gray-600 min-w-[150px] flex-1 interactive focus:ring-0 p-0"
                  />
                  <span className="text-gray-400">;</span>
                </div>
              </div>
              <div className="group">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">function</span>
                    <span className="text-yellow-400">sendMessage</span>
                    <span className="text-white">() {"{"}</span>
                  </div>
                  <div className="pl-4 flex items-start gap-2">
                    <span className="text-purple-400">return</span>
                    <span className="text-gray-400">`</span>
                    <textarea
                      required
                      rows={3}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      placeholder="Your message here..."
                      className="bg-transparent border-none outline-none text-gray-300 placeholder-gray-700 w-full resize-none interactive focus:ring-0 p-0 leading-relaxed"
                    />
                    <span className="text-gray-400">`;</span>
                  </div>
                  <div className="text-white">{"}"}</div>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type={isSubmitted ? "button" : "submit"}
                  disabled={isSubmitting}
                  onClick={
                    isSubmitted ? () => setIsSubmitted(false) : undefined
                  }
                  className="group relative inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/50 rounded text-gray-300 hover:text-cyan-400 transition-all interactive w-full md:w-auto cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Compiling...</span>
                  ) : isSubmitted ? (
                    <span className="flex items-center gap-2">
                      <span className="text-green-400">Deployed!</span>
                      <span className="text-gray-500 text-xs border-l border-gray-700 pl-2 ml-1">
                        Restart?
                      </span>
                    </span>
                  ) : (
                    <span>
                      <span className="font-bold text-green-500">$</span> npm
                      run send
                    </span>
                  )}
                </button>
                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- 8. FOOTER ---
const Footer = () => (
  <footer className="bg-neutral-950 text-white py-8 border-t border-white/5 relative z-10">
    <div className="max-w-6xl mx-auto px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <span className="font-mono font-bold text-lg tracking-tight">
          Sahilpreet Singh
        </span>
        <span className="text-white/20 text-xs">|</span>
        <span className="text-xs font-mono text-gray-500">
          © {new Date().getFullYear()} INC.
        </span>{" "}
      </div>
      <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        <span>ALL SYSTEMS OPERATIONAL</span>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="text-xs font-mono text-gray-500 hover:text-cyan-400 transition-colors interactive"
      >
        BACK TO TOP ↑
      </button>
    </div>
  </footer>
);

// --- MAIN APP ---
const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-black min-h-screen cursor-none selection:bg-cyan-400 selection:text-black">
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <BootLoader key="bootloader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.main
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Hero />
            <About />
            <TechStack />
            <Projects />
            <ContactForm />
          </motion.main>
        )}
      </AnimatePresence>

      {!isLoading && <Footer />}
    </div>
  );
};

export default App;
