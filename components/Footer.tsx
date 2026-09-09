"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import { ArrowUpRight, Leaf, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const { lang } = useLanguage();

  const currentYear =
    new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative w-full overflow-hidden border-t border-white/[0.06] bg-[#03100b] text-white">
      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[-100px] h-72 w-72 rounded-full bg-emerald-400/[0.06] blur-3xl" />

        <div className="absolute right-[-130px] bottom-[-120px] h-80 w-80 rounded-full bg-lime-300/[0.035] blur-3xl" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/20 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-8 pt-14 sm:px-8 sm:pb-9 sm:pt-18 lg:px-10">
        {/* ===================================================
            MAIN FOOTER
        ==================================================== */}

        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          {/* =================================================
              BRAND AREA
          ================================================== */}

          <div>
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
              }}
              className="flex items-center gap-4"
            >
              {/* Logo */}
              <motion.div
                whileHover={{
                  scale: 1.04,
                }}
                className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-emerald-300/20 bg-white/[0.03] p-1.5 shadow-[0_0_35px_rgba(16,185,129,0.08)]"
              >
                <div className="absolute inset-0 rounded-full border border-emerald-400/[0.10]" />

                <img
                  src="/logo.png"
                  alt={
                    lang === "si"
                      ? "සොබා සේනාංකය"
                      : "Soba Senankaya"
                  }
                  draggable={false}
                  className="relative h-full w-full rounded-full object-contain"
                />
              </motion.div>

              <div>
                <h2 className="text-2xl font-black tracking-[-0.025em] text-white sm:text-3xl">
                  {lang === "si"
                    ? "සොබා සේනාංකය"
                    : "Soba Senankaya"}
                </h2>

                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.28em] text-emerald-300/60 sm:text-[10px]">
                  {lang === "si"
                    ? "ස්වභාවය • මනුෂ්‍යත්වය • වගකීම"
                    : "Nature • Humanity • Responsibility"}
                </p>
              </div>
            </motion.div>

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
                amount: 0.2,
              }}
              transition={{
                duration: 0.6,
                delay: 0.08,
              }}
              className="mt-6 max-w-2xl text-sm leading-8 text-white/50 sm:text-base"
            >
              {lang === "si"
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
                duration: 0.6,
                delay: 0.14,
              }}
              className="mt-6 flex max-w-2xl items-start gap-3"
            >
              <div className="mt-2 h-8 w-0.5 shrink-0 rounded-full bg-emerald-400/50" />

              <p className="text-sm font-semibold leading-7 text-emerald-200/75 sm:text-base">
                {lang === "si"
                  ? "තනි තනිව වෙනස් වෙමු. අවසානයේ සුන්දර ලොවක් ගොඩනැගේවි."
                  : "Let us change individually. Together, a beautiful world can be built."}
              </p>
            </motion.div>
          </div>

          {/* =================================================
              QUICK LINKS
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.6,
              delay: 0.1,
            }}
          >
            <p className="mb-4 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300/50">
              {lang === "si"
                ? "ඉක්මන් ප්‍රවේශය"
                : "Quick Access"}
            </p>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href="#about"
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-sm font-semibold text-white/60 transition hover:border-emerald-300/15 hover:bg-emerald-400/[0.05] hover:text-emerald-200"
              >
                <span className="flex items-center justify-between gap-2">
                  {lang === "si"
                    ? "හැඳින්වීම"
                    : "Introduction"}

                  <ArrowUpRight
                    size={14}
                    className="text-white/20 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-300"
                  />
                </span>
              </Link>

              <Link
                href="#vision"
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-sm font-semibold text-white/60 transition hover:border-emerald-300/15 hover:bg-emerald-400/[0.05] hover:text-emerald-200"
              >
                <span className="flex items-center justify-between gap-2">
                  {lang === "si"
                    ? "දැක්ම"
                    : "Vision"}

                  <ArrowUpRight
                    size={14}
                    className="text-white/20 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-300"
                  />
                </span>
              </Link>

              <Link
                href="#action"
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-sm font-semibold text-white/60 transition hover:border-emerald-300/15 hover:bg-emerald-400/[0.05] hover:text-emerald-200"
              >
                <span className="flex items-center justify-between gap-2">
                  {lang === "si"
                    ? "ක්‍රියාකාරීත්වය"
                    : "Activities"}

                  <ArrowUpRight
                    size={14}
                    className="text-white/20 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-300"
                  />
                </span>
              </Link>

              <Link
                href="#comments"
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 text-sm font-semibold text-white/60 transition hover:border-emerald-300/15 hover:bg-emerald-400/[0.05] hover:text-emerald-200"
              >
                <span className="flex items-center justify-between gap-2">
                  {lang === "si"
                    ? "අදහස්"
                    : "Ideas"}

                  <ArrowUpRight
                    size={14}
                    className="text-white/20 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-300"
                  />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ===================================================
            DIVIDER
        ==================================================== */}

        <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />

        {/* ===================================================
            BOTTOM BAR
        ==================================================== */}

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck
              size={16}
              className="text-emerald-300/45"
            />

            <p className="text-[11px] leading-6 text-white/30 sm:text-xs">
              {lang === "si"
                ? "ස්වභාවධර්මය වෙනුවෙන් මනුෂ්‍යත්වයේ වගකීම"
                : "Humanity's responsibility for nature"}
            </p>
          </div>

          <p className="text-[10px] font-medium tracking-wide text-white/25">
            © {currentYear}{" "}
            {lang === "si"
              ? "සොබා සේනාංකය"
              : "Soba Senankaya"}
          </p>

          <motion.button
            type="button"
            whileTap={{
              scale: 0.94,
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
              border-white/[0.07]
              bg-white/[0.025]
              px-4
              py-2
              text-[10px]
              font-bold
              text-white/40
              transition
              hover:border-emerald-300/15
              hover:bg-emerald-400/[0.05]
              hover:text-emerald-200
              sm:self-auto
            "
          >
            <span>
              {lang === "si"
                ? "ඉහළට"
                : "Back to top"}
            </span>

            <Leaf
              size={13}
              className="text-emerald-300/50 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </motion.button>
        </div>
      </div>
    </footer>
  );
            }
