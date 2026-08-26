"use client";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-16 flex flex-col gap-24 overflow-hidden">
      
      {/* Hero Section */}
      <motion.section 
        initial="hidden" animate="visible" variants={fadeInUp}
        className="text-center space-y-6 pt-10"
      >
        <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-bold tracking-wide">
          {t("natureTitle")}
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-teal-400 leading-tight">
          {t("heroTitle")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
          {t("heroSub")}
        </p>
      </motion.section>

      {/* Disasters Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          className="relative h-80 md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=1000&auto=format&fit=crop" 
            alt="Natural Disaster" fill className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="space-y-6"
        >
          <h2 className="text-4xl font-extrabold tracking-tight">{t("disastersTitle")}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium">
            {t("disastersDesc")}
          </p>
        </motion.div>
      </div>

      {/* Nature Section */}
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="space-y-6 order-2 md:order-1"
        >
          <h2 className="text-4xl font-extrabold tracking-tight">{t("natureTitle")}</h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg font-medium">
            {t("natureDesc")}
          </p>
        </motion.div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeInUp}
          className="relative h-80 md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl order-1 md:order-2"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1000&auto=format&fit=crop" 
            alt="Nature Conservation" fill className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
      </div>
    </div>
  );
}
