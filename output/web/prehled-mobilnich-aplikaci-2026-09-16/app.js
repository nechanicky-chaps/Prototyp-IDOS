const h = React.createElement;
const {useState,useEffect,useRef} = React;
const apps = window.MOBILE_CATALOG;
const total = apps.reduce((n,a)=>n+a.screens.length,0);
const featuredTotal = apps.reduce((n,a)=>n+a.screens.filter(s=>s.featured!==false).length,0);
const videoTotal = apps.reduce((n,a)=>n+(a.videos||[]).length,0);
function UserNotes({screen}){
 if(!screen.userNotes?.length)return null;
 return h('aside',{className:'user-notes','aria-label':'Poznámky uživatele'},
  h('div',{className:'user-notes-label'},'Tvoje poznámky'),
  screen.userNotes.map((note,i)=>h('p',{key:i},note)),
  h('small',null,'Parafráze tvých postřehů z průzkumu.'));
}
// Only observed navigation between supplied screens. Coordinates are percentages of the original image.
const hotspots = {
 'idos-001':[{box:[72,5,18,8],to:'idos-003',label:'Otevřít cestující'},{box:[6,47,88,8],to:'idos-002',label:'Vyhledat spojení'}],
 'idos-002':[{box:[61,54,36,7],to:'idos-003',label:'Koupit jízdenku'}],
 'idos-003':[{box:[0,86,100,9],to:'idos-004',label:'Pokračovat na nabídku jízdného'}],
 'idos-004':[{box:[0,86,100,9],to:'idos-005',label:'Pokračovat na souhrn jízdenek'}],
 'idos-005':[{box:[63,86,37,9],to:'idos-006',label:'Pokračovat na platbu'}],
 'muj-vlak-003':[{box:[5,36,90,7],to:'muj-vlak-002',label:'Otevřít cestující'}],
 'regiojet-001':[{box:[4,36,92,7],to:'regiojet-003',label:'Otevřít cestující'}],
 'regiojet-003':[{box:[5,56,66,6],to:'regiojet-002',label:'Zobrazit další tarify'}],
 'regiojet-002':[{box:[5,54,65,6],to:'regiojet-003',label:'Skrýt další tarify'}],
 'flixbus-001':[{box:[4,55,92,8],to:'flixbus-002',label:'Otevřít cestující a jízdní kola'}],
 'flixbus-002':[{box:[2,4,13,7],to:'flixbus-001',label:'Zpět k formuláři'},{box:[88,4,10,7],to:'flixbus-001',label:'Potvrdit zachyceného dospělého'}],
 'oebb-001':[{box:[7,67,86,8],to:'oebb-002',label:'Změnit cestující'}],
 'db-navigator-004':[{box:[5,27,91,7],to:'db-navigator-002',label:'Otevřít cestující'}],
 'db-navigator-002':[{box:[1,34,98,6],to:'db-navigator-001',label:'Zvolit dítě 6–14 let'}],
 'db-navigator-003':[{box:[1,34,98,6],to:'db-navigator-001',label:'Zvolit dítě 6–14 let'}],
 'db-navigator-001':[{box:[1,16,98,6],to:'db-navigator-002',label:'Zvolit osobu 27–64 let'}],
 'idolka-002':[{box:[50,18,45,6],to:'idolka-003',label:'Zobrazit síťové jízdenky'}],
 'idolka-003':[{box:[5,18,45,6],to:'idolka-002',label:'Zobrazit časové jízdenky'}],
 'ideska-002':[{box:[55,40,35,8],to:'ideska-001',label:'Přejít k výběru cestujících'}],
 'ideska-007':[{box:[6,30,88,7],to:'ideska-006',label:'Přejít k výběru cestujících'}],
};
function App(){
 const [expanded,setExpanded] = useState({});
 const [viewer,setViewer] = useState(null);
 const [zoom,setZoom] = useState(false);
 const [size,setSize] = useState('normal');
 const [showHotspots,setShowHotspots] = useState(false);
 const opener = useRef(null), dialog = useRef(null), scrollArea = useRef(null);
 const open = (app,index,event)=>{opener.current=event.currentTarget;setZoom(false);setViewer({app,index});};
 const close = ()=>{setViewer(null);opener.current?.focus();};
 const move = delta => {setViewer(v=>({...v,index:(v.index+delta+v.app.screens.length)%v.app.screens.length}));};
 useEffect(()=>{
  if(!viewer)return;
  const before=document.body.style.overflow;document.body.style.overflow='hidden';
  dialog.current?.focus();
  const key=e=>{
   if(e.key==='Escape'){e.preventDefault();close();}
   if(e.key==='ArrowRight' && !['INPUT','SELECT'].includes(e.target.tagName)){e.preventDefault();move(1);}
   if(e.key==='ArrowLeft' && !['INPUT','SELECT'].includes(e.target.tagName)){e.preventDefault();move(-1);}
   if(e.key==='Tab'){
    const nodes=[...dialog.current.querySelectorAll('button,a[href],select')].filter(x=>!x.disabled);
    const first=nodes[0],last=nodes[nodes.length-1];
    if(e.shiftKey&&(document.activeElement===first||document.activeElement===dialog.current)){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
   }
  };
  document.addEventListener('keydown',key);
  return ()=>{document.body.style.overflow=before;document.removeEventListener('keydown',key);};
 },[!!viewer]);
 useEffect(()=>{if(scrollArea.current)scrollArea.current.scrollTop=0;},[viewer?.index,viewer?.app.id]);
 const selected=viewer?.app.screens[viewer.index];
 return h(React.Fragment,null,
  h('header',{className:'topbar'},h('a',{className:'wordmark',href:'#top'},h('span',{className:'mark'},'▥'),'Mobilní rozhraní'),h('span',{className:'top-meta'},'ANDROID / REŠERŠE 15. 9. 2026')),
  h('div',{className:'layout'},
   h('aside',{className:'sidebar'},h('p',{className:'eyebrow'},'APLIKACE'),h('nav',{'aria-label':'Aplikace'},apps.map((a,i)=>h('a',{key:a.id,href:'#'+a.id},h('span',{className:'nav-number'},String(i+1).padStart(2,'0')),a.name,h('span',{className:'nav-count'},a.screens.filter(s=>s.featured!==false).length+(a.videos?.length?' + ▶':''))))),h('div',{className:'sidebar-note'},'Originální obrazovky',h('br'),apps.length+' aplikací · '+featuredTotal+' snímků',h('br'),videoTotal+' videí · '+total+' stavů')),
   h('main',{id:'top'},
    h('div',{className:'intro'},h('p',{className:'eyebrow'},'PODKLADY PRO SPOLEČNOU DISKUSI'),h('h1',null,'Jak se vybírají',h('br'),'cestující.'),h('p',{className:'lead'},'Jen výběr cestujících: reprezentativní obrazovky, stručný popis a tvoje poznámky.'),h('div',{className:'evidence-note'},h('strong',null,'Věrné obrazové mocky.'),' Rozhraní tvoří původní screenshoty. Přepínají se pouze dodané stavy; nedodané kroky nejsou doplněné.')),
    h('div',{className:'toolbar'},h('span',{className:'selection-summary'},featuredTotal+' vybraných snímků · '+videoTotal+' videí · '+apps.length+' aplikací · '+total+' stavů celkem'),h('label',{className:'size-label'},'Velikost ',h('select',{value:size,onChange:e=>setSize(e.target.value),'aria-label':'Velikost ukázek'},h('option',{value:'normal'},'Standardní'),h('option',{value:'large'},'Větší')))),
    apps.map((a,ai)=>{
     const screens=a.screens.filter(s=>s.featured!==false);
     return h('section',{className:'provider',id:a.id,key:a.id,'aria-labelledby':a.id+'-title'},
      h('div',{className:'section-head'},h('div',{className:'provider-title'},h('span',{className:'provider-number',style:{borderColor:a.color}},String(ai+1).padStart(2,'0')),h('div',null,h('h2',{id:a.id+'-title'},a.name),h('p',null,'Android · '+screens.length+' vybraných snímků · '+a.screens.length+' stavů'+(a.videos?.length?' · '+a.videos.length+' video':'')))),h('button',{className:'demo-button',onClick:e=>open(a,0,e)},'Prohlížet stavy ↗')),
      (screens.length || a.videos?.length) ? h('div',{className:'screens '+size},screens.map(s=>{
       const long=s.height/s.width>2.8;
       return h('article',{className:'screen-card',key:s.id},h('div',{className:'screen-label'},h('span',{className:'tag'},s.category),h('span',{className:'screen-id'},s.id.split('-').slice(-1)[0])),
        h('button',{className:'image-button '+(long&&!expanded[s.id]?'clipped':''),onClick:e=>open(a,a.screens.indexOf(s),e),'aria-label':'Otevřít '+a.name+' – '+s.title},h('img',{src:s.src,alt:a.name+' – '+s.title,width:s.width,height:s.height,loading:'lazy',decoding:'async'})),
        long&&h('button',{className:'expand-button',onClick:()=>setExpanded(v=>({...v,[s.id]:!v[s.id]}))},expanded[s.id]?'Zkrátit dlouhý snímek ↑':'Zobrazit celý dlouhý snímek ↓'),
        h('div',{className:'caption'},h('h3',null,s.title),h('p',{className:'screen-description'},s.description),s.note&&h('p',null,s.note),h(UserNotes,{screen:s}),h('a',{href:s.src,target:'_blank',rel:'noreferrer'},'Originál ↗')));
      }),...(a.videos||[]).map(video=>h('article',{className:'video-card',key:video.id},h('div',{className:'screen-label'},h('button',{className:'tag video-title',type:'button',onClick:e=>{const player=e.currentTarget.closest('.video-card').querySelector('video');if(player.ended)player.currentTime=0;player.play().catch(()=>{});},'aria-label':'Spustit video '+a.name},'Video')),h('video',{controls:true,preload:'metadata',playsInline:true,src:video.src,'aria-label':a.name+' – '+video.title}),h('div',{className:'caption'},h('h3',null,video.title),h('p',{className:'screen-description'},'Původní záznam práce v mobilní aplikaci.'),h('a',{href:video.src,target:'_blank',rel:'noreferrer'},'Otevřít video ↗'))))) : h('p',{className:'empty'},'Tento typ obrazovky nebyl v podkladech této aplikace zachycen.'));
    }),
    h('footer',null,'Pouze mobilní podklady dodané uživatelem. Webové portály ani návrh IDOS nejsou součástí. ',h('a',{href:'#top'},'Zpět nahoru ↑'))
   )
  ),
  viewer&&h('div',{className:'overlay',onClick:e=>{if(e.target===e.currentTarget)close();}},h('div',{className:'viewer',role:'dialog','aria-modal':true,'aria-labelledby':'viewer-title',tabIndex:-1,ref:dialog},
    h('div',{className:'viewer-head'},h('div',null,h('span',{className:'eyebrow'},viewer.app.name+' / ANDROID'),h('h2',{id:'viewer-title'},selected.title)),h('button',{className:'close',onClick:close,'aria-label':'Zavřít prohlížeč'},'×')),
    h('div',{className:'viewer-body'},h('aside',{className:'state-list'},h('p',{className:'eyebrow'},'DOLOŽENÉ STAVY'),viewer.app.screens.map((s,i)=>h('button',{key:s.id,className:i===viewer.index?'state active':'state','aria-pressed':i===viewer.index,onClick:()=>setViewer(v=>({...v,index:i}))},h('span',null,String(i+1).padStart(2,'0')),s.title,s.featured===false&&h('small',null,'Doplňkový krok'))),h('p',{className:'viewer-help'},'Prohlížeč obsahuje i formuláře, výsledky a souhrny, které nejsou na hlavní stránce. Přepíná pouze mezi dodanými screenshoty.')),
     h('div',{className:'viewer-scroll',ref:scrollArea},h('div',{className:'mock-surface '+(zoom?'zoom':'')},h('img',{src:selected.src,alt:viewer.app.name+' – '+selected.title,width:selected.width,height:selected.height}),(hotspots[selected.id]||[]).filter(spot=>viewer.app.screens.some(s=>s.id===spot.to)).map((spot,i)=>h('button',{key:selected.id+i,className:'hotspot '+(showHotspots?'visible':''),style:{left:spot.box[0]+'%',top:spot.box[1]+'%',width:spot.box[2]+'%',height:spot.box[3]+'%'},'aria-label':spot.label,title:spot.label,onClick:()=>setViewer(v=>({...v,index:v.app.screens.findIndex(s=>s.id===spot.to)}))}))),h('div',{className:'viewer-notes'},h('p',{className:'screen-description'},selected.description),h(UserNotes,{screen:selected})))),
    h('div',{className:'viewer-foot'},h('div',{className:'pager'},h('button',{onClick:()=>move(-1),'aria-label':'Předchozí snímek'},'←'),h('span',{'aria-live':'polite'},(viewer.index+1)+' / '+viewer.app.screens.length),h('button',{onClick:()=>move(1),'aria-label':'Další snímek'},'→')),h('button',{onClick:()=>setShowHotspots(v=>!v),'aria-pressed':showHotspots},'Klikací místa'),h('button',{onClick:()=>setZoom(v=>!v),'aria-pressed':zoom},zoom?'Přizpůsobit šířku':'Zvětšit'),h('a',{href:selected.src,target:'_blank',rel:'noreferrer'},'Originál ↗'))
   ))
 );
}
ReactDOM.createRoot(document.getElementById('root')).render(h(App));


