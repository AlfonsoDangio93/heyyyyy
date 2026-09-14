import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1600px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Public Sans", "sans-serif"],
        logo: ["Bungee", "sans-serif"],
        hand: ["Caveat", "cursive"],
        display: ["Instrument Serif", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        "card-border": "hsl(var(--card-border))",
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
          strong: "hsl(var(--secondary-strong))",
          pale: "hsl(var(--secondary-pale))",
        },
        highlight: {
          DEFAULT: "hsl(var(--highlight))",
          foreground: "hsl(var(--highlight-foreground))",
        },
        press: "hsl(var(--press))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          deep: "hsl(var(--surface-deep))",
        },
        graphite: "hsl(var(--graphite))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))",
        danger: "hsl(var(--danger))",
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
      transitionTimingFunction: {
        reveal: "cubic-bezier(0.22, 1, 0.36, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        float: "var(--shadow-float)",
      },
      backgroundImage: {
        "hero-gradient": "var(--hero-gradient)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
        card: "var(--radius-card)",
        pill: "var(--radius-pill)",
      },
      fontSize: {
        /* Scala fluida: interpola fra i due estremi invece di scattare ai
           breakpoint, cosi' non ci sono salti sui formati intermedi. */
        "fluid-sm": ["clamp(0.9rem, 0.86rem + 0.2vw, 1rem)", { lineHeight: "1.6" }],
        "fluid-base": ["clamp(1rem, 0.95rem + 0.3vw, 1.15rem)", { lineHeight: "1.65" }],
        "fluid-lg": ["clamp(1.125rem, 1rem + 0.6vw, 1.4rem)", { lineHeight: "1.6" }],
        "fluid-xl": ["clamp(1.35rem, 1.1rem + 1vw, 1.8rem)", { lineHeight: "1.45" }],
        "fluid-2xl": ["clamp(1.6rem, 1.2rem + 1.9vw, 2.4rem)", { lineHeight: "1.25" }],
        "fluid-3xl": ["clamp(2rem, 1.35rem + 2.8vw, 3.25rem)", { lineHeight: "1.15" }],
        "fluid-4xl": ["clamp(2.4rem, 1.5rem + 4vw, 4.25rem)", { lineHeight: "1.08" }],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
            opacity: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          to: {
            height: "0",
            opacity: "0",
          },
        },
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(-50%)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-14px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
        "accordion-up": "accordion-up 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        marquee: "marquee 40s linear infinite",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
