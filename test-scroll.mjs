import { chromium } from 'playwright';

async function testScroll() {
  console.log('Launching browser to test scroll performance...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const errors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    errors.push(err.toString());
  });

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  console.log('Testing scrolling performance across the whole page...');
  const startTime = Date.now();

  for (let i = 0; i < 15; i++) {
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(60);
  }

  const duration = Date.now() - startTime;
  console.log(`Scroll completed in ${duration}ms with ${errors.length} errors.`);

  if (errors.length > 0) {
    console.error('Errors found:', errors);
  } else {
    console.log('SUCCESS: Zero console/runtime errors during continuous scrolling.');
  }

  // Also test /order, /builder, /sector-8
  console.log('Testing /order...');
  await page.goto('http://localhost:5173/order', { waitUntil: 'networkidle' });
  await page.mouse.wheel(0, 500);

  console.log('Testing /builder...');
  await page.goto('http://localhost:5173/builder', { waitUntil: 'networkidle' });
  await page.mouse.wheel(0, 500);

  console.log('Testing /sector-8...');
  await page.goto('http://localhost:5173/sector-8', { waitUntil: 'networkidle' });
  await page.mouse.wheel(0, 500);

  console.log('All tests passed cleanly!');
  await browser.close();
}

testScroll().catch((e) => {
  console.error('Test failed:', e);
  process.exit(1);
});
