const steps=[
 {id:'search',label:'Hledání'},
 {id:'results',label:'Výsledky'},
 {id:'passengers',label:'Cestující'},
 {id:'fares',label:'Jízdné'},
 {id:'summary',label:'Souhrn'},
 {id:'payment',label:'Platba'}
];

const initialState=()=>({
 step:'search',dark:true,from:'Moje poloha (±12 m)',to:'Adamov, železniční zastávka',
 firstName:'Jan',lastName:'Novák',discounts:[],passengers:[],fare:'basic',dog:false,bike:false,
 payment:'gpay',terms:true
});
let state=initialState();
const app=document.getElementById('app');
const phone=document.getElementById('phone');
const nav=document.getElementById('step-nav');
const sheetRoot=document.getElementById('sheet');
const toast=document.getElementById('toast');

const icon=(value)=>`<span aria-hidden="true">${value}</span>`;
const header=(title,back=true,actions='')=>`<header class="app-header">${back?`<button class="icon-button" data-action="back" aria-label="Zpět">←</button>`:''}<h2>${title}</h2>${actions}<button class="icon-button" aria-label="Další možnosti">⋮</button></header>`;
const bottomNav=()=>`<nav class="bottom-nav" aria-label="Hlavní navigace"><button class="active"><span>⌕</span>Spojení</button><button><span>◉</span>Odjezdy</button><button><span>◇</span>Jízdenky</button><button><span>☰</span>Více</button></nav>`;
const count=()=>1+state.passengers.length;
const total=()=>state.fare==='day'?250:33;

function setStep(step){state.step=step;closeSheet();render();}
function previousStep(){const i=steps.findIndex(s=>s.id===state.step);setStep(steps[Math.max(0,i-1)].id);}
function showToast(message){toast.textContent=message;toast.hidden=false;clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.hidden=true,3200);}
function closeSheet(){sheetRoot.hidden=true;sheetRoot.innerHTML='';}
function openPassengerSheet(){
 sheetRoot.hidden=false;
 sheetRoot.innerHTML=`<section class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title"><h3 id="sheet-title">Přidat cestujícího</h3><button class="sheet-choice" data-add="adult"><strong>Dospělý</strong><small>26–59 let</small></button><button class="sheet-choice" data-add="child"><strong>Dítě</strong><small>věk se doplní u cestujícího</small></button><button class="sheet-choice" data-add="senior"><strong>Senior</strong><small>70 let a více</small></button><button class="sheet-close" data-action="close-sheet">Zrušit</button></section>`;
}

function renderNav(){nav.innerHTML=steps.map((s,i)=>`<button class="step-button" data-step="${s.id}" ${s.id===state.step?'aria-current="step"':''}>${i+1}. ${s.label}</button>`).join('');}
function renderSearch(){
 return `${header('Spojení',false,`<button class="passenger-trigger" data-step="passengers" aria-label="Cestující: ${count()}">${count()} <span class="people-icon" aria-hidden="true"></span></button>`)}
 <div class="screen"><div class="screen-pad"><div class="form-region">⌄ <strong>Brno + IDS JMK</strong></div><div class="route-fields">
 <div class="route-row"><div class="route-dot">⦿</div><label>Odkud<input id="from" value="${state.from}"></label><span>▱</span></div>
 <div class="route-row"><div class="route-dot">●</div><label>Kam<input id="to" value="${state.to}"></label><span>▱</span></div>
 <button class="icon-button swap-button" data-action="swap" aria-label="Prohodit odkud a kam">⇅</button></div>
 <div class="option-row"><span class="option-icon">◷</span><span>Odjezd nyní</span></div><div class="option-row"><span>⌄</span><span>Rozšířené zadání</span></div>
 <button class="search-button" data-step="results">⌕&nbsp; Hledat</button><div class="section-label">Oblíbená spojení</div>
 <div class="favourite"><span class="round-mode">MHD</span><div><strong>Moje poloha<br>Adamov, železniční zastávka</strong><small>za 30 min &nbsp; Tram 1</small></div><span>⋮</span></div>
 <div class="favourite"><span class="round-mode">MHD</span><div><strong>Adamov, železniční zastávka<br>Brno, Bráfova</strong><small>za 1 min &nbsp; Vlak S2</small></div><span>⋮</span></div></div></div>${bottomNav()}`;
}

function connectionBlock(second=false){return `<article class="result-block"><div class="result-time"><span>● &nbsp; za ${second?'58':'30'} min</span><span>44 min</span></div><div class="connection"><div class="leg"><div class="leg-icon">▣</div><div><small>přesun asi ${second?'6':'8'} min</small><h3>Tram ${second?'10':'1'}</h3><p><strong>${second?'13:34':'13:06'}</strong> &nbsp; ${second?'Mozolky':'Bráfova z'}</p><p><strong>${second?'13:50':'13:23'}</strong> &nbsp; Hlavní nádraží</p><small class="green">odjezd bývá včas</small></div></div>${second?'':`<div class="leg train"><div class="leg-icon">▣</div><div><small>přesun asi 4 min</small><h3>Vlak S2</h3><p><strong>13:29</strong> &nbsp; Brno hl. n.</p><p><strong>13:50</strong> &nbsp; Adamov zastávka</p></div></div><div class="connection-buy"><span class="price">33 Kč</span><button class="outline-button" data-step="passengers">🛒 &nbsp; Koupit</button></div>`}</div></article>`;}
function renderResults(){return `${header('Spojení')}<div class="screen">${connectionBlock(false)}${connectionBlock(true)}</div>${bottomNav()}`;}

function renderPassengers(){
 const discountRows=['ISIC','IN 25','Průkaz ZTP'].map(d=>`<label class="check-row"><input type="checkbox" data-discount="${d}" ${state.discounts.includes(d)?'checked':''}><span>${d}</span></label>`).join('');
 const added=state.passengers.map((p,i)=>`<div class="added-passenger"><span>👤</span><div><strong>${p.label}</strong><small>${p.detail||'bez slevového průkazu'}</small></div><button class="remove-button" data-remove="${i}" aria-label="Odebrat cestujícího">×</button></div>`).join('');
 return `${header('Cestující')}<div class="screen"><div class="passenger-category">Dospělý (26–59 let)</div><label class="field"><span>Jméno držitele jízdenek</span><input id="first-name" value="${state.firstName}"></label><label class="field"><span>Příjmení držitele jízdenek</span><input id="last-name" value="${state.lastName}"></label><button class="discount-toggle" data-action="toggle-discounts">Slevové průkazy ${state.showDiscounts?'⌃':'⌄'}</button>${state.showDiscounts?`<div class="discounts">${discountRows}</div>`:''}<div class="passenger-list">${added}</div></div><button class="fab" data-action="add-passenger" aria-label="Přidat cestujícího">+</button><button class="bottom-action" data-step="fares"><strong>${count()} <span class="people-icon" aria-hidden="true"></span></strong><span>Nabídka jízdného &nbsp; →</span></button>`;
}

function renderFares(){return `${header('Nabídka jízdného')}<div class="screen"><div class="fare-head"><span>Nabídka IDS</span><span>33 Kč</span></div><div class="fare-card"><p>Nabídka s maximální možnou preferencí IDS tarifů</p><div class="fare-actions"><button class="text-link" data-action="fare-detail">Detail nabídky</button><button class="select-fare ${state.fare==='basic'?'selected':''}" data-fare="basic">${state.fare==='basic'?'Vybráno':'Vybrat'} &nbsp; →</button></div></div><div class="fare-head"><span>Jednodenní nabídka IDS</span><span>250 Kč</span></div><div class="fare-card"><p>Jednodenní IDS jízdenka pokrývající oblast z vyhledaného spojení</p><div class="fare-actions"><button class="text-link" data-action="fare-detail">Detail nabídky</button><button class="select-fare ${state.fare==='day'?'selected':''}" data-fare="day">${state.fare==='day'?'Vybráno':'Vybrat'} &nbsp; →</button></div></div></div><button class="bottom-action" data-step="summary"><strong>${total()} Kč</strong><span>Souhrn jízdenek &nbsp; →</span></button>`;}

function renderSummary(){
 const extra=state.passengers.map(p=>`<div class="summary-row"><span class="label">cestující</span><strong>${p.label}</strong></div>`).join('');
 return `${header('Souhrn jízdenek',true,`<button class="icon-button" data-action="reset" aria-label="Obnovit">↻</button>`)}<div class="screen"><div class="result-time"><span>za 30 min</span></div><section class="summary-connection"><h3>Spojení</h3><div class="leg"><div class="leg-icon">▣</div><div><h3>Tram 1</h3><p><strong>13:06</strong> &nbsp; Bráfova z</p><p><strong>13:23</strong> &nbsp; Hlavní nádraží</p></div></div><div class="leg train"><div class="leg-icon">▣</div><div><h3>Vlak S2</h3><p><strong>13:29</strong> &nbsp; Brno hl. n.</p><p><strong>13:50</strong> &nbsp; Adamov zastávka</p></div></div></section><section class="summary-info"><div class="summary-row"><span class="label">Aktivace</span><strong>Automatická aktivace</strong><button class="text-link" data-action="activation">Upravit</button></div><div class="summary-row"><span class="label">tarif</span><strong>1× IDS JMK Základní (3 zóny, 90 minut)</strong></div>${extra}<div class="summary-row"><span class="label">cena</span><strong>${total()} Kč</strong></div><button class="text-link" data-action="conditions">Přepravní podmínky</button></section><div class="addons"><button class="addon ${state.dog?'selected':''}" data-addon="dog">🐕 ${state.dog?'Pes přidán':'Přidat psa'}</button><button class="addon ${state.bike?'selected':''}" data-addon="bike">🚲 ${state.bike?'Kolo přidáno':'Přidat kolo'}</button></div></div><button class="bottom-action" data-step="payment"><strong>${count()} <span class="people-icon" aria-hidden="true"></span> &nbsp;&nbsp; ${total()} Kč</strong><span>Platba &nbsp; →</span></button>`;
}

function renderPayment(){return `${header('Platba')}<div class="screen"><div class="payment-profile"><span>◉</span><div><strong>${state.firstName} ${state.lastName}</strong><small>jan.novak@example.cz</small></div></div><label class="field"><span>E-mail</span><input value="jan.novak@example.cz" inputmode="email"></label><label class="terms"><input id="terms" type="checkbox" ${state.terms?'checked':''}><span>Souhlasím se <u>Smluvními podmínkami IDOS.cz</u></span></label><div class="payment-grid"><button class="payment-method ${state.payment==='gpay'?'selected':''}" data-payment="gpay">G Pay</button><button class="payment-method ${state.payment==='card'?'selected':''}" data-payment="card">VISA<br><small>Mastercard · Maestro</small></button></div><button class="payment-more" data-action="more-payments">Další způsoby platby</button></div><button class="bottom-action" data-action="pay"><strong>${count()} <span class="people-icon" aria-hidden="true"></span> &nbsp;&nbsp; ${total()} Kč</strong><span>Zaplatit &nbsp; →</span></button>`;}

const renderers={search:renderSearch,results:renderResults,passengers:renderPassengers,fares:renderFares,summary:renderSummary,payment:renderPayment};
function render(){
 phone.classList.toggle('dark-theme',state.dark);phone.classList.toggle('light-theme',!state.dark);
 app.innerHTML=renderers[state.step]();renderNav();
 document.getElementById('theme-toggle').textContent=state.dark?'Tmavý motiv':'Světlý motiv';
 document.getElementById('theme-toggle').setAttribute('aria-pressed',String(state.dark));
}

document.addEventListener('click',event=>{
 const target=event.target.closest('button');if(!target)return;
 if(target.dataset.step){setStep(target.dataset.step);return;}
 if(target.dataset.action==='back'){previousStep();return;}
 if(target.dataset.action==='swap'){[state.from,state.to]=[state.to,state.from];render();return;}
 if(target.dataset.action==='toggle-discounts'){state.showDiscounts=!state.showDiscounts;render();return;}
 if(target.dataset.action==='add-passenger'){openPassengerSheet();return;}
 if(target.dataset.action==='close-sheet'){closeSheet();return;}
 if(target.dataset.action==='fare-detail'){showToast('Detail nabídky není v dodaných podkladech rozpracovaný.');return;}
 if(target.dataset.action==='activation'){showToast('Úprava aktivace není v dodaných podkladech zachycená.');return;}
 if(target.dataset.action==='conditions'){showToast('Odkaz na přepravní podmínky je v mocku pouze názorný.');return;}
 if(target.dataset.action==='more-payments'){showToast('Další platební metody nejsou v aktuálním snímku rozbalené.');return;}
 if(target.dataset.action==='pay'){if(!state.terms){showToast('Nejdřív potvrďte smluvní podmínky.');return;}showToast('Tady končí doložený tok. Žádná platba nebyla odeslána.');return;}
 if(target.dataset.action==='reset'){showToast('Souhrn byl obnoven.');return;}
 if(target.dataset.fare){state.fare=target.dataset.fare;render();return;}
 if(target.dataset.payment){state.payment=target.dataset.payment;render();return;}
 if(target.dataset.addon){state[target.dataset.addon]=!state[target.dataset.addon];render();return;}
 if(target.dataset.remove!==undefined){state.passengers.splice(Number(target.dataset.remove),1);render();return;}
 if(target.dataset.add){const choices={adult:{label:'Dospělý (26–59 let)'},child:{label:'Dítě',detail:'věk zatím nezadán'},senior:{label:'Senior 70 let a více'}};state.passengers.push(choices[target.dataset.add]);closeSheet();render();return;}
});
document.addEventListener('change',event=>{
 if(event.target.dataset.discount){state.discounts=event.target.checked?[...state.discounts,event.target.dataset.discount]:state.discounts.filter(x=>x!==event.target.dataset.discount);}
 if(event.target.id==='terms')state.terms=event.target.checked;
});
document.addEventListener('input',event=>{
 if(event.target.id==='from')state.from=event.target.value;
 if(event.target.id==='to')state.to=event.target.value;
 if(event.target.id==='first-name')state.firstName=event.target.value;
 if(event.target.id==='last-name')state.lastName=event.target.value;
});
sheetRoot.addEventListener('click',event=>{if(event.target===sheetRoot)closeSheet();});
document.getElementById('theme-toggle').addEventListener('click',()=>{state.dark=!state.dark;render();});
document.getElementById('reset-flow').addEventListener('click',()=>{state=initialState();render();showToast('Tok byl vrácen na začátek.');});
render();

