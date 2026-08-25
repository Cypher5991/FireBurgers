import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5174';

const ROUTES_TO_TEST = [
  '/',
  '/story',
  '/menu',
  '/visit',
  '/order',
  '/journal',
  '/contact',
  '/privacy',
  '/terms',
  '/journal/what-is-umami',
  '/journal/hokkaido-milk-bun-burger',
  '/journal/fire-grilled-vs-smash-burger',
  '/journal/sector-8b-inner-market-guide',
  '/journal/vegetarian-burger-guide'
];

async function runTests() {
  console.log('=== STARTING UMAMI COMPREHENSIVE TEST SUITE ===\n');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;

  for (const path of ROUTES_TO_TEST) {
    const url = `${BASE_URL}${path}`;
    try {
      const res = await page.goto(url, { waitUntil: 'networkidle' });
      const status = res ? res.status() : 0;
      
      // Check title and visible content
      const title = await page.title();
      const bodyText = await page.innerText('body');
      
      // Check em dashes
      const emDashCount = (bodyText.match(/—/g) || []).length;
      
      // Check for 404 text if expected route
      const is404 = bodyText.includes('404 · PAGE NOT FOUND');

      if (status === 200 && !is404) {
        console.log(`✅ [200 OK] ${path.padEnd(42)} | Title: "${title.slice(0, 35)}..." | EmDashes: ${emDashCount}`);
        passed++;
      } else {
        console.error(`❌ [FAIL] ${path} returned status ${status} or 404`);
        failed++;
      }
    } catch (err) {
      console.error(`❌ [ERROR] ${path}:`, err.message);
      failed++;
    }
  }

  // Test 404 Route
  console.log('\n--- Testing 404 Boundary ---');
  await page.goto(`${BASE_URL}/non-existent-route-999`, { waitUntil: 'networkidle' });
  const notFoundText = await page.innerText('body');
  if (notFoundText.includes('404 · PAGE NOT FOUND')) {
    console.log('✅ [PASS] 404 Error Boundary renders cleanly');
    passed++;
  } else {
    console.error('❌ [FAIL] 404 page failed to render');
    failed++;
  }

  // Test Mobile Navigation
  console.log('\n--- Testing Mobile Viewport & Tab Navigation (390x844) ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  const bottomNavVisible = await page.locator('nav.lg\\:hidden').isVisible();
  console.log(`📱 Mobile bottom nav dock visible: ${bottomNavVisible ? 'YES ✅' : 'NO ❌'}`);

  // Test Journal Quick Answer Box
  console.log('\n--- Testing Journal Quick Answer Box ---');
  await page.goto(`${BASE_URL}/journal/what-is-umami`, { waitUntil: 'networkidle' });
  const quickAnswerText = await page.locator('text=QUICK ANSWER').isVisible();
  console.log(`📖 Quick Answer AI extraction box present: ${quickAnswerText ? 'YES ✅' : 'NO ❌'}`);

  await browser.close();

  console.log('\n========================================');
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('========================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(e => {
  console.error(e);
  process.exit(1);
});
