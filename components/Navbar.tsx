'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown, Menu, X } from 'lucide-react';
import CircuitBackground from './CircuitBackground';

// --- Types ---
interface NavItem {
  label: string;
  href: string;
  hex: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#', hex: '0x01' },
  { label: 'About', href: '#about', hex: '0x02' },

  { label: 'Projects', href: '#projects', hex: '0x04' },
];



// --- Node Component ---
const ListNode = ({ 
  item, 
  index, 
  isLast, 
  hoveredIndex, 
  setHoveredIndex,
  isMobile,
  onLinkClick 
}: { 
  item: NavItem; 
  index: number; 
  isLast: boolean;
  hoveredIndex: number | null;
  setHoveredIndex: (idx: number | null) => void;
  isMobile: boolean;
  onLinkClick?: () => void;
}) => {
 
  const isTraversed = hoveredIndex !== null && index <= hoveredIndex;

  return (
    <div className={`flex items-center group/node ${isMobile ? 'flex-col' : 'flex-row'}`}>
      {/* Node Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        className="relative z-10"
      >
        <Link href={item.href} className="block" onClick={onLinkClick}>
          <motion.div 
            className={`
              px-5 py-3 rounded-xl border transition-all duration-300 min-w-[140px] relative overflow-hidden
              ${isTraversed 
                ? 'border-cyan-500/50 bg-cyan-950/40 shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
                : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-600 backdrop-blur-md'}
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Inner "Scanline" animation on hover */}
            <motion.div 
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full"
              animate={isTraversed ? { x: ['100%', '-100%'] } : {}}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />

            <div className="flex flex-col gap-1 font-mono text-xs relative z-10">
              <div className="flex justify-between items-center border-b border-white/5 pb-1 mb-1">
                 <span className="text-zinc-500">addr:</span>
                 <span className="text-zinc-400">{item.hex}</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-zinc-500">val:</span>
                 <span className={`font-bold ${isTraversed ? 'text-cyan-400' : 'text-zinc-200'}`}>
                  {item.label}
                 </span>
              </div>
               <div className="flex justify-between items-center">
                 <span className="text-zinc-500">next:</span>
                 <span className="text-zinc-400">
                    {isLast ? 'NULL' : `*0x${((index + 2) * 2048).toString(16).toUpperCase()}`}
                 </span>
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* Edge (Arrow) */}
      {!isLast && (
        <div className={`
            relative flex items-center justify-center
            ${isMobile ? 'w-full h-12 flex-col' : 'w-12 h-full flex-row'}
        `}>
          {/* Base Line */}
          <div className={`
             absolute bg-zinc-800 transition-colors duration-300
             ${isMobile ? 'w-px h-full' : 'w-full h-px'}
             ${isTraversed && hoveredIndex !== index ? 'bg-cyan-500/50 shadow-[0_0_10px_rgba(34,211,238,0.5)]' : ''}
          `} />

          {/* Traveling Data Dot Animation */}
          {isTraversed && hoveredIndex !== index && (
             <motion.div
                className="absolute w-2 h-2 bg-cyan-400 rounded-full z-10 shadow-[0_0_10px_rgba(34,211,238,1)]"
                animate={isMobile 
                    ? { top: ['0%', '100%'], left: '50%', x: '-50%' }
                    : { left: ['0%', '100%'], top: '50%', y: '-50%' }
                }
                transition={{ 
                    duration: 0.3, 
                    ease: "linear",
                    repeat: Infinity 
                }}
             />
          )}

          {/* Arrow Icon */}
          {isMobile ? (
            <ArrowDown 
                size={14} 
                className={`relative z-10 transition-colors duration-300 ${isTraversed && hoveredIndex !== index ? 'text-cyan-400' : 'text-zinc-700'}`} 
            />
          ) : (
            <ArrowRight 
                size={14} 
                className={`relative z-10 transition-colors duration-300 ${isTraversed && hoveredIndex !== index ? 'text-cyan-400' : 'text-zinc-700'}`} 
            />
          )}
        </div>
      )}
    </div>
  );
};

// --- Main Navbar ---
export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 0);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(mountTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!mounted) return null;

  // Render the Linked List Visualization
  const renderLinkedList = (mobileMode: boolean, onLinkClick?: () => void) => (
    <div className={`flex items-center justify-center ${mobileMode ? 'flex-col py-10' : 'flex-row'}`}>
        
        {/* HEAD Label */}
        <motion.div 
            initial={{ opacity: 0, x: mobileMode ? 0 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={`flex items-center gap-3 text-xs font-mono text-zinc-500 ${mobileMode ? 'flex-col mb-4' : 'mr-6'}`}
        >
            <div className={`flex flex-col ${mobileMode ? 'items-center' : 'items-end'}`}>
                <span className="font-bold tracking-widest text-cyan-500 animate-pulse">HEAD</span>
                <span className="text-[10px] text-zinc-600">*ptr_root</span>
            </div>
            <div className={`bg-zinc-700 relative ${mobileMode ? 'w-px h-8' : 'h-px w-8'}`}>
                    <div className={`absolute w-1.5 h-1.5 bg-cyan-500 rounded-full shadow-[0_0_5px_cyan]
                        ${mobileMode ? 'bottom-0 left-1/2 -translate-x-1/2' : 'right-0 top-1/2 -translate-y-1/2'}`} 
                    />
            </div>
        </motion.div>

        {/* Nodes Loop */}
        <div className={`flex ${mobileMode ? 'flex-col' : 'flex-row'} items-center`}>
            {navItems.map((item, index) => (
            <ListNode
                key={item.label}
                item={item}
                index={index}
                isLast={index === navItems.length - 1}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                isMobile={mobileMode}
                onLinkClick={onLinkClick}
            />
            ))}
        </div>

        {/* NULL Label */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`flex items-center gap-3 text-xs font-mono text-zinc-500 ${mobileMode ? 'flex-col mt-4' : 'ml-6'}`}
        >
            <div className={`bg-zinc-700 relative ${mobileMode ? 'w-px h-8' : 'h-px w-8'}`}>
                    <div className={`absolute w-1 h-1 bg-zinc-500 rounded-full 
                        ${mobileMode ? 'top-0 left-1/2 -translate-x-1/2' : 'left-0 top-1/2 -translate-y-1/2'}`} 
                    />
            </div>
            <span className="tracking-widest opacity-50">NULL</span>
        </motion.div>
    </div>
  );

  return (
    <>
        {/* The New Circuit Background (Only visible inside menu on mobile, or globally if you want) */}
        {/* Note: I placed it inside the mobile menu logic below to fill the empty space */}
        
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-6 md:py-8 pointer-events-none">
        
        {/* Logo */}
        <div className="pointer-events-auto flex items-center gap-2 z-50">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse" />
            <span className="text-lg md:text-xl font-bold font-mono tracking-tighter text-white">
                Sahilpreet Singh
            </span>
        </div>

        {/* Desktop: Visible Linked List */}
        {!isMobile && (
    <div className="pointer-events-auto px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] relative overflow-hidden">
        {/* Subtle glass highlight effect */}
        <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent opacity-30" />
        {/* Subtle glass edge glow */}
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-20" />
        {renderLinkedList(false)}
    </div>
)}
        {/* CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-4 pointer-events-auto">
            {!isMobile && (
                <Link
                    href="#contact"
                    className="group relative overflow-hidden border border-white/20 px-6 py-2 rounded-full font-mono text-sm text-white transition-all hover:border-cyan-500/50"
                >
                    <span className="relative z-10 group-hover:text-cyan-400 transition-colors">INIT_CHAT()</span>
                    <div className="absolute inset-0 bg-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </Link>
            )}

            {/* Mobile Menu Toggle */}
            {isMobile && (
                <button 
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-3 rounded-full bg-black/50 backdrop-blur-md border border-zinc-800 text-white z-50 hover:bg-zinc-800 transition-colors active:scale-95"
                >
                    {menuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            )}
        </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
            {isMobile && menuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Background Animation inside Mobile Menu */}
                    <CircuitBackground intensity="heavy" className="z-0" />
                    
                    <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="w-full max-h-screen py-20 overflow-y-auto relative z-10 scrollbar-hide"
                    >
                        {renderLinkedList(true, () => setMenuOpen(false))}
                        
                        <div className="flex justify-center mt-8">
                             <Link
                                onClick={() => setMenuOpen(false)}
                                href="#contact"
                                className="relative group border border-cyan-500/30 text-cyan-400 px-10 py-4 rounded-full bg-cyan-950/20 backdrop-blur-sm font-mono text-sm overflow-hidden"
                            >
                                <span className="relative z-10">INIT_CHAT()</span>
                                <motion.div 
                                    className="absolute inset-0 bg-cyan-500/20 blur-md"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </>
  );
}