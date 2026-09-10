import type {
  Metadata,
  Viewport,
} from "next";

import "./globals.css";

import { ThemeProviderContext } from "../context/ThemeContext";
import { LanguageProvider } from "../context/LanguageContext";

import Header from "../components/Header";
import Footer from "../components/Footer";
import IntroAnimation from "../components/IntroAnimation";
import ShareButton from "../components/ShareButton";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",

  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f6f9f7",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#06100c",
    },
  ],

  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://ecoguard-srilanka.pages.dev/"
  ),

  title: {
    default:
      "සොබා සේනාංකය | Soba Senankaya",
    template:
      "%s | සොබා සේනාංකය",
  },

  description:
    "සොබා සේනාංකය යනු ස්වභාවධර්මය වෙනුවෙන් මනුෂ්‍යත්වයේ වගකීම හා වගවීම ශක්තිමත් කරමින් ස්වභාවික සමතුලිතතාව, සමාජ වගකීම සහ පරිසර ආරක්ෂාව වෙනුවෙන් එක්වන සමාජ මෙහෙවරකි.",

  keywords: [
    "සොබා සේනාංකය",
    "Soba Senankaya",
    "Nature",
    "Nature Conservation",
    "Environment",
    "Environmental Protection",
    "Sri Lanka",
    "Natural Balance",
    "Social Responsibility",
    "Nature Protection",
    "Environmental Awareness",
    "ස්වභාවධර්මය",
    "ස්වභාවදහම",
    "පරිසරය",
    "පරිසර ආරක්ෂාව",
    "ස්වභාවික සමතුලිතතාව",
    "මනුෂ්‍යත්වය",
  ],

  authors: [
    {
      name: "සොබා සේනාංකය",
    },
  ],

  creator: "සොබා සේනාංකය",
  publisher: "සොබා සේනාංකය",

  applicationName:
    "සොබා සේනාංකය",

  category:
    "Environment & Social Responsibility",

  classification:
    "Environmental awareness and social mission",

  referrer:
    "origin-when-cross-origin",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title:
      "සොබා සේනාංකය | Soba Senankaya",

    description:
      "සොබාදහම වෙනුවෙන් මනුෂ්‍යත්වයේ වගකීම හා වගවීම. ස්වභාවික සමතුලිතතාව සහ පරිසර ආරක්ෂාව වෙනුවෙන් එක්වන සමාජ මෙහෙවර.",

    url: "/",

    siteName:
      "සොබා සේනාංකය | Soba Senankaya",

    locale: "si_LK",

    alternateLocale: [
      "en_US",
    ],

    type: "website",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt:
          "සොබා සේනාංකය - Soba Senankaya",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "සොබා සේනාංකය | Soba Senankaya",

    description:
      "ස්වභාවධර්මය වෙනුවෙන් මනුෂ්‍යත්වයේ වගකීම හා වගවීම.",

    images: [
      "/og-image.png",
    ],
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
    shortcut:
      "/favicon-16x16.png",
    apple:
      "/apple-touch-icon.png",
  },

  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
    url: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="si"
      suppressHydrationWarning
    >
      <body
        className="
          min-h-screen
          overflow-x-hidden
          bg-[#f6f9f7]
          text-slate-900
          antialiased
          transition-colors
          duration-300
          dark:bg-[#06100c]
          dark:text-white
        "
      >
        <ThemeProviderContext>
          <LanguageProvider>
            <IntroAnimation />
            <Header />
            {children}
            <Footer />
            <ShareButton />
          </LanguageProvider>
        </ThemeProviderContext>
      </body>
    </html>
  );
}
