"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

const INTRO_KEY = "sobasenankaya_intro_seen";
const INTRO_DURATION = 7000;

const smoothEase = [0.22, 1, 0.36, 1] as const;

function FloatingLeaf({
  delay,
  left,
  top,
  size,
  duration,
  rotate,
}: {
  delay: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  rotate: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 0,
        y: 15,
        rotate: rotate - 8,
      }}
      animate={
        reduceMotion
          ? {
              opacity: 0.18,
              rotate,
            }
          : {
              opacity: [0, 0.18, 0.12, 0],
              x: [0, 18, -12, 0],
              y: [15, -8, -28, -45],
              rotate: [
                rotate - 8,
                rotate + 5,
                rotate - 2,
                rotate,
              ],
            }
      }
      transition={{
        delay,
        duration,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 0.5,
      }}
      className="pointer-events-none absolute"
      style={{
        left,
        top,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M34 5C22 6 10 11 7 21C4 30 10 35 18 33C28 31 34 20 34 5Z"
          fill="rgba(110,231,183,0.12)"
          stroke="rgba(110,231,183,0.42)"
          strokeWidth="1"
        />
        <path
          d="M10 29C17 23 23 17 30 9"
          stroke="rgba(167,243,208,0.42)"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
}

export default function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let shouldShow = false;

    try {
      const alreadySeen = sessionStorage.getItem(INTRO_KEY);

      if (alreadySeen !== "1") {
        sessionStorage.setItem(INTRO_KEY, "1");
        shouldShow = true;
      }
    } catch {
      shouldShow = true;
    }

    setReady(true);

    if (!shouldShow) {
      return;
    }

    setShowIntro(true);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setShowIntro(false);
      document.body.style.overflow = previousOverflow;
    }, INTRO_DURATION);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!ready) {
    return null;
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="soba-natural-intro"
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-[2147483647] isolate overflow-hidden bg-[#020806]"
          style={{
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(16,185,129,0.075),transparent_34%),radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.045),transparent_26%),linear-gradient(180deg,#020806_0%,#03100a_52%,#010503_100%)]" />

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.6,
            }}
            transition={{
              duration: 2.6,
              ease: "easeOut",
            }}
            className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-[radial-gradient(ellipse_at_50%_0%,rgba(134,239,172,0.055),transparent_60%)]"
          />

          <FloatingLeaf
            delay={0.8}
            left="13%"
            top="23%"
            size={26}
            duration={7}
            rotate={-18}
          />

          <FloatingLeaf
            delay={1.7}
            left="79%"
            top="18%"
            size={22}
            duration={8}
            rotate={18}
          />

          <FloatingLeaf
            delay={2.2}
            left="8%"
            top="63%"
            size={20}
            duration={8.5}
            rotate={-12}
          />

          <FloatingLeaf
            delay={2.8}
            left="86%"
            top="62%"
            size={27}
            duration={9}
            rotate={15}
          />

          <FloatingLeaf
            delay={3.5}
            left="72%"
            top="78%"
            size={18}
            duration={7.5}
            rotate={20}
          />

          {[...Array(7)].map((_, index) => {
            const positions = [
              {
                left: "17%",
                top: "40%",
              },
              {
                left: "82%",
                top: "39%",
              },
              {
                left: "28%",
                top: "72%",
              },
              {
                left: "69%",
                top: "68%",
              },
              {
                left: "91%",
                top: "52%",
              },
              {
                left: "9%",
                top: "50%",
              },
              {
                left: "50%",
                top: "16%",
              },
            ];

            const position = positions[index];

            return (
              <motion.span
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.4,
                }}
                animate={
                  reduceMotion
                    ? {
                        opacity: 0.2,
                      }
                    : {
                        opacity: [0, 0.32, 0.12, 0],
                        scale: [0.4, 1, 0.8, 0.4],
                        y: [8, -4, -10, -18],
                      }
                }
                transition={{
                  delay: 1 + index * 0.28,
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute h-1 w-1 rounded-full bg-emerald-300/40"
                style={{
                  left: position.left,
                  top: position.top,
                }}
              />
            );
          })}

          <div className="relative z-20 flex min-h-screen items-center justify-center px-6">
            <div className="flex w-full max-w-xl flex-col items-center text-center">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.88,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: 0.25,
                  duration: 1.5,
                  ease: smoothEase,
                }}
                className="relative flex h-[190px] w-[190px] items-center justify-center sm:h-[225px] sm:w-[225px]"
              >
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: [0, 0.7, 0.42],
                    scale: [0.7, 1, 0.96],
                  }}
                  transition={{
                    delay: 0.7,
                    duration: 2.2,
                    ease: smoothEase,
                  }}
                  className="absolute inset-6 rounded-full bg-emerald-400/[0.08] blur-3xl"
                />

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.72,
                  }}
                  animate={{
                    opacity: 0.35,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.55,
                    duration: 1.7,
                    ease: smoothEase,
                  }}
                  className="absolute inset-0 rounded-full border border-emerald-200/20"
                />

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.78,
                  }}
                  animate={{
                    opacity: 0.55,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.95,
                    duration: 1.8,
                    ease: smoothEase,
                  }}
                  className="absolute inset-3 rounded-full border border-emerald-300/[0.16]"
                />

                <motion.div
                  initial={{
                    opacity: 0,
                    rotate: -30,
                  }}
                  animate={{
                    opacity: 0.4,
                    rotate: 30,
                  }}
                  transition={{
                    delay: 1.2,
                    duration: 5,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-6 rounded-full border border-dashed border-emerald-300/[0.18]"
                />

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.72,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 1.1,
                    duration: 1.45,
                    ease: smoothEase,
                  }}
                  className="relative flex h-[116px] w-[116px] items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.025] p-3 shadow-[0_0_70px_rgba(16,185,129,0.12)] backdrop-blur-sm sm:h-[136px] sm:w-[136px]"
                >
                  <img
                    src="/logo.png"
                    alt="සොබා සේනාංකය"
                    draggable={false}
                    className="h-full w-full rounded-full object-contain"
                  />
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    rotate: 0,
                  }}
                  animate={
                    reduceMotion
                      ? {
                          opacity: 0.25,
                        }
                      : {
                          opacity: [0, 0.5, 0.1],
                          rotate: [0, 180, 360],
                        }
                  }
                  transition={{
                    delay: 1.6,
                    duration: 4.8,
                    ease: "linear",
                  }}
                  className="absolute inset-[-4px] rounded-full"
                >
                  <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emerald-300/70" />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 18,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                transition={{
                  delay: 2.45,
                  duration: 1.35,
                  ease: smoothEase,
                }}
                className="mt-8"
              >
                <h1 className="text-[2.25rem] font-black tracking-[-0.035em] text-white sm:text-5xl">
                  සොබා සේනාංකය
                </h1>

                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.34em] text-emerald-300/65 sm:text-[11px]">
                  SOBA SENANKAYA
                </p>
              </motion.div>

              <motion.div
                initial={{
                  width: 0,
                  opacity: 0,
                }}
                animate={{
                  width: 145,
                  opacity: 1,
                }}
                transition={{
                  delay: 3,
                  duration: 1.2,
                  ease: smoothEase,
                }}
                className="mt-6 h-px bg-gradient-to-r from-transparent via-emerald-300/45 to-transparent"
              />

              <motion.p
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 3.45,
                  duration: 1.1,
                  ease: smoothEase,
                }}
                className="mt-5 max-w-sm text-[10px] font-medium leading-6 tracking-[0.13em] text-emerald-100/55 sm:text-xs"
              >
                ස්වභාවය
                <span className="mx-2 text-emerald-400/50">
                  •
                </span>
                මනුෂ්‍යත්වය
                <span className="mx-2 text-emerald-400/50">
                  •
                </span>
                වගකීම
              </motion.p>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 4.05,
                  duration: 1.1,
                  ease: smoothEase,
                }}
                className="mt-5 max-w-md text-xs leading-7 text-white/38 sm:text-sm"
              >
                ස්වභාවධර්මය සුරැකීම යනු
                මනුෂ්‍යත්වයේ අනාගතය
                සුරැකීමයි.
              </motion.p>

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  delay: 4.6,
                  duration: 0.8,
                }}
                className="mt-8 w-[110px]"
              >
                <div className="h-px overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    initial={{
                      x: "-100%",
                    }}
                    animate={{
                      x: "100%",
                    }}
                    transition={{
                      delay: 4.65,
                      duration: 1.9,
                      ease: "easeInOut",
                    }}
                    className="h-full w-1/2 rounded-full bg-emerald-300/55"
                  />
                </div>
              </motion.div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/45 to-transparent" />

          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/20 to-transparent" />

          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/20 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
