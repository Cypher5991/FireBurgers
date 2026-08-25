import { chromium } from 'playwright';

async function testDipRadar() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 375, height: 667 },
    isMobile: true,
    hasTouch: true
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const radarInfo = await page.evaluate(() => {
    const radar = document.querySelector('#dip-radar');
    const panel = radar.querySelector('.bg-brand-dark');
    const panelStyle = window.getComputedStyle(panel);
    const panelRect = panel.getBoundingClientRect();
    const radarWrapper = panel.querySelector('.w-72');
    const wrapperRect = radarWrapper.getBoundingClientRect();

    // Check all axis labels
    const labels = Array.from(radarWrapper.querySelectorAll('span.absolute')).map(s => {
      const r = s.getBoundingClientRect();
      return {
        text: s.innerText,
        rect: { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) },
        clippedLeft: r.left < panelRect.left + parseFloat(panelStyle.paddingLeft),
        clippedRight: r.right > panelRect.right - parseFloat(panelStyle.paddingRight)
      };
    });

    return {
      panelWidth: panelRect.width,
      panelPadding: `${panelStyle.paddingLeft} / ${panelStyle.paddingRight}`,
      panelInnerWidth: panelRect.width - parseFloat(panelStyle.paddingLeft) - parseFloat(panelStyle.paddingRight),
      wrapperWidth: wrapperRect.width,
      labels
    };
  });

  console.log('DipRadar on iPhone SE 375px:', JSON.stringify(radarInfo, null, 2));
  await browser.close();
}

testDipRadar().catch(console.error);
