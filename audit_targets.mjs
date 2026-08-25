import { chromium } from 'playwright';

async function auditTouchTargets() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 375, height: 667 }, hasTouch: true });

  const routes = [
    { path: '/', name: 'Homepage' },
    { path: '/order', name: 'Menu & D2C' },
    { path: '/builder', name: 'Combo Customizer' },
    { path: '/sector-8', name: 'Local Flagship Hub' }
  ];

  for (const r of routes) {
    await page.goto(`http://localhost:5173${r.path}`, { waitUntil: 'networkidle' });
    const smallTargets = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('button, a, input, select, textarea'));
      return items.filter(el => {
        if (el.offsetParent === null) return false;
        const rect = el.getBoundingClientRect();
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'none') return false;
        return (rect.width > 0 && rect.height > 0) && (rect.width < 44 || rect.height < 44);
      }).map(el => {
        const rect = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          text: el.innerText ? el.innerText.trim().replace(/\s+/g, ' ').substring(0, 30) : (el.getAttribute('aria-label') || el.getAttribute('placeholder') || 'icon-only'),
          w: Math.round(rect.width),
          h: Math.round(rect.height)
        };
      });
    });

    console.log(`\n--- ${r.name} (${r.path}) Small Targets (${smallTargets.length}): ---`);
    smallTargets.forEach(t => console.log(`  [<${t.tag}> "${t.text}"] size: ${t.w}x${t.h}px`));
  }

  await browser.close();
}

auditTouchTargets().catch(console.error);
