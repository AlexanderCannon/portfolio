import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.serif],
        display: ["var(--font-display)", ...fontFamily.serif],
        mono: ["var(--font-mono)", ...fontFamily.mono],
      },
      maxWidth: {
        measure: "38rem",
        shell: "68rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 1px)",
        sm: "calc(var(--radius) - 2px)",
      },
      colors: {
        paper: "hsl(var(--paper))",
        ink: {
          DEFAULT: "hsl(var(--ink))",
          muted: "hsl(var(--ink-muted))",
        },
        line: "hsl(var(--line))",
        stamp: "hsl(var(--stamp))",
        leather: {
          DEFAULT: "hsl(var(--leather))",
          edge: "hsl(var(--leather-edge))",
        },
        rope: "hsl(var(--rope))",
        canvas: "hsl(var(--canvas))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          soft: "hsl(var(--accent-soft))",
          foreground: "hsl(var(--accent-foreground))",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        vista: {
          "sky-top": "hsl(var(--vista-sky-top))",
          "sky-mid": "hsl(var(--vista-sky-mid))",
          "sky-bottom": "hsl(var(--vista-sky-bottom))",
          sun: "hsl(var(--vista-sun))",
          cloud: "hsl(var(--vista-cloud))",
          pine: "hsl(var(--vista-pine))",
          frame: "hsl(var(--vista-frame))",
          text: "hsl(var(--vista-text))",
          "text-muted": "hsl(var(--vista-text-muted))",
        },
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "cloud-drift": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(40px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.55s ease-out both",
        "cloud-drift": "cloud-drift 48s ease-in-out infinite alternate",
        "cloud-drift-slow": "cloud-drift 72s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
