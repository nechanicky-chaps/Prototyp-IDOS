import { useState } from 'react';
import MultiTicketSummary, { journeyTickets, multiTotal } from './MultiTicketSummary';
import PassengerFlow, { initialFavorites, hasPassengerName, type Passenger } from './PassengerFlow';

type Screen = 'summary' | 'passengers' | 'payment' | 'confirm';

const BG = '#00101d';
const HEADER = '#0365ac';

function AndroidNavBar({ onBack, onHome }: { onBack: () => void; onHome: () => void }) {
  return (
    <div style={{ background: '#000' }} className="flex items-center justify-around py-2 px-8 text-neutral-400 select-none flex-shrink-0">
      <span aria-hidden="true" className="p-1">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="6" y1="5" x2="6" y2="19" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="18" y1="5" x2="18" y2="19" />
        </svg>
      </span>
      <button aria-label="Domů" className="p-1 hover:text-white" onClick={onHome}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <circle cx="12" cy="12" r="7" />
        </svg>
      </button>
      <button aria-label="Back" className="p-1 hover:text-white" onClick={onBack}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </div>
  );
}

function ConfirmScreen({ total, ticketCount, onDone }: { total: number; ticketCount: number; onDone: () => void }) {
  return (
    <div className="flex flex-col h-full items-center justify-center px-6 text-center" style={{ background: BG }}>
      <div style={{ background: '#026cb6', borderRadius: '50%', width: 80, height: 80 }}
        className="flex items-center justify-center mb-6 shadow-md">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="text-white text-xl font-semibold mb-2">Ukázka nákupu dokončena</h2>
      <p style={{ color: '#8ba0b3' }} className="text-sm mb-2">Počet jízdenek: {ticketCount}</p>
      <p style={{ color: '#8ba0b3' }} className="text-sm mb-8">Veverská Bítýška → Česká Lípa | {total} Kč</p>
      <button onClick={onDone}
        style={{ background: '#026cb6', borderRadius: 6 }}
        className="px-8 py-3 text-white font-medium text-sm active:opacity-90 shadow-sm">
        Zpět na souhrn
      </button>
    </div>
  );
}

export default function Final1Page() {
  const [screen, setScreen] = useState<Screen>('summary');
  const [passengers, setPassengers] = useState<Passenger[]>([
    { uid: 'senior-example', catId: 'senior65', passIds: ['none'] },
  ]);
  const [availablePassengers, setAvailablePassengers] = useState<Passenger[]>([
    { uid: 'senior-example', catId: 'senior65', passIds: ['none'] },
  ]);
  const [favorites, setFavorites] = useState<Passenger[]>(initialFavorites);
  const [requireNames, setRequireNames] = useState(false);
  const [activation, setActivation] = useState('Automatická aktivace');
  const [ticketIds, setTicketIds] = useState(journeyTickets.map(t => t.id));
  const [checkoutTotal, setCheckoutTotal] = useState(multiTotal(ticketIds, passengers.length));

  const ticketCount = passengers.length * ticketIds.length;

  // Stejná logika jako v App.tsx – pokud chybí jména, přejdi na cestující
  const proceedToPayment = () => {
    if (!passengers.length) return;
    if (!passengers.every(hasPassengerName)) {
      setRequireNames(true);
      setScreen('passengers');
      return;
    }
    setScreen('payment');
  };

  const openPassengers = () => {
    setRequireNames(true);
    setScreen('passengers');
  };

  const handleNavBack = () => {
    if (screen === 'passengers') {
      window.dispatchEvent(new Event('passenger-back'));
      return;
    }
    if (screen === 'payment' || screen === 'confirm') setScreen('summary');
  };

  return (
    <>
      <style>{`
        body { background: #000; margin: 0; }
        .final1-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Hide version-switch strips */
        .final1-no-vsw .flow-version-switch { display: none !important; }
      `}</style>

      <div className="final1-wrap">
        <div
          className="phone-frame"
          style={{
            width: 390,
            height: 844,
            background: BG,
            borderRadius: 36,
            overflow: 'hidden',
            boxShadow: '0 0 0 10px #1a1a1a, 0 30px 80px rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <div className="final1-no-vsw" style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {screen === 'summary' && (
              <MultiTicketSummary
                summaryVersion="v1"
                onSummaryVersionChange={() => {}}
                activation={activation}
                setActivation={setActivation}
                passengers={passengers}
                ticketIds={ticketIds}
                setTicketIds={setTicketIds}
                onEditPassengers={openPassengers}
                onNext={proceedToPayment}
                onTotalChange={setCheckoutTotal}
              />
            )}
            {screen === 'passengers' && (
              <PassengerFlow
                passengers={passengers}
                availablePassengers={availablePassengers}
                favorites={favorites}
                version="v5.0"
                requireNames={requireNames}
                onVersionChange={() => {}}
                onSaveAvailablePassengers={setAvailablePassengers}
                onSaveFavorites={setFavorites}
                onBack={() => setScreen('summary')}
                onConfirm={items => {
                  setPassengers(items);
                  setRequireNames(false);
                  setScreen('summary');
                }}
              />
            )}
            {screen === 'payment' && (
              // Jednoduchá platební obrazovka – přejde na potvrzení
              <div className="flex flex-col h-full" style={{ background: BG }}>
                <div style={{ background: HEADER }} className="flex items-center gap-3 px-4 py-3 min-h-[52px] flex-shrink-0">
                  <button aria-label="Zpět" onClick={() => setScreen('summary')} className="text-white opacity-95 -ml-1">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                    </svg>
                  </button>
                  <span className="text-white font-medium text-[19px] tracking-tight">Platba</span>
                </div>
                <div className="flex-1 flex items-center justify-center px-6 text-center">
                  <div>
                    <p style={{ color: '#8ba0b3' }} className="text-sm mb-6">Celková cena: <strong className="text-white">{checkoutTotal} Kč</strong></p>
                    <button onClick={() => setScreen('confirm')}
                      style={{ background: '#026cb6', borderRadius: 6 }}
                      className="px-8 py-3 text-white font-medium text-sm active:opacity-90 shadow-sm">
                      Zaplatit {checkoutTotal} Kč →
                    </button>
                  </div>
                </div>
              </div>
            )}
            {screen === 'confirm' && (
              <ConfirmScreen total={checkoutTotal} ticketCount={ticketCount} onDone={() => setScreen('summary')} />
            )}
          </div>
          <AndroidNavBar onBack={handleNavBack} onHome={() => setScreen('summary')} />
        </div>
      </div>
    </>
  );
}
