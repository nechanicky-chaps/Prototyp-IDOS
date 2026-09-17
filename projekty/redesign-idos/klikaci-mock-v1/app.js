const steps=[
 {id:'search',label:'Hledání'},
 {id:'results',label:'Výsledky'},
 {id:'tickets',label:'Výběr jízdenek'},
 {id:'summary',label:'Souhrn'},
 {id:'payment',label:'Platba'}
];

const initialState=()=>({
 step:'search',dark:true,from:'Moje poloha (±12 m)',to:'Adamov, železniční zastávka',
 quantity:1,dog:false,bike:false,payment:'gpay',terms:true,ticketSheet:false
});
let state=initialState();
const app=document.getElementById('app');
const phone=document.getElementById('phone');
const nav=document.getElementById('step-nav');
const sheetRoot=document.getElementById('sheet');
const toast=document.getElementById('toast');

const total=()=>33*state.quantity;
const header=(title,back=true,actions='')=>`<header class="app-header">${back?`<button class="icon-button" data-action="back" aria-label="Zpět">←</button>`:''}<h2>${title}</h2>${actions}<button class="icon-button" aria-label="Další možnosti">⋮</button></header>`;
const bottomNav=()=>`<nav class="bottom-nav" aria-label="Hlavní navigace"><button class="active"><span>⌕</span>Spojení</button><button><span>◉</span>Odjezdy</button><button><span>◇</span>Jízdenky</button><button><span>☰</span>Více</button></nav>`;

function showToast(message){toast.textContent=message;toast.hidden=false;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.hidden=true,3200);}
function closeTicketSheet(){state.ticketSheet=false;sheetRoot.hidden=true;sheetRoot.innerHTML='';if(state.step==='tickets')state.step='results';renderNav();}
function setStep(step){state.step=step;state.ticketSheet=step==='tickets';render();}
function previousStep(){const i=steps.findIndex(item=>item.id===state.step);setStep(steps[Math.max(0,i-1)].id);}

function renderTicketSheet(){
 if(!state.ticketSheet){sheetRoot.hidden=true;sheetRoot.innerHTML='';return;}
 sheetRoot.hidden=false;
 sheetRoot.innerHTML=`<section class="sheet ticket-sheet" role="dialog" aria-modal="true" aria-labelledby="ticket-sheet-title">
  <div class="sheet-handle" aria-hidden="true"></div>
  <div class="ticket-sheet-head"><div><p>JÍZDENKY PRO CESTU</p><h3 id="ticket-sheet-title">Vyberte jízdenky</h3></div><button class="sheet-x" data-action="close-sheet" aria-label="Zavřít">×</button></div>
  <article class="ticket-product"><div class="ticket-product-main"><span class="ticket-glyph" aria-hidden="true">◇</span><div><strong>IDS JMK Základní</strong><small>3 zóny · platnost 90 minut</small></div><strong>33 Kč</strong></div>
   <div class="quantity-row"><span>Počet jízdenek</span><div class="quantity-control"><button data-action="minus" aria-label="Odebrat jízdenku" ${state.quantity<=1?'disabled':''}>−</button><output>${state.quantity}</output><button data-action="plus" aria-label="Přidat jízdenku">+</button></div></div>
  </article>
  <p class="identity-note"><strong>Bez jména cestujícího.</strong> Osobní údaje se mají zobrazit jen u tarifu, který je skutečně vyžaduje.</p>
  <button class="sheet-secondary" data-action="other-ticket">Přidat jiný typ jízdenky</button>
  <button class="sheet-primary" data-step="summary"><span>Celkem ${total()} Kč</span><span>Pokračovat →</span></button>
 </section>`;
}

function renderNav(){nav.innerHTML=steps.map((item,index)=>`<button class="step-button" data-step="${item.id}" ${item.id===state.step?'aria-current="step"':''}>${index+1}. ${item.label}</button>`).join('');}
function renderSearch(){return `${header('Spojení',false)}<div class="screen"><div class="screen-pad"><div class="form-region">⌄ <strong>Brno + IDS JMK</strong></div><div class="route-fields"><div class="route-row"><div class="route-dot">⦿</div><label>Odkud<input id="from" value="${state.from}"></label><span>▱</span></div><div class="route-row"><div class="route-dot">●</div><label>Kam<input id="to" value="${state.to}"></label><span>▱</span></div><button class="icon-button swap-button" data-action="swap" aria-label="Prohodit odkud a kam">⇅</button></div><div class="option-row"><span class="option-icon">◷</span><span>Odjezd nyní</span></div><div class="option-row"><span>⌄</span><span>Rozšířené zadání</span></div><button class="search-button" data-step="results">⌕&nbsp; Hledat</button><div class="section-label">Oblíbená spojení</div><div class="favourite"><span class="round-mode">MHD</span><div><strong>Moje poloha<br>Adamov, železniční zastávka</strong><small>za 30 min &nbsp; Tram 1</small></div><span>⋮</span></div><div class="favourite"><span class="round-mode">MHD</span><div><strong>Adamov, železniční zastávka<br>Brno, Bráfova</strong><small>za 1 min &nbsp; Vlak S2</small></div><span>⋮</span></div></div></div>${bottomNav()}`;}

function connectionBlock(second=false){return `<article class="result-block"><div class="result-time"><span>● &nbsp; za ${second?'58':'30'} min</span><span>44 min</span></div><div class="connection"><div class="leg"><div class="leg-icon">▣</div><div><small>přesun asi ${second?'6':'8'} min</small><h3>Tram ${second?'10':'1'}</h3><p><strong>${second?'13:34':'13:06'}</strong> &nbsp; ${second?'Mozolky':'Bráfova z'}</p><p><strong>${second?'13:50':'13:23'}</strong> &nbsp; Hlavní nádraží</p><small>odjezd bývá včas</small></div></div>${second?'':`<div class="leg train"><div class="leg-icon">▣</div><div><small>přesun asi 4 min</small><h3>Vlak S2</h3><p><strong>13:29</strong> &nbsp; Brno hl. n.</p><p><strong>13:50</strong> &nbsp; Adamov zastávka</p></div></div><div class="connection-buy"><span class="price">od 33 Kč</span><button class="outline-button" data-step="tickets">🛒 &nbsp; Koupit</button></div>`}</div></article>`;}
function renderResults(){return `${header('Spojení')}<div class="screen">${connectionBlock(false)}${connectionBlock(true)}</div>${bottomNav()}`;}

function renderSummary(){return `${header('Souhrn jízdenek',true,`<button class="icon-button" data-action="reset" aria-label="Obnovit">↻</button>`)}<div class="screen"><div class="result-time"><span>za 30 min</span></div><section class="summary-connection"><h3>Spojení</h3><div class="leg"><div class="leg-icon">▣</div><div><h3>Tram 1</h3><p><strong>13:06</strong> &nbsp; Bráfova z</p><p><strong>13:23</strong> &nbsp; Hlavní nádraží</p></div></div><div class="leg train"><div class="leg-icon">▣</div><div><h3>Vlak S2</h3><p><strong>13:29</strong> &nbsp; Brno hl. n.</p><p><strong>13:50</strong> &nbsp; Adamov zastávka</p></div></div></section><section class="summary-info"><div class="summary-row"><span class="label">Aktivace</span><strong>Automatická aktivace</strong><button class="text-link" data-action="activation">Upravit</button></div><div class="summary-row"><span class="label">jízdenky</span><strong>${state.quantity}× IDS JMK Základní<br><small>3 zóny · 90 minut</small></strong><button class="text-link" data-step="tickets">Upravit</button></div><div class="summary-row"><span class="label">cena</span><strong>${total()} Kč</strong></div><button class="text-link" data-action="conditions">Přepravní podmínky</button></section><div class="addons"><button class="addon ${state.dog?'selected':''}" data-addon="dog">🐕 ${state.dog?'Pes přidán':'Přidat psa'}</button><button class="addon ${state.bike?'selected':''}" data-addon="bike">🚲 ${state.bike?'Kolo přidáno':'Přidat kolo'}</button></div></div><button class="bottom-action" data-step="payment"><strong>${state.quantity}× &nbsp; ${total()} Kč</strong><span>Platba &nbsp; →</span></button>`;}

function renderPayment(){return `${header('Platba')}<div class="screen"><label class="field"><span>Kontaktní e-mail</span><input value="jan.novak@example.cz" inputmode="email"></label><label class="terms"><input id="terms" type="checkbox" ${state.terms?'checked':''}><span>Souhlasím se <u>Smluvními podmínkami IDOS.cz</u></span></label><div class="payment-grid"><button class="payment-method ${state.payment==='gpay'?'selected':''}" data-payment="gpay">G Pay</button><button class="payment-method ${state.payment==='card'?'selected':''}" data-payment="card">VISA<br><small>Mastercard · Maestro</small></button></div><button class="payment-more" data-action="more-payments">Další způsoby platby</button></div><button class="bottom-action" data-action="pay"><strong>${state.quantity}× &nbsp; ${total()} Kč</strong><span>Zaplatit &nbsp; →</span></button>`;}

const renderers={search:renderSearch,results:renderResults,tickets:renderResults,summary:renderSummary,payment:renderPayment};
function render(){phone.classList.toggle('dark-theme',state.dark);phone.classList.toggle('light-theme',!state.dark);app.innerHTML=renderers[state.step]();renderNav();document.getElementById('theme-toggle').textContent=state.dark?'Tmavý motiv':'Světlý motiv';document.getElementById('theme-toggle').setAttribute('aria-pressed',String(state.dark));renderTicketSheet();}

document.addEventListener('click',event=>{
 const target=event.target.closest('button');if(!target)return;
 if(target.dataset.step){setStep(target.dataset.step);return;}
 if(target.dataset.action==='back'){previousStep();return;}
 if(target.dataset.action==='swap'){[state.from,state.to]=[state.to,state.from];render();return;}
 if(target.dataset.action==='close-sheet'){closeTicketSheet();return;}
 if(target.dataset.action==='minus'&&state.quantity>1){state.quantity--;renderTicketSheet();return;}
 if(target.dataset.action==='plus'){state.quantity++;renderTicketSheet();return;}
 if(target.dataset.action==='other-ticket'){showToast('Další tarif doplníme, až bude známá nabídka konkrétního dopravce.');return;}
 if(target.dataset.action==='activation'){showToast('Úprava aktivace není v této variantě rozpracovaná.');return;}
 if(target.dataset.action==='conditions'){showToast('Odkaz na přepravní podmínky je pouze názorný.');return;}
 if(target.dataset.action==='more-payments'){showToast('Další platební metody nejsou rozpracované.');return;}
 if(target.dataset.action==='pay'){if(!state.terms){showToast('Nejdřív potvrďte smluvní podmínky.');return;}showToast('Tady končí mock. Žádná platba nebyla odeslána.');return;}
 if(target.dataset.action==='reset'){showToast('Souhrn byl obnoven.');return;}
 if(target.dataset.payment){state.payment=target.dataset.payment;render();return;}
 if(target.dataset.addon){state[target.dataset.addon]=!state[target.dataset.addon];render();return;}
});
document.addEventListener('change',event=>{if(event.target.id==='terms')state.terms=event.target.checked;});
document.addEventListener('input',event=>{if(event.target.id==='from')state.from=event.target.value;if(event.target.id==='to')state.to=event.target.value;});
sheetRoot.addEventListener('click',event=>{if(event.target===sheetRoot)closeTicketSheet();});
document.getElementById('theme-toggle').addEventListener('click',()=>{state.dark=!state.dark;render();});
document.getElementById('reset-flow').addEventListener('click',()=>{state=initialState();render();showToast('Varianta v1 byla vrácena na začátek.');});
render();

