import { chromium } from 'playwright';

async function checkMobileOverflow() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 } // iPhone 14 / standard mobile
  });
  const page = await context.newPage();

  const pages = ['/', '/menu', '/story', '/visit', '/order', '/journal'];

  for (const p of pages) {
    console.log(`\n========================================`);
    console.log(`AUDITING PAGE: ${p}`);
    console.log(`========================================`);
    await page.goto(`http://localhost:5174${p}`, { waitUntil: 'networkidle' });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const innerWidth = await page.evaluate(() => window.innerWidth);

    console.log(`Document scrollWidth: ${scrollWidth}px | Viewport innerWidth: ${innerWidth}px`);

    if (scrollWidth > innerWidth) {
      console.log(`⚠️ HORIZONTAL OVERFLOW DETECTED: +${scrollWidth - innerWidth}px`);

      // Find overflowing elements
      const overflowingElements = await page.evaluate(() => {
        const docWidth = window.innerWidth;
        const elements = document.querySelectorAll('*');
        const results = [];

        elements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.right > docWidth + 1 || rect.width > docWidth + 1) {
            results.push({
              tag: el.tagName.toLowerCase(),
              className: el.className ? el.className.toString().slice(0, 80) : '',
              id: el.id || '',
              rectRight: Math.round(rect.right),
              rectWidth: Math.round(rect.width),
              overflowPx: Math.round(rect.right - docWidth),
              textSnippet: el.innerText ? el.innerText.slice(0, 40).replace(/\n/g, ' ') : ''
            });
          }
        });
        return results;
      });

      console.log(`Found ${overflowingElements.length} overflowing DOM elements:`);
      overflowingElements.slice(0, 10).forEach((item, idx) => {
        console.log(`  [${idx + 1}] <${item.tag}> class="${item.className}" width=${item.rectWidth}px right=${item.rectRight}px (overflow +${item.overflowPx}px) text: "${item.textSnippet}"`);
      });
    } else {
      console.log(`✅ Zero horizontal overflow on mobile!`);
    }
  }

  await browser.close();
}

checkMobileOverflow().catch(console.error);
