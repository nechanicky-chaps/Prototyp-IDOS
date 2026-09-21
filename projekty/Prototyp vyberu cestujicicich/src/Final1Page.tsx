import { useState } from 'react';
import MultiTicketSummary, { journeyTickets } from './MultiTicketSummary';
import PassengerFlow, { initialFavorites, type Passenger } from './PassengerFlow';

type Screen = 'summary' | 'passengers';

function AndroidNavBar({ onBack }: { onBack: () => void }) {
  return (
    <div style={{ background: '#000' }} className="flex items-center justify-around py-2 px-8 text-neutral-400 select-none flex-shrink-0">
      <button aria-label="Recent apps" className="p-1 hover:text-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="6" y1="5" x2="6" y2="19" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="18" y1="5" x2="18" y2="19" />
        </svg>
      </button>
      <button aria-label="Home" className="p-1 hover:text-white">
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

  const openPassengers = () => {
    setRequireNames(true);
    setScreen('passengers');
  };

  const handleNavBack = () => {
    window.dispatchEvent(new Event('passenger-back'));
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
            background: '#00101d',
            borderRadius: 36,
            overflow: 'hidden',
            boxShadow: '0 0 0 10px #1a1a1a, 0 30px 80px rgba(0,0,0,0.9)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <div className="final1-no-vsw" style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {screen === 'summary' ? (
              <MultiTicketSummary
                summaryVersion="v1"
                onSummaryVersionChange={() => {}}
                activation={activation}
                setActivation={setActivation}
                passengers={passengers}
                ticketIds={ticketIds}
                setTicketIds={setTicketIds}
                onBack={() => {}}
                onEditPassengers={openPassengers}
                onNext={() => {}}
              />
            ) : (
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
          </div>
          <AndroidNavBar onBack={handleNavBack} />
        </div>
      </div>
    </>
  );
}
