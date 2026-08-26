"use client";
import { useLanguage } from "../context/LanguageContext";
import { Leaf } from "lucide-react";

export default function Footer() {
  const { lang, t } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-gray-200/50 dark:border-gray-800/50 bg-gray-50/50 dark:bg-gray-950/50 py-12 mt-20">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 mb-2">
          <Leaf size={24} />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">EcoGuard</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm font-medium text-center max-w-md">
          {t("footerText")}
        </p>
        <div className="pt-6 mt-6 border-t border-gray-200 dark:border-gray-800 w-full text-center">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            &copy; {currentYear} EcoGuard. {lang === 'si' ? 'සියලුම හිමිකම් ඇවිරිණි.' : 'All Rights Reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
