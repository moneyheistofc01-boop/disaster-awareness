"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

const smoothEase = [
  0.22,
  1,
  0.36,
  1,
] as const;

const INTRO_KEY =
  "sobasenankaya_intro_seen";

export default function IntroAnimation() {
  const [showIntro, setShowIntro] =
    useState(false);

  const [ready, setReady] =
    useState(false);

  useEffect(() => {
    /*
     * -------------------------------------------------------
     * FIRST ENTRY ONLY
     *
     * sessionStorage means:
     * - Refresh -> NO intro
     * - Internal navigation -> NO intro
     * - Return in same browser tab -> NO intro
     * - New tab/session -> intro can appear again
     * -------------------------------------------------------
     */

    try {
      const alreadySeen =
        sessionStorage.getItem(
          INTRO_KEY
        );

      if (alreadySeen === "1") {
        setReady(true);
        return;
      }

      /*
       * Mark as seen immediately.
       * This prevents the intro from appearing twice
       * because of re-renders / route transitions.
       */
      sessionStorage.setItem(
        INTRO_KEY,
        "1"
      );

      setShowIntro(true);
    } catch {
      /*
       * If storage is unavailable,
       * still show intro once for this mount.
       */
      setShowIntro(true);
    }

    setReady(true);

    /*
     * Stop scrolling during intro.
     */
    document.body.style.overflow =
      "hidden";

    const timer =
      window.setTimeout(() => {
        setShowIntro(false);
        document.body.style.overflow =
          "";
      }, 4200);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow =
        "";
    };
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="sobasenankaya-intro"
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-[#020705]"
        >
          {/* =================================================
              BACKGROUND GLOW
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 1.4,
              ease: smoothEase,
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/[0.08] blur-[70px] sm:h-[480px] sm:w-[480px]"
          />

          {/* =================================================
              SECOND SOFT GLOW
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.35,
            }}
            transition={{
              delay: 0.35,
              duration: 1.8,
              ease: "easeOut",
            }}
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(16,185,129,0.08),transparent_38%)]"
          />

          {/* =================================================
              CONTENT
          ================================================== */}

          <div className="relative z-10 flex w-full flex-col items-center justify-center px-6">
            {/* Logo animation */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.72,
                y: 16,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              transition={{
                delay: 0.15,
                duration: 0.85,
                ease: smoothEase,
              }}
              className="relative flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48"
            >
              {/* Outer ring */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.8,
                  rotate: -20,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  delay: 0.35,
                  duration: 1,
                  ease: smoothEase,
                }}
                className="absolute inset-0 rounded-full border border-emerald-300/20"
              />

              {/* Rotating dashed ring */}
              <motion.div
                initial={{
                  opacity: 0,
                  rotate: -90,
                }}
                animate={{
                  opacity: 0.7,
                  rotate: 0,
                }}
                transition={{
                  opacity: {
                    delay: 0.75,
                    duration: 0.4,
                  },
                  rotate: {
                    delay: 0.75,
                    duration: 2.6,
                    ease: "linear",
                  },
                }}
                className="absolute inset-2 rounded-full border border-dashed border-emerald-400/25"
              />

              {/* Logo glow */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 0.9,
                  scale: 1,
                }}
                transition={{
                  delay: 0.7,
                  duration: 1,
                  ease: smoothEase,
                }}
                className="absolute inset-7 rounded-full bg-emerald-400/10 blur-2xl"
              />

              {/* Actual logo */}
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.82,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.48,
                  duration: 0.85,
                  ease: smoothEase,
                }}
                className="relative h-28 w-28 overflow-hidden rounded-full border border-white/15 bg-black/20 p-2 shadow-[0_0_45px_rgba(16,185,129,0.16)] sm:h-32 sm:w-32"
              >
                <img
                  src="/logo.png"
                  alt="සොබා සේනාංකය"
                  draggable={false}
                  className="h-full w-full rounded-full object-contain"
                />
              </motion.div>
            </motion.div>

            {/* =================================================
                BRAND
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 14,
                filter:
                  "blur(8px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter:
                  "blur(0px)",
              }}
              transition={{
                delay: 1.15,
                duration: 0.9,
                ease: smoothEase,
              }}
              className="mt-7 text-center"
            >
              <h1 className="text-3xl font-black tracking-[-0.03em] text-white sm:text-5xl">
                සොබා සේනාංකය
              </h1>

              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-300/75 sm:text-xs">
                Soba Senankaya
              </p>
            </motion.div>

            {/* =================================================
                LINE
            ================================================== */}

            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              animate={{
                width: "110px",
                opacity: 1,
              }}
              transition={{
                delay: 1.55,
                duration: 0.85,
                ease: smoothEase,
              }}
              className="mt-5 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
            />

            {/* =================================================
                TAGLINE
            ================================================== */}

            <motion.p
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 1.78,
                duration: 0.8,
                ease: smoothEase,
              }}
              className="mt-4 text-center text-[10px] font-semibold tracking-[0.16em] text-emerald-100/55 sm:text-xs"
            >
              ස්වභාවය • මනුෂ්‍යත්වය • වගකීම
            </motion.p>

            {/* =================================================
                PROGRESS
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 2.05,
                duration: 0.5,
              }}
              className="mt-8 h-[2px] w-24 overflow-hidden rounded-full bg-white/5"
            >
              <motion.div
                initial={{
                  x: "-100%",
                }}
                animate={{
                  x: "100%",
                }}
                transition={{
                  delay: 2.1,
                  duration: 1.4,
                  ease: "easeInOut",
                }}
                className="h-full w-1/2 rounded-full bg-emerald-400"
              />
            </motion.div>
          </div>

          {/* =================================================
              BOTTOM FADE
          ================================================== */}

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
              }
