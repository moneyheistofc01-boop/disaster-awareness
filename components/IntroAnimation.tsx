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
        
        document.body.style.overflow = 'hidden';

        const exitTimer = setTimeout(() => setIsExiting(true), 4500); 
        
        const removeTimer = setTimeout(() => {
            setShow(false); 
            document.body.style.overflow = '';
        }, 5500);

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
          className="premium-intro-container"
          initial={{ opacity: 1 }}
          animate={isExiting ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0, 
            width: '100vw',
            height: '100dvh',
            background: '#050505',
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
            /* --- PREMIUM BACKGROUND --- */
            .premium-intro-container::before {
              content: '';
              position: absolute;
              inset: 0;
              background-image: 
                linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
              background-size: 40px 40px;
              opacity: 0.5;
              z-index: 1;
              pointer-events: none;
            }

            /* --- LOGO WRAPPER & DUAL FLAME RINGS --- */
            .premium-logo-wrapper {
              position: relative;
              width: 190px;
              height: 190px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 40px;
              z-index: 10;
            }

            /* 1. Red Flame Ring - Spinning Clockwise (Right) */
            .ring-fire-red {
              position: absolute;
              inset: -8px;
              border-radius: 50%;
              border: 3px solid transparent;
              border-top-color: #ff003c;
              border-right-color: #ff4d6d;
              box-shadow: 0 0 15px rgba(255, 0, 60, 0.7);
              animation: spinClockwise 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              z-index: 3;
            }

            /* 2. Blue Flame Ring - Spinning Counter-Clockwise (Left) */
            .ring-fire-blue {
              position: absolute;
              inset: -18px;
              border-radius: 50%;
              border: 3px solid transparent;
              border-bottom-color: #00c3ff;
              border-left-color: #0055ff;
              box-shadow: 0 0 15px rgba(0, 195, 255, 0.7);
              animation: spinCounterClockwise 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              z-index: 2;
            }

            /* 3. Outer Golden Dashed Orbit */
            .ring-outer {
              position: absolute;
              inset: -30px;
              border-radius: 50%;
              border: 1px dashed rgba(212, 175, 55, 0.3);
              animation: spinClockwise 15s linear infinite;
              z-index: 1;
            }

            /* Inner Core Ring */
            .ring-inner {
              position: absolute;
              inset: 4px;
              border-radius: 50%;
              border: 1px solid rgba(255, 255, 255, 0.15);
              box-shadow: inset 0 0 15px rgba(255, 255, 255, 0.1);
              z-index: 4;
            }

            /* The Logo itself */
            .premium-logo {
              width: 120px;
              height: 120px;
              object-fit: cover;
              border-radius: 50%;
              position: relative;
              z-index: 10;
              border: 2px solid rgba(212, 175, 55, 0.4);
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
              background: #000;
            }

            /* --- ANIMATION DIRECTIONS --- */
            @keyframes spinClockwise { 
              100% { transform: rotate(360deg); } 
            }
            @keyframes spinCounterClockwise { 
              100% { transform: rotate(-360deg); } 
            }

            /* --- TYPOGRAPHY & LOADING BAR --- */
            .premium-content {
              display: flex;
              flex-direction: column;
              align-items: center;
              z-index: 10;
              text-align: center;
            }

            .premium-title {
              font-family: 'Abhaya Libre', 'Inter', serif;
              font-size: clamp(2rem, 5vw, 3.5rem);
              font-weight: 800;
              color: #ffffff;
              margin: 0;
              letter-spacing: 0.05em;
              text-shadow: 0 4px 15px rgba(0,0,0,0.5);
            }

            .premium-title span {
              background: linear-gradient(90deg, #D4AF37, #F3E5AB);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }

            .premium-subtitle {
              font-family: 'Inter', sans-serif;
              font-size: clamp(0.7rem, 2vw, 0.85rem);
              font-weight: 500;
              letter-spacing: 0.4em;
              color: rgba(255, 255, 255, 0.5);
              text-transform: uppercase;
              margin-top: 15px;
            }

            .loading-wrapper {
              margin-top: 40px;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 12px;
            }

            .loading-text-pro {
              font-family: 'Inter', sans-serif;
              font-size: 0.65rem;
              letter-spacing: 0.2em;
              color: rgba(212, 175, 55, 0.8);
              text-transform: uppercase;
            }

            .progress-bar-container {
              width: 150px;
              height: 2px;
              background: rgba(255, 255, 255, 0.1);
              border-radius: 4px;
              overflow: hidden;
              position: relative;
            }

            .progress-bar-fill {
              position: absolute;
              top: 0; left: 0; bottom: 0;
              background: linear-gradient(90deg, transparent, #D4AF37, #FFF);
              width: 50%;
              border-radius: 4px;
              animation: loadProgress 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }

            @keyframes loadProgress {
              0% { width: 0%; left: -50%; }
              100% { width: 100%; left: 100%; }
            }

            @media (max-width: 768px) {
              .premium-logo-wrapper { width: 160px; height: 160px; margin-bottom: 30px; }
              .premium-logo { width: 100px; height: 100px; }
            }
          `}} />

          {/* Main Content */}
          <div className="premium-logo-wrapper">
            {/* Counter-rotating Flame Rings */}
            <div className="ring-outer" />
            <div className="ring-fire-blue" /> {/* Rotates Left (Counter-clockwise) */}
            <div className="ring-fire-red" />  {/* Rotates Right (Clockwise) */}
            <div className="ring-inner" />
            
            <motion.img 
              src="/logo.png" 
              alt="Soba Senankaya Logo" 
              className="premium-logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://via.placeholder.com/150/000000/D4AF37?text=LOGO";
              }}
            />
          </div>

          <div className="premium-content">
            <motion.h1 
              className="premium-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              සොබා <span>සේනාංකය</span>
            </motion.h1>

            <motion.p 
              className="premium-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              ස්වභාවය • මනුෂ්‍යත්වය • වගකීම
            </motion.p>

            <motion.div 
              className="loading-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <span className="loading-text-pro">SYSTEM INITIALIZATION</span>
              <div className="progress-bar-container">
                <div className="progress-bar-fill" />
              </div>
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
