"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Globe2,
  HeartHandshake,
  Leaf,
  Loader2,
  MessageCircle,
  MessageSquare,
  Quote,
  Scale,
  ShieldCheck,
  Sparkles,
  Sprout,
  Target,
  TreePine,
  Users,
} from "lucide-react";

import LatestAnnouncements from "../components/LatestAnnouncements";

type LangText = {
  si: string;
  en: string;
};

type Comment = {
  id: number;
  name: string;
  comment: string;
  status: string;
  created_at: string;
};

const text = (value: LangText, lang: "si" | "en") =>
  lang === "si" ? value.si : value.en;

/* =========================================================
   CONTENT
========================================================= */

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
      si: "ප්‍රධාන අරමුණ",
      en: "Purpose",
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

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 24 }
      }
      whileInView={
        reduceMotion
          ? undefined
          : { opacity: 1, y: 0 }
      }
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
    <motion.div
      id={id}
      layout
      className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_14px_45px_rgba(15,23,42,0.05)] transition-all dark:border-white/10 dark:bg-white/[0.035]"
    >
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
      >
        <div className="flex min-w-0 items-center gap-4">
          <motion.div
            animate={
              open
                ? {
                    rotate: [0, -5, 5, 0],
                    scale: [1, 1.05, 1],
                  }
                : {}
            }
            transition={{ duration: 0.4 }}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
          >
            <Icon size={22} />
          </motion.div>

          <span className="break-words text-base font-black text-slate-900 dark:text-white sm:text-lg">
            {title}
          </span>
        </div>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-slate-400"
        >
          <ChevronDown size={21} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
          >
            <div className="border-t border-slate-100 px-5 pb-6 pt-5 text-sm leading-7 text-slate-600 dark:border-white/5 dark:text-slate-300 sm:px-6 sm:text-base">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function HomePage() {
  const { lang } = useLanguage();

  const [openFolder, setOpenFolder] =
    useState<string | null>("vision");

  const [comments, setComments] =
    useState<Comment[]>([]);

  const [commentsLoading, setCommentsLoading] =
    useState(true);

  const [commentSubmitting, setCommentSubmitting] =
    useState(false);

  const [commentModalOpen, setCommentModalOpen] =
    useState(false);

  const [commentName, setCommentName] =
    useState("");

  const [commentText, setCommentText] =
    useState("");

  const [commentError, setCommentError] =
    useState("");

  const [commentSuccess, setCommentSuccess] =
    useState("");

  const reduceMotion = useReducedMotion();

  const toggleFolder = (id: string) => {
    setOpenFolder((current) =>
      current === id ? null : id
    );
  };

  /*
   * =========================================================
   * LOAD LIVE COMMENTS
   * =========================================================
   */

  const loadComments = async (
    silent = false
  ) => {
    try {
      if (!silent) {
        setCommentsLoading(true);
      }

      const response = await fetch(
        "/api/comments",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (
        !response.ok ||
        !data.success ||
        !Array.isArray(data.comments)
      ) {
        throw new Error(
          data?.message ||
            "Failed to load comments."
        );
      }

      const liveComments =
        data.comments.filter(
          (item: Comment) =>
            item.status === "approved" ||
            !item.status
        );

      setComments(liveComments);
    } catch {
      /*
       * Keep existing comments visible
       * if a silent refresh fails.
       */
    } finally {
      if (!silent) {
        setCommentsLoading(false);
      }
    }
  };

  /*
   * Initial comments load + light live refresh
   */
  useEffect(() => {
    loadComments();

    const interval = window.setInterval(() => {
      loadComments(true);
    }, 15000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /*
   * =========================================================
   * COMMENT MODAL
   * =========================================================
   */

  const openCommentModal = () => {
    setCommentError("");
    setCommentSuccess("");
    setCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    if (commentSubmitting) return;

    setCommentModalOpen(false);
    setCommentError("");
    setCommentSuccess("");
  };

  const submitComment = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setCommentError("");
    setCommentSuccess("");

    const name = commentName.trim();
    const comment = commentText.trim();

    if (!name) {
      setCommentError(
        lang === "si"
          ? "කරුණාකර ඔබගේ නම ඇතුළත් කරන්න."
          : "Please enter your name."
      );
      return;
    }

    if (!comment) {
      setCommentError(
        lang === "si"
          ? "කරුණාකර ඔබේ අදහස ඇතුළත් කරන්න."
          : "Please enter your idea."
      );
      return;
    }

    setCommentSubmitting(true);

    try {
      const response = await fetch(
        "/api/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            comment,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message ||
            "Could not submit your idea."
        );
      }

      if (data.comment) {
        setComments((current) => [
          data.comment,
          ...current,
        ]);
      } else {
        await loadComments(true);
      }

      setCommentName("");
      setCommentText("");

      setCommentSuccess(
        lang === "si"
          ? "ඔබේ අදහස සාර්ථකව සජීවීව එක් කළා. ❤️"
          : "Your idea is now live. ❤️"
      );

      window.setTimeout(() => {
        setCommentModalOpen(false);
        setCommentSuccess("");
      }, 1200);
    } catch (error) {
      setCommentError(
        error instanceof Error
          ? error.message
          : lang === "si"
          ? "අදහස එක් කිරීමට නොහැකි විය."
          : "Could not submit your idea."
      );
    } finally {
      setCommentSubmitting(false);
    }
  };

  const visibleComments = useMemo(
    () => comments.slice(0, 12),
    [comments]
  );

  return (
    <main className="w-full overflow-x-hidden bg-[#f6f9f7] text-slate-900 dark:bg-[#06100c] dark:text-white">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative isolate min-h-[720px] overflow-hidden sm:min-h-[790px]">
        {/* Background */}
        <motion.div
          className="absolute inset-0 -z-30 bg-cover bg-center"
          initial={
            reduceMotion
              ? false
              : { scale: 1.08 }
          }
          animate={
            reduceMotion
              ? undefined
              : { scale: 1 }
          }
          transition={{
            duration: 2.2,
            ease: "easeOut",
          }}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=2200&q=90')",
          }}
        />

        {/* Deep cinematic overlays */}
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(1,15,10,0.90)_0%,rgba(1,18,12,0.72)_42%,rgba(1,15,10,0.32)_100%)]" />
        <div className="absolute inset-0 -z-20 bg-[linear-gradient(0deg,rgba(1,12,8,0.96)_0%,rgba(1,12,8,0.10)_42%,rgba(1,12,8,0.28)_100%)]" />

        {/* Animated glow */}
        <motion.div
          className="absolute -left-24 top-32 -z-10 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, 35, 0],
                  y: [0, 20, 0],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute right-[-120px] top-28 -z-10 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [0, -30, 0],
                  y: [0, 25, 0],
                }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="mx-auto flex min-h-[720px] w-full max-w-7xl items-center px-5 py-28 sm:min-h-[790px] sm:px-8 lg:px-10">
          <div className="grid w-full gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            {/* Hero text */}
            <div className="max-w-4xl">
              <Reveal>
                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -2,
                        }
                  }
                  className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2 pr-4 text-sm font-bold text-white backdrop-blur-xl"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-300/20">
                    <img
                      src="/logo.png"
                      alt="සොබා සේනාංකය"
                      className="h-8 w-8 rounded-full object-contain"
                    />
                  </div>

                  <span>
                    {lang === "si"
                      ? "සොබා සේනාංකය"
                      : "Soba Senankaya"}
                  </span>

                  <Sparkles
                    size={15}
                    className="text-emerald-300"
                  />
                </motion.div>
              </Reveal>

              <Reveal delay={0.08}>
                <p className="mb-4 text-sm font-black uppercase tracking-[0.25em] text-emerald-300 sm:text-base">
                  {lang === "si"
                    ? "ස්වභාවය • මනුෂ්‍යත්වය • වගකීම"
                    : "Nature • Humanity • Responsibility"}
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-[5.7rem]">
                  {lang === "si" ? (
                    <>
                      <span className="block">
                        සොබා සේනාංකය
                      </span>

                      <span className="mt-2 block text-emerald-300">
                        ස්වභාවයට මනුෂ්‍යත්වයේ
                      </span>

                      <span className="block text-white">
                        වගකීම.
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block">
                        Soba Senankaya
                      </span>

                      <span className="mt-2 block text-emerald-300">
                        Humanity's
                      </span>

                      <span className="block text-white">
                        responsibility for nature.
                      </span>
                    </>
                  )}
                </h1>
              </Reveal>

              <Reveal delay={0.22}>
                <p className="mt-7 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                  {lang === "si"
                    ? "ස්වභාවධර්මය සුරැකීම යනු පරිසරය සුරැකීම පමණක් නොව, මනුෂ්‍යත්වයේ අනාගතය සුරැකීමයි."
                    : "Protecting nature is not only about protecting the environment; it is about protecting the future of humanity."}
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#about"
                    className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-4 text-sm font-black text-emerald-950 shadow-[0_12px_45px_rgba(52,211,153,0.2)] transition hover:bg-emerald-300"
                  >
                    {lang === "si"
                      ? "අප ගැන දැනගන්න"
                      : "Discover our mission"}

                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>

                  <a
                    href="#comments"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/15"
                  >
                    <MessageCircle size={18} />

                    {lang === "si"
                      ? "ඔබේ අදහස"
                      : "Your idea"}
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Hero quote card */}
            <Reveal
              delay={0.35}
              className="lg:justify-self-end"
            >
              <motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -6,
                      }
                }
                className="max-w-md rounded-[30px] border border-white/10 bg-black/20 p-5 backdrop-blur-2xl sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                    <Quote size={22} />
                  </div>

                  <div>
                    <p className="text-sm leading-7 text-white/80 sm:text-base">
                      {lang === "si"
                        ? "තනි තනිව වෙනස් වෙමු. අවසානයේ සුන්දර ලොවක් ගොඩනැගේවි."
                        : "Let us change individually. Together, a beautiful world can be built."}
                    </p>

                    <div className="mt-4 h-px w-16 bg-emerald-300/50" />

                    <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
                      {lang === "si"
                        ? "ස්වභාවධර්මයේ පණිවිඩය"
                        : "Message of Nature"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/70"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, 8, 0],
                }
          }
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown size={21} />
        </motion.div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section
        id="about"
        className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
      >
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
              <img
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=90"
                alt="Nature"
                className="h-[330px] w-full object-cover sm:h-[430px]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/65 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3 text-white">
                  <Leaf
                    size={20}
                    className="text-emerald-300"
                  />

                  <p className="text-sm font-bold">
                    {lang === "si"
                      ? "වෙනස ආරම්භ වන්නේ අපෙන්."
                      : "Change begins with us."}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                <Leaf size={14} />
                {lang === "si"
                  ? "හැඳින්වීම"
                  : "Introduction"}
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                {lang === "si"
                  ? "ස්වභාවධර්මය වෙනුවෙන් එක්වන මනුෂ්‍යත්වය"
                  : "Humanity united for nature"}
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base dark:text-slate-300">
                {lang === "si"
                  ? "සොබා සේනාංකය තවත් සමාජ මාධ්‍ය කණ්ඩායමක් නොව, මාතෘ ස්වභාවධර්මය වෙනුවෙන් කැප වූ වගකීමකි. ජාති, ආගම්, පක්ෂ හා වෙනත් බෙදීම් ඉක්මවා, ස්වභාවධර්මය ආරක්ෂා කිරීම සඳහා පුද්ගලයාගෙන් ආරම්භ වන වෙනසක් ගොඩනැගීම මෙහි අරමුණයි."
                  : "Soba Senankaya is not simply another social media group, but a responsibility dedicated to Mother Nature. Beyond divisions of race, religion, politics and other differences, it seeks to build meaningful change beginning with the individual."}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-7 rounded-[26px] border border-emerald-200/70 bg-emerald-50/80 p-5 dark:border-emerald-400/10 dark:bg-emerald-500/[0.06] sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                    <HeartHandshake size={23} />
                  </div>

                  <p className="text-sm font-bold leading-7 text-emerald-900 dark:text-emerald-200 sm:text-base">
                    {lang === "si"
                      ? "තනි තනිව වෙනස් වෙමු. අවසානයේ සුන්දර ලොවක් ගොඩනැගේවි."
                      : "Let us change individually. Together, a beautiful world can be built."}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOUNDATION
      ====================================================== */}

      <section className="relative w-full overflow-hidden bg-white py-16 dark:bg-[#08130f] sm:py-24">
        <div className="absolute right-[-140px] top-10 h-80 w-80 rounded-full bg-emerald-400/5 blur-3xl" />

        <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              {lang === "si"
                ? "අපගේ පදනම"
                : "Our Foundation"}
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {lang === "si"
                ? "දැක්ම • මෙහෙවර • ප්‍රධාන අරමුණ"
                : "Vision • Mission • Purpose"}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
              {lang === "si"
                ? "වෙනසක් ගොඩනගන්නට පෙර අපගේ පදනම පැහැදිලි කරගනිමු."
                : "Before creating change, let us understand the foundation behind the mission."}
            </p>
          </Reveal>

          <div className="mt-9 space-y-4">
            {Object.entries(sections).map(
              ([id, section], index) => (
                <Reveal
                  key={id}
                  delay={index * 0.06}
                >
                  <ExpandCard
                    id={id}
                    title={text(
                      section.title,
                      lang
                    )}
                    icon={section.icon}
                    content={text(
                      section.content,
                      lang
                    )}
                    open={
                      openFolder === id
                    }
                    onClick={() =>
                      toggleFolder(id)
                    }
                  />
                </Reveal>
              )
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          OBJECTIVES
      ====================================================== */}

      <section
        id="objectives"
        className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
      >
        <Reveal>
          <div className="max-w-3xl">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              {lang === "si"
                ? "අපගේ අරමුණු"
                : "Our Objectives"}
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {lang === "si"
                ? "ස්වභාවික සමතුලිතතාව වෙනුවෙන්"
                : "For natural balance"}
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base">
              {lang === "si"
                ? "අපගේ මෙහෙවර ප්‍රායෝගිකව ඉදිරියට ගෙන යන මූලික අරමුණු."
                : "The core objectives that move our mission forward in practice."}
            </p>
          </div>
        </Reveal>

        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {objectives.map(
            (item, index) => (
              <Reveal
                key={index}
                delay={index * 0.05}
              >
                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -5,
                        }
                  }
                  className="group flex h-full gap-4 rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_14px_45px_rgba(15,23,42,0.05)] transition-colors hover:border-emerald-200 dark:border-white/10 dark:bg-white/[0.035] dark:hover:border-emerald-400/20"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition-transform duration-300 group-hover:scale-110 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <CheckCircle2 size={21} />
                  </div>

                  <p className="text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">
                    {text(item, lang)}
                  </p>
                </motion.div>
              </Reveal>
            )
          )}
        </div>
      </section>

      {/* =====================================================
          ACTION STRUCTURE
      ====================================================== */}

      <section
        id="action"
        className="relative w-full overflow-hidden bg-[#062117] py-16 text-white sm:py-24"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(52,211,153,0.12),transparent_25%),radial-gradient(circle_at_85%_80%,rgba(163,230,53,0.08),transparent_26%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
              <Sprout size={28} />
            </div>

            <h2 className="mt-5 text-3xl font-black sm:text-4xl">
              {lang === "si"
                ? "ක්‍රියාකාරී ව්‍යුහය"
                : "Action Structure"}
            </h2>

            <p className="mt-4 text-sm leading-8 text-emerald-50/70 sm:text-base">
              {lang === "si"
                ? "ස්වභාවධර්මය වෙනුවෙන් වෙනස පුද්ගලයාගෙන් ආරම්භ වී සමාජය දක්වා ගමන් කරයි."
                : "Change for nature begins with the individual and grows towards society."}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Leaf,
                title:
                  lang === "si"
                    ? "පුද්ගල මට්ටම"
                    : "Individual Level",
                text:
                  lang === "si"
                    ? "ස්වභාවික සමතුලිතතාවයට බාධා කරන තමන්ගේ ක්‍රියා හඳුනාගෙන ඒවා අවම කරමින් ස්වයං විනයෙන් හා වගකීමෙන් ක්‍රියා කිරීම."
                    : "Identify personal actions that disturb natural balance, reduce them, and act with self-discipline and responsibility.",
              },
              {
                icon: Users,
                title:
                  lang === "si"
                    ? "කණ්ඩායම් මට්ටම"
                    : "Group Level",
                text:
                  lang === "si"
                    ? "එකම අරමුණ හා වගකීම සහිත පුද්ගලයන් එක්ව ස්වභාවධර්මය ආරක්ෂා කිරීම සඳහා සාමූහික දායකත්වයක් ලබාදීම."
                    : "Bring together people with a common purpose and responsibility for collective contribution to nature.",
              },
              {
                icon: Scale,
                title:
                  lang === "si"
                    ? "සමාජ මට්ටම"
                    : "Social Level",
                text:
                  lang === "si"
                    ? "ස්වභාවධර්මය සඳහා ආචාර ධර්ම හා නීතිගරුකභාවය ශක්තිමත් කරන සමාජ මතයක් ගොඩනැගීම."
                    : "Build social awareness that strengthens ethics and lawful responsibility towards nature.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal
                  key={index}
                  delay={index * 0.08}
                >
                  <motion.div
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -6,
                          }
                    }
                    className="h-full rounded-[28px] border border-white/10 bg-white/[0.055] p-6 backdrop-blur-xl transition-colors hover:bg-white/[0.08]"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                      <Icon size={25} />
                    </div>

                    <h3 className="mt-6 text-lg font-black">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-8 text-emerald-50/70">
                      {item.text}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          MEMBERSHIP
      ====================================================== */}

      <section
        id="membership"
        className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
          <div>
            <Reveal>
              <span className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                {lang === "si"
                  ? "සාමාජිකත්වය"
                  : "Membership"}
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                {lang === "si"
                  ? "සොබා ආරක්ෂකයෙකු වන්න"
                  : "Become a Guardian of Nature"}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">
                {lang === "si"
                  ? "ස්වභාවධර්මය ආරක්ෂා කිරීමේ වගකීම පිළිගන්නා ඕනෑම ශ්‍රී ලාංකිකයෙකුට මෙම මෙහෙවරට එක්විය හැක."
                  : "Any Sri Lankan who accepts the responsibility of protecting nature can become part of this mission."}
              </p>
            </Reveal>

            <div className="mt-8 space-y-4">
              {membershipPoints.map(
                (item, index) => (
                  <Reveal
                    key={index}
                    delay={index * 0.06}
                  >
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              x: 4,
                            }
                      }
                      className="flex gap-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.035]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                        <Users size={19} />
                      </div>

                      <p className="text-sm leading-8 text-slate-600 dark:text-slate-300">
                        {text(item, lang)}
                      </p>
                    </motion.div>
                  </Reveal>
                )
              )}
            </div>
          </div>

          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-[32px] border border-emerald-200/70 bg-emerald-50 p-6 shadow-[0_25px_70px_rgba(16,185,129,0.08)] dark:border-emerald-400/10 dark:bg-emerald-500/[0.055] sm:p-8">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-emerald-300/10 blur-3xl" />

              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                    <ShieldCheck size={23} />
                  </div>

                  <h3 className="text-xl font-black text-emerald-950 dark:text-emerald-200 sm:text-2xl">
                    {lang === "si"
                      ? "ස්වභාවධර්මයේ ප්‍රතිඥාව"
                      : "Nature's Pledge"}
                  </h3>
                </div>

                <div className="mt-7 space-y-4">
                  {ethics.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="flex gap-3"
                      >
                        <CheckCircle2
                          size={19}
                          className="mt-1 shrink-0 text-emerald-600 dark:text-emerald-300"
                        />

                        <p className="text-sm leading-8 text-slate-700 dark:text-slate-300">
                          {text(
                            item,
                            lang
                          )}
                        </p>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-7 border-t border-emerald-200/80 pt-6 dark:border-emerald-400/10">
                  <p className="text-sm font-black leading-7 text-emerald-900 dark:text-emerald-200">
                    {lang === "si"
                      ? "සොබා සේනාංකය - සොබාදහම වෙනුවෙන් මනුෂ්‍යත්වයේ ප්‍රතිඥාවයි."
                      : "Soba Senankaya - Humanity's pledge for nature."}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          LATEST ANNOUNCEMENTS
      ====================================================== */}

      <section
        id="message"
        className="relative w-full overflow-hidden bg-slate-100 py-16 dark:bg-white/[0.025] sm:py-24"
      >
        <div className="absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-emerald-300/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                  {lang === "si"
                    ? "ස්වභාවධර්මයේ පණිවිඩය"
                    : "Message of Nature"}
                </span>

                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  {lang === "si"
                    ? "නවතම නිවේදන"
                    : "Latest Announcements"}
                </h2>
              </div>

              <ArrowRight
                className="hidden text-emerald-500 sm:block"
                size={25}
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <LatestAnnouncements />
          </Reveal>

          {/* Subfolders */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                title:
                  lang === "si"
                    ? "මගේ රාජකාරිය"
                    : "My Responsibility",
                text:
                  lang === "si"
                    ? "ස්වභාවධර්මය වෙනුවෙන් පුද්ගල මට්ටමින් කළ හැකි දේ."
                    : "What each of us can do individually for nature.",
                icon: ShieldCheck,
              },
              {
                title:
                  lang === "si"
                    ? "සමාජ මෙහෙවර"
                    : "Social Mission",
                text:
                  lang === "si"
                    ? "සමාජයක් ලෙස ස්වභාවික සමතුලිතතාව වෙනුවෙන් එක්වීම."
                    : "Coming together as a society for natural balance.",
                icon: Users,
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal
                  key={index}
                  delay={0.12 + index * 0.06}
                >
                  <motion.div
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -4,
                          }
                    }
                    className="group flex items-center gap-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.035]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-black">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                        {item.text}
                      </p>
                    </div>

                    <ArrowRight
                      size={19}
                      className="shrink-0 text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-500"
                    />
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          LIVE COMMENTS
      ====================================================== */}

      <section
        id="comments"
        className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
      >
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          {/* Left intro */}
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                <MessageCircle size={14} />
                {lang === "si"
                  ? "සජීවී අදහස්"
                  : "Live Ideas"}
              </span>

              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
                {lang === "si"
                  ? "අදහස් හා යෝජනා"
                  : "Ideas & Suggestions"}
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">
                {lang === "si"
                  ? "ඔබේ අදහසක්, යෝජනාවක් හෝ ස්වභාවධර්මය වෙනුවෙන් කළ හැකි ක්‍රියාවක් අප සමඟ බෙදාගන්න. ඔබ එක් කරන අදහස දාපු ගමන්ම සජීවීව පෙන්වනු ලැබේ."
                  : "Share an idea, suggestion, or action that can help nature. Your contribution appears live as soon as it is submitted."}
              </p>

              <motion.button
                type="button"
                onClick={openCommentModal}
                whileTap={
                  reduceMotion
                    ? undefined
                    : { scale: 0.98 }
                }
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-black text-emerald-950 shadow-[0_15px_45px_rgba(16,185,129,0.18)] transition hover:bg-emerald-400 sm:w-auto"
              >
                <MessageSquare size={18} />

                {lang === "si"
                  ? "ඔබේ අදහස එක් කරන්න"
                  : "Add your idea"}
              </motion.button>
            </Reveal>
          </div>

          {/* Comments */}
          <div>
            <Reveal>
              <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.035] sm:p-6">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-white/5">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                      {comments.length}{" "}
                      {lang === "si"
                        ? "අදහස්"
                        : "Ideas"}
                    </p>

                    <h3 className="mt-1 font-black">
                      {lang === "si"
                        ? "ජනතාවගේ හඬ"
                        : "Community Voices"}
                    </h3>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <MessageCircle size={19} />
                  </div>
                </div>

                {commentsLoading ? (
                  <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 text-slate-500">
                    <Loader2
                      size={27}
                      className="animate-spin text-emerald-500"
                    />

                    <p className="text-sm">
                      {lang === "si"
                        ? "අදහස් ලබාගනිමින්..."
                        : "Loading ideas..."}
                    </p>
                  </div>
                ) : visibleComments.length === 0 ? (
                  <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400 dark:bg-white/5">
                      <MessageCircle size={26} />
                    </div>

                    <h4 className="mt-4 font-black">
                      {lang === "si"
                        ? "තවම අදහස් නැහැ"
                        : "No ideas yet"}
                    </h4>

                    <p className="mt-2 max-w-sm text-sm leading-7 text-slate-500">
                      {lang === "si"
                        ? "පළමු අදහස ඔබගෙන්ම වෙන්න පුළුවන්."
                        : "You could be the first person to share an idea."}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 grid gap-3">
                    <AnimatePresence initial={false}>
                      {visibleComments.map(
                        (comment, index) => (
                          <motion.article
                            key={comment.id}
                            initial={
                              reduceMotion
                                ? false
                                : {
                                    opacity: 0,
                                    y: 12,
                                  }
                            }
                            animate={{
                              opacity: 1,
                              y: 0,
                            }}
                            transition={{
                              duration: 0.35,
                              delay:
                                index *
                                0.025,
                            }}
                            className="rounded-[24px] border border-slate-200/80 bg-slate-50/70 p-4 dark:border-white/5 dark:bg-white/[0.025]"
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                                <Users size={18} />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                  <h4 className="font-black break-words">
                                    {
                                      comment.name
                                    }
                                  </h4>

                                  {index ===
                                    0 && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-black uppercase text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                                      Live
                                    </span>
                                  )}
                                </div>

                                <p className="mt-2 break-words text-sm leading-7 text-slate-600 dark:text-slate-300">
                                  {
                                    comment.comment
                                  }
                                </p>

                                <p className="mt-3 text-[10px] font-medium text-slate-400">
                                  {
                                    comment.created_at
                                  }
                                </p>
                              </div>
                            </div>
                          </motion.article>
                        )
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {comments.length > 12 && (
                  <div className="mt-4 text-center text-xs text-slate-400">
                    {lang === "si"
                      ? "අලුත්ම අදහස් 12 පෙන්වයි."
                      : "Showing the latest 12 ideas."}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =====================================================
          SOCIAL
      ====================================================== */}

      <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <a
              href="#"
              className="group flex items-center justify-between rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.035]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Globe2 size={22} />
                </div>

                <div>
                  <p className="font-black">
                    {lang === "si"
                      ? "Facebook පිටුව"
                      : "Facebook Page"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {lang === "si"
                      ? "අප සමඟ සම්බන්ධ වන්න"
                      : "Connect with us"}
                  </p>
                </div>
              </div>

              <ArrowRight
                size={19}
                className="text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-500"
              />
            </a>
          </Reveal>

          <Reveal delay={0.06}>
            <a
              href="#"
              className="group flex items-center justify-between rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.035]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                  <MessageCircle size={22} />
                </div>

                <div>
                  <p className="font-black">
                    WhatsApp
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {lang === "si"
                      ? "අප සමඟ සම්බන්ධ වන්න"
                      : "Connect with us"}
                  </p>
                </div>
              </div>

              <ArrowRight
                size={19}
                className="text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-500"
              />
            </a>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="border-t border-slate-200 bg-white py-10 dark:border-white/5 dark:bg-[#040a07]">
        <div className="mx-auto w-full max-w-7xl px-5 text-center sm:px-8 lg:px-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 p-2">
            <img
              src="/logo.png"
              alt="සොබා සේනාංකය"
              className="h-full w-full rounded-full object-contain"
            />
          </div>

          <p className="mt-4 text-base font-black">
            {lang === "si"
              ? "සොබා සේනාංකය"
              : "Soba Senankaya"}
          </p>

          <p className="mt-2 text-xs leading-6 text-slate-500">
            {lang === "si"
              ? "සොබාදහම වෙනුවෙන් මනුෂ්‍යත්වයේ වගකීම"
              : "Humanity's responsibility for nature"}
          </p>

          <div className="mx-auto mt-5 h-px max-w-xs bg-slate-200 dark:bg-white/5" />

          <p className="mt-5 text-[11px] text-slate-400">
            © {new Date().getFullYear()}{" "}
            {lang === "si"
              ? "සොබා සේනාංකය"
              : "Soba Senankaya"}
          </p>
        </div>
      </footer>

      {/* =====================================================
          COMMENT MODAL
      ====================================================== */}

      <AnimatePresence>
        {commentModalOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeCommentModal();
              }
            }}
          >
            <motion.div
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 20,
                      scale: 0.97,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 15,
                      scale: 0.98,
                    }
              }
              transition={{
                duration: 0.28,
              }}
              className="w-full max-w-lg overflow-hidden rounded-[30px] border border-white/10 bg-[#09130f] text-white shadow-2xl"
            >
              <div className="border-b border-white/10 bg-emerald-500/[0.06] p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                    <MessageSquare size={23} />
                  </div>

                  <div>
                    <h3 className="text-xl font-black">
                      {lang === "si"
                        ? "ඔබේ අදහස"
                        : "Your Idea"}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {lang === "si"
                        ? "ඔබේ හඬ අපට වැදගත්."
                        : "Your voice matters."}
                    </p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={submitComment}
                className="space-y-5 p-5 sm:p-6"
              >
                <div>
                  <label
                    htmlFor="public-comment-name"
                    className="mb-2 block text-sm font-bold text-slate-300"
                  >
                    {lang === "si"
                      ? "ඔබගේ නම"
                      : "Your name"}
                  </label>

                  <input
                    id="public-comment-name"
                    type="text"
                    maxLength={80}
                    value={commentName}
                    onChange={(event) =>
                      setCommentName(
                        event.target.value
                      )
                    }
                    placeholder={
                      lang === "si"
                        ? "නම ඇතුළත් කරන්න"
                        : "Enter your name"
                    }
                    disabled={
                      commentSubmitting
                    }
                    required
                    className="h-13 w-full rounded-2xl border border-white/10 bg-white/[0.035] px-4 text-white outline-none placeholder:text-slate-600 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/10 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="public-comment-text"
                    className="mb-2 block text-sm font-bold text-slate-300"
                  >
                    {lang === "si"
                      ? "ඔබේ අදහස / යෝජනාව"
                      : "Your idea / suggestion"}
                  </label>

                  <textarea
                    id="public-comment-text"
                    maxLength={1000}
                    rows={6}
                    value={commentText}
                    onChange={(event) =>
                      setCommentText(
                        event.target.value
                      )
                    }
                    placeholder={
                      lang === "si"
                        ? "ඔබේ අදහස මෙතන ලියන්න..."
                        : "Write your idea here..."
                    }
                    disabled={
                      commentSubmitting
                    }
                    required
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 leading-7 text-white outline-none placeholder:text-slate-600 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/10 disabled:opacity-50"
                  />
                </div>

                {commentError && (
                  <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-300">
                    {commentError}
                  </div>
                )}

                {commentSuccess && (
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm leading-6 text-emerald-300">
                    {commentSuccess}
                  </div>
                )}

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeCommentModal}
                    disabled={
                      commentSubmitting
                    }
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/10 disabled:opacity-50"
                  >
                    {lang === "si"
                      ? "අවලංගු කරන්න"
                      : "Cancel"}
                  </button>

                  <button
                    type="submit"
                    disabled={
                      commentSubmitting
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-emerald-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {commentSubmitting ? (
                      <>
                        <Loader2
                          size={18}
                          className="animate-spin"
                        />

                        {lang === "si"
                          ? "එක් කරමින්..."
                          : "Posting..."}
                      </>
                    ) : (
                      <>
                        <MessageSquare
                          size={18}
                        />

                        {lang === "si"
                          ? "සජීවීව එක් කරන්න"
                          : "Post Live"}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
    }
