import { useEffect, useState, type ComponentProps } from 'react';
import PassengerFlow, { PassengerFormV5, categories, hasPassengerName, passengerFullName, passengersMissingRequiredNames, passLabels, SELF_PASSENGER_UID, MAX_SELECTED_PASSENGERS, type Passenger } from './PassengerFlow';

const MEMORY_KEY = 'idos-final5-passengers-v1';
export const final5Self: Passenger = { uid: SELF_PASSENGER_UID, catId: 'adult', passIds: ['none'], name: 'Já' };
export function loadFinal5Memory() {
  let stored: Passenger[] = [];
  try {
    const value = JSON.parse(localStorage.getItem(MEMORY_KEY) || 'null');
    if (Array.isArray(value)) stored = value.filter(p => p && typeof p.uid === 'string' && categories.some(c => c.id === p.catId) && Array.isArray(p.passIds));
  } catch { /* Prázdné úložiště nebo anonymní režim. */ }
  const self = stored.find(p => p.uid === SELF_PASSENGER_UID) || final5Self;
  const normalizedSelf = { ...self, name: self.name?.trim() || 'Já' };
  return { favorites: [normalizedSelf], availablePassengers: [normalizedSelf, ...stored.filter(p => p.uid !== SELF_PASSENGER_UID)] };
}
export function saveFinal5Memory(passengers: Passenger[]) {
  try { localStorage.setItem(MEMORY_KEY, JSON.stringify(passengers)); } catch { /* Úložiště nemusí být dostupné. */ }
}

function PersonIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="12" cy="7" r="4" /><path d="M4 21v-3a8 8 0 0 1 16 0v3" /></svg>;
}

export default function Final5PassengerFlow(props: ComponentProps<typeof PassengerFlow>) {
  const { passengers, availablePassengers, requiredNameMode = 'holder', inlineAdd = true, onSaveAvailablePassengers, onConfirm, onBack, onExitToResults, confirmLabel } = props;
  const [selected, setSelected] = useState(passengers);
  const [draft, setDraft] = useState<Passenger | null>(null);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const hasHolder = selected.some(hasPassengerName);
  const nameRequired = requiredNameMode === 'all' || (requiredNameMode === 'holder' && !selected.some(p => p.uid !== draft?.uid && hasPassengerName(p)));
  const closeEditor = () => { setDraft(null); setFormError(''); };
  const back = () => {
    if (draft) closeEditor();
    else if (onExitToResults) onExitToResults(selected);
    else onBack();
  };
  useEffect(() => {
    window.addEventListener('passenger-back', back);
    return () => window.removeEventListener('passenger-back', back);
  });
  const edit = (passenger: Passenger) => {
    setEditing(true); setFormError(''); setDraft({ ...passenger });
  };
  const add = () => {
    if (selected.length >= MAX_SELECTED_PASSENGERS) {
      setError(`Pro jednu cestu můžete vybrat nejvýše ${MAX_SELECTED_PASSENGERS} cestujících.`); return;
    }
    const passenger: Passenger = { uid: crypto.randomUUID(), catId: 'adult', passIds: ['none'] };
    setError('');
    if (requiredNameMode === 'none' || (requiredNameMode === 'holder' && hasHolder)) {
      onSaveAvailablePassengers([...availablePassengers, passenger]);
      setSelected(items => [...items, passenger]);
    } else {
      setEditing(false); setFormError(''); setDraft(passenger);
    }
  };
  const save = () => {
    if (!draft) return;
    if (nameRequired && !hasPassengerName(draft)) { setFormError('Doplňte jméno a příjmení cestujícího.'); return; }
    const passenger = { ...draft, firstName: draft.firstName?.trim(), lastName: draft.lastName?.trim(), name: draft.name?.trim() || (draft.uid === SELF_PASSENGER_UID ? 'Já' : undefined) };
    onSaveAvailablePassengers(editing ? availablePassengers.map(p => p.uid === passenger.uid ? passenger : p) : [...availablePassengers, passenger]);
    setSelected(items => editing ? items.map(p => p.uid === passenger.uid ? passenger : p) : [...items, passenger]);
    setError(''); closeEditor();
  };
  const remove = () => {
    if (!draft || draft.uid === SELF_PASSENGER_UID) return;
    onSaveAvailablePassengers(availablePassengers.filter(p => p.uid !== draft.uid));
    setSelected(items => items.filter(p => p.uid !== draft.uid));
    closeEditor();
  };
  const toggle = (passenger: Passenger) => {
    const active = selected.some(p => p.uid === passenger.uid);
    if (!active && selected.length >= MAX_SELECTED_PASSENGERS) { setError(`Pro jednu cestu můžete vybrat nejvýše ${MAX_SELECTED_PASSENGERS} cestujících.`); return; }
    setError(''); setSelected(items => active ? items.filter(p => p.uid !== passenger.uid) : [...items, passenger]);
  };
  const confirm = () => {
    if (!selected.length) { setError('Vyberte alespoň jednoho cestujícího.'); return; }
    if (passengersMissingRequiredNames(selected, requiredNameMode)) {
      setError(requiredNameMode === 'holder' ? 'Alespoň jeden vybraný cestující musí mít jméno a příjmení.' : 'Doplňte jméno a příjmení všech vybraných cestujících.'); return;
    }
    onConfirm(selected);
  };
  const editor = draft && <section className={`flow-inline-add final5-editor${inlineAdd ? ' flow-inline-add--sheet' : ''}`} role={inlineAdd ? 'dialog' : undefined} aria-modal={inlineAdd ? true : undefined} aria-label={editing ? 'Upravit cestujícího' : 'Přidat cestujícího'} onClick={event => event.stopPropagation()}>
    {formError && <p className="flow-selection-error" role="alert">{formError}</p>}
    <PassengerFormV5 key={draft.uid} draft={draft} setDraft={setDraft} saveFavorite={false} setSaveFavorite={() => {}} editing={false} favoriteLocked nameRequired={nameRequired} minimalInline simpleProfile onDelete={() => {}} />
    <footer>
      {editing && draft.uid !== SELF_PASSENGER_UID && <button className="flow-inline-delete" onClick={remove}>Odebrat cestujícího</button>}
      <button onClick={closeEditor}>Zrušit</button>
      <button className="flow-inline-add-confirm" onClick={save} disabled={nameRequired && !hasPassengerName(draft)}>{editing ? 'Uložit změny' : 'Přidat cestujícího'}</button>
    </footer>
  </section>;
  return <section className="passenger-flow passenger-flow-compact final5-flow">
    <header className="flow-header"><button aria-label="Zpět" onClick={back}>←</button><h1>{draft && !inlineAdd ? editing ? 'Upravit cestujícího' : 'Přidat cestujícího' : 'Cestující'}</h1><button className="flow-cancel" onClick={draft ? closeEditor : onBack}>Zrušit</button></header>
    {draft && !inlineAdd ? <div className="flow-content">{editor}</div> : <>
      <div className="flow-content">
        {error && <p className="flow-selection-error" role="alert">{error}</p>}
        {passengersMissingRequiredNames(selected, requiredNameMode) && <p className="flow-required-notice">{requiredNameMode === 'holder' ? 'Doplňte údaje alespoň jednoho vybraného držitele jízdenky.' : 'Doplňte údaje všech vybraných cestujících.'}</p>}
        <div className="flow-v2-list">{availablePassengers.map(passenger => {
          const fullName = passengerFullName(passenger);
          const nickname = passenger.name?.trim();
          const category = categories.find(c => c.id === passenger.catId)?.label || 'Cestující';
          const active = selected.some(p => p.uid === passenger.uid);
          return <div className={`flow-v2-person ${active ? 'selected' : ''}`} key={passenger.uid}>
            <button className="final5-person-icon" aria-label={`Upravit ${nickname || fullName || category}`} onClick={() => edit(passenger)}><PersonIcon /></button>
            <button className="flow-v2-info flow-edit-person" aria-label={`Údaje cestujícího ${nickname || fullName || category}`} onClick={() => edit(passenger)}>
              <span className="final5-person-title"><strong>{nickname || fullName || category}</strong>{nickname && fullName && <span>{fullName}</span>}</span>
              {(nickname || fullName) && <small>{category}</small>}
              {passenger.passIds.some(id => id !== 'none') && <small>{passLabels(passenger)}</small>}
            </button>
            <button className="flow-switch" role="switch" aria-checked={active} aria-label={`Cestuje ${nickname || fullName || category}`} onClick={() => toggle(passenger)}><span /></button>
          </div>;
        })}</div>
      </div>
      <button className="flow-add-plus with-footer" aria-label="Přidat dalšího cestujícího" onClick={add}>＋</button>
      <footer className="flow-footer"><button className="flow-primary" onClick={confirm}><span>{confirmLabel || 'Pokračovat k nabídce'}</span><span className="final5-footer-count" aria-label={`Počet cestujících: ${selected.length}`}><span>{selected.length}</span><PersonIcon /><span aria-hidden="true">→</span></span></button></footer>
    </>}
    {draft && inlineAdd && <div className="flow-inline-add-layer flow-inline-add-layer--sheet" onClick={closeEditor}>{editor}</div>}
  </section>;
}
