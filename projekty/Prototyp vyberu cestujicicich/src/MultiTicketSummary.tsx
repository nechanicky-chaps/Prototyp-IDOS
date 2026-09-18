import { useState } from 'react';
import { countLabel, passengerLabel, type Passenger } from './PassengerFlow';

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
export default function MultiTicketSummary({ passengers, ticketIds, setTicketIds, onBack, onEditPassengers, onNext }: {
  passengers: Passenger[]; ticketIds: string[]; setTicketIds: (ids: string[]) => void; onBack: () => void; onEditPassengers: () => void; onNext: () => void;
}) {
  const [removed, setRemoved] = useState<string | null>(null);
  const [alternative, setAlternative] = useState<string | null>(null);
  const count = ticketIds.length * passengers.length;
  return <section className="passenger-flow">
    <header className="flow-header"><button aria-label="Zpět" onClick={onBack}>←</button><h1>Souhrn jízdenek</h1></header>
    <div className="flow-content journey-summary">
      <div className="journey-padding"><h2>Veverská Bítýška → Česká Lípa</h2><p className="flow-hint">14:14–19:31 · přes Tišnov a Kolín</p>
        <div className="journey-passengers"><div><strong>{countLabel(passengers.length)}</strong><p>{passengers.map(passengerLabel).join(', ')}</p></div><button onClick={onEditPassengers}>Upravit</button></div>
      </div>
      {removed && <div className="journey-undo" role="status">Úsek odebrán.<button onClick={() => { setTicketIds(journeyTickets.filter(t => ticketIds.includes(t.id) || t.id === removed).map(t => t.id)); setRemoved(null); }}>Vrátit</button></div>}
      {journeyTickets.filter(t => ticketIds.includes(t.id)).map(ticket => <article key={ticket.id} className="journey-ticket">
        <div className="journey-band"><strong>Odjezd {ticket.departure}</strong><button aria-label={'Odebrat úsek ' + ticket.line} onClick={() => { setTicketIds(ticketIds.filter(id => id !== ticket.id)); setRemoved(ticket.id); }}>×</button></div>
        <div className="journey-padding"><Route ticket={ticket} /><p className="journey-setting">{ticket.setting}</p>
          <div className="journey-ticket-list">{passengers.map(p => <div key={p.uid} className="journey-ticket-person"><div><strong>{passengerLabel(p)}</strong><p>{p.catId === 'senior65' ? ticket.fare : 'Ukázková jízdenka'}{p.catId === 'senior65' && <small>{ticket.detail}</small>}</p></div><strong>{ticket.price} Kč</strong></div>)}</div>
          <div className="journey-subtotal"><span>{passengers.length}× jízdenka · celkem za úsek</span><strong>{ticket.price * passengers.length} Kč</strong></div>
        </div>
      </article>)}
      {!ticketIds.length && <div className="journey-padding"><p className="flow-empty">Nemáte vybranou žádnou jízdenku.</p><button className="flow-text-button" onClick={() => { setTicketIds(journeyTickets.map(t => t.id)); setRemoved(null); }}>Obnovit všechny úseky</button></div>}
      {!!ticketIds.length && <section className="inline-fares">
        <h2>Alternativní tarifní nabídky</h2>
        {[
          { title: 'Jedna průběžná jízdenka', detail: 'Flexi základní jednosměrná', price: '284 Kč' },
          { title: 'Celodenní nabídka', detail: 'Síťová jízdenka pro celou trasu', price: '319 Kč' },
        ].map(offer => <button key={offer.title} onClick={() => setAlternative(offer.title)} className="checkout-offer">
          <div><strong>{offer.title}</strong><span>{offer.detail}</span></div><span>{offer.price}</span><span aria-hidden="true">{alternative === offer.title ? '✓' : '→'}</span>
        </button>)}
      </section>}
    </div>
    <footer className="flow-footer"><div className="journey-totals"><span>{countLabel(passengers.length)} · {count} {count === 1 ? 'jízdenka' : count > 1 && count < 5 ? 'jízdenky' : 'jízdenek'}</span><strong>{multiTotal(ticketIds, passengers.length)} Kč</strong></div><button className="flow-primary" disabled={!count} onClick={onNext}><span>Platba</span><span>→</span></button></footer>
  </section>;
}
