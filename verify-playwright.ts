import { chromium } from 'playwright';
import path from 'path';

(async () => {
  console.log('Testing Playwright with explicit binary path...');
  
  // Explicitly point to the download we just verified
  const executablePath = '/Users/taajirah_systems/Library/Caches/ms-playwright/chromium-1217/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';

  try {
    const browser = await chromium.launch({ 
      executablePath,
      headless: true 
    });
    console.log('Browser launched successfully!');
    
    const page = await browser.newPage();
    await page.goto('https://taajirah.web.app');
    const title = await page.title();
    console.log(`Page title: ${title}`);
    
    await browser.close();
    console.log('SUCCESS: Playwright is functional.');
  } catch (err) {
    console.error('FAILED to launch browser:', err);
    process.exit(1);
  }
})();
