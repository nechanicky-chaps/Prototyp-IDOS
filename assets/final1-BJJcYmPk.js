import{a as e,c as t,g as n,h as r,m as i,n as a,p as o,r as s}from"./src-D54lqYX-.js";var c=n(i(),1),l=n(r(),1),u=o();function d({children:e,label:t}){return(0,u.jsxs)(`div`,{className:`final1-column`,children:[(0,u.jsx)(`p`,{className:`final1-label`,children:t}),(0,u.jsxs)(`div`,{className:`phone-frame`,style:{width:390,height:844,background:`#00101d`,borderRadius:36,overflow:`hidden`,boxShadow:`0 0 0 10px #1a1a1a, 0 30px 80px rgba(0,0,0,0.9)`,display:`flex`,flexDirection:`column`,position:`relative`},children:[(0,u.jsx)(`div`,{style:{flex:1,minHeight:0,overflow:`hidden`,display:`flex`,flexDirection:`column`},children:e}),(0,u.jsxs)(`div`,{style:{background:`#000`},className:`flex items-center justify-around py-2 px-8 text-neutral-400 select-none flex-shrink-0`,children:[(0,u.jsx)(`button`,{"aria-label":`Recent apps`,className:`p-1 hover:text-white`,children:(0,u.jsxs)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,children:[(0,u.jsx)(`line`,{x1:`6`,y1:`5`,x2:`6`,y2:`19`}),(0,u.jsx)(`line`,{x1:`12`,y1:`5`,x2:`12`,y2:`19`}),(0,u.jsx)(`line`,{x1:`18`,y1:`5`,x2:`18`,y2:`19`})]})}),(0,u.jsx)(`button`,{"aria-label":`Home`,className:`p-1 hover:text-white`,children:(0,u.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,children:(0,u.jsx)(`circle`,{cx:`12`,cy:`12`,r:`7`})})}),(0,u.jsx)(`button`,{"aria-label":`Back`,className:`p-1 hover:text-white`,onClick:()=>window.dispatchEvent(new Event(`passenger-back`)),children:(0,u.jsx)(`svg`,{width:`18`,height:`18`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:`2.2`,strokeLinecap:`round`,strokeLinejoin:`round`,children:(0,u.jsx)(`polyline`,{points:`15 18 9 12 15 6`})})})]})]})]})}function f(){let[n,r]=(0,l.useState)([{uid:`senior-example`,catId:`senior65`,passIds:[`none`]}]),[i,o]=(0,l.useState)([{uid:`senior-example`,catId:`senior65`,passIds:[`none`]}]),[c,f]=(0,l.useState)(t),[p,m]=(0,l.useState)(!1),[h,g]=(0,l.useState)(`Automatická aktivace`),[_,v]=(0,l.useState)(s.map(e=>e.id)),[y,b]=(0,l.useState)(`summary`),[x,S]=(0,l.useState)(`passengers`);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(`style`,{children:`
        body { background: #111; margin: 0; }
        .final1-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 32px 24px;
          gap: 0;
        }
        .final1-row {
          display: flex;
          gap: 48px;
          align-items: flex-start;
          flex-wrap: wrap;
          justify-content: center;
        }
        .final1-column {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .final1-label {
          color: #8ba0b3;
          font-size: 13px;
          font-family: system-ui, sans-serif;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          font-weight: 500;
          margin: 0;
        }
        /* Hide the version-switch strips rendered inside the components */
        .final1-no-version-switch .flow-version-switch {
          display: none !important;
        }
      `}),(0,u.jsx)(`div`,{className:`final1-wrapper`,children:(0,u.jsxs)(`div`,{className:`final1-row`,children:[(0,u.jsx)(d,{label:`Souhrn jízdenek · V1`,children:(0,u.jsx)(`div`,{className:`final1-no-version-switch`,style:{flex:1,minHeight:0,overflow:`hidden`,display:`flex`,flexDirection:`column`},children:(0,u.jsx)(a,{summaryVersion:`v1`,onSummaryVersionChange:()=>{},activation:h,setActivation:g,passengers:n,ticketIds:_,setTicketIds:v,onBack:()=>{},onEditPassengers:()=>{m(!0),S(`passengers`)},onNext:()=>{}})})}),(0,u.jsx)(d,{label:`Výběr cestujících · V5.0`,children:(0,u.jsx)(`div`,{className:`final1-no-version-switch`,style:{flex:1,minHeight:0,overflow:`hidden`,display:`flex`,flexDirection:`column`},children:(0,u.jsx)(e,{passengers:n,availablePassengers:i,favorites:c,version:`v5.0`,requireNames:p,onVersionChange:()=>{},onSaveAvailablePassengers:o,onSaveFavorites:f,onBack:()=>S(`summary`),onConfirm:e=>{r(e),m(!1)}})})})]})})]})}c.createRoot(document.getElementById(`root`)).render((0,u.jsx)(l.StrictMode,{children:(0,u.jsx)(f,{})}));