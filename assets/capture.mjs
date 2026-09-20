import puppeteer from "/Users/briyan/hackathon/sunwai/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js";
import { mkdirSync } from "node:fs";

const FPS = 20, DUR = 8.0, W = 1200, H = 300;
mkdirSync("frames", { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
  args: ["--font-render-hinting=none", "--force-color-profile=srgb", "--hide-scrollbars"],
});
const page = await browser.newPage();
await page.setViewport({ width: W, height: H, deviceScaleFactor: 2 });
await page.goto("file://" + process.cwd() + "/banner.html", { waitUntil: "domcontentloaded" });
await page.evaluate(() => document.fonts.ready);

const total = Math.round(FPS * DUR);
for (let f = 0; f < total; f++) {
  await page.evaluate((t) => window.seek(t), f / FPS);
  await page.screenshot({ path: `frames/${String(f).padStart(4, "0")}.png` });
}
console.log(`captured ${total} frames at ${W}x${H}@2x`);
await browser.close();
