"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Copy,
  Share2,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function ShareButton() {
  const { lang } = useLanguage();

  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const sharePage = async () => {
    if (sharing) return;

    setSharing(true);
    setCopied(false);

    const url = window.location.href;

    const shareTitle =
      lang === "si"
        ? "සොබා සේනාංකය"
        : "Soba Senankaya";

    const shareText =
      lang === "si"
        ? "සොබාදහම වෙනුවෙන් මනුෂ්‍යත්වයේ වගකීම හා වගවීම වෙනුවෙන් එක්වන සොබා සේනාංකය සමඟ එක්වන්න. 🌿❤️"
        : "Join Soba Senankaya — a social mission bringing people together for humanity's responsibility towards nature. 🌿❤️";

    try {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
      } catch {
        const textArea =
          document.createElement("textarea");

        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        textArea.style.pointerEvents = "none";

        document.body.appendChild(textArea);

        textArea.focus();
        textArea.select();

        try {
          document.execCommand("copy");
        } catch {
        }

        document.body.removeChild(textArea);

        setCopied(true);
      }

      if (
        typeof navigator.share === "function"
      ) {
        try {
          await navigator.share({
            title: shareTitle,
            text: shareText,
            url,
          });
        } catch (error) {
          if (
            error instanceof DOMException &&
            error.name === "AbortError"
          ) {
            return;
          }
        }
      }
    } finally {
      setSharing(false);

      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[450] sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {copied && (
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
              scale: 0.94,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.94,
            }}
            transition={{
              duration: 0.22,
            }}
            className="absolute bottom-[calc(100%+10px)] right-0 whitespace-nowrap rounded-full border border-emerald-300/20 bg-[#07130e]/95 px-3.5 py-2 text-[11px] font-bold text-emerald-200 shadow-[0_12px_35px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          >
            <span className="flex items-center gap-2">
              <Check size={14} className="text-emerald-300" />

              {lang === "si"
                ? "Link එක Copy කළා"
                : "Link copied"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={sharePage}
        disabled={sharing}
        whileHover={{
          scale: 1.045,
          y: -2,
        }}
        whileTap={{
          scale: 0.94,
        }}
        aria-label={
          lang === "si"
            ? "වෙබ් අඩවිය Share කරන්න"
            : "Share this website"
        }
        className="
          group
          relative
          flex
          h-14
          w-14
          items-center
          justify-center
          overflow-hidden
          rounded-full
          border
          border-emerald-300/20
          bg-[#07130e]/92
          text-emerald-300
          shadow-[0_14px_45px_rgba(0,0,0,0.30),0_0_35px_rgba(16,185,129,0.10)]
          backdrop-blur-2xl
          transition-all
          duration-300
          hover:border-emerald-300/40
          hover:bg-[#0a1b14]/95
          hover:text-emerald-200
          disabled:cursor-not-allowed
          disabled:opacity-70
          sm:h-16
          sm:w-16
        "
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/10 via-transparent to-lime-300/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <motion.span
          className="absolute inset-0 rounded-full border border-emerald-300/10"
          animate={
            sharing
              ? {
                  scale: [1, 1.14, 1],
                  opacity: [0.15, 0.5, 0.15],
                }
              : {
                  scale: [1, 1.04, 1],
                  opacity: [0.12, 0.28, 0.12],
                }
          }
          transition={{
            duration: sharing ? 1.1 : 3.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.span
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-emerald-950 shadow-lg"
          animate={{
            rotate: [0, 8, -8, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Sparkles size={10} />
        </motion.span>

        <AnimatePresence mode="wait" initial={false}>
          {sharing ? (
            <motion.div
              key="sharing"
              initial={{
                opacity: 0,
                rotate: -30,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotate: 30,
                scale: 0.7,
              }}
              transition={{
                duration: 0.18,
              }}
              className="relative z-10"
            >
              <Share2
                size={23}
                className="animate-pulse"
              />
            </motion.div>
          ) : copied ? (
            <motion.div
              key="copied"
              initial={{
                opacity: 0,
                scale: 0.7,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.7,
              }}
              transition={{
                duration: 0.18,
              }}
              className="relative z-10"
            >
              <Check size={23} />
            </motion.div>
          ) : (
            <motion.div
              key="share"
              initial={{
                opacity: 0,
                scale: 0.85,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.85,
              }}
              transition={{
                duration: 0.18,
              }}
              className="relative z-10"
            >
              <Share2
                size={23}
                className="transition-transform duration-300 group-hover:rotate-6"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <div className="pointer-events-none absolute -inset-1 rounded-full opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />

      <div className="pointer-events-none absolute bottom-0 right-full mr-3 hidden sm:block">
        <div className="rounded-full border border-white/5 bg-black/20 px-3 py-1.5 text-[9px] font-bold text-white/0 backdrop-blur-md transition-all duration-300">
          {lang === "si"
            ? "Share"
            : "Share"}
        </div>
      </div>
    </div>
  );
}
