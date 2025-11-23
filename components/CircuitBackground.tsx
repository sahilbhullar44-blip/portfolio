'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface CircuitBackgroundProps {
  intensity?: 'light' | 'medium' | 'heavy';
  colors?: {
    vertical?: string;
    horizontal?: string;
  };
  className?: string;
}

const CircuitBackground: React.FC<CircuitBackgroundProps> = ({ 
  intensity = 'medium',
  colors = {
    vertical: 'cyan-500',
    horizontal: 'purple-500'
  },
  className = ''
}) => {
  // Adjust line count based on intensity
  const lineCount = {
    light: { vertical: 4, horizontal: 3 },
    medium: { vertical: 8, horizontal: 6 },
    heavy: { vertical: 12, horizontal: 9 }
  }[intensity];

  const verticalLines = useMemo(() => 
    Array.from({ length: lineCount.vertical }).map((_, i) => ({
      id: `v-${i}`,
      left: `${10 + (i * 12) + ((i * 7) % 5)}%`,
      duration: 3 + (i * 0.5) % 4,
      delay: (i * 0.25) % 2
    })), [lineCount.vertical]
  );

  const horizontalLines = useMemo(() => 
    Array.from({ length: lineCount.horizontal }).map((_, i) => ({
      id: `h-${i}`,
      top: `${15 + (i * 15) + ((i * 3) % 5)}%`,
      duration: 5 + (i * 0.8) % 5,
      delay: (i * 0.5) % 3
    })), [lineCount.horizontal]
  );

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Static Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]" 
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Vertical Flow Lines */}
      {verticalLines.map((line) => (
        <div key={line.id} className="absolute top-0 bottom-0 w-[1px] bg-white/5" style={{ left: line.left }}>
          <motion.div
            className={`absolute top-0 w-[2px] h-20 bg-gradient-to-b from-transparent via-${colors.vertical} to-transparent shadow-[0_0_8px_rgba(34,211,238,0.8)]`}
            initial={{ y: "-100%" }}
            animate={{ y: "100vh" }}
            transition={{
              duration: line.duration,
              repeat: Infinity,
              ease: "linear",
              delay: line.delay
            }}
          />
        </div>
      ))}

      {/* Horizontal Flow Lines */}
      {horizontalLines.map((line) => (
        <div key={line.id} className="absolute left-0 right-0 h-[1px] bg-white/5" style={{ top: line.top }}>
          <motion.div
            className={`absolute left-0 h-[2px] w-20 bg-gradient-to-r from-transparent via-${colors.horizontal} to-transparent shadow-[0_0_8px_rgba(168,85,247,0.8)]`}
            initial={{ x: "-100%" }}
            animate={{ x: "100vw" }}
            transition={{
              duration: line.duration,
              repeat: Infinity,
              ease: "linear",
              delay: line.delay
            }}
          />
        </div>
      ))}
      
      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/60" />
    </div>
  );
};

export default CircuitBackground;