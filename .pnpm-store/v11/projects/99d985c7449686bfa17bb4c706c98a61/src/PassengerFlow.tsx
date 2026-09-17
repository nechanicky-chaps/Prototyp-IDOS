import { useEffect, useRef, useState } from 'react';

export type Passenger = { uid: string; catId: string; passId: string; name?: string; firstName?: string; lastName?: string; passNumber?: string };
export const categories = [
  { id: 'child0', label: 'Dítě do 6 let', sub: 'Věk v den cesty', color: '#34d399' },
  { id: 'child6', label: 'Dítě 6–14 let', sub: 'Věk v den cesty', color: '#60a5fa' },
  { id: 'junior', label: 'Junior 15–17 let', sub: 'Věk v den cesty', color: '#a78bfa' },
  { id: 'student', label: 'Student 18–25 let', sub: 'Studující cestující', color: '#f472b6' },
  { id: 'adult', label: 'Dospělý 26–59 let', sub: 'Dospělý cestující', color: '#60a5fa' },
  { id: 'senior60', label: 'Senior 60–64 let', sub: 'Věk v den cesty', color: '#fbbf24' },
  { id: 'senior65', label: 'Senior 65+', sub: 'Věk v den cesty', color: '#fb923c' },
  { id: 'ztp', label: 'ZTP / ZTP-P', sub: 'Držitel průkazu', color: '#94a3b8' },
];
export const passes = [
  { id: 'none', label: 'Bez průkazu', sub: 'Pokračovat bez slevové karty' },
  { id: 'inkarta', label: 'In-Karta Standard', sub: 'Věrnostní karta' },
  { id: 'inkarta_plus', label: 'In-Karta Plus', sub: 'Věrnostní karta' },
  { id: 'isic', label: 'ISIC / ITIC', sub: 'Studentský průkaz' },
  { id: 'ztp', label: 'Průkaz ZTP', sub: 'Průkaz cestujícího' },
  { id: 'ztpp', label: 'Průkaz ZTP/P', sub: 'Průkaz cestujícího' },
];
export const initialPassengers: Passenger[] = [{ uid: 'adult-default', catId: 'adult', passId: 'none' }];
export const initialFavorites: Passenger[] = [
  { uid: 'fav1', catId: 'adult', passId: 'none', name: 'Tom' },
  { uid: 'fav2', catId: 'senior60', passId: 'inkarta', name: 'Jana' },
];
export const passengerLabel = (p: Passenger) => p.name || categories.find(c => c.id === p.catId)?.label || 'Cestující';
export const countLabel = (n: number) => `${n} ${n > 0 && n < 5 ? 'cestující' : 'cestujících'}`;
// Deliberately a fixed demonstration price, not a tariff calculation.
export const demoTotal = (passengers: Passenger[]) => passengers.length * 33;

type Page = 'list' | 'category' | 'pass' | 'review' | 'favorite';
const steps = ['Kategorie', 'Průkaz', 'Kontrola'];
export default function PassengerFlow({ passengers, favorites, onSaveFavorites, onBack, onConfirm }: {
  passengers: Passenger[]; favorites: Passenger[]; onSaveFavorites: (p: Passenger[]) => void;
  onBack: () => void; onConfirm: (p: Passenger[]) => void;
}) {
  const [selected, setSelected] = useState(passengers);
  const [page, setPage] = useState<Page>('list');
  const [draft, setDraft] = useState<Passenger>({ uid: '', catId: '', passId: 'none' });
  const [saveFavorite, setSaveFavorite] = useState(false);
  const [editing, setEditing] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => { heading.current?.focus(); content.current?.scrollTo(0, 0); }, [page]);
  const stepIndex = page === 'category' ? 0 : page === 'pass' ? 1 : 2;
  const cat = categories.find(c => c.id === draft.catId);
  const pass = passes.find(p => p.id === draft.passId);
  const start = (p?: Passenger, favorite = false) => {
    setDraft(p ? { ...p } : { uid: Array.from(crypto.getRandomValues(new Uint32Array(4)), n => n.toString(16).padStart(8, '0')).join(''), catId: '', passId: 'none' });
    setEditing(!!p); setSaveFavorite(favorite); setPage('category');
  };
  const toggleFavorite = (p: Passenger) => {
    if (favorites.some(f => f.uid === p.uid)) {
      onSaveFavorites(favorites.filter(f => f.uid !== p.uid));
      return;
    }
    setDraft({ ...p });
    setEditing(true);
    setSaveFavorite(true);
    setPage('favorite');
  };
  const back = () => {
    if (page === 'list') onBack();
    else setPage(page === 'category' || page === 'favorite' ? 'list' : page === 'pass' ? 'category' : 'pass');
  };
  const complete = () => {
    if (!draft.catId || (saveFavorite && !draft.name?.trim())) return;
    const passenger = { ...draft, name: draft.name?.trim() || undefined };
    setSelected(items => editing ? items.map(p => p.uid === passenger.uid ? passenger : p) : [...items, passenger]);
    if (saveFavorite) onSaveFavorites([...favorites.filter(p => p.uid !== passenger.uid), passenger]);
    setPage('list');
  };
  return (
    <section className="passenger-flow">
      <header className="flow-header">
        <button aria-label="Zpět" onClick={back}>←</button>
        <h1 ref={heading} tabIndex={-1}>{page === 'list' ? 'Cestující' : page === 'favorite' ? 'Uložit do oblíbených' : editing ? 'Upravit cestujícího' : 'Přidat cestujícího'}</h1>
        {page !== 'list' && <button className="flow-cancel" onClick={() => setPage('list')}>Zrušit</button>}
      </header>
      {page !== 'list' && page !== 'favorite' && <ol className="flow-steps" aria-label="Postup přidání cestujícího">{steps.map((label, i) => (
        <li key={label} aria-current={i === stepIndex ? 'step' : undefined} className={i <= stepIndex ? 'active' : ''}><span>{i < stepIndex ? '✓' : i + 1}</span>{label}</li>
      ))}</ol>}
      <div ref={content} className="flow-content">
        {page === 'list' ? <>
          <p className="flow-eyebrow">Společně na cestu</p>
          <h2>Kdo bude cestovat?</h2>
          <p className="flow-hint">Přidejte cestující nebo vyberte někoho z oblíbených.</p>
          <div className="flow-section-title"><h3>Vybraní cestující</h3><span>{selected.length}</span></div>
          {!selected.length && <p className="flow-empty">Zatím není nikdo vybraný. Přidejte alespoň jednoho cestujícího.</p>}
          <div className="flow-cards">{selected.map(p => <div className="flow-person" key={p.uid}>
            <span className="flow-avatar" style={{ color: categories.find(c => c.id === p.catId)?.color }}>●</span>
            <button className="flow-person-info" aria-label={`Upravit ${passengerLabel(p)}`} onClick={() => start(p)}>
              <strong>{passengerLabel(p)}</strong><small>{p.name && `${categories.find(c => c.id === p.catId)?.label} · `}{passes.find(s => s.id === p.passId)?.label}</small>
            </button>
            <button className="flow-star" aria-pressed={favorites.some(f => f.uid === p.uid)}
              aria-label={(favorites.some(f => f.uid === p.uid) ? 'Odebrat z oblíbených: ' : 'Přidat do oblíbených: ') + passengerLabel(p)}
              onClick={() => toggleFavorite(p)}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill={favorites.some(f => f.uid === p.uid) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z" /></svg>
            </button>
            <button className="flow-remove" aria-label={`Odebrat ${passengerLabel(p)}`} onClick={() => setSelected(items => items.filter(s => s.uid !== p.uid))}>×</button>
          </div>)}</div>
          <button className="flow-add" onClick={() => start()}><span>＋</span> Přidat dalšího cestujícího</button>
          <div className="flow-section-title"><h3>Oblíbení cestující</h3><span>★</span></div>
          <div className="flow-favorites">{favorites.map(p => {
            const active = selected.some(s => s.uid === p.uid);
            return <button key={p.uid} aria-pressed={active} className={`flow-favorite ${active ? 'selected' : ''}`} onClick={() => setSelected(items => active ? items.filter(s => s.uid !== p.uid) : [...items, { ...p }])}>
              <span className="flow-avatar">{p.name?.slice(0, 1)}</span><strong>{passengerLabel(p)}</strong><small>{categories.find(c => c.id === p.catId)?.label}</small><span className="flow-favorite-status">{active ? '✓ Vybráno' : '+ Vybrat'}</span>
            </button>;
          })}</div>
          <button className="flow-text-button" onClick={() => start(undefined, true)}>＋ Přidat oblíbeného cestujícího</button>
        </> : <>
          <p className="flow-eyebrow">{page === 'favorite' ? 'Oblíbený cestující' : 'Krok ' + (stepIndex + 1) + ' ze 3'}</p>
          <h2>{page === 'favorite' ? 'Jak cestujícího pojmenujete?' : page === 'category' ? 'Vyberte kategorii' : page === 'pass' ? 'Má cestující průkaz?' : 'Zkontrolujte cestujícího'}</h2>
          <p className="flow-hint">{page === 'favorite' ? 'Kategorii a průkaz už máte vybrané. Doplňte přezdívku, podle které ho příště poznáte.' : page === 'category' ? 'Vyberte kategorii podle věku v den cesty.' : page === 'pass' ? 'Vyberte slevovou kartu, kterou si vezmete na cestu.' : 'Údaje můžete upravit návratem do předchozích kroků.'}</p>
          {page === 'category' && <div className="flow-options" role="group" aria-label="Kategorie cestujícího">{categories.map(c => <button key={c.id} aria-pressed={draft.catId === c.id} className={`flow-option ${draft.catId === c.id ? 'selected' : ''}`} onClick={() => setDraft({ ...draft, catId: c.id })}>
            <span className="flow-avatar" style={{ color: c.color }}>●</span><span><strong>{c.label}</strong><small>{c.sub}</small></span><span className="flow-radio">{draft.catId === c.id ? '●' : '○'}</span>
          </button>)}</div>}
          {page === 'pass' && <><div className="flow-chip">{cat?.label}</div><div className="flow-options" role="group" aria-label="Slevový průkaz">{passes.map(p => <button key={p.id} aria-pressed={draft.passId === p.id} className={`flow-option ${draft.passId === p.id ? 'selected' : ''}`} onClick={() => setDraft({ ...draft, passId: p.id })}>
            <span><strong>{p.label}</strong><small>{p.sub}</small></span><span className="flow-radio">{draft.passId === p.id ? '●' : '○'}</span>
          </button>)}</div></>}
          {(page === 'review' || page === 'favorite') && <>
            <div className="flow-review"><span className="flow-avatar" style={{ color: cat?.color }}>●</span><h3>{cat?.label}</h3><p>{pass?.label}</p>{page !== 'favorite' && <button className="flow-text-button" onClick={() => setPage('category')}>Upravit údaje</button>}</div>
            {page !== 'favorite' && <label className="flow-save"><input type="checkbox" checked={saveFavorite} onChange={e => setSaveFavorite(e.target.checked)} /><span><strong>Uložit do oblíbených</strong><small>Příště cestujícího vyberete jedním klepnutím.</small></span></label>}
            {saveFavorite && <div className="flow-fields">
              <label>Přezdívka <span>*</span><input value={draft.name || ''} onChange={e => setDraft({ ...draft, name: e.target.value })} required /></label>
              <label>Jméno <small>volitelné</small><input autoComplete="given-name" value={draft.firstName || ''} onChange={e => setDraft({ ...draft, firstName: e.target.value })} /></label>
              <label>Příjmení <small>volitelné</small><input autoComplete="family-name" value={draft.lastName || ''} onChange={e => setDraft({ ...draft, lastName: e.target.value })} /></label>
              {draft.passId !== 'none' && <label>Číslo průkazu <small>volitelné</small><input value={draft.passNumber || ''} onChange={e => setDraft({ ...draft, passNumber: e.target.value })} /></label>}
              <p className="flow-hint">* Pro uložení do oblíbených vyplňte přezdívku. Jméno a příjmení jsou volitelné.</p>
            </div>}
          </>}
        </>}
      </div>
      <footer className="flow-footer">
        {page === 'list' ? <button className="flow-primary" disabled={!selected.length} onClick={() => onConfirm(selected)}><span>Potvrdit výběr</span><span>{countLabel(selected.length)} →</span></button>
          : <button className="flow-primary" disabled={!draft.catId || ((page === 'review' || page === 'favorite') && saveFavorite && !draft.name?.trim())} onClick={() => page === 'review' || page === 'favorite' ? complete() : setPage(page === 'category' ? 'pass' : 'review')}><span>{page === 'favorite' ? 'Uložit do oblíbených' : page === 'review' ? editing ? 'Uložit změny' : 'Přidat cestujícího' : 'Pokračovat'}</span><span>{page === 'review' || page === 'favorite' ? '✓' : '→'}</span></button>}
      </footer>
    </section>
  );
}



