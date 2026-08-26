"use client";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleLang = (newLang: "en" | "si") => {
    setLang(newLang);
    setIsLangOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter text-emerald-600 dark:text-emerald-400">
          EcoGuard<span className="text-gray-900 dark:text-white">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          <Link href="/" className="text-sm font-semibold hover:text-emerald-500 transition-colors">{t("home")}</Link>
          <Link href="/about" className="text-sm font-semibold hover:text-emerald-500 transition-colors">{t("about")}</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          {/* Custom Lang Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 text-sm font-semibold bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
            >
              {lang === "en" ? "En" : "Si"} <ChevronDown size={16} />
            </button>
            <AnimatePresence>
              {isLangOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-24 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xl overflow-hidden flex flex-col"
                >
                  <button onClick={() => toggleLang("si")} className="px-4 py-2 text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-left">Si - සිංහල</button>
                  <button onClick={() => toggleLang("en")} className="px-4 py-2 text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/30 text-left">En - English</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-gray-900 dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold">{t("home")}</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-semibold">{t("about")}</Link>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                <div className="flex gap-2">
                  <button onClick={() => setLang("si")} className={`px-4 py-2 rounded-full text-sm font-semibold ${lang === 'si' ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-900'}`}>Si</button>
                  <button onClick={() => setLang("en")} className={`px-4 py-2 rounded-full text-sm font-semibold ${lang === 'en' ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-900'}`}>En</button>
                </div>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-900"
                >
                  {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
