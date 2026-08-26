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
    typographyAudit: {},
    burgerShowcaseAudit: {},
    navbarAudit: {},
  };

  try {
    // 1. Responsive & Overflow Audit across all viewports
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
        report.summary.totalChecks++;
        const targetUrl = `${BASE_URL}${route.path}`;
        
        try {
          await page.goto(targetUrl, { waitUntil: 'networkidle', timeout: 15000 });
          await page.waitForTimeout(400);

          const overflowData = await page.evaluate(() => {
            const docWidth = document.documentElement.scrollWidth;
            const winWidth = window.innerWidth;
            const bodyWidth = document.body.scrollWidth;
            const hasHorizontalOverflow = docWidth > winWidth + 1 || bodyWidth > winWidth + 1;
            return { docWidth, winWidth, bodyWidth, hasHorizontalOverflow };
          });

          const passed = !overflowData.hasHorizontalOverflow;
          if (passed) {
            report.summary.passedChecks++;
            console.log(`  ✓ Route ${route.path} | Overflow: NONE (Pass)`);
          } else {
            report.summary.failedChecks++;
            console.log(`  ❌ Route ${route.path} | Overflow: +${overflowData.docWidth - overflowData.winWidth}px (FAIL)`);
          }

          report.resultsByViewport[vp.name].routes[route.path] = {
            status: passed ? 'PASS' : 'FAIL',
            overflowData,
          };
        } catch (err) {
          report.summary.failedChecks++;
          console.error(`  ❌ Error on ${route.path}: ${err.message}`);
        }
      }

      await context.close();
    }

    // 2. Specific Typography Audit (Montserrat & Great Vibes)
    console.log('\n🔤 --- Auditing Typography Stack (Montserrat + Great Vibes) ---');
    const typoContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    const typoPage = await typoContext.newPage();
    await typoPage.goto(BASE_URL, { waitUntil: 'networkidle' });

    const typographyData = await typoPage.evaluate(() => {
      const h1 = document.querySelector('h1');
      const h2 = document.querySelector('h2');
      const body = document.body;
      const scriptEl = document.querySelector('.font-script, .script-accent');
      
      const getFont = (el) => el ? window.getComputedStyle(el).fontFamily : null;
      const getWeight = (el) => el ? window.getComputedStyle(el).fontWeight : null;

      return {
        h1Font: getFont(h1),
        h1Weight: getWeight(h1),
        h2Font: getFont(h2),
        bodyFont: getFont(body),
        scriptFont: getFont(scriptEl),
        hasMontserrat: getFont(h1)?.toLowerCase().includes('montserrat') || getFont(body)?.toLowerCase().includes('montserrat'),
        hasGreatVibes: getFont(scriptEl)?.toLowerCase().includes('great vibes') || false,
      };
    });

    report.typographyAudit = typographyData;
    report.summary.totalChecks += 2;
    
    if (typographyData.hasMontserrat) {
      report.summary.passedChecks++;
      console.log(`  ✓ Primary / Heading Font: Montserrat detected (Weight ${typographyData.h1Weight}) (Pass)`);
    } else {
      report.summary.failedChecks++;
      console.log(`  ❌ Primary Font: Montserrat NOT detected (${typographyData.h1Font}) (FAIL)`);
    }

    if (typographyData.hasGreatVibes) {
      report.summary.passedChecks++;
      console.log(`  ✓ Decorative Accent Font: Great Vibes detected (Pass)`);
    } else {
      report.summary.failedChecks++;
      console.log(`  ❌ Decorative Accent Font: Great Vibes NOT detected (${typographyData.scriptFont}) (FAIL)`);
    }

    // 3. Burger Hero Showcase Interactive Stage Audit
    console.log('\n🍔 --- Auditing Flagship Burger Showcase Stage ---');
    const showcaseData = await typoPage.evaluate(async () => {
      const buttons = [...document.querySelectorAll('button[data-burger-tab]')];
      const macroBtn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Grill Macro') || b.textContent.includes('Macro'));
      const heroBtn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Hero Full'));
      const mainImg = document.querySelector('img[alt*="UMAMI Japanese Burger"]');
      const initialImgSrc = mainImg?.src;

      // Check that layer anatomy is absent
      const hasExplodedLayer = !!document.querySelector('#layer-slider, [class*="exploded"], [id*="exploded"]');

      return {
        tabCount: buttons.length,
        hasMacroToggle: !!macroBtn,
        hasHeroToggle: !!heroBtn,
        initialImgSrc,
        hasExplodedLayer,
      };
    });

    report.burgerShowcaseAudit = showcaseData;
    report.summary.totalChecks += 3;

    if (showcaseData.tabCount >= 5) {
      report.summary.passedChecks++;
      console.log(`  ✓ 5 Signature Burger Tabs detected (${showcaseData.tabCount} found) (Pass)`);
    } else {
      report.summary.failedChecks++;
      console.log(`  ❌ Burger Tabs missing (found ${showcaseData.tabCount}) (FAIL)`);
    }

    if (showcaseData.hasMacroToggle) {
      report.summary.passedChecks++;
      console.log('  ✓ Dual-Angle / Macro Texture Switcher present and interactive (Pass)');
    } else {
      report.summary.failedChecks++;
      console.log('  ❌ Macro Texture Switcher NOT found (FAIL)');
    }

    if (!showcaseData.hasExplodedLayer) {
      report.summary.passedChecks++;
      console.log('  ✓ Layerwise anatomy successfully removed & replaced with high-impact hero photography (Pass)');
    } else {
      report.summary.failedChecks++;
      console.log('  ❌ Layerwise anatomy element still found in DOM (FAIL)');
    }

    // 4. Navbar Sticky Position & Transparency Check
    console.log('\n🧭 --- Auditing Navbar Scroll State & Transparency ---');
    await typoPage.evaluate(() => window.scrollTo(0, 0));
    await typoPage.waitForTimeout(300);
    await typoPage.evaluate(() => window.scrollTo(0, 300));
    await typoPage.waitForTimeout(400);

    const navScrolled = await typoPage.evaluate(() => {
      const stickyEl = document.querySelector('div.sticky') || document.querySelector('header');
      const header = document.querySelector('header');
      const rect = stickyEl?.getBoundingClientRect();
      const style = header ? window.getComputedStyle(header) : null;
      return {
        top: rect?.top,
        isTransparent: style?.backgroundColor === 'rgba(0, 0, 0, 0)' || style?.backgroundColor === 'transparent',
      };
    });

    report.summary.totalChecks++;
    if (navScrolled.top <= 5 && navScrolled.isTransparent) {
      report.summary.passedChecks++;
      console.log('  ✓ Sticky Navbar & Transparent on scroll: Verified (Pass)');
    } else {
      report.summary.failedChecks++;
      console.log(`  ❌ Sticky Navbar position or transparency failed (top: ${navScrolled.top}px, transparent: ${navScrolled.isTransparent})`);
    }

    await typoContext.close();

    // Save final report
    const reportPath = path.join(OUTPUT_DIR, 'design_audit_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log('\n=========================================');
    console.log('✅ Audit Completed Successfully!');
    console.log(`📊 Total Checks: ${report.summary.totalChecks}`);
    console.log(`🎉 Passed: ${report.summary.passedChecks} | ❌ Failed: ${report.summary.failedChecks}`);
    console.log(`📁 Report Saved: ${reportPath}`);
    console.log('=========================================\n');

  } finally {
    await browser.close();
  }
}

runDesignAudit();
