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
          dark: '#12141A',        // Deep Charcoal Slate
          darker: '#0A0C10',      // Obsidian Black
          slate: '#1E222B',       // Deep Slate Card
          slateLight: '#2D323E',  // Elevated Slate
          pearl: '#FBF9F5',       // Washi Paper Light Pearl
          cream: '#F4F0E8',       // Light Linen Cream
          muted: '#7A808C',       // Muted Editorial Gray
          violet: '#8A2BE2',      // Electric Violet
          mint: '#00F5A0',        // Fresh Mint
        }
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        editorial: ['"Inter Tight"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        japanese: ['"Shippori Mincho"', 'serif'],
      },
      boxShadow: {
        'rim': '0 20px 40px -15px rgba(0, 0, 0, 0.15), 0 0 25px 2px rgba(255, 85, 0, 0.12)',
        'slate-lg': '0 25px 50px -12px rgba(18, 20, 26, 0.25)',
        'deep': '0 30px 60px -15px rgba(10, 12, 16, 0.35)',
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
