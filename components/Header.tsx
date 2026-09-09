"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const { setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Close menus when clicking outside */
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
        setIsLangOpen(false);
      }
    };

    if (isMobileMenuOpen || isLangOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isMobileMenuOpen, isLangOpen]);

  /* Close mobile menu after meaningful scroll */
  useEffect(() => {
    if (!isMobileMenuOpen && !isLangOpen) return;

    const startScrollY = window.scrollY;

    const handleScroll = () => {
      if (Math.abs(window.scrollY - startScrollY) > 50) {
        setIsMobileMenuOpen(false);
        setIsLangOpen(false);
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }, 250);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen, isLangOpen]);

  /* Prevent body scrolling while mobile menu is open */
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const changeLanguage = (newLang: "si" | "en") => {
    setLang(newLang);
    setIsLangOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsLangOpen(false);
  };

  const navigation = [
    {
      href: "/",
      label: lang === "si" ? "මුල් පිටුව" : "Home",
    },
    {
      href: "#about",
      label: lang === "si" ? "හැඳින්වීම" : "Introduction",
    },
    {
      href: "#vision",
      label: lang === "si" ? "දැක්ම" : "Vision",
    },
    {
      href: "#mission",
      label: lang === "si" ? "මෙහෙවර" : "Mission",
    },
    {
      href: "#objectives",
      label: lang === "si" ? "අරමුණු" : "Objectives",
    },
    {
      href: "#action",
      label: lang === "si" ? "ක්‍රියාකාරීත්වය" : "Activities",
    },
    {
      href: "#membership",
      label: lang === "si" ? "සාමාජිකත්වය" : "Membership",
    },
    {
      href: "#message",
      label:
        lang === "si"
          ? "ස්වභාවධර්මයේ පණිවිඩය"
          : "Message of Nature",
    },
    {
      href: "#comments",
      label:
        lang === "si"
          ? "අදහස් හා යෝජනා"
          : "Ideas & Suggestions",
    },
  ];

  return (
    <header
      ref={headerRef}
      className="
        sticky top-0 z-[100]
        w-full
        border-b border-slate-200/60
        bg-white/85
        backdrop-blur-2xl
        dark:border-white/10
        dark:bg-[#050c09]/85
      "
    >
      <div
        className="
          mx-auto
          flex
          h-[68px]
          w-full
          max-w-7xl
          items-center
          justify-between
          gap-3
          px-4
          sm:px-6
          md:h-[76px]
          lg:px-8
        "
      >
        {/* ================= LOGO ================= */}

        <Link
          href="/"
          onClick={closeMobileMenu}
          className="
            flex
            min-w-0
            shrink
            items-center
            gap-2.5
            sm:gap-3
          "
        >
          <div
            className="
              relative
              h-11
              w-11
              shrink-0
              overflow-hidden
              rounded-full
              border
              border-emerald-500/30
              bg-white
              shadow-md
              sm:h-12
              sm:w-12
            "
          >
            <img
              src="/logo.png"
              alt="සොබා සේනාංකය"
              className="
                h-full
                w-full
                object-contain
              "
            />
          </div>

          <div className="min-w-0">
            <span
              className="
                block
                truncate
                text-[17px]
                font-black
                tracking-tight
                text-slate-900
                dark:text-white
                sm:text-xl
                md:text-2xl
              "
            >
              සොබා සේනාංකය
            </span>

            <span
              className="
                hidden
                truncate
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-emerald-600
                dark:text-emerald-400
                sm:block
                md:text-[9px]
              "
            >
              NATURE • HUMANITY • RESPONSIBILITY
            </span>
          </div>
        </Link>

        {/* ================= DESKTOP NAV ================= */}

        <nav className="hidden items-center gap-5 lg:flex xl:gap-7">
          {navigation.slice(0, 7).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
                whitespace-nowrap
                text-[13px]
                font-semibold
                text-slate-600
                transition-colors
                hover:text-emerald-600
                dark:text-slate-300
                dark:hover:text-emerald-400
              "
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ================= DESKTOP CONTROLS ================= */}

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          {/* Language */}

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setIsLangOpen(!isLangOpen);
                setIsMobileMenuOpen(false);
              }}
              className="
                flex
                items-center
                gap-1.5
                rounded-full
                bg-slate-100
                px-3.5
                py-2
                text-xs
                font-bold
                transition
                hover:bg-slate-200
                active:scale-95
                dark:bg-white/10
                dark:hover:bg-white/15
              "
            >
              <span className="text-emerald-600 dark:text-emerald-400">
                {lang === "en" ? "EN" : "SI"}
              </span>

              <ChevronDown
                size={14}
                className={`
                  transition-transform
                  ${isLangOpen ? "rotate-180" : ""}
                `}
              />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                  }}
                  className="
                    absolute
                    right-0
                    top-full
                    mt-3
                    w-32
                    overflow-hidden
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    shadow-2xl
                    dark:border-white/10
                    dark:bg-slate-900
                  "
                >
                  <button
                    type="button"
                    onClick={() => changeLanguage("si")}
                    className={`
                      w-full
                      px-4
                      py-3
                      text-left
                      text-sm
                      font-bold
                      transition
                      ${
                        lang === "si"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "hover:bg-slate-50 dark:hover:bg-white/5"
                      }
                    `}
                  >
                    සිංහල
                  </button>

                  <button
                    type="button"
                    onClick={() => changeLanguage("en")}
                    className={`
                      w-full
                      px-4
                      py-3
                      text-left
                      text-sm
                      font-bold
                      transition
                      ${
                        lang === "en"
                          ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "hover:bg-slate-50 dark:hover:bg-white/5"
                      }
                    `}
                  >
                    English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme */}

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-slate-100
              text-slate-600
              transition
              hover:bg-slate-200
              active:scale-90
              dark:bg-white/10
              dark:text-slate-300
              dark:hover:bg-white/15
            "
          >
            {mounted ? (
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                <motion.div
                  key={resolvedTheme}
                  initial={{
                    opacity: 0,
                    rotate: -45,
                    scale: 0.7,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 45,
                    scale: 0.7,
                  }}
                >
                  {resolvedTheme === "dark" ? (
                    <Sun size={17} />
                  ) : (
                    <Moon size={17} />
                  )}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="h-[17px] w-[17px]" />
            )}
          </button>
        </div>

        {/* ================= MOBILE BUTTON ================= */}

        <button
          type="button"
          aria-label={
            isMobileMenuOpen
              ? "Close menu"
              : "Open menu"
          }
          onClick={() => {
            setIsMobileMenuOpen(!isMobileMenuOpen);
            setIsLangOpen(false);
          }}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            text-slate-900
            transition
            active:scale-90
            md:hidden
            dark:text-white
          "
        >
          {isMobileMenuOpen ? (
            <X size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}

      <AnimatePresence>
        {isMobileMenuOpen && (
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
              duration: 0.2,
              ease: "easeOut",
            }}
            className="
              max-h-[calc(100vh-68px)]
              overflow-y-auto
              border-t
              border-slate-200/70
              bg-white
              md:hidden
              dark:border-white/10
              dark:bg-[#07110d]
            "
          >
            <div className="px-5 pb-7 pt-4">
              <nav className="flex flex-col">
                {navigation.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobileMenu}
                    className="
                      flex
                      items-center
                      justify-between
                      border-b
                      border-slate-100
                      py-4
                      text-[16px]
                      font-bold
                      text-slate-800
                      transition-colors
                      hover:text-emerald-600
                      dark:border-white/5
                      dark:text-slate-200
                      dark:hover:text-emerald-400
                    "
                  >
                    <span>
                      {item.label}
                    </span>

                    <span
                      className="
                        text-xs
                        font-bold
                        text-slate-300
                        dark:text-slate-600
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                ))}
              </nav>

              {/* Mobile Controls */}

              <div
                className="
                  mt-5
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-2xl
                  bg-slate-50
                  p-3
                  dark:bg-white/[0.04]
                "
              >
                {/* Language */}

                <div
                  className="
                    flex
                    items-center
                    gap-1
                    rounded-full
                    bg-white
                    p-1
                    shadow-sm
                    dark:bg-slate-900
                  "
                >
                  <button
                    type="button"
                    onClick={() => setLang("si")}
                    className={`
                      rounded-full
                      px-4
                      py-2
                      text-xs
                      font-bold
                      transition
                      ${
                        lang === "si"
                          ? "bg-emerald-500 text-white shadow"
                          : "text-slate-500 dark:text-slate-400"
                      }
                    `}
                  >
                    සිං
                  </button>

                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    className={`
                      rounded-full
                      px-4
                      py-2
                      text-xs
                      font-bold
                      transition
                      ${
                        lang === "en"
                          ? "bg-emerald-500 text-white shadow"
                          : "text-slate-500 dark:text-slate-400"
                      }
                    `}
                  >
                    EN
                  </button>
                </div>

                {/* Theme */}

                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-sm
                    active:scale-90
                    dark:bg-slate-900
                  "
                >
                  {mounted &&
                  resolvedTheme === "dark" ? (
                    <Sun
                      size={20}
                      className="text-amber-500"
                    />
                  ) : (
                    <Moon
                      size={20}
                      className="text-indigo-500"
                    />
                  )}
                </button>
              </div>

              {/* Join Button */}

              <Link
                href="#membership"
                onClick={closeMobileMenu}
                className="
                  mt-4
                  block
                  rounded-2xl
                  bg-emerald-600
                  px-5
                  py-3.5
                  text-center
                  text-sm
                  font-black
                  text-white
                  shadow-lg
                  shadow-emerald-600/20
                  transition
                  active:scale-[0.98]
                "
              >
                {lang === "si"
                  ? "සොබා ආරක්ෂකයෙක් වන්න"
                  : "Become a Guardian"}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
            }
