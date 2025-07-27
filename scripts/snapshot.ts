import puppeteer from "puppeteer";
import { writeFileSync } from "fs";
import { join } from "path";

async function takeScreenshot() {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate the page to a URL.
  await page.goto("https://developer.chrome.com/");

  // Set screen size.
  await page.setViewport({ width: 1080, height: 1024 });

  // Take screenshot
  const screenshotBuffer = await page.screenshot({ fullPage: true });

  // Save screenshot to file
  const screenshotPath = join(process.cwd(), "screenshot.png");
  writeFileSync(screenshotPath, screenshotBuffer);
  console.log(`Screenshot saved to: ${screenshotPath}`);

  await browser.close();
}

// Run only if this file is executed directly
if (process.argv[1] === import.meta.filename) {
  takeScreenshot().catch(console.error);
}
