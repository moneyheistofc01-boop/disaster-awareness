// app/components/OpeningIntro.tsx
'use client';

import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

const MOBILE_IMAGE = '/ecoguard%20Mobile.webp';
const DESKTOP_IMAGE = '/ecoguard%20Destop.webp';

export default function OpeningIntro() {
  /*
   * No sessionStorage:
   * the opening must run on every fresh website load.
   *
   * The intro itself is opaque and has the highest practical z-index,
   * while the document is locked until the complete exit animation ends.
   */
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const [wallpaperReady, setWallpaperReady] =
    useState(false);

  useLayoutEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    const body = document.body;

    const previousRootBackground =
      root.style.backgroundColor;
    const previousBodyBackground =
      body.style.backgroundColor;
    const previousOverflow =
      body.style.overflow;
    const previousOverscroll =
      body.style.overscrollBehavior;
    const previousTouchAction =
      body.style.touchAction;

    /*
     * Keep the document itself black while the intro is mounted.
     * This prevents the underlying page from becoming a visible
     * transition background.
     */
    root.style.backgroundColor = '#000';
    body.style.backgroundColor = '#000';
    body.style.overflow = 'hidden';
    body.style.overscrollBehavior = 'none';
    body.style.touchAction = 'none';

    /*
     * 4.7s hold + 1.15s exit = 5.85s total.
     * The component is removed only after the exit completes.
     */
    const exitTimer =
      window.setTimeout(() => {
        setClosing(true);
      }, 4700);

    const removeTimer =
      window.setTimeout(() => {
        setVisible(false);

        root.style.backgroundColor =
          previousRootBackground;
        body.style.backgroundColor =
          previousBodyBackground;
        body.style.overflow =
          previousOverflow;
        body.style.overscrollBehavior =
          previousOverscroll;
        body.style.touchAction =
          previousTouchAction;
      }, 5850);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);

      root.style.backgroundColor =
        previousRootBackground;
      body.style.backgroundColor =
        previousBodyBackground;
      body.style.overflow =
        previousOverflow;
      body.style.overscrollBehavior =
        previousOverscroll;
      body.style.touchAction =
        previousTouchAction;
    };
  }, []);

  /*
   * Load ONLY the image needed for the current viewport.
   * If it is slow or unavailable, the CSS fire/blue background stays
   * visible, so the main page is never exposed through a blank layer.
   */
  useEffect(() => {
    if (!visible) return;

    const isMobile =
      window.matchMedia(
        '(max-width: 768px)'
      ).matches;

    const activeImage = isMobile
      ? MOBILE_IMAGE
      : DESKTOP_IMAGE;

    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      setWallpaperReady(true);
    };
    image.onerror = () => {
      setWallpaperReady(false);
    };
    image.src = activeImage;

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`opening-intro ${
        closing ? 'is-closing' : ''
      }`}
      aria-hidden="true"
    >
      <style jsx global>{`
        /*
         * Highest practical stacking layer.
         * The extremely high value is intentional.
         */
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
          background: #000;
          opacity: 1;
          transform:
            translate3d(0, 0, 0)
            scale(1);
          will-change:
            opacity,
            transform;
          contain: strict;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /*
         * A solid black first-paint shield under every visual layer.
         * Even when an image is downloading/decoding, the site beneath
         * cannot visually leak through.
         */
        .opening-intro__blackout {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: #000;
        }

        /*
         * Lightweight procedural fallback.
         * No network request and no video/GIF.
         */
        .opening-intro__fallback {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 50% 50%,
              rgba(9, 24, 55, 0.92) 0%,
              rgba(2, 8, 20, 0.96) 46%,
              #000 100%
            );
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
          filter:
            blur(18px)
            saturate(1.18);
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

        /*
         * Real image:
         * only the matching breakpoint is displayed.
         */
        .opening-intro__image {
          position: absolute;
          inset: 0;
          z-index: 2;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          opacity: 0;
          transform:
            translate3d(0, 0, 0)
            scale(1.028);
          transition:
            opacity 0.65s ease,
            transform 4.6s
              cubic-bezier(0.16, 1, 0.3, 1);
          will-change:
            opacity,
            transform;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .opening-intro__image.is-ready {
          opacity: 0.98;
          transform:
            translate3d(0, 0, 0)
            scale(1);
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
          z-index: 3;
          pointer-events: none;
          background:
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.25) 0%,
              rgba(0, 0, 0, 0.08) 32%,
              rgba(0, 0, 0, 0.32) 100%
            ),
            radial-gradient(
              circle at 50% 50%,
              rgba(0, 0, 0, 0) 22%,
              rgba(0, 0, 0, 0.25) 100%
            );
        }

        .opening-intro__content {
          position: relative;
          z-index: 10;
          display: flex;
          width: min(92vw, 900px);
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 24px;
          transform:
            translate3d(0, 0, 0);
        }

        .opening-intro__halo {
          position: absolute;
          top: 50%;
          left: 50%;
          width: clamp(260px, 44vw, 440px);
          aspect-ratio: 1;
          border-radius: 999px;
          transform:
            translate3d(-50%, -52%, 0);
          background:
            radial-gradient(
              circle,
              rgba(255, 255, 255, 0.18) 0%,
              rgba(0, 177, 255, 0.10) 25%,
              rgba(0, 74, 255, 0.06) 46%,
              transparent 70%
            );
          filter: blur(12px);
          opacity: 0.92;
          pointer-events: none;
        }

        /*
         * Bigger logo:
         * mobile ~180px+, desktop up to ~310px.
         * The emblem fills most of the inner circular orbit.
         */
        .opening-intro__logo-shell {
          position: relative;
          display: grid;
          place-items: center;
          width: clamp(175px, 40vw, 310px);
          aspect-ratio: 1;
          margin-bottom: 24px;
        }

        .opening-intro__orbit {
          position: absolute;
          inset: -2%;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.24);
          box-shadow:
            0 0 28px rgba(0, 165, 255, 0.20),
            0 0 46px rgba(255, 76, 0, 0.14);
          animation:
            openingOrbitPulse
            2.6s
            ease-in-out
            infinite;
        }

        .opening-intro__orbit::before,
        .opening-intro__orbit::after {
          content: '';
          position: absolute;
          inset: -5%;
          border-radius: 50%;
          border: 1px solid transparent;
          pointer-events: none;
        }

        .opening-intro__orbit::before {
          border-top-color:
            rgba(255, 94, 28, 0.94);
          border-right-color:
            rgba(255, 43, 0, 0.38);
          transform: rotate(24deg);
          animation:
            openingOrbitSpin
            4.8s
            linear
            infinite;
        }

        .opening-intro__orbit::after {
          inset: -9%;
          border-bottom-color:
            rgba(0, 168, 255, 0.96);
          border-left-color:
            rgba(41, 95, 255, 0.38);
          transform: rotate(-18deg);
          animation:
            openingOrbitSpinReverse
            5.8s
            linear
            infinite;
        }

        .opening-intro__logo {
          position: relative;
          z-index: 2;
          width: 78%;
          height: 78%;
          border-radius: 50%;
          object-fit: contain;
          background: rgba(0, 0, 0, 0.50);
          border: 1px solid rgba(255, 255, 255, 0.20);
          box-shadow:
            0 0 0 5px rgba(255, 255, 255, 0.025),
            0 16px 52px rgba(0, 0, 0, 0.58);
          opacity: 0;
          transform:
            translate3d(0, 0, 0)
            scale(0.72);
          animation:
            openingLogoIn
            1.25s
            0.15s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
          will-change:
            transform,
            opacity;
        }

        .opening-intro__title {
          margin: 0;
          max-width: 92vw;
          color: #fff;
          font-family:
            'Noto Sans Sinhala',
            'Iskoola Pota',
            'Nirmala UI',
            sans-serif;
          font-size:
            clamp(1.7rem, 6vw, 3.5rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.035em;
          text-wrap: balance;
          text-shadow:
            0 3px 18px rgba(0, 0, 0, 0.70),
            0 0 34px rgba(0, 0, 0, 0.40);
          opacity: 0;
          transform:
            translate3d(0, 14px, 0);
          animation:
            openingTextIn
            0.9s
            0.55s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        .opening-intro__title-accent {
          color: #61e7bb;
        }

        .opening-intro__subtitle {
          margin-top: 12px;
          max-width: 90vw;
          color: rgba(255, 255, 255, 0.64);
          font-family:
            Inter,
            'Segoe UI',
            system-ui,
            sans-serif;
          font-size:
            clamp(0.58rem, 1.7vw, 0.78rem);
          font-weight: 700;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          opacity: 0;
          transform:
            translate3d(0, 10px, 0);
          animation:
            openingTextIn
            0.85s
            0.86s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        .opening-intro__loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-top: 24px;
          opacity: 0;
          animation:
            openingTextIn
            0.8s
            1.18s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        .opening-intro__loading-label {
          color: rgba(255, 255, 255, 0.74);
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
          width: min(180px, 46vw);
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
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 81, 20, 0.94),
              rgba(255, 255, 255, 0.98),
              rgba(0, 149, 255, 0.96)
            );
          animation:
            openingProgress
            3.3s
            0.08s
            cubic-bezier(0.33, 1, 0.68, 1)
            forwards;
          will-change: transform;
        }

        .opening-intro.is-closing
        .opening-intro__logo-shell {
          animation:
            openingLogoExit
            1.05s
            cubic-bezier(0.76, 0, 0.24, 1)
            forwards;
        }

        .opening-intro.is-closing
        .opening-intro__title,
        .opening-intro.is-closing
        .opening-intro__subtitle,
        .opening-intro.is-closing
        .opening-intro__loading {
          animation:
            openingContentExit
            0.82s
            cubic-bezier(0.76, 0, 0.24, 1)
            forwards;
        }

        @keyframes openingLogoIn {
          0% {
            opacity: 0;
            transform:
              translate3d(0, 0, 0)
              scale(0.72);
          }
          100% {
            opacity: 1;
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }
        }

        @keyframes openingLogoExit {
          0% {
            opacity: 1;
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }
          100% {
            opacity: 0;
            transform:
              translate3d(0, 0, 0)
              scale(1.36);
          }
        }

        @keyframes openingTextIn {
          0% {
            opacity: 0;
            transform:
              translate3d(0, 14px, 0);
          }
          100% {
            opacity: 1;
            transform:
              translate3d(0, 0, 0);
          }
        }

        @keyframes openingContentExit {
          0% {
            opacity: 1;
            transform:
              translate3d(0, 0, 0);
          }
          100% {
            opacity: 0;
            transform:
              translate3d(0, -10px, 0);
          }
        }

        @keyframes openingIntroExit {
          0% {
            opacity: 1;
            transform:
              translate3d(0, 0, 0)
              scale(1);
          }
          100% {
            opacity: 0;
            transform:
              translate3d(0, 0, 0)
              scale(1.045);
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
            width: min(82vw, 960px);
          }
        }

        @media (max-width: 768px) {
          .opening-intro__content {
            padding-inline: 16px;
          }

          .opening-intro__logo-shell {
            width: clamp(180px, 48vw, 235px);
            margin-bottom: 18px;
          }

          .opening-intro__logo {
            width: 80%;
            height: 80%;
          }

          .opening-intro__title {
            max-width: 88vw;
            font-size:
              clamp(1.55rem, 7vw, 2.35rem);
          }

          .opening-intro__subtitle {
            max-width: 86vw;
            font-size:
              clamp(0.52rem, 1.9vw, 0.68rem);
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

      <div
        className="opening-intro__blackout"
        aria-hidden="true"
      />

      <div
        className="opening-intro__fallback"
        aria-hidden="true"
      />

      <img
        src={MOBILE_IMAGE}
        alt=""
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className={`opening-intro__image opening-intro__image--mobile ${
          wallpaperReady
            ? 'is-ready'
            : ''
        } ${
          closing
            ? 'is-fading'
            : ''
        }`}
        onLoad={() =>
          setWallpaperReady(true)
        }
      />

      <img
        src={DESKTOP_IMAGE}
        alt=""
        decoding="async"
        fetchPriority="high"
        draggable={false}
        className={`opening-intro__image opening-intro__image--desktop ${
          wallpaperReady
            ? 'is-ready'
            : ''
        } ${
          closing
            ? 'is-fading'
            : ''
        }`}
        onLoad={() =>
          setWallpaperReady(true)
        }
      />

      <div
        className="opening-intro__shade"
        aria-hidden="true"
      />

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
