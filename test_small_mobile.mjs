import { chromium } from 'playwright';

async function testSmallMobile() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 } // iPhone SE (Smallest modern mobile screen)
  });
  const page = await context.newPage();

  const pages = ['/', '/menu', '/story', '/visit', '/order', '/journal', '/journal/what-is-umami'];

  let allPassed = true;

  for (const p of pages) {
    await page.goto(`http://localhost:5174${p}`, { waitUntil: 'networkidle' });
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const innerWidth = await page.evaluate(() => window.innerWidth);

    if (scrollWidth > innerWidth) {
      console.error(`❌ [375px OVERFLOW] ${p}: scrollWidth=${scrollWidth}px > ${innerWidth}px (+${scrollWidth - innerWidth}px)`);
      allPassed = false;
    } else {
      console.log(`✅ [375px PASS] ${p.padEnd(30)}: exact ${scrollWidth}px == ${innerWidth}px`);
    }
  }

  await browser.close();
  if (!allPassed) process.exit(1);
}

testSmallMobile().catch((e) => {
  console.error(e);
  process.exit(1);
});
