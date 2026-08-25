import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5173';

const VIEWPORTS = [
  { name: 'iPhone SE', width: 375, height: 667, isMobile: true, hasTouch: true },
  { name: 'iPhone 14', width: 390, height: 844, isMobile: true, hasTouch: true },
  { name: 'Android Large', width: 412, height: 915, isMobile: true, hasTouch: true },
  { name: 'iPad Mini', width: 768, height: 1024, isMobile: false, hasTouch: true }
];

const ROUTES = [
  { path: '/', name: 'Homepage' },
  { path: '/order', name: 'Menu & D2C' },
  { path: '/builder', name: 'Combo Customizer' },
  { path: '/sector-8', name: 'Local Flagship Hub' }
];

async function runAudit() {
  const browser = await chromium.launch({ headless: true });
  const report = {
    summary: {},
    overflows: [],
    navigationAudit: {},
    componentAudits: {},
    touchTargetViolations: []
  };

  console.log('=== STARTING MOBILE UX & RESPONSIVENESS AUDIT ===\n');

  for (const vp of VIEWPORTS) {
    console.log(`\n========================================`);
    console.log(`Testing Viewport: ${vp.name} (${vp.width}x${vp.height})`);
    console.log(`========================================`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.hasTouch,
      userAgent: vp.isMobile
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
        : 'Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
    });

    const page = await context.newPage();

    for (const route of ROUTES) {
      const url = `${BASE_URL}${route.path}`;
      console.log(`\n--- Testing Route: ${route.name} (${route.path}) ---`);
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

      // 1. Horizontal Overflow Detection
      const overflowData = await page.evaluate(() => {
        const docWidth = document.documentElement.clientWidth;
        const scrollWidth = document.documentElement.scrollWidth;
        const bodyScrollWidth = document.body.scrollWidth;
        const winInnerWidth = window.innerWidth;
        const hasOverflow = scrollWidth > winInnerWidth || bodyScrollWidth > winInnerWidth;

        // Find elements that bleed beyond the viewport
        const overflowingElements = [];
        const allElements = document.querySelectorAll('*');

        for (const el of allElements) {
          const rect = el.getBoundingClientRect();
          if (rect.right > winInnerWidth + 1.5 && rect.width > 0 && rect.height > 0) {
            let selector = el.tagName.toLowerCase();
            if (el.id) selector += `#${el.id}`;
            else if (el.className && typeof el.className === 'string') {
              selector += `.${el.className.trim().split(/\s+/).slice(0, 3).join('.')}`;
            }
            overflowingElements.push({
              tag: el.tagName,
              selector,
              textSnippet: el.innerText ? el.innerText.substring(0, 40).replace(/\n/g, ' ') : '',
              rect: {
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                height: Math.round(rect.height)
              },
              excessPx: Math.round(rect.right - winInnerWidth)
            });
          }
        }

        return {
          winInnerWidth,
          docWidth,
          scrollWidth,
          bodyScrollWidth,
          hasOverflow,
          overflowingElements: overflowingElements.slice(0, 10)
        };
      });

      console.log(`  Horizontal Overflow: ${overflowData.hasOverflow ? 'DETECTED' : 'NONE'} (scrollWidth: ${overflowData.scrollWidth}px, window: ${overflowData.winInnerWidth}px)`);
      if (overflowData.hasOverflow) {
        console.log(`  Excess Elements Count: ${overflowData.overflowingElements.length}`);
        overflowData.overflowingElements.forEach(el => {
          console.log(`    - [${el.selector}] width=${el.rect.width}px, right=${el.rect.right}px (+${el.excessPx}px): "${el.textSnippet}"`);
        });
      }

      report.overflows.push({
        viewport: vp.name,
        width: vp.width,
        route: route.name,
        path: route.path,
        ...overflowData
      });

      // 2. Mobile Navigation Check
      if (!report.navigationAudit[vp.name]) {
        const navData = await page.evaluate(() => {
          const navLinks = Array.from(document.querySelectorAll('header nav a, nav a')).map(a => ({
            text: a.innerText.trim(),
            href: a.getAttribute('href'),
            visible: a.offsetParent !== null && window.getComputedStyle(a).display !== 'none' && window.getComputedStyle(a).visibility !== 'none'
          }));

          const menuButtons = Array.from(document.querySelectorAll('header button, button[aria-label*="menu" i]')).map(b => ({
            ariaLabel: b.getAttribute('aria-label'),
            text: b.innerText.trim(),
            classes: b.className,
            visible: b.offsetParent !== null && window.getComputedStyle(b).display !== 'none'
          }));

          const headerNav = document.querySelector('header nav');
          const headerNavDisplay = headerNav ? window.getComputedStyle(headerNav).display : 'none';

          return {
            headerNavDisplay,
            navLinks,
            menuButtons
          };
        });

        report.navigationAudit[vp.name] = navData;
        console.log(`  Nav Visibility: Desktop nav display=${navData.headerNavDisplay}, Visible Nav Links in Header: ${navData.navLinks.filter(l => l.visible).length}/${navData.navLinks.length}`);
      }

      // 3. Touch Target Sizing Check (minimum 44x44px per WCAG 2.5.5 / Apple HIG)
      const touchTargetData = await page.evaluate((minSize) => {
        const interactiveElements = Array.from(document.querySelectorAll('button, a, input, select, textarea, [role="button"], [tabindex="0"]'));
        const smallTargets = [];

        for (const el of interactiveElements) {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && el.offsetParent !== null) {
            const style = window.getComputedStyle(el);
            if (style.display !== 'none' && style.visibility !== 'none' && style.opacity !== '0') {
              if (rect.width < minSize || rect.height < minSize) {
                let identifier = el.innerText ? el.innerText.trim().substring(0, 30).replace(/\n/g, ' ') : (el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.className);
                smallTargets.push({
                  tag: el.tagName,
                  type: el.getAttribute('type') || '',
                  identifier,
                  classes: typeof el.className === 'string' ? el.className.split(/\s+/).slice(0, 3).join('.') : '',
                  width: Math.round(rect.width * 10) / 10,
                  height: Math.round(rect.height * 10) / 10
                });
              }
            }
          }
        }
        return smallTargets;
      }, 44);

      if (touchTargetData.length > 0) {
        report.touchTargetViolations.push({
          viewport: vp.name,
          route: route.name,
          path: route.path,
          count: touchTargetData.length,
          samples: touchTargetData.slice(0, 10)
        });
      }
      console.log(`  Touch Targets < 44px: ${touchTargetData.length} items found`);
    }

    // 4. Component-specific audits on Homepage
    console.log(`\n--- Deep Component Audit on Homepage (${vp.name}) ---`);
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Component 1: BurgerHeroCanvas 3D Layer deconstruction & controls
    const burgerHeroAudit = await page.evaluate(() => {
      const heroSection = document.querySelector('#hero-canvas');
      if (!heroSection) return { error: 'hero-canvas not found' };

      const sectionRect = heroSection.getBoundingClientRect();
      const canvasContainer = heroSection.querySelector('.h-\\[490px\\]') || heroSection.querySelector('[style*="perspective"]');
      const containerRect = canvasContainer ? canvasContainer.getBoundingClientRect() : null;

      const layers = Array.from(heroSection.querySelectorAll('[style*="translate3d"]'));
      const layerBounds = layers.map((layer, i) => {
        const r = layer.getBoundingClientRect();
        return {
          index: i,
          width: Math.round(r.width),
          height: Math.round(r.height),
          left: Math.round(r.left),
          right: Math.round(r.right),
          top: Math.round(r.top),
          bottom: Math.round(r.bottom),
          overflowsViewport: r.right > window.innerWidth || r.left < 0
        };
      });

      const drawer = heroSection.querySelector('.bg-brand-dark\\/95');
      const drawerRect = drawer ? drawer.getBoundingClientRect() : null;

      return {
        sectionWidth: Math.round(sectionRect.width),
        containerRect: containerRect ? {
          width: Math.round(containerRect.width),
          height: Math.round(containerRect.height),
          left: Math.round(containerRect.left),
          right: Math.round(containerRect.right)
        } : null,
        layerCount: layers.length,
        layerBounds,
        anyLayerOverflows: layerBounds.some(l => l.overflowsViewport),
        drawerRect: drawerRect ? {
          width: Math.round(drawerRect.width),
          left: Math.round(drawerRect.left),
          right: Math.round(drawerRect.right)
        } : null
      };
    });

    console.log(`  [BurgerHeroCanvas] Layer count: ${burgerHeroAudit.layerCount}, Any layer overflow: ${burgerHeroAudit.anyLayerOverflows ? 'YES' : 'NO'}`);

    // Component 2: DipRadarVisualizer SVG fit
    const dipRadarAudit = await page.evaluate(() => {
      const radarSection = document.querySelector('#dip-radar');
      if (!radarSection) return { error: 'dip-radar not found' };

      const svgContainer = radarSection.querySelector('svg');
      const svgCard = svgContainer ? svgContainer.closest('.bg-brand-dark') : null;
      const cardRect = svgCard ? svgCard.getBoundingClientRect() : null;
      const svgRect = svgContainer ? svgContainer.getBoundingClientRect() : null;

      return {
        cardRect: cardRect ? {
          width: Math.round(cardRect.width),
          left: Math.round(cardRect.left),
          right: Math.round(cardRect.right),
          padding: window.getComputedStyle(svgCard).padding
        } : null,
        svgRect: svgRect ? {
          width: Math.round(svgRect.width),
          height: Math.round(svgRect.height)
        } : null,
        fitsInScreen: cardRect && cardRect.right <= window.innerWidth && cardRect.left >= 0
      };
    });

    console.log(`  [DipRadarVisualizer] Card width: ${dipRadarAudit.cardRect?.width}px, SVG size: ${dipRadarAudit.svgRect?.width}x${dipRadarAudit.svgRect?.height}px, Fits screen: ${dipRadarAudit.fitsInScreen ? 'YES' : 'NO'}`);

    // Component 3: CrossSectionSlider Touch Dragging
    const sliderAudit = await page.evaluate(() => {
      const sliderContainer = document.querySelector('#sensory-reveal [class*="cursor-ew-resize"]');
      if (!sliderContainer) return { error: 'sliderContainer not found' };

      const rect = sliderContainer.getBoundingClientRect();
      const divider = sliderContainer.querySelector('[style*="left:"]');
      const initialLeftStyle = divider ? divider.style.left : '';

      return {
        containerRect: {
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          left: Math.round(rect.left),
          right: Math.round(rect.right)
        },
        initialLeftStyle
      };
    });

    let dragSuccess = false;
    let newSliderPosition = '';
    const sliderLocator = page.locator('#sensory-reveal [class*="cursor-ew-resize"]');
    if (await sliderLocator.count() > 0) {
      const box = await sliderLocator.boundingBox();
      if (box) {
        const startX = box.x + box.width * 0.5;
        const startY = box.y + box.height * 0.5;
        const targetX = box.x + box.width * 0.25;

        // Use touch events
        await page.touchscreen.tap(startX, startY);
        // Dispatch touch events manually to test touch handler
        await page.evaluate(({ startX, targetX, startY }) => {
          const container = document.querySelector('#sensory-reveal [class*="cursor-ew-resize"]');
          if (container) {
            const touch = new Touch({
              identifier: Date.now(),
              target: container,
              clientX: targetX,
              clientY: startY,
              radiusX: 2.5,
              radiusY: 2.5,
              rotationAngle: 10,
              force: 0.5,
            });
            const touchEvent = new TouchEvent('touchmove', {
              cancelable: true,
              bubbles: true,
              touches: [touch],
              targetTouches: [touch],
              changedTouches: [touch]
            });
            container.dispatchEvent(touchEvent);
          }
        }, { startX, targetX, startY });

        newSliderPosition = await page.evaluate(() => {
          const divider = document.querySelector('#sensory-reveal [style*="left:"]');
          return divider ? divider.style.left : '';
        });

        dragSuccess = newSliderPosition !== sliderAudit.initialLeftStyle;
      }
    }

    console.log(`  [CrossSectionSlider] Drag test: Initial=${sliderAudit.initialLeftStyle}, AfterDrag=${newSliderPosition}, DragSuccess=${dragSuccess ? 'YES' : 'NO'}`);

    report.componentAudits[vp.name] = {
      burgerHero: burgerHeroAudit,
      dipRadar: dipRadarAudit,
      crossSectionSlider: { ...sliderAudit, dragSuccess, newSliderPosition }
    };

    await context.close();
  }

  await browser.close();
  return report;
}

runAudit().then(report => {
  console.log('\n========================================');
  console.log('AUDIT RUN FINISHED SUCCESSFULLY');
  console.log('========================================');
}).catch(err => {
  console.error('Audit failed with error:', err);
});
