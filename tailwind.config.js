/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF5500',      // Electric Fire Tangerine
          amber: '#FFC700',       // Solar Amber
          dark: '#121214',        // Deep Charcoal Slate
          darker: '#0A0A0C',      // Void Black
          card: '#1A1A1E',        // Slate Card
          pearl: '#FDFCF7',       // Crisp Warm Pearl
          muted: '#8E8E93',       // Muted Gray
          violet: '#8A2BE2',      // Electric Violet
          mint: '#00F5A0',        // Fresh Mint
        }
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
