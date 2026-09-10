"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Share2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const SITE_URL = "https://ecoguard-srilanka.pages.dev/";

export default function ShareButton() {
  const { lang } = useLanguage();

  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  const copySiteUrl = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(SITE_URL);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = SITE_URL;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
      }

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch {
      setCopied(false);
    }
  };

  const sharePage = async () => {
    if (sharing) return;

    setSharing(true);
    setCopied(false);

    const shareTitle =
      lang === "si"
        ? "සොබා සේනාංකය"
        : "Soba Senankaya";

    const shareText =
      lang === "si"
        ? "සොබාදහම වෙනුවෙන් මනුෂ්‍යත්වයේ වගකීම හා වගවීම වෙනුවෙන් එක්වන සොබා සේනාංකය සමඟ එක්වන්න. 🌿❤️"
        : "Join Soba Senankaya — a social mission bringing people together for humanity's responsibility towards nature. 🌿❤️";

    try {
      await copySiteUrl();

      if (typeof navigator.share === "function") {
        try {
          await navigator.share({
            title: shareTitle,
            text: shareText,
            url: SITE_URL,
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
    }
  };

  return (
    <div className="fixed bottom-9 right-5 z-[450] sm:bottom-10 sm:right-7">
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
              duration: 0.2,
            }}
            className="
              absolute
              bottom-[calc(100%+12px)]
              right-0
              whitespace-nowrap
              rounded-xl
              border
              border-emerald-400/20
              bg-white/95
              px-3.5
              py-2.5
              text-[11px]
              font-semibold
              text-emerald-700
              shadow-[0_12px_30px_rgba(0,0,0,0.14)]
              backdrop-blur-xl
              dark:border-emerald-300/20
              dark:bg-[#07130e]/95
              dark:text-emerald-200
            "
          >
            <span className="flex items-center gap-2">
              <Check size={14} />
              {lang === "si" ? "Link එක Copy කළා" : "Link copied"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={sharePage}
        disabled={sharing}
        whileHover={{
          scale: 1.06,
        }}
        whileTap={{
          scale: 0.92,
        }}
        aria-label={
          lang === "si"
            ? "වෙබ් අඩවිය Share කරන්න"
            : "Share this website"
        }
        title={
          lang === "si"
            ? "වෙබ් අඩවිය Share කරන්න"
            : "Share this website"
        }
        className="
          relative
          flex
          h-13
          w-13
          items-center
          justify-center
          rounded-full
          border
          border-slate-200
          bg-white
          text-slate-700
          shadow-[0_10px_30px_rgba(0,0,0,0.16)]
          transition-all
          duration-300
          hover:border-emerald-300
          hover:bg-emerald-50
          hover:text-emerald-600
          disabled:cursor-not-allowed
          disabled:opacity-70
          dark:border-white/10
          dark:bg-[#0a1711]
          dark:text-white
          dark:shadow-[0_12px_35px_rgba(0,0,0,0.34)]
          dark:hover:border-emerald-400/30
          dark:hover:bg-[#10231a]
          dark:hover:text-emerald-300
          sm:h-14
          sm:w-14
        "
      >
        <span
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-full
            bg-emerald-400/10
            opacity-0
            blur-xl
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />

        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
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
                duration: 0.16,
              }}
              className="relative z-10"
            >
              <Check size={23} strokeWidth={2.3} />
            </motion.span>
          ) : (
            <motion.span
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
                duration: 0.16,
              }}
              className="relative z-10"
            >
              <Share2
                size={23}
                strokeWidth={2.2}
              />
            </motion.span>
          )}
        </AnimatePresence>

        {sharing && (
          <motion.span
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-full
              border
              border-emerald-400/40
            "
            animate={{
              scale: [1, 1.18, 1],
              opacity: [0.15, 0.45, 0.15],
            }}
            transition={{
              duration: 1.1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.button>
    </div>
  );
}
