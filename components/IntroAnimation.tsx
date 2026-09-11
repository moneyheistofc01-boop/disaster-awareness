"use client";

import { useEffect, useState, useLayoutEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const INTRO_KEY = "dual_fire_intro_seen";
const INTRO_DURATION = 6500; // Total duration before it fades out
const smoothEase = [0.22, 1, 0.36, 1] as const;

export default function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const reduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    let shouldShow = true;

    try {
      const alreadySeen = sessionStorage.getItem(INTRO_KEY);

      if (alreadySeen === "1") {
        shouldShow = false;
      } else {
        sessionStorage.setItem(INTRO_KEY, "1");
      }
    } catch {
      shouldShow = true;
    }

    if (!shouldShow) {
      setShowIntro(false);
      return;
    }

    // Prevent scrolling while intro is active
    document.body.style.overflow = "hidden";

    // Start Exit Animation (Fade Out)
    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, INTRO_DURATION - 1500);

    // Completely remove from DOM
    const removeTimer = window.setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = "";
    }, INTRO_DURATION);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!showIntro) return null;

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="dual-fire-intro"
          initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          animate={
            isExiting
              ? { opacity: 0, filter: "blur(15px)", scale: 1.05 }
              : { opacity: 1, filter: "blur(0px)", scale: 1 }
          }
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            width: "100vw",
            height: "100dvh",
            backgroundColor: "#020202",
            zIndex: 2147483647,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            pointerEvents: "all",
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            /* --- BACKGROUND EFFECTS --- */
            .ambient-glow {
              position: absolute;
              inset: 0;
              background: radial-gradient(circle at center, rgba(30, 30, 255, 0.08) 0%, rgba(255, 30, 30, 0.06) 40%, rgba(2, 2, 2, 1) 70%);
              z-index: 1;
            }

            .bg-particles {
              position: absolute;
              inset: 0;
              opacity: 0.15;
              background-image: radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px);
              background-size: 40px 40px;
              z-index: 2;
            }

            /* --- DUAL FIRE LOGO RINGS --- */
            .logo-wrapper {
              position: relative;
              width: 220px;
              height: 220px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              z-index: 10;
              margin-bottom: 40px;
            }

            .fire-ring-red {
              position: absolute;
              inset: -15px;
              border-radius: 50%;
              border: 3px solid transparent;
              border-top: 3px solid #ff003c;
              border-right: 3px solid #ff4d6d;
              animation: spinRight 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
              filter: drop-shadow(0 0 15px rgba(255, 0, 60, 0.8));
              z-index: 4;
            }

            .fire-ring-blue {
              position: absolute;
              inset: -25px;
              border-radius: 50%;
              border: 3px solid transparent;
              border-bottom: 3px solid #00c3ff;
              border-left: 3px solid #0077ff;
              animation: spinLeft 2s linear infinite;
              filter: drop-shadow(0 0 15px rgba(0, 195, 255, 0.8));
              z-index: 3;
            }

            .aura-glow {
              position: absolute;
              inset: -40px;
              border-radius: 50%;
              background: conic-gradient(from 0deg, rgba(255,0,60,0.2) 0deg, rgba(0,195,255,0.2) 180deg, rgba(255,0,60,0.2) 360deg);
              filter: blur(20px);
              animation: spinRight 4s linear infinite;
              z-index: 2;
            }

            @keyframes spinRight { 100% { transform: rotate(360deg); } }
            @keyframes spinLeft { 100% { transform: rotate(-360deg); } }

            .main-logo {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 50%;
              border: 2px solid rgba(255,255,255,0.1);
              position: relative;
              z-index: 5;
              box-shadow: 0 0 40px rgba(0,0,0,0.8), inset 0 0 20px rgba(255,255,255,0.05);
              background: #050505;
            }

            /* --- TYPOGRAPHY --- */
            .content-container {
              display: flex;
              flex-direction: column;
              align-items: center;
              z-index: 10;
              text-align: center;
            }

            .main-title {
              font-family: 'Inter', system-ui, sans-serif;
              font-size: clamp(2.5rem, 5vw, 4rem);
              font-weight: 900;
              letter-spacing: 0.1em;
              color: white;
              margin: 0;
              text-shadow: 0 10px 30px rgba(0,0,0,0.8);
            }

            .main-title span.blue { color: #00c3ff; text-shadow: 0 0 20px rgba(0, 195, 255, 0.5); }
            .main-title span.red { color: #ff003c; text-shadow: 0 0 20px rgba(255, 0, 60, 0.5); }

            .tagline {
              font-family: 'Inter', system-ui, sans-serif;
              font-size: 0.8rem;
              font-weight: 700;
              letter-spacing: 0.5em;
              color: rgba(255,255,255,0.5);
              text-transform: uppercase;
              margin-top: 15px;
            }

            .details-text {
              font-size: 0.7rem;
              font-weight: 600;
              letter-spacing: 0.2em;
              color: #888;
              margin-top: 25px;
              max-width: 400px;
              line-height: 1.8;
            }

            /* --- LOADING PROGRESS --- */
            .progress-container {
              margin-top: 40px;
              width: 180px;
              height: 2px;
              background: rgba(255,255,255,0.1);
              border-radius: 4px;
              overflow: hidden;
              position: relative;
            }

            .progress-bar {
              height: 100%;
              width: 100%;
              background: linear-gradient(90deg, #00c3ff, #ff003c);
              box-shadow: 0 0 10px rgba(255,0,60,0.5);
              transform-origin: left;
            }

            /* --- RESPONSIVE --- */
            @media (max-width: 768px) {
              .logo-wrapper { width: 180px; height: 180px; margin-bottom: 30px; }
              .energy-ring-1 { inset: -12px; }
              .energy-ring-2 { inset: -20px; }
              .aura-glow { inset: -30px; }
              .main-title { font-size: 2.2rem; }
              .tagline { font-size: 0.65rem; letter-spacing: 0.3em; }
            }
          `}} />

          {/* Backgrounds */}
          <div className="ambient-glow" />
          <div className="bg-particles" />

          {/* Main Content */}
          <div className="content-container">
            
            {/* Animated Logo */}
            <motion.div 
              className="logo-wrapper"
              initial={{ scale: 0.6, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: smoothEase }}
            >
              <div className="aura-glow" />
              <div className="fire-ring-red" />
              <div className="fire-ring-blue" />
              <img 
                src="/logo.png" 
                alt="Brand Logo" 
                className="main-logo"
                onError={(e) => {
                  // Fallback if logo.png is missing
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/250/050505/ffffff?text=LOGO";
                }}
              />
            </motion.div>

            {/* Cinematic Text Reveal */}
            <motion.h1 
              className="main-title"
              initial={{ opacity: 0, y: 30, letterSpacing: "0em", filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.1em", filter: "blur(0px)" }}
              transition={{ delay: 1.2, duration: 1.5, ease: smoothEase }}
            >
              <span className="blue">CYBER</span> <span className="red">NEXUS</span>
            </motion.h1>

            <motion.div 
              className="tagline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1.2, ease: smoothEase }}
            >
              Next Generation Intelligence
            </motion.div>

            <motion.p 
              className="details-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 1.5 }}
            >
              Initializing core protocols. Establishing secure connections.
              <br/>Please wait while the system boots.
            </motion.p>

            {/* Loading Bar */}
            <motion.div 
              className="progress-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 0.8 }}
            >
              <motion.div 
                className="progress-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 3.8, duration: 1.2, ease: "circOut" }}
              />
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
