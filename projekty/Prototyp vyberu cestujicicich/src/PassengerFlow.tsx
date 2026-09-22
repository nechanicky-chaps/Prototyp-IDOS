import { useEffect, useRef, useState } from 'react';

export type Passenger = { uid: string; catId: string; passIds: string[]; age?: number; name?: string; firstName?: string; lastName?: string; passNumber?: string; birthDate?: string };
export const MAX_FAVORITE_PASSENGERS = 6;
export const MAX_LOCAL_PASSENGERS = 6;
export const MAX_SELECTED_PASSENGERS = 6;
const LOCAL_PASSENGERS_KEY = 'idos-prototype-local-passengers-v1';
const FAVORITE_PASSENGERS_KEY = 'idos-prototype-favorite-passengers-v1';
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
export const SELF_PASSENGER_UID = 'adult-default';
export const defaultPassenger: Passenger = {
  uid: SELF_PASSENGER_UID,
  catId: 'adult',
  passIds: ['none'],
  name: 'Já',
  firstName: 'Přihlášený',
  lastName: 'Cestující',
};
export const initialPassengers: Passenger[] = [defaultPassenger];
export const initialFavorites: Passenger[] = [
  defaultPassenger,
  { uid: 'fav1', catId: 'adult', passIds: ['none'], age: 35, name: 'Tom' },
  { uid: 'fav2', catId: 'senior60', passIds: ['inkarta'], age: 60, name: 'Jana' },
];
const readPassengers = (key: string) => {
  if (typeof window === 'undefined') return null;
  try {
    const value = JSON.parse(localStorage.getItem(key) || 'null');
    return Array.isArray(value) ? value as Passenger[] : null;
  } catch {
    return null;
  }
};
export const loadPassengerMemory = (selfPassenger: Passenger = defaultPassenger) => {
  const storedFavorites = readPassengers(FAVORITE_PASSENGERS_KEY) ?? initialFavorites.filter(item => item.uid !== SELF_PASSENGER_UID);
  const storedLocal = readPassengers(LOCAL_PASSENGERS_KEY) ?? [];
  const favorites = [selfPassenger, ...storedFavorites.filter(item => item.uid !== SELF_PASSENGER_UID)].slice(0, MAX_FAVORITE_PASSENGERS);
  const favoriteIds = new Set(favorites.map(item => item.uid));
  const local = storedLocal.filter(item => item.uid !== SELF_PASSENGER_UID && !favoriteIds.has(item.uid)).slice(0, MAX_LOCAL_PASSENGERS);
  return { favorites, availablePassengers: [...favorites, ...local] };
};
export const savePassengerMemory = (availablePassengers: Passenger[], favorites: Passenger[]) => {
  if (typeof window === 'undefined') return;
  const favoriteIds = new Set(favorites.map(item => item.uid));
  const storedFavorites = favorites.filter(item => item.uid !== SELF_PASSENGER_UID).slice(0, MAX_FAVORITE_PASSENGERS - 1);
  const storedLocal = availablePassengers
    .filter(item => item.uid !== SELF_PASSENGER_UID && !favoriteIds.has(item.uid))
    .slice(0, MAX_LOCAL_PASSENGERS);
  try {
    localStorage.setItem(FAVORITE_PASSENGERS_KEY, JSON.stringify(storedFavorites));
    localStorage.setItem(LOCAL_PASSENGERS_KEY, JSON.stringify(storedLocal));
  } catch {
    // Úložiště může být v anonymním režimu prohlížeče nedostupné.
  }
};
export const passengerLabel = (p: Passenger) => p.name || categories.find(c => c.id === p.catId)?.label || 'Cestující';
export const passengerFullName = (p: Passenger) => [p.firstName, p.lastName].filter(Boolean).join(' ').trim();
export const passLabels = (p: Passenger) => p.passIds.map(id => passes.find(pass => pass.id === id)?.label).filter(Boolean).join(', ');
export const hasPassengerName = (p: Passenger) => !!p.firstName?.trim() && !!p.lastName?.trim();
export type RequiredNameMode = 'none' | 'holder' | 'all';
export const passengersMissingRequiredNames = (passengers: Passenger[], mode: RequiredNameMode) => {
  if (mode === 'none') return false;
  const required = mode === 'holder' ? passengers.slice(0, 1) : passengers;
  return required.some(passenger => !hasPassengerName(passenger));
};
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
export default function PassengerFlow({ passengers, availablePassengers, favorites, selfPassenger = initialPassengers[0], version, requireNames = false, requiredNameMode, selectionControl = 'checkbox', moveSelectedToTop = true, showConfirmButton = true, showFormSaveButton = false, onVersionChange, onSaveAvailablePassengers, onSaveFavorites, onBack, onConfirm }: {
  passengers: Passenger[]; availablePassengers: Passenger[]; favorites: Passenger[];
  selfPassenger?: Passenger;
  onSaveAvailablePassengers: (p: Passenger[]) => void; onSaveFavorites: (p: Passenger[]) => void;
  requireNames?: boolean; requiredNameMode?: RequiredNameMode; selectionControl?: 'checkbox' | 'switch'; moveSelectedToTop?: boolean; showConfirmButton?: boolean; showFormSaveButton?: boolean;
  version: DesignVersion; onVersionChange: (version: DesignVersion) => void;
  onBack: () => void; onConfirm: (p: Passenger[]) => void;
}) {
  const [selected, setSelected] = useState(passengers);
  const [page, setPage] = useState<Page>('list');
  const [draft, setDraft] = useState<Passenger>({ uid: '', catId: '', passIds: ['none'] });
  const [saveFavorite, setSaveFavorite] = useState(false);
  const [editing, setEditing] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [enterAge, setEnterAge] = useState(false);
  const [selectionError, setSelectionError] = useState('');
  const [formError, setFormError] = useState('');
  const [favoriteRemoval, setFavoriteRemoval] = useState<{ passenger: Passenger; fromEditor: boolean } | null>(null);
  const [passengerDeletion, setPassengerDeletion] = useState<Passenger | null>(null);
  const cancelBack = useRef(false);
  const latestBack = useRef<() => void>(() => {});
  const heading = useRef<HTMLHeadingElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const effectiveNameMode: RequiredNameMode = requiredNameMode ?? (requireNames ? 'all' : 'none');
  const needsName = (passenger: Passenger) => effectiveNameMode === 'all' || (effectiveNameMode === 'holder' && selected[0]?.uid === passenger.uid);
  const draftNeedsName = effectiveNameMode === 'all' || (effectiveNameMode === 'holder' && (!selected.length || selected[0]?.uid === draft.uid));
  const favoriteIds = new Set(favorites.map(item => item.uid));
  const localPassengers = availablePassengers.filter(item => item.uid !== SELF_PASSENGER_UID && !favoriteIds.has(item.uid));
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
    setFormError('');
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
    if (p.uid === SELF_PASSENGER_UID) return;
    if (favorites.some(f => f.uid === p.uid)) {
      setFavoriteRemoval({ passenger: p, fromEditor: false });
      return;
    }
    if (favorites.length >= MAX_FAVORITE_PASSENGERS) {
      setSelectionError(`Můžete mít nejvýše ${MAX_FAVORITE_PASSENGERS} oblíbených cestujících.`);
      return;
    }
    setDraft({ ...p });
    setEditing(true);
    setSaveFavorite(true);
    setPage(version === 'v5.0' ? 'category' : 'favorite');
  };
  const requestFavoriteState = (value: boolean) => {
    if (!value && draft.uid !== SELF_PASSENGER_UID && favorites.some(item => item.uid === draft.uid)) {
      setFavoriteRemoval({ passenger: draft, fromEditor: true });
      return;
    }
    if (value && !favorites.some(item => item.uid === draft.uid) && favorites.length >= MAX_FAVORITE_PASSENGERS) {
      setFormError(`Můžete mít nejvýše ${MAX_FAVORITE_PASSENGERS} oblíbených cestujících.`);
      return;
    }
    setFormError('');
    setSaveFavorite(draft.uid === SELF_PASSENGER_UID || value);
  };
  const confirmFavoriteRemoval = () => {
    if (!favoriteRemoval) return;
    const { passenger, fromEditor } = favoriteRemoval;
    if (fromEditor) setSaveFavorite(false);
    else {
      if (localPassengers.length >= MAX_LOCAL_PASSENGERS) {
        setSelectionError(`Nejprve smažte některého z ${MAX_LOCAL_PASSENGERS} neoblíbených cestujících.`);
        setFavoriteRemoval(null);
        return;
      }
      if (!availablePassengers.some(item => item.uid === passenger.uid)) onSaveAvailablePassengers([...availablePassengers, passenger]);
      onSaveFavorites(favorites.filter(item => item.uid !== passenger.uid));
    }
    setFavoriteRemoval(null);
  };
  const updateName = (p: Passenger, field: 'firstName' | 'lastName', value: string) => {
    const updated = { ...p, [field]: value };
    setSelected(items => items.map(item => item.uid === p.uid ? updated : item));
    onSaveAvailablePassengers(availablePassengers.some(item => item.uid === p.uid) ? availablePassengers.map(item => item.uid === p.uid ? updated : item) : [...availablePassengers, updated]);
    if (favorites.some(item => item.uid === p.uid)) onSaveFavorites(favorites.map(item => item.uid === p.uid ? updated : item));
  };
  const toggleSelected = (p: Passenger) => {
    const active = selected.some(item => item.uid === p.uid);
    setSelectionError('');
    if (!active && selected.length >= MAX_SELECTED_PASSENGERS) {
      setSelectionError(`Pro jednu cestu můžete vybrat nejvýše ${MAX_SELECTED_PASSENGERS} cestujících.`);
      return;
    }
    setSelected(items => active ? items.filter(item => item.uid !== p.uid) : [...items, { ...p }]);
  };
  const saveSelection = () => {
    if (!selected.length) {
      setSelectionError('Vyberte alespoň jednoho cestujícího.');
      content.current?.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const missingName = selected.find(passenger => needsName(passenger) && !hasPassengerName(passenger));
    if (missingName) {
      setSelectionError(`Doplňte jméno a příjmení pro cestujícího ${passengerLabel(missingName)}.`);
      requestAnimationFrame(() => {
        const input = content.current?.querySelector<HTMLInputElement>('input[required]:invalid');
        input?.focus();
        input?.reportValidity();
      });
      return;
    }
    onConfirm(selected);
  };
  const back = () => {
    if (page === 'list') {
      if (version === 'v4.0' || version === 'v5.0') saveSelection();
      else onBack();
    }
    else if (version === 'v4.0' || version === 'v5.0') {
      if (draft.catId && (!saveFavorite || draft.name?.trim()) && (!draftNeedsName || hasPassengerName(draft))) {
        complete();
      } else {
        const details = content.current?.querySelectorAll<HTMLDetailsElement>('details');
        details?.forEach(d => { d.open = true; });
        const input = content.current?.querySelector<HTMLInputElement>('input:invalid, #passenger-age');
        input?.focus();
        input?.reportValidity();
      }
    }
    else setPage('list');
  };
  const complete = () => {
    if (!draft.catId || (saveFavorite && !draft.name?.trim()) || (draftNeedsName && !hasPassengerName(draft))) return;
    const passenger = { ...draft, name: draft.name?.trim() || undefined };
    const wasFavorite = favorites.some(item => item.uid === passenger.uid);
    const wasAvailable = availablePassengers.some(item => item.uid === passenger.uid);
    if (!editing && !selected.some(item => item.uid === passenger.uid) && selected.length >= MAX_SELECTED_PASSENGERS) {
      setFormError(`Pro jednu cestu můžete vybrat nejvýše ${MAX_SELECTED_PASSENGERS} cestujících.`);
      return;
    }
    if (saveFavorite && !wasFavorite && favorites.length >= MAX_FAVORITE_PASSENGERS) {
      setFormError(`Můžete mít nejvýše ${MAX_FAVORITE_PASSENGERS} oblíbených cestujících.`);
      return;
    }
    if (!saveFavorite && !wasAvailable && localPassengers.length >= MAX_LOCAL_PASSENGERS) {
      setFormError(`Můžete mít nejvýše ${MAX_LOCAL_PASSENGERS} neoblíbených cestujících.`);
      return;
    }
    if (!saveFavorite && wasFavorite && localPassengers.length >= MAX_LOCAL_PASSENGERS) {
      setFormError(`Nejprve smažte některého z ${MAX_LOCAL_PASSENGERS} neoblíbených cestujících.`);
      return;
    }
    const upsert = (items: Passenger[]) => items.some(p => p.uid === passenger.uid)
      ? items.map(p => p.uid === passenger.uid ? passenger : p)
      : [...items, passenger];
    setSelected(items => version === 'v5.0' && editing ? items.map(p => p.uid === passenger.uid ? passenger : p) : upsert(items));
    setSelectionError('');
    onSaveAvailablePassengers(upsert(availablePassengers));
    if (saveFavorite || passenger.uid === SELF_PASSENGER_UID) onSaveFavorites(upsert(favorites));
    else if (version === 'v5.0') onSaveFavorites(favorites.filter(p => p.uid !== passenger.uid));
    setQuickAddOpen(false);
    setPage('list');
  };
  const confirmPassengerDeletion = () => {
    if (!passengerDeletion || passengerDeletion.uid === SELF_PASSENGER_UID) return;
    const uid = passengerDeletion.uid;
    setSelected(items => items.filter(item => item.uid !== uid));
    onSaveAvailablePassengers(availablePassengers.filter(item => item.uid !== uid));
    onSaveFavorites(favorites.filter(item => item.uid !== uid));
    setPassengerDeletion(null);
    setPage('list');
  };
  latestBack.current = back;
  const navigateBack = () => {
    const modal = document.querySelector<HTMLDialogElement>('.flow-v5-dialog[open]');
    if (modal) {
      modal.dispatchEvent(new Event('cancel', { cancelable: true }));
      return;
    }
    back();
  };
  useEffect(() => {
    const handleBack = () => navigateBack();
    window.addEventListener('passenger-back', handleBack);
    return () => window.removeEventListener('passenger-back', handleBack);
  });
  const cancelForm = () => {
    setFormError('');
    setPage('list');
  };
  const categoryOption = (c: typeof categories[number]) => <button key={c.id} aria-pressed={draft.catId === c.id} className={`flow-option ${draft.catId === c.id ? 'selected' : ''}`} onClick={() => setDraft({ ...draft, catId: c.id })}>
    <span className="flow-avatar" style={{ color: c.color }}>●</span><span><strong>{c.label}</strong></span><span className="flow-radio">{draft.catId === c.id ? '●' : '○'}</span>
  </button>;
  const passOption = (p: typeof passes[number]) => <label key={p.id} className={`flow-option ${draft.passIds.includes(p.id) ? 'selected' : ''}`}>
    <input type="checkbox" checked={draft.passIds.includes(p.id)} onChange={() => togglePass(p.id)} />
    <span><strong>{p.label}</strong><small>{p.sub}</small></span>
  </label>;
  const otherPassengers = availablePassengers.filter(p => p.uid !== SELF_PASSENGER_UID && !favorites.some(f => f.uid === p.uid));
  const orderedRows = moveSelectedToTop ? [
    ...otherPassengers.filter(p => selected.some(item => item.uid === p.uid)).map(passenger => ({ passenger, label: passengerLabel(passenger), favorite: false })),
    ...favorites.filter(p => p.uid !== SELF_PASSENGER_UID).map(passenger => ({ passenger, label: passengerLabel(passenger), favorite: true })),
    ...otherPassengers.filter(p => !selected.some(item => item.uid === p.uid)).map(passenger => ({ passenger, label: passengerLabel(passenger), favorite: false })),
  ] : [
    ...favorites.filter(p => p.uid !== SELF_PASSENGER_UID).map(passenger => ({ passenger, label: passengerLabel(passenger), favorite: true })),
    ...otherPassengers.map(passenger => ({ passenger, label: passengerLabel(passenger), favorite: false })),
  ];
  const v2Rows = [
    { passenger: availablePassengers.find(p => p.uid === SELF_PASSENGER_UID) || favorites.find(p => p.uid === SELF_PASSENGER_UID) || selfPassenger, label: selfPassenger.name || categories.find(c => c.id === selfPassenger.catId)?.label || 'Cestující', favorite: true },
    ...orderedRows,
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
        {page === 'list' ? (
          <h1 ref={heading} tabIndex={-1} className="flow-header-title-count" aria-label={`Vybráno ${countLabel(selected.length)}`}>
            <strong>{selected.length}</strong>
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </h1>
        ) : (
          <h1 ref={heading} tabIndex={-1}>{page === 'favorite' ? 'Uložit do oblíbených' : editing ? (saveFavorite ? 'Úprava · oblíbený cestující' : 'Úprava cestujícího') : 'Přidat cestujícího'}</h1>
        )}
        <button className="flow-cancel" onClick={page === 'list' ? onBack : cancelForm}>Zrušit</button>
      </header>
      <div ref={content} className="flow-content">
        {page === 'list' && selectionError && <p className="flow-selection-error" role="alert">{selectionError}</p>}
        {page === 'list' && (version === 'v2.0' || version === 'v3.0' || version === 'v4.0' || version === 'v5.0') ? <>
          {passengersMissingRequiredNames(selected, effectiveNameMode) && <p className="flow-required-notice">Dopravce vyžaduje doplnit údaje</p>}
          <div className="flow-v2-list">
            {v2Rows.map(({ passenger, label, favorite }) => {
              const active = selected.some(item => item.uid === passenger.uid);
              return <div className={`flow-v2-person ${active ? 'selected' : ''}`} key={passenger.uid}>
                <button className="flow-star flow-v2-star" aria-pressed={favorite}
                  disabled={passenger.uid === SELF_PASSENGER_UID}
                  aria-label={passenger.uid === SELF_PASSENGER_UID ? (selfPassenger.name ? 'Já je vždy v oblíbených' : 'Výchozí cestující je vždy v oblíbených') : `${favorite ? 'Odebrat z oblíbených' : 'Přidat do oblíbených'}: ${label}`}
                  onClick={() => toggleFavorite(passenger)}>
                  <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z" /></svg>
                </button>
                <span className="flow-v2-avatar" aria-hidden="true" />
                {version === 'v5.0' ? <button className="flow-v2-info flow-edit-person" aria-label={`Upravit ${label}`} onClick={() => start(passenger, favorite)}><strong>{label}</strong><small><span>{passenger.name ? `${categories.find(c => c.id === passenger.catId)?.label} · ${passLabels(passenger)}` : passLabels(passenger)}</span>{hasPassengerName(passenger) && <span className="flow-passenger-name">{passengerFullName(passenger)}</span>}</small></button> : <span className="flow-v2-info"><strong>{label}</strong><small>{passenger.name ? `${categories.find(c => c.id === passenger.catId)?.label} · ${passLabels(passenger)}` : passLabels(passenger)}</small></span>}
                {version === 'v5.0' && selectionControl === 'checkbox' ? <label className="flow-select-person"><input type="checkbox" checked={active} aria-label={`Cestuje ${label}`} onChange={() => toggleSelected(passenger)} /></label> : <button className="flow-switch" role="switch" aria-checked={active} aria-label={`${active ? 'Odebrat' : 'Vybrat'} ${label}`} onClick={() => toggleSelected(passenger)}><span /></button>}
                {active && needsName(passenger) && !hasPassengerName(passenger) && <div className="flow-quick-names flow-fields">
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
              disabled={p.uid === SELF_PASSENGER_UID}
              aria-label={p.uid === SELF_PASSENGER_UID ? (selfPassenger.name ? 'Já je vždy v oblíbených' : 'Výchozí cestující je vždy v oblíbených') : (favorites.some(f => f.uid === p.uid) ? 'Odebrat z oblíbených: ' : 'Přidat do oblíbených: ') + passengerLabel(p)}
              onClick={() => toggleFavorite(p)}>
              <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill={favorites.some(f => f.uid === p.uid) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9Z" /></svg>
            </button>
            <button className="flow-remove" aria-label={`Odebrat ${passengerLabel(p)}`} onClick={() => toggleSelected(p)}>×</button>
          </div>)}</div>
          <button className="flow-add" onClick={() => start()}><span>＋</span> Přidat dalšího cestujícího</button>
          <div className="flow-section-title"><h3>Oblíbení cestující</h3><span>★</span></div>
          <div className="flow-favorites">{favorites.map(p => {
            const active = selected.some(s => s.uid === p.uid);
            return <button key={p.uid} aria-pressed={active} className={`flow-favorite ${active ? 'selected' : ''}`} onClick={() => toggleSelected(p)}>
              <span className="flow-avatar">{p.name?.slice(0, 1)}</span><strong>{passengerLabel(p)}</strong><small>{categories.find(c => c.id === p.catId)?.label}</small><span className="flow-favorite-status">{active ? '✓ Vybráno' : '+ Vybrat'}</span>
            </button>;
          })}</div>
          <button className="flow-text-button" onClick={() => start(undefined, true)}>＋ Přidat oblíbeného cestujícího</button>
        </> : <>
          {page === 'favorite' && <p className="flow-eyebrow">Oblíbený cestující</p>}
          {page === 'favorite' && <><h2>Jak cestujícího pojmenujete?</h2><p className="flow-hint">Doplňte přezdívku, podle které ho příště poznáte.</p></>}
          {page === 'category' && formError && <p className="flow-selection-error" role="alert">{formError}</p>}
          {page === 'category' && version === 'v5.0' ? <PassengerFormV5 draft={draft} setDraft={setDraft} saveFavorite={saveFavorite} setSaveFavorite={requestFavoriteState} editing={editing} favoriteLocked={draft.uid === SELF_PASSENGER_UID} nameRequired={draftNeedsName} onDelete={() => setPassengerDeletion(draft)} /> : page === 'category' && version === 'v4.0' ? <>
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
            <label className="flow-save"><input type="checkbox" checked={draft.uid === SELF_PASSENGER_UID || saveFavorite} disabled={draft.uid === SELF_PASSENGER_UID} onChange={e => requestFavoriteState(e.target.checked)} /><span><strong>Uložit do oblíbených</strong><small>Příště cestujícího vyberete jedním klepnutím.</small></span></label>
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
            <label className="flow-save"><input type="checkbox" checked={draft.uid === SELF_PASSENGER_UID || saveFavorite} disabled={draft.uid === SELF_PASSENGER_UID} onChange={e => requestFavoriteState(e.target.checked)} /><span><strong>Uložit do oblíbených</strong><small>Příště cestujícího vyberete jedním klepnutím.</small></span></label>
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
      {((page === 'list' && showConfirmButton) || (page !== 'list' && (version !== 'v5.0' || showFormSaveButton))) && <footer className="flow-footer">
        {page === 'list' ? <button className="flow-primary" onClick={saveSelection}><span>Potvrdit výběr</span><span>{countLabel(selected.length)} →</span></button>
          : <button className="flow-primary" disabled={!draft.catId || (saveFavorite && !draft.name?.trim()) || (draftNeedsName && !hasPassengerName(draft))} onClick={complete}><span>{page === 'favorite' ? 'Uložit do oblíbených' : editing ? 'Uložit změny' : 'Přidat cestujícího'}</span><span>✓</span></button>}
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
      {favoriteRemoval && <div className="flow-confirm-scrim" onClick={() => setFavoriteRemoval(null)}>
        <section className="flow-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="favorite-removal-title" onClick={event => event.stopPropagation()}>
          <h2 id="favorite-removal-title">Odebrat z oblíbených?</h2>
          <p>Opravdu chcete cestujícího <strong>{passengerLabel(favoriteRemoval.passenger)}</strong> odebrat z oblíbených?</p>
          <footer><button onClick={() => setFavoriteRemoval(null)}>Zrušit</button><button className="flow-confirm-remove" onClick={confirmFavoriteRemoval}>Odebrat</button></footer>
        </section>
      </div>}
      {passengerDeletion && <div className="flow-confirm-scrim" onClick={() => setPassengerDeletion(null)}>
        <section className="flow-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="passenger-deletion-title" onClick={event => event.stopPropagation()}>
          <h2 id="passenger-deletion-title">Smazat cestujícího?</h2>
          <p>Cestující <strong>{passengerLabel(passengerDeletion)}</strong> bude odstraněn ze zařízení i z tohoto výběru.</p>
          <footer><button onClick={() => setPassengerDeletion(null)}>Zrušit</button><button className="flow-confirm-remove" onClick={confirmPassengerDeletion}>Smazat</button></footer>
        </section>
      </div>}
    </section>
  );
}

function PassengerFormV5({ draft, setDraft, saveFavorite, setSaveFavorite, editing, favoriteLocked, nameRequired, onDelete }: {
  draft: Passenger; setDraft: (p: Passenger) => void;
  saveFavorite: boolean; setSaveFavorite: (value: boolean) => void; editing: boolean; favoriteLocked: boolean;
  nameRequired: boolean; onDelete: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [picker, setPicker] = useState<'category' | 'passes' | null>(null);
  const [pendingPasses, setPendingPasses] = useState(draft.passIds);
  useEffect(() => {
    if (picker) {
      dialog.current?.showModal();
      dialog.current?.querySelector<HTMLElement>('[aria-checked="true"], input:checked')?.scrollIntoView({ block: 'center' });
    }
  }, [picker]);
  const openPicker = (kind: 'category' | 'passes') => {
    if (kind === 'passes') setPendingPasses([...draft.passIds]);
    setPicker(kind);
  };
  const closePicker = () => { dialog.current?.close(); setPicker(null); };
  const confirmPasses = () => {
    setDraft({ ...draft, passIds: pendingPasses });
    closePicker();
  };

  const passRow = (pass: typeof passes[number]) => <label key={pass.id} className="flow-v5-picker-row">
    <input type="checkbox" checked={pendingPasses.includes(pass.id)} onChange={() => {
      const current = pendingPasses;
      const next = pass.id === 'none' ? ['none'] : current.includes(pass.id) ? current.filter(id => id !== pass.id) : [...current.filter(id => id !== 'none'), pass.id];
      setPendingPasses(next.length ? next : ['none']);
    }} /><span>{pass.label}</span>
  </label>;
  return <>
    {editing && <p className="flow-eyebrow">{saveFavorite ? 'Úprava · oblíbený cestující' : 'Úprava cestujícího'}</p>}
    <div className="flow-v5-label">Vybraná kategorie</div>
    <button className="flow-v5-selector" aria-haspopup="dialog" onClick={() => openPicker('category')}><strong>{categories.find(c => c.id === draft.catId)?.label}</strong><span className="flow-extra-arrow" aria-hidden="true" /></button>
    <details className="flow-disclosure flow-v5-extra" open={nameRequired || undefined}>
      <summary><span className="flow-extra-arrow" aria-hidden="true" /><span>Doplňující údaje</span></summary>
      <div className="flow-fields">
        <label>Jméno {nameRequired ? <span>*</span> : <small>volitelné</small>}<input required={nameRequired} autoComplete="given-name" value={draft.firstName || ''} onChange={e => setDraft({ ...draft, firstName: e.target.value })} /></label>
        <label>Příjmení {nameRequired ? <span>*</span> : <small>volitelné</small>}<input required={nameRequired} autoComplete="family-name" value={draft.lastName || ''} onChange={e => setDraft({ ...draft, lastName: e.target.value })} /></label>
        <label>Datum narození <small>volitelné</small><input type="date" autoComplete="bday" value={draft.birthDate || ''} onChange={e => setDraft({ ...draft, birthDate: e.target.value })} /></label>
        <label>Číslo průkazu <small>volitelné</small><input value={draft.passNumber || ''} onChange={e => setDraft({ ...draft, passNumber: e.target.value })} /></label>
      </div>
    </details>
    <button className="flow-v5-selector flow-v5-passes" aria-haspopup="dialog" onClick={() => openPicker('passes')}><span><strong>Slevové průkazy</strong><small>{passLabels(draft)}</small></span><span className="flow-extra-arrow" aria-hidden="true" /></button>
    <label className="flow-save"><input type="checkbox" checked={favoriteLocked || saveFavorite} disabled={favoriteLocked} onChange={e => setSaveFavorite(e.target.checked)} /><span><strong>Uložit do oblíbených</strong></span></label>
    {saveFavorite && <div className="flow-fields"><label>Přezdívka <span>*</span><input required value={draft.name || ''} onChange={e => setDraft({ ...draft, name: e.target.value })} /></label></div>}
    {editing && !favoriteLocked && <button type="button" className="flow-delete-passenger" onClick={onDelete}>Smazat cestujícího</button>}
    {picker && <dialog className="flow-v5-dialog" ref={dialog} aria-labelledby="flow-v5-picker-title" onCancel={event => { event.preventDefault(); closePicker(); }}>
      <header className="flow-v5-dialog-header"><h2 id="flow-v5-picker-title">{picker === 'category' ? 'Vyberte kategorii' : 'Slevové průkazy'}</h2>{picker === 'category' && <button aria-label="Zavřít nabídku" onClick={closePicker}>×</button>}</header>
      <div className="flow-v5-picker-content">
        {picker === 'category' ? categoryGroups.map((group, index) => <section key={group.id} aria-label={['Děti', 'Mladiství', 'Dospělí', 'Senioři'][index]}>
          <h3>{['Děti', 'Mladiství', 'Dospělí', 'Senioři'][index]}</h3>
          {group.items.map(category => <label className="flow-v5-picker-row" key={category.id}><input type="radio" name="v5-category" checked={draft.catId === category.id} onClick={() => { setDraft({ ...draft, catId: category.id, age: category.id === draft.catId ? draft.age : undefined }); closePicker(); }} readOnly /><span>{category.label}</span></label>)}
        </section>) : <>{passRow(passes[0])}{passSections.map(section => <section key={section.label} aria-label={section.label}><h3>{section.label}</h3>{passes.filter(pass => section.ids.includes(pass.id)).map(passRow)}</section>)}</>}
      </div>
      {picker === 'passes' && <footer><button onClick={closePicker}>Zrušit</button><button className="flow-v5-confirm" onClick={confirmPasses}>OK</button></footer>}
    </dialog>}
  </>;
}
