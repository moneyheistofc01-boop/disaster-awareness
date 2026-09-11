// app/components/OpeningIntro.tsx
'use client'

import React, { useState, useEffect, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function OpeningIntro() {
  const [show, setShow] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const hasPlayed = sessionStorage.getItem('sobasenankaya_dragon_intro');
      
      if (!hasPlayed) {
        sessionStorage.setItem('sobasenankaya_dragon_intro', 'true'); 
        
        // Background scroll වෙන එක නවත්තන්න
        document.body.style.overflow = 'hidden';

        // තත්පර 5.5 කින් Fade Out Animation එක පටන් ගන්නවා
        const exitTimer = setTimeout(() => setIsExiting(true), 5500); 
        
        // තත්පර 7 කින් සම්පූර්ණයෙන්ම අයින් වෙනවා
        const removeTimer = setTimeout(() => {
            setShow(false); 
            document.body.style.overflow = '';
        }, 7000);

        return () => {
          clearTimeout(exitTimer);
          clearTimeout(removeTimer);
          document.body.style.overflow = '';
        };
      } else {
        setShow(false);
      }
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          className="intro-master-container"
          initial={{ opacity: 1, filter: 'blur(0px)' }}
          animate={isExiting ? { opacity: 0, filter: 'blur(15px)', scale: 1.05 } : { opacity: 1, filter: 'blur(0px)', scale: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0, 
            width: '100vw',
            height: '100dvh',
            background: '#020202', // Deep Dark Background
            zIndex: 2147483647,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            pointerEvents: 'all'
          }}
        >
          <style dangerouslySetInnerHTML={{ __html: `
            /* --- MYSTICAL BACKGROUND EFFECTS --- */
            .mystic-glow {
              position: absolute;
              inset: 0;
              background: radial-gradient(circle at 30% 70%, rgba(255, 0, 60, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 70% 30%, rgba(0, 119, 255, 0.1) 0%, transparent 50%),
                          #020202;
              z-index: 1;
            }

            /* --- FLOATING FIREFLIES / SPARKS --- */
            .particles-container {
              position: absolute;
              inset: 0;
              z-index: 2;
              overflow: hidden;
              pointer-events: none;
            }

            .firefly {
              position: absolute;
              border-radius: 50%;
              animation: floatMagic 6s ease-in-out infinite alternate;
            }

            .f-red {
              width: 5px; height: 5px;
              background: #ff003c;
              box-shadow: 0 0 15px #ff003c, 0 0 25px #ff4d6d;
            }

            .f-blue {
              width: 6px; height: 6px;
              background: #0077ff;
              box-shadow: 0 0 15px #0077ff, 0 0 30px #00c3ff;
            }

            @keyframes floatMagic {
              0% { transform: translate(0, 0) scale(0.8); opacity: 0.3; }
              50% { opacity: 0.9; }
              100% { transform: translate(30px, -50px) scale(1.3); opacity: 0.3; }
            }

            /* --- EPIC RED & BLUE FLUID FLAME EFFECT (Like the Video) --- */
            .logo-wrapper {
              position: relative;
              width: 200px;
              height: 200px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              z-index: 10;
              margin-bottom: 30px;
            }

            /* Deep Blue Plasma Flame */
            .plasma-blue {
              position: absolute;
              inset: -35px -10px -35px -55px; /* Offset to the left */
              background: #0055ff;
              border-radius: 45% 55% 40% 60% / 55% 45% 60% 40%;
              filter: blur(25px);
              animation: flowBlue 4s linear infinite;
              mix-blend-mode: screen;
              z-index: 2;
              opacity: 0.85;
            }

            /* Intense Red Plasma Flame */
            .plasma-red {
              position: absolute;
              inset: -10px -55px -35px -10px; /* Offset to the right */
              background: #ff003c;
              border-radius: 55% 45% 60% 40% / 45% 55% 40% 60%;
              filter: blur(25px);
              animation: flowRed 5s linear infinite;
              mix-blend-mode: screen;
              z-index: 3;
              opacity: 0.85;
            }

            /* Bright Cyan/Blue Core Highlights */
            .plasma-cyan {
              position: absolute;
              inset: -45px 15px 15px -45px;
              background: #00c3ff;
              border-radius: 50%;
              filter: blur(30px);
              opacity: 0.6;
              animation: flowBlue 3s linear infinite reverse;
              z-index: 1;
            }

            /* Bright Orange/Red Core Highlights */
            .plasma-orange {
              position: absolute;
              inset: 15px -45px -45px 15px;
              background: #ff4d6d;
              border-radius: 50%;
              filter: blur(30px);
              opacity: 0.6;
              animation: flowRed 4s linear infinite reverse;
              z-index: 1;
            }

            /* The Ring Core separating flames from the logo */
            .flame-core-ring {
              position: absolute;
              inset: -8px;
              border-radius: 50%;
              border: 2px solid rgba(255, 255, 255, 0.1);
              box-shadow: -15px -15px 40px rgba(0, 119, 255, 0.6), 15px 15px 40px rgba(255, 0, 60, 0.6);
              z-index: 4;
            }

            /* Animations for Fluid Shape Shifting & Spinning */
            @keyframes flowBlue {
              0% { transform: rotate(0deg) scale(0.9); border-radius: 45% 55% 40% 60% / 55% 45% 60% 40%; }
              50% { transform: rotate(180deg) scale(1.1); border-radius: 60% 40% 55% 45% / 40% 60% 45% 55%; }
              100% { transform: rotate(360deg) scale(0.9); border-radius: 45% 55% 40% 60% / 55% 45% 60% 40%; }
            }

            @keyframes flowRed {
              0% { transform: rotate(360deg) scale(1.1); border-radius: 55% 45% 60% 40% / 45% 55% 40% 60%; }
              50% { transform: rotate(180deg) scale(0.9); border-radius: 40% 60% 45% 55% / 60% 40% 55% 45%; }
              100% { transform: rotate(0deg) scale(1.1); border-radius: 55% 45% 60% 40% / 45% 55% 40% 60%; }
            }

            .main-logo {
              width: 100%;
              height: 100%;
              object-fit: cover; 
              border-radius: 50%;
              position: relative;
              z-index: 8;
              box-shadow: inset 0 0 20px rgba(0,0,0,0.9);
              background: #020202;
              border: 2px solid rgba(255, 255, 255, 0.15);
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
              font-family: 'Abhaya Libre', 'Inter', serif;
              font-size: clamp(2.5rem, 6vw, 4.5rem);
              font-weight: 800;
              color: white;
              margin: 0;
              text-shadow: 0 10px 30px rgba(0,0,0,0.9), 0 0 20px rgba(255,255,255,0.2);
              line-height: 1.1;
            }

            .main-title .highlight {
              background: linear-gradient(90deg, #ff003c, #00c3ff);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.2));
            }

            .tagline {
              font-family: 'Inter', sans-serif;
              font-size: clamp(0.7rem, 2vw, 0.9rem);
              font-weight: 600;
              letter-spacing: 0.3em;
              color: rgba(255,255,255,0.6);
              text-transform: uppercase;
              margin-top: 20px;
              display: flex;
              align-items: center;
              gap: 15px;
            }

            .tagline .dot {
              color: rgba(255, 0, 60, 0.8);
              text-shadow: 0 0 10px #ff003c;
            }

            .loading-text {
              margin-top: 40px;
              font-family: 'Inter', sans-serif;
              font-size: 0.7rem;
              letter-spacing: 0.2em;
              color: #888;
              text-transform: uppercase;
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .loading-dot {
              width: 6px;
              height: 6px;
              border-radius: 50%;
              background: #00c3ff;
              box-shadow: 0 0 10px #00c3ff;
              animation: pulseBlue 1s infinite alternate;
            }

            @keyframes pulseBlue {
              from { opacity: 0.4; transform: scale(0.8); }
              to { opacity: 1; transform: scale(1.3); }
            }

            /* --- RESPONSIVE --- */
            @media (max-width: 768px) {
              .logo-wrapper { width: 160px; height: 160px; margin-bottom: 30px; }
              .plasma-blue { inset: -25px -5px -25px -40px; }
              .plasma-red { inset: -5px -40px -25px -5px; }
              .tagline { flex-direction: column; gap: 8px; letter-spacing: 0.2em; }
              .tagline .dot { display: none; }
            }
          `}} />

          {/* Background Elements */}
          <div className="mystic-glow" />
          
          <div className="particles-container">
            <div className="firefly f-red" style={{ left: '20%', top: '30%', animationDelay: '0s' }} />
            <div className="firefly f-blue" style={{ left: '80%', top: '60%', animationDelay: '1s' }} />
            <div className="firefly f-red" style={{ left: '70%', top: '20%', animationDelay: '2s' }} />
            <div className="firefly f-blue" style={{ left: '30%', top: '70%', animationDelay: '1.5s' }} />
            <div className="firefly f-red" style={{ left: '50%', top: '80%', animationDelay: '0.5s' }} />
          </div>

          {/* Main Content */}
          <div className="content-container">
            
            {/* Animated Fluid Red & Blue Flame Logo */}
            <motion.div 
              className="logo-wrapper"
              initial={{ scale: 0.6, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            >
              <div className="plasma-cyan" />
              <div className="plasma-orange" />
              <div className="plasma-blue" />
              <div className="plasma-red" />
              <div className="flame-core-ring" />
              
              <img 
                src="/logo.png" 
                alt="Soba Senankaya Logo" 
                className="main-logo"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://via.placeholder.com/250/050505/ffffff?text=LOGO";
                }}
              />
            </motion.div>

            {/* Cinematic Text Reveal */}
            <motion.h1 
              className="main-title"
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
            >
              සොබා <span className="highlight">සේනාංකය</span>
            </motion.h1>

            <motion.div 
              className="tagline"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1.2, ease: "easeOut" }}
            >
              ස්වභාවය <span className="dot">•</span> මනුෂ්‍යත්වය <span className="dot">•</span> වගකීම
            </motion.div>

            {/* Loading Indicator */}
            <motion.div 
              className="loading-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 1 }}
            >
              <span className="loading-dot" />
              පද්ධතිය ආරම්භ වෙමින් පවතී...
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
