"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf, Hand, Shield, Sparkles } from "lucide-react";

export default function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Animation එක යනකන් page එක scroll වෙන එක නවත්තනවා
    document.body.style.overflow = "hidden";

    // තත්පර 4.5 කින් ලස්සනට fade out වෙලා යනවා
    const timer = setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = "unset";
    }, 4500);

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
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }} // Blur වෙලා ලස්සනට අතුරුදහන් වෙනවා
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-gray-950 text-white overflow-hidden"
        >
          {/* Background Ambient Glow (පිටිපස්සෙන් එන ලස්සන කොළ පාට එළිය) */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 m-auto bg-emerald-600/10 blur-[120px] rounded-full w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
          />

          {/* Animation Container */}
          <div className="relative flex items-center justify-center w-64 h-64">
            
            {/* වම් අත (Left Hand) - වමේ ඉඳන් එනවා */}
            <motion.div
              initial={{ x: -100, y: 30, opacity: 0 }}
              animate={{ x: -18, y: 30, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="absolute z-10 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]"
            >
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ delay: 1, duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <Hand size={64} strokeWidth={1.5} className="rotate-90" />
              </motion.div>
            </motion.div>

            {/* දකුණු අත (Right Hand) - දකුණේ ඉඳන් එනවා */}
            <motion.div
              initial={{ x: 100, y: 30, opacity: 0 }}
              animate={{ x: 18, y: 30, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="absolute z-10 text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]"
            >
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ delay: 1, duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <Hand size={64} strokeWidth={1.5} className="-rotate-90 scale-x-[-1]" />
              </motion.div>
            </motion.div>

            {/* ස්වභාවදහම (Leaf) - අත් දෙක මැදට උඩ ඉඳන් වැටෙනවා */}
            <motion.div
              initial={{ y: -60, opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ y: -10, opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.8, type: "spring", bounce: 0.5 }}
              className="absolute z-20 text-emerald-300"
            >
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ delay: 1, duration: 3, repeat: Infinity, ease: "easeInOut" }}>
                <Leaf size={56} strokeWidth={1.5} className="fill-emerald-500/40 drop-shadow-[0_0_20px_rgba(52,211,153,0.8)]" />
              </motion.div>
            </motion.div>

            {/* ආරක්ෂාව නිරූපණය කරන පලිහ (Shield) - පිටිපස්සෙන් Glow වෙලා මතුවෙනවා */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
              className="absolute z-0 text-emerald-500/30 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]"
            >
               <Shield size={180} strokeWidth={1} className="fill-emerald-900/20" />
            </motion.div>

            {/* Magic Sparkles - ලස්සනට දිලිසෙන්න */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="absolute -top-4 right-10 z-30 text-emerald-200"
            >
              <motion.div animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2, repeat: Infinity }}>
                <Sparkles size={24} className="fill-emerald-200" />
              </motion.div>
            </motion.div>

          </div>

          {/* Text Reveal Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-6 text-center z-10"
          >
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-100 drop-shadow-md">
              EcoGuard<span className="text-white">.</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }}
              className="mt-3 text-emerald-400/80 font-bold tracking-[0.2em] text-xs md:text-sm uppercase"
            >
              Protect Nature
            </motion.p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
