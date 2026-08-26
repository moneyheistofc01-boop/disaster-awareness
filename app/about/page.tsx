"use client";
import { useLanguage } from "../../context/LanguageContext";
import Image from "next/image";

export default function About() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl text-center space-y-8">
      <h1 className="text-4xl font-bold">{t("aboutTitle")}</h1>
      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-xl w-full">
         <Image 
            src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1000&auto=format&fit=crop" 
            alt="Beautiful Nature Landscape" 
            fill 
            className="object-cover"
          />
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
        {t("aboutDesc")}
      </p>
    </div>
  );
}
