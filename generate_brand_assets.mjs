import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, 'public');

// 1. Create clean SVG Favicon
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
      <stop offset="0%" stop-color="#E23A0B"/>
      <stop offset="50%" stop-color="#FF5722"/>
      <stop offset="100%" stop-color="#FFC107"/>
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E1E22"/>
      <stop offset="100%" stop-color="#0F0F11"/>
    </linearGradient>
  </defs>
  
  <!-- Outer Rounded Badge -->
  <rect width="512" height="512" rx="128" fill="url(#bgGrad)"/>
  <rect x="16" y="16" width="480" height="480" rx="112" fill="none" stroke="#E23A0B" stroke-width="12" stroke-opacity="0.6"/>
  
  <!-- Japanese Kanji '旨' (Umami) in Bold Calligraphic Style -->
  <g fill="#FFFFFF" text-anchor="middle" font-family="'Syne', 'Shippori Mincho', 'Noto Sans JP', sans-serif">
    <!-- Flame Motif Behind Kanji -->
    <path d="M256 90 C220 160 170 200 170 270 C170 330 205 380 256 400 C307 380 342 330 342 270 C342 210 292 160 256 90 Z" fill="url(#fireGrad)" opacity="0.95"/>
    <path d="M256 180 C235 225 205 250 205 295 C205 330 225 360 256 375 C287 360 307 330 307 295 C307 260 277 225 256 180 Z" fill="#FFF275"/>
    
    <!-- Central Kanji -->
    <text x="256" y="325" font-size="160" font-weight="900" fill="#FFFFFF" letter-spacing="2">旨</text>
  </g>
  
  <!-- Subtitle pill -->
  <rect x="136" y="415" width="240" height="44" rx="22" fill="#E23A0B"/>
  <text x="256" y="445" font-family="'Syne', sans-serif" font-size="22" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">UMAMI</text>
</svg>`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), faviconSvg.trim());
console.log('✓ Created public/favicon.svg');

// 2. Render high-res PNG assets using Playwright Headless Browser
async function renderPngAssets() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // A. Generate Apple Touch Icon (180x180) & Favicon PNGs (32x32, 192x192)
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: transparent; width: 512px; height: 512px; }
          svg { width: 512px; height: 512px; }
        </style>
      </head>
      <body>
        ${faviconSvg}
      </body>
    </html>
  `);

  await page.setViewportSize({ width: 512, height: 512 });
  
  // 180x180 Apple Touch Icon
  await page.screenshot({ path: path.join(PUBLIC_DIR, 'apple-touch-icon.png'), width: 180, height: 180, clip: { x: 0, y: 0, width: 512, height: 512 } });
  console.log('✓ Created public/apple-touch-icon.png');

  // 192x192 Favicon PNG
  await page.screenshot({ path: path.join(PUBLIC_DIR, 'favicon-192x192.png'), width: 192, height: 192, clip: { x: 0, y: 0, width: 512, height: 512 } });
  console.log('✓ Created public/favicon-192x192.png');

  // 32x32 Favicon PNG
  await page.screenshot({ path: path.join(PUBLIC_DIR, 'favicon-32x32.png'), width: 32, height: 32, clip: { x: 0, y: 0, width: 512, height: 512 } });
  console.log('✓ Created public/favicon-32x32.png');

  // B. Generate 1200x630 OpenGraph & Twitter Social Share Card
  const ogHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Syne:wght@700;800;900&family=Shippori+Mincho:wght@700&display=swap" rel="stylesheet">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1200px;
            height: 630px;
            background: #0E0E10;
            color: #FFFFFF;
            font-family: 'Plus Jakarta Sans', sans-serif;
            display: flex;
            position: relative;
            overflow: hidden;
          }
          .grid-bg {
            position: absolute;
            inset: 0;
            background-image: 
              linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 40px 40px;
          }
          .glow-ember {
            position: absolute;
            width: 700px;
            height: 700px;
            background: radial-gradient(circle, rgba(226,58,11,0.35) 0%, rgba(226,58,11,0) 70%);
            top: -150px;
            right: -100px;
            border-radius: 50%;
            filter: blur(40px);
          }
          .glow-bottom {
            position: absolute;
            width: 500px;
            height: 500px;
            background: radial-gradient(circle, rgba(226,58,11,0.2) 0%, rgba(226,58,11,0) 70%);
            bottom: -150px;
            left: -100px;
            border-radius: 50%;
            filter: blur(50px);
          }
          .content {
            position: relative;
            z-index: 10;
            width: 100%;
            height: 100%;
            padding: 70px 80px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .top-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .brand-lockup {
            display: flex;
            align-items: center;
            gap: 20px;
          }
          .logo-badge {
            width: 68px;
            height: 68px;
            background: #18181B;
            border: 2px solid rgba(226,58,11,0.5);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 30px rgba(226,58,11,0.3);
          }
          .logo-badge svg {
            width: 44px;
            height: 44px;
          }
          .brand-title {
            font-family: 'Syne', sans-serif;
            font-size: 46px;
            font-weight: 900;
            letter-spacing: -0.02em;
            line-height: 1;
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .kanji {
            font-family: 'Shippori Mincho', serif;
            color: #E23A0B;
            font-size: 28px;
          }
          .location-pill {
            background: rgba(226,58,11,0.15);
            border: 1px solid rgba(226,58,11,0.4);
            color: #FF5722;
            padding: 8px 18px;
            border-radius: 100px;
            font-size: 13px;
            font-weight: 800;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-family: monospace;
          }
          .center-content {
            margin-top: auto;
            margin-bottom: auto;
            max-width: 800px;
          }
          .headline {
            font-family: 'Syne', sans-serif;
            font-size: 64px;
            font-weight: 900;
            line-height: 1.05;
            letter-spacing: -0.03em;
            margin-bottom: 20px;
          }
          .headline span.fire {
            color: #E23A0B;
            background: linear-gradient(135deg, #FF6B4A 0%, #E23A0B 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .subheading {
            font-size: 22px;
            color: #A1A1AA;
            line-height: 1.4;
            max-width: 720px;
            font-weight: 400;
          }
          .bottom-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-top: 1px solid rgba(255,255,255,0.12);
            padding-top: 24px;
          }
          .tags {
            display: flex;
            gap: 24px;
            font-family: monospace;
            font-size: 13px;
            color: #D4D4D8;
            font-weight: 700;
          }
          .tags span {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .tags span::before {
            content: '●';
            color: #E23A0B;
            font-size: 10px;
          }
          .domain {
            font-family: 'Syne', sans-serif;
            font-size: 20px;
            font-weight: 800;
            color: #FFFFFF;
            letter-spacing: 1px;
          }
        </style>
      </head>
      <body>
        <div class="grid-bg"></div>
        <div class="glow-ember"></div>
        <div class="glow-bottom"></div>
        
        <div class="content">
          <div class="top-row">
            <div class="brand-lockup">
              <div class="logo-badge">
                <svg viewBox="0 0 100 100" fill="none">
                  <path d="M50 15 C42 30 32 40 32 55 C32 68 40 78 50 82 C60 78 68 68 68 55 C68 42 58 30 50 15 Z" fill="#E23A0B"/>
                  <path d="M50 35 C45 45 40 50 40 60 C40 68 45 74 50 77 C55 74 60 68 60 60 C60 53 55 45 50 35 Z" fill="#FFC107"/>
                  <text x="50" y="66" font-size="28" font-weight="bold" fill="#FFFFFF" text-anchor="middle" font-family="'Shippori Mincho', serif">旨</text>
                </svg>
              </div>
              <div class="brand-title">
                UMAMI <span class="kanji">旨味</span>
              </div>
            </div>
            <div class="location-pill">BOOTH 7 · SECTOR 8B CHD</div>
          </div>

          <div class="center-content">
            <h1 class="headline">Japanese <span class="fire">Fire-Grilled</span> Burgers.</h1>
            <p class="subheading">Thick fire-grilled burgers on Hokkaido milk buns baked in-house daily. Opening 1 October 2026.</p>
          </div>

          <div class="bottom-bar">
            <div class="tags">
              <span>OPENING 1 OCT 2026</span>
              <span>5:00 AM HOKKAIDO BAKING</span>
              <span>LIVE CHARCOAL FIRE</span>
            </div>
            <div class="domain">umamifire.com</div>
          </div>
        </div>
      </body>
    </html>
  `;

  await page.setContent(ogHtml);
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.waitForTimeout(1000); // Wait for Google fonts to render

  const ogPath = path.join(PUBLIC_DIR, 'og-image.png');
  await page.screenshot({ path: ogPath });
  console.log('✓ Created public/og-image.png (1200x630)');

  await browser.close();
}

renderPngAssets().catch(console.error);
