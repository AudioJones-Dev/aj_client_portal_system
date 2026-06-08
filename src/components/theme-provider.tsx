"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/** Wraps the app with next-themes; `.dark` class strategy drives token swap. */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
