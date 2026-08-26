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
          vert: '#1B4D3E',        // Café Vert Forest Green (Primary Brand)
          'vert-d': '#123528',    // Deep Forest Shadow Green (Dark Panels & Hero)
          'vert-l': '#2C6650',    // Sage Forest Green
          dark: '#123528',        // Deep Forest Vert (Replaces old gray/black)
          darker: '#0B231A',      // Ultra Deep Forest Night
          creme: '#F5EFE3',       // Warm Editorial Biscuit Crème (Canvas background)
          'creme-2': '#FBF8F1',   // Light Warm Off-White (Card background)
          'creme-3': '#ECE3D2',   // Deep Biscuit Accent
          canvas: '#F5EFE3',      // Primary Canvas
          gold: '#9A7B2D',        // Burnished Antique Gold Ink
          'gold-l': '#B89A4F',    // Light Warm Gold
          'gold-text': '#7E6525', // High-contrast Gold Text
          ember: '#E25822',       // Live Flame Orange Ember (Primary Accent)
          'ember-d': '#C8461A',   // Deep Charred Ember
          char: '#2B2B2B',        // Charcoal Ink
          'char-soft': '#4A4A45', // Soft Charcoal Body
          veg: '#1F7A34',         // Fresh Shiso / Pure Veg Green
          nonveg: '#9C2A1F',      // Charred Cured Smoke Non-Veg
          muted: '#7E857C',       // Muted Sage Slate Gray
          pearl: '#F5EFE3',       // Backward-compatible alias
          orange: '#E25822',      // Backward-compatible alias
          amber: '#9A7B2D',       // Backward-compatible alias
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
        syne: ['Montserrat', 'sans-serif'], // Backward-compatible alias
        inter: ['Montserrat', 'sans-serif'], // Backward-compatible alias
        script: ['"Great Vibes"', 'cursive'],
        accent: ['"Great Vibes"', 'cursive'],
        japanese: ['"Shippori Mincho"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
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
