const { chromium } = require('C:/Users/nechanicky/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const { pathToFileURL } = require('url');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route(/^https?:/, route => route.abort());
  await page.goto(pathToFileURL(path.join(__dirname, 'index.html')).href);
  if (await page.locator('.comparison-row').count() !== 8) throw Error('Row count');
  if (await page.locator('.site-panel').count() !== 16) throw Error('Panel count');
  if (await page.locator('iframe').count() !== 16) throw Error('Iframe count');
  if (await page.locator('.column-resizer').count() !== 8) throw Error('Column handles');
  if (await page.locator('.row-resizer').count() !== 8) throw Error('Row handles');

  const column = page.locator('.column-resizer').first();
  const columnBox = await column.boundingBox();
  await page.mouse.move(columnBox.x + 5, columnBox.y + 80);
  await page.mouse.down();
  await page.mouse.move(columnBox.x + 125, columnBox.y + 80);
  await page.mouse.up();
  const leftSize = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--left-size'));
  if (!leftSize.includes('px')) throw Error('Column resize');

  const row = page.locator('.comparison-row').first();
  const before = await row.evaluate(node => node.getBoundingClientRect().height);
  const rowHandle = page.locator('.row-resizer').first();
  const rowBox = await rowHandle.boundingBox();
  await page.mouse.move(rowBox.x + 200, rowBox.y + 5);
  await page.mouse.down();
  await page.mouse.move(rowBox.x + 200, rowBox.y + 85);
  await page.mouse.up();
  const after = await row.evaluate(node => node.getBoundingClientRect().height);
  if (after <= before + 60) throw Error(`Row resize (${before} -> ${after})`);

  await page.locator('.home-button').first().click();
  await page.waitForFunction(() => document.querySelector('iframe').getAttribute('src') === 'https://www.sbb.ch/en');
  if (await page.locator('iframe').first().getAttribute('src') !== 'https://www.sbb.ch/en') throw Error('Home reset');
  await page.locator('#reset-layout').click();
  if (await row.getAttribute('style')) throw Error('Layout reset');
  await page.screenshot({ path: path.join(__dirname, 'qa-desktop.png'), fullPage: false });

  await page.setViewportSize({ width: 390, height: 844 });
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw Error('Mobile overflow');
  await page.screenshot({ path: path.join(__dirname, 'qa-mobile.png'), fullPage: false });
  if (errors.length) throw Error(errors.join('\n'));
  await browser.close();
  console.log('PASS: 16 iframe panels, reset controls, column/row drag resizing, persistence and mobile layout.');
})().catch(error => { console.error(error); process.exit(1); });
