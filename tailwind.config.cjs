/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
        slabo27px: ['Slabo 27px', 'serif'],
        raleway: ['Raleway', 'sans-serif'],
        ptSans: ['PT Sans', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        playfairDisplay: ['Playfair Display', 'serif'],
        mulish: ['Mulish', 'sans-serif'],
        firaSans: ['Fira Sans', 'sans-serif'],
        inconsolata: ['Inconsolata', 'monospace'],
        karla: ['Karla', 'sans-serif'],
        libreBaskerville: ['Libre Baskerville', 'serif'],
        quicksand: ['Quicksand', 'sans-serif'],
        lora: ['Lora', 'serif'],
        ptSerif: ['PT Serif', 'serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        vollkorn: ['Vollkorn', 'serif'],
        oldStandardTT: ['Old Standard TT', 'serif'],
        dosis: ['Dosis', 'sans-serif'],
        hind: ['Hind', 'sans-serif'],
        josefinSans: ['Josefin Sans', 'sans-serif'],
        fjallaOne: ['Fjalla One', 'sans-serif'],
        notoSans: ['Noto Sans', 'sans-serif'],
        crimsonText: ['Crimson Text', 'serif'],
        dancingScript: ['Dancing Script', 'cursive'],
        lobster: ['Lobster', 'cursive'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        teal: {
          100: '#E6FFFA',
          500: '#38B2AC',
          600: '#319795',
        },
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
      borderRadius: {
        lg: "var(--radius)",
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
}