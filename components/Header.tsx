"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
   TYPES
========================================================= */

type SectionItem = {
  id: string;
  si: string;
  en: string;
};

type ExploreItem = SectionItem & {
  icon: typeof Leaf;
};

/* =========================================================
   CONSTANTS
========================================================= */

const mainNavigation: SectionItem[] = [
  {
    id: "about",
    si: "හැඳින්වීම",
    en: "Introduction",
  },
  {
    id: "vision",
    si: "දැක්ම",
    en: "Vision",
  },
  {
    id: "mission",
    si: "මෙහෙවර",
    en: "Mission",
  },
  {
    id: "objectives",
    si: "අරමුණු",
    en: "Objectives",
  },
];

const exploreNavigation: ExploreItem[] = [
  {
    id: "action",
    si: "ක්‍රියාකාරීත්වය",
    en: "Activities",
    icon: Leaf,
  },
  {
    id: "membership",
    si: "සාමාජිකත්වය",
    en: "Membership",
    icon: Users,
  },
  {
    id: "message",
    si: "ස්වභාවධර්මයේ පණිවිඩය",
    en: "Message of Nature",
    icon: ShieldCheck,
  },
  {
    id: "comments",
    si: "අදහස් හා යෝජනා",
    en: "Ideas & Suggestions",
    icon: MessageCircle,
  },
];

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

  const pathname =
    usePathname();

  const router =
    useRouter();

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
     FONT STYLE
  ======================================================== */

  const sinhalaFont =
    "'Noto Sans Sinhala', 'Iskoola Pota', 'Nirmala UI', sans-serif";

  const englishFont =
    "'Inter', 'Segoe UI', system-ui, sans-serif";

  /* =======================================================
     MOUNT
  ======================================================== */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =======================================================
     HEADER SCROLL STATE
  ======================================================== */

  useEffect(() => {
    const handleScroll =
      () => {
        setScrolled(
          window.scrollY >
            12
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
     CLOSE ALL MENUS
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

  /* =======================================================
     THEME
  ======================================================== */

  const toggleTheme =
    () => {
      setTheme(
        resolvedTheme ===
          "dark"
          ? "light"
          : "dark"
      );
    };

  /* =======================================================
     LANGUAGE
  ======================================================== */

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

  /* =======================================================
     EXACT SECTION SCROLL
  ======================================================== */

  const scrollToSection =
    async (
      id: string
    ) => {
      /*
       * Close menus first.
       */
      closeAll();

      /*
       * Small timeout allows the
       * mobile menu animation/state
       * to begin closing before scroll.
       */
      await new Promise(
        (resolve) =>
          window.setTimeout(
            resolve,
            40
          )
      );

      /*
       * If user is on another page,
       * go home first and preserve hash.
       */
      if (
        pathname !== "/"
      ) {
        router.push(
          `/#${id}`
        );

        return;
      }

      const element =
        document.getElementById(
          id
        );

      if (!element) {
        return;
      }

      /*
       * Read actual sticky header height.
       */
      const headerHeight =
        headerRef.current?.getBoundingClientRect()
          .height ?? 68;

      /*
       * Extra breathing room.
       */
      const extraSpace = 14;

      /*
       * Exact absolute position.
       */
      const targetY =
        element.getBoundingClientRect()
          .top +
        window.scrollY -
        headerHeight -
        extraSpace;

      window.scrollTo({
        top: Math.max(
          0,
          targetY
        ),
        behavior:
          "smooth",
      });

      /*
       * Update URL hash without
       * triggering native browser jump.
       */
      try {
        window.history.replaceState(
          null,
          "",
          `#${id}`
        );
      } catch {
        // Ignore history errors.
      }
    };

  /* =======================================================
     MOBILE HOME
  ======================================================== */

  const handleHome =
    () => {
      closeAll();

      if (
        pathname !== "/"
      ) {
        router.push("/");
        return;
      }

      window.scrollTo({
        top: 0,
        behavior:
          "smooth",
      });
    };

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
            ? `
              border-b
              border-white/[0.09]
              bg-[#04100b]/96
              shadow-[0_14px_45px_rgba(0,0,0,0.20)]
              backdrop-blur-2xl
            `
            : `
              border-b
              border-white/[0.05]
              bg-[#04100b]/88
              backdrop-blur-xl
            `
        }
      `}
    >
      {/* =====================================================
          MAIN BAR
      ====================================================== */}

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

        <button
          type="button"
          onClick={
            handleHome
          }
          className="
            group
            flex
            min-w-0
            shrink
            items-center
            gap-3
            text-left
          "
          aria-label={
            lang === "si"
              ? "මුල් පිටුව"
              : "Home"
          }
        >
          {/* Logo */}
          <motion.div
            whileHover={{
              scale: 1.045,
            }}
            whileTap={{
              scale: 0.97,
            }}
            transition={{
              duration: 0.22,
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
              shadow-[0_0_28px_rgba(16,185,129,0.10)]
              sm:h-11
              sm:w-11
            "
          >
            <motion.div
              animate={{
                rotate: [
                  0,
                  1.5,
                  0,
                  -1.5,
                  0,
                ],
              }}
              transition={{
                duration: 7,
                repeat:
                  Infinity,
                ease:
                  "easeInOut",
              }}
              className="
                absolute
                inset-0
                rounded-full
                border
                border-emerald-300/10
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
              <motion.span
                key={`brand-${lang}`}
                initial={{
                  opacity: 0,
                  y: 3,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration:
                    0.3,
                }}
                className="
                  block
                  max-w-[190px]
                  truncate
                  text-[17px]
                  font-bold
                  leading-tight
                  tracking-[-0.02em]
                  text-white
                  sm:max-w-none
                  sm:text-xl
                "
                style={{
                  fontFamily:
                    lang ===
                    "si"
                      ? sinhalaFont
                      : englishFont,
                  fontWeight:
                    lang ===
                    "si"
                      ? 700
                      : 800,
                }}
              >
                {lang ===
                "si"
                  ? "සොබා සේනාංකය"
                  : "Soba Senankaya"}
              </motion.span>

              <Sparkles
                size={13}
                className="
                  hidden
                  shrink-0
                  text-emerald-300/75
                  sm:block
                "
              />
            </div>

            <motion.span
              key={`tag-${lang}`}
              initial={{
                opacity: 0,
                y: 2,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration:
                  0.3,
              }}
              className="
                hidden
                truncate
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.19em]
                text-emerald-300/55
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
        </button>

        {/* =================================================
            DESKTOP NAV
        ================================================== */}

        <nav className="hidden items-center gap-0.5 xl:flex">
          {mainNavigation.map(
            (
              item
            ) => (
              <button
                key={
                  item.id
                }
                type="button"
                onClick={() =>
                  scrollToSection(
                    item.id
                  )
                }
                className="
                  relative
                  rounded-xl
                  px-3
                  py-2
                  text-[12px]
                  font-semibold
                  text-white/62
                  transition-all
                  duration-300
                  hover:bg-white/[0.055]
                  hover:text-emerald-300
                "
                style={{
                  fontFamily:
                    lang ===
                    "si"
                      ? sinhalaFont
                      : englishFont,
                }}
              >
                {lang ===
                "si"
                  ? item.si
                  : item.en}
              </button>
            )
          )}

          {/* =================================================
              EXPLORE
          ================================================== */}

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
                font-semibold
                text-white/62
                transition-all
                duration-300
                hover:bg-white/[0.055]
                hover:text-emerald-300
              "
              style={{
                fontFamily:
                  lang ===
                  "si"
                    ? sinhalaFont
                    : englishFont,
              }}
            >
              {lang ===
              "si"
                ? "තවත්"
                : "Explore"}

              <motion.span
                animate={{
                  rotate:
                    isExploreOpen
                      ? 180
                      : 0,
                }}
              >
                <ChevronDown
                  size={
                    13
                  }
                />
              </motion.span>
            </button>

            <AnimatePresence>
              {isExploreOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
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
                      0.22,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    right-0
                    top-[calc(100%+10px)]
                    w-[270px]
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-white/10
                    bg-[#07140e]/98
                    p-2
                    shadow-[0_25px_80px_rgba(0,0,0,0.38)]
                    backdrop-blur-2xl
                  "
                >
                  <div className="px-3 pb-2 pt-2">
                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.22em]
                        text-emerald-300/50
                      "
                    >
                      {lang ===
                      "si"
                        ? "වේගවත් ප්‍රවේශය"
                        : "Quick Access"}
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
                          <motion.button
                            key={
                              item.id
                            }
                            type="button"
                            whileHover={{
                              x: 2,
                            }}
                            onClick={() =>
                              scrollToSection(
                                item.id
                              )
                            }
                            className="
                              group
                              flex
                              w-full
                              items-center
                              gap-3
                              rounded-2xl
                              px-3
                              py-3
                              text-left
                              transition
                              hover:bg-emerald-400/[0.07]
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
                              <span
                                className="
                                  block
                                  truncate
                                  text-[13px]
                                  font-semibold
                                  text-white/82
                                "
                                style={{
                                  fontFamily:
                                    lang ===
                                    "si"
                                      ? sinhalaFont
                                      : englishFont,
                                }}
                              >
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
                          </motion.button>
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
                font-bold
                text-white/78
                transition
                hover:border-emerald-300/20
                hover:bg-white/[0.07]
              "
              style={{
                fontFamily:
                  lang ===
                  "si"
                    ? sinhalaFont
                    : englishFont,
              }}
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
                className={`text-white/40 transition-transform duration-300 ${
                  isLanguageOpen
                    ? "rotate-180"
                    : ""
                }`}
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
                    w-[200px]
                    overflow-hidden
                    rounded-[22px]
                    border
                    border-white/10
                    bg-[#07140e]/98
                    p-2
                    shadow-[0_25px_70px_rgba(0,0,0,0.35)]
                    backdrop-blur-2xl
                  "
                >
                  <div className="px-3 pb-2 pt-2">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-300/50">
                      {lang ===
                      "si"
                        ? "භාෂාව"
                        : "Language"}
                    </p>
                  </div>

                  {/* Sinhala */}
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
                          ? "bg-emerald-400/[0.09]"
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
                        font-bold
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
                          text-[13px]
                          ${
                            lang ===
                            "si"
                              ? "font-bold text-white"
                              : "font-semibold text-white/60"
                          }
                        `}
                        style={{
                          fontFamily:
                            sinhalaFont,
                        }}
                      >
                        සිංහල
                      </span>

                      <span className="text-[10px] text-white/30">
                        Sinhala
                      </span>
                    </span>

                    {lang ===
                      "si" && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                    )}
                  </button>

                  {/* English */}
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
                          ? "bg-emerald-400/[0.09]"
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
                          text-[13px]
                          ${
                            lang ===
                            "en"
                              ? "font-bold text-white"
                              : "font-semibold text-white/60"
                          }
                        `}
                        style={{
                          fontFamily:
                            englishFont,
                        }}
                      >
                        English
                      </span>

                      <span className="text-[10px] text-white/30">
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
              text-white/60
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
                  rotate:
                    90,
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
              duration: 0.3,
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
              {/* Home */}
              <button
                type="button"
                onClick={
                  handleHome
                }
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-2xl
                  px-4
                  py-3.5
                  text-left
                  text-white
                  transition
                  hover:bg-white/[0.05]
                "
                style={{
                  fontFamily:
                    lang ===
                    "si"
                      ? sinhalaFont
                      : englishFont,
                }}
              >
                <span className="text-[15px] font-bold">
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
              </button>

              {/* Main navigation */}
              <div className="mt-2 space-y-1">
                {mainNavigation.map(
                  (
                    item,
                    index
                  ) => (
                    <button
                      key={
                        item.id
                      }
                      type="button"
                      onClick={() =>
                        scrollToSection(
                          item.id
                        )
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-2xl
                        px-4
                        py-3.5
                        text-left
                        transition
                        hover:bg-white/[0.05]
                      "
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-emerald-300/35">
                          {String(
                            index +
                              1
                          ).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span
                          className="text-[15px] font-semibold text-white/80"
                          style={{
                            fontFamily:
                              lang ===
                              "si"
                                ? sinhalaFont
                                : englishFont,
                          }}
                        >
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
                    </button>
                  )
                )}
              </div>

              {/* Explore */}
              <div className="mt-3 border-t border-white/[0.06] pt-3">
                <p
                  className="
                    px-4
                    pb-2
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-emerald-300/45
                  "
                >
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
                        <button
                          key={
                            item.id
                          }
                          type="button"
                          onClick={() =>
                            scrollToSection(
                              item.id
                            )
                          }
                          className="
                            group
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-2xl
                            px-4
                            py-3.5
                            text-left
                            transition
                            hover:bg-emerald-400/[0.06]
                          "
                        >
                          <span className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-emerald-400/[0.07]
                            text-emerald-300
                          ">
                            <Icon
                              size={
                                17
                              }
                            />
                          </span>

                          <span
                            className="
                              flex-1
                              text-[14px]
                              font-semibold
                              text-white/75
                            "
                            style={{
                              fontFamily:
                                lang ===
                                "si"
                                  ? sinhalaFont
                                  : englishFont,
                            }}
                          >
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
                        </button>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Controls */}
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
                      transition
                      ${
                        lang ===
                        "si"
                          ? "bg-emerald-400 font-bold text-emerald-950 shadow-[0_6px_20px_rgba(52,211,153,0.15)]"
                          : "font-semibold text-white/45"
                      }
                    `}
                    style={{
                      fontFamily:
                        sinhalaFont,
                    }}
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
                      transition
                      ${
                        lang ===
                        "en"
                          ? "bg-emerald-400 font-bold text-emerald-950 shadow-[0_6px_20px_rgba(52,211,153,0.15)]"
                          : "font-semibold text-white/45"
                      }
                    `}
                    style={{
                      fontFamily:
                        englishFont,
                    }}
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
                  aria-label={
                    lang ===
                    "si"
                      ? "තේමාව වෙනස් කරන්න"
                      : "Toggle theme"
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

              {/* CTA */}
              <button
                type="button"
                onClick={() =>
                  scrollToSection(
                    "membership"
                  )
                }
                className="
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-emerald-400
                  px-5
                  py-3.5
                  text-sm
                  font-bold
                  text-emerald-950
                  shadow-[0_12px_40px_rgba(52,211,153,0.14)]
                  transition
                  hover:bg-emerald-300
                  active:scale-[0.98]
                "
                style={{
                  fontFamily:
                    lang ===
                    "si"
                      ? sinhalaFont
                      : englishFont,
                }}
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
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
                  }
