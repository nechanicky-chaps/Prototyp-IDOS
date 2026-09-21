import { useEffect, useRef, useState } from 'react';

export type Passenger = { uid: string; catId: string; passIds: string[]; age?: number; name?: string; firstName?: string; lastName?: string; passNumber?: string; birthDate?: string };
export const categories = [
  { id: 'child0', label: 'Dítě (0–1 rok)', color: '#34d399' },
  { id: 'child2', label: 'Dítě (2 roky)', color: '#34d399' },
  { id: 'child3', label: 'Dítě (3 roky)', color: '#34d399' },
  { id: 'child4', label: 'Dítě (4 roky)', color: '#34d399' },
  { id: 'child5', label: 'Dítě (5 let)', color: '#34d399' },
  { id: 'child6', label: 'Dítě (6 let)', color: '#60a5fa' },
  { id: 'child7', label: 'Dítě (7 let)', color: '#60a5fa' },
  { id: 'child8', label: 'Dítě (8 let)', color: '#60a5fa' },
  { id: 'child9', label: 'Dítě (9 let)', color: '#60a5fa' },
  { id: 'child10', label: 'Dítě (10 let)', color: '#60a5fa' },
  { id: 'child11', label: 'Dítě (11 let)', color: '#60a5fa' },
  { id: 'child12', label: 'Dítě (12 let)', color: '#60a5fa' },
  { id: 'child13', label: 'Dítě (13 let)', color: '#60a5fa' },
  { id: 'child14', label: 'Dítě (14 let)', color: '#60a5fa' },
  { id: 'junior15', label: 'Mládež (15 let)', color: '#a78bfa' },
  { id: 'junior1617', label: 'Mládež (16–17 let)', color: '#a78bfa' },
  { id: 'student', label: 'Mládež (18–25 let)', color: '#f472b6' },
  { id: 'adult', label: 'Dospělý (26–59 let)', color: '#60a5fa' },
  { id: 'senior60', label: 'Senior (60–61 let)', color: '#fbbf24' },
  { id: 'senior6264', label: 'Senior (62–64 let)', color: '#fbbf24' },
  { id: 'senior65', label: 'Senior (65–69 let)', color: '#fb923c' },
  { id: 'senior70', label: 'Senior (70 let a více)', color: '#fb923c' },
];
export const passes = [
  { id: 'none', label: 'Bez průkazu', sub: 'Pokračovat bez slevové karty' },
  { id: 'in25', label: 'IN 25', sub: 'In-Karta' },
  { id: 'in50', label: 'IN 50', sub: 'In-Karta' },
  { id: 'inkarta', label: 'In-Karta Standard', sub: 'In-Karta' },
  { id: 'inkarta_plus', label: 'In-Karta Plus', sub: 'In-Karta' },
  { id: 'itic', label: 'Karta ITIC', sub: 'Studentský průkaz' },
  { id: 'isic', label: 'ISIC', sub: 'Studentský průkaz' },
  { id: 'alive', label: 'Karta ALIVE', sub: 'Studentský průkaz' },
  { id: 'invalidity3', label: 'Osvědčení invalidity 3. stupně', sub: 'Průkaz cestujícího' },
  { id: 'ztp', label: 'Průkaz ZTP', sub: 'Průkaz cestujícího' },
  { id: 'ztpp', label: 'Průkaz ZTP/P', sub: 'Průkaz cestujícího' },
  { id: 'ztpp_guide', label: 'Průvodce ZTP/P', sub: 'Průkaz cestujícího' },
  { id: 'tzp', label: 'Průkaz TZP', sub: 'Průkaz cestujícího' },
  { id: 'tzps', label: 'Průkaz TZP/S', sub: 'Průkaz cestujícího' },
  { id: 'tzps_guide', label: 'Průvodce TZP/S', sub: 'Průkaz cestujícího' },
  { id: 'parent', label: 'Průkaz rodiče pro ústavy', sub: 'Průkaz cestujícího' },
  { id: 'first_class', label: 'Časový doplatek do 1. třídy', sub: 'Doplatek' },
  { id: 'idsok', label: 'Průkaz IDSOK', sub: 'Krajská karta' },
];
const passSections = [
  { label: 'In-Karta', ids: ['in25', 'in50', 'inkarta', 'inkarta_plus'] },
  { label: 'Studentské karty', ids: ['itic', 'isic', 'alive'] },
  { label: 'Průkazy ZTP a invalidity', ids: ['invalidity3', 'ztp', 'ztpp', 'ztpp_guide', 'tzp', 'tzps', 'tzps_guide'] },
  { label: 'Ostatní průkazy', ids: ['parent', 'first_class', 'idsok'] },
];
const categoryGroups = [
  { id: 'children', label: 'Děti (0–15)', items: categories.filter(c => c.id.startsWith('child')) },
  { id: 'youth', label: 'Mladiství (15–26)', items: categories.filter(c => c.id.startsWith('junior') || c.id === 'student') },
  { id: 'adults', label: 'Dospělí (26–59)', items: categories.filter(c => c.id === 'adult') },
  { id: 'seniors', label: 'Senior+', items: categories.filter(c => c.id.startsWith('senior')) },
];
export const initialPassengers: Passenger[] = [{ uid: 'adult-default', catId: 'adult', passIds: ['none'] }];
export const initialFavorites: Passenger[] = [
  { uid: 'fav1', catId: 'adult', passIds: ['none'], age: 35, name: 'Tom' },
  { uid: 'fav2', catId: 'senior60', passIds: ['inkarta'], age: 60, name: 'Jana' },
];
export const passengerLabel = (p: Passenger) => p.name || categories.find(c => c.id === p.catId)?.label || 'Cestující';
export const passLabels = (p: Passenger) => p.passIds.map(id => passes.find(pass => pass.id === id)?.label).filter(Boolean).join(', ');
export const hasPassengerName = (p: Passenger) => !!p.firstName?.trim() && !!p.lastName?.trim();
export const countLabel = (n: number) => `${n} ${n > 0 && n < 5 ? 'cestující' : 'cestujících'}`;
// Deliberately a fixed demonstration price, not a tariff calculation.
export const demoTotal = (passengers: Passenger[]) => passengers.length * 33;

export type DesignVersion = 'v1.0' | 'v2.0' | 'v3.0' | 'v4.0' | 'v5.0';
type Page = 'list' | 'category' | 'favorite';

function categoryForAge(age: number) {
  if (age <= 1) return 'child0';
  if (age <= 14) return `child${age}`;
  if (age === 15) return 'junior15';
  if (age <= 17) return 'junior1617';
  if (age <= 25) return 'student';
  if (age <= 59) return 'adult';
  if (age <= 61) return 'senior60';
  if (age <= 64) return 'senior6264';
  if (age <= 69) return 'senior65';
  return 'senior70';
}
export default function PassengerFlow({ passengers, availablePassengers, favorites, version, requireNames = false, onVersionChange, onSaveAvailablePassengers, onSaveFavorites, onBack, onConfirm }: {
  passengers: Passenger[]; availablePassengers: Passenger[]; favorites: Passenger[];
  onSaveAvailablePassengers: (p: Passenger[]) => void; onSaveFavorites: (p: Passenger[]) => void;
  requireNames?: boolean; version: DesignVersion; onVersionChange: (version: DesignVersion) => void;
  onBack: () => void; onConfirm: (p: Passenger[]) => void;
}) {
  const [selected, setSelected] = useState(passengers);
  const [page, setPage] = useState<Page>('list');
  const [draft, setDraft] = useState<Passenger>({ uid: '', catId: '', passIds: ['none'] });
  const [saveFavorite, setSaveFavorite] = useState(false);
  const [editing, setEditing] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [enterAge, setEnterAge] = useState(false);
  const cancelBack = useRef(false);
  const latestBack = useRef<() => void>(() => {});
  const heading = useRef<HTMLHeadingElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => { heading.current?.focus(); content.current?.scrollTo(0, 0); }, [page]);
  const cat = categories.find(c => c.id === draft.catId);
  const togglePass = (passId: string) => setDraft(current => ({
    ...current,
    passIds: passId === 'none'
      ? ['none']
      : current.passIds.includes(passId)
        ? current.passIds.filter(id => id !== passId).length ? current.passIds.filter(id => id !== passId) : ['none']
        : [...current.passIds.filter(id => id !== 'none'), passId],
  }));
  const start = (p?: Passenger, favorite = false) => {
    setEnterAge(!!p && p.catId !== 'adult');
    setDraft(p ? { ...p, age: p.catId === 'adult' ? undefined : p.age } : { uid: Array.from(crypto.getRandomValues(new Uint32Array(4)), n => n.toString(16).padStart(8, '0')).join(''), catId: (version === 'v4.0' || version === 'v5.0') ? 'adult' : '', passIds: ['none'] });
    setEditing(!!p); setSaveFavorite(favorite); setPage('category');
  };
  const startQuickAdd = () => {
    setDraft({ uid: Array.from(crypto.getRandomValues(new Uint32Array(4)), n => n.toString(16).padStart(8, '0')).join(''), catId: '', passIds: ['none'] });
    setEditing(false);
    setSaveFavorite(false);
    setQuickAddOpen(true);
  };
  const toggleFavorite = (p: Passenger) => {
    if (favorites.some(f => f.uid === p.uid)) {
      if (!availablePassengers.some(item => item.uid === p.uid)) onSaveAvailablePassengers([...availablePassengers, p]);
      onSaveFavorites(favorites.filter(f => f.uid !== p.uid));
      return;
    }
    setDraft({ ...p });
    setEditing(true);
    setSaveFavorite(true);
    setPage(version === 'v5.0' ? 'category' : 'favorite');
  };
  const updateName = (p: Passenger, field: 'firstName' | 'lastName', value: string) => {
    const updated = { ...p, [field]: value };
    setSelected(items => items.map(item => item.uid === p.uid ? updated : item));
    onSaveAvailablePassengers(availablePassengers.some(item => item.uid === p.uid) ? availablePassengers.map(item => item.uid === p.uid ? updated : item) : [...availablePassengers, updated]);
    if (favorites.some(item => item.uid === p.uid)) onSaveFavorites(favorites.map(item => item.uid === p.uid ? updated : item));
  };
  const toggleSelected = (p: Passenger) => {
    const active = selected.some(item => item.uid === p.uid);
    setSelected(items => active ? items.filter(item => item.uid !== p.uid) : [...items, { ...p }]);
  };
  const back = () => {
    if (page === 'list') {
      if ((version === 'v4.0' || version === 'v5.0') && selected.length) onConfirm(selected);
      else onBack();
    }
    else if (version === 'v4.0' || version === 'v5.0') {
      if (draft.catId && (!saveFavorite || draft.name?.trim())) complete();
      else { const input = content.current?.querySelector<HTMLInputElement>('input:invalid, #passenger-age'); input?.focus(); input?.reportValidity(); }
    }
    else setPage('list');
  };
  const complete = () => {
    if (!draft.catId || (saveFavorite && !draft.name?.trim())) return;
    const passenger = { ...draft, name: draft.name?.trim() || undefined };
    const upsert = (items: Passenger[]) => items.some(p => p.uid === passenger.uid)
      ? items.map(p => p.uid === passenger.uid ? passenger : p)
      : [...items, passenger];
    setSelected(items => version === 'v5.0' && editing ? items.map(p => p.uid === passenger.uid ? passenger : p) : upsert(items));
    onSaveAvailablePassengers(upsert(availablePassengers));
    if (saveFavorite) onSaveFavorites(upsert(favorites));
    else if (version === 'v5.0') onSaveFavorites(favorites.filter(p => p.uid !== passenger.uid));
    setQuickAddOpen(false);
    setPage('list');
  };
  latestBack.current = back;
  useEffect(() => {
    if (version !== 'v5.0' || page === 'list') return;
    const marker = crypto.randomUUID();
    const push = () => history.pushState({ ...history.state, passengerForm: marker }, '');
    push();
    const handlePop = () => {
      const modal = document.querySelector<HTMLDialogElement>('.flow-v5-dialog[open]');
      if (modal) { push(); modal.dispatchEvent(new Event('cancel', { cancelable: true })); return; }
      if (cancelBack.current) { cancelBack.current = false; setPage('list'); return; }
      const invalid = content.current?.querySelector<HTMLInputElement>('input[required]:invalid');
      if (invalid) { push(); invalid.focus(); invalid.reportValidity(); return; }
      latestBack.current();
    };
    window.addEventListener('popstate', handlePop);
    return () => {
      window.removeEventListener('popstate', handlePop);
      if (history.state?.passengerForm === marker) history.back();
    };
  }, [page, version]);
  const navigateBack = () => {
    if (version === 'v5.0' && page !== 'list') history.back();
    else latestBack.current();
  };
  useEffect(() => {
    window.addEventListener('passenger-back', navigateBack);
    return () => window.removeEventListener('passenger-back', navigateBack);
  });
  const cancelForm = () => {
    if (version === 'v5.0' && page !== 'list') { cancelBack.current = true; history.back(); }
    else setPage('list');
  };
  const categoryOption = (c: typeof categories[number]) => <button key={c.id} aria-pressed={draft.catId === c.id} className={`flow-option ${draft.catId === c.id ? 'selected' : ''}`} onClick={() => setDraft({ ...draft, catId: c.id })}>
    <span className="flow-avatar" style={{ color: c.color }}>●</span><span><strong>{c.label}</strong></span><span className="flow-radio">{draft.catId === c.id ? '●' : '○'}</span>
  </button>;
  const passOption = (p: typeof passes[number]) => <label key={p.id} className={`flow-option ${draft.passIds.includes(p.id) ? 'selected' : ''}`}>
    <input type="checkbox" checked={draft.passIds.includes(p.id)} onChange={() => togglePass(p.id)} />
    <span><strong>{p.label}</strong><small>{p.sub}</small></span>
  </label>;
  const otherPassengers = availablePassengers.filter(p => p.uid !== 'adult-default' && !favorites.some(f => f.uid === p.uid));
  const v2Rows = [
    { passenger: availablePassengers.find(p => p.uid === 'adult-default') || initialPassengers[0], label: 'Já', favorite: favorites.some(p => p.uid === 'adult-default') },
    ...otherPassengers.filter(p => selected.some(item => item.uid === p.uid)).map(passenger => ({ passenger, label: passengerLabel(passenger), favorite: false })),
    ...favorites.filter(p => p.uid !== 'adult-default').map(passenger => ({ passenger, label: passengerLabel(passenger), favorite: true })),
    ...otherPassengers.filter(p => !selected.some(item => item.uid === p.uid)).map(passenger => ({ passenger, label: passengerLabel(passenger), favorite: false })),
  ];
  return (
    <section className="passenger-flow">
      <div className="flow-version-switch" role="group" aria-label="Verze návrhu">
        <span>Verze návrhu</span>
        <button className={version === 'v1.0' ? 'selected' : ''} aria-pressed={version === 'v1.0'} onClick={() => onVersionChange('v1.0')}>V1.0</button>
        <button className={version === 'v2.0' ? 'selected' : ''} aria-pressed={version === 'v2.0'} onClick={() => onVersionChange('v2.0')}>V2.0</button>
        <button className={version === 'v3.0' ? 'selected' : ''} aria-pressed={version === 'v3.0'} onClick={() => onVersionChange('v3.0')}>V3.0</button>
        <button className={version === 'v4.0' ? 'selected' : ''} aria-pressed={version === 'v4.0'} onClick={() => onVersionChange('v4.0')}>V4.0</button>
        <button className={version === 'v5.0' ? 'selected' : ''} aria-pressed={version === 'v5.0'} onClick={() => onVersionChange('v5.0')}>V5.0</button>
      </div>
      <header className="flow-header">
        <button aria-label="Zpět" onClick={navigateBack}>←</button>
        <h1 ref={heading} tabIndex={-1}>{page === 'favorite' ? 'Uložit do oblíbených' : 'Cestující'}</h1>
        {page !== 'list' && <button className="flow-cancel" onClick={cancelForm}>Zrušit</button>}
      </header>
      <div ref={content} className="flow-content">
        {page === 'list' && (version === 'v2.0' || version === 'v3.0' || version === 'v4.0' || version === 'v5.0') ? <>
          {requireNames && selected.some(p => !hasPassengerName(p)) && <p className="flow-required-notice">Dopravce vyžaduje jméno a příjmení všech cestujících.</p>}
          <div className="flow-v2-list">
            {v2Rows.map(({ passenger, label, favorite }) => {
              const active = selected.some(item => item.uid === passenger.uid);
              return <div className={`flow-v2-person ${active ? 'selected' : ''}`} key={passenger.uid}>
                <button className="flow-star flow-v2-star" aria-pressed={favorite}
                  aria-label={`${favorite ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}: ${label}`}
                  onClick={() => toggleFavorite(passenger)}>
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z" /></svg>
                </button>
                <span className="flow-v2-avatar" aria-hidden="true" />
                {version === 'v5.0' ? <button className="flow-v2-info flow-edit-person" aria-label={`Upravit ${label}`} onClick={() => start(passenger, favorite)}><strong>{label}</strong><small>{categories.find(c => c.id === passenger.catId)?.label} · {passLabels(passenger)}</small></button> : <span className="flow-v2-info"><strong>{label}</strong><small>{categories.find(c => c.id === passenger.catId)?.label} · {passLabels(passenger)}</small></span>}
                {version === 'v5.0' ? <label className="flow-select-person"><input type="checkbox" checked={active} aria-label={`Cestuje ${label}`} onChange={() => toggleSelected(passenger)} /></label> : <button className="flow-switch" role="switch" aria-checked={active} aria-label={`${active ? 'Odebrat' : 'Vybrat'} ${label}`} onClick={() => toggleSelected(passenger)}><span /></button>}
                {requireNames && active && <div className="flow-quick-names flow-fields">
                  <label>Jméno <span>*</span><input required autoComplete="given-name" aria-label={`Jméno: ${label}`} value={passenger.firstName || ''} onChange={e => updateName(passenger, 'firstName', e.target.value)} /></label>
                  <label>Příjmení <span>*</span><input required autoComplete="family-name" aria-label={`Příjmení: ${label}`} value={passenger.lastName || ''} onChange={e => updateName(passenger, 'lastName', e.target.value)} /></label>
                </div>}
              </div>;
            })}
          </div>
          <button className="flow-add flow-v2-add" onClick={() => version === 'v3.0' ? startQuickAdd() : start()}><span>＋</span> Přidat dalšího cestujícího</button>
        </> : page === 'list' ? <>
          {!selected.length && <p className="flow-empty">Zatím není nikdo vybraný. Přidejte alespoň jednoho cestujícího.</p>}
          <div className="flow-cards">{selected.map(p => <div className="flow-person" key={p.uid}>
            <span className="flow-avatar" style={{ color: categories.find(c => c.id === p.catId)?.color }}>●</span>
            <button className="flow-person-info" aria-label={`Upravit ${passengerLabel(p)}`} onClick={() => start(p)}>
              <strong>{passengerLabel(p)}</strong><small>{p.name && `${categories.find(c => c.id === p.catId)?.label} · `}{passLabels(p)}</small>
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
          {page === 'favorite' && <p className="flow-eyebrow">Oblíbený cestující</p>}
          {page === 'favorite' && <><h2>Jak cestujícího pojmenujete?</h2><p className="flow-hint">Doplňte přezdívku, podle které ho příště poznáte.</p></>}
          {page === 'category' && version === 'v5.0' ? <PassengerFormV5 draft={draft} setDraft={setDraft} saveFavorite={saveFavorite} setSaveFavorite={setSaveFavorite} editing={editing} /> : page === 'category' && version === 'v4.0' ? <>
            <div className="flow-options" role="group" aria-label="Kategorie cestujícího">
              <button className={`flow-option ${!enterAge ? 'selected' : ''}`} aria-pressed={!enterAge} onClick={() => { setEnterAge(false); setDraft({ ...draft, catId: 'adult', age: undefined }); }}><span><strong>Dospělý</strong><small>26–59 let · bez zadávání věku</small></span><span className="flow-radio" aria-hidden="true">{!enterAge ? '●' : '○'}</span></button>
              <button className={`flow-option ${enterAge ? 'selected' : ''}`} aria-pressed={enterAge} onClick={() => { if (!enterAge) { setEnterAge(true); setDraft({ ...draft, catId: '', age: undefined }); } }}><span><strong>Věková kategorie</strong><small>Vybrat podle věku</small></span><span className="flow-radio" aria-hidden="true">{enterAge ? '●' : '○'}</span></button>
            </div>
            {enterAge && <div className="flow-age-field" style={{ marginTop: 12 }}>
              <label htmlFor="passenger-age">Věk v den cesty</label>
              <div className="flow-age-input"><input id="passenger-age" type="number" inputMode="numeric" min="0" max="120" step="1" placeholder="Např. 12" value={draft.age ?? ''} onChange={event => {
                const value = event.target.value;
                if (!value) { setDraft({ ...draft, age: undefined, catId: '' }); return; }
                const parsed = Number(value);
                if (!Number.isFinite(parsed)) { setDraft({ ...draft, age: undefined, catId: '' }); return; }
                const valid = Number.isInteger(parsed) && parsed >= 0 && parsed <= 120;
                setDraft({ ...draft, age: parsed, catId: valid ? categoryForAge(parsed) : '' });
              }} /><span>let</span></div>
              {draft.age !== undefined && !draft.catId && <p className="flow-hint" role="alert" style={{ marginTop: 10, marginBottom: 0 }}>Zadejte celý věk od 0 do 120 let.</p>}
              {cat && <div className="flow-age-result"><span className="flow-avatar" style={{ color: cat.color }}>●</span><div><small>Kategorie cestujícího</small><strong>{cat.label}</strong></div></div>}
            </div>}
            <details className="flow-disclosure flow-pass-checklist">
              <summary><span><strong>Slevové průkazy</strong><small>{passLabels(draft)}</small></span><span className="flow-pass-chevron" aria-hidden="true">⌄</span></summary>
              <div className="flow-options">{passOption(passes[0])}</div>
              {passSections.map(section => <section className="flow-pass-section" key={section.label} aria-label={section.label}>
                <h3>{section.label}</h3>
                <div className="flow-options">{passes.filter(pass => section.ids.includes(pass.id)).map(passOption)}</div>
              </section>)}
            </details>
            <label className="flow-save"><input type="checkbox" checked={saveFavorite} onChange={e => setSaveFavorite(e.target.checked)} /><span><strong>Uložit do oblíbených</strong><small>Příště cestujícího vyberete jedním klepnutím.</small></span></label>
            {saveFavorite && <div className="flow-fields">
              <label>Přezdívka <span>*</span><input value={draft.name || ''} onChange={e => setDraft({ ...draft, name: e.target.value })} required /></label>
              <label>Jméno <small>volitelné</small><input autoComplete="given-name" value={draft.firstName || ''} onChange={e => setDraft({ ...draft, firstName: e.target.value })} /></label>
              <label>Příjmení <small>volitelné</small><input autoComplete="family-name" value={draft.lastName || ''} onChange={e => setDraft({ ...draft, lastName: e.target.value })} /></label>
              {!draft.passIds.includes('none') && <label>Číslo průkazu <small>volitelné</small><input value={draft.passNumber || ''} onChange={e => setDraft({ ...draft, passNumber: e.target.value })} /></label>}
            </div>}
          </> : page === 'category' && <>
            <div className="flow-disclosures" role="group" aria-label="Kategorie cestujícího">{categoryGroups.map(group => group.items.length === 1 ? <div key={group.id} className="flow-disclosure flow-single-category">
              <div className="flow-category-label">{group.label}</div>
              <div className="flow-options">{group.items.map(categoryOption)}</div>
            </div> : <details key={group.id} className="flow-disclosure">
              <summary><strong>{group.label}</strong><span aria-hidden="true">⌄</span></summary>
              <div className="flow-options">{group.items.map(categoryOption)}</div>
            </details>)}</div>
            <details className="flow-disclosure flow-pass-checklist">
              <summary><span><strong>Slevové průkazy</strong><small>{passLabels(draft)}</small></span><span className="flow-pass-chevron" aria-hidden="true">⌄</span></summary>
              <div className="flow-options">{passOption(passes[0])}</div>
              {passSections.map(section => <section className="flow-pass-section" key={section.label} aria-label={section.label}>
                <h3>{section.label}</h3>
                <div className="flow-options">{passes.filter(pass => section.ids.includes(pass.id)).map(passOption)}</div>
              </section>)}
            </details>
            <label className="flow-save"><input type="checkbox" checked={saveFavorite} onChange={e => setSaveFavorite(e.target.checked)} /><span><strong>Uložit do oblíbených</strong><small>Příště cestujícího vyberete jedním klepnutím.</small></span></label>
            {saveFavorite && <div className="flow-fields">
              <label>Přezdívka <span>*</span><input value={draft.name || ''} onChange={e => setDraft({ ...draft, name: e.target.value })} required /></label>
              <label>Jméno <small>volitelné</small><input autoComplete="given-name" value={draft.firstName || ''} onChange={e => setDraft({ ...draft, firstName: e.target.value })} /></label>
              <label>Příjmení <small>volitelné</small><input autoComplete="family-name" value={draft.lastName || ''} onChange={e => setDraft({ ...draft, lastName: e.target.value })} /></label>
              {!draft.passIds.includes('none') && <label>Číslo průkazu <small>volitelné</small><input value={draft.passNumber || ''} onChange={e => setDraft({ ...draft, passNumber: e.target.value })} /></label>}
            </div>}
          </>}
          {page === 'favorite' && <>
            <div className="flow-review"><span className="flow-avatar" style={{ color: cat?.color }}>●</span><h3>{cat?.label}</h3><p>{passLabels(draft)}</p></div>
            {saveFavorite && <div className="flow-fields">
              <label>Přezdívka <span>*</span><input value={draft.name || ''} onChange={e => setDraft({ ...draft, name: e.target.value })} required /></label>
              <label>Jméno <small>volitelné</small><input autoComplete="given-name" value={draft.firstName || ''} onChange={e => setDraft({ ...draft, firstName: e.target.value })} /></label>
              <label>Příjmení <small>volitelné</small><input autoComplete="family-name" value={draft.lastName || ''} onChange={e => setDraft({ ...draft, lastName: e.target.value })} /></label>
              {!draft.passIds.includes('none') && <label>Číslo průkazu <small>volitelné</small><input value={draft.passNumber || ''} onChange={e => setDraft({ ...draft, passNumber: e.target.value })} /></label>}
              <p className="flow-hint">* Pro uložení do oblíbených vyplňte přezdívku. Jméno a příjmení jsou volitelné.</p>
            </div>}
          </>}
        </>}
      </div>
      {(version !== 'v5.0' || page === 'list') && <footer className="flow-footer">
        {page === 'list' ? <button className="flow-primary" disabled={!selected.length} onClick={() => onConfirm(selected)}><span>Potvrdit výběr</span><span>{countLabel(selected.length)} →</span></button>
          : <button className="flow-primary" disabled={!draft.catId || (saveFavorite && !draft.name?.trim())} onClick={complete}><span>{page === 'favorite' ? 'Uložit do oblíbených' : editing ? 'Uložit změny' : 'Přidat cestujícího'}</span><span>✓</span></button>}
      </footer>}
      {version === 'v3.0' && quickAddOpen && <div className="flow-sheet-scrim" onClick={() => setQuickAddOpen(false)}>
        <section className="flow-sheet" role="dialog" aria-modal="true" aria-labelledby="quick-add-title" onClick={event => event.stopPropagation()}>
          <div className="flow-sheet-handle" aria-hidden="true" />
          <div className="flow-sheet-header"><h2 id="quick-add-title">Přidat cestujícího</h2><button aria-label="Zavřít" onClick={() => setQuickAddOpen(false)}>×</button></div>
          <div className="flow-sheet-pickers">
            <div className="flow-sheet-picker"><h3>Typ cestujícího</h3><div className="flow-picker-list" role="radiogroup" aria-label="Typ cestujícího">{categories.map(category => <button key={category.id} role="radio" aria-checked={draft.catId === category.id} className={draft.catId === category.id ? 'selected' : ''} onClick={() => setDraft({ ...draft, catId: category.id })}><span>{category.label}</span><b aria-hidden="true">{draft.catId === category.id ? '●' : '○'}</b></button>)}</div></div>
            <div className="flow-sheet-picker"><h3>Slevy a průkazy</h3><div className="flow-picker-list" aria-label="Slevy a průkazy">{passes.map(pass => <label key={pass.id} className={draft.passIds.includes(pass.id) ? 'selected' : ''}><input type="checkbox" checked={draft.passIds.includes(pass.id)} onChange={() => togglePass(pass.id)} /><span>{pass.label}</span></label>)}</div></div>
          </div>
          <div className="flow-sheet-favorite">
            <label className="flow-save"><input type="checkbox" checked={saveFavorite} onChange={event => setSaveFavorite(event.target.checked)} /><span><strong>Uložit do oblíbených</strong><small>Příště bude cestující v seznamu.</small></span></label>
            {saveFavorite && <div className="flow-fields"><label>Přezdívka <span>*</span><input value={draft.name || ''} onChange={event => setDraft({ ...draft, name: event.target.value })} required /></label></div>}
          </div>
          <div className="flow-sheet-actions"><button onClick={() => setQuickAddOpen(false)}>Zrušit</button><button className="flow-primary" disabled={!draft.catId || (saveFavorite && !draft.name?.trim())} onClick={complete}>Přidat</button></div>
        </section>
      </div>}
    </section>
  );
}

function PassengerFormV5({ draft, setDraft, saveFavorite, setSaveFavorite, editing }: {
  draft: Passenger; setDraft: (p: Passenger) => void;
  saveFavorite: boolean; setSaveFavorite: (value: boolean) => void; editing: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [picker, setPicker] = useState<'category' | 'passes' | null>(null);
  const [pendingCategory, setPendingCategory] = useState(draft.catId);
  const [pendingPasses, setPendingPasses] = useState(draft.passIds);
  useEffect(() => {
    if (picker) {
      dialog.current?.showModal();
      dialog.current?.querySelector<HTMLElement>('[aria-checked="true"], input:checked')?.scrollIntoView({ block: 'center' });
    }
  }, [picker]);
  const openPicker = (kind: 'category' | 'passes') => {
    setPendingCategory(draft.catId); setPendingPasses([...draft.passIds]); setPicker(kind);
  };
  const closePicker = () => { dialog.current?.close(); setPicker(null); };
  const confirm = () => {
    setDraft(picker === 'category' ? { ...draft, catId: pendingCategory, age: pendingCategory === draft.catId ? draft.age : undefined } : { ...draft, passIds: pendingPasses });
    closePicker();
  };
  const passRow = (pass: typeof passes[number]) => <label key={pass.id} className="flow-v5-picker-row">
    <input type="checkbox" checked={pendingPasses.includes(pass.id)} onChange={() => setPendingPasses(current => {
      if (pass.id === 'none') return ['none'];
      const next = current.includes(pass.id) ? current.filter(id => id !== pass.id) : [...current.filter(id => id !== 'none'), pass.id];
      return next.length ? next : ['none'];
    })} /><span>{pass.label}</span>
  </label>;
  return <>
    {editing && <p className="flow-eyebrow">{saveFavorite ? 'Úprava · oblíbený cestující' : 'Úprava cestujícího'}</p>}
    <div className="flow-v5-label">Vybraná kategorie</div>
    <button className="flow-v5-selector" aria-haspopup="dialog" onClick={() => openPicker('category')}><strong>{categories.find(c => c.id === draft.catId)?.label}</strong><span aria-hidden="true">⌄</span></button>
    <details className="flow-disclosure flow-v5-extra">
      <summary><span className="flow-extra-arrow" aria-hidden="true" /><span>Doplňující údaje</span></summary>
      <div className="flow-fields">
        <label>Jméno <small>volitelné</small><input autoComplete="given-name" value={draft.firstName || ''} onChange={e => setDraft({ ...draft, firstName: e.target.value })} /></label>
        <label>Příjmení <small>volitelné</small><input autoComplete="family-name" value={draft.lastName || ''} onChange={e => setDraft({ ...draft, lastName: e.target.value })} /></label>
        <label>Datum narození <small>volitelné</small><input type="date" autoComplete="bday" value={draft.birthDate || ''} onChange={e => setDraft({ ...draft, birthDate: e.target.value })} /></label>
        <label>Číslo průkazu <small>volitelné</small><input value={draft.passNumber || ''} onChange={e => setDraft({ ...draft, passNumber: e.target.value })} /></label>
      </div>
    </details>
    <button className="flow-v5-selector flow-v5-passes" aria-haspopup="dialog" onClick={() => openPicker('passes')}><span><strong>Slevové průkazy</strong><small>{passLabels(draft)}</small></span><span aria-hidden="true">⌄</span></button>
    <label className="flow-save"><input type="checkbox" checked={saveFavorite} onChange={e => setSaveFavorite(e.target.checked)} /><span><strong>Uložit do oblíbených</strong></span></label>
    {saveFavorite && <div className="flow-fields"><label>Přezdívka <span>*</span><input required value={draft.name || ''} onChange={e => setDraft({ ...draft, name: e.target.value })} /></label></div>}
    {picker && <dialog className="flow-v5-dialog" ref={dialog} aria-labelledby="flow-v5-picker-title" onCancel={event => { event.preventDefault(); closePicker(); }}>
      <h2 id="flow-v5-picker-title">{picker === 'category' ? 'Vyberte kategorii' : 'Slevové průkazy'}</h2>
      <div className="flow-v5-picker-content">
        {picker === 'category' ? categoryGroups.map((group, index) => <section key={group.id} aria-label={['Děti', 'Mladiství', 'Dospělí', 'Senioři'][index]}>
          <h3>{['Děti', 'Mladiství', 'Dospělí', 'Senioři'][index]}</h3>
          {group.items.map(category => <label className="flow-v5-picker-row" key={category.id}><input type="radio" name="v5-category" checked={pendingCategory === category.id} onChange={() => setPendingCategory(category.id)} /><span>{category.label}</span></label>)}
        </section>) : <>{passRow(passes[0])}{passSections.map(section => <section key={section.label} aria-label={section.label}><h3>{section.label}</h3>{passes.filter(pass => section.ids.includes(pass.id)).map(passRow)}</section>)}</>}
      </div>
      <footer><button onClick={closePicker}>Zrušit</button><button className="flow-v5-confirm" onClick={confirm}>Potvrdit</button></footer>
    </dialog>}
  </>;
}
