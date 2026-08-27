"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Sparkles } from "lucide-react";

export default function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Intro එක යනකන් page එක scroll වෙන එක නවත්තනවා
    document.body.style.overflow = "hidden";

    // තත්පර 3.5 කින් intro එක close කරලා site එක පෙන්නනවා
    const timer = setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = "unset";
    }, 3500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} // Smooth fade out effect
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gray-950 text-white overflow-hidden"
        >
          {/* Background Ambient Glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-emerald-900/20 blur-[100px] rounded-full w-[400px] h-[400px] mx-auto my-auto"
          />

          <div className="relative flex items-center justify-center w-64 h-64">
            
            {/* වම් අත (Left Hand/Cradle Element) */}
            <motion.div
              initial={{ x: -60, y: 40, opacity: 0 }}
              animate={{ x: -16, y: 16, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute w-24 h-24 border-l-4 border-b-4 border-emerald-400 rounded-bl-[50px] shadow-[-10px_10px_30px_rgba(52,211,153,0.3)]"
            />

            {/* දකුණු අත (Right Hand/Cradle Element) */}
            <motion.div
              initial={{ x: 60, y: 40, opacity: 0 }}
              animate={{ x: 16, y: 16, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute w-24 h-24 border-r-4 border-b-4 border-emerald-400 rounded-br-[50px] shadow-[10px_10px_30px_rgba(52,211,153,0.3)]"
            />

            {/* මැද තියෙන ස්වභාවදහම (Glowing Leaf in the center) */}
            <motion.div
              initial={{ scale: 0, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: -10, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, type: "spring", bounce: 0.5 }}
              className="absolute z-10 flex flex-col items-center"
            >
              <Sparkles size={16} className="text-emerald-300 absolute -top-6 animate-pulse" />
              <Leaf size={56} className="text-emerald-400 fill-emerald-500/20 drop-shadow-[0_0_25px_rgba(52,211,153,0.8)]" strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Text Reveal Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 text-center z-10"
          >
            <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-100 drop-shadow-md">
              EcoGuard<span className="text-white">.</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 1 }}
              className="mt-3 text-emerald-400/80 font-medium tracking-wide text-sm md:text-base uppercase letter-spacing-2"
            >
              Protect Nature • Survive Disasters
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
