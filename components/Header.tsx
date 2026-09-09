"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "next-themes";

import {
  ChevronDown,
  Leaf,
  Menu,
  Moon,
  Sun,
  X,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Users,
  MessageCircle,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const {
    lang,
    setLang,
  } = useLanguage();

  const {
    setTheme,
    resolvedTheme,
  } = useTheme();

  const [
    mounted,
    setMounted,
  ] = useState(false);

  const [
    isMobileOpen,
    setIsMobileOpen,
  ] = useState(false);

  const [
    isLanguageOpen,
    setIsLanguageOpen,
  ] = useState(false);

  const [
    isExploreOpen,
    setIsExploreOpen,
  ] = useState(false);

  const [
    scrolled,
    setScrolled,
  ] = useState(false);

  const headerRef =
    useRef<HTMLElement>(null);

  /* =======================================================
     MOUNT
  ======================================================== */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =======================================================
     SCROLL EFFECT
  ======================================================== */

  useEffect(() => {
    const handleScroll =
      () => {
        setScrolled(
          window.scrollY > 12
        );
      };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =======================================================
     OUTSIDE CLICK
  ======================================================== */

  useEffect(() => {
    const handleOutside =
      (
        event:
          | MouseEvent
          | TouchEvent
      ) => {
        const target =
          event.target as Node;

        if (
          headerRef.current &&
          !headerRef.current.contains(
            target
          )
        ) {
          setIsLanguageOpen(
            false
          );

          setIsExploreOpen(
            false
          );

          setIsMobileOpen(
            false
          );
        }
      };

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    document.addEventListener(
      "touchstart",
      handleOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutside
      );

      document.removeEventListener(
        "touchstart",
        handleOutside
      );
    };
  }, []);

  /* =======================================================
     MOBILE SCROLL LOCK
  ======================================================== */

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [isMobileOpen]);

  /* =======================================================
     HELPERS
  ======================================================== */

  const closeAll =
    () => {
      setIsMobileOpen(
        false
      );

      setIsLanguageOpen(
        false
      );

      setIsExploreOpen(
        false
      );
    };

  const toggleTheme =
    () => {
      setTheme(
        resolvedTheme ===
          "dark"
          ? "light"
          : "dark"
      );
    };

  const changeLanguage =
    (
      newLang:
        | "si"
        | "en"
    ) => {
      setLang(newLang);

      setIsLanguageOpen(
        false
      );
    };

  /*
   * Same-page anchor helper.
   */
  const handleAnchorClick =
    () => {
      closeAll();
    };

  /* =======================================================
     MAIN NAVIGATION
  ======================================================== */

  const mainNavigation = [
    {
      href: "#about",
      si: "හැඳින්වීම",
      en: "Introduction",
    },
    {
      href: "#vision",
      si: "දැක්ම",
      en: "Vision",
    },
    {
      href: "#mission",
      si: "මෙහෙවර",
      en: "Mission",
    },
    {
      href: "#objectives",
      si: "අරමුණු",
      en: "Objectives",
    },
  ];

  const exploreNavigation = [
    {
      href: "#action",
      si: "ක්‍රියාකාරීත්වය",
      en: "Activities",
      icon: Leaf,
    },
    {
      href: "#membership",
      si: "සාමාජිකත්වය",
      en: "Membership",
      icon: Users,
    },
    {
      href: "#message",
      si: "ස්වභාවධර්මයේ පණිවිඩය",
      en: "Message of Nature",
      icon: ShieldCheck,
    },
    {
      href: "#comments",
      si: "අදහස් හා යෝජනා",
      en: "Ideas & Suggestions",
      icon: MessageCircle,
    },
  ];

  /* =======================================================
     RENDER
  ======================================================== */

  return (
    <header
      ref={headerRef}
      className={`
        sticky
        top-0
        z-[500]
        w-full
        transition-all
        duration-500
        ${
          scrolled
            ? "border-b border-white/[0.08] bg-[#04100b]/95 shadow-[0_14px_45px_rgba(0,0,0,0.18)] backdrop-blur-2xl"
            : "border-b border-white/[0.05] bg-[#04100b]/82 backdrop-blur-xl"
        }
      `}
    >
      {/* ===================================================
          TOP HEADER
      ==================================================== */}

      <div
        className="
          mx-auto
          flex
          h-[64px]
          w-full
          max-w-7xl
          items-center
          justify-between
          gap-3
          px-4
          sm:h-[70px]
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            BRAND
        ================================================== */}

        <Link
          href="/"
          onClick={
            closeAll
          }
          className="
            group
            flex
            min-w-0
            items-center
            gap-3
          "
        >
          {/* Logo */}
          <motion.div
            whileHover={{
              scale: 1.04,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              relative
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-full
              border
              border-emerald-300/30
              bg-black/20
              p-1
              shadow-[0_0_26px_rgba(16,185,129,0.12)]
              sm:h-11
              sm:w-11
            "
          >
            <motion.div
              animate={{
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 6,
                repeat:
                  Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                inset-0
                rounded-full
                border
                border-emerald-400/10
              "
            />

            <img
              src="/logo.png"
              alt={
                lang ===
                "si"
                  ? "සොබා සේනාංකය"
                  : "Soba Senankaya"
              }
              draggable={false}
              className="
                relative
                h-full
                w-full
                rounded-full
                object-contain
              "
            />
          </motion.div>

          {/* Brand text */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span
                className="
                  block
                  truncate
                  text-[17px]
                  font-black
                  tracking-[-0.025em]
                  text-white
                  sm:text-xl
                "
              >
                {lang ===
                "si"
                  ? "සොබා සේනාංකය"
                  : "Soba Senankaya"}
              </span>

              <Sparkles
                size={13}
                className="
                  hidden
                  shrink-0
                  text-emerald-300/80
                  sm:block
                "
              />
            </div>

            <motion.span
              key={lang}
              initial={{
                opacity: 0,
                y: 3,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                hidden
                truncate
                text-[8px]
                font-bold
                uppercase
                tracking-[0.18em]
                text-emerald-300/60
                sm:block
                md:text-[9px]
              "
            >
              {lang ===
              "si"
                ? "ස්වභාවය • මනුෂ්‍යත්වය • වගකීම"
                : "NATURE • HUMANITY • RESPONSIBILITY"}
            </motion.span>
          </div>
        </Link>

        {/* =================================================
            DESKTOP NAV
        ================================================== */}

        <nav className="hidden items-center gap-1 xl:flex">
          {mainNavigation.map(
            (
              item
            ) => (
              <a
                key={
                  item.href
                }
                href={
                  item.href
                }
                onClick={
                  handleAnchorClick
                }
                className="
                  relative
                  rounded-xl
                  px-3
                  py-2
                  text-[12px]
                  font-bold
                  text-white/65
                  transition-all
                  duration-300
                  hover:bg-white/[0.05]
                  hover:text-emerald-300
                "
              >
                {lang ===
                "si"
                  ? item.si
                  : item.en}
              </a>
            )
          )}

          {/* Explore dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsExploreOpen(
                  (
                    value
                  ) =>
                    !value
                );

                setIsLanguageOpen(
                  false
                );
              }}
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-xl
                px-3
                py-2
                text-[12px]
                font-bold
                text-white/65
                transition-all
                duration-300
                hover:bg-white/[0.05]
                hover:text-emerald-300
              "
            >
              {lang ===
              "si"
                ? "තවත්"
                : "Explore"}

              <ChevronDown
                size={
                  13
                }
                className={`
                  transition-transform
                  duration-300
                  ${
                    isExploreOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            <AnimatePresence>
              {isExploreOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.97,
                  }}
                  transition={{
                    duration:
                      0.2,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    right-0
                    top-[calc(100%+10px)]
                    w-[260px]
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-white/10
                    bg-[#07130e]/97
                    p-2
                    shadow-[0_25px_70px_rgba(0,0,0,0.35)]
                    backdrop-blur-2xl
                  "
                >
                  <div className="px-3 pb-2 pt-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-300/60">
                      {lang ===
                      "si"
                        ? "සොබා සේනාංකය"
                        : "Soba Senankaya"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    {exploreNavigation.map(
                      (
                        item
                      ) => {
                        const Icon =
                          item.icon;

                        return (
                          <a
                            key={
                              item.href
                            }
                            href={
                              item.href
                            }
                            onClick={
                              handleAnchorClick
                            }
                            className="
                              group
                              flex
                              items-center
                              gap-3
                              rounded-2xl
                              px-3
                              py-3
                              transition
                              hover:bg-emerald-400/[0.08]
                            "
                          >
                            <span
                              className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                bg-emerald-400/[0.07]
                                text-emerald-300
                                transition
                                group-hover:bg-emerald-400/15
                              "
                            >
                              <Icon
                                size={
                                  17
                                }
                              />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-bold text-white/85">
                                {lang ===
                                "si"
                                  ? item.si
                                  : item.en}
                              </span>
                            </span>

                            <ArrowRight
                              size={
                                15
                              }
                              className="
                                shrink-0
                                text-white/20
                                transition-all
                                group-hover:translate-x-1
                                group-hover:text-emerald-300
                              "
                            />
                          </a>
                        );
                      }
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* =================================================
            DESKTOP CONTROLS
        ================================================== */}

        <div className="hidden items-center gap-2 md:flex">
          {/* Language */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsLanguageOpen(
                  (
                    value
                  ) =>
                    !value
                );

                setIsExploreOpen(
                  false
                );
              }}
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/[0.045]
                px-3
                py-2
                text-[11px]
                font-black
                text-white/80
                transition-all
                duration-300
                hover:border-emerald-300/20
                hover:bg-white/[0.07]
              "
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400/10 text-[9px] font-black text-emerald-300">
                {lang ===
                "si"
                  ? "සි"
                  : "EN"}
              </span>

              <span>
                {lang ===
                "si"
                  ? "සිංහල"
                  : "English"}
              </span>

              <ChevronDown
                size={
                  13
                }
                className={`
                  text-white/45
                  transition-transform
                  duration-300
                  ${
                    isLanguageOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />
            </button>

            <AnimatePresence>
              {isLanguageOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.97,
                  }}
                  transition={{
                    duration:
                      0.2,
                  }}
                  className="
                    absolute
                    right-0
                    top-[calc(100%+10px)]
                    w-[190px]
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-white/10
                    bg-[#07130e]/98
                    p-2
                    shadow-[0_25px_70px_rgba(0,0,0,0.35)]
                    backdrop-blur-2xl
                  "
                >
                  <div className="px-3 pb-2 pt-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-300/55">
                      Language
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      changeLanguage(
                        "si"
                      )
                    }
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-2xl
                      px-3
                      py-3
                      text-left
                      transition
                      ${
                        lang ===
                        "si"
                          ? "bg-emerald-400/10"
                          : "hover:bg-white/[0.05]"
                      }
                    `}
                  >
                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        text-xs
                        font-black
                        ${
                          lang ===
                          "si"
                            ? "bg-emerald-400 text-emerald-950"
                            : "bg-white/[0.06] text-white/60"
                        }
                      `}
                    >
                      සි
                    </span>

                    <span className="flex-1">
                      <span
                        className={`
                          block
                          text-sm
                          font-bold
                          ${
                            lang ===
                            "si"
                              ? "text-white"
                              : "text-white/65"
                          }
                        `}
                      >
                        සිංහල
                      </span>

                      <span className="text-[10px] text-white/35">
                        Sinhala
                      </span>
                    </span>

                    {lang ===
                      "si" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      changeLanguage(
                        "en"
                      )
                    }
                    className={`
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-2xl
                      px-3
                      py-3
                      text-left
                      transition
                      ${
                        lang ===
                        "en"
                          ? "bg-emerald-400/10"
                          : "hover:bg-white/[0.05]"
                      }
                    `}
                  >
                    <span
                      className={`
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-xl
                        text-[10px]
                        font-black
                        ${
                          lang ===
                          "en"
                            ? "bg-emerald-400 text-emerald-950"
                            : "bg-white/[0.06] text-white/60"
                        }
                      `}
                    >
                      EN
                    </span>

                    <span className="flex-1">
                      <span
                        className={`
                          block
                          text-sm
                          font-bold
                          ${
                            lang ===
                            "en"
                              ? "text-white"
                              : "text-white/65"
                          }
                        `}
                      >
                        English
                      </span>

                      <span className="text-[10px] text-white/35">
                        English
                      </span>
                    </span>

                    {lang ===
                      "en" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme */}
          <motion.button
            type="button"
            whileTap={{
              scale: 0.9,
            }}
            onClick={
              toggleTheme
            }
            aria-label={
              lang ===
              "si"
                ? "තේමාව වෙනස් කරන්න"
                : "Toggle theme"
            }
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-white/10
              bg-white/[0.045]
              text-white/65
              transition
              hover:border-emerald-300/20
              hover:bg-white/[0.07]
              hover:text-emerald-300
            "
          >
            {mounted ? (
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={
                    resolvedTheme
                  }
                  initial={{
                    opacity: 0,
                    rotate:
                      -45,
                    scale:
                      0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate:
                      45,
                    scale:
                      0.7,
                  }}
                  transition={{
                    duration:
                      0.2,
                  }}
                >
                  {resolvedTheme ===
                  "dark" ? (
                    <Sun
                      size={
                        16
                      }
                    />
                  ) : (
                    <Moon
                      size={
                        16
                      }
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="h-4 w-4" />
            )}
          </motion.button>
        </div>

        {/* =================================================
            MOBILE MENU BUTTON
        ================================================== */}

        <motion.button
          type="button"
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => {
            setIsMobileOpen(
              (
                value
              ) =>
                !value
            );

            setIsLanguageOpen(
              false
            );

            setIsExploreOpen(
              false
            );
          }}
          aria-label={
            isMobileOpen
              ? "Close menu"
              : "Open menu"
          }
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/[0.04]
            text-white
            md:hidden
          "
        >
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            {isMobileOpen ? (
              <motion.div
                key="close"
                initial={{
                  opacity: 0,
                  rotate:
                    -90,
                  scale:
                    0.7,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate:
                    90,
                  scale:
                    0.7,
                }}
              >
                <X size={23} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{
                  opacity: 0,
                  rotate: 90,
                  scale:
                    0.7,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate:
                    -90,
                  scale:
                    0.7,
                }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.28,
              ease: "easeOut",
            }}
            className="
              overflow-hidden
              border-t
              border-white/[0.07]
              bg-[#06110c]/98
              backdrop-blur-2xl
              md:hidden
            "
          >
            <div className="max-h-[calc(100vh-64px)] overflow-y-auto px-4 pb-6 pt-3">
              {/* =================================================
                  HOME
              ================================================== */}

              <Link
                href="/"
                onClick={
                  closeAll
                }
                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  px-4
                  py-3.5
                  text-[15px]
                  font-black
                  text-white
                  transition
                  hover:bg-white/[0.05]
                "
              >
                <span>
                  {lang ===
                  "si"
                    ? "මුල් පිටුව"
                    : "Home"}
                </span>

                <ArrowRight
                  size={
                    16
                  }
                  className="text-emerald-300/60"
                />
              </Link>

              {/* =================================================
                  MAIN NAV
              ================================================== */}

              <div className="mt-2 space-y-1">
                {mainNavigation.map(
                  (
                    item,
                    index
                  ) => (
                    <a
                      key={
                        item.href
                      }
                      href={
                        item.href
                      }
                      onClick={
                        handleAnchorClick
                      }
                      className="
                        flex
                        items-center
                        justify-between
                        rounded-2xl
                        px-4
                        py-3.5
                        transition
                        hover:bg-white/[0.05]
                      "
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-emerald-300/40">
                          {String(
                            index +
                              1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span className="text-[15px] font-bold text-white/80">
                          {lang ===
                          "si"
                            ? item.si
                            : item.en}
                        </span>
                      </div>

                      <ArrowRight
                        size={
                          15
                        }
                        className="text-white/20"
                      />
                    </a>
                  )
                )}
              </div>

              {/* =================================================
                  EXPLORE SECTION
              ================================================== */}

              <div className="mt-3 border-t border-white/[0.06] pt-3">
                <p className="px-4 pb-2 text-[9px] font-black uppercase tracking-[0.22em] text-emerald-300/50">
                  {lang ===
                  "si"
                    ? "තවත් කොටස්"
                    : "More sections"}
                </p>

                <div className="grid gap-1">
                  {exploreNavigation.map(
                    (
                      item
                    ) => {
                      const Icon =
                        item.icon;

                      return (
                        <a
                          key={
                            item.href
                          }
                          href={
                            item.href
                          }
                          onClick={
                            handleAnchorClick
                          }
                          className="
                            flex
                            items-center
                            gap-3
                            rounded-2xl
                            px-4
                            py-3.5
                            transition
                            hover:bg-emerald-400/[0.06]
                          "
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/[0.07] text-emerald-300">
                            <Icon
                              size={
                                17
                              }
                            />
                          </span>

                          <span className="flex-1 text-[14px] font-bold text-white/75">
                            {lang ===
                            "si"
                              ? item.si
                              : item.en}
                          </span>

                          <ArrowRight
                            size={
                              15
                            }
                            className="text-white/20"
                          />
                        </a>
                      );
                    }
                  )}
                </div>
              </div>

              {/* =================================================
                  CONTROLS
              ================================================== */}

              <div className="mt-4 flex items-center justify-between rounded-[22px] border border-white/[0.06] bg-white/[0.025] p-3">
                {/* Language */}
                <div className="flex items-center gap-1 rounded-full bg-black/20 p-1">
                  <button
                    type="button"
                    onClick={() =>
                      setLang(
                        "si"
                      )
                    }
                    className={`
                      rounded-full
                      px-4
                      py-2
                      text-xs
                      font-black
                      transition
                      ${
                        lang ===
                        "si"
                          ? "bg-emerald-400 text-emerald-950 shadow-[0_6px_20px_rgba(52,211,153,0.15)]"
                          : "text-white/45"
                      }
                    `}
                  >
                    සිං
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setLang(
                        "en"
                      )
                    }
                    className={`
                      rounded-full
                      px-4
                      py-2
                      text-xs
                      font-black
                      transition
                      ${
                        lang ===
                        "en"
                          ? "bg-emerald-400 text-emerald-950 shadow-[0_6px_20px_rgba(52,211,153,0.15)]"
                          : "text-white/45"
                      }
                    `}
                  >
                    EN
                  </button>
                </div>

                {/* Theme */}
                <button
                  type="button"
                  onClick={
                    toggleTheme
                  }
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-white/[0.05]
                    text-white/65
                    transition
                    hover:bg-white/[0.08]
                  "
                >
                  {mounted &&
                  resolvedTheme ===
                    "dark" ? (
                    <Sun
                      size={
                        18
                      }
                      className="text-amber-300"
                    />
                  ) : (
                    <Moon
                      size={
                        18
                      }
                      className="text-indigo-300"
                    />
                  )}
                </button>
              </div>

              {/* =================================================
                  CTA
              ================================================== */}

              <a
                href="#membership"
                onClick={
                  handleAnchorClick
                }
                className="
                  mt-4
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-emerald-400
                  px-5
                  py-3.5
                  text-sm
                  font-black
                  text-emerald-950
                  shadow-[0_12px_40px_rgba(52,211,153,0.14)]
                  transition
                  hover:bg-emerald-300
                "
              >
                {lang ===
                "si"
                  ? "සොබා ආරක්ෂකයෙක් වන්න"
                  : "Become a Guardian"}

                <ArrowRight
                  size={
                    17
                  }
                />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
                          }
