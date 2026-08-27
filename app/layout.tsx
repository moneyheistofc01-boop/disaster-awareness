import type { Metadata } from "next";
import "./globals.css";
import { ThemeProviderContext } from "../context/ThemeContext";
import { LanguageProvider } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IntroAnimation from "../components/IntroAnimation";

// SEO සඳහා අවශ්‍ය සම්පූර්ණ Meta Data
export const metadata: Metadata = {
  metadataBase: new URL("https://disaster-awareness.pages.dev/"), // මෙතනට ඔයාගේ ඇත්ත Website Link එක දාන්න (උදා: https://ecoguard.pages.dev)
  title: {
    default: "EcoGuard | Protect Nature & Survive Disasters",
    template: "%s | EcoGuard", // වෙනත් pages වලට යද්දී අගට EcoGuard කියලා වැටෙන්න
  },
  description: "Learn how to protect our environment, minimize plastic usage, plant trees, and stay safe during natural disasters. Join EcoGuard for a secure and green future.",
  keywords: [
    "EcoGuard", 
    "Nature Conservation", 
    "Natural Disasters", 
    "Sri Lanka", 
    "Environment Protection", 
    "Eco Friendly", 
    "Disaster Management", 
    "Save Earth", 
    "Green Future",
    "ස්වභාවදහම",
    "පරිසරය"
  ],
  authors: [{ name: "EcoGuard Team" }],
  creator: "EcoGuard",
  publisher: "EcoGuard",
  
  // Facebook, WhatsApp, LinkedIn වල share කරද්දි පේන විදිය (Open Graph)
  openGraph: {
    title: "EcoGuard | Nature & Disasters",
    description: "Join EcoGuard to learn about nature conservation and natural disaster survival. Let's protect our environment for future generations.",
    url: "/",
    siteName: "EcoGuard",
    images: [
      {
        url: "/og-image.png", // public folder එකට 1200x630 size එකේ පින්තූරයක් දාන්න 'og-image.png' නමින්
        width: 1200,
        height: 630,
        alt: "EcoGuard - Protect Nature",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter (X) එකේ share කරද්දි පේන විදිය
  twitter: {
    card: "summary_large_image",
    title: "EcoGuard | Protect Nature & Survive Disasters",
    description: "Learn how to protect our environment, minimize plastic usage, and stay safe during natural disasters.",
    images: ["/og-image.png"],
  },

  // Google Search Crawlers ලට දෙන උපදෙස්
  robots: {
    index: true, // Google වලට ගන්න කියලා කියන්නේ
    follow: true, // Link දිගේ යන්න දෙනවා
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Browser tab එකේ පේන අයිකන්
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300 antialiased font-sans">
        <ThemeProviderContext>
          <LanguageProvider>
            <IntroAnimation />
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProviderContext>
      </body>
    </html>
  );
}
