import FareFab, { SummaryVersionSwitch, type SummaryVersion } from './FareFab';
import { useEffect, useState } from 'react';
import { countLabel, passengerLabel, passengersMissingRequiredNames, type Passenger, type RequiredNameMode } from './PassengerFlow';

export const journeyTickets = [
  { id: 'bus', line: 'Bus 153', color: '#ff6e7f', from: 'Veverská Bítýška, náměstí', to: 'Tišnov, železniční stanice', departure: '14:14', arrival: '14:36', price: 12, fare: 'IDS JMK Zlevněná A', detail: '2 zóny, 60 minut', setting: 'Automatická aktivace' },
  { id: 'r9', line: 'R9 (R 980 Vysočina)', color: '#ea5bf6', from: 'Tišnov', to: 'Kolín', departure: '14:44', arrival: '17:12', price: 175, fare: 'Flexi základní jednosměrná', detail: 'Cestující 65+, 2. třída', setting: 'Bez místenky' },
  { id: 'r22', line: 'R22 (R 1210)', color: '#ea5bf6', from: 'Kolín', to: 'Česká Lípa hl. n.', departure: '17:45', arrival: '19:31', price: 81, fare: 'Senior (nad 65 let)', detail: '2. třída', setting: 'Místo A/45' },
];
export function multiTotal(ids: string[], count: number) { return journeyTickets.filter(t => ids.includes(t.id)).reduce((sum, t) => sum + t.price, 0) * count; }
function Route({ ticket }: { ticket: typeof journeyTickets[number] }) {
  return <div className="journey-route"><strong className="route-name" style={{ color: ticket.color }}>{ticket.line}</strong><div><time>{ticket.departure}</time><span>{ticket.from}</span></div><div><time>{ticket.arrival}</time><span>{ticket.to}</span></div></div>;
}
export function JourneyResult({ onBuy }: { onBuy: () => void }) {
  return <article className="journey-result"><div className="journey-band"><span>14:14 → 19:31</span><span>5 hod 17 min</span></div>
    <div className="journey-padding"><p className="flow-eyebrow">Spojení se 3 jízdenkami</p>{journeyTickets.map((ticket, i) => <div key={ticket.id}><Route ticket={ticket} />{i === 0 && <p className="journey-transfer">Přesun asi 4 min</p>}{i === 1 && <p className="journey-transfer">Přestup v Kolíně · 33 min</p>}</div>)}
    <p className="flow-hint">Ukázka pro cestujícího 65+. Jedno spojení, tři samostatné jízdenky.</p>
    <button className="flow-primary" onClick={onBuy}><span>Koupit 3 jízdenky</span><span>268 Kč →</span></button></div>
  </article>;
}
export default function MultiTicketSummary({ summaryVersion, onSummaryVersionChange, passengers, activation, setActivation, ticketIds, setTicketIds, onBack, onEditPassengers, onNext, onTotalChange, requiredNameMode = 'all', collapsibleFares = false }: {
  summaryVersion: SummaryVersion; onSummaryVersionChange: (version: SummaryVersion) => void;
  activation: string; setActivation: (value: string) => void; passengers: Passenger[]; ticketIds: string[]; setTicketIds: (ids: string[]) => void; onBack?: () => void; onEditPassengers: () => void; onNext: () => void; onTotalChange?: (total: number) => void; requiredNameMode?: RequiredNameMode; collapsibleFares?: boolean;
}) {
  const [removed, setRemoved] = useState<string | null>(null);
  const [activationOpen, setActivationOpen] = useState(false);
  const [alternative, setAlternative] = useState<string | null>(null);
  const count = ticketIds.length * passengers.length;
  const missingNames = passengersMissingRequiredNames(passengers, requiredNameMode);
  const alternativeTotal = alternative === 'Jedna průběžná jízdenka' ? 284 * passengers.length
    : alternative === 'Celodenní nabídka' ? 319 * passengers.length
      : multiTotal(ticketIds, passengers.length);
  const alternativeRows = [
    { title: 'Jedna průběžná jízdenka', detail: 'Flexi základní jednosměrná', price: '284 Kč' },
    { title: 'Celodenní nabídka', detail: 'Síťová jízdenka pro celou trasu', price: '319 Kč' },
  ].map(offer => <div key={offer.title} className="checkout-offer">
    <div><strong>{offer.title}</strong><span>{offer.detail}</span></div>
    <button className="checkout-offer-action" onClick={() => setAlternative(offer.title)}>{alternative === offer.title ? 'Vybráno' : `Vybrat za ${offer.price}`}</button>
  </div>);
  useEffect(() => onTotalChange?.(alternativeTotal), [alternativeTotal, onTotalChange]);
  return <section className="passenger-flow">
    <SummaryVersionSwitch version={summaryVersion} onChange={onSummaryVersionChange} />
    <header className={`flow-header ${onBack ? '' : 'flow-header-root'}`}>{onBack && <button aria-label="Zpět" onClick={onBack}>←</button>}<h1>Souhrn jízdenek</h1></header>
    <div className="flow-content journey-summary">
      <div className="journey-padding"><h2>Veverská Bítýška → Česká Lípa</h2><p className="flow-hint">14:14–19:31 · přes Tišnov a Kolín</p>
        <div className="journey-passengers">
          <span className="journey-passenger-number" aria-label={`${passengers.length} cestujících`}>{passengers.length}</span>
          <svg className="journey-passenger-icon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="9" cy="8" r="3"/><path d="M3.5 19v-2.5A4.5 4.5 0 0 1 8 12h2a4.5 4.5 0 0 1 4.5 4.5V19"/><circle cx="17" cy="9" r="2.5"/><path d="M16 13h1.5a3.5 3.5 0 0 1 3.5 3.5V19"/></svg>
          <button className="journey-passenger-main" onClick={onEditPassengers}><span className="journey-passenger-list">{passengers.slice(0, 2).map(passenger => <span key={passenger.uid}>{passengerLabel(passenger)}</span>)}{passengers.length > 2 && <span>+{passengers.length - 2} další</span>}</span></button>
          <button className="journey-edit-passengers" onClick={onEditPassengers}>{missingNames && <strong className="journey-required-mark" aria-label="Chybí údaje">!</strong>}Upravit</button>
          {missingNames && <button className="flow-required-notice" onClick={onEditPassengers}>Dopravce vyžaduje doplnit údaje</button>}
        </div>
      </div>
      {removed && <div className="journey-undo" role="status">Úsek odebrán.<button onClick={() => { setTicketIds(journeyTickets.filter(t => ticketIds.includes(t.id) || t.id === removed).map(t => t.id)); setRemoved(null); }}>Vrátit</button></div>}
      {journeyTickets.filter(t => ticketIds.includes(t.id)).map(ticket => <article key={ticket.id} className="journey-ticket">
        <div className="journey-band"><strong>Odjezd {ticket.departure}</strong><button aria-label={'Odebrat úsek ' + ticket.line} onClick={() => { setTicketIds(ticketIds.filter(id => id !== ticket.id)); setRemoved(ticket.id); }}>×</button></div>
        {ticket.id !== 'bus' && <div className="multi-setting-row"><span className="multi-dot" aria-hidden="true" /><span className="multi-label">třída pro cestu</span><span>2. třída</span></div>}
        <div className="journey-padding multi-route"><Route ticket={ticket} /></div>
        {ticket.id !== 'bus' && <div className="multi-setting-row multi-seat"><span /><span className="multi-label">{ticket.id === 'r22' ? 'místo' : ''}</span><span>{ticket.id === 'r22' ? 'A/45' : 'Bez místenky'}</span></div>}
        <div className="multi-fare-details">
          {ticket.id === 'bus' && <>
            <div className="multi-setting-row"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 6v6l4 2" /></svg><span className="multi-label">Aktivace</span><span>{activation}</span><button aria-expanded={activationOpen} onClick={() => setActivationOpen(!activationOpen)}>Upravit</button></div>
            {activationOpen && <div className="multi-activation-options" role="group" aria-label="Aktivace jízdenky">{['Automatická aktivace', 'Ruční aktivace'].map(option => <label key={option}><input type="radio" name="multi-activation" checked={activation === option} onChange={() => { setActivation(option); setActivationOpen(false); }} />{option}</label>)}</div>}
          </>}
          {passengers.map(p => <div key={p.uid} className="multi-fare-person">
            {passengers.length > 1 && <strong className="multi-person-name">{passengerLabel(p)}</strong>}
            <div className="multi-setting-row"><span className="multi-dot" aria-hidden="true" /><span className="multi-label">tarif</span><span>1× {p.catId === 'senior65' ? ticket.fare : 'Ukázková jízdenka'}{p.catId === 'senior65' && <> ({ticket.detail})</>}</span></div>
            <div className="multi-setting-row multi-price"><span /><span className="multi-label">cena</span><strong>{ticket.price} Kč</strong></div>
          </div>)}
          {passengers.length > 1 && <div className="multi-setting-row multi-price"><span /><span className="multi-label">celkem</span><strong>{ticket.price * passengers.length} Kč</strong></div>}
        </div>
      </article>)}
      {!ticketIds.length && <div className="journey-padding"><p className="flow-empty">Nemáte vybranou žádnou jízdenku.</p><button className="flow-text-button" onClick={() => { setTicketIds(journeyTickets.map(t => t.id)); setRemoved(null); }}>Obnovit všechny úseky</button></div>}
      {summaryVersion === 'v2' && !!ticketIds.length && (collapsibleFares
        ? <details className="inline-fares inline-fares-collapsible"><summary>Alternativní tarifní nabídky <span aria-hidden="true">▾</span></summary><div>{alternativeRows}</div></details>
        : <section className="inline-fares"><h2>Alternativní tarifní nabídky</h2>{alternativeRows}</section>)}
    </div>
    {summaryVersion === 'v1' && !!ticketIds.length && <FareFab offers={[
      { id: 'through', title: 'Jedna průběžná jízdenka', price: `${284 * passengers.length} Kč` },
      { id: 'day', title: 'Celodenní nabídka', price: `${319 * passengers.length} Kč` },
      { id: 'separate', title: 'Samostatné jízdenky', price: `${multiTotal(ticketIds, passengers.length)} Kč` },
    ].map(offer => ({ ...offer, selected: alternative === offer.title || (!alternative && offer.id === 'separate'), onSelect: () => setAlternative(offer.title) }))} />}
    <footer className="multi-payment-bar"><button className="multi-payment-total" onClick={onEditPassengers} aria-label="Upravit cestující"><span>{countLabel(passengers.length)}</span><strong>{alternativeTotal} Kč</strong></button><button className="summary-payment" disabled={!count} onClick={onNext}>Platba <span aria-hidden="true">→</span></button></footer>
  </section>;
}
