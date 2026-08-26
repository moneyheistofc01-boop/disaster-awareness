import "./globals.css";
import { ThemeProviderContext } from "../context/ThemeContext";
import { LanguageProvider } from "../context/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "EcoGuard | Nature & Disasters",
  description: "Learn about natural disasters and nature conservation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
        <ThemeProviderContext>
          <LanguageProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProviderContext>
      </body>
    </html>
  );
}
