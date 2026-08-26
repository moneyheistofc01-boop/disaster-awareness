"use client";
import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t bg-gray-50 dark:bg-gray-950 text-center py-6 mt-12">
      <p className="text-gray-600 dark:text-gray-400 font-medium">{t("footerText")}</p>
    </footer>
  );
}
