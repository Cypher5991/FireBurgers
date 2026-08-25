import { chromium } from 'playwright';

async function testScrollToTop() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Testing route navigation scroll-to-top behavior...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Scroll down to the bottom of the homepage
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);

  const scrolledY = await page.evaluate(() => window.scrollY);
  console.log(`Scrolled down to: ${scrolledY}px`);

  // Click on "MENU & ORDER" link in the navbar
  await page.click('text="MENU & ORDER"');
  await page.waitForTimeout(400);

  const newScrollY = await page.evaluate(() => window.scrollY);
  console.log(`Scroll position after clicking link: ${newScrollY}px`);

  if (newScrollY === 0) {
    console.log('SUCCESS: Page jumped to the top (scrollY = 0) upon link click!');
  } else {
    console.error(`FAIL: Expected scrollY = 0, got ${newScrollY}`);
    process.exit(1);
  }

  // Scroll down on order page
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(300);

  // Click on "TRAY BUILDER"
  await page.click('text="TRAY BUILDER"');
  await page.waitForTimeout(400);

  const builderScrollY = await page.evaluate(() => window.scrollY);
  console.log(`Scroll position on /builder: ${builderScrollY}px`);

  if (builderScrollY === 0) {
    console.log('SUCCESS: Page jumped to top on /builder navigation!');
  }

  await browser.close();
}

testScrollToTop().catch((e) => {
  console.error('Test failed:', e);
  process.exit(1);
});
