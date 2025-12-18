/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#ededed',
        primary: {
          DEFAULT: '#3b82f6', // Electric Blue
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#1e1e1e',
          foreground: '#a1a1aa',
        },
        accent: {
          DEFAULT: '#8b5cf6', // Violet
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#27272a',
          foreground: '#a1a1aa',
        },
        card: {
            DEFAULT: '#121212',
            foreground: '#ededed'
        }
      },
    },
  },
  plugins: [],
}


