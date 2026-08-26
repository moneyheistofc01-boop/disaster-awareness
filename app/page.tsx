"use client";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col gap-16">
      <section className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600">
          {t("heroTitle")}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {t("heroSub")}
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl">
          <Image 
            src="https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=1000&auto=format&fit=crop" 
            alt="Natural Disaster" 
            fill 
            className="object-cover"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">{t("disastersTitle")}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            {t("disastersDesc")}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4 order-2 md:order-1">
          <h2 className="text-3xl font-bold">{t("natureTitle")}</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
            {t("natureDesc")}
          </p>
        </div>
        <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-xl order-1 md:order-2">
          <Image 
            src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1000&auto=format&fit=crop" 
            alt="Nature Conservation" 
            fill 
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
