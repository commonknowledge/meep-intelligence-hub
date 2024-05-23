import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        IBMPlexSans: ["IBMPlexSansReg", "sans-serif"],
        IBMPlexSansLight: ["IBMPlexSansLight", "sans-serif"],
        IBMPlexSansSemiBold: ["IBMPlexSansSemiBold", "sans-serif"],
        IBMPlexSansMedium: ["IBMPlexSansMedium", "sans-serif"],
        IBMPlexSansCondensed: ["IBMPlexSansCondensed", "sans-serif"],
        IBMPlexMono: ["IBMPlexMono", "sans-serif"],
        PPRightGrotesk: ["PPRightGrotesk, sans-serif"],
      },
      fontSize: {
        hXlg: [
          "4.5rem",
          {
            lineHeight: "107%",
            letterSpacing: "-0.2rem",
          },
        ],
        hXlgPP: [
          "4.7rem",
          {
            lineHeight: "107%",
            letterSpacing: "0rem",
          },
        ],
        hLgPP: [
          "36px",
          {
            lineHeight: "100%",
            fontWeight: "700",
            letterSpacing: "0.05rem",
          },
        ],
        hLg: [
          "36px",
          {
            lineHeight: "120%",
            fontWeight: "700",
          },
        ],
        hMd: [
          "21px",
          {
            lineHeight: "normal",
            letterSpacing: "0em",
            fontWeight: "500",
          },
        ],
        hSm: [
          "16px",
          {
            lineHeight: "normal",
            letterSpacing: "0em",
            fontWeight: "500",
          },
        ],
        base: [
          "16px",
          {
            lineHeight: "normal",
            letterSpacing: "0em",
            fontWeight: "400",
          },
        ],
        lg: [
          "20px",
          {
            lineHeight: "160%",
            letterSpacing: "0em",
          },
        ],
        sm: [
          "14px",
          {
            lineHeight: "normal",
            letterSpacing: "0em",
            fontWeight: "400",
          },
        ],
        tiny: [
          "12px",
          {
            lineHeight: "normal",
            letterSpacing: "0em",
            fontWeight: "400",
          },
        ],
        labelMain: [
          "12px",
          {
            lineHeight: "normal",
            letterSpacing: "0em",
            fontWeight: "500",
          },
        ],
        labelLg: [
          "14px",
          {
            lineHeight: "normal",
            letterSpacing: "0em",
            fontWeight: "500",
          },
        ],
        labelXlg: [
          "16px",
          {
            lineHeight: "normal",
            letterSpacing: "0em",
            fontWeight: "500",
          },
        ],
        dataName: [
          "13px",
          {
            lineHeight: "100%",
            letterSpacing: "0.65px",
            fontWeight: "500",
          },
        ],
        dataResult: [
          "16px",
          {
            lineHeight: "100%",
            letterSpacing: "-0.32px",
            fontWeight: "400",
          },
        ],
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        bold: "800",
      },
      colors: {
        brandBlue: "hsl(var(--brand-blue))",
        white: "hsl(var(--white))",
        muted: "hsl(var(--meep-gray-600))",
        meepGray: {
          100: "hsl(var(--meep-gray-100))",
          200: "hsl(var(--meep-gray-200))",
          300: "hsl(var(--meep-gray-300))",
          400: "hsl(var(--meep-gray-400))",
          500: "hsl(var(--meep-gray-500))",
          600: "hsl(var(--meep-gray-600))",
          700: "hsl(var(--meep-gray-700))",
          800: "hsl(var(--meep-gray-800))",
        },
        buttonText: "hsl(var(--button-text))",
        labour: "hsl(var(--labour))",
        conservative: "hsl(var(--conservative))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        yellow: "hsl(var(--yellow))",
        darkSecondary: "hsl(var(--dark-secondary))",
        background: {
          DEFAULT: "hsl(var(--meepGray-800))",
          secondary: "hsl(var(--meepGray-700))",
          tertiary: "hsl(var(--meepGray-600))",
        },
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
      },
      spacing: {
        xs: "10px",
        sm: "15px",
        md: "20px",
        lg: "30px",
      },
      borderRadius: {
        lg: "calc(var(--radius))",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
