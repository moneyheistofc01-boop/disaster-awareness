"use client";

import { useEffect, useState } from "react";
import { ExternalLink, ImageOff, Megaphone } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

type Announcement = {
  id: string | number;
  title?: string;
  description?: string;
  imageUrl: string;
  linkUrl?: string;
  createdAt?: string;
};

const demoAnnouncements: Announcement[] = [];

export default function LatestAnnouncements() {
  const { lang } = useLanguage();

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadAnnouncements = async () => {
      try {
        const response = await fetch("/api/announcements", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Announcements API unavailable");
        }

        const data = await response.json();

        if (!active) return;

        const items = Array.isArray(data)
          ? data
          : Array.isArray(data.announcements)
          ? data.announcements
          : [];

        setAnnouncements(items);
      } catch {
        if (active) {
          setAnnouncements(demoAnnouncements);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadAnnouncements();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-800" />
          <div className="mt-4 h-36 rounded-xl bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-10 text-center dark:border-gray-700 dark:bg-gray-900">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
          <Megaphone size={22} />
        </div>

        <h3 className="mt-4 font-bold text-gray-900 dark:text-white">
          {lang === "si"
            ? "නවතම නිවේදන ඉක්මනින්..."
            : "Latest announcements coming soon..."}
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
          {lang === "si"
            ? "Admin පැනලයෙන් නිවේදනයක් එක් කළ පසු මෙහි preview වේ."
            : "Announcements added from the admin panel will appear here."}
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* LEFT FADE */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-gray-100 to-transparent dark:from-gray-900/90" />

      {/* RIGHT FADE */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-gray-100 to-transparent dark:from-gray-900/90" />

      <div className="announcement-track flex w-max gap-4 py-1">
        {announcements.map((item) => (
          <AnnouncementCard
            key={item.id}
            item={item}
            lang={lang}
          />
        ))}

        {/* Duplicate set for smooth continuous scrolling */}
        {announcements.map((item) => (
          <AnnouncementCard
            key={`duplicate-${item.id}`}
            item={item}
            lang={lang}
          />
        ))}
      </div>

      <style jsx>{`
        .announcement-track {
          animation: announcement-scroll 28s linear infinite;
        }

        .announcement-track:hover {
          animation-play-state: paused;
        }

        @keyframes announcement-scroll {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .announcement-track {
            animation-duration: 22s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .announcement-track {
            animation: none;
            width: max-content;
          }
        }
      `}</style>
    </div>
  );
}

function AnnouncementCard({
  item,
  lang,
}: {
  item: Announcement;
  lang: "si" | "en";
}) {
  const cardContent = (
    <div className="w-[270px] shrink-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:w-[320px]">
      <div className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-800 sm:h-44">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title || "Announcement"}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <ImageOff size={30} />
          </div>
        )}

        <div className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
          {lang === "si" ? "නවතම නිවේදනය" : "Latest"}
        </div>
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-black leading-6 text-gray-900 dark:text-white">
          {item.title ||
            (lang === "si" ? "නවතම නිවේදනය" : "Latest Announcement")}
        </h3>

        {item.description && (
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
            {item.description}
          </p>
        )}

        {item.linkUrl && (
          <div className="mt-3 flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <ExternalLink size={14} />
            {lang === "si" ? "තවත් බලන්න" : "View more"}
          </div>
        )}
      </div>
    </div>
  );

  if (!item.linkUrl) {
    return cardContent;
  }

  return (
    <a
      href={item.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block transition-transform hover:-translate-y-1"
    >
      {cardContent}
    </a>
  );
        }
