import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";
import { authEnabled } from "@/lib/auth";
import "./globals.css";

const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "AJ Digital — Client Portal",
  description:
    "Your business intelligence system: projects, approvals, deliverables, reports, and outcomes — in one calm place.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const tree = (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${body.variable} ${display.variable} ${mono.variable}`}
    >
      <body className="font-body antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );

  // Clerk is optional: with no publishable key, the portal runs in open
  // seed-mode (great for local/preview) and we skip the provider entirely.
  if (!authEnabled) return tree;

  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#e8ff5a",
          colorText: "#f8fafc",
          colorBackground: "#151b24",
          borderRadius: "14px",
        },
      }}
    >
      {tree}
    </ClerkProvider>
  );
}
