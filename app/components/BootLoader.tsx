"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

export default BootLoader;
