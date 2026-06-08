import type { Config } from "tailwindcss";

/**
 * AJ Digital Client Portal — "dark signal cockpit" tokens.
 *
 * Colors map to CSS variables in src/app/globals.css so the same class names
 * resolve to the light OR dark palette via the `.dark` class (next-themes).
 * Signal yellow (#E8FF5A) is reserved for the single focal element + primary
 * action per screen — never decoration.
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        elevated: "var(--surface-2)",
        inset: "var(--inset)",
        recessed: "var(--recessed)",

        line: "var(--line)",
        "line-soft": "var(--border-soft)",
        "line-strong": "var(--border-strong)",

        tx: "var(--tx)",
        tx2: "var(--tx2)",
        tx3: "var(--tx3)",
        "tx-faint": "var(--text-faint)",

        signal: "var(--signal)",
        "signal-hover": "var(--signal-hover)",
        "signal-ink": "var(--signal-ink)",
        "signal-soft": "var(--signal-soft)",
        "signal-border": "var(--signal-border)",

        ok: "var(--ok)",
        warn: "var(--warn)",
        bad: "var(--bad)",
        info: "var(--info)",

        "data-blue": "var(--data-blue)",
        "data-green": "var(--data-green)",
        "data-magenta": "var(--data-magenta)",
        "data-coral": "var(--data-coral)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Syne", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        sm: "10px",
        md: "14px",
        lg: "18px",
        xl: "22px",
        card: "20px",
        "2xl": "28px",
        pill: "999px",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        hover: "var(--shadow-hover)",
        glass: "var(--shadow-glass)",
        focal: "var(--shadow-focal)",
      },
      backgroundImage: {
        "hero-glow": "var(--hero-glow)",
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
