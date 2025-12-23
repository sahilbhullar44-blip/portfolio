"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileJson,
  FileCode,
  FileText,
  Folder,
  ChevronRight,
  Layout,
  Code,
} from "lucide-react";

const About = () => {
  const [activeFile, setActiveFile] = useState("readme.md");
  const containerRef = useRef(null);

  const files = [
    // ================= README.md =================
    {
      id: "readme.md",
      name: "README.md",
      icon: <FileText size={15} />,
      color: "text-yellow-400",
      content: (
        <div className="space-y-4 font-mono text-xs md:text-sm text-gray-300 leading-relaxed pb-6">
          <p className="text-gray-500">{"/**"}</p>
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

          <p className="pl-2 md:pl-4 text-left">
            I am a Software Engineer from Amritsar with hands-on experience in
            building scalable multi-tenant apps, realtime modules, MongoDB
            aggregation pipelines, ETL automation, and clean React/Next.js
            frontends.
          </p>

          <p className="pl-2 md:pl-4 text-left">
            Currently contributing at Tickmark.io, where I work on RBAC systems,
            agenda scheduling, realtime notifications, and transforming audio
            feedback into automated tasks using ETL + AI workflows.
          </p>

          <p className="pl-2 md:pl-4 text-left">
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

    // ================= stats.json =================
    {
      id: "stats.json",
      name: "stats.json",
      icon: <FileJson size={15} />,
      color: "text-purple-400",
      content: (
        <div className="font-mono text-xs md:text-sm space-y-1 overflow-x-hidden pb-6">
          <p>
            <span className="text-yellow-400">{"{"}</span>
          </p>

          <div className="pl-2 md:pl-6 space-y-2 border-l border-white/10 ml-1 md:ml-2">
            <p className="wrap-break-word">
              <span className="text-blue-400">&quot;name&quot;</span>:{" "}
              <span className="text-green-400">
                &quot;Sahilpreet Singh&quot;
              </span>
              ,
            </p>
            <p className="wrap-break-word">
              <span className="text-blue-400">&quot;experience&quot;</span>:{" "}
              <span className="text-green-400">
                &quot;Since 2023 (2+ years)&quot;
              </span>
              ,
            </p>

            <p className="wrap-break-word">
              <span className="text-blue-400">&quot;role&quot;</span>:{" "}
              <span className="text-green-400">
                &quot;Software Engineer&quot;
              </span>
              ,
            </p>

            <p className="wrap-break-word">
              <span className="text-blue-400">&quot;location&quot;</span>:{" "}
              <span className="text-green-400">&quot;Punjab, India&quot;</span>,
            </p>

            <p className="wrap-break-word">
              <span className="text-blue-400">&quot;email&quot;</span>:{" "}
              <span className="text-green-400">
                &quot;sahilbhullar44@gmail.com&quot;
              </span>
              ,
            </p>

            <p className="wrap-break-word">
              <span className="text-blue-400">&quot;current&quot;</span>:{" "}
              <span className="text-green-400">&quot;Tickmark.io&quot;</span>,
            </p>

            <div className="wrap-break-word">
              <span className="text-blue-400">&quot;stack&quot;</span>:{" "}
              <span className="text-green-400">
                [<br />
                &nbsp;&quot;React&quot;, &quot;Next.js&quot;,
                <br />
                &nbsp;&quot;Node.js&quot;, &quot;MongoDB&quot;,
                <br />
                &nbsp;&quot;TypeScript&quot;, &quot;Socket.io&quot;
                <br />]
              </span>
              ,
            </div>

            <div className="wrap-break-word">
              <span className="text-blue-400">&quot;tools&quot;</span>:{" "}
              <span className="text-green-400">
                [<br />
                &nbsp;&quot;Docker&quot;, &quot;AWS&quot;,
                <br />
                &nbsp;&quot;Swagger&quot;, &quot;TanStack&quot;
                <br />]
              </span>
              ,
            </div>

            <p className="wrap-break-word">
              <span className="text-blue-400">&quot;github&quot;</span>:{" "}
              <a
                href="https://github.com/sahilbhullar44-blip"
                target="_blank"
                className="text-green-400 underline decoration-green-400/30 hover:decoration-green-400"
              >
                &quot;sahilbhullar44-blip&quot;
              </a>
              ,
            </p>
          </div>

          <p>
            <span className="text-yellow-400">{"}"}</span>
          </p>
        </div>
      ),
    },

    // ================= history.log =================
    {
      id: "history.log",
      name: "history.log",
      icon: <FileCode size={15} />,
      color: "text-blue-400",
      content: (
        <div className="font-mono text-xs md:text-sm space-y-8 md:space-y-10 pb-6">
          {/* ---------- TICKMARK.IO ---------- */}
          <div className="flex gap-3 md:gap-4 relative">
            {/* Timeline Line */}
            <div className="absolute top-2 left-[5px] md:left-[9px] w-px h-[calc(100%+2rem)] bg-white/10 z-0"></div>

            <div className="relative z-10 pt-1.5">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.6)]"></div>
            </div>

            <div className="space-y-2 flex-1 pb-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-cyan-400 font-bold text-xs md:text-sm">
                  Nov 2024 – Present
                </span>
                <span className="text-gray-500 text-[10px] md:text-xs tracking-wider bg-white/5 px-1.5 py-0.5 rounded w-fit">
                  [CURRENT]
                </span>
              </div>

              <p className="text-white font-bold text-sm md:text-lg leading-tight">
                Software Engineer @ Tickmark.io
              </p>

              <p className="text-gray-400 text-xs md:text-sm">
                Leading backend + realtime modules for multi-tenant SaaS.
              </p>

              <ul className="list-none text-gray-500 space-y-1.5 mt-2">
                <li className="flex gap-2">
                  <span className="text-cyan-500/50 text-[10px] mt-0.5">▹</span>
                  <span>Built RBAC multi-tenant system</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-500/50 text-[10px] mt-0.5">▹</span>
                  <span>Created Agenda Scheduling module</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-500/50 text-[10px] mt-0.5">▹</span>
                  <span>Advanced MongoDB aggregation pipelines</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-500/50 text-[10px] mt-0.5">▹</span>
                  <span>Audio-to-Task ETL automation + AI</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-cyan-500/50 text-[10px] mt-0.5">▹</span>
                  <span>Socket.io for realtime sync</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ---------- BESTJOBCOURSES ---------- */}
          <div className="flex gap-3 md:gap-4 relative">
            <div className="absolute top-2 left-[5px] md:left-[9px] w-px h-[calc(100%+2rem)] bg-white/10 z-0"></div>

            <div className="relative z-10 pt-1.5">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-lime-400 shadow-[0_0_10px_rgba(132,204,22,0.5)]"></div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lime-400 font-bold text-xs md:text-sm">
                  Nov 2024 – Present
                </span>
              </div>

              <p className="text-white font-bold text-sm md:text-lg leading-tight">
                Instructor @ Tickmark Branch
              </p>

              <p className="text-gray-400 text-xs md:text-sm">
                Training: MS Office, Google Apps, JS DOM.
              </p>
            </div>
          </div>

          {/* ---------- SCHOOL OF CODING ---------- */}
          <div className="flex gap-3 md:gap-4 relative">
            <div className="absolute top-2 left-[5px] md:left-[9px] w-px h-[calc(100%+2rem)] bg-white/10 z-0"></div>

            <div className="relative z-10 pt-1.5">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
            </div>

            <div className="space-y-2">
              <span className="text-amber-400 font-bold text-xs md:text-sm">
                May 2024 – Oct 2025
              </span>

              <p className="text-white font-bold text-sm md:text-lg leading-tight">
                Associate Developer @ SoC (UK)
              </p>

              <ul className="list-none text-gray-500 space-y-1.5">
                <li className="flex gap-2">
                  <span className="text-amber-500/50 text-[10px] mt-0.5">
                    ▹
                  </span>
                  <span>Educational dashboards & admin systems</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-500/50 text-[10px] mt-0.5">
                    ▹
                  </span>
                  <span>Drag-and-drop educational games</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ---------- SIMBAQUARTZ INTERN ---------- */}
          <div className="flex gap-3 md:gap-4 relative">
            <div className="absolute top-2 left-[5px] md:left-[9px] w-px h-[calc(100%+2rem)] bg-white/10 z-0"></div>

            <div className="relative z-10 pt-1.5">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-violet-400 shadow-[0_0_10px_rgba(139,92,246,0.6)]"></div>
            </div>

            <div className="space-y-2">
              <span className="text-violet-400 font-bold text-xs md:text-sm">
                Apr 2023 – Apr 2024
              </span>

              <p className="text-white font-bold text-sm md:text-lg leading-tight">
                Developer Trainee @ SimbaQuartz
              </p>

              <ul className="list-none text-gray-500 space-y-1.5">
                <li className="flex gap-2">
                  <span className="text-violet-500/50 text-[10px] mt-0.5">
                    ▹
                  </span>
                  <span>Node.js API dev & MongoDB Integration</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-500/50 text-[10px] mt-0.5">
                    ▹
                  </span>
                  <span>Collaborated on production features</span>
                </li>
              </ul>
            </div>
          </div>

          {/* ---------- EDUCATION ---------- */}
          <div className="flex gap-3 md:gap-4">
            <div className="relative z-10 pt-1.5">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-indigo-400"></div>
            </div>

            <div className="space-y-2">
              <p className="text-white font-bold text-sm md:text-lg">
                Education
              </p>
              <div className="text-xs md:text-sm">
                <p className="text-indigo-300 font-semibold">
                  B.Sc. Information Technology
                </p>
                <p className="text-gray-500">Sri Guru Angad Dev College</p>
                <p className="text-amber-300 text-[10px] mt-0.5">
                  Achievement: District Topper (1st Rank)
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },

    // ================= certificates.js =================
    {
      id: "certificates.js",
      name: "certificates.js",
      icon: <FileText size={15} />,
      color: "text-emerald-400",
      content: (
        <div className="space-y-4 font-mono text-xs md:text-sm text-gray-300 pb-6">
          <h3 className="text-white font-bold text-sm md:text-base">
            Certificates & Licenses
          </h3>
          <ul className="pl-2 space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>
                ISO Certified Web Designing{" "}
                <span className="text-gray-500">- Simbacourse</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>
                ISO Certified Node.js Dev{" "}
                <span className="text-gray-500">- Simbacourse</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>
                CCA Certificate{" "}
                <span className="text-gray-500">- Simbacourse</span>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>
                React.js Course{" "}
                <span className="text-gray-500">- CodeProg.com</span>
              </span>
            </li>
          </ul>

          <div className="pt-4 border-t border-white/10 mt-4">
            <p className="text-gray-400 mb-2">Download Resume:</p>
            <a
              className="inline-flex items-center gap-2 text-sky-300 hover:text-sky-200 transition-colors border border-sky-400/30 bg-sky-400/10 px-3 py-2 rounded text-xs md:text-sm"
              href="https://53haygcbhbeqdgjo.public.blob.vercel-storage.com/Sahilpreet%20Singh%20-%20Cv.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <FileText size={14} />
              Sahilpreet_Singh_CV.pdf
            </a>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen bg-[#080808] py-16 md:py-24 flex items-center justify-center relative overflow-hidden"
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

      {/* Section Shadows */}
      <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-black via-black/50 to-transparent pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-[#050505] via-[#050505]/50 to-transparent pointer-events-none z-0"></div>

      <div className="container mx-auto px-2 md:px-10 relative z-10">
        {/* TITLE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-6 md:mb-12 flex items-center gap-3 px-2 md:px-0"
        >
          <Code className="text-purple-500 w-8 h-8 md:w-12 md:h-12" />
          <h2 className="text-3xl md:text-6xl font-bold text-white font-mono tracking-tight">
            SOURCE_
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-500">
              CODE
            </span>
          </h2>
        </motion.div>

        {/* EDITOR WINDOW */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl mx-auto bg-[#0d0d0d] rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 flex flex-col md:flex-row h-[70vh] md:h-[600px]"
        >
          {/* SIDEBAR (Hidden on mobile) */}
          <div className="hidden md:flex w-64 bg-[#0a0a0a] border-r border-white/5 flex-col shrink-0">
            <div className="p-3 text-xs font-bold text-gray-500 tracking-widest flex items-center gap-2 border-b border-white/5">
              <Layout size={14} /> EXPLORER
            </div>
            <div className="flex-1 overflow-y-auto py-2">
              <div className="px-4 py-1 text-gray-400 text-sm flex items-center gap-1 mb-1">
                <ChevronRight size={14} className="rotate-90" />
                <Folder size={14} className="text-blue-400" />
                <span className="font-bold text-gray-300 text-xs tracking-wide">
                  portfolio-v2
                </span>
              </div>
              <div className="pl-3">
                {files.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => setActiveFile(file.id)}
                    className={`w-full text-left px-3 py-1.5 text-xs md:text-sm font-mono flex items-center gap-2 transition-colors border-l-2 ${
                      activeFile === file.id
                        ? "bg-white/5 text-white border-cyan-400"
                        : "text-gray-500 border-transparent hover:text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    {file.icon}
                    {file.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* EDITOR AREA */}
          <div className="flex-1 flex flex-col bg-[#111] min-w-0 relative overflow-hidden">
            {/* TAB BAR (Visible on All Screens) */}
            <div className="flex bg-[#0a0a0a] border-b border-white/5 overflow-x-auto no-scrollbar shrink-0">
              {files.map((file) => (
                <button
                  key={file.id}
                  onClick={() => setActiveFile(file.id)}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2.5 text-xs font-mono min-w-fit md:min-w-[120px] border-r border-white/5 transition-colors whitespace-nowrap ${
                    activeFile === file.id
                      ? "bg-[#111] text-white border-t-2 border-t-cyan-400"
                      : "text-gray-500 hover:bg-[#111]/50 bg-[#0c0c0c]"
                  }`}
                >
                  <span className={file.color}>{file.icon}</span>
                  {file.name}
                </button>
              ))}
            </div>

            {/* CONTENT AREA */}
            <div
              className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 min-h-0 touch-pan-y"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFile}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-full pb-20"
                >
                  {files.find((f) => f.id === activeFile)?.content}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Inline styles for scrollbar visibility */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                  height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(255, 255, 255, 0.15);
                  border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: rgba(255, 255, 255, 0.25);
                }
            `,
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
