import { useState } from 'react';
import { purchaseFareOptions, ResultsScreen, SummaryScreen } from './App';
import MultiTicketSummary, { journeyTickets, multiTotal } from './MultiTicketSummary';
import PassengerFlow, { initialFavorites, initialPassengers, passengersMissingRequiredNames, type Passenger, type RequiredNameMode } from './PassengerFlow';

type Screen = 'setup' | 'results' | 'summary' | 'passengers' | 'payment' | 'confirm';
type PrototypeConfig = {
  requiredNames: RequiredNameMode;
  selectionControl: 'checkbox' | 'switch';
  fareDisplay: 'fab' | 'inline' | 'collapsible';
  selectedOrder: 'top' | 'keep';
  showConfirmButton: boolean;
  showFormSaveButton: boolean;
};

const BG = '#00101d';
const HEADER = '#0365ac';
const defaultConfig: PrototypeConfig = {
  requiredNames: 'all',
  selectionControl: 'switch',
  fareDisplay: 'fab',
  selectedOrder: 'keep',
  showConfirmButton: false,
  showFormSaveButton: false,
};

function SetupGroup({ title, value, options, onChange }: {
  title: string; value: string; options: { value: string; label: string; defaultChoice?: boolean }[]; onChange: (value: string) => void;
}) {
  return <fieldset className="prototype-setup-group"><legend>{title}</legend><div>
    {options.map(option => <button type="button" key={option.value} aria-pressed={value === option.value} onClick={() => onChange(option.value)}>
      <span>{option.label}</span>{option.defaultChoice && <small>výchozí</small>}
    </button>)}
  </div></fieldset>;
}

function SetupScreen({ config, onChange, onContinue }: { config: PrototypeConfig; onChange: (config: PrototypeConfig) => void; onContinue: () => void }) {
  const set = <K extends keyof PrototypeConfig>(key: K, value: PrototypeConfig[K]) => onChange({ ...config, [key]: value });
  return <section className="prototype-setup" data-idos-theme="dark">
    <header><h1>Nastavení prototypu</h1><p>Zvolte varianty, které chcete v ukázce porovnat.</p></header>
    <div className="prototype-setup-content">
      <SetupGroup title="Výzva k zadání údajů" value={config.requiredNames} onChange={value => set('requiredNames', value as RequiredNameMode)} options={[
        { value: 'none', label: 'Žádná' }, { value: 'holder', label: 'Držitel jízdenky' }, { value: 'all', label: 'Všichni cestující', defaultChoice: true },
      ]} />
      <SetupGroup title="Aktivace cestujícího" value={config.selectionControl} onChange={value => set('selectionControl', value as PrototypeConfig['selectionControl'])} options={[
        { value: 'checkbox', label: 'Checkboxy' }, { value: 'switch', label: 'Přepínače', defaultChoice: true },
      ]} />
      <SetupGroup title="Alternativní tarifní nabídky" value={config.fareDisplay} onChange={value => set('fareDisplay', value as PrototypeConfig['fareDisplay'])} options={[
        { value: 'fab', label: 'FAB button', defaultChoice: true }, { value: 'inline', label: 'Na hlavní stránce viditelné' }, { value: 'collapsible', label: 'Na hlavní stránce sbalitelné' },
      ]} />
      <SetupGroup title="Vybraný cestující" value={config.selectedOrder} onChange={value => set('selectedOrder', value as PrototypeConfig['selectedOrder'])} options={[
        { value: 'top', label: 'Přesunout nahoru v seznamu' }, { value: 'keep', label: 'Ponechat na místě' , defaultChoice: true },
      ]} />
      <SetupGroup title="Spodní tlačítko Potvrdit výběr" value={config.showConfirmButton ? 'show' : 'hide'} onChange={value => set('showConfirmButton', value === 'show')} options={[
        { value: 'hide', label: 'Schovat', defaultChoice: true }, { value: 'show', label: 'Zobrazit' },
      ]} />
      <SetupGroup title="Spodní tlačítko Přidat cestujícího" value={config.showFormSaveButton ? 'show' : 'hide'} onChange={value => set('showFormSaveButton', value === 'show')} options={[
        { value: 'hide', label: 'Schovat', defaultChoice: true }, { value: 'show', label: 'Zobrazit' },
      ]} />
    </div>
    <footer><button className="prototype-setup-start" onClick={onContinue}>Pokračovat k výběru spojení <span aria-hidden="true">→</span></button></footer>
  </section>;
}

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
  const [screen, setScreen] = useState<Screen>('setup');
  const [config, setConfig] = useState<PrototypeConfig>(defaultConfig);
  const [multi, setMulti] = useState(true);
  const [passengers, setPassengers] = useState<Passenger[]>([
    { uid: 'senior-example', catId: 'senior65', passIds: ['none'] },
  ]);
  const [availablePassengers, setAvailablePassengers] = useState<Passenger[]>([
    { uid: 'senior-example', catId: 'senior65', passIds: ['none'] },
  ]);
  const [favorites, setFavorites] = useState<Passenger[]>(initialFavorites);
  const [showRequiredFields, setShowRequiredFields] = useState(false);
  const [activation, setActivation] = useState('Automatická aktivace');
  const [ticketIds, setTicketIds] = useState(journeyTickets.map(t => t.id));
  const [checkoutTotal, setCheckoutTotal] = useState(multiTotal(ticketIds, passengers.length));
  const [selectedFare, setSelectedFare] = useState(0);

  const paymentTotal = multi ? checkoutTotal : purchaseFareOptions[selectedFare].price * passengers.length;
  const ticketCount = passengers.length * (multi ? ticketIds.length : 1);

  const chooseScenario = (value: boolean) => {
    if (value === multi) return;
    const scenarioPassengers = value
      ? [{ uid: 'senior-example', catId: 'senior65', passIds: ['none'] }]
      : initialPassengers;
    setMulti(value);
    setPassengers(scenarioPassengers);
    setAvailablePassengers(scenarioPassengers);
    setTicketIds(journeyTickets.map(ticket => ticket.id));
    setSelectedFare(0);
    setShowRequiredFields(false);
  };

  const proceedToPayment = () => {
    if (!passengers.length) return;
    if (passengersMissingRequiredNames(passengers, config.requiredNames)) {
      setShowRequiredFields(true);
      setScreen('passengers');
      return;
    }
    setScreen('payment');
  };

  const openPassengers = () => {
    setShowRequiredFields(config.requiredNames !== 'none');
    setScreen('passengers');
  };

  const handleNavBack = () => {
    if (screen === 'passengers') {
      window.dispatchEvent(new Event('passenger-back'));
      return;
    }
    if (screen === 'results') setScreen('setup');
    if (screen === 'summary') setScreen('results');
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
            {screen === 'setup' && <SetupScreen config={config} onChange={setConfig} onContinue={() => setScreen('results')} />}
            {screen === 'results' && (
              <ResultsScreen
                multi={multi}
                presentation
                showScenarioTabs
                onScenario={chooseScenario}
                onBuy={() => setScreen('summary')}
              />
            )}
            {screen === 'summary' && multi && (
              <MultiTicketSummary
                summaryVersion={config.fareDisplay === 'fab' ? 'v1' : 'v2'}
                onSummaryVersionChange={() => {}}
                collapsibleFares={config.fareDisplay === 'collapsible'}
                requiredNameMode={config.requiredNames}
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
            {screen === 'summary' && !multi && (
              <SummaryScreen
                summaryVersion={config.fareDisplay === 'fab' ? 'v1' : 'v2'}
                onSummaryVersionChange={() => {}}
                presentation
                collapsibleFares={config.fareDisplay === 'collapsible'}
                requiredNameMode={config.requiredNames}
                passengers={passengers}
                selectedFare={selectedFare}
                onSelectFare={setSelectedFare}
                onBack={() => setScreen('results')}
                onEditPassengers={openPassengers}
                onNext={proceedToPayment}
              />
            )}
            {screen === 'passengers' && (
              <PassengerFlow
                passengers={passengers}
                availablePassengers={availablePassengers}
                favorites={favorites}
                version="v5.0"
                requiredNameMode={showRequiredFields ? config.requiredNames : 'none'}
                selectionControl={config.selectionControl}
                moveSelectedToTop={config.selectedOrder === 'top'}
                showConfirmButton={config.showConfirmButton}
                showFormSaveButton={config.showFormSaveButton}
                onVersionChange={() => {}}
                onSaveAvailablePassengers={setAvailablePassengers}
                onSaveFavorites={setFavorites}
                onBack={() => setScreen('summary')}
                onConfirm={items => {
                  setPassengers(items);
                  setShowRequiredFields(false);
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
                    <p style={{ color: '#8ba0b3' }} className="text-sm mb-6">Celková cena: <strong className="text-white">{paymentTotal} Kč</strong></p>
                    <button onClick={() => setScreen('confirm')}
                      style={{ background: '#026cb6', borderRadius: 6 }}
                      className="px-8 py-3 text-white font-medium text-sm active:opacity-90 shadow-sm">
                      Zaplatit {paymentTotal} Kč →
                    </button>
                  </div>
                </div>
              </div>
            )}
            {screen === 'confirm' && (
              <ConfirmScreen total={paymentTotal} ticketCount={ticketCount} onDone={() => setScreen('summary')} />
            )}
          </div>
          <AndroidNavBar onBack={handleNavBack} onHome={() => setScreen('setup')} />
        </div>
      </div>
    </>
  );
}
