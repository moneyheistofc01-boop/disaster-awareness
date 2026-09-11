"use client";

import Link from "next/link";
import { useLanguage } from "../context/LanguageContext";
import {
  ArrowUpRight,
  Leaf,
  ShieldCheck,
  Facebook,
  Youtube,
} from "lucide-react";

export default function Footer() {
  const { lang } = useLanguage();

  const currentYear = new Date().getFullYear();

  const sinhalaFont =
    "'Noto Sans Sinhala', 'Iskoola Pota', 'Nirmala UI', sans-serif";

  const englishFont =
    "'Inter', 'Segoe UI', system-ui, sans-serif";

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
        relative z-20 w-full overflow-hidden
        border-t border-white/10
        bg-[#06120d]/95
        text-white
      "
    >
      {/* Decorative background — static, lightweight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-400/[0.06] blur-3xl" />
        <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-emerald-300/[0.04] blur-3xl" />
      </div>

      <div
        className="
          relative mx-auto w-full max-w-7xl
          px-5 py-10
          sm:px-8 sm:py-12
          lg:px-10
        "
      >
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
          {/* Brand / Mission */}
          <div className="min-w-0">
            <div className="flex items-center gap-4">
              <div
                className="
                  flex h-14 w-14 shrink-0 items-center justify-center
                  rounded-full border border-emerald-300/20
                  bg-[#0a2118]
                  p-1.5
                  shadow-[0_0_28px_rgba(16,185,129,0.10)]
                "
              >
                <img
                  src="/logo.png"
                  alt={
                    lang === "si"
                      ? "සොබා සේනාංකය"
                      : "Soba Senankaya"
                  }
                  draggable={false}
                  className="h-full w-full rounded-full object-contain"
                />
              </div>

              <div className="min-w-0">
                <h2
                  className="
                    break-words text-2xl font-black leading-tight
                    tracking-[-0.025em] text-white
                    sm:text-3xl
                  "
                  style={{
                    fontFamily:
                      lang === "si"
                        ? sinhalaFont
                        : englishFont,
                  }}
                >
                  {lang === "si"
                    ? "සොබා සේනාංකය"
                    : "Soba Senankaya"}
                </h2>

                <p
                  className="
                    mt-1 text-[9px] font-bold uppercase
                    tracking-[0.22em] text-emerald-300/75
                    sm:text-[10px]
                  "
                  style={{
                    fontFamily:
                      lang === "si"
                        ? sinhalaFont
                        : englishFont,
                  }}
                >
                  {lang === "si"
                    ? "ස්වභාදහම • මනුෂ්‍යත්වය • වගකීම"
                    : "Nature • Humanity • Responsibility"}
                </p>
              </div>
            </div>

            <p
              className="
                mt-6 max-w-2xl break-words
                text-sm leading-7 text-white/72
                sm:text-base sm:leading-8
              "
              style={{
                fontFamily:
                  lang === "si"
                    ? sinhalaFont
                    : englishFont,
              }}
            >
              {lang === "si"
                ? "සොබාදහම වෙනුවෙන් මනුෂ්‍යත්වයේ වගකීම හා වගවීම ශක්තිමත් කරමින්, ස්වභාවික සමතුලිතතාව ආරක්ෂා කිරීම සඳහා එක්වන සමාජ මෙහෙවරකි."
                : "A social mission that strengthens humanity's responsibility towards nature and brings people together to protect natural balance."}
            </p>

            <div className="mt-6 flex max-w-2xl items-start gap-3">
              <div className="mt-2 h-9 w-0.5 shrink-0 rounded-full bg-emerald-400/55" />

              <p
                className="
                  break-words text-sm font-semibold leading-7
                  text-emerald-100/90
                  sm:text-base
                "
                style={{
                  fontFamily:
                    lang === "si"
                      ? sinhalaFont
                      : englishFont,
                }}
              >
                {lang === "si"
                  ? "තනි තනිව වෙනස් වෙමු. අවසානයේ සුන්දර ලොවක් ගොඩනැගේවි."
                  : "Let us change individually. Together, a beautiful world can be built."}
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="min-w-0">
            <p
              className="mb-4 text-[10px] font-black uppercase tracking-[0.22em] text-emerald-300/70"
              style={{ fontFamily: englishFont }}
            >
              {lang === "si"
                ? "ඉක්මන් ප්‍රවේශය"
                : "Quick Access"}
            </p>

            <div className="grid grid-cols-2 gap-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="
                    group min-w-0 rounded-2xl
                    border border-white/10
                    bg-white/[0.045]
                    px-4 py-3.5
                    text-sm font-semibold text-white/82
                    transition-colors
                    hover:border-emerald-300/25
                    hover:bg-emerald-400/[0.08]
                    hover:text-white
                  "
                  style={{
                    fontFamily:
                      lang === "si"
                        ? sinhalaFont
                        : englishFont,
                  }}
                >
                  <span className="flex min-w-0 items-center justify-between gap-2">
                    <span className="min-w-0 truncate">
                      {lang === "si"
                        ? item.si
                        : item.en}
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-emerald-300/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              ))}
            </div>

            {/* Social */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="
                  inline-flex min-h-11 items-center gap-2
                  rounded-2xl border border-white/10
                  bg-[#1877F2]/10 px-4
                  text-sm font-bold text-white/85
                  transition-colors
                  hover:bg-[#1877F2]/20
                "
              >
                <Facebook size={18} aria-hidden="true" />
                <span>Facebook</span>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="
                  inline-flex min-h-11 items-center gap-2
                  rounded-2xl border border-white/10
                  bg-[#FF0000]/10 px-4
                  text-sm font-bold text-white/85
                  transition-colors
                  hover:bg-[#FF0000]/20
                "
              >
                <Youtube size={19} aria-hidden="true" />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>

        <div className="my-9 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <ShieldCheck
              size={17}
              className="mt-0.5 shrink-0 text-emerald-300/65"
            />

            <p
              className="min-w-0 break-words text-xs leading-6 text-white/55"
              style={{
                fontFamily:
                  lang === "si"
                    ? sinhalaFont
                    : englishFont,
              }}
            >
              {lang === "si"
                ? "ස්වභාවධර්මය වෙනුවෙන් මනුෂ්‍යත්වයේ වගකීම"
                : "Humanity's responsibility for nature"}
            </p>
          </div>

          <p
            className="text-[10px] font-medium tracking-wide text-white/40 sm:text-xs"
            style={{ fontFamily: englishFont }}
          >
            © {currentYear}{" "}
            {lang === "si"
              ? "සොබා සේනාංකය"
              : "Soba Senankaya"}
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="
              inline-flex min-h-10 items-center gap-2 self-start
              rounded-full border border-white/10
              bg-white/[0.045] px-4 py-2
              text-[11px] font-bold text-white/70
              transition-colors
              hover:border-emerald-300/25
              hover:bg-emerald-400/[0.08]
              hover:text-emerald-100
              sm:self-auto
            "
            style={{
              fontFamily:
                lang === "si"
                  ? sinhalaFont
                  : englishFont,
            }}
          >
            <span>
              {lang === "si"
                ? "ඉහළට"
                : "Back to top"}
            </span>
            <Leaf
              size={13}
              className="text-emerald-300/70"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
