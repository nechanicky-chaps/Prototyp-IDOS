import { useState } from 'react';
import MultiTicketSummary, { journeyTickets, multiTotal } from './MultiTicketSummary';
import PassengerFlow, { initialPassengers, initialFavorites, hasPassengerName, type Passenger } from './PassengerFlow';

// ──────────────────────────────────────────────────────────────
// Thin wrappers that strip the version-switch UI out of the
// original components.  We render MultiTicketSummary with a
// fixed summaryVersion="v1" and PassengerFlow with version="v5.0".
// Both version-switch props are still passed (required by the
// component signatures) but we never render the <SummaryVersionSwitch>
// because MultiTicketSummary renders it internally – we override
// it by hiding the element via CSS below.
// ──────────────────────────────────────────────────────────────

type PhoneScreen = 'summary' | 'passengers' | 'payment';

function PhoneFrame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="final1-column">
      <p className="final1-label">{label}</p>
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
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
        {/* Android nav */}
        <div style={{ background: '#000' }} className="flex items-center justify-around py-2 px-8 text-neutral-400 select-none flex-shrink-0">
          <button aria-label="Recent apps" className="p-1 hover:text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="6" y1="5" x2="6" y2="19" /><line x1="12" y1="5" x2="12" y2="19" /><line x1="18" y1="5" x2="18" y2="19" />
            </svg>
          </button>
          <button aria-label="Home" className="p-1 hover:text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="7" />
            </svg>
          </button>
          <button aria-label="Back" className="p-1 hover:text-white"
            onClick={() => window.dispatchEvent(new Event('passenger-back'))}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Final1Page() {
  // ── Shared passenger state ───────────────────────────────────
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

  // ── Per-phone screens ────────────────────────────────────────
  const [leftScreen, setLeftScreen] = useState<PhoneScreen>('summary');
  const [rightScreen, setRightScreen] = useState<PhoneScreen>('passengers');

  // When user edits passengers from summary → switch right phone to passengers
  const openPassengersFromSummary = () => {
    setRequireNames(true);
    setRightScreen('passengers');
  };

  return (
    <>
      <style>{`
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
      `}</style>

      <div className="final1-wrapper">
        <div className="final1-row">

          {/* LEFT: Souhrn jízdenek V1 */}
          <PhoneFrame label="Souhrn jízdenek · V1">
            <div className="final1-no-version-switch" style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <MultiTicketSummary
                summaryVersion="v1"
                onSummaryVersionChange={() => {/* fixed – no switch */}}
                activation={activation}
                setActivation={setActivation}
                passengers={passengers}
                ticketIds={ticketIds}
                setTicketIds={setTicketIds}
                onBack={() => {/* no navigation in final1 */}}
                onEditPassengers={openPassengersFromSummary}
                onNext={() => {/* platba – not wired in this view */}}
              />
            </div>
          </PhoneFrame>

          {/* RIGHT: Výběr cestujících V5.0 */}
          <PhoneFrame label="Výběr cestujících · V5.0">
            <div className="final1-no-version-switch" style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <PassengerFlow
                passengers={passengers}
                availablePassengers={availablePassengers}
                favorites={favorites}
                version="v5.0"
                requireNames={requireNames}
                onVersionChange={() => {/* fixed */}}
                onSaveAvailablePassengers={setAvailablePassengers}
                onSaveFavorites={setFavorites}
                onBack={() => setRightScreen('summary')}
                onConfirm={items => {
                  setPassengers(items);
                  setRequireNames(false);
                }}
              />
            </div>
          </PhoneFrame>

        </div>
      </div>
    </>
  );
}
