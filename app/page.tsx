"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CustomCursor from "@/app/components/CustomCursor";
import BootLoader from "@/app/components/BootLoader";
import Hero from "@/app/components/Hero";
import About from "@/app/components/About";
import TechStack from "@/app/components/TechStack";
import Projects from "@/app/components/Projects";
import ContactForm from "@/app/components/ContactForm";

gsap.registerPlugin(ScrollTrigger);

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
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>ALL SYSTEMS OPERATIONAL</span>
        </div>
        {/* <span className="text-white/20 text-xs">|</span>
        <a
          href="/netrunner"
          className="text-xs font-mono text-cyan-500/70 hover:text-cyan-400 transition-colors interactive relative group"
        >
          <span className="relative z-10">NETRUNNER_ARCHIVE</span>
          <span className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity rounded px-2 -mx-2"></span>
        </a> */}
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
            {/* <Netrunner /> */}
            <ContactForm />
          </motion.main>
        )}
      </AnimatePresence>

      {!isLoading && <Footer />}
    </div>
  );
};

export default App;
