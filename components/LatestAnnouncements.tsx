"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ExternalLink,
  Loader2,
  Megaphone,
} from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  description: string | null;
  imageUrl: string;
  linkUrl: string | null;
  createdAt: string;
}

export default function LatestAnnouncements() {
  const [announcements, setAnnouncements] = useState<
    Announcement[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const scrollRef =
    useRef<HTMLDivElement | null>(null);

  const dragRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const reduceMotion = useReducedMotion();

  /*
   * =========================================================
   * LOAD ANNOUNCEMENTS
   * =========================================================
   */

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "/api/announcements",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !Array.isArray(data)) {
        throw new Error(
          data?.message ||
            "Failed to load announcements."
        );
      }

      setAnnouncements(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load announcements."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  /*
   * =========================================================
   * DUPLICATE DATA FOR LOOP
   * =========================================================
   *
   * One announcement -> many copies.
   * Multiple announcements -> repeated set.
   */

  const loopItems = useMemo(() => {
    if (announcements.length === 0) {
      return [];
    }

    const repeats =
      announcements.length === 1
        ? 8
        : 4;

    return Array.from(
      { length: repeats },
      (_, setIndex) =>
        announcements.map(
          (announcement) => ({
            ...announcement,
            loopKey: `${setIndex}-${announcement.id}`,
          })
        )
    ).flat();
  }, [announcements]);

  /*
   * =========================================================
   * AUTO SCROLL
   * =========================================================
   */

  const isPointerDownRef =
    useRef(false);

  const [isPaused, setIsPaused] =
    useState(false);

  useEffect(() => {
    const container =
      scrollRef.current;

    if (
      !container ||
      reduceMotion ||
      loopItems.length === 0
    ) {
      return;
    }

    let animationFrame = 0;

    const speed = 0.42;

    const tick = () => {
      if (
        !isPaused &&
        !isPointerDownRef.current
      ) {
        container.scrollLeft += speed;

        /*
         * Reset around half.
         *
         * Because the content is duplicated,
         * the reset is visually seamless.
         */
        const half =
          container.scrollWidth / 2;

        if (
          container.scrollLeft >=
          half
        ) {
          container.scrollLeft -=
            half;
        }
      }

      animationFrame =
        window.requestAnimationFrame(
          tick
        );
    };

    animationFrame =
      window.requestAnimationFrame(
        tick
      );

    return () => {
      window.cancelAnimationFrame(
        animationFrame
      );
    };
  }, [
    loopItems.length,
    isPaused,
    reduceMotion,
  ]);

  /*
   * =========================================================
   * MOUSE DRAG
   * =========================================================
   */

  const handlePointerDown = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const container =
      scrollRef.current;

    if (!container) return;

    /*
     * Only left mouse button.
     * Touch is handled naturally by horizontal scrolling.
     */
    if (
      event.pointerType ===
        "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    isPointerDownRef.current =
      true;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startScrollLeft:
        container.scrollLeft,
    };

    setIsPaused(true);

    if (
      event.pointerType ===
      "mouse"
    ) {
      container.setPointerCapture(
        event.pointerId
      );
    }
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const container =
      scrollRef.current;

    if (
      !container ||
      !dragRef.current.active
    ) {
      return;
    }

    const distance =
      event.clientX -
      dragRef.current.startX;

    /*
     * Mouse drag only.
     */
    if (
      event.pointerType ===
      "mouse"
    ) {
      container.scrollLeft =
        dragRef.current
          .startScrollLeft -
        distance;
    }
  };

  const stopDragging = (
    event?: React.PointerEvent<HTMLDivElement>
  ) => {
    const container =
      scrollRef.current;

    if (
      event &&
      event.pointerType ===
        "mouse"
    ) {
      try {
        if (
          container &&
          container.hasPointerCapture(
            event.pointerId
          )
        ) {
          container.releasePointerCapture(
            event.pointerId
          );
        }
      } catch {
        // Ignore pointer release errors.
      }
    }

    isPointerDownRef.current =
      false;

    dragRef.current.active =
      false;

    setIsPaused(false);
  };

  /*
   * =========================================================
   * LOADING
   * =========================================================
   */

  if (loading) {
    return (
      <div className="flex min-h-[250px] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-slate-500">
          <Loader2
            size={28}
            className="animate-spin text-emerald-500"
          />

          <p className="text-sm">
            නිවේදන ලබාගනිමින්...
          </p>
        </div>
      </div>
    );
  }

  /*
   * =========================================================
   * ERROR
   * =========================================================
   */

  if (error) {
    return (
      <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-center dark:border-red-500/10 dark:bg-red-500/[0.05]">
        <p className="text-sm font-semibold text-red-600 dark:text-red-300">
          {error}
        </p>
      </div>
    );
  }

  /*
   * =========================================================
   * EMPTY
   * =========================================================
   */

  if (announcements.length === 0) {
    return (
      <div className="flex min-h-[250px] flex-col items-center justify-center rounded-[30px] border border-slate-200 bg-white text-center dark:border-white/10 dark:bg-white/[0.035]">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
          <Megaphone size={24} />
        </div>

        <h3 className="mt-4 font-black">
          තවම නිවේදන නැහැ
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          නවතම නිවේදන ඉක්මනින් මෙහි පෙන්වනු ඇත.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* ===================================================
          LEFT FADE
      ==================================================== */}

      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-slate-100 to-transparent dark:from-[#07120d]" />

      {/* ===================================================
          RIGHT FADE
      ==================================================== */}

      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-slate-100 to-transparent dark:from-[#07120d]" />

      {/* ===================================================
          SCROLLER
      ==================================================== */}

      <div
        ref={scrollRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={(event) => {
          if (
            event.pointerType ===
            "mouse"
          ) {
            stopDragging(event);
          }
        }}
        onMouseEnter={() =>
          setIsPaused(true)
        }
        onMouseLeave={() =>
          setIsPaused(false)
        }
        className="relative flex cursor-grab gap-4 overflow-x-auto overscroll-x-contain px-1 pb-3 [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        style={{
          touchAction:
            "pan-x",
          userSelect: "none",
        }}
      >
        {loopItems.map(
          (announcement) => (
            <motion.article
              key={
                announcement.loopKey
              }
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -5,
                    }
              }
              className="w-[82vw] max-w-[360px] shrink-0 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-[#0a1712] sm:w-[330px] lg:w-[360px]"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-white/5">
                <img
                  src={
                    announcement.imageUrl
                  }
                  alt={
                    announcement.title
                  }
                  draggable={false}
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />

                {/* Category badge */}
                <div className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[10px] font-black text-white backdrop-blur-md">
                  {announcement.title}
                </div>

                {/* Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <Megaphone
                      size={18}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-base font-black leading-6 text-slate-900 dark:text-white">
                      {
                        announcement.title
                      }
                    </h3>
                  </div>
                </div>

                {announcement.description && (
                  <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {
                      announcement.description
                    }
                  </p>
                )}

                <div className="mt-5 flex items-center justify-between gap-3">
                  <p className="truncate text-[10px] font-medium text-slate-400">
                    {
                      announcement.createdAt
                    }
                  </p>

                  {announcement.linkUrl && (
                    <a
                      href={
                        announcement.linkUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      draggable={false}
                      onPointerDown={(event) =>
                        event.stopPropagation()
                      }
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-emerald-500 px-3 py-2 text-xs font-black text-emerald-950 transition hover:bg-emerald-400"
                    >
                      Open
                      <ExternalLink
                        size={13}
                      />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          )
        )}
      </div>

      {/* ===================================================
          DRAG HINT
      ==================================================== */}

      <div className="mt-2 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
        <ArrowRight size={13} />

        {typeof window !==
          "undefined" &&
        window.innerWidth <
          768
          ? "Swipe to explore"
          : "Drag / swipe to explore"}
      </div>
    </div>
  );
          }
