"use client";
import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-green-600 dark:text-green-400">
          EcoGuard
        </Link>
        
        <nav className="flex gap-6 items-center">
          <Link href="/" className="hover:text-green-500 transition-colors font-medium">{t("home")}</Link>
          <Link href="/about" className="hover:text-green-500 transition-colors font-medium">{t("about")}</Link>
        </nav>

        <div className="flex items-center gap-4">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value as "en" | "si")}
            className="bg-transparent border rounded p-1 dark:border-gray-700 outline-none cursor-pointer font-medium"
          >
            <option value="si">සිංහල</option>
            <option value="en">English</option>
          </select>

          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
