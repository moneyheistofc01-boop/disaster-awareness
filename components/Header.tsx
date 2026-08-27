"use client";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, ChevronDown, Leaf } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme(); 
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  // Background Click & Scroll Event Listeners (Fixed)
  useEffect(() => {
    let startScrollY = window.scrollY; // Menu එක open කරද්දි page එක තියෙන තැන සටහන් කරගන්නවා

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
        setIsLangOpen(false);
      }
    };

    const handleScroll = () => {
      // පොඩි micro-scrolls වලට close වෙන්නේ නැති වෙන්න 50px limit එකක් දැම්මා
      if (Math.abs(window.scrollY - startScrollY) > 50) {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        if (isLangOpen) setIsLangOpen(false);
      }
    };

    if (isMobileMenuOpen || isLangOpen) {
      startScrollY = window.scrollY; // Open කරන මොහොතේ scroll තැන අප්ඩේට් කරනවා
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobileMenuOpen, isLangOpen]);

  const toggleLang = (newLang: "en" | "si") => {
    setLang(newLang);
    setIsLangOpen(false);
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header 
      ref={headerRef} 
      className="sticky top-0 z-50 w-full border-b border-gray-200/40 dark:border-gray-800/40 bg-white/70 dark:bg-gray-950/70 backdrop-blur-2xl transition-all duration-300"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 group">
          <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
            <Leaf size={22} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
            EcoGuard
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            {t("home")}
          </Link>
          <Link href="/about" className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors">
            {t("about")}
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-5">
          {/* Custom Lang Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1.5 text-sm font-semibold bg-gray-100/80 dark:bg-gray-900/80 px-4 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all active:scale-95"
            >
              <span className="text-emerald-600 dark:text-emerald-400">{lang === "en" ? "EN" : "SI"}</span> 
              <ChevronDown size={14} className={`transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.1, ease: "easeOut" }} // Super fast
                  className="absolute right-0 mt-3 w-32 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-50"
                >
                  <button onClick={() => toggleLang("si")} className={`px-4 py-3 text-sm font-bold text-left transition-colors ${lang === 'si' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>සිංහල (Si)</button>
                  <button onClick={() => toggleLang("en")} className={`px-4 py-3 text-sm font-bold text-left transition-colors ${lang === 'en' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}>English (En)</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle Button (Instant Animation) */}
          <button
            onClick={toggleTheme}
            className="relative p-2.5 rounded-full bg-gray-100/80 dark:bg-gray-900/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-all active:scale-90 overflow-hidden"
            aria-label="Toggle Dark Mode"
          >
            {mounted ? (
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={resolvedTheme} 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="w-[18px] h-[18px]" />
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-gray-900 dark:text-white active:scale-90 transition-transform"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeInOut" }} // Smooth & Super fast
            className="md:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-emerald-500 transition-colors">{t("home")}</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-gray-800 dark:text-gray-200 hover:text-emerald-500 transition-colors">{t("about")}</Link>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800/60">
                <div className="flex gap-3 bg-gray-100 dark:bg-gray-900 p-1 rounded-full">
                  <button onClick={() => setLang("si")} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${lang === 'si' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-400'}`}>Si</button>
                  <button onClick={() => setLang("en")} className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${lang === 'en' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-600 dark:text-gray-400'}`}>En</button>
                </div>
                
                <button
                  onClick={toggleTheme}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-900 active:scale-90 transition-transform"
                >
                  {mounted && resolvedTheme === "dark" ? <Sun size={22} className="text-amber-500" /> : <Moon size={22} className="text-indigo-500" />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
