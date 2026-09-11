// app/components/OpeningIntro.tsx
'use client';

import React, { useEffect, useState } from 'react';

const MOBILE_IMAGE = '/ecoguard%20Mobile.webp';
const DESKTOP_IMAGE = '/ecoguard%20Destop.webp';

export default function OpeningIntro() {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const [mobileReady, setMobileReady] = useState(false);
  const [desktopReady, setDesktopReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const playedKey = 'sobasenankaya_opening_intro_v2';
    const hasPlayed = sessionStorage.getItem(playedKey);

    if (hasPlayed) {
      setVisible(false);
      return;
    }

    sessionStorage.setItem(playedKey, 'true');

    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';

    const exitTimer = window.setTimeout(() => {
      setClosing(true);
    }, 4700);

    const removeTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    }, 5900);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    const mobile = new Image();
    mobile.decoding = 'async';
    mobile.onload = () => setMobileReady(true);
    mobile.onerror = () => setMobileReady(false);
    mobile.src = MOBILE_IMAGE;

    const desktop = new Image();
    desktop.decoding = 'async';
    desktop.onload = () => setDesktopReady(true);
    desktop.onerror = () => setDesktopReady(false);
    desktop.src = DESKTOP_IMAGE;
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`opening-intro ${closing ? 'is-closing' : ''}`}
      aria-hidden="true"
    >
      <style jsx global>{`
        .opening-intro {
          position: fixed;
          inset: 0;
          z-index: 2147483647;
          width: 100vw;
          height: 100dvh;
          min-height: 100svh;
          overflow: hidden;
          isolation: isolate;
          display: grid;
          place-items: center;
          background:
            radial-gradient(circle at 50% 45%, rgba(11, 23, 54, 0.88) 0%, rgba(3, 6, 16, 0.96) 42%, #010206 100%);
          opacity: 1;
          transform: scale(1);
          will-change: opacity, transform;
          contain: strict;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .opening-intro.is-closing {
          animation: openingIntroExit 1.15s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }

        .opening-intro__fallback {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 50%, rgba(9, 24, 55, 0.92) 0%, rgba(2, 8, 20, 0.96) 46%, #000 100%);
        }

        .opening-intro__fallback::before,
        .opening-intro__fallback::after {
          content: '';
          position: absolute;
          inset: -14%;
          pointer-events: none;
        }

        .opening-intro__fallback::before {
          background:
            radial-gradient(
              ellipse at 15% 50%,
              rgba(255, 56, 0, 0.98) 0%,
              rgba(238, 46, 0, 0.72) 14%,
              rgba(94, 8, 0, 0.34) 27%,
              transparent 44%
            ),
            radial-gradient(
              ellipse at 85% 50%,
              rgba(0, 98, 255, 1) 0%,
              rgba(0, 49, 190, 0.74) 16%,
              rgba(18, 23, 103, 0.36) 28%,
              transparent 45%
            );
          filter: blur(18px) saturate(1.18);
          transform: scale(1.08);
        }

        .opening-intro__fallback::after {
          background:
            conic-gradient(
              from 90deg,
              transparent 0deg,
              rgba(255, 57, 0, 0.82) 36deg,
              transparent 92deg,
              transparent 180deg,
              rgba(0, 97, 255, 0.78) 235deg,
              transparent 300deg
            );
          filter: blur(52px);
          opacity: 0.72;
          mix-blend-mode: screen;
        }

        .opening-intro__image {
          position: absolute;
          inset: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0;
          transform: scale(1.035);
          transition:
            opacity 0.65s ease,
            transform 4.8s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .opening-intro__image.is-ready {
          opacity: 0.97;
          transform: scale(1);
        }

        .opening-intro__image.is-fading {
          opacity: 0;
        }

        .opening-intro__image--mobile {
          display: block;
        }

        .opening-intro__image--desktop {
          display: none;
        }

        .opening-intro__shade {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.26) 0%,
              rgba(0, 0, 0, 0.10) 32%,
              rgba(0, 0, 0, 0.28) 100%
            ),
            radial-gradient(
              circle at 50% 50%,
              rgba(0, 0, 0, 0.00) 24%,
              rgba(0, 0, 0, 0.23) 100%
            );
        }

        .opening-intro__content {
          position: relative;
          z-index: 5;
          display: flex;
          width: min(90vw, 760px);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 24px;
          transform: translateZ(0);
        }

        .opening-intro__halo {
          position: absolute;
          top: 50%;
          left: 50%;
          width: clamp(210px, 34vw, 390px);
          aspect-ratio: 1;
          border-radius: 999px;
          transform: translate(-50%, -52%);
          background:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.18) 0%,
              rgba(0, 177, 255, 0.09) 26%,
              rgba(0, 74, 255, 0.06) 46%,
              transparent 70%
            );
          filter: blur(12px);
          opacity: 0.92;
          pointer-events: none;
        }

        .opening-intro__logo-shell {
          position: relative;
          display: grid;
          place-items: center;
          width: clamp(135px, 31vw, 250px);
          aspect-ratio: 1;
          margin-bottom: 22px;
        }

        .opening-intro__orbit {
          position: absolute;
          inset: -4%;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow:
            0 0 25px rgba(0, 165, 255, 0.16),
            0 0 40px rgba(255, 76, 0, 0.12);
          animation: openingOrbitPulse 2.6s ease-in-out infinite;
        }

        .opening-intro__orbit::before,
        .opening-intro__orbit::after {
          content: '';
          position: absolute;
          inset: -7%;
          border-radius: 50%;
          border: 1px solid transparent;
          pointer-events: none;
        }

        .opening-intro__orbit::before {
          border-top-color: rgba(255, 94, 28, 0.88);
          border-right-color: rgba(255, 43, 0, 0.34);
          transform: rotate(24deg);
          animation: openingOrbitSpin 4.8s linear infinite;
        }

        .opening-intro__orbit::after {
          inset: -11%;
          border-bottom-color: rgba(0, 168, 255, 0.92);
          border-left-color: rgba(41, 95, 255, 0.34);
          transform: rotate(-18deg);
          animation: openingOrbitSpinReverse 5.8s linear infinite;
        }

        .opening-intro__logo {
          position: relative;
          z-index: 2;
          width: 66%;
          height: 66%;
          border-radius: 50%;
          object-fit: contain;
          background: rgba(0, 0, 0, 0.54);
          border: 1px solid rgba(255, 255, 255, 0.18);
          box-shadow:
            0 0 0 7px rgba(255, 255, 255, 0.02),
            0 12px 48px rgba(0, 0, 0, 0.55);
          opacity: 0;
          transform: scale(0.72);
          animation: openingLogoIn 1.25s 0.15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        .opening-intro__title {
          margin: 0;
          max-width: 90vw;
          color: #fff;
          font-family:
            'Noto Sans Sinhala',
            'Iskoola Pota',
            'Nirmala UI',
            sans-serif;
          font-size: clamp(1.6rem, 5.8vw, 3.45rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.035em;
          text-wrap: balance;
          text-shadow:
            0 3px 18px rgba(0, 0, 0, 0.68),
            0 0 34px rgba(0, 0, 0, 0.36);
          opacity: 0;
          transform: translateY(14px);
          animation: openingTextIn 0.9s 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .opening-intro__title-accent {
          color: #61e7bb;
        }

        .opening-intro__subtitle {
          margin-top: 12px;
          max-width: 88vw;
          color: rgba(255, 255, 255, 0.62);
          font-family:
            Inter,
            'Segoe UI',
            system-ui,
            sans-serif;
          font-size: clamp(0.58rem, 1.7vw, 0.78rem);
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
          animation: openingTextIn 0.85s 0.86s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .opening-intro__loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-top: 24px;
          opacity: 0;
          animation: openingTextIn 0.8s 1.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .opening-intro__loading-label {
          color: rgba(255, 255, 255, 0.72);
          font-family:
            Inter,
            'Segoe UI',
            system-ui,
            sans-serif;
          font-size: 0.56rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .opening-intro__progress {
          position: relative;
          width: min(170px, 44vw);
          height: 2px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
        }

        .opening-intro__progress::before {
          content: '';
          position: absolute;
          inset: 0 auto 0 0;
          width: 34%;
          border-radius: inherit;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 81, 20, 0.92),
            rgba(255, 255, 255, 0.96),
            rgba(0, 149, 255, 0.94)
          );
          animation: openingProgress 3.3s 0.08s cubic-bezier(0.33, 1, 0.68, 1) forwards;
          will-change: transform;
        }

        .opening-intro.is-closing .opening-intro__logo-shell {
          animation: openingLogoExit 1.05s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }

        .opening-intro.is-closing .opening-intro__title,
        .opening-intro.is-closing .opening-intro__subtitle,
        .opening-intro.is-closing .opening-intro__loading {
          animation: openingContentExit 0.82s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }

        @keyframes openingLogoIn {
          0% {
            opacity: 0;
            transform: scale(0.72);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes openingLogoExit {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.34);
          }
        }

        @keyframes openingTextIn {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes openingContentExit {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        @keyframes openingIntroExit {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(1.045);
          }
        }

        @keyframes openingOrbitSpin {
          to {
            transform: rotate(384deg);
          }
        }

        @keyframes openingOrbitSpinReverse {
          to {
            transform: rotate(-378deg);
          }
        }

        @keyframes openingOrbitPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.72;
          }
          50% {
            transform: scale(1.025);
            opacity: 1;
          }
        }

        @keyframes openingProgress {
          0% {
            transform: translateX(-135%);
          }
          100% {
            transform: translateX(420%);
          }
        }

        @media (min-width: 769px) {
          .opening-intro__image--mobile {
            display: none;
          }

          .opening-intro__image--desktop {
            display: block;
          }

          .opening-intro__content {
            width: min(82vw, 900px);
          }
        }

        @media (max-width: 768px) {
          .opening-intro__content {
            padding-inline: 18px;
          }

          .opening-intro__logo-shell {
            margin-bottom: 18px;
          }

          .opening-intro__title {
            max-width: 86vw;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .opening-intro *,
          .opening-intro::before,
          .opening-intro::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }

          .opening-intro__image {
            transition: none;
          }
        }
      `}</style>

      <div className="opening-intro__fallback" />

      <img
        src={MOBILE_IMAGE}
        alt=""
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className={`opening-intro__image opening-intro__image--mobile ${
          mobileReady ? 'is-ready' : ''
        } ${closing ? 'is-fading' : ''}`}
        onLoad={() => setMobileReady(true)}
      />

      <img
        src={DESKTOP_IMAGE}
        alt=""
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className={`opening-intro__image opening-intro__image--desktop ${
          desktopReady ? 'is-ready' : ''
        } ${closing ? 'is-fading' : ''}`}
        onLoad={() => setDesktopReady(true)}
      />

      <div className="opening-intro__shade" />

      <div className="opening-intro__content">
        <div className="opening-intro__halo" />

        <div className="opening-intro__logo-shell">
          <div className="opening-intro__orbit" />
          <img
            src="/logo.png"
            alt="Soba Senankaya"
            draggable={false}
            className="opening-intro__logo"
          />
        </div>

        <h1 className="opening-intro__title">
          සොබා{' '}
          <span className="opening-intro__title-accent">
            සේනාංකය
          </span>
        </h1>

        <p className="opening-intro__subtitle">
          ස්වභාවය • මනුෂ්‍යත්වය • වගකීම
        </p>

        <div className="opening-intro__loading">
          <span className="opening-intro__loading-label">
            SYSTEM INITIALIZATION
          </span>
          <div className="opening-intro__progress" />
        </div>
      </div>
    </div>
  );
}
