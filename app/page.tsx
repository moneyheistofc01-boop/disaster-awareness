"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import {
  ChevronDown,
  CheckCircle2,
  Leaf,
  Users,
  Target,
  ShieldCheck,
  HeartHandshake,
  Sprout,
  Scale,
  TreePine,
  MessageCircle,
  Globe2,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

import LatestAnnouncements from "../components/LatestAnnouncements";

type LangText = {
  si: string;
  en: string;
};

const text = (value: LangText, lang: "si" | "en") =>
  lang === "si" ? value.si : value.en;

const sections = {
  vision: {
    title: {
      si: "දැක්ම",
      en: "Vision",
    },
    icon: TreePine,
    content: {
      si: "ස්වභාවධර්මය පිළිබඳ මනුෂ්‍යත්වයේ වගකීම හා වගවීම පිළිබඳ අවබෝධය ඇති කර, ස්වයං විනය, ආචාර ධර්ම, කරුණාව, සහජීවනය හා සමාජ වගකීමෙන් යුතු පරමාදර්ශී ශ්‍රී ලාංකීය සමාජයක් බිහි කිරීම.",
      en: "To create an ideal Sri Lankan society built on self-discipline, ethics, compassion, coexistence and social responsibility by strengthening humanity's awareness of its responsibility and accountability towards nature.",
    },
  },

  mission: {
    title: {
      si: "මෙහෙවර",
      en: "Mission",
    },
    icon: ShieldCheck,
    content: {
      si: "ස්වභාවධර්මය වෙත පුද්ගල වගකීම හා වගවීම ශක්තිමත් කරමින්, ස්වයං විනයගරුක පුරවැසියන්ගෙන් සමන්විත සමාජයක් ගොඩනැගීම සහ ශ්‍රී ලංකාවේ ස්වභාවික පරිසරයේ සමතුලිතතාව හා ආරක්ෂාව වෙනුවෙන් දායක විය හැකි සමාජ බලයක් සංවිධානය කිරීම.",
      en: "To strengthen individual responsibility and accountability towards nature, build a society of self-disciplined citizens, and organize social power that can contribute to the balance, protection and wellbeing of Sri Lanka's natural environment.",
    },
  },

  objective: {
    title: {
      si: "අරමුණු",
      en: "Objectives",
    },
    icon: Target,
    content: {
      si: "ස්වභාවධර්මය සම්බන්ධයෙන් මනුෂ්‍යත්වයේ වගකීම හා වගවීම පිළිබඳ ජනතාව දැනුවත් කිරීම, සමාජ සංවාද ඇති කිරීම, ස්වයං විනය ගොඩනැගීම, ස්වභාවික සමතුලිතතාව වෙනුවෙන් සමාජ වගකීමක් ඇති ප්‍රජාවක් බලගැන්වීම සහ ස්වභාවික ආපදා ඇතිවීමට බලපාන හේතු අවම කිරීම.",
      en: "To educate people about humanity's responsibility towards nature, encourage broad social dialogue, establish personal discipline, empower a socially responsible community for natural balance, and minimize causes that contribute to natural disasters.",
    },
  },
};

const objectives = [
  {
    si: "සියලු ශ්‍රී ලාංකිකයන් ස්වභාවධර්මය වෙත මනුෂ්‍යත්වයේ වගකීම හා වගවීම පිළිබඳ දැනුවත් කිරීම.",
    en: "Educate all Sri Lankans about humanity's responsibility and accountability towards nature.",
  },
  {
    si: "ස්වභාවධර්මය පිළිබඳ පුළුල් සමාජ සංවාදයක් සඳහා පසුබිම සකස් කිරීම.",
    en: "Create a background for broad social dialogue about nature.",
  },
  {
    si: "ස්වභාවධර්මය ආරක්ෂා කිරීම සඳහා අවශ්‍ය පුද්ගල ආචාර ධර්ම සහ ස්වයං විනය ස්ථාපිත කිරීම.",
    en: "Identify personal ethics needed to protect nature and establish self-discipline.",
  },
  {
    si: "ස්වභාවික සමතුලිතතාව ආරක්ෂා කිරීම සඳහා සමාජ වගකීමෙන් යුතු ප්‍රජාවක් බලගැන්වීම.",
    en: "Empower a socially responsible community to protect natural balance.",
  },
  {
    si: "ස්වභාවික ආපදා ඇතිවීමට බලපාන හේතු අවම කර ආරක්ෂිත රටක් වෙනුවෙන් දායක වීම.",
    en: "Minimize causes of natural disasters and contribute towards a safer country.",
  },
];

const membershipPoints = [
  {
    si: "ජාතිය, ආගම, පන්තිය, කුලය, භාෂාව හෝ දේශපාලන බෙදීම් නොසලකා සෑම ශ්‍රී ලාංකිකයෙකුටම එක්විය හැක.",
    en: "Every Sri Lankan can participate regardless of race, religion, class, caste, language or political divisions.",
  },
  {
    si: "සොබා සේනාංකයේ අරමුණු හා මූලධර්ම පිළිගැනීම අවශ්‍ය වේ.",
    en: "Members should accept the aims and principles of Soba Senankaya.",
  },
  {
    si: "ස්වභාවධර්මය වෙනුවෙන් වගකීමෙන් හා ස්වයං විනයෙන් ක්‍රියා කිරීමට සූදානම් විය යුතුය.",
    en: "Members should be willing to act responsibly and with self-discipline for nature.",
  },
];

const ethics = [
  {
    si: "මම ස්වභාවධර්මයට හානි නොකරමි.",
    en: "I will not harm nature.",
  },
  {
    si: "ස්වභාවධර්මයට හානි කරන ක්‍රියාවන්ට අනුබල නොදෙමි.",
    en: "I will not support actions that harm nature.",
  },
  {
    si: "ස්වභාවධර්මය ආරක්ෂා කිරීම සඳහා මට කළ හැකි උපරිම දේ කරමි.",
    en: "I will do my utmost to protect nature.",
  },
  {
    si: "අන් අයද ඒ සඳහා දිරිමත් කරමි.",
    en: "I will encourage others to do the same.",
  },
  {
    si: "මගේ ක්‍රියාවන් තුළින් ස්වභාවධර්මයේ සමතුලිතතාවයට ගරු කරමි.",
    en: "I will respect the balance of nature through my actions.",
  },
];

function ExpandCard({
  id,
  title,
  icon: Icon,
  content,
  open,
  onClick,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  content: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div
      id={id}
      className="overflow-hidden rounded-2xl border border-gray-200/70 bg-white shadow-sm transition-all dark:border-gray-800 dark:bg-gray-900"
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <Icon size={20} />
          </div>

          <span className="break-words text-base font-bold text-gray-900 dark:text-white sm:text-lg">
            {title}
          </span>
        </div>

        <ChevronDown
          size={20}
          className={`shrink-0 text-gray-500 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="border-t border-gray-100 px-4 pb-5 pt-4 text-sm leading-7 text-gray-600 dark:border-gray-800 dark:text-gray-300 sm:px-5 sm:text-base">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function HomePage() {
  const { lang } = useLanguage();

  const [openFolder, setOpenFolder] = useState<string | null>("vision");

  const toggleFolder = (id: string) => {
    setOpenFolder((current) => (current === id ? null : id));
  };

  return (
    <main className="w-full overflow-x-hidden bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* HERO / LOGO */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1800&q=85')",
          }}
        />

        <div className="absolute inset-0 -z-10 bg-black/55" />

        <div className="mx-auto flex min-h-[430px] w-full max-w-6xl items-center px-4 py-14 sm:min-h-[500px] sm:px-6 sm:py-16">
          <div className="w-full text-center text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              className="mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-white/10 p-2 shadow-2xl ring-4 ring-white/20 backdrop-blur-sm sm:h-32 sm:w-32"
            >
              <img
                src="/logo.png"
                alt="සොබා සේනාංකය"
                className="h-full w-full rounded-full object-contain"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
            >
              {lang === "si" ? "සොබා සේනාංකය" : "Soba Senankaya"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-white/90 sm:text-base"
            >
              {lang === "si"
                ? "සොබාදහම වෙනුවෙන් මනුෂ්‍යත්වයේ වගකීම හා වගවීම"
                : "Humanity's responsibility and accountability for nature"}
            </motion.p>

            <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-emerald-400" />
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section
        id="about"
        className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14"
      >
        <div className="grid gap-7 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85"
              alt="Sri Lankan nature"
              className="h-64 w-full object-cover sm:h-72 md:h-[350px]"
            />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              {lang === "si" ? "හැඳින්වීම" : "Introduction"}
            </span>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              {lang === "si"
                ? "ස්වභාවධර්මය වෙනුවෙන් එක්වන මනුෂ්‍යත්වය"
                : "Humanity united for nature"}
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
              {lang === "si"
                ? "සොබා සේනාංකය තවත් සමාජ මාධ්‍ය කණ්ඩායමක් නොව, මාතෘ ස්වභාවධර්මය වෙනුවෙන් කැප වූ වගකීමකි. ජාති, ආගම්, පක්ෂ හා වෙනත් බෙදීම් ඉක්මවා, ස්වභාවධර්මය ආරක්ෂා කිරීම සඳහා පුද්ගලයාගෙන් ආරම්භ වන වෙනසක් ගොඩනැගීම මෙහි අරමුණයි."
                : "Soba Senankaya is not simply another social media group, but a responsibility dedicated to Mother Nature. Beyond divisions of race, religion, politics and other differences, it seeks to build meaningful change beginning with the individual."}
            </p>

            <div className="mt-5 flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
              <HeartHandshake
                className="shrink-0 text-emerald-600 dark:text-emerald-400"
                size={24}
              />

              <p className="text-sm font-semibold leading-6 text-emerald-800 dark:text-emerald-300">
                {lang === "si"
                  ? "තනි තනිව වෙනස් වෙමු. අවසානයේ සුන්දර ලොවක් ගොඩනැගේවි."
                  : "Let us change individually. Together, a beautiful world can be built."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION / MISSION / OBJECTIVE */}
      <section className="w-full bg-white py-10 dark:bg-gray-900 sm:py-14">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6">
          <div className="mx-auto mb-7 max-w-2xl text-center">
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {lang === "si" ? "අපගේ පදනම" : "Our Foundation"}
            </span>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              {lang === "si"
                ? "දැක්ම • මෙහෙවර • අරමුණ"
                : "Vision • Mission • Purpose"}
            </h2>
          </div>

          <div className="space-y-3">
            {Object.entries(sections).map(([id, section]) => (
              <ExpandCard
                key={id}
                id={id}
                title={text(section.title, lang)}
                icon={section.icon}
                content={text(section.content, lang)}
                open={openFolder === id}
                onClick={() => toggleFolder(id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section
        id="objectives"
        className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14"
      >
        <div className="mb-7">
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {lang === "si" ? "අපගේ අරමුණු" : "Our Objectives"}
          </span>

          <h2 className="mt-2 text-2xl font-black sm:text-3xl">
            {lang === "si"
              ? "ස්වභාවික සමතුලිතතාව වෙනුවෙන්"
              : "For natural balance"}
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {objectives.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.35 }}
              className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900"
            >
              <CheckCircle2
                size={21}
                className="mt-1 shrink-0 text-emerald-500"
              />

              <p className="text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
                {text(item, lang)}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ACTION STRUCTURE */}
      <section
        id="action"
        className="w-full bg-emerald-950 py-10 text-white sm:py-14"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <Sprout className="mx-auto mb-3 text-emerald-300" size={34} />

            <h2 className="text-2xl font-black sm:text-3xl">
              {lang === "si" ? "ක්‍රියාකාරී ව්‍යුහය" : "Action Structure"}
            </h2>

            <p className="mt-3 text-sm leading-7 text-emerald-100/80 sm:text-base">
              {lang === "si"
                ? "ස්වභාවධර්මය වෙනුවෙන් වෙනස පුද්ගලයාගෙන් ආරම්භ වී සමාජය දක්වා ගමන් කරයි."
                : "Change for nature begins with the individual and grows towards society."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Leaf,
                title: lang === "si" ? "පුද්ගල මට්ටම" : "Individual Level",
                text:
                  lang === "si"
                    ? "ස්වභාවික සමතුලිතතාවයට බාධා කරන තමන්ගේ ක්‍රියා හඳුනාගෙන ඒවා අවම කරමින් ස්වයං විනයෙන් හා වගකීමෙන් ක්‍රියා කිරීම."
                    : "Identify personal actions that disturb natural balance, reduce them, and act with self-discipline and responsibility.",
              },
              {
                icon: Users,
                title: lang === "si" ? "කණ්ඩායම් මට්ටම" : "Group Level",
                text:
                  lang === "si"
                    ? "එකම අරමුණ හා වගකීම සහිත පුද්ගලයන් එක්ව ස්වභාවධර්මය ආරක්ෂා කිරීම සඳහා සාමූහික දායකත්වයක් ලබාදීම."
                    : "Bring together people with a common purpose and responsibility for collective contribution to nature.",
              },
              {
                icon: Scale,
                title: lang === "si" ? "සමාජ මට්ටම" : "Social Level",
                text:
                  lang === "si"
                    ? "ස්වභාවධර්මය සඳහා ආචාර ධර්ම හා නීතිගරුකභාවය ශක්තිමත් කරන සමාජ මතයක් ගොඩනැගීම."
                    : "Build social awareness that strengthens ethics and lawful responsibility towards nature.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
                >
                  <Icon className="mb-4 text-emerald-300" size={28} />

                  <h3 className="text-lg font-bold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-emerald-50/80">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section
        id="membership"
        className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14"
      >
        <div className="grid gap-7 md:grid-cols-2 md:items-start">
          <div>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {lang === "si" ? "සාමාජිකත්වය" : "Membership"}
            </span>

            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              {lang === "si"
                ? "සොබා ආරක්ෂකයෙකු වන්න"
                : "Become a Guardian of Nature"}
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300 sm:text-base">
              {lang === "si"
                ? "ස්වභාවධර්මය ආරක්ෂා කිරීමේ වගකීම පිළිගන්නා ඕනෑම ශ්‍රී ලාංකිකයෙකුට මෙම මෙහෙවරට එක්විය හැක."
                : "Any Sri Lankan who accepts the responsibility of protecting nature can become part of this mission."}
            </p>

            <div className="mt-5 space-y-3">
              {membershipPoints.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-xl bg-white p-4 shadow-sm dark:bg-gray-900"
                >
                  <Users
                    size={20}
                    className="mt-1 shrink-0 text-emerald-500"
                  />

                  <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
                    {text(item, lang)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950/30 sm:p-6">
            <h3 className="text-xl font-black text-emerald-900 dark:text-emerald-300">
              {lang === "si" ? "ස්වභාවධර්මයේ ප්‍රතිඥාව" : "Nature's Pledge"}
            </h3>

            <div className="mt-5 space-y-3">
              {ethics.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle2
                    size={19}
                    className="mt-1 shrink-0 text-emerald-600"
                  />

                  <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">
                    {text(item, lang)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-emerald-200 pt-5 text-center dark:border-emerald-900">
              <p className="text-sm font-bold leading-7 text-emerald-800 dark:text-emerald-300">
                {lang === "si"
                  ? "සොබා සේනාංකය - සොබාදහම වෙනුවෙන් මනුෂ්‍යත්වයේ ප්‍රතිඥාවයි."
                  : "Soba Senankaya - Humanity's pledge for nature."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST ANNOUNCEMENTS */}
      <section
        id="message"
        className="w-full bg-gray-100 py-10 dark:bg-gray-900/60 sm:py-14"
      >
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                {lang === "si" ? "ස්වභාවධර්මයේ පණිවිඩය" : "Message of Nature"}
              </span>

              <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                {lang === "si" ? "නවතම නිවේදන" : "Latest Announcements"}
              </h2>
            </div>

            <ArrowRight
              className="hidden text-emerald-500 sm:block"
              size={24}
            />
          </div>

          <LatestAnnouncements />
        </div>
      </section>

      {/* IDEAS / SUGGESTIONS */}
      <section
        id="comments"
        className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14"
      >
        <div className="rounded-3xl bg-emerald-600 p-6 text-white shadow-xl sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <MessageCircle size={27} />

                <h2 className="text-2xl font-black">
                  {lang === "si" ? "අදහස් හා යෝජනා" : "Ideas & Suggestions"}
                </h2>
              </div>

              <p className="mt-3 max-w-xl text-sm leading-7 text-emerald-50 sm:text-base">
                {lang === "si"
                  ? "ඔබේ අදහසක්, යෝජනාවක් හෝ ස්වභාවධර්මය වෙනුවෙන් කළ හැකි ක්‍රියාවක් අප සමඟ බෙදාගන්න."
                  : "Share your idea, suggestion, or an action that can help protect nature."}
              </p>
            </div>

            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-emerald-700 shadow-sm transition hover:bg-emerald-50 sm:w-auto"
            >
              <MessageSquare size={18} />
              {lang === "si" ? "ඔබේ අදහස එක් කරන්න" : "Add your idea"}
            </button>
          </div>
        </div>
      </section>

      {/* SOCIAL LINKS */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 sm:pb-14">
        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href="#"
            className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-2 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                <Globe2 size={22} />
              </div>

              <div>
                <p className="font-bold">
                  {lang === "si" ? "Facebook පිටුව" : "Facebook Page"}
                </p>

                <p className="text-xs text-gray-500">
                  {lang === "si"
                    ? "අප සමඟ සම්බන්ධ වන්න"
                    : "Connect with us"}
                </p>
              </div>
            </div>

            <ArrowRight size={19} className="text-gray-400" />
          </a>

          <a
            href="#"
            className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-green-100 p-2 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <MessageCircle size={22} />
              </div>

              <div>
                <p className="font-bold">
                  {lang === "si" ? "WhatsApp" : "WhatsApp"}
                </p>

                <p className="text-xs text-gray-500">
                  {lang === "si"
                    ? "අප සමඟ සම්බන්ධ වන්න"
                    : "Connect with us"}
                </p>
              </div>
            </div>

            <ArrowRight size={19} className="text-gray-400" />
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-white py-7 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6">
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
            {lang === "si" ? "සොබා සේනාංකය" : "Soba Senankaya"}
          </p>

          <p className="mt-1 text-xs text-gray-500">
            {lang === "si"
              ? "සොබාදහම වෙනුවෙන් මනුෂ්‍යත්වයේ වගකීම"
              : "Humanity's responsibility for nature"}
          </p>
        </div>
      </footer>
    </main>
  );
}
