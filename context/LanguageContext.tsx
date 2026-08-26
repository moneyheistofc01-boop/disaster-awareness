"use client";
import { createContext, useState, useContext, ReactNode } from "react";

type Language = "en" | "si";
interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    home: "Home",
    about: "About",
    heroTitle: "Protect Nature, Survive Disasters",
    heroSub: "Learn how to save our planet and stay safe during natural disasters.",
    disastersTitle: "Understanding Natural Disasters",
    disastersDesc: "Natural disasters like floods, earthquakes, and tsunamis can strike unexpectedly. Being prepared, knowing evacuation routes, and having an emergency kit can save lives.",
    natureTitle: "Love & Protect Nature",
    natureDesc: "Our planet is our only home. Planting trees, reducing plastic use, and protecting wildlife are essential steps to preserve nature for future generations.",
    aboutTitle: "About Us",
    aboutDesc: "Our mission is to educate people on natural disasters and promote environmental conservation. Together, we can build a safer and greener world.",
    footerText: "Dedicated to a safer and greener future.",
  },
  si: {
    home: "මුල් පිටුව",
    about: "අප ගැන",
    heroTitle: "ස්වභාවදහම රකිමු, ආපදාවලින් බේරෙමු",
    heroSub: "අපේ පෘථිවිය රැකගන්නා ආකාරය සහ ස්වභාවික ආපදාවලදී ආරක්ෂා වන ආකාරය ඉගෙන ගනිමු.",
    disastersTitle: "ස්වභාවික ආපදා හඳුනාගැනීම",
    disastersDesc: "ගංවතුර, භූමිකම්පා සහ සුනාමි වැනි ස්වභාවික ආපදා හදිසියේම සිදුවිය හැක. කල්තියා සූදානම් වීම, ආරක්ෂිත ස්ථාන දැනගැනීම සහ හදිසි ආපදා කට්ටලයක් ළඟ තබා ගැනීමෙන් ජීවිත බේරාගත හැක.",
    natureTitle: "ස්වභාවදහමට ආදරය කරමු",
    natureDesc: "අපේ එකම නිවස පෘථිවියයි. ගස් සිටුවීම, ප්ලාස්ටික් භාවිතය අවම කිරීම සහ වනජීවීන් ආරක්ෂා කිරීම අනාගත පරපුරට ස්වභාවදහම ඉතිරි කිරීමට අත්‍යවශ්‍ය පියවර වේ.",
    aboutTitle: "අප ගැන",
    aboutDesc: "ස්වභාවික ආපදා පිළිබඳව ජනතාව දැනුවත් කිරීම සහ පරිසර සංරක්ෂණය ප්‍රවර්ධනය කිරීම අපගේ අරමුණයි. අපි එක්ව ආරක්ෂිත සහ හරිත ලෝකයක් ගොඩනඟමු.",
    footerText: "ආරක්ෂිත සහ හරිත අනාගතයක් වෙනුවෙන්.",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("si");

  const t = (key: string) => {
    return translations[lang][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
