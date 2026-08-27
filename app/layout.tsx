import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProviderContext } from "../context/ThemeContext";
import { LanguageProvider } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import IntroAnimation from "../components/IntroAnimation";

// Page එක Zoom වෙන එක නවත්වන සැකසුම (Next.js අලුත් ක්‍රමය)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

// SEO සඳහා අවශ්‍ය සම්පූර්ණ Meta Data
export const metadata: Metadata = {
  metadataBase: new URL("https://ecoguard-srilanka.pages.dev/"),
  title: {
    default: "EcoGuard | Protect Nature & Survive Disasters",
    template: "%s | EcoGuard",
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
  
  openGraph: {
    title: "EcoGuard | Nature & Disasters",
    description: "Join EcoGuard to learn about nature conservation and natural disaster survival. Let's protect our environment for future generations.",
    url: "/",
    siteName: "EcoGuard",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EcoGuard - Protect Nature",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "EcoGuard | Protect Nature & Survive Disasters",
    description: "Learn how to protect our environment, minimize plastic usage, and stay safe during natural disasters.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

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
      {/* "select-none" කියන class එක එකතු කළා, එතකොට කිසිම දෙයක් select කරන්න බෑ */}
      <body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300 antialiased font-sans select-none">
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
