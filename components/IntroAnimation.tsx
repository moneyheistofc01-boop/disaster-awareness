"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Apple-style buttery smooth easing curve
const smoothEase = [0.22, 1, 0.36, 1];

export default function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Intro එක යනකන් page එක scroll වෙන එක නවත්තනවා
    document.body.style.overflow = "hidden";

    // මේ premium animation එක බලන්න තත්පර 5.5 ක් දෙනවා, ඊටපස්සේ fade out වෙනවා
    const timer = setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = "unset";
    }, 5500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="apple-style-intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(15px)" }} // Cinematic Fade Out
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-[#000000] overflow-hidden"
        >
          {/* Subtle Ambient Background Glow */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 3, ease: smoothEase }}
            className="absolute inset-0 m-auto bg-emerald-500/10 blur-[120px] rounded-full w-[300px] h-[300px] md:w-[600px] md:h-[600px]"
          />

          {/* Original Custom SVG Animation Container */}
          <motion.div 
            className="relative z-10 flex items-center justify-center w-64 h-64 md:w-80 md:h-80"
            animate={{ y: [0, -10, 0] }} // Breathing float effect
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.svg 
              viewBox="0 0 100 100" 
              className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(52,211,153,0.3)]"
            >
              <defs>
                <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6ee7b7" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <filter id="glow-effect">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Protective Shield Aura (පිටතින් එන ආරක්ෂක වලල්ල) */}
              <motion.circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="url(#emerald-gradient)"
                strokeWidth="0.5"
                strokeDasharray="5 5"
                initial={{ pathLength: 0, opacity: 0, rotate: -90 }}
                animate={{ pathLength: 1, opacity: 0.4, rotate: 0 }}
                transition={{ delay: 2.5, duration: 2, ease: smoothEase }}
                className="origin-center"
              />

              {/* Left Hand (වම් අත - Abstract vector path) */}
              <motion.path
                d="M 12 50 C 12 75, 30 92, 50 92 C 55 92, 62 88, 66 82 C 60 78, 50 82, 40 72 C 30 62, 26 55, 26 45 C 26 38, 18 38, 12 50 Z"
                fill="transparent"
                stroke="url(#emerald-gradient)"
                strokeWidth="1.2"
                initial={{ pathLength: 0, fill: "rgba(16, 185, 129, 0)" }}
                animate={{ 
                  pathLength: 1, 
                  fill: "rgba(16, 185, 129, 0.15)" 
                }}
                transition={{
                  pathLength: { delay: 0.5, duration: 1.8, ease: smoothEase },
                  fill: { delay: 2.2, duration: 1.5, ease: "linear" }
                }}
                filter="url(#glow-effect)"
              />

              {/* Right Hand (දකුණු අත - Abstract vector path) */}
              <motion.path
                d="M 88 50 C 88 75, 70 92, 50 92 C 45 92, 38 88, 34 82 C 40 78, 50 82, 60 72 C 70 62, 74 55, 74 45 C 74 38, 82 38, 88 50 Z"
                fill="transparent"
                stroke="url(#emerald-gradient)"
                strokeWidth="1.2"
                initial={{ pathLength: 0, fill: "rgba(16, 185, 129, 0)" }}
                animate={{ 
                  pathLength: 1, 
                  fill: "rgba(16, 185, 129, 0.15)" 
                }}
                transition={{
                  pathLength: { delay: 0.5, duration: 1.8, ease: smoothEase },
                  fill: { delay: 2.2, duration: 1.5, ease: "linear" }
                }}
                filter="url(#glow-effect)"
              />

              {/* Central Leaf (මැද තියෙන ස්වභාවදහම - Detailed leaf path) */}
              <motion.path
                d="M 50 82 C 50 82, 18 55, 25 28 C 30 12, 45 10, 50 12 C 55 10, 70 12, 75 28 C 82 55, 50 82, 50 82 Z"
                fill="transparent"
                stroke="#34d399"
                strokeWidth="1.5"
                initial={{ pathLength: 0, fill: "rgba(52, 211, 153, 0)" }}
                animate={{ 
                  pathLength: 1, 
                  fill: "rgba(16, 185, 129, 0.6)" // Leaf fills with solid color
                }}
                transition={{
                  pathLength: { delay: 1, duration: 1.8, ease: smoothEase },
                  fill: { delay: 2.5, duration: 1.2, ease: "linear" }
                }}
                filter="url(#glow-effect)"
              />

              {/* Leaf Inner Veins (කොළයේ නහර - යථාර්ථවාදී පෙනුම සඳහා) */}
              <motion.path
                d="M 50 82 C 50 60, 47 40, 50 15 M 50 62 C 40 55, 35 48, 35 48 M 50 45 C 60 40, 65 33, 65 33 M 50 30 C 42 26, 38 22, 38 22"
                fill="transparent"
                stroke="#022c22"
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ delay: 2.8, duration: 1.5, ease: smoothEase }}
              />
            </motion.svg>
          </motion.div>

          {/* Apple-Style Cinematic Text Reveal */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(15px)", scale: 0.9, y: 15 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
            transition={{ delay: 3, duration: 1.5, ease: smoothEase }}
            className="mt-2 text-center z-20 flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2">
              EcoGuard<span className="text-emerald-400">.</span>
            </h1>
            <motion.div 
              initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 3.5, duration: 1, ease: smoothEase }}
              className="h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent mb-3 w-4/5"
            />
            <motion.p 
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.8, duration: 1, ease: smoothEase }}
              className="text-emerald-200/70 font-semibold tracking-[0.25em] text-[10px] md:text-xs uppercase"
            >
              Protect Nature • Survive Disasters
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
