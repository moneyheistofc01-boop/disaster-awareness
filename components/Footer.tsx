"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import {
  ArrowUpRight,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const { lang } =
    useLanguage();

  const currentYear =
    new Date().getFullYear();

  /* =========================================================
     FONT STACK
  ========================================================== */

  const sinhalaFont =
    "'Noto Sans Sinhala', 'Iskoola Pota', 'Nirmala UI', sans-serif";

  const englishFont =
    "'Inter', 'Segoe UI', system-ui, sans-serif";

  /* =========================================================
     SCROLL TO TOP
  ========================================================== */

  const scrollToTop =
    () => {
      window.scrollTo({
        top: 0,
        behavior:
          "smooth",
      });
    };

  /* =========================================================
     QUICK LINKS
  ========================================================== */

  const quickLinks = [
    {
      href: "#about",
      si: "හැඳින්වීම",
      en: "Introduction",
    },
    {
      href: "#vision",
      si: "දැක්ම",
      en: "Vision",
    },
    {
      href: "#action",
      si: "ක්‍රියාකාරීත්වය",
      en: "Activities",
    },
    {
      href: "#comments",
      si: "අදහස්",
      en: "Ideas",
    },
  ];

  return (
    <footer
      className="
        relative
        w-full
        overflow-hidden
        border-t
        bg-slate-50
        text-slate-900

        border-slate-200

        dark:border-white/[0.06]
        dark:bg-[#03100b]
        dark:text-white
      "
    >
      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top left glow */}
        <div
          className="
            absolute
            left-[-130px]
            top-[-120px]
            h-80
            w-80
            rounded-full
            bg-emerald-300/10
            blur-3xl

            dark:bg-emerald-400/[0.06]
          "
        />

        {/* Bottom right glow */}
        <div
          className="
            absolute
            bottom-[-130px]
            right-[-130px]
            h-80
            w-80
            rounded-full
            bg-lime-200/10
            blur-3xl

            dark:bg-lime-300/[0.035]
          "
        />

        {/* Top line */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-emerald-500/20
            to-transparent

            dark:via-emerald-300/20
          "
        />

        {/* Very subtle center glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-72
            w-72
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-emerald-200/5
            blur-3xl

            dark:bg-emerald-400/[0.015]
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-7xl
          px-5
          pb-8
          pt-14

          sm:px-8
          sm:pb-9
          sm:pt-16

          lg:px-10
        "
      >
        {/* ===================================================
            TOP CONTENT
        ==================================================== */}

        <div
          className="
            grid
            gap-10

            lg:grid-cols-[1.35fr_0.65fr]
            lg:items-end
          "
        >
          {/* =================================================
              BRAND
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.65,
            }}
          >
            {/* Brand header */}
            <div className="flex items-center gap-4">
              {/* Logo */}
              <motion.div
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.22,
                }}
                className="
                  relative
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border
                  p-1.5
                  shadow-[0_0_35px_rgba(16,185,129,0.08)]

                  border-emerald-500/20
                  bg-white

                  dark:border-emerald-300/20
                  dark:bg-white/[0.03]
                "
              >
                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    border
                    border-emerald-500/10

                    dark:border-emerald-400/[0.10]
                  "
                />

                <img
                  src="/logo.png"
                  alt={
                    lang ===
                    "si"
                      ? "සොබා සේනාංකය"
                      : "Soba Senankaya"
                  }
                  draggable={false}
                  className="
                    relative
                    h-full
                    w-full
                    rounded-full
                    object-contain
                  "
                />
              </motion.div>

              {/* Brand text */}
              <div className="min-w-0">
                <motion.h2
                  key={`footer-brand-${lang}`}
                  initial={{
                    opacity: 0,
                    y: 4,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    duration:
                      0.35,
                  }}
                  className="
                    text-2xl
                    font-black
                    leading-tight
                    tracking-[-0.025em]

                    text-slate-950

                    dark:text-white

                    sm:text-3xl
                  "
                  style={{
                    fontFamily:
                      lang ===
                      "si"
                        ? sinhalaFont
                        : englishFont,
                  }}
                >
                  {lang ===
                  "si"
                    ? "සොබා සේනාංකය"
                    : "Soba Senankaya"}
                </motion.h2>

                <motion.p
                  key={`footer-tag-${lang}`}
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    duration:
                      0.3,
                  }}
                  className="
                    mt-1
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.28em]

                    text-emerald-700/65

                    dark:text-emerald-300/60

                    sm:text-[10px]
                  "
                  style={{
                    fontFamily:
                      lang ===
                      "si"
                        ? sinhalaFont
                        : englishFont,
                  }}
                >
                  {lang ===
                  "si"
                    ? "ස්වභාවය • මනුෂ්‍යත්වය • වගකීම"
                    : "Nature • Humanity • Responsibility"}
                </motion.p>
              </div>
            </div>

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration:
                  0.6,
                delay: 0.06,
              }}
              className="
                mt-6
                max-w-2xl
                text-sm
                leading-8

                text-slate-500

                dark:text-white/50

                sm:text-base
              "
              style={{
                fontFamily:
                  lang ===
                  "si"
                    ? sinhalaFont
                    : englishFont,
              }}
            >
              {lang ===
              "si"
                ? "සොබාදහම වෙනුවෙන් මනුෂ්‍යත්වයේ වගකීම හා වගවීම ශක්තිමත් කරමින්, ස්වභාවික සමතුලිතතාව ආරක්ෂා කිරීම සඳහා එක්වන සමාජ මෙහෙවරකි."
                : "A social mission that strengthens humanity's responsibility towards nature and brings people together to protect natural balance."}
            </motion.p>

            {/* Quote */}
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration:
                  0.6,
                delay: 0.12,
              }}
              className="
                mt-6
                flex
                max-w-2xl
                items-start
                gap-3
              "
            >
              <div
                className="
                  mt-2
                  h-9
                  w-0.5
                  shrink-0
                  rounded-full

                  bg-emerald-500/50

                  dark:bg-emerald-400/50
                "
              />

              <p
                className="
                  text-sm
                  font-semibold
                  leading-7

                  text-emerald-800

                  dark:text-emerald-200/75

                  sm:text-base
                "
                style={{
                  fontFamily:
                    lang ===
                    "si"
                      ? sinhalaFont
                      : englishFont,
                }}
              >
                {lang ===
                "si"
                  ? "තනි තනිව වෙනස් වෙමු. අවසානයේ සුන්දර ලොවක් ගොඩනැගේවි."
                  : "Let us change individually. Together, a beautiful world can be built."}
              </p>
            </motion.div>
          </motion.div>

          {/* =================================================
              QUICK LINKS
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 14,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration:
                0.6,
              delay: 0.12,
            }}
          >
            <p
              className="
                mb-4
                text-[10px]
                font-black
                uppercase
                tracking-[0.22em]

                text-emerald-700/60

                dark:text-emerald-300/50
              "
            >
              {lang ===
              "si"
                ? "ඉක්මන් ප්‍රවේශය"
                : "Quick Access"}
            </p>

            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map(
                (
                  item
                ) => (
                  <Link
                    key={
                      item.href
                    }
                    href={
                      item.href
                    }
                    className="
                      group
                      rounded-2xl
                      border
                      px-4
                      py-3
                      text-sm
                      font-semibold
                      transition

                      border-slate-200
                      bg-white
                      text-slate-600
                      shadow-sm

                      hover:border-emerald-200
                      hover:bg-emerald-50
                      hover:text-emerald-700

                      dark:border-white/[0.06]
                      dark:bg-white/[0.025]
                      dark:text-white/60
                      dark:shadow-none

                      dark:hover:border-emerald-300/15
                      dark:hover:bg-emerald-400/[0.05]
                      dark:hover:text-emerald-200
                    "
                    style={{
                      fontFamily:
                        lang ===
                        "si"
                          ? sinhalaFont
                          : englishFont,
                    }}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate">
                        {lang ===
                        "si"
                          ? item.si
                          : item.en}
                      </span>

                      <ArrowUpRight
                        size={
                          14
                        }
                        className="
                          shrink-0
                          text-slate-300
                          transition

                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                          group-hover:text-emerald-500

                          dark:text-white/20
                          dark:group-hover:text-emerald-300
                        "
                      />
                    </span>
                  </Link>
                )
              )}
            </div>
          </motion.div>
        </div>

        {/* ===================================================
            DIVIDER
        ==================================================== */}

        <div
          className="
            my-10
            h-px
            bg-gradient-to-r
            from-transparent
            via-slate-300
            to-transparent

            dark:via-white/[0.08]
          "
        />

        {/* ===================================================
            BOTTOM BAR
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration:
              0.6,
          }}
          className="
            flex
            flex-col
            gap-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Responsibility */}
          <div className="flex items-center gap-3">
            <ShieldCheck
              size={
                16
              }
              className="
                text-emerald-600/60
                dark:text-emerald-300/45
              "
            />

            <p
              className="
                text-[11px]
                leading-6

                text-slate-400

                dark:text-white/30

                sm:text-xs
              "
              style={{
                fontFamily:
                  lang ===
                  "si"
                    ? sinhalaFont
                    : englishFont,
              }}
            >
              {lang ===
              "si"
                ? "ස්වභාවධර්මය වෙනුවෙන් මනුෂ්‍යත්වයේ වගකීම"
                : "Humanity's responsibility for nature"}
            </p>
          </div>

          {/* Copyright */}
          <p
            className="
              text-[10px]
              font-medium
              tracking-wide

              text-slate-400

              dark:text-white/25
            "
            style={{
              fontFamily:
                englishFont,
            }}
          >
            © {currentYear}{" "}
            {lang ===
            "si"
              ? "සොබා සේනාංකය"
              : "Soba Senankaya"}
          </p>

          {/* Back to top */}
          <motion.button
            type="button"
            whileTap={{
              scale: 0.94,
            }}
            whileHover={{
              y: -1,
            }}
            onClick={
              scrollToTop
            }
            className="
              group
              inline-flex
              items-center
              gap-2
              self-start
              rounded-full
              border
              px-4
              py-2
              text-[10px]
              font-bold
              transition

              border-slate-200
              bg-white
              text-slate-500
              shadow-sm

              hover:border-emerald-200
              hover:bg-emerald-50
              hover:text-emerald-700

              dark:border-white/[0.07]
              dark:bg-white/[0.025]
              dark:text-white/40
              dark:shadow-none

              dark:hover:border-emerald-300/15
              dark:hover:bg-emerald-400/[0.05]
              dark:hover:text-emerald-200

              sm:self-auto
            "
            style={{
              fontFamily:
                lang ===
                "si"
                  ? sinhalaFont
                  : englishFont,
            }}
          >
            <span>
              {lang ===
              "si"
                ? "ඉහළට"
                : "Back to top"}
            </span>

            <Leaf
              size={
                13
              }
              className="
                text-emerald-600/60
                transition-transform
                duration-300

                group-hover:-translate-y-0.5

                dark:text-emerald-300/50
              "
            />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
