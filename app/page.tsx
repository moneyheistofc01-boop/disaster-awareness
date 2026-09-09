"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const images = {
  hero:
    "https://images.unsplash.com/photo-1511497584788-876760111969?q=85&w=1800&auto=format&fit=crop",
  introduction:
    "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?q=85&w=1400&auto=format&fit=crop",
  vision:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=85&w=1400&auto=format&fit=crop",
  action:
    "https://images.unsplash.com/photo-1448375240586-882707db888b?q=85&w=1400&auto=format&fit=crop",
  members:
    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=85&w=1400&auto=format&fit=crop",
  message:
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?q=85&w=1400&auto=format&fit=crop",
};

const objectives = [
  "ස්වභාවධර්මය පිළිබඳ මනුෂ්‍යත්වයේ වගකීම හා වගවීම සම්බන්ධයෙන් සියලු ලාංකිකයන් දැනුවත් කිරීම.",
  "ස්වභාවධර්මය පිළිබඳ පුළුල් සමාජ කතිකාවකට වන පසුබිම සකස් කිරීම.",
  "ස්වභාවධර්මයේ ආරක්ෂාව හා යහපැවැත්ම සඳහා පුද්ගලික ආචාරධර්ම හඳුනාගෙන බලගැන්වීම.",
  "ස්වභාවධර්මයේ සමතුලිතතාවය හා ආරක්ෂාව සඳහා සමාජීය වශයෙන් ක්‍රියාකාරී සමාජ සමූහයක් බලගැන්වීම.",
  "ස්වභාවික ව්‍යසනයන් සඳහා හේතු වන කරුණු අවම කරමින් සුරක්ෂිත දේශයක් බිහි කිරීමට දායක වීම.",
];

const actionLevels = [
  {
    number: "01",
    title: "පුද්ගල මට්ටම",
    text: "ස්වභාවධර්මයේ සමතුලිතතාවයට බාධා පමුණුවන පුද්ගලික ක්‍රියා හඳුනා ගැනීමත්, ස්වයං විනයෙන් හා වගකීමෙන් යුතු සමාජිකයෙකු ලෙස වෙනස් වීමත්.",
  },
  {
    number: "02",
    title: "සමූහ මට්ටම",
    text: "සමාන අරමුණක් හා වගකීමක් සහිත පුද්ගලයන් සමූහයක් ලෙස ඒකරාශී කරමින් ස්වභාවධර්මයේ ආරක්ෂාව හා සමතුලිතතාවය උදෙසා සාමූහික දායකත්වයක් ලබා දීම.",
  },
  {
    number: "03",
    title: "සමාජ මට්ටම",
    text: "ස්වභාවධර්මය සුරැකීමේ ආචාරධර්ම හා රීති බලගන්වන සමාජ මතයක් ගොඩනඟමින් එය සාමාන්‍ය ජීවන රටාවේ කොටසක් බවට පත් කිරීම.",
  },
];

const ethics = [
  "මම ස්වභාවධර්මයට හානි නොකරමි.",
  "ස්වභාවධර්මයට හානි කරන ක්‍රියාවන්ට අනුබල නොදෙමි.",
  "ස්වභාවධර්මය ආරක්ෂා කිරීම සඳහා මට කළ හැකි උපරිම දේ කරමි.",
  "අන් අයද ඒ සඳහා දිරිමත් කරමි.",
  "මගේ ක්‍රියාවන් තුළින් ස්වභාවධර්මයේ සමතුලිතතාවයට ගරු කරමි.",
];

export default function Home() {
  const { lang } = useLanguage();

  const si = lang === "si";

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900 dark:bg-[#07110d] dark:text-white">

      {/* ================= NAV ================= */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl dark:bg-[#07110d]/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-xl shadow-lg">
              🌿
            </div>
            <div>
              <p className="font-black leading-none">
                සොබා සේනාංකය
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-emerald-600">
                Nature • Humanity • Responsibility
              </p>
            </div>
          </a>

          <nav className="hidden gap-6 text-sm font-semibold md:flex">
            <a href="#about" className="hover:text-emerald-600">හැඳින්වීම</a>
            <a href="#vision" className="hover:text-emerald-600">දැක්ම</a>
            <a href="#mission" className="hover:text-emerald-600">මෙහෙවර</a>
            <a href="#objectives" className="hover:text-emerald-600">අරමුණු</a>
            <a href="#action" className="hover:text-emerald-600">ක්‍රියාකාරීත්වය</a>
            <a href="#membership" className="hover:text-emerald-600">සාමාජිකත්වය</a>
          </nav>

          <a
            href="#join"
            className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5"
          >
            සොබා ආරක්ෂකයෙක් වන්න
          </a>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section id="home" className="relative isolate min-h-[720px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images.hero})` }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,20,12,.92),rgba(2,20,12,.72),rgba(2,20,12,.35))]" />

        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-20 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-4xl text-white"
          >
            {/* Logo animation */}
            <motion.div
              animate={{ y: [0, -7, 0], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 text-5xl shadow-2xl backdrop-blur-md"
            >
              🌿
            </motion.div>

            <p className="mb-4 text-sm font-bold uppercase tracking-[0.35em] text-emerald-300">
              {si ? "ස්වභාවධර්මය • මනුෂ්‍යත්වය • වගකීම" : "Nature • Humanity • Responsibility"}
            </p>

            <h1 className="text-5xl font-black leading-[1.08] md:text-7xl">
              {si ? (
                <>
                  සොබා සේනාංකය
                  <br />
                  <span className="text-emerald-300">
                    ස්වභාවධර්මය වෙනුවෙන්
                  </span>
                </>
              ) : (
                <>
                  Soba Senankaya
                  <br />
                  <span className="text-emerald-300">
                    For Nature & Humanity
                  </span>
                </>
              )}
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/80 md:text-lg">
              {si
                ? "ස්වභාවධර්මය උදෙසා මනුෂ්‍යත්වයේ වගකීම, වගවීම හා යුතුකම අවබෝධ කරමින් ස්වයං විනයෙන් යුතු සමාජයක් ගොඩනඟන සමාජ මෙහෙවරක්."
                : "A social movement dedicated to strengthening humanity’s responsibility, accountability and duty towards nature."}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#about"
                className="rounded-full bg-emerald-500 px-7 py-3 text-center font-bold text-white transition hover:bg-emerald-400"
              >
                හැඳින්වීම බලන්න
              </a>

              <a
                href="#membership"
                className="rounded-full border border-white/30 bg-white/10 px-7 py-3 text-center font-bold backdrop-blur-md transition hover:bg-white/20"
              >
                සාමාජිකත්වය
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= INTRODUCTION ================= */}
      <section id="about" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="order-2 md:order-1"
          >
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-emerald-600">
              02 • හැඳින්වීම
            </p>

            <h2 className="text-4xl font-black tracking-tight md:text-5xl">
              ස්වභාවධර්මයේ
              <br />
              උදාර රාජකාරියක්
            </h2>

            <div className="mt-7 space-y-5 text-base leading-8 text-slate-600 dark:text-slate-300 md:text-lg">
              <p>
                “සොබා සේනාංකය” තවත් එක් සමාජ මාධ්‍ය සමූහයක් නොව,
                ස්වභාවධර්මයේ මෑණියන් උදෙසා කැප වූ උත්තරීතර රාජකාරියකි.
              </p>

              <p>
                එය ජාතිය, කුලය, ආගම, පාට, පක්ෂ යන බෙදීම්වලින් ඔබ්බට
                විහිදෙන මනුෂ්‍යත්වයේ උපරිම වගකීම හා වගවීමකි.
              </p>

              <p className="font-semibold text-emerald-700 dark:text-emerald-400">
                “තනි තනිව වෙනස් වෙමු. අවසානයේ සුන්දර ලොවක් ගොඩනැගේවි.”
              </p>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="order-1 overflow-hidden rounded-[2rem] shadow-2xl md:order-2"
          >
            <img
              src={images.introduction}
              alt="Nature"
              className="h-[340px] w-full object-cover transition duration-700 hover:scale-105 md:h-[520px]"
            />
          </motion.div>
        </div>
      </section>

      {/* ================= VISION ================= */}
      <section id="vision" className="bg-emerald-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mx-auto max-w-5xl text-center"
          >
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-emerald-300">
              03 • දැක්ම
            </p>

            <h2 className="text-4xl font-black md:text-6xl">
              මිනිසාත් ස්වභාවධර්මයත්
              <br />
              අතර සමතුලිත අනාගතයක්
            </h2>

            <p className="mx-auto mt-8 max-w-4xl text-base leading-8 text-emerald-50/80 md:text-lg md:leading-9">
              මිනිසාගේ පැවැත්මට පමණක් සම්පතක් නොවූ, මිනිසාද ඇතුළත් සමස්ත
              ජීව පද්ධතියේ පදනම වූ ස්වභාවධර්මය උදෙසා මනුෂ්‍යත්වයේ වගකීම,
              වගවීම සහ යුතුකම සෑම පුරවැසියෙක් තුළම අවබෝධ කරවීම තුළින්,
              ස්වයං විනය, ආචාරධර්ම, කරුණාව, සහජීවනය හා සමාජ වගකීම මත
              පදනම් වූ ආදර්ශවත් ශ්‍රී ලාංකීය සමාජයක් බිහි කිරීම.
            </p>

            <div className="mt-10 inline-block rounded-2xl border border-emerald-400/20 bg-white/5 px-6 py-5 text-sm font-semibold text-emerald-200 md:text-base">
              “ස්වභාවධර්මය සුරැකීම යනු පරිසරය සුරැකීම පමණක් නොව,
              මනුෂ්‍යත්වයේ අනාගතය සුරැකීමයි.”
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section id="mission" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="grid gap-10 rounded-[2.5rem] bg-slate-50 p-7 dark:bg-white/[0.04] md:grid-cols-[0.8fr_1.2fr] md:p-12"
        >
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">
              04 • මෙහෙවර
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              වගකීමෙන්
              <br />
              ක්‍රියාවට
            </h2>
          </div>

          <div className="flex items-center">
            <p className="text-lg leading-9 text-slate-600 dark:text-slate-300">
              ස්වභාවධර්මය සුරැකීම සම්බන්ධයෙන් පුද්ගලයාගේ වගකීම හා වගවීම
              ශක්තිමත් කරමින්, ස්වයං විනයෙන් යුතු පුරවැසියන්ගෙන් සමන්විත
              සමාජයක් ගොඩනැඟීමත්, එම සමාජ බලය සංවිධානාත්මකව ඒකරාශී කරමින්
              ශ්‍රී ලංකාවේ ස්වභාවික පරිසරයේ සමතුලිතතාවය, ආරක්ෂාව හා
              යහපැවැත්ම තහවුරු කරවීමට දායක වීමත් සොබා සේනාංකයේ මෙහෙවර වේ.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ================= OBJECTIVES ================= */}
      <section id="objectives" className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
        <div className="mb-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">
            05 • අරමුණ
          </p>
          <h2 className="mt-3 text-4xl font-black md:text-5xl">
            අපගේ ප්‍රධාන අරමුණු
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {objectives.map((item, index) => (
            <motion.article
              key={item}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-white/[0.03]"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 font-black text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                0{index + 1}
              </div>

              <p className="leading-8 text-slate-600 dark:text-slate-300">
                {item}
              </p>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ================= ACTION ================= */}
      <section id="action" className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src={images.action}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-400">
              06 • ක්‍රියාකාරීත්වය
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-6xl">
              තනි පුද්ගලයාගෙන්
              <br />
              සමාජ වෙනසක් දක්වා
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {actionLevels.map((item) => (
              <motion.article
                key={item.number}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-[2rem] border border-white/10 bg-white/10 p-7 backdrop-blur-md"
              >
                <span className="text-4xl font-black text-emerald-400">
                  {item.number}
                </span>

                <h3 className="mt-5 text-2xl font-black">
                  {item.title}
                </h3>

                <p className="mt-4 leading-8 text-white/70">
                  {item.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MEMBERSHIP ================= */}
      <section id="membership" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid items-center gap-12 md:grid-cols-2">
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="overflow-hidden rounded-[2rem]"
          >
            <img
              src={images.members}
              alt="Community"
              className="h-[420px] w-full object-cover md:h-[560px]"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">
              07 • සාමාජිකත්වය
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              ඔබත් සොබා
              <br />
              ආරක්ෂකයෙක් වන්න
            </h2>

            <p className="mt-7 text-lg leading-8 text-slate-600 dark:text-slate-300">
              සෑම ශ්‍රී ලාංකිකයෙකුම ජාති, ආගම්, වර්ග, කුල, භාෂා හෝ
              දේශපාලනික බෙදීම්වලින් තොරව සොබා සේනාංකයේ අරමුණු හා ප්‍රතිපත්ති
              පිළිගන්නේ නම් එහි සාමාජිකත්වය ලබා ගැනීමට සුදුසුකම් ලබයි.
            </p>

            <div
              id="join"
              className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/40 dark:bg-emerald-950/30"
            >
              <p className="font-bold text-emerald-800 dark:text-emerald-300">
                “ස්වභාවධර්මය වෙනුවෙන් මනුෂ්‍යත්වයේ ප්‍රතිඥාව”
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                ප්‍රතිඥාව හෘද සාක්ෂියට එකඟව ලබා දී, එහි අන්තර්ගතයට අනුගතව
                ක්‍රියා කිරීමට කැමති හා හැකියාව ඇති ඕනෑම පුරවැසියෙකු මෙම
                සමාජ මෙහෙවරෙහි කොටස්කරුවෙකු වේ.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Ethics */}
        <div className="mt-16 rounded-[2rem] bg-slate-950 p-7 text-white md:p-10">
          <h3 className="text-2xl font-black md:text-3xl">
            සොබා සේනාංකයේ ආචාරධර්ම
          </h3>

          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {ethics.map((item, index) => (
              <div
                key={item}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <span className="font-black text-emerald-400">
                  {index + 1}
                </span>
                <p className="leading-7 text-white/80">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MESSAGE / SUB FOLDERS ================= */}
      <section id="message" className="bg-emerald-50 dark:bg-emerald-950/20">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">

          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">
              ස්වභාවධර්මයේ පණිවිඩය
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-5xl">
              පණිවිඩය • නිවේදන • වීඩියෝ
            </h2>
          </div>

          {/* Sub folders */}
          <div className="grid gap-5 md:grid-cols-3">

            <a
              href="#latest"
              className="group overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-white/[0.04]"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={images.message}
                  alt="Latest announcement"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-5 left-5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                  LATEST
                </span>
              </div>

              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                  Sub Folder 01
                </p>
                <h3 className="mt-2 text-xl font-black">
                  නවතම නිවේදන
                </h3>
              </div>
            </a>

            <a
              href="#duty"
              className="group rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 dark:bg-white/[0.04]"
            >
              <span className="text-4xl">🌱</span>
              <p className="mt-7 text-xs font-bold uppercase tracking-widest text-emerald-600">
                Sub Folder 02
              </p>
              <h3 className="mt-2 text-2xl font-black">
                මගේ රාජකාරිය
              </h3>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                ස්වභාවධර්මය වෙනුවෙන් පුද්ගලික වගකීම හා ස්වයං විනය.
              </p>
            </a>

            <a
              href="#social-mission"
              className="group rounded-3xl bg-white p-7 shadow-sm transition hover:-translate-y-1 dark:bg-white/[0.04]"
            >
              <span className="text-4xl">🤝</span>
              <p className="mt-7 text-xs font-bold uppercase tracking-widest text-emerald-600">
                Sub Folder 03
              </p>
              <h3 className="mt-2 text-2xl font-black">
                සමාජ මෙහෙවර
              </h3>
              <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                පුද්ගලයාගෙන් සමූහයටත්, සමූහයෙන් සමාජයටත්.
              </p>
            </a>

          </div>

          {/* Latest content */}
          <div
            id="latest"
            className="mt-10 grid gap-5 md:grid-cols-2"
          >
            <article className="rounded-3xl bg-white p-7 shadow-sm dark:bg-white/[0.04]">
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                ANNOUNCEMENT
              </span>
              <h3 className="mt-5 text-2xl font-black">
                ස්වභාවධර්මයේ නවතම පණිවිඩය
              </h3>
              <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                මෙතැනට ඔබගේ latest announcement එක dynamic data එකෙන්
                පසුව load කරන්න පුළුවන්.
              </p>
              <a
                href="#"
                className="mt-5 inline-block font-bold text-emerald-600"
              >
                වැඩි විස්තර →
              </a>
            </article>

            <article className="overflow-hidden rounded-3xl bg-slate-950 text-white">
              <div className="flex min-h-[250px] items-center justify-center p-8">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-2xl shadow-xl">
                    ▶
                  </div>
                  <h3 className="mt-5 text-2xl font-black">
                    නවතම වීඩියෝව
                  </h3>
                  <p className="mt-2 text-sm text-white/60">
                    Video URL එක මෙතැනට connect කරන්න.
                  </p>
                </div>
              </div>
            </article>
          </div>

        </div>
      </section>

      {/* ================= DUTY ================= */}
      <section id="duty" className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="rounded-[2.5rem] border border-emerald-200 bg-white p-7 shadow-sm dark:border-emerald-900/30 dark:bg-white/[0.03] md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-600">
            මගේ රාජකාරිය
          </p>

          <h2 className="mt-4 text-4xl font-black md:text-5xl">
            වෙනස ආරම්භ වන්නේ
            <br />
            මගෙන්මය.
          </h2>

          <p className="mt-7 max-w-4xl text-lg leading-9 text-slate-600 dark:text-slate-300">
            ස්වභාවධර්මයේ සමතුලිතතාවයට බාධා පමුණුවන පුද්ගලික ක්‍රියා
            හඳුනාගැනීම, ඒවා අවම කිරීම, ස්වයං විනයෙන් හා වගකීමෙන් යුතු
            සාමාජිකයෙකු ලෙස ක්‍රියා කිරීම සහ ස්වභාවධර්මයේ ආරක්ෂකයෙකු
            ලෙස පුද්ගල පරිවර්තනයක් ඇති කිරීම මගේ රාජකාරියේ මූලික පදනමයි.
          </p>
        </div>
      </section>

      {/* ================= SOCIAL MISSION ================= */}
      <section
        id="social-mission"
        className="bg-slate-950 text-white"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-400">
                සමාජ මෙහෙවර
              </p>

              <h2 className="mt-4 text-4xl font-black md:text-6xl">
                එකමුතුවෙන්
                <br />
                සුරකිමු.
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-9 text-white/70">
              <p>
                සමාන අරමුණක් හා වගකීමක් සහිත පුද්ගලයන් සමූහයක් ලෙස
                ඒකරාශී කරමින් ස්වභාවධර්මයේ ආරක්ෂාව හා සමතුලිතතාවය උදෙසා
                සාමූහික දායකත්වයක් ලබා දීම.
              </p>

              <p>
                ස්වභාවධර්මය සුරැකීමේ ආචාරධර්ම හා රීති බලගන්වන සමාජ මතයක්
                ගොඩනඟමින් එය සමාජයේ සාමාන්‍ය ජීවන රටාවේ කොටසක් කිරීම.
              </p>

              <p className="font-semibold text-emerald-300">
                “සියලු දෙනාගේම අම්මා වන ස්වභාවධර්මය අපට කියා දෙන පාඩම
                අවබෝධ කර ගනිමු.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEEDBACK ================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-teal-700 p-8 text-white md:p-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-100">
                අදහස් හා යෝජනා
              </p>

              <h2 className="mt-3 text-4xl font-black md:text-5xl">
                ඔබගේ අදහසද
                <br />
                මේ ගමනේ කොටසක්.
              </h2>

              <p className="mt-4 max-w-2xl leading-8 text-white/80">
                ස්වභාවධර්මයේ ආරක්ෂාව උදෙසා ඔබගේ වටිනා අදහස්,
                යෝජනා හා දායකත්වය ලබා දෙන්න.
              </p>
            </div>

            <a
              href="#"
              className="rounded-full bg-white px-7 py-4 text-center font-black text-emerald-700 transition hover:scale-105"
            >
              අදහසක් යොමු කරන්න
            </a>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-[#050c09]">
        <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xl font-black">සොබා සේනාංකය</p>
              <p className="mt-1 text-sm text-slate-500">
                ස්වභාවධර්මය වෙනුවෙන් මනුෂ්‍යත්වයේ ප්‍රතිඥාවයි.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-bold transition hover:border-emerald-500 hover:text-emerald-600 dark:border-white/10"
              >
                Facebook
              </a>

              <a
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-bold text-white transition hover:bg-emerald-500"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
            }
