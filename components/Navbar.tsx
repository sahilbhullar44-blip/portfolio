'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  hex: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', hex: '0x01' },
  { label: 'About', href: '/about', hex: '0x02' },
  { label: 'Projects', href: '/projects', hex: '0x03' },
];

const ListNode = ({ item, index, isLast, hoveredIndex, setHoveredIndex }: { 
  item: NavItem; 
  index: number; 
  isLast: boolean;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
}) => {
  const isHovered = hoveredIndex === index;
  const isTraversed = hoveredIndex !== null && index <= hoveredIndex;

  return (
    <div className="flex flex-col md:flex-row items-center group/node">
      {/* Node Container */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="relative"
      >
        <Link href={item.href} className="block">
          <motion.div 
            className={`
              px-5 py-3 rounded-xl border transition-all duration-300 min-w-[140px]
              ${isTraversed 
                ? 'border-cyan-500/50 bg-cyan-950/20 shadow-[0_0_15px_rgba(34,211,238,0.15)]' 
                : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'}
            `}
            whileHover={{ y: -2 }}
          >
            <div className="flex flex-col gap-1 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-white/5 pb-1 mb-1">
                 <span className="text-zinc-500">addr:</span>
                 <span className="text-zinc-400">{item.hex}</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-zinc-500">val:</span>
                 <span className={`font-bold ${isTraversed ? 'text-cyan-400' : 'text-zinc-200'}`}>
                    "{item.label}"
                 </span>
              </div>
               <div className="flex justify-between items-center">
                 <span className="text-zinc-500">next:</span>
                 <span className="text-zinc-400">
                    {isLast ? 'NULL' : `*0x${((index + 2) * 1024).toString(16)}`}
                 </span>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Edge (Arrow) */}
      {!isLast && (
        <div className="flex flex-col md:flex-row items-center justify-center w-8 h-8 md:w-16 md:h-auto relative">
          {/* Base Line */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className={`
               w-[1px] h-full md:w-full md:h-[1px] transition-colors duration-300
               ${isTraversed && hoveredIndex !== index ? 'bg-cyan-500/50' : 'bg-zinc-800'}
             `} />
          </div>

          {/* Simple Dot Animation */}
          {isTraversed && hoveredIndex !== index && (
             <motion.div
                className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full z-10 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                initial={{ offsetDistance: "0%" }}
                animate={{ 
                    left: ['0%', '100%'],
                    top: ['50%', '50%']
                }}
                transition={{ 
                    duration: 0.4, 
                    ease: "easeInOut",
                    repeat: Infinity 
                }}
             />
          )}

          <ArrowRight 
            size={14} 
            className={`
              relative z-10 transition-colors duration-300 hidden md:block
              ${isTraversed && hoveredIndex !== index ? 'text-cyan-400' : 'text-zinc-700'}
            `} 
          />
        </div>
      )}
    </div>
  );
};

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-8 pointer-events-none">
      {/* Logo */}
      <div className="pointer-events-auto text-2xl font-bold font-mono tracking-tighter text-white">
        DEV.IO
      </div>

      {/* Linked List Container */}
      <div className="pointer-events-auto px-8 py-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">
          
          <div className="flex items-center w-full md:w-auto justify-center md:justify-start">
             {/* Head Label */}
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 md:mr-6 text-xs font-mono text-zinc-500"
            >
                <div className="flex flex-col items-end">
                    <span className="font-bold tracking-widest text-zinc-300">HEAD</span>
                    <span className="text-[10px]">*ptr</span>
                </div>
                <div className="h-[1px] w-8 bg-zinc-700 relative">
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-zinc-500 rounded-full" />
                </div>
            </motion.div>

            {/* List */}
            <div className="flex flex-col md:flex-row items-center">
                {navItems.map((item, index) => (
                <ListNode
                    key={item.label}
                    item={item}
                    index={index}
                    isLast={index === navItems.length - 1}
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
                />
                ))}
            </div>
          </div>
          
          {/* Tail Label */}
           <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 md:ml-6 text-xs font-mono text-zinc-500 hidden md:flex"
          >
            <div className="h-[1px] w-8 bg-zinc-700 relative">
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-zinc-500 rounded-full" />
            </div>
            <span className="tracking-widest">NULL</span>
          </motion.div>
        </div>
      </div>

      {/* CTA Button */}
      <a
        href="#contact"
        className="pointer-events-auto border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all font-mono text-sm text-white"
      >
        LET'S TALK
      </a>
    </nav>
  );
}
