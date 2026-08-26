import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, 'audit_results');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const VIEWPORTS = [
  { name: 'Mobile_Small_375px', width: 375, height: 667, isMobile: true },
  { name: 'Mobile_Large_414px', width: 414, height: 896, isMobile: true },
  { name: 'Tablet_768px', width: 768, height: 1024, isMobile: false },
  { name: 'Desktop_1280px', width: 1280, height: 800, isMobile: false },
  { name: 'Desktop_Large_1920px', width: 1920, height: 1080, isMobile: false },
];

const ROUTES = [
  { path: '/', name: 'HomePage' },
  { path: '/story', name: 'StoryPage' },
  { path: '/menu', name: 'MenuPage' },
  { path: '/visit', name: 'VisitPage' },
  { path: '/order', name: 'OrderPage' },
  { path: '/journal', name: 'JournalIndexPage' },
];

const BASE_URL = 'http://localhost:5173';

async function runDesignAudit() {
  console.log('🍔 Starting UMAMI Fire Burgers Comprehensive Design & Responsive Audit...\n');
  
  const browser = await chromium.launch({ headless: true });
  const report = {
    timestamp: new Date().toISOString(),
    baseUrl: BASE_URL,
    routesAudited: ROUTES.map(r => r.path),
    viewportsTested: VIEWPORTS.map(v => `${v.name} (${v.width}x${v.height})`),
    summary: {
      totalChecks: 0,
      passedChecks: 0,
      failedChecks: 0,
      warnings: 0,
    },
    resultsByViewport: {},
    navbarAudit: {},
    mediaAudit: {},
    accessibilityAudit: {},
  };

  try {
    for (const vp of VIEWPORTS) {
      console.log(`\n📱 --- Auditing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
      report.resultsByViewport[vp.name] = {
        viewport: vp,
        routes: {},
      };

      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.isMobile,
      });
      const page = await context.newPage();

      for (const route of ROUTES) {
        const fullUrl = `${BASE_URL}${route.path}`;
        await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
        await page.waitForTimeout(600); // Allow Lenis and CSS animations to settle

        // 1. Check Horizontal Overflow
        const overflowMetrics = await page.evaluate(() => {
          const scrollWidth = document.documentElement.scrollWidth;
          const innerWidth = window.innerWidth;
          const hasHorizontalOverflow = scrollWidth > innerWidth;
          const overflowDelta = scrollWidth - innerWidth;

          // Find offending elements if any
          const offendingElements = [];
          if (hasHorizontalOverflow) {
            document.querySelectorAll('*').forEach(el => {
              const rect = el.getBoundingClientRect();
              if (rect.right > innerWidth + 1) {
                offendingElements.push({
                  tag: el.tagName,
                  className: (el.className || '').toString().slice(0, 80),
                  right: rect.right,
                  width: rect.width,
                });
              }
            });
          }

          return {
            scrollWidth,
            innerWidth,
            hasHorizontalOverflow,
            overflowDelta,
            offendingCount: offendingElements.length,
            offendingElements: offendingElements.slice(0, 3),
          };
        });

        report.summary.totalChecks++;
        const overflowPassed = !overflowMetrics.hasHorizontalOverflow;
        if (overflowPassed) {
          report.summary.passedChecks++;
        } else {
          report.summary.failedChecks++;
        }

        // 2. Capture Screenshot
        const screenshotPath = path.join(OUTPUT_DIR, `${route.name}_${vp.name}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });

        console.log(`  ✓ Route ${route.path} | Overflow: ${overflowPassed ? 'NONE (Pass)' : `FAILED (+${overflowMetrics.overflowDelta}px)`}`);

        report.resultsByViewport[vp.name].routes[route.path] = {
          status: overflowPassed ? 'PASS' : 'FAIL',
          overflowMetrics,
          screenshot: path.basename(screenshotPath),
        };
      }

      await context.close();
    }

    // --- Dedicated Navbar Scroll & Transparency Audit ---
    console.log('\n🧭 --- Auditing Navbar Scroll State & Transparency ---');
    const navContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const navPage = await navContext.newPage();
    await navPage.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await navPage.waitForTimeout(600);

    // Initial Navbar State
    const navInitial = await navPage.evaluate(() => {
      const header = document.querySelector('header');
      const menuBtn = document.querySelector('button[aria-label="Open Floating Navigation Sidebar"]');
      const logo = document.querySelector('a[href="/"]');
      const rect = header?.getBoundingClientRect();
      const style = header ? window.getComputedStyle(header) : null;
      
      return {
        top: rect?.top,
        height: rect?.height,
        backgroundColor: style?.backgroundColor,
        menuBtnVisible: menuBtn ? window.getComputedStyle(menuBtn).display !== 'none' && window.getComputedStyle(menuBtn).opacity !== '0' : false,
        logoVisible: !!logo,
      };
    });

    // Scroll Down 300px
    await navPage.evaluate(() => window.scrollTo(0, 300));
    await navPage.waitForTimeout(600);

    // Scrolled Navbar State
    const navScrolled = await navPage.evaluate(() => {
      const header = document.querySelector('header');
      const menuBtn = document.querySelector('button[aria-label="Open Floating Navigation Sidebar"]');
      const rect = header?.getBoundingClientRect();
      const style = header ? window.getComputedStyle(header) : null;
      
      return {
        top: rect?.top,
        height: rect?.height,
        backgroundColor: style?.backgroundColor,
        isTransparent: style?.backgroundColor === 'rgba(0, 0, 0, 0)' || style?.backgroundColor === 'transparent',
        menuBtnVisible: menuBtn ? window.getComputedStyle(menuBtn).display !== 'none' && window.getComputedStyle(menuBtn).opacity !== '0' : false,
      };
    });

    await navPage.screenshot({ path: path.join(OUTPUT_DIR, 'Navbar_Scrolled_State.png') });
    await navContext.close();

    const isStickyWorking = navScrolled.top === 0;
    const isTransparencyWorking = navScrolled.isTransparent;
    const isMenuBtnAppeared = navScrolled.menuBtnVisible;

    report.navbarAudit = {
      isStickyWorking,
      isTransparencyWorking,
      isMenuBtnAppeared,
      initialState: navInitial,
      scrolledState: navScrolled,
    };

    report.summary.totalChecks += 3;
    if (isStickyWorking) report.summary.passedChecks++; else report.summary.failedChecks++;
    if (isTransparencyWorking) report.summary.passedChecks++; else report.summary.failedChecks++;
    if (isMenuBtnAppeared) report.summary.passedChecks++; else report.summary.failedChecks++;

    console.log(`  Sticky Position: ${isStickyWorking ? 'STICKY AT TOP (Pass)' : 'FAIL'}`);
    console.log(`  Background Transparency: ${isTransparencyWorking ? 'TRANSPARENT (Pass)' : 'SOLID (Check)'}`);
    console.log(`  Menu Toggle Button on Scroll: ${isMenuBtnAppeared ? 'VISIBLE (Pass)' : 'FAIL'}`);

    // --- Interactive & Tap Target Size Audit (Mobile Viewport) ---
    console.log('\n👆 --- Auditing Tap Target Touch Sizes (Mobile) ---');
    const touchContext = await browser.newContext({ viewport: { width: 375, height: 667 }, isMobile: true });
    const touchPage = await touchContext.newPage();
    await touchPage.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await touchPage.waitForTimeout(600);

    const touchAudit = await touchPage.evaluate(() => {
      const interactives = Array.from(document.querySelectorAll('button, a, input, select'));
      let smallTargets = 0;
      const smallElements = [];

      interactives.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Visible elements only
        if (rect.width > 0 && rect.height > 0) {
          if (rect.width < 40 || rect.height < 40) {
            smallTargets++;
            if (smallElements.length < 5) {
              smallElements.push({
                tag: el.tagName,
                text: el.innerText.slice(0, 30).trim(),
                width: Math.round(rect.width),
                height: Math.round(rect.height),
              });
            }
          }
        }
      });

      return {
        totalInteractives: interactives.length,
        smallTargets,
        smallElementsSample: smallElements,
      };
    });

    await touchContext.close();
    report.accessibilityAudit = touchAudit;
    console.log(`  Total Interactive Elements: ${touchAudit.totalInteractives}`);
    console.log(`  Elements below 40x40px: ${touchAudit.smallTargets}`);

    // Save JSON Report
    const reportPath = path.join(OUTPUT_DIR, 'design_audit_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n=========================================');
    console.log(`✅ Audit Completed Successfully!`);
    console.log(`📊 Total Checks: ${report.summary.totalChecks}`);
    console.log(`🎉 Passed: ${report.summary.passedChecks} | ❌ Failed: ${report.summary.failedChecks}`);
    console.log(`📁 Report Saved: ${reportPath}`);
    console.log(`🖼️ Screenshots: ${OUTPUT_DIR}`);
    console.log('=========================================\n');

  } catch (err) {
    console.error('Audit encountered an error:', err);
  } finally {
    await browser.close();
  }
}

runDesignAudit();
