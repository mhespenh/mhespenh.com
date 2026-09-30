/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ink: {
          1: "var(--ink-1)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
          4: "var(--ink-4)",
        },
        indigo: "#6d7dff",
        violet: "#9b86ff",
        mint: "#29c79a",
        rose: "#e94a76",
        amber: "#e9a23a",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "sans-serif"],
        display: ['"Manrope"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "var(--ink-2)",
            "--tw-prose-headings": "var(--ink-1)",
            "--tw-prose-lead": "var(--ink-2)",
            "--tw-prose-links": "var(--color-indigo)",
            "--tw-prose-bold": "var(--ink-1)",
            "--tw-prose-counters": "var(--ink-3)",
            "--tw-prose-bullets": "var(--ink-4)",
            "--tw-prose-hr": "var(--glass-border)",
            "--tw-prose-quotes": "var(--ink-1)",
            "--tw-prose-quote-borders": "var(--color-indigo)",
            "--tw-prose-captions": "var(--ink-3)",
            "--tw-prose-code": "var(--ink-1)",
            "--tw-prose-pre-code": "var(--ink-1)",
            "--tw-prose-pre-bg": "var(--tile-bg)",
            "--tw-prose-th-borders": "var(--glass-border)",
            "--tw-prose-td-borders": "var(--glass-border)",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        tilt: {
          "0%, 100%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(-5deg)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        tilt: "tilt 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
