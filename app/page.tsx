"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

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

/* =========================================================
   TYPES
========================================================= */

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

const text = (
  value: LangText,
  lang: "si" | "en"
) =>
  lang === "si"
    ? value.si
    : value.en;

/* =========================================================
   FACEBOOK PAGE
   Replace this URL with your real Facebook Page URL.
========================================================= */

const facebookPageUrl = "#";

/* =========================================================
   FOUNDATION CONTENT
========================================================= */

const sections = {
  vision: {
    title: {
      si: "දැක්ම",
      en: "Vision",
    },
    icon: TreePine,
    content: {
      si: `සොබා සේනාංකයේ දැක්ම

“සොබා සේනාංකයේ දැක්ම” වන්නේ, මිනිසාගේ පැවැත්මට පමණක් සම්පතක් නොවූ, මිනිසාද ඇතුළත් සමස්ත ජීව පද්ධතියේම පදනම පමණක් වූ, ස්වභාවධර්මය උදෙසා මනුෂ්‍යත්වයේ වගකීම, වගවීම සහ යුතුකම සෑම පුරවැසියෙක් තුළම අවබෝධ කරවීම තුළින්, ස්වයං විනය, ආචාරධර්ම, කරුණාව, සහජීවනය හා සමාජ වගකීම මත පදනම් වූ උතුම් මනුෂ්‍ය මෙහෙවර ඉටු කිරීම උදෙසා මිනිසා පෙළඹවීමත්, ඒ තුලින් ස්වභාවධර්මය පාලනය කිරීමට හෝ සන්තක කර ගැනීමට නොව, එය ගෞරවයෙන් සුරැකීමටත්, සංරක්ෂණය කිරීමටත්, අනාගත පරපුර වෙත සමතුලිතතාවයෙන් යුතු ස්වභාදහමක් සුරක්ෂිතව භාරදීමත්, උදෙසා කැපවූ මනුදමින් පිරිපුන්, ආදර්ශවත් ශ්‍රීලාංකීය සමාජයක් බිහි කිරීමත් ය.

“ස්වභාවධර්මය සුරැකීම යනු පරිසරය සුරැකීම පමණක් නොව, මනුෂ්‍යත්වයේ අනාගතය සුරැකීමයි.”`,
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
      si: `සොබා සේනාංකයේ මෙහෙවර

ස්වභාවධර්මය සුරැකීම සම්බන්ධයෙන් පුද්ගලයාගේ වගකීම හා වගවීම ශක්තිමත් කරමින්, ස්වයං විනයෙන් යුතු පුරවැසියන්ගෙන් සමන්විත සමාජයක් ගොඩනැඟීමත්, එම සමාජ බලය සංවිධානාත්මකව ඒකරාශී කරමින් ශ්‍රීලංකාවේ ස්වභාවික පරිසරයේ සමතුලිතතාවය, ආරක්ෂාව හා යහපැවැත්ම තහවුරු කරවීමට දායක වීමත්, සොබා සේනාංකයේ මෙහෙවර වේ.`,
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

/* =========================================================
   OBJECTIVES
========================================================= */

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

/* =========================================================
   MEMBERSHIP
========================================================= */

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

/* =========================================================
   ETHICS
========================================================= */

const pledge: LangText = {
  si: `සොබා සේනාංකයේ ප්‍රතිඥාව

මා අද දින මේ මොහොතේ සිට, ස්වභාවධර්මයට ගරු කරමින්, අනුගත වෙමින් මේ මහ පොළෝ තලය, වා තලය, සාගරය, ජල සම්පත්, ගහකොළ සහ සියලු ජීවීන්ගේ යහපැවැත්ම සුරැකීමටත්; ස්වකීය වාසිය උදෙසා ස්වභාවධර්මයේ සමතුලිතතාවයට හානි වන කිසිදු ක්‍රියාවක් නොකිරීමටත්, එවැනි ක්‍රියාවකට ක්‍රියාවෙන් හෝ වචනයෙන් අනුබල නොදීමටත්; ස්වභාවධර්මයට සිදුවන හානි වැළැක්වීමට නීත්‍යනුකූලව, සාමකාමීව හා වගකීමෙන්, වගවීමෙන් යුතුව මාගේ හැකි උපරිම දායකත්වය ලබා දීමටත්; ස්වභාවධර්මය සාක්ෂි කොටගෙන, සොබා සේනාංකයේ අරමුණු හා ආචාරධර්මවලට අනුගතව, ස්වයං විනයෙන් හා මනුෂ්‍යත්වයෙන් යුතුව මාගේ මාතෘභූමියේ ආරක්ෂාව උදෙසා කටයුතු කිරීමටත් මෙයින් ප්‍රතිඥා දෙමි. /දිවුරැම් දෙමි.

“සොබා සේනාංකය - සොබාදහම වෙනුවෙන් මනුෂ්‍යත්වයේ ප්‍රතිඥාවයි.”`,
  en: `Soba Senankaya Pledge

From this moment onward, I pledge to respect and live in harmony with nature, and to protect the wellbeing of the earth, atmosphere, oceans, water resources, forests, vegetation, and all living beings; to refrain from any act that harms the balance of nature for my own benefit, and never to support such acts by word or deed; to make my utmost contribution lawfully, peacefully, responsibly, and with accountability to prevent harm to nature; and, with nature as my witness, to uphold the aims and ethics of Soba Senankaya and work with self-discipline and humanity for the protection of my motherland.

“Soba Senankaya - Humanity's pledge for nature.”`,
};

/* =========================================================
   INTRODUCTION LETTER
========================================================= */

const introductionLetter: LangText = {
  si: `දයාබර සහෘදයනි,

"සොබා සේනාංකය"

තවත් එක් සමාජ මාධ්‍ය සමූහයක් නොව,
ඔබත්, මමත් තවත් එක් දරුවෙකු පමණක් වූ
ස්වභාවධර්මයේ මෑණියන් උදෙසා කැප වූ උත්තරීතර
රාජකාරියයි.

එමෙන්ම,

ජාතිය, කුලය, ආගම, පාට පක්ෂ යන කුලකයන්ගෙන් ඔබ්බට
විහිදෙන මනුශ්‍යත්වයේ උපරිම වගකීමයි,වගවීමයි.

……………

සැබවින්ම,

මෙම සමූහය සේනාංකයකි.
ස්වභාවධර්මය උදෙසාම කැප වූ සේනාංකයකි.

අදහස් හුවමාරු කිරීමකට පමණක් නොව,
ක්‍රියාවෙන් ද බලගැන්වූ,
පොදු සමාජ විනය මාලාවක් හුවා දැක්වීමෙන් පමණක් නොව,
පුද්ගලික විනය තුලින් යහපැවැත්ම උදෙසා
මාර්ගෝපදේශ සපයනු ලබන වේදිකාවකි.

…………

දයාබර සහෘදයනි,

සිතන්න...මා, ඔබ ලැබුවාවූ මේ මනුෂ්‍යත්වයට කෙතරම්
සාධාරණයක් අපි ඉටු කර ඇත්ද ?

හෙට මේ මාතෘභූමියේ උපදින අපේ දුවා දරැවනට
ස්වභාවික තුලනයෙන් හෙබි ලස්සන, සුරක්ෂිත රටක්, ලොවක්
අපි ඉතුරු කර ඇත්ද ?

අප දැනටමත් ප්‍රමාද යි.

……………

ස්වභාවධර්මය උදෙසා මනුෂ්‍යත්වයේ වගකීම, වගවීම
නොපිරිහෙලා වහා ඉටුකළ යුතුව ඇත.

තනි තනිව වෙනස් වෙමු.
අවසානයේ සුන්දර ලොවක් ගොඩනැගේවි.

මන්ද, ස්වයං වෙනසකින් තොර, පොදු වෙනසක් අපේක්ෂා කළ
නොහැක.

මෙම සමූහය අනෙකුත් ජාලයන්ගෙන් වෙනස් වන්නේ,
සියලු සාමාජිකයන්ම පාලන ක්‍රියාකරැවන් වන නිසාවෙනි.

……………

ස්වභාවධර්මයේ ආරක්ෂාව උදෙසා
ඔබගේ වටිනා කාලය මදක් කැප කර,
ඔබගේ වටිනා අදහස්, යෝජනා හා දායකත්වය ලබා දෙන්න
මුළු රටම සුවපත් වේවි...!

සුවපත් වූ රටක් තුළ
ස්වභාවධර්මයෙන් සුරක්ෂිත වූ, අනාගතයක් බිහි වේවි…

………….

සොබා සේනාංකයට
සොබා ආරක්ෂකයින් (Guardians) බදවා ගනු ලැබේ.

හැකිනම් එක් කරන්න තවත් ආරක්ෂකයින්.

මන්ද, සියළු ලාංකිකයින් ස්වභාවධර්මයේ ආරක්ෂාව උදෙසා
අවශ්‍යව ඇත.

…………

මෙම සමාජ මාධ්‍ය ජාලය තුළ
එපා කිසිවිටෙක..

වාදයක්, මන්ද ස්වභාවධර්මවාදය සියළු වාදයන්ට ඔබ්බෙනි.

ආගමක්, මන්ද සියළු ශාස්තෘන්ගේ පරම සත්‍යය වු දේශණාව
ස්වභාවධර්මය මයි.

එකම ජාතියක්, සේ එක් වෙමු.

…….

අප සියලු දෙනාගේම අම්මා වන ස්වභාවධර්මය
මේ මොහොතේ අපට කියා දෙමින් සිටින අපූරු පාඩම අවබෝධ
කර ගනිමු.

……………

ප්‍රමාද වීමට තවත් කාලයක් ඉතිරිව නැත.
ප්‍රමාදය පසුතැවීමට හේතු වන බව නිසැකය.

මා එකතු වී සිටිමි, ඔබ...?`,
  en: `Dear friends,

"Soba Senankaya"

is not just another social media group,
but a supreme responsibility dedicated to
Mother Nature — a nature that gave both you and me
the opportunity to exist as human beings.

It is also,

the highest responsibility and accountability of humanity,
stretching beyond the divisions of race, caste, religion,
politics, colour and every other form of separation.

……………

Indeed,

this community is a force.
A force dedicated entirely to nature.

It is not merely a place for exchanging ideas,
but a platform strengthened through action;
not merely a place that speaks about social discipline,
but one that provides guidance for wellbeing
through personal discipline.

…………

Dear friends,

Think...how much justice have we truly
done to the humanity we have received?

Have we left behind for the daughters and sons
who will be born in this motherland tomorrow
a beautiful and safe country, a beautiful world,
blessed with natural balance?

We are already late.

……………

The responsibility and accountability of humanity
towards nature must be fulfilled without delay.

Let us change individually.
In the end, a beautiful world will be built.

Because, without individual change,
a collective change cannot be expected.

This community is different from other networks
because every member is also a responsible actor.

……………

For the protection of nature,
dedicate a little of your valuable time,
and share your valuable ideas, suggestions and contribution.
The whole country will become healthier...!

Within a healthier country,
a future protected by nature will emerge...

………….

Nature Guardians are being recruited
to the Soba Senankaya.

If possible, bring more Guardians with you.

Because all Sri Lankans are needed
for the protection of nature.

…………

Within this social media network,

never allow...

an argument, because naturalism goes beyond all arguments.

a religion, because the ultimate truth taught
by all spiritual teachers is nature itself.

Let us unite as one human race.

…….

Let us understand the wonderful lesson
that Mother Nature, the mother of us all,
is teaching us at this very moment.

……………

There is no more time left for delay.
Delay will certainly lead to regret.

I have joined. What about you...?`,
};

/* =========================================================
   REVEAL
========================================================= */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion =
    useReducedMotion();

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   EXPAND FOUNDATION CARD
========================================================= */

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
      layout
      id={id}
      className="overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_14px_45px_rgba(15,23,42,0.05)] dark:border-white/10 dark:bg-white/[0.035]"
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
                    rotate: [
                      0,
                      -4,
                      4,
                      0,
                    ],
                    scale: [
                      1,
                      1.05,
                      1,
                    ],
                  }
                : {}
            }
            transition={{
              duration: 0.4,
            }}
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
            rotate: open
              ? 180
              : 0,
          }}
          transition={{
            duration: 0.25,
          }}
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
            }}
          >
            <div className="border-t border-slate-100 px-5 pb-6 pt-5 text-sm leading-8 text-slate-600 dark:border-white/5 dark:text-slate-300 sm:px-6 sm:text-base">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* =========================================================
   HOME
========================================================= */

export default function HomePage() {
  const { lang } =
    useLanguage();

  const reduceMotion =
    useReducedMotion();

  /* Foundation folder */
  const [
    openFolder,
    setOpenFolder,
  ] = useState<string | null>(
    "vision"
  );

  /* Message subfolders */
  const [
    openMessageFolder,
    setOpenMessageFolder,
  ] = useState<
    "responsibility" | "social" | null
  >(null);

  /* =======================================================
     INTRODUCTION LETTER
  ======================================================== */

  const [
    introExpanded,
    setIntroExpanded,
  ] = useState(false);

  /* Comments */
  const [comments, setComments] =
    useState<Comment[]>([]);

  const [
    commentsLoading,
    setCommentsLoading,
  ] = useState(true);

  const [
    commentSubmitting,
    setCommentSubmitting,
  ] = useState(false);

  const [
    commentModalOpen,
    setCommentModalOpen,
  ] = useState(false);

  const [commentName, setCommentName] =
    useState("");

  const [
    commentText,
    setCommentText,
  ] = useState("");

  const [
    commentError,
    setCommentError,
  ] = useState("");

  const [
    commentSuccess,
    setCommentSuccess,
  ] = useState("");

  /* =======================================================
     FOLDER HELPERS
  ======================================================== */

  const toggleFolder = (
    id: string
  ) => {
    setOpenFolder(
      (current) =>
        current === id
          ? null
          : id
    );
  };

  const toggleMessageFolder = (
    id:
      | "responsibility"
      | "social"
  ) => {
    setOpenMessageFolder(
      (current) =>
        current === id
          ? null
          : id
    );
  };

  /* =======================================================
     COMMENTS LOAD
  ======================================================== */

  const loadComments = async (
    silent = false
  ) => {
    try {
      if (!silent) {
        setCommentsLoading(
          true
        );
      }

      const response =
        await fetch(
          "/api/comments",
          {
            method: "GET",
            cache: "no-store",
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success ||
        !Array.isArray(
          data.comments
        )
      ) {
        throw new Error(
          data?.message ||
            "Failed to load comments."
        );
      }

      /*
       * Every comment is live.
       * Old pending values are also accepted.
       */
      setComments(
        data.comments
      );
    } catch {
      /*
       * Don't destroy the existing
       * visible list on silent failure.
       */
    } finally {
      if (!silent) {
        setCommentsLoading(
          false
        );
      }
    }
  };

  useEffect(() => {
    loadComments();

    const interval =
      window.setInterval(
        () => {
          loadComments(true);
        },
        12000
      );

    return () => {
      window.clearInterval(
        interval
      );
    };
  }, []);

  /* =======================================================
     COMMENT MODAL
  ======================================================== */

  const openCommentModal =
    () => {
      setCommentError("");
      setCommentSuccess("");
      setCommentModalOpen(true);
    };

  const closeCommentModal =
    () => {
      if (
        commentSubmitting
      ) {
        return;
      }

      setCommentModalOpen(
        false
      );
      setCommentError("");
      setCommentSuccess("");
    };

  /* =======================================================
     COMMENT SUBMIT
  ======================================================== */

  const submitComment = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setCommentError("");
    setCommentSuccess("");

    const name =
      commentName.trim();

    const comment =
      commentText.trim();

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

    setCommentSubmitting(
      true
    );

    try {
      const response =
        await fetch(
          "/api/comments",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              {
                name,
                comment,
              }
            ),
          }
        );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data?.message ||
            "Could not submit your idea."
        );
      }

      /*
       * Immediately put returned comment
       * into the current UI.
       */
      if (
        data.comment
      ) {
        setComments(
          (current) => [
            data.comment,
            ...current,
          ]
        );
      } else {
        await loadComments(
          true
        );
      }

      setCommentName("");
      setCommentText("");

      setCommentSuccess(
        lang === "si"
          ? "ඔබේ අදහස දැන් සජීවීයි. ❤️"
          : "Your idea is now live. ❤️"
      );

      window.setTimeout(
        () => {
          setCommentModalOpen(
            false
          );

          setCommentSuccess(
            ""
          );
        },
        1100
      );
    } catch (error) {
      setCommentError(
        error instanceof Error
          ? error.message
          : lang === "si"
          ? "අදහස එක් කිරීමට නොහැකි විය."
          : "Could not submit your idea."
      );
    } finally {
      setCommentSubmitting(
        false
      );
    }
  };

  const visibleComments =
    useMemo(
      () =>
        comments.slice(
          0,
          12
        ),
      [comments]
    );

  /*
   * Message folder content.
   */
  const messageFolders = [
    {
      id: "responsibility" as const,
      title:
        lang === "si"
          ? "මගේ රාජකාරිය"
          : "My Responsibility",
      icon: ShieldCheck,
      shortText:
        lang === "si"
          ? "ස්වභාවධර්මය වෙනුවෙන් පුද්ගල මට්ටමින් කළ හැකි දේ."
          : "What each of us can do individually for nature.",
      content:
        lang === "si"
          ? "ස්වභාවික සමතුලිතතාවයට බාධා කරන තමන්ගේ ක්‍රියා හඳුනාගෙන ඒවා අවම කිරීම, ස්වයං විනයෙන් හා වගකීමෙන් ක්‍රියා කිරීම සහ ස්වභාවධර්මයට හානි නොකර ජීවත්වීම මගේ රාජකාරියේ මූලික කොටසයි."
          : "My responsibility begins with identifying personal actions that disturb natural balance, reducing them, acting with self-discipline, and choosing to live without harming nature.",
    },
    {
      id: "social" as const,
      title:
        lang === "si"
          ? "සමාජ මෙහෙවර"
          : "Social Mission",
      icon: Users,
      shortText:
        lang === "si"
          ? "සමාජයක් ලෙස ස්වභාවික සමතුලිතතාව වෙනුවෙන් එක්වීම."
          : "Coming together as a society for natural balance.",
      content:
        lang === "si"
          ? "එකම අරමුණ හා වගකීම සහිත පුද්ගලයන් එක්ව ස්වභාවධර්මය ආරක්ෂා කිරීම, සමාජ වගකීම ශක්තිමත් කිරීම සහ ස්වභාවික සමතුලිතතාව වෙනුවෙන් සමාජයක් ලෙස ක්‍රියා කිරීම සමාජ මෙහෙවරේ අරමුණයි."
          : "The social mission is to bring together people with a common responsibility, strengthen social awareness, protect nature collectively, and act as a society for natural balance.",
    },
  ];

  return (
    <main className="w-full overflow-x-hidden bg-[#f6f9f7] text-slate-900 dark:bg-[#06100c] dark:text-white">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative isolate min-h-[650px] overflow-hidden sm:min-h-[700px]">
        {/*
          Fixed natural background layers.
          Mobile and desktop use separate waterfall images while the
          background remains visually anchored as the hero content scrolls.
        */}
        <motion.div
          className="absolute inset-0 -z-30 bg-cover bg-center bg-fixed md:hidden"
          initial={
            reduceMotion
              ? false
              : {
                  scale: 1.06,
                }
          }
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: 1,
                }
          }
          transition={{
            duration: 1.8,
            ease: "easeOut",
          }}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=1400&q=90')",
          }}
        />

        <motion.div
          className="absolute inset-0 -z-30 hidden bg-cover bg-center bg-fixed md:block"
          initial={
            reduceMotion
              ? false
              : {
                  scale: 1.06,
                }
          }
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: 1,
                }
          }
          transition={{
            duration: 1.8,
            ease: "easeOut",
          }}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=2200&q=90')",
          }}
        />

        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-[#03100b]/95 via-[#06150e]/75 to-[#07130d]/30" />

        <div className="absolute inset-0 -z-20 bg-gradient-to-t from-[#03100b] via-transparent to-[#03100b]/25" />

        {/* Soft animated glow */}
        <motion.div
          className="absolute left-[-80px] top-[20%] -z-10 h-64 w-64 rounded-full bg-emerald-400/10 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : {
                  x: [
                    0,
                    35,
                    0,
                  ],
                  y: [
                    0,
                    20,
                    0,
                  ],
                }
          }
          transition={{
            duration: 10,
            repeat:
              Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Less vertical space under header */}
        <div className="mx-auto flex min-h-[650px] w-full max-w-7xl items-center px-5 pb-20 pt-10 sm:min-h-[700px] sm:px-8 sm:pt-12 lg:px-10">
          <div className="w-full max-w-5xl">
            <Reveal>
              <motion.div
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -2,
                      }
                }
                className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2 pr-4 text-sm font-bold text-white backdrop-blur-xl"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/10">
                  <img
                    src="/logo.png"
                    alt="සොබා සේනාංකය"
                    className="h-8 w-8 rounded-full object-contain"
                  />
                </div>

                <span>
                  {lang ===
                  "si"
                    ? "සොබා සේනාංකය"
                    : "Soba Senankaya"}
                </span>

                <Sparkles
                  size={15}
                  className="text-emerald-300"
                />
              </motion.div>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-emerald-300 sm:text-sm">
                {lang ===
                "si"
                  ? "ස්වභාවය • මනුෂ්‍යත්වය • වගකීම"
                  : "Nature • Humanity • Responsibility"}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="max-w-5xl text-[3.15rem] font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl lg:text-[5.4rem]">
                {lang === "si" ? (
                  <>
                    <span className="block">
                      සොබා සේනාංකය
                    </span>

                    <span className="mt-1 block text-emerald-300">
                      ස්වභාදහම උදෙසා
                    </span>

                    <span className="block">
                      මනුෂ්‍යයත්වයේ මෙහෙවර.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block">
                      Soba Senankaya
                    </span>

                    <span className="mt-1 block text-emerald-300">
                      Humanity's mission
                    </span>

                    <span className="block">
                      for nature.
                    </span>
                  </>
                )}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                {lang ===
                "si"
                  ? "ස්වභාවධර්මය සුරැකීම යනු පරිසරය සුරැකීම පමණක් නොව, මනුෂ්‍යත්වයේ අනාගතය සුරැකීමයි."
                  : "Protecting nature is not only about protecting the environment; it is about protecting the future of humanity."}
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#about"
                  className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-400 px-6 py-3.5 text-sm font-black text-emerald-950 transition hover:bg-emerald-300"
                >
                  {lang ===
                  "si"
                    ? "අප ගැන දැනගන්න"
                    : "Discover our mission"}

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </a>

                <a
                  href="#comments"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-xl transition hover:bg-white/15"
                >
                  <MessageCircle size={17} />

                  {lang ===
                  "si"
                    ? "ඔබේ අදහස"
                    : "Your idea"}
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/65"
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [
                    0,
                    7,
                    0,
                  ],
                }
          }
          transition={{
            duration: 2.2,
            repeat:
              Infinity,
          }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </section>

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section
        id="about"
        className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
      >
        <Reveal className="mx-auto w-full max-w-5xl">
          <div className="relative overflow-hidden rounded-[34px] border border-emerald-200/70 bg-white shadow-[0_25px_90px_rgba(15,23,42,0.10)] dark:border-emerald-400/10 dark:bg-[#0a1711]">
            {/* Letter top decoration */}
            <div className="absolute left-0 right-0 top-0 h-1.5 bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-700" />

            <div className="px-6 py-8 sm:px-10 sm:py-11 lg:px-16 lg:py-14">
              {/* Heading */}
              <div className="mx-auto max-w-3xl text-center">
                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <Leaf size={14} />

                  {lang ===
                  "si"
                    ? "හැඳින්වීම"
                    : "Introduction"}
                </span>

                <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  {lang ===
                  "si"
                    ? "ස්වභාවධර්මය වෙනුවෙන් එක්වන මනුෂ්‍යත්වය"
                    : "Humanity united for nature"}
                </h2>

                <div className="mx-auto mt-5 h-px w-20 bg-emerald-300 dark:bg-emerald-500/40" />
              </div>

              {/* Letter */}
              <div className="mx-auto mt-9 max-w-3xl">
                <div className="relative rounded-[28px] border border-slate-200 bg-[#fcfdfc] px-6 py-8 shadow-inner dark:border-white/10 dark:bg-white/[0.02] sm:px-10 sm:py-10">
                  {/* Paper styling */}
                  <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.045),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.035),transparent_30%)]" />

                  <div className="relative">
                    <div
                      className={`overflow-hidden text-center transition-all duration-500 ${
                        introExpanded
                          ? "max-h-[5000px]"
                          : "max-h-[520px]"
                      }`}
                    >
                      <div className="whitespace-pre-line text-[15px] leading-[2.05] tracking-[0.005em] text-slate-700 dark:text-slate-300 sm:text-base sm:leading-[2.15]">
                        {text(
                          introductionLetter,
                          lang
                        )}
                      </div>

                      {!introExpanded && (
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fcfdfc] via-[#fcfdfc]/90 to-transparent dark:from-[#0b1711] dark:via-[#0b1711]/90" />
                      )}
                    </div>

                    {/* Read More */}
                    <div className="relative mt-5 flex justify-center">
                      <motion.button
                        type="button"
                        onClick={() =>
                          setIntroExpanded(
                            (current) =>
                              !current
                          )
                        }
                        whileTap={
                          reduceMotion
                            ? undefined
                            : {
                                scale:
                                  0.97,
                              }
                        }
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-black text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-100 dark:border-emerald-400/10 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/15"
                      >
                        {introExpanded
                          ? lang ===
                            "si"
                            ? "Read Less"
                            : "Read Less"
                          : lang ===
                            "si"
                          ? "Read More"
                          : "Read More"}

                        <motion.span
                          animate={{
                            rotate:
                              introExpanded
                                ? 180
                                : 0,
                          }}
                          transition={{
                            duration:
                              0.25,
                          }}
                        >
                          <ChevronDown
                            size={
                              17
                            }
                          />
                        </motion.span>
                      </motion.button>
                    </div>

                    {/* Final Facebook Join */}
                    <AnimatePresence>
                      {introExpanded && (
                        <motion.div
                          initial={
                            reduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  y: 15,
                                }
                          }
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration:
                              0.45,
                          }}
                          className="mt-9"
                        >
                          <div className="mx-auto h-px max-w-md bg-slate-200 dark:bg-white/10" />

                          <div className="pt-8 text-center">
                            <p className="text-sm font-bold leading-7 text-slate-500 dark:text-slate-400 sm:text-base">
                              {lang ===
                              "si"
                                ? "සොබාදහම වෙනුවෙන් අප සමඟ එක්වන්න."
                                : "Join us in standing for nature."}
                            </p>

                            <a
                              href={
                                facebookPageUrl
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group mt-5 inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-7 py-4 text-sm font-black text-emerald-950 shadow-[0_14px_35px_rgba(16,185,129,0.20)] transition hover:-translate-y-0.5 hover:bg-emerald-400"
                            >
                              <Globe2
                                size={
                                  19
                                }
                              />

                              <span>
                                {lang ===
                                "si"
                                  ? "සොබාදහමට එක්වන්න"
                                  : "Join Nature's Movement"}
                              </span>

                              <ArrowRight
                                size={
                                  18
                                }
                                className="transition-transform group-hover:translate-x-1"
                              />
                            </a>

                            <p className="mt-3 text-[11px] text-slate-400">
                              {lang ===
                              "si"
                                ? "Facebook Page වෙත පිවිසෙන්න"
                                : "Join us on Facebook"}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Existing intro highlight kept */}
              <div className="mx-auto mt-7 max-w-3xl rounded-[26px] border border-emerald-200/70 bg-emerald-50 p-5 dark:border-emerald-400/10 dark:bg-emerald-500/[0.06]">
                <div className="flex items-start justify-center gap-4 text-center">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                    <HeartHandshake size={22} />
                  </div>

                  <p className="text-sm font-bold leading-7 text-emerald-900 dark:text-emerald-200 sm:text-base">
                    {lang ===
                    "si"
                      ? "තනි තනිව වෙනස් වෙමු. අවසානයේ සුන්දර ලොවක් ගොඩනැගේවි."
                      : "Let us change individually. Together, a beautiful world can be built."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          FOUNDATION
      ====================================================== */}

      <section className="relative w-full overflow-hidden bg-white py-16 dark:bg-[#08130f] sm:py-24">
        <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
              {lang ===
              "si"
                ? "අපගේ පදනම"
                : "Our Foundation"}
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              {lang ===
              "si"
                ? "දැක්ම • මෙහෙවර • ප්‍රධාන අරමුණ"
                : "Vision • Mission • Purpose"}
            </h2>
          </Reveal>

          <div className="mt-9 space-y-4">
            {Object.entries(
              sections
            ).map(
              (
                [
                  id,
                  section,
                ],
                index
              ) => (
                <Reveal
                  key={id}
                  delay={
                    index *
                    0.05
                  }
                >
                  <ExpandCard
                    id={id}
                    title={text(
                      section.title,
                      lang
                    )}
                    icon={
                      section.icon
                    }
                    content={text(
                      section.content,
                      lang
                    )}
                    open={
                      openFolder ===
                      id
                    }
                    onClick={() =>
                      toggleFolder(
                        id
                      )
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
          <span className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
            {lang ===
            "si"
              ? "අපගේ අරමුණු"
              : "Our Objectives"}
          </span>

          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            {lang ===
            "si"
              ? "ස්වභාවික සමතුලිතතාව වෙනුවෙන්"
              : "For natural balance"}
          </h2>
        </Reveal>

        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {objectives.map(
            (
              item,
              index
            ) => (
              <Reveal
                key={index}
                delay={
                  index *
                  0.04
                }
              >
                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -4,
                        }
                  }
                  className="group flex h-full gap-4 rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.04)] dark:border-white/10 dark:bg-white/[0.035]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <CheckCircle2
                      size={21}
                    />
                  </div>

                  <p className="text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">
                    {text(
                      item,
                      lang
                    )}
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
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
              <Sprout size={28} />
            </div>

            <h2 className="mt-5 text-3xl font-black sm:text-4xl">
              {lang ===
              "si"
                ? "ක්‍රියාකාරී ව්‍යුහය"
                : "Action Structure"}
            </h2>

            <p className="mt-4 text-sm leading-8 text-emerald-50/70 sm:text-base">
              {lang ===
              "si"
                ? "ස්වභාවධර්මය වෙනුවෙන් වෙනස පුද්ගලයාගෙන් ආරම්භ වී සමාජය දක්වා ගමන් කරයි."
                : "Change for nature begins with the individual and grows towards society."}
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Leaf,
                title:
                  lang ===
                  "si"
                    ? "පුද්ගල මට්ටම"
                    : "Individual Level",
                text:
                  lang ===
                  "si"
                    ? "ස්වභාවික සමතුලිතතාවයට බාධා කරන තමන්ගේ ක්‍රියා හඳුනාගෙන ඒවා අවම කරමින් ස්වයං විනයෙන් හා වගකීමෙන් ක්‍රියා කිරීම."
                    : "Identify personal actions that disturb natural balance, reduce them, and act with self-discipline and responsibility.",
              },
              {
                icon: Users,
                title:
                  lang ===
                  "si"
                    ? "කණ්ඩායම් මට්ටම"
                    : "Group Level",
                text:
                  lang ===
                  "si"
                    ? "එකම අරමුණ හා වගකීම සහිත පුද්ගලයන් එක්ව ස්වභාවධර්මය ආරක්ෂා කිරීම සඳහා සාමූහික දායකත්වයක් ලබාදීම."
                    : "Bring together people with a common purpose and responsibility for collective contribution to nature.",
              },
              {
                icon: Scale,
                title:
                  lang ===
                  "si"
                    ? "සමාජ මට්ටම"
                    : "Social Level",
                text:
                  lang ===
                  "si"
                    ? "ස්වභාවධර්මය සඳහා ආචාර ධර්ම හා නීතිගරුකභාවය ශක්තිමත් කරන සමාජ මතයක් ගොඩනැගීම."
                    : "Build social awareness that strengthens ethics and lawful responsibility towards nature.",
              },
            ].map(
              (
                item,
                index
              ) => {
                const Icon =
                  item.icon;

                return (
                  <Reveal
                    key={
                      index
                    }
                    delay={
                      index *
                      0.07
                    }
                  >
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -5,
                            }
                      }
                      className="h-full rounded-[28px] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                        <Icon
                          size={
                            25
                          }
                        />
                      </div>

                      <h3 className="mt-6 text-lg font-black">
                        {
                          item.title
                        }
                      </h3>

                      <p className="mt-3 text-sm leading-8 text-emerald-50/70">
                        {
                          item.text
                        }
                      </p>
                    </motion.div>
                  </Reveal>
                );
              }
            )}
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
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <Reveal>
              <span className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                {lang ===
                "si"
                  ? "සාමාජිකත්වය"
                  : "Membership"}
              </span>

              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                {lang ===
                "si"
                  ? "සොබා ආරක්ෂකයෙකු වන්න"
                  : "Become a Guardian of Nature"}
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">
                {lang ===
                "si"
                  ? "ස්වභාවධර්මය ආරක්ෂා කිරීමේ වගකීම පිළිගන්නා ඕනෑම ශ්‍රී ලාංකිකයෙකුට මෙම මෙහෙවරට එක්විය හැක."
                  : "Any Sri Lankan who accepts the responsibility of protecting nature can become part of this mission."}
              </p>
            </Reveal>

            <div className="mt-8 space-y-4">
              {membershipPoints.map(
                (
                  item,
                  index
                ) => (
                  <Reveal
                    key={
                      index
                    }
                    delay={
                      index *
                      0.05
                    }
                  >
                    <div className="flex gap-4 rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/[0.035]">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                        <Users
                          size={
                            19
                          }
                        />
                      </div>

                      <p className="text-sm leading-8 text-slate-600 dark:text-slate-300">
                        {text(
                          item,
                          lang
                        )}
                      </p>
                    </div>
                  </Reveal>
                )
              )}
            </div>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[32px] border border-emerald-200/70 bg-emerald-50 p-6 dark:border-emerald-400/10 dark:bg-emerald-500/[0.05] sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  <ShieldCheck
                    size={23}
                  />
                </div>

                <h3 className="text-xl font-black text-emerald-950 dark:text-emerald-200 sm:text-2xl">
                  {lang ===
                  "si"
                    ? "සොබා සේනාංකයේ ප්‍රතිඥාව"
                    : "Soba Senankaya Pledge"}
                </h3>
              </div>

              <div className="mt-7 rounded-[24px] border border-emerald-200/60 bg-white/60 p-5 dark:border-emerald-400/10 dark:bg-white/[0.025] sm:p-7">
                <p className="whitespace-pre-line text-sm leading-8 text-slate-700 dark:text-slate-300 sm:text-base sm:leading-9">
                  {text(
                    pledge,
                    lang
                  )}
                </p>
              </div>

              <div className="mt-7 border-t border-emerald-200 pt-6 dark:border-emerald-400/10">
                <div className="text-center">
                  <a
                    href={
                      facebookPageUrl
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-7 py-4 text-sm font-black text-emerald-950 shadow-[0_14px_35px_rgba(16,185,129,0.20)] transition hover:-translate-y-0.5 hover:bg-emerald-400"
                  >
                    <Globe2
                      size={
                        19
                      }
                    />

                    <span>
                      {lang ===
                      "si"
                        ? "Facebook වෙත එක්වන්න"
                        : "Join us on Facebook"}
                    </span>

                    <ArrowRight
                      size={
                        18
                      }
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </a>

                  <p className="mt-3 text-[11px] text-slate-400">
                    {lang ===
                    "si"
                      ? "සොබා සේනාංකය සමඟ එක්වන්න"
                      : "Join the Soba Senankaya community"}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          MESSAGE OF NATURE
      ====================================================== */}

      <section
        id="message"
        className="relative w-full overflow-hidden bg-slate-100 py-16 dark:bg-[#07120d] sm:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <Reveal>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="text-sm font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                  {lang ===
                  "si"
                    ? "ස්වභාවධර්මයේ පණිවිඩය"
                    : "Message of Nature"}
                </span>

                <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                  {lang ===
                  "si"
                    ? "නවතම නිවේදන"
                    : "Latest Announcements"}
                </h2>
              </div>

              <ArrowRight
                size={25}
                className="text-emerald-500"
              />
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <LatestAnnouncements />
          </Reveal>

          {/* Interactive subfolders */}
          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {messageFolders.map(
              (
                item,
                index
              ) => {
                const Icon =
                  item.icon;

                const open =
                  openMessageFolder ===
                  item.id;

                return (
                  <Reveal
                    key={
                      item.id
                    }
                    delay={
                      index *
                      0.05
                    }
                  >
                    <motion.div
                      layout
                      className={`overflow-hidden rounded-[28px] border bg-white shadow-[0_14px_45px_rgba(15,23,42,0.05)] transition-colors dark:bg-white/[0.035] ${
                        open
                          ? "border-emerald-300 dark:border-emerald-400/20"
                          : "border-slate-200 dark:border-white/10"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          toggleMessageFolder(
                            item.id
                          )
                        }
                        className="group flex w-full items-center gap-4 p-5 text-left"
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                          <Icon
                            size={
                              22
                            }
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-black text-slate-900 dark:text-white sm:text-lg">
                            {
                              item.title
                            }
                          </h3>

                          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                            {
                              item.shortText
                            }
                          </p>
                        </div>

                        <motion.div
                          animate={{
                            rotate:
                              open
                                ? 90
                                : 0,
                          }}
                          className="shrink-0 text-emerald-500"
                        >
                          <ArrowRight
                            size={
                              21
                            }
                          />
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
                              height:
                                "auto",
                              opacity: 1,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                            }}
                            transition={{
                              duration:
                                0.3,
                            }}
                          >
                            <div className="border-t border-slate-100 px-5 pb-6 pt-5 dark:border-white/5">
                              <p className="text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">
                                {
                                  item.content
                                }
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Reveal>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          LIVE COMMENTS
      ====================================================== */}

      <section
        id="comments"
        className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
      >
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
              <MessageCircle
                size={14}
              />
              {lang ===
              "si"
                ? "සජීවී අදහස්"
                : "Live Ideas"}
            </span>

            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              {lang ===
              "si"
                ? "අදහස් හා යෝජනා"
                : "Ideas & Suggestions"}
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-8 text-slate-600 dark:text-slate-300 sm:text-base">
              {lang ===
              "si"
                ? "ඔබේ අදහසක්, යෝජනාවක් හෝ ස්වභාවධර්මය වෙනුවෙන් කළ හැකි ක්‍රියාවක් අප සමඟ බෙදාගන්න. ඔබ එක් කරන අදහස දාපු ගමන්ම සජීවීව පෙන්වනු ලැබේ."
                : "Share an idea, suggestion, or action that can help nature. Your contribution appears live as soon as it is submitted."}
            </p>

            <motion.button
              type="button"
              onClick={
                openCommentModal
              }
              whileTap={
                reduceMotion
                  ? undefined
                  : {
                      scale:
                        0.98,
                    }
              }
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-black text-emerald-950 transition hover:bg-emerald-400 sm:w-auto"
            >
              <MessageSquare
                size={
                  18
                }
              />

              {lang ===
              "si"
                ? "ඔබේ අදහස එක් කරන්න"
                : "Add your idea"}
            </motion.button>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[30px] border border-slate-200 bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.035] sm:p-6">
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-white/5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-600 dark:text-emerald-400">
                    {comments.length}{" "}
                    {lang ===
                    "si"
                      ? "අදහස්"
                      : "Ideas"}
                  </p>

                  <h3 className="mt-1 font-black">
                    {lang ===
                    "si"
                      ? "ජනතාවගේ හඬ"
                      : "Community Voices"}
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                  <MessageCircle
                    size={
                      19
                    }
                  />
                </div>
              </div>

              {commentsLoading ? (
                <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 text-slate-500">
                  <Loader2
                    size={
                      27
                    }
                    className="animate-spin text-emerald-500"
                  />

                  <p className="text-sm">
                    {lang ===
                    "si"
                      ? "අදහස් ලබාගනිමින්..."
                      : "Loading ideas..."}
                  </p>
                </div>
              ) : visibleComments.length ===
                0 ? (
                <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400 dark:bg-white/5">
                    <MessageCircle
                      size={
                        26
                      }
                    />
                  </div>

                  <h4 className="mt-4 font-black">
                    {lang ===
                    "si"
                      ? "තවම අදහස් නැහැ"
                      : "No ideas yet"}
                  </h4>

                  <p className="mt-2 text-sm leading-7 text-slate-500">
                    {lang ===
                    "si"
                      ? "පළමු අදහස ඔබගෙන්ම වෙන්න පුළුවන්."
                      : "You could be the first person to share an idea."}
                  </p>
                </div>
              ) : (
                <div className="mt-4 grid gap-3">
                  <AnimatePresence initial={false}>
                    {visibleComments.map(
                      (
                        comment,
                        index
                      ) => (
                        <motion.article
                          key={
                            comment.id
                          }
                          initial={
                            reduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  y: 10,
                                }
                          }
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          className="rounded-[24px] border border-slate-200/80 bg-slate-50/70 p-4 dark:border-white/5 dark:bg-white/[0.025]"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                              <Users
                                size={
                                  18
                                }
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
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

                              <p className="mt-3 text-[10px] text-slate-400">
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

              {comments.length >
                12 && (
                <p className="mt-4 text-center text-xs text-slate-400">
                  {lang ===
                  "si"
                    ? "නවතම අදහස් 12 පෙන්වයි."
                    : "Showing the latest 12 ideas."}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          SOCIAL LINKS
      ====================================================== */}

      <section className="mx-auto w-full max-w-7xl px-5 pb-16 sm:px-8 sm:pb-24 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <a
              href={
                facebookPageUrl
              }
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.035]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                  <Globe2
                    size={22}
                  />
                </div>

                <div>
                  <p className="font-black">
                    {lang ===
                    "si"
                      ? "Facebook පිටුව"
                      : "Facebook Page"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {lang ===
                    "si"
                      ? "අප සමඟ සම්බන්ධ වන්න"
                      : "Connect with us"}
                  </p>
                </div>
              </div>

              <ArrowRight
                size={
                  19
                }
                className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-emerald-500"
              />
            </a>
          </Reveal>

          <Reveal delay={0.05}>
            <a
              href="#"
              className="group flex items-center justify-between rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.035]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                  <MessageCircle
                    size={22}
                  />
                </div>

                <div>
                  <p className="font-black">
                    WhatsApp
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {lang ===
                    "si"
                      ? "අප සමඟ සම්බන්ධ වන්න"
                      : "Connect with us"}
                  </p>
                </div>
              </div>

              <ArrowRight
                size={
                  19
                }
                className="text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-emerald-500"
              />
            </a>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          NO FOOTER HERE
          Footer.tsx will be added separately.
      ====================================================== */}

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
            onMouseDown={(
              event
            ) => {
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
              transition={{
                duration:
                  0.28,
              }}
              className="w-full max-w-lg overflow-hidden rounded-[30px] border border-white/10 bg-[#09130f] text-white shadow-2xl"
            >
              <div className="border-b border-white/10 bg-emerald-500/[0.06] p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-300">
                    <MessageSquare
                      size={
                        23
                      }
                    />
                  </div>

                  <div>
                    <h3 className="text-xl font-black">
                      {lang ===
                      "si"
                        ? "ඔබේ අදහස"
                        : "Your Idea"}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                      {lang ===
                      "si"
                        ? "ඔබේ හඬ අපට වැදගත්."
                        : "Your voice matters."}
                    </p>
                  </div>
                </div>
              </div>

              <form
                onSubmit={
                  submitComment
                }
                className="space-y-5 p-5 sm:p-6"
              >
                <div>
                  <label
                    htmlFor="public-comment-name"
                    className="mb-2 block text-sm font-bold text-slate-300"
                  >
                    {lang ===
                    "si"
                      ? "ඔබගේ නම"
                      : "Your name"}
                  </label>

                  <input
                    id="public-comment-name"
                    type="text"
                    maxLength={
                      80
                    }
                    value={
                      commentName
                    }
                    onChange={(
                      event
                    ) =>
                      setCommentName(
                        event
                          .target
                          .value
                      )
                    }
                    placeholder={
                      lang ===
                      "si"
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
                    {lang ===
                    "si"
                      ? "ඔබේ අදහස / යෝජනාව"
                      : "Your idea / suggestion"}
                  </label>

                  <textarea
                    id="public-comment-text"
                    maxLength={
                      1000
                    }
                    rows={
                      6
                    }
                    value={
                      commentText
                    }
                    onChange={(
                      event
                    ) =>
                      setCommentText(
                        event
                          .target
                          .value
                      )
                    }
                    placeholder={
                      lang ===
                      "si"
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
                    {
                      commentError
                    }
                  </div>
                )}

                {commentSuccess && (
                  <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm leading-6 text-emerald-300">
                    {
                      commentSuccess
                    }
                  </div>
                )}

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={
                      closeCommentModal
                    }
                    disabled={
                      commentSubmitting
                    }
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-300 transition hover:bg-white/10 disabled:opacity-50"
                  >
                    {lang ===
                    "si"
                      ? "අවලංගු කරන්න"
                      : "Cancel"}
                  </button>

                  <button
                    type="submit"
                    disabled={
                      commentSubmitting
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-black text-emerald-950 transition hover:bg-emerald-400 disabled:opacity-60"
                  >
                    {commentSubmitting ? (
                      <>
                        <Loader2
                          size={
                            18
                          }
                          className="animate-spin"
                        />

                        {lang ===
                        "si"
                          ? "එක් කරමින්..."
                          : "Posting..."}
                      </>
                    ) : (
                      <>
                        <MessageSquare
                          size={
                            18
                          }
                        />

                        {lang ===
                        "si"
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
