import { useEffect, useRef, useState } from 'react';
export type SummaryVersion = 'v1' | 'v2';
export function SummaryVersionSwitch({ version, onChange }: { version: SummaryVersion; onChange: (version: SummaryVersion) => void }) {
  return <div className="flow-version-switch" role="group" aria-label="Verze souhrnu"><span>Souhrn jízdenek</span>{(['v1', 'v2'] as const).map(value => <button key={value} aria-pressed={version === value} className={version === value ? 'selected' : ''} onClick={() => onChange(value)}>{value.toUpperCase()}</button>)}</div>;
}
export default function FareFab({ offers }: { offers: { id: string; title: string; price: string; selected?: boolean; onSelect: () => void }[] }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); trigger.current?.focus(); } };
    document.addEventListener('pointerdown', close);
    document.addEventListener('keydown', escape);
    return () => { document.removeEventListener('pointerdown', close); document.removeEventListener('keydown', escape); };
  }, [open]);
  return <div ref={root} className="fare-fab">
    {open && <div className="fare-fab-menu" role="group" aria-label="Alternativní tarifní nabídky"><h2>Alternativní tarifní nabídky</h2>{offers.map(offer => <button key={offer.id} aria-pressed={offer.selected} onClick={() => { offer.onSelect(); setOpen(false); trigger.current?.focus(); }}><span>{offer.title}</span><strong>{offer.selected ? '✓ ' : ''}{offer.price}</strong></button>)}</div>}
    <button className="fare-fab-trigger" ref={trigger} aria-label={open ? 'Zavřít tarifní nabídky' : 'Alternativní tarifní nabídky'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <span aria-hidden="true">×</span> : <svg aria-hidden="true" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5h16v5a2 2 0 0 0 0 4v5H4v-5a2 2 0 0 0 0-4Z"/><path d="M14 5v14" strokeDasharray="2 2"/></svg>}</button>
  </div>;
}
