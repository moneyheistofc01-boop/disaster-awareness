"use client";

import { useEffect, useRef, useState } from "react";

const MUSIC_SRC = "/eco-music.mp3";
const TARGET_VOLUME = 0.06;
const MIN_VOLUME = 0.006;
const FADE_SECONDS = 2.4;

export default function MusicButton() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio(MUSIC_SRC);
    audio.preload = "auto";
    audio.loop = true;
    audio.volume = TARGET_VOLUME;
    audioRef.current = audio;

    const sync = () => {
      setPlaying(!audio.paused);
      setMuted(audio.muted);
    };

    const fadeVolume = () => {
      const duration = audio.duration;
      if (!Number.isFinite(duration) || duration <= 0) return;

      const current = audio.currentTime;
      const distanceFromStart = current;
      const distanceFromEnd = Math.max(0, duration - current);
      const fadeFactor = Math.min(
        1,
        distanceFromStart / FADE_SECONDS,
        distanceFromEnd / FADE_SECONDS,
      );

      audio.volume = MIN_VOLUME + (TARGET_VOLUME - MIN_VOLUME) * fadeFactor;
    };

    const resetVolume = () => {
      if (!audio.muted) audio.volume = TARGET_VOLUME;
    };

    const removeUnlockListeners = () => {
      window.removeEventListener("pointerdown", unlockAndPlay, true);
      window.removeEventListener("touchstart", unlockAndPlay, true);
      window.removeEventListener("click", unlockAndPlay, true);
      window.removeEventListener("keydown", unlockAndPlay, true);
    };

    const unlockAndPlay = () => {
      if (!audio.paused) {
        removeUnlockListeners();
        return;
      }

      void audio
        .play()
        .then(() => {
          setPlaying(true);
          removeUnlockListeners();
        })
        .catch(() => {
          // Browser autoplay policy can reject playback until another real gesture.
          // Keep the unlock listeners active so the next interaction starts it.
        });
    };

    audio.addEventListener("play", sync);
    audio.addEventListener("pause", sync);
    audio.addEventListener("ended", resetVolume);
    audio.addEventListener("timeupdate", fadeVolume);
    audio.addEventListener("loadedmetadata", resetVolume);

    // First attempt: autoplay immediately when the page opens.
    unlockAndPlay();

    // Guaranteed audible-start path after the user's first real interaction.
    window.addEventListener("pointerdown", unlockAndPlay, true);
    window.addEventListener("touchstart", unlockAndPlay, true);
    window.addEventListener("click", unlockAndPlay, true);
    window.addEventListener("keydown", unlockAndPlay, true);

    const resumeWhenVisible = () => {
      if (document.visibilityState === "visible" && audio.paused) {
        unlockAndPlay();
      }
    };

    document.addEventListener("visibilitychange", resumeWhenVisible);

    return () => {
      removeUnlockListeners();
      document.removeEventListener("visibilitychange", resumeWhenVisible);
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener("play", sync);
      audio.removeEventListener("pause", sync);
      audio.removeEventListener("ended", resetVolume);
      audio.removeEventListener("timeupdate", fadeVolume);
      audio.removeEventListener("loadedmetadata", resetVolume);
      audioRef.current = null;
    };
  }, []);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      void audio.play().then(() => setPlaying(true)).catch(() => undefined);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !audio.muted;
    setMuted(audio.muted);
  };

  return (
    <div
      data-music-player
      className="fixed right-3 top-[73px] z-[450] hidden items-center sm:right-5 sm:top-[79px] md:flex"
    >
      <div className="music-player-shell flex items-center gap-1 rounded-full border border-emerald-300/20 bg-[#06160f]/96 p-1.5 shadow-[0_14px_38px_rgba(0,0,0,0.28)]">
        <button
          type="button"
          onClick={togglePlayback}
          aria-label={playing ? "Turn music off" : "Turn music on"}
          title={playing ? "Turn music off" : "Turn music on"}
          className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald-300/15 text-emerald-200 transition-transform active:scale-95 ${
            playing ? "bg-emerald-400/15" : "bg-white/[0.035]"
          }`}
        >
          {playing ? (
            <span className="relative flex h-5 items-end gap-[3px]" aria-hidden="true">
              <span className="h-2 w-[3px] rounded-full bg-emerald-200 animate-[musicPulse_0.75s_ease-in-out_infinite]" />
              <span className="h-4 w-[3px] rounded-full bg-emerald-200 animate-[musicPulse_0.95s_ease-in-out_0.08s_infinite]" />
              <span className="h-3 w-[3px] rounded-full bg-emerald-200 animate-[musicPulse_0.8s_ease-in-out_0.18s_infinite]" />
              <span className="h-5 w-[3px] rounded-full bg-emerald-200 animate-[musicPulse_1.05s_ease-in-out_0.04s_infinite]" />
            </span>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-none stroke-current"
              strokeWidth="1.9"
              aria-hidden="true"
            >
              <path d="M9 18V6l10-2v12" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="16" cy="16" r="3" />
            </svg>
          )}
        </button>

        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Unmute music" : "Mute music"}
          title={muted ? "Unmute music" : "Mute music"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-emerald-200/70 transition-transform active:scale-95 hover:bg-white/[0.04]"
        >
          {muted ? (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-none stroke-current"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M4 9v6h4l5 4V5L8 9H4Z" />
              <path d="m17 9 4 6M21 9l-4 6" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-none stroke-current"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <path d="M4 9v6h4l5 4V5L8 9H4Z" />
              <path d="M17 9.5a4 4 0 0 1 0 5M19.5 7a7.5 7.5 0 0 1 0 10" />
            </svg>
          )}
        </button>
      </div>

      <style jsx>{`
        .music-player-shell {
          opacity: 0;
          transform: translate3d(18px, -8px, 0) scale(0.92);
          animation: musicPlayerAppear 0.75s 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }

        @keyframes musicPlayerAppear {
          from {
            opacity: 0;
            transform: translate3d(18px, -8px, 0) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        @keyframes musicPulse {
          0%,
          100% {
            transform: scaleY(0.45);
            opacity: 0.68;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .music-player-shell {
            animation: none;
            opacity: 1;
            transform: none;
          }

          .music-player-shell * {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
