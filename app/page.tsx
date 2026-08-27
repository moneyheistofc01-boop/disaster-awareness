"use client";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Home() {
  const { t, lang } = useLanguage(); // lang එක ගත්තා සිංහල/English වෙන් කරලා අඳුරගන්න

  return (
    // Header එකයි Page එකයි අතර පරතරය අඩු කරන්න py-16 වෙනුවට pt-8 දැම්මා
    <div className="container mx-auto px-4 pt-6 pb-20 flex flex-col gap-20 md:gap-32 overflow-hidden">
      
      {/* Hero Section - Screen Fit වෙන්න min-h හදලා තියෙනවා */}
      <motion.section 
        initial="hidden" animate="visible" variants={fadeInUp}
        className="text-center space-y-6 flex flex-col justify-center items-center min-h-[55vh] md:min-h-[65vh]"
      >
        <div className="inline-block px-5 py-2 mb-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm md:text-base font-bold tracking-wide shadow-sm">
          {t("natureTitle")}
        </div>
        
        {/* Size එක අඩු කරලා, පේළි දෙකට එන්න හැදුවා */}
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-teal-400 leading-tight md:leading-[1.2] max-w-4xl mx-auto tracking-tight">
          {lang === 'si' ? (
            <>
              ස්වභාවදහම රකිමු,<br />
              ආපදාවලින් බේරෙමු
            </>
          ) : (
            t("heroTitle")
          )}
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed px-4">
          {t("heroSub")}
        </p>
      </motion.section>

      {/* Disasters Section */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          className="relative h-64 md:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=1000&auto=format&fit=crop" 
            alt="Natural Disaster" fill className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="space-y-4 md:space-y-6 px-2 md:px-0"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {t("disastersTitle")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg font-medium">
            {t("disastersDesc")}
          </p>
        </motion.div>
      </div>

      {/* El Niño Special Section (අලුතින් එකතු කළ කොටස) */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center bg-gray-50 dark:bg-gray-900/50 p-6 md:p-10 rounded-[2.5rem]">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="space-y-4 md:space-y-6 order-2 md:order-1"
        >
          <div className="inline-block px-3 py-1 rounded-md bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-bold">
            {lang === 'si' ? 'ගෝලීය කාලගුණික අවදානම' : 'Global Climate Risk'}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {lang === 'si' ? 'එල්නිනෝ (El Niño) තත්ත්වය' : 'The El Niño Phenomenon'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg font-medium">
            {lang === 'si' 
              ? 'මෑතකදී ඇතිවූ එල්නිනෝ (El Niño) දේශගුණික විපර්යාසය හේතුවෙන් ලොව පුරා කාලගුණික වෙනස්කම් රැසක් සිදුවිය. ශ්‍රී ලංකාවට ද මෙහි බලපෑමෙන් දැඩි නියං තත්ත්වයන් සහ අසාමාන්‍ය උණුසුම් කාලගුණයක් අත්විඳීමට සිදුවිය. අනාගතයේදී මෙවැනි තත්ත්වයන්ට මුහුණ දීම සඳහා පරිසරය සුරැකීම අත්‍යවශ්‍ය වේ.'
              : 'The recent El Niño climate phenomenon has caused significant weather changes globally. Sri Lanka has also experienced severe droughts and unusually hot weather due to this. Protecting the environment is essential to face such extreme conditions in the future.'}
          </p>
        </motion.div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          className="relative h-64 md:h-[400px] rounded-[2rem] overflow-hidden shadow-2xl order-1 md:order-2"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          {/* නියඟය නිරූපණය කරන ලස්සන පින්තූරයක් */}
          <Image 
            src="https://images.unsplash.com/photo-1504386106331-3e4e71712b38?q=80&w=1000&auto=format&fit=crop" 
            alt="El Nino Drought" fill className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
      </div>

      {/* Nature Section */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          className="relative h-64 md:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1000&auto=format&fit=crop" 
            alt="Nature Conservation" fill className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="space-y-4 md:space-y-6 px-2 md:px-0"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {t("natureTitle")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg font-medium">
            {t("natureDesc")}
          </p>
        </motion.div>
      </div>

    </div>
  );
}
