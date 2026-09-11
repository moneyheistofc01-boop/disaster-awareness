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
        
        // Prevent background scrolling
        document.body.style.overflow = 'hidden';

        // Start fading out after 5.5 seconds
        const exitTimer = setTimeout(() => setIsExiting(true), 5500); 
        
        // Remove completely from DOM after 7 seconds
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
            background: '#050200', // Deep warm dark background
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
            /* --- MYSTICAL GOLDEN BACKGROUND --- */
            .mystic-glow {
              position: absolute;
              inset: 0;
              background: radial-gradient(circle at 40% 30%, rgba(255, 165, 0, 0.05) 0%, transparent 50%),
                          radial-gradient(circle at 60% 70%, rgba(255, 215, 0, 0.06) 0%, transparent 50%),
                          #050200;
              z-index: 1;
            }

            /* --- FLOATING GOLDEN PARTICLES --- */
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
              animation: floatMagic 5s ease-in-out infinite alternate;
            }

            .f-gold {
              width: 5px; height: 5px;
              background: #FFD700;
              box-shadow: 0 0 15px #FFD700, 0 0 25px #FFA500;
            }

            .f-orange {
              width: 7px; height: 7px;
              background: #FFA500;
              box-shadow: 0 0 15px #FFA500, 0 0 30px #FF4500;
            }

            @keyframes floatMagic {
              0% { transform: translate(0, 0) scale(0.8); opacity: 0.2; }
              50% { opacity: 0.9; }
              100% { transform: translate(40px, -60px) scale(1.3); opacity: 0.2; }
            }

            /* --- GOLDEN SPARKLE RING EFFECTS (Like the Image) --- */
            .logo-wrapper {
              position: relative;
              width: 220px;
              height: 220px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
              z-index: 10;
              margin-bottom: 30px;
            }

            /* Solid Inner Gold Ring */
            .gold-ring-inner {
              position: absolute;
              inset: -8px;
              border-radius: 50%;
              border: 2px solid rgba(255, 215, 0, 0.6);
              box-shadow: inset 0 0 15px rgba(255, 165, 0, 0.8), 0 0 15px rgba(255, 215, 0, 0.8);
              z-index: 5;
            }

            /* Main Glowing Swirl 1 */
            .gold-swirl-main {
              position: absolute;
              inset: -20px;
              border-radius: 50%;
              border: 6px solid transparent;
              border-top-color: #FFD700;
              border-right-color: #FFA500;
              filter: drop-shadow(0 0 20px #FFA500) blur(1px);
              animation: spinRight 2s cubic-bezier(0.68, -0.15, 0.265, 1.15) infinite;
              z-index: 4;
            }

            /* Wide Blurred Glow Swirl 2 */
            .gold-swirl-outer {
              position: absolute;
              inset: -35px;
              border-radius: 50%;
              border: 12px solid transparent;
              border-bottom-color: rgba(255, 140, 0, 0.9);
              border-left-color: rgba(255, 215, 0, 0.6);
              filter: blur(8px);
              animation: spinLeft 3s linear infinite;
              z-index: 3;
            }

            /* Sparkling Dust / Stars Effect */
            .sparkle-dust {
              position: absolute;
              inset: -50px;
              border-radius: 50%;
              animation: spinRight 8s linear infinite;
              z-index: 6;
              pointer-events: none;
            }

            /* Creating dots using box-shadow trick to match image stars */
            .sparkle-dust::before {
              content: '';
              position: absolute;
              top: 50%; left: 50%;
              width: 3px; height: 3px;
              border-radius: 50%;
              background: #FFF;
              box-shadow: 
                0 -130px 2px #FFD700, 30px -125px 1px #FFF, -40px -120px 3px #FFA500, 70px -100px 1px #FFD700,
                -80px -90px 2px #FFF, 100px -70px 1px #FFA500, -110px -50px 3px #FFD700, 125px -10px 1px #FFF,
                -130px 20px 2px #FFA500, 110px 60px 1px #FFD700, -90px 90px 2px #FFF, 60px 110px 3px #FFA500,
                -30px 125px 1px #FFD700, 0 135px 2px #FFF, 40px 120px 1px #FFA500, -70px 100px 2px #FFD700,
                90px 80px 1px #FFF, -120px 40px 2px #FFA500, 130px -30px 1px #FFD700, -100px -80px 2px #FFF;
              filter: drop-shadow(0 0 5px #FFD700) drop-shadow(0 0 10px #FFA500);
            }

            /* Bright Star Flare */
            .star-flare {
              position: absolute;
              top: -10px;
              left: 50%;
              transform: translateX(-50%);
              width: 40px;
              height: 4px;
              background: #FFF;
              border-radius: 50%;
              box-shadow: 0 0 20px #FFF, 0 0 40px #FFD700;
              z-index: 7;
            }
            .star-flare::after {
              content: '';
              position: absolute;
              top: 50%; left: 50%;
              transform: translate(-50%, -50%) rotate(90deg);
              width: 40px; height: 2px;
              background: #FFF;
              border-radius: 50%;
              box-shadow: 0 0 20px #FFF, 0 0 40px #FFD700;
            }

            /* Golden Aura Background */
            .magic-aura {
              position: absolute;
              inset: -60px;
              border-radius: 50%;
              background: radial-gradient(circle, rgba(255, 165, 0, 0.25) 0%, transparent 65%);
              filter: blur(20px);
              z-index: 2;
            }

            @keyframes spinRight { 100% { transform: rotate(360deg); } }
            @keyframes spinLeft { 100% { transform: rotate(-360deg); } }

            .main-logo {
              width: 100%;
              height: 100%;
              object-fit: cover; 
              border-radius: 50%;
              position: relative;
              z-index: 8;
              box-shadow: 0 0 30px rgba(0,0,0,0.9), inset 0 0 20px rgba(0,0,0,0.8);
              background: #050505;
            }

            /* --- TYPOGRAPHY (MATCHING GOLDEN THEME) --- */
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
              text-shadow: 0 10px 30px rgba(0,0,0,0.9), 0 0 20px rgba(255,215,0,0.1);
              line-height: 1.1;
            }

            .main-title .highlight {
              /* Changed from red/blue to Gold/Orange to match the ring */
              background: linear-gradient(90deg, #FFD700, #FF8C00);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              filter: drop-shadow(0 0 15px rgba(255, 215, 0, 0.3));
            }

            .tagline {
              font-family: 'Inter', sans-serif;
              font-size: clamp(0.7rem, 2vw, 0.9rem);
              font-weight: 600;
              letter-spacing: 0.3em;
              color: rgba(255,255,255,0.7);
              text-transform: uppercase;
              margin-top: 20px;
              display: flex;
              align-items: center;
              gap: 15px;
            }

            .tagline .dot {
              color: #FFA500;
              text-shadow: 0 0 10px #FFD700;
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
              background: #FFD700;
              box-shadow: 0 0 10px #FFD700;
              animation: pulseGold 1s infinite alternate;
            }

            @keyframes pulseGold {
              from { opacity: 0.4; transform: scale(0.8); }
              to { opacity: 1; transform: scale(1.3); }
            }

            /* --- RESPONSIVE ADJUSTMENTS --- */
            @media (max-width: 768px) {
              .logo-wrapper { width: 170px; height: 170px; margin-bottom: 30px; }
              .gold-swirl-main { inset: -15px; border-width: 4px; }
              .gold-swirl-outer { inset: -25px; border-width: 8px; }
              .sparkle-dust { transform: scale(0.8); }
              .tagline { flex-direction: column; gap: 8px; letter-spacing: 0.2em; }
              .tagline .dot { display: none; }
            }
          `}} />

          {/* Background Elements */}
          <div className="mystic-glow" />
          
          <div className="particles-container">
            <div className="firefly f-gold" style={{ left: '20%', top: '30%', animationDelay: '0s' }} />
            <div className="firefly f-orange" style={{ left: '80%', top: '60%', animationDelay: '1s' }} />
            <div className="firefly f-gold" style={{ left: '70%', top: '20%', animationDelay: '2s' }} />
            <div className="firefly f-orange" style={{ left: '30%', top: '70%', animationDelay: '1.5s' }} />
            <div className="firefly f-gold" style={{ left: '50%', top: '80%', animationDelay: '0.5s' }} />
          </div>

          {/* Main Content */}
          <div className="content-container">
            
            {/* Animated Golden Logo Ring */}
            <motion.div 
              className="logo-wrapper"
              initial={{ scale: 0.6, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            >
              <div className="magic-aura" />
              <div className="sparkle-dust">
                {/* The bright cross flare on the ring */}
                <div className="star-flare" />
              </div>
              <div className="gold-swirl-outer" />
              <div className="gold-swirl-main" />
              <div className="gold-ring-inner" />
              
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
