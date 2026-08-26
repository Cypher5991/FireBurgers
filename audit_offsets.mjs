import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runAudit() {
  console.log('🚀 Launching Vite Preview Server...');
  const server = spawn('npx', ['vite', 'preview', '--port', '5173'], {
    cwd: __dirname,
    shell: true,
    stdio: 'pipe'
  });

  server.stdout.on('data', (d) => console.log(`[Vite] ${d}`));
  server.stderr.on('data', (d) => console.error(`[Vite Error] ${d}`));

  // Wait 3 seconds for server to initialize
  await wait(3000);

  console.log('🚀 Starting Clean Showcase Visual Audit...');
  const browser = await chromium.launch({ headless: true });
  
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  // 1. Desktop Viewport Test (1280x800)
  const contextDesktop = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pageDesktop = await contextDesktop.newPage();
  
  await pageDesktop.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await pageDesktop.waitForTimeout(1000);

  // Take full hero carousel screenshot
  const heroCarousel = await pageDesktop.$('.editorial-border.shadow-2xl.bg-brand-dark');
  if (heroCarousel) {
    await heroCarousel.screenshot({ path: path.join(screenshotsDir, 'desktop_hero_carousel.png') });
    console.log('📸 Captured desktop_hero_carousel.png');
  }

  // Scroll to Burger Showcase
  await pageDesktop.locator('#burgers-showcase').scrollIntoViewIfNeeded();
  await pageDesktop.waitForTimeout(500);
  const burgerShowcase = await pageDesktop.$('#burgers-showcase');
  if (burgerShowcase) {
    await burgerShowcase.screenshot({ path: path.join(screenshotsDir, 'desktop_burger_showcase.png') });
    console.log('📸 Captured desktop_burger_showcase.png');
  }

  // Scroll to Pinnacle Duo
  const duoSection = await pageDesktop.locator('text=Two Pillars of the Grill').locator('..').locator('..');
  if (duoSection) {
    await duoSection.screenshot({ path: path.join(screenshotsDir, 'desktop_pinnacle_duo.png') });
    console.log('📸 Captured desktop_pinnacle_duo.png');
  }

  // 2. Mobile Viewport Test (375x812 iPhone X)
  const contextMobile = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const pageMobile = await contextMobile.newPage();
  
  await pageMobile.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(1000);

  // Capture Mobile Hero Carousel
  const mobileHeroCarousel = await pageMobile.$('.editorial-border.shadow-2xl.bg-brand-dark');
  if (mobileHeroCarousel) {
    await mobileHeroCarousel.screenshot({ path: path.join(screenshotsDir, 'mobile_hero_carousel.png') });
    console.log('📸 Captured mobile_hero_carousel.png');
  }

  // Capture Mobile Burger Showcase
  await pageMobile.locator('#burgers-showcase').scrollIntoViewIfNeeded();
  await pageMobile.waitForTimeout(500);
  const mobileBurgerShowcase = await pageMobile.$('#burgers-showcase');
  if (mobileBurgerShowcase) {
    await mobileBurgerShowcase.screenshot({ path: path.join(screenshotsDir, 'mobile_burger_showcase.png') });
    console.log('📸 Captured mobile_burger_showcase.png');
  }

  // 3. Check Menu Page intactness
  await pageDesktop.goto('http://localhost:5173/menu', { waitUntil: 'networkidle' });
  await pageDesktop.waitForTimeout(1000);
  await pageDesktop.screenshot({ path: path.join(screenshotsDir, 'menu_page_intact.png'), fullPage: false });
  console.log('📸 Captured menu_page_intact.png');

  // Verify Zero Overlays in Hero Carousel on Desktop
  const heroImageContainer = await pageDesktop.$('.editorial-border.shadow-2xl.bg-brand-dark > div:first-child');
  const overlayBadges = await heroImageContainer?.$$('.absolute.top-4');
  console.log('🔍 Hero Carousel Image Overlay Badge count:', overlayBadges?.length || 0);

  await browser.close();
  
  // Terminate server
  if (process.platform === 'win32') {
    spawn('taskkill', ['/pid', server.pid, '/f', '/t']);
  } else {
    server.kill();
  }

  console.log('✅ Audit finished successfully!');
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
