const {chromium}=require('C:/Users/nechanicky/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {pathToFileURL}=require('url');
const path=require('path');

(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1100,height:950}});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
 await page.waitForSelector('.phone');
 if(await page.locator('.step-button').count()!==5)throw Error('Nesprávný počet kroků');

 await page.getByRole('button',{name:'Hledat',exact:false}).click();
 await page.getByRole('button',{name:'Koupit',exact:false}).click();
 await page.getByRole('dialog').waitFor();
 const sheetText=await page.getByRole('dialog').innerText();
 for(const expected of ['IDS JMK Základní','3 zóny','90 minut','Bez jména cestujícího']){
  if(!sheetText.includes(expected))throw Error(`V panelu chybí: ${expected}`);
 }
 if(await page.getByRole('dialog').locator('input').count())throw Error('Panel neočekávaně obsahuje vstupní pole');

 await page.getByRole('button',{name:'Přidat jízdenku'}).click();
 if(!(await page.getByRole('dialog').innerText()).includes('Celkem 66 Kč'))throw Error('Cena se nepřepočítala');
 await page.getByRole('button',{name:'Pokračovat',exact:false}).click();
 const summaryText=await page.locator('.summary-info').innerText();
 if(!summaryText.includes('2× IDS JMK Základní'))throw Error('Souhrn neobsahuje dvě jízdenky');
 if(summaryText.match(/Jméno|Příjmení/))throw Error('Souhrn neočekávaně vyžaduje jméno');

 await page.locator('[data-addon="dog"]').click();
 await page.locator('.bottom-action[data-step="payment"]').click();
 await page.locator('[data-payment="card"]').click();
 await page.locator('#terms').uncheck();
 await page.locator('[data-action="pay"]').click();
 if(!((await page.locator('#toast').textContent())||'').includes('smluvní podmínky'))throw Error('Nefunguje kontrola podmínek');
 await page.screenshot({path:path.join(__dirname,'qa-desktop.png'),fullPage:true});

 await page.reload();
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('button',{name:'Hledat',exact:false}).click();
 await page.getByRole('button',{name:'Koupit',exact:false}).click();
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Horizontální přetečení na mobilu');
 await page.screenshot({path:path.join(__dirname,'qa-mobile-sheet.png')});
 if(errors.length)throw Error(errors.join('\n'));
 console.log('PASS: spodní výběr jízdenek, přepočet, souhrn bez jména, platba a mobilní rozvržení.');
 await browser.close();
})().catch(error=>{console.error(error);process.exit(1)});
