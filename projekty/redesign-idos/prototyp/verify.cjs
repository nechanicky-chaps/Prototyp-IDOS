const {chromium}=require('C:/Users/nechanicky/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('url');
const path=require('path');
(async()=>{
const browser=await chromium.launch({headless:true,channel:"msedge"});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
await page.waitForSelector('.provider');
if(await page.locator('.provider').count()!==18)throw Error('Provider count');
if(await page.locator('.screen-card').count()!==29)throw Error('Screen count');
if(await page.evaluate(()=>window.MOBILE_CATALOG.reduce((n,a)=>n+a.screens.length,0))!==63)throw Error('Viewer state count');
if(await page.locator('.caption .user-notes').count()!==24)throw Error('User notes count');
if(await page.locator('.screen-card .screen-description').count()!==29)throw Error('Description count');
if(await page.locator('.video-card').count()!==7)throw Error('Video count');
if(await page.evaluate(()=>window.MOBILE_CATALOG.reduce((n,a)=>n+(a.videos||[]).length,0))!==7)throw Error('Video catalogue count');
if(await page.locator('.video-card .screen-id').count()!==0)throw Error('Obsolete video bullet');
await page.locator('.video-title').first().click();
await page.waitForFunction(()=>!document.querySelector('.video-card video').paused);
await page.locator('.video-card video').first().evaluate(video=>video.pause());
await page.locator('img').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
await page.waitForFunction(()=>[...document.querySelectorAll('img')].every(i=>i.complete&&i.naturalWidth>0));
await page.screenshot({path:path.join(__dirname,'qa-desktop.png')});
for(let i=0;i<18;i++){
await page.locator('.demo-button').nth(i).click();
await page.waitForSelector('[role=dialog]');
const expected=await page.locator('.state').count();
for(let j=0;j<expected;j++){
await page.locator('.state').nth(j).click();
await page.waitForFunction(()=>document.querySelector('.viewer-scroll img').complete&&document.querySelector('.viewer-scroll img').naturalWidth>0);
}
const expectedNotes=await page.evaluate(()=>window.MOBILE_CATALOG.find(a=>a.name===document.querySelector('.viewer-head .eyebrow').textContent.split(' / ')[0]).screens.find(s=>s.title===document.querySelector('#viewer-title').textContent).userNotes.length);
if(await page.locator('.viewer-notes .user-notes p').count()!==expectedNotes)throw Error('Viewer notes');
await page.getByRole('button',{name:'Zvětšit',exact:true}).click();
await page.getByRole('button',{name:'Přizpůsobit šířku',exact:true}).click();
await page.keyboard.press('ArrowRight');await page.keyboard.press('Escape');
}
await page.locator('.expand-button').first().click();
if(await page.locator('.expand-button').first().textContent()!=='Zkrátit dlouhý snímek ↑')throw Error('Expand');
await page.locator('.expand-button').first().click();
await page.locator('#db-navigator').scrollIntoViewIfNeeded();
await page.screenshot({path:path.join(__dirname,'qa-db.png')});
await page.setViewportSize({width:390,height:844});
await page.evaluate(()=>window.scrollTo(0,0));
await page.screenshot({path:path.join(__dirname,'qa-mobile.png')});
if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile overflow');
await page.locator('#regiojet .demo-button').click();
await page.locator('.state').filter({hasText:'Základní kategorie'}).click();
await page.getByRole('button',{name:'Zobrazit další tarify',exact:true}).click();
await page.getByRole('button',{name:'Skrýt další tarify',exact:true}).click();
await page.screenshot({path:path.join(__dirname,'qa-viewer-mobile.png')});
await page.keyboard.press('Escape');
if(errors.length)throw Error(errors.join('\n'));
console.log('PASS: 18 apps, 29 featured images, 7 videos with clickable headings, 63 viewer states decoded, zoom, keyboard, descriptions, expansion, 390px layout. No JS errors.');
await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});






