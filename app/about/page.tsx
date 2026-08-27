"use client";
import { useLanguage } from "../../context/LanguageContext";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Target, Eye, ShieldCheck, Leaf, HeartHandshake } from "lucide-react";

// Scroll Reveal Animation 
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function About() {
  const { t, lang } = useLanguage();

  return (
    <div className="container mx-auto px-4 pt-10 pb-24 flex flex-col gap-20 overflow-hidden select-none">
      
      {/* 1. Hero Section */}
      <motion.section 
        initial="hidden" animate="visible" variants={fadeInUp}
        className="text-center space-y-6 max-w-4xl mx-auto mt-4 md:mt-8"
      >
        <div className="inline-block px-5 py-2 mb-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm md:text-base font-bold tracking-wide shadow-sm">
          {lang === 'si' ? 'අපි ගැන දැනගන්න' : 'Get to Know Us'}
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-teal-400 leading-tight tracking-tight">
          {t("aboutTitle")}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed px-4">
          {t("aboutDesc")}
        </p>
      </motion.section>

      {/* 2. Main Premium Image */}
      <motion.div 
        initial="hidden" animate="visible" variants={fadeInUp}
        className="relative h-72 md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl max-w-5xl mx-auto w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
        <Image 
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1200&auto=format&fit=crop" 
          alt="Beautiful Nature Landscape" 
          fill 
          className="object-cover transition-transform duration-1000 hover:scale-105"
          priority
        />
        <div className="absolute bottom-6 md:bottom-10 left-6 md:left-10 z-20">
          <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
            {lang === 'si' ? 'හරිත අනාගතයක් වෙනුවෙන්...' : 'For a Greener Future...'}
          </h3>
        </div>
      </motion.div>

      {/* 3. Mission & Vision Cards (මෙහෙවර සහ දැක්ම) */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto w-full">
        {/* Mission Card */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          className="bg-gray-50 dark:bg-gray-900/50 p-8 md:p-10 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="bg-emerald-100 dark:bg-emerald-900/40 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400">
            <Target size={32} strokeWidth={2} />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            {lang === 'si' ? 'අපගේ මෙහෙවර' : 'Our Mission'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg font-medium">
            {lang === 'si' 
              ? 'ස්වභාවික ආපදා පිළිබඳව සමාජය දැනුවත් කිරීම සහ පාරිසරික සංරක්ෂණය සඳහා ජනතාව පෙළගැස්වීම හරහා ආරක්ෂිත සහ තිරසාර ජීවන රටාවක් ශ්‍රී ලංකාව තුළ ගොඩනැගීම අපගේ ප්‍රධාන මෙහෙවරයි.'
              : 'Our primary mission is to educate society about natural disasters and mobilize people towards environmental conservation, building a safe and sustainable lifestyle in Sri Lanka.'}
          </p>
        </motion.div>

        {/* Vision Card */}
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          className="bg-gray-50 dark:bg-gray-900/50 p-8 md:p-10 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="bg-teal-100 dark:bg-teal-900/40 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400">
            <Eye size={32} strokeWidth={2} />
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
            {lang === 'si' ? 'අපගේ දැක්ම' : 'Our Vision'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg font-medium">
            {lang === 'si' 
              ? 'ස්වභාවදහමට ආදරය කරන, පරිසරය ආරක්ෂා කරන, මෙන්ම හදිසි ආපදාවලදී බියෙන් තොරව නිවැරදිව ක්‍රියා කළ හැකි දැනුවත් සහ සවිබල ගැන්වූ අනාගත පරපුරක් දැකීම අපගේ දැක්මයි.'
              : 'Our vision is to see an informed and empowered future generation that loves nature, protects the environment, and can act fearlessly and correctly during emergencies.'}
          </p>
        </motion.div>
      </div>

      {/* 4. Core Values Section (අපගේ අරමුණු) */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
        className="max-w-5xl mx-auto w-full pt-10"
      >
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {lang === 'si' ? 'EcoGuard හි ප්‍රධාන අරමුණු' : 'EcoGuard Core Values'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {lang === 'si' ? 'අප වැඩසටහන ක්‍රියාත්මක වන්නේ මෙම ප්‍රධාන කුළුණු 3 මතයි.' : 'Our program operates on these 3 main pillars.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <ShieldCheck size={28} />,
              titleSi: "ආපදා කළමනාකරණය",
              titleEn: "Disaster Management",
              descSi: "හදිසි අවස්ථාවලදී ජීවිත ආරක්ෂා කරගන්නා ආකාරය පිළිබඳව නිවැරදි දැනුම ලබා දීම.",
              descEn: "Providing accurate knowledge on how to save lives during emergencies."
            },
            {
              icon: <Leaf size={28} />,
              titleSi: "පරිසර සංරක්ෂණය",
              titleEn: "Nature Conservation",
              descSi: "ප්ලාස්ටික් භාවිතය අවම කිරීම සහ ගස් සිටුවීම හරහා පරිසර පද්ධතිය රැකගැනීම.",
              descEn: "Protecting the ecosystem by minimizing plastic use and planting trees."
            },
            {
              icon: <HeartHandshake size={28} />,
              titleSi: "සමාජ වගකීම",
              titleEn: "Social Responsibility",
              descSi: "ආපදාවලින් පීඩාවට පත්වූවන්ට සහය වීම සහ ස්වභාවදහම අනාගතයට ඉතිරි කිරීම.",
              descEn: "Supporting disaster victims and preserving nature for the future."
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -10 }}
              className="flex flex-col items-center text-center p-6 rounded-3xl bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/50 dark:shadow-black/50"
            >
              <div className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white p-4 rounded-full mb-6 shadow-md">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {lang === 'si' ? item.titleSi : item.titleEn}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {lang === 'si' ? item.descSi : item.descEn}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
