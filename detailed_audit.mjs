import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5173';

async function detailedAudit() {
  const browser = await chromium.launch({ headless: true });

  const viewports = [
    { name: 'iPhone SE (375x667)', width: 375, height: 667 },
    { name: 'iPhone 14 (390x844)', width: 390, height: 844 },
    { name: 'Android (412x915)', width: 412, height: 915 },
    { name: 'iPad (768x1024)', width: 768, height: 1024 }
  ];

  console.log('=== DETAILED FORENSIC MOBILE UX AUDIT ===\n');

  for (const vp of viewports) {
    console.log(`\n======================================================`);
    console.log(`VIEWPORT: ${vp.name}`);
    console.log(`======================================================`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.width < 768,
      hasTouch: true
    });
    const page = await context.newPage();

    // 1. Check all 4 routes for overflow and elements
    for (const path of ['/', '/order', '/builder', '/sector-8']) {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);

      const pageMetrics = await page.evaluate((path) => {
        const docEl = document.documentElement;
        const body = document.body;
        const winW = window.innerWidth;
        const docScrollW = docEl.scrollWidth;
        const bodyScrollW = body.scrollWidth;
        const maxScrollW = Math.max(docScrollW, bodyScrollW);

        // Find all elements wider than viewport or extending past viewport
        const wideElements = [];
        document.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > winW + 1 || r.width > winW + 1) {
            let desc = el.tagName.toLowerCase();
            if (el.id) desc += `#${el.id}`;
            if (el.className && typeof el.className === 'string') {
              desc += '.' + el.className.split(' ').filter(c => c).slice(0, 2).join('.');
            }
            wideElements.push({
              tag: el.tagName,
              desc,
              width: Math.round(r.width),
              left: Math.round(r.left),
              right: Math.round(r.right),
              excess: Math.round(r.right - winW)
            });
          }
        });

        return {
          path,
          winW,
          maxScrollW,
          hasOverflow: maxScrollW > winW,
          wideElementsCount: wideElements.length,
          wideElements: wideElements.slice(0, 5)
        };
      }, path);

      console.log(`Route [${path}]: Overflow=${pageMetrics.hasOverflow ? 'YES (' + pageMetrics.maxScrollW + 'px)' : 'NO (Clean ' + pageMetrics.winW + 'px)'}`);
      if (pageMetrics.wideElementsCount > 0) {
        console.log(`  Elements exceeding boundary (${pageMetrics.wideElementsCount}):`, JSON.stringify(pageMetrics.wideElements, null, 2));
      }
    }

    // 2. Deep Dive: Header & Navigation
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const headerNavAudit = await page.evaluate(() => {
      const header = document.querySelector('header');
      const nav = header ? header.querySelector('nav') : null;
      const navDisplay = nav ? window.getComputedStyle(nav).display : 'none';
      const navLinks = nav ? Array.from(nav.querySelectorAll('a')).map(a => ({
        text: a.innerText,
        href: a.getAttribute('href'),
        visible: a.offsetParent !== null
      })) : [];

      const cartBtn = header ? header.querySelector('button') : null;
      const cartBtnRect = cartBtn ? cartBtn.getBoundingClientRect() : null;

      // Micro-bar on top
      const microBar = document.querySelector('div.bg-brand-dark.text-xs');
      const microBarItems = microBar ? Array.from(microBar.querySelectorAll('span, a')).map(el => ({
        text: el.innerText.trim(),
        visible: el.offsetParent !== null
      })) : [];

      return {
        headerHeight: header ? header.offsetHeight : 0,
        navDisplay,
        navLinksCount: navLinks.length,
        visibleNavLinks: navLinks.filter(l => l.visible).length,
        cartBtnSize: cartBtnRect ? { w: Math.round(cartBtnRect.width), h: Math.round(cartBtnRect.height) } : null,
        microBarVisibleItems: microBarItems.filter(i => i.visible && i.text).length
      };
    });
    console.log(`Navigation Audit: HeaderNavDisplay=${headerNavAudit.navDisplay}, Visible Nav Links=${headerNavAudit.visibleNavLinks}/${headerNavAudit.navLinksCount}, CartBtn=${headerNavAudit.cartBtnSize?.w}x${headerNavAudit.cartBtnSize?.h}px`);

    // 3. Deep Dive: BurgerHeroCanvas
    const heroAudit = await page.evaluate(() => {
      const hero = document.querySelector('#hero-canvas');
      if (!hero) return null;

      const layerCards = Array.from(hero.querySelectorAll('[style*="translate3d"] > div'));
      const layerData = layerCards.map((c, i) => {
        const r = c.getBoundingClientRect();
        return {
          layerIndex: i,
          w: Math.round(r.width),
          h: Math.round(r.height),
          left: Math.round(r.left),
          right: Math.round(r.right),
          clippedRight: r.right > window.innerWidth,
          clippedLeft: r.left < 0
        };
      });

      const drawer = hero.querySelector('.bg-brand-dark\\/95');
      const drawerRect = drawer ? drawer.getBoundingClientRect() : null;

      const thumbnails = Array.from(hero.querySelectorAll('.grid-cols-4 button'));
      const thumbData = thumbnails.map(t => {
        const r = t.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height) };
      });

      const specPills = Array.from(hero.querySelectorAll('.border.editorial-border-light.p-1 button'));
      const specPillData = specPills.map(p => {
        const r = p.getBoundingClientRect();
        return { text: p.innerText, w: Math.round(r.width), h: Math.round(r.height) };
      });

      return {
        layerData,
        anyLayerClipped: layerData.some(l => l.clippedRight || l.clippedLeft),
        drawerWidth: drawerRect ? Math.round(drawerRect.width) : 0,
        drawerHeight: drawerRect ? Math.round(drawerRect.height) : 0,
        thumbSizes: thumbData.slice(0, 2),
        specPillSizes: specPillData
      };
    });
    console.log(`BurgerHeroCanvas: LayerClipped=${heroAudit?.anyLayerClipped ? 'YES (Layer extends outside screen)' : 'NO'}, Layer count=${heroAudit?.layerData?.length}, DrawerW=${heroAudit?.drawerWidth}px`);
    if (heroAudit?.layerData) {
      heroAudit.layerData.forEach(l => {
        console.log(`  Layer ${l.layerIndex}: w=${l.w}px, left=${l.left}px, right=${l.right}px, clipped=${l.clippedRight || l.clippedLeft}`);
      });
    }

    // 4. Deep Dive: DipRadarVisualizer
    const radarAudit = await page.evaluate(() => {
      const radar = document.querySelector('#dip-radar');
      if (!radar) return null;

      const darkPanel = radar.querySelector('.bg-brand-dark');
      const darkPanelRect = darkPanel ? darkPanel.getBoundingClientRect() : null;
      const svg = radar.querySelector('svg');
      const svgRect = svg ? svg.getBoundingClientRect() : null;
      const svgParent = svg ? svg.parentElement : null;
      const svgParentRect = svgParent ? svgParent.getBoundingClientRect() : null;

      const sauceButtons = Array.from(radar.querySelectorAll('.grid-cols-2 button'));
      const sauceBtnSizes = sauceButtons.map(b => {
        const r = b.getBoundingClientRect();
        return { text: b.querySelector('.font-syne')?.innerText, w: Math.round(r.width), h: Math.round(r.height) };
      });

      const addBtn = radar.querySelector('button.bg-brand-ember');
      const addBtnRect = addBtn ? addBtn.getBoundingClientRect() : null;

      return {
        darkPanelWidth: darkPanelRect ? Math.round(darkPanelRect.width) : 0,
        svgParentWidth: svgParentRect ? Math.round(svgParentRect.width) : 0,
        svgWidth: svgRect ? Math.round(svgRect.width) : 0,
        sauceButtonsCount: sauceButtons.length,
        sampleSauceBtnSize: sauceBtnSizes[0],
        addBtnSize: addBtnRect ? { w: Math.round(addBtnRect.width), h: Math.round(addBtnRect.height) } : null
      };
    });
    console.log(`DipRadarVisualizer: DarkPanelW=${radarAudit?.darkPanelWidth}px, SvgParentW=${radarAudit?.svgParentWidth}px, SVG Size=${radarAudit?.svgWidth}px, AddBtn=${radarAudit?.addBtnSize?.w}x${radarAudit?.addBtnSize?.h}px`);

    // 5. Deep Dive: CrossSectionSlider
    const sliderAudit = await page.evaluate(() => {
      const slider = document.querySelector('#sensory-reveal');
      if (!slider) return null;

      const container = slider.querySelector('[class*="cursor-ew-resize"]');
      const containerRect = container ? container.getBoundingClientRect() : null;
      const dividerHandle = slider.querySelector('[style*="left:"] > div');
      const handleRect = dividerHandle ? dividerHandle.getBoundingClientRect() : null;

      const quickButtons = Array.from(slider.querySelectorAll('.flex.items-center.gap-2.mt-4 button'));
      const quickBtnSizes = quickButtons.map(b => {
        const r = b.getBoundingClientRect();
        return { text: b.innerText, w: Math.round(r.width), h: Math.round(r.height) };
      });

      const orderBtn = slider.querySelector('button.bg-brand-ember');
      const orderBtnRect = orderBtn ? orderBtn.getBoundingClientRect() : null;

      return {
        sliderContainerSize: containerRect ? { w: Math.round(containerRect.width), h: Math.round(containerRect.height) } : null,
        handleSize: handleRect ? { w: Math.round(handleRect.width), h: Math.round(handleRect.height) } : null,
        quickBtnSizes,
        orderBtnSize: orderBtnRect ? { w: Math.round(orderBtnRect.width), h: Math.round(orderBtnRect.height) } : null
      };
    });
    console.log(`CrossSectionSlider: Container=${sliderAudit?.sliderContainerSize?.w}x${sliderAudit?.sliderContainerSize?.h}px, Handle=${sliderAudit?.handleSize?.w}x${sliderAudit?.handleSize?.h}px, QuickBtns=${sliderAudit?.quickBtnSizes?.map(b => `${b.text}:${b.w}x${b.h}px`).join(', ')}`);

    // 6. Deep Dive: Touch Target Analysis across all interactive components
    const touchAudit = await page.evaluate(() => {
      const allTouchElements = Array.from(document.querySelectorAll('button, a, input, select, textarea, [role="button"]'));
      const substandardTargets = [];

      allTouchElements.forEach(el => {
        if (el.offsetParent === null) return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        const style = window.getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'none') return;

        if (r.width < 44 || r.height < 44) {
          const label = el.innerText?.trim().replace(/\s+/g, ' ').substring(0, 35) || el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.tagName;
          substandardTargets.push({
            tag: el.tagName.toLowerCase(),
            label,
            w: Math.round(r.width * 10) / 10,
            h: Math.round(r.height * 10) / 10,
            deficitW: Math.max(0, Math.round((44 - r.width) * 10) / 10),
            deficitH: Math.max(0, Math.round((44 - r.height) * 10) / 10)
          });
        }
      });

      return {
        totalInteractive: allTouchElements.length,
        substandardCount: substandardTargets.length,
        targets: substandardTargets
      };
    });
    console.log(`Touch Target Audit: ${touchAudit.substandardCount} out of ${touchAudit.totalInteractive} interactive elements are below WCAG 44px threshold.`);

    await context.close();
  }

  await browser.close();
  console.log('\n=== DETAILED AUDIT COMPLETED ===');
}

detailedAudit().catch(console.error);
