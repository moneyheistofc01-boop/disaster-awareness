"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeProviderContext({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  // Component එක browser එකේ load වුණාට පස්සේ mounted state එක true කරනවා
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load වෙනකන් සාමාන්‍ය විදියට children ටික පෙන්නනවා (hydration error එක එන්නේ නැති වෙන්න)
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
