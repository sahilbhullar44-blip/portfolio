"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  ChevronRight,
  Layout,
  HardDrive,
  Search,
  X,
  FileCode,
  Box,
} from "lucide-react";
import SectionBackground from "@/app/components/SectionBackground";
import { systemData } from "@/app/data/systemData";

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
    setMobileSidebarOpen(false); // Always close sidebar on mobile selection
    if (folderId === activeFolder) return;
    setActiveFolder(folderId);
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
      <div className="flex-1 p-3 md:p-6 pb-20">
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
      <SectionBackground />

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
              <span className="hidden sm:inline text-gray-600">{"//"}</span>
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
                className="absolute inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm"
              />
            )}
          </AnimatePresence>

          {/* SIDEBAR NAVIGATION (Adaptive) */}
          <div
            className={`
                bg-[#080808] border-r border-white/5 flex flex-col justify-between 
                transition-all duration-300 ease-in-out z-50

                absolute md:relative h-full top-0 left-0
                ${
                  isMobileSidebarOpen
                    ? "translate-x-0 w-[80%] max-w-[250px] shadow-2xl"
                    : "-translate-x-full max-w-[250px]"
                }
                

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
                  type="button"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="text-gray-400 p-2 hover:bg-white/10 rounded active:scale-95 transition-transform"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Locations Group (Folders) */}
              <div>
                <h3
                  className={`text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-3 pl-2 transition-opacity duration-300 \${
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
                          className={`text-xs font-medium tracking-wide whitespace-nowrap transition-opacity duration-300 \${
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
              className={`p-4 border-t border-white/5 hidden md:block transition-all duration-300 \${
                !isSidebarOpen
                  ? "opacity-0 translate-y-4 pointer-events-none"
                  : "opacity-100 translate-y-0"
              }`}
            ></div>
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
                    \${
                      activeFolder === "network"
                        ? "text-blue-400 bg-blue-400/10 border-blue-400/20"
                        : "text-purple-400 border-purple-400/20"
                    } 
                  `}
                >
                  {getBreadcrumb()}
                </span>
              </div>
            </div>

            {/* Dynamic Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar touch-pan-y">
              <div
                className={`transition-opacity duration-300 ${
                  viewTransition ? "opacity-50" : "opacity-100"
                }`}
              >
                {renderMainContent()}
              </div>
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
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full \${
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

export default Projects;
