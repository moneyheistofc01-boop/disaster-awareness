"use client";
import { useLanguage } from "../context/LanguageContext";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

export default function Home() {
  const { t, lang } = useLanguage();

  return (
    // Space එක අඩු කරන්න pt-6 කරලා, gap එක ගානට හැදුවා
    <div className="container mx-auto px-4 pt-6 pb-20 flex flex-col gap-24 md:gap-32 overflow-hidden">
      
      {/* Hero Section - අර හිඩැස නැති වෙන්න min-h අයින් කරලා spacing හැදුවා */}
      <motion.section 
        initial="hidden" animate="visible" variants={fadeInUp}
        className="text-center space-y-6 pt-4 md:pt-10 max-w-5xl mx-auto"
      >
        <div className="inline-block px-5 py-2 mb-2 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm md:text-base font-bold tracking-wide shadow-sm">
          {t("natureTitle")}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-600 to-teal-400 leading-tight md:leading-[1.1] tracking-tight">
          {lang === 'si' ? (
            <>
              ස්වභාවදහම රකිමු,<br />
              ආපදාවලින් බේරෙමු
            </>
          ) : (
            t("heroTitle")
          )}
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed px-4 mt-6">
          {t("heroSub")}
        </p>
      </motion.section>

      {/* 1. Floods Section (ගංවතුර) */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          className="relative h-72 md:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=1000&auto=format&fit=crop" 
            alt="Floods in Sri Lanka" fill className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="space-y-4 md:space-y-6 px-2 md:px-0"
        >
          <div className="inline-block px-3 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold">
            {lang === 'si' ? 'ගංවතුර තත්ත්වයන්' : 'Flood Disasters'}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {lang === 'si' ? 'ගංවතුර (Floods)' : 'Monsoonal Floods'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg font-medium">
            {lang === 'si' 
              ? 'ශ්‍රී ලංකාවේ බහුලවම සිදුවන ස්වභාවික ආපදාව මෙයයි. නිරිතදිග සහ ඊසානදිග මෝසම් වර්ෂාවත් සමඟ කැලණි, කළු, ගිං සහ නිල්වලා යන ප්‍රධාන ගංගා පිටාර ගැලීමෙන් පහත්බිම් රැසක් ජලයෙන් යටවේ. නිසි ජල අපවහන ක්‍රම සහ පාරිසරික සංරක්ෂණය මගින් මෙහි හානිය අවම කරගත හැක.'
              : 'Floods are the most common natural disaster in Sri Lanka. Heavy monsoonal rains cause major rivers like Kelani, Kalu, Gin, and Nilwala to overflow, inundating low-lying areas. Proper drainage and environmental conservation can minimize this damage.'}
          </p>
        </motion.div>
      </div>

      {/* 2. Landslides Section (නායයාම්) */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="space-y-4 md:space-y-6 px-2 md:px-0 order-2 md:order-1"
        >
          <div className="inline-block px-3 py-1 rounded-md bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-bold">
            {lang === 'si' ? 'කඳුකර අවදානම' : 'Highland Risk'}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {lang === 'si' ? 'නායයාම් (Landslides)' : 'Landslides & Mudslides'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg font-medium">
            {lang === 'si' 
              ? 'කෑගල්ල, රත්නපුර, කළුතර, සහ නුවරඑළිය වැනි කඳුකර දිස්ත්‍රික්ක නායයාම් අවදානමට දැඩිව මුහුණ දෙයි. අවිධිමත් ලෙස කඳු කැපීම, වන විනාශය සහ අධික වර්ෂාව මීට ප්‍රධාන හේතු වේ. රතු නිවේදන නිකුත් කළ වහාම ආරක්ෂිත ස්ථාන කරා යාම ජීවිත බේරාගැනීමට අත්‍යවශ්‍ය වේ.'
              : 'Mountainous districts like Kegalle, Ratnapura, and Nuwara Eliya face severe landslide risks. Unplanned excavation, deforestation, and heavy rains are the main causes. Moving to safe locations immediately after red alerts is crucial for saving lives.'}
          </p>
        </motion.div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          className="relative h-72 md:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl order-1 md:order-2"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1000&auto=format&fit=crop" 
            alt="Landslide Disaster" fill className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
      </div>

      {/* 3. Tsunami Section (සුනාමි) */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          className="relative h-72 md:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?q=80&w=1000&auto=format&fit=crop" 
            alt="Tsunami Ocean Waves" fill className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="space-y-4 md:space-y-6 px-2 md:px-0"
        >
          <div className="inline-block px-3 py-1 rounded-md bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-sm font-bold">
            {lang === 'si' ? 'සාගරික ඛේදවාචක' : 'Oceanic Tragedies'}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {lang === 'si' ? 'සුනාමි ඛේදවාචකය (Tsunami)' : 'The Tsunami Threat'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg font-medium">
            {lang === 'si' 
              ? '2004 වසරේ ශ්‍රී ලංකාවේ වෙරළබඩ කලාපයට දැඩි විනාශයක් ගෙන ආ සුනාමිය, මුහුදු පතුලේ සිදුවන භූමිකම්පා නිසා ඇතිවන දැවැන්ත රළ පහරකි. වර්තමානය වන විට ශ්‍රී ලංකාවට නවීන සුනාමි පූර්ව අනතුරු ඇඟවීමේ පද්ධති ස්ථාපිත කර ඇති බැවින්, දැනුවත් වී සිටීම වැදගත්ය.'
              : 'The 2004 Tsunami brought immense destruction to Sri Lanka\'s coastal regions. Triggered by underwater earthquakes, these giant waves are highly destructive. Today, with modern early warning systems in place, staying informed is the key to safety.'}
          </p>
        </motion.div>
      </div>

      {/* 4. El Niño Section (එල්නිනෝ සහ නියඟය) - Special Highlighted Box */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center bg-gray-50 dark:bg-gray-900/50 p-6 md:p-10 rounded-[2.5rem]">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
          className="space-y-4 md:space-y-6 order-2 md:order-1"
        >
          <div className="inline-block px-3 py-1 rounded-md bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-bold">
            {lang === 'si' ? 'ගෝලීය කාලගුණික අවදානම' : 'Global Climate Risk'}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {lang === 'si' ? 'එල්නිනෝ (El Niño) සහ නියඟය' : 'El Niño & Severe Droughts'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg font-medium">
            {lang === 'si' 
              ? 'එල්නිනෝ යනු පැසිෆික් සාගරයේ ජලය අසාමාන්‍ය ලෙස උණුසුම් වීම නිසා ලොව පුරා කාලගුණය වෙනස් කරන තත්ත්වයකි. මෑතකදී මෙහි බලපෑමෙන් ශ්‍රී ලංකාවට දැඩි නියං තත්ත්වයන් සහ අධික උණුසුමක් අත්විඳීමට සිදුවිය. කෘෂිකර්මාන්තයට සහ ජල සැපයුමට මෙය දැඩි තර්ජනයකි.'
              : 'El Niño is a climate pattern causing unusual warming of the Pacific Ocean, severely disrupting global weather. Recently, Sri Lanka faced extreme droughts and heatwaves due to this. It poses a massive threat to agriculture and drinking water supplies.'}
          </p>
        </motion.div>
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          className="relative h-72 md:h-[400px] rounded-[2rem] overflow-hidden shadow-2xl order-1 md:order-2"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <Image 
            src="https://images.unsplash.com/photo-1504386106331-3e4e71712b38?q=80&w=1000&auto=format&fit=crop" 
            alt="El Nino Drought" fill className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </motion.div>
      </div>

      {/* 5. Nature Protection (ස්වභාවදහම ආරක්ෂා කිරීම) */}
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}
          className="relative h-72 md:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl"
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
          <div className="inline-block px-3 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-bold">
            {lang === 'si' ? 'අපේ වගකීම' : 'Our Responsibility'}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {t("natureTitle")}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-base md:text-lg font-medium">
            {lang === 'si'
              ? 'ගස් සිටුවීම, ප්ලාස්ටික් භාවිතය අවම කිරීම සහ වන ජීවීන් ආරක්ෂා කිරීම අනාගත පරපුරට ස්වභාවදහම ඉතිරි කිරීමට අත්‍යවශ්‍ය වේ. ස්වභාවික ආපදාවලින් බේරීමට නම් අප පළමුව පරිසරය ආරක්ෂා කළ යුතුය.'
              : t("natureDesc")}
          </p>
        </motion.div>
      </div>

    </div>
  );
}
