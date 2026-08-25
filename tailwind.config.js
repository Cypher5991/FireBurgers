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
          canvas: '#F6F2EA',      // Toasted Hokkaido milk bun canvas
          dark: '#141416',        // Binchotan white oak charcoal
          darker: '#0D0E10',      // Obsidian Black
          ember: '#E23A0B',       // Hard-seared flame paprika (Primary)
          glaze: '#F5A623',       // French butter & egg-yolk glaze
          veg: '#2D5A27',         // Fresh Japanese shiso / wasabi
          nonveg: '#7A1C16',      // Charred cured beef / smoke
          umami: '#C89D7C',       // Toasted sesame & miso umami
          beet: '#5B101E',        // Fermented beetroot balsamic
          muted: '#8A8D93',       // Editorial Slate Gray
          pearl: '#F6F2EA',       // Backward-compatible alias
          orange: '#E23A0B',      // Backward-compatible alias
          amber: '#F5A623',       // Backward-compatible alias
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
