import MultiTicketSummary, { JourneyResult, journeyTickets, multiTotal } from "./MultiTicketSummary";
import { useState } from "react";
import PassengerFlow, { initialPassengers, initialFavorites, passengerLabel, countLabel, demoTotal, passes, type Passenger } from "./PassengerFlow";

type Screen =
  | "home"
  | "results"
  | "passenger"
  | "passengers"
  | "fares"
  | "summary"
  | "payment"
  | "confirm";

const BG = "#080e1c";
const CARD = "#0f1826";
const HEADER = "#3a6fa5";
const BORDER = "#1e2d44";
const MUTED = "#6b80a0";
const BLUE_LINK = "#60a5fa";
const TRAM = "#ff6b35";
const TRAIN = "#c084fc";
const GREEN = "#4ade80";

// Icons
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </svg>
);
const TrainIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={color}>
    <rect x="4" y="3" width="16" height="13" rx="2" />
    <path d="M4 11h16M8 16l-2 3M16 16l2 3M9 7h6" stroke={color === TRAIN ? "#fff" : "#fff"} strokeWidth="1.5" fill="none" />
    <circle cx="8.5" cy="13.5" r="1" fill="#fff" />
    <circle cx="15.5" cy="13.5" r="1" fill="#fff" />
  </svg>
);
const WalkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z" />
  </svg>
);
const MapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke={filled ? "#f59e0b" : "currentColor"} strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const ArrowLeft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const DotsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
  </svg>
);
const SwapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);
const RefreshIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);
const PlusIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" />
    <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" />
  </svg>
);
const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);
const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const TicketIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
  </svg>
);
const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const DogIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE_LINK} strokeWidth="1.8">
    <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2 .336-3.5 2.098-3.5 4 0 .548.076 1.086.22 1.61C2.954 9.425 3 10.217 3 11c0 3.5 2.686 6.5 6 6.5s6-3 6-6.5c0-1.007-.164-1.947-.44-2.828" />
    <path d="M14.5 4.5c0-1-1-2-2-1.5S11 5 11 6" /><path d="M9 11h.01M7 11h.01" />
  </svg>
);
const BikeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE_LINK} strokeWidth="1.8">
    <circle cx="18.5" cy="17.5" r="3.5" /><circle cx="5.5" cy="17.5" r="3.5" />
    <path d="M15 6h-3l-3 8.5M6 17.5l4-8.5" /><path d="M18.5 17.5L16 10h-3" />
  </svg>
);
const AccessIcon = () => (
  <span style={{ color: MUTED, fontSize: 13 }}>♿</span>
);
const BusIcon = () => (
  <span style={{ color: MUTED, fontSize: 13 }}>🚌</span>
);
const ReplayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={GREEN}>
    <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
  </svg>
);

// Bottom navigation
function BottomNav({ active }: { active: string }) {
  const items = [
    { id: "search", label: "Spojení", icon: <SearchIcon /> },
    { id: "departures", label: "Odjezdy", icon: <ClockIcon /> },
    { id: "tickets", label: "Jízdenky", icon: <TicketIcon /> },
    { id: "more", label: "Více", icon: <MenuIcon /> },
  ];
  return (
    <div style={{ background: "#0a1220", borderTop: `1px solid ${BORDER}` }}
      className="flex">
      {items.map((item) => (
        <button key={item.id}
          style={{ color: item.id === active ? "#60a5fa" : MUTED }}
          className="flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium">
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

// Header
function Header({ title, onBack, extra }: { title: string; onBack?: () => void; extra?: React.ReactNode }) {
  return (
    <div style={{ background: HEADER }} className="flex items-center gap-3 px-4 py-3">
      {onBack && (
        <button onClick={onBack} aria-label="Zpět" className="text-white opacity-90">
          <ArrowLeft />
        </button>
      )}
      <span className="text-white font-medium text-lg flex-1">{title}</span>
      {extra}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCREEN 1: Home / Spojení
// ─────────────────────────────────────────────────────────
function HomeScreen({ onSearch }: { onSearch: () => void }) {
  const [from, setFrom] = useState("Moje poloha (±12 m)");
  const [to, setTo] = useState("Adamov, železniční zastávka");

  const favorites = [
    {
      from: "Moje poloha",
      to: "Adamov, železniční zastávka",
      connections: [
        { time: "za 30 min", line: "Tram 1", color: TRAM, hasAccess: true, note: "z" },
        { time: "za 58 min", line: "Tram 10", color: TRAM, hasAccess: true },
      ],
    },
    {
      from: "Adamov, železniční zastávka",
      to: "Brno, hlavní nádraží",
      connections: [
        { time: "za 1 min", line: "Vlak S2", color: TRAIN, hasAccess: true },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: BG }}>
      {/* Header */}
      <div style={{ background: HEADER }}>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-white font-medium text-lg">Spojení</span>
          <div className="flex items-center gap-4">
            <button className="text-white"><UsersIcon /></button>
            <button className="text-white"><DotsIcon /></button>
          </div>
        </div>
        {/* Region selector */}
        <div style={{ background: "#2d5a8c" }} className="flex items-center gap-2 px-4 py-2">
          <ChevronDown />
          <span className="text-white text-sm">Brno + IDS JMK</span>
        </div>
      </div>

      {/* Search form */}
      <div style={{ background: CARD }} className="px-4 py-4 space-y-3">
        {/* From */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full border-2 flex-shrink-0" style={{ borderColor: "#60a5fa" }} />
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 text-white bg-transparent text-sm outline-none"
            placeholder="Odkud"
          />
          <button style={{ color: MUTED }}><MapIcon /></button>
        </div>

        {/* Swap */}
        <div className="flex items-center gap-3">
          <button style={{ color: MUTED }} className="ml-0.5">
            <SwapIcon />
          </button>
          <div className="flex-1 h-px" style={{ background: BORDER }} />
        </div>

        {/* To */}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: "#60a5fa" }} />
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 text-white bg-transparent text-sm outline-none"
            placeholder="Kam"
          />
          <button style={{ color: MUTED }}><MapIcon /></button>
        </div>

        <div className="h-px" style={{ background: BORDER }} />

        {/* Departure time */}
        <div className="flex items-center gap-3">
          <ClockIcon />
          <span style={{ color: BLUE_LINK }} className="text-sm">Odjezd nyní</span>
        </div>

        {/* Extended search */}
        <div className="flex items-center gap-2">
          <ChevronDown />
          <span style={{ color: BLUE_LINK }} className="text-sm">Rozšířené zadání</span>
        </div>

        {/* Search button */}
        <button
          onClick={onSearch}
          style={{ background: "#4a7fc1" }}
          className="w-full py-4 rounded-lg flex items-center justify-center gap-2 text-white font-medium text-base mt-2"
        >
          <SearchIcon />
          Hledat
        </button>
      </div>

      {/* Favorites */}
      <div className="flex-1 overflow-auto px-4 pt-4">
        <p style={{ color: MUTED }} className="text-xs mb-3">Oblíbená spojení</p>
        <div className="space-y-3">
          {favorites.map((fav, i) => (
            <div key={i} style={{ background: CARD, borderRadius: 8 }}
              className="p-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: "#2d5a8c" }}>MHD</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white text-sm font-medium">{fav.from}</p>
                      <p style={{ color: MUTED }} className="text-xs">{fav.to}</p>
                    </div>
                    <button style={{ color: MUTED }}><DotsIcon /></button>
                  </div>
                  <div className="mt-2 space-y-1">
                    {fav.connections.map((c, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: MUTED }} />
                        <span style={{ color: MUTED }} className="text-xs">{c.time}</span>
                        <span style={{ color: c.color }} className="text-xs font-medium">{c.line}</span>
                        {c.hasAccess && <AccessIcon />}
                        {c.note && <span style={{ color: MUTED }} className="text-xs">{c.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="search" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCREEN 2: Results
// ─────────────────────────────────────────────────────────
function ResultsScreen({ onBack, onBuy, multi, onScenario }: { onBack: () => void; onBuy: () => void; multi: boolean; onScenario: (multi: boolean) => void }) {
  const connections = [
    {
      wait: "za 30 min",
      duration: "44 min",
      segments: [
        { type: "walk", text: "přesun asi 8 min z Moje poloha" },
        {
          type: "tram", line: "Tram 1", color: TRAM,
          stops: [{ time: "13:06", name: "Bráfova", suffix: " z" }, { time: "13:23", name: "Hlavní nádraží", platform: "2" }],
          status: "odjezd bývá včas",
        },
        { type: "walk", text: "přesun asi 4 min" },
        {
          type: "train", line: "Vlak S2", color: TRAIN,
          stops: [{ time: "13:29", name: "Brno hl. n." }, { time: "13:50", name: "Adamov zastávka" }],
          status: "odjezd bývá včas",
        },
      ],
      price: "33 Kč",
    },
    {
      wait: "za 58 min",
      duration: "44 min",
      segments: [
        { type: "walk", text: "přesun asi 6 min z Moje poloha" },
        {
          type: "tram", line: "Tram 10", color: TRAM,
          stops: [{ time: "13:34", name: "Mozolky" }, { time: "13:50", name: "Hlavní nádraží", platform: "5" }],
          status: "odjezd bývá včas",
        },
        { type: "walk", text: "přesun asi 5 min" },
      ],
      price: null,
    },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: BG }}>
      <Header
        title="Spojení"
        onBack={onBack}
        extra={
          <div className="flex items-center gap-4 text-white">
            <StarIcon />
            <MapIcon />
            <DotsIcon />
          </div>
        }
      />

      <div className="scenario-tabs" aria-label="Ukázkové scénáře"><button aria-pressed={!multi} onClick={() => onScenario(false)}>Jedna jízdenka</button><button aria-pressed={multi} onClick={() => onScenario(true)}>Více jízdenek</button></div>
      <div className="flex-1 overflow-auto">
        {multi ? <JourneyResult onBuy={onBuy} /> : connections.map((conn, ci) => (
          <div key={ci} className="mb-2">
            {/* Connection header */}
            <div style={{ background: "#0a1220", borderBottom: `1px solid ${BORDER}` }}
              className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: MUTED }} />
                <span className="text-white text-sm font-medium">{conn.wait}</span>
              </div>
              <span style={{ color: MUTED }} className="text-sm">{conn.duration}</span>
            </div>

            {/* Segments */}
            <div style={{ background: CARD }} className="px-4 py-3 space-y-3">
              {conn.segments.map((seg: any, si) => {
                if (seg.type === "walk") {
                  return (
                    <div key={si} className="flex items-center gap-3">
                      <div className="w-6 flex justify-center" style={{ color: MUTED }}>
                        <WalkIcon />
                      </div>
                      <span style={{ color: MUTED }} className="text-xs">{seg.text}</span>
                    </div>
                  );
                }
                return (
                  <div key={si} className="flex gap-3">
                    {/* Line indicator */}
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 rounded-sm flex items-center justify-center">
                        <TrainIcon color={seg.color} />
                      </div>
                      <div className="w-0.5 flex-1 my-1" style={{ background: BORDER, minHeight: 24 }} />
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        {seg.line === "Tram 1" || seg.line === "Tram 10" ? (
                          <span style={{ color: "#fbbf24", fontSize: 12 }}>⚠</span>
                        ) : null}
                        <span style={{ color: seg.color }} className="text-sm font-semibold">{seg.line}</span>
                        <AccessIcon />
                        <BusIcon />
                      </div>
                      {seg.stops?.map((stop: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-2 mb-0.5">
                          <span style={{ color: MUTED }} className="text-xs w-10">{stop.time}</span>
                          <span className="text-white text-sm">{stop.name}</span>
                          {stop.suffix && <span style={{ color: MUTED }} className="text-xs">{stop.suffix}</span>}
                          {stop.platform && (
                            <span style={{ color: BLUE_LINK }} className="text-xs font-medium">{stop.platform}</span>
                          )}
                        </div>
                      ))}
                      {seg.status && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <span style={{ color: GREEN }} className="text-xs">{seg.status}</span>
                          <ReplayIcon />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Buy footer */}
            {conn.price && (
              <div style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}
                className="flex items-center justify-end gap-2 px-4 py-3">
                <span style={{ color: BLUE_LINK }} className="text-sm font-medium">{conn.price}</span>
                <button
                  onClick={onBuy}
                  style={{ border: `1.5px solid ${BLUE_LINK}`, color: BLUE_LINK, borderRadius: 6 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium">
                  <CartIcon />
                  Koupit
                </button>
                <button style={{ border: `1.5px solid ${BORDER}`, borderRadius: 6, color: MUTED }}
                  className="px-2 py-1.5">
                  <DotsIcon />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <BottomNav active="search" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCREEN 3: Passenger / Cestující
// ─────────────────────────────────────────────────────────
function PassengerScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ background: BG }}>
      <Header title="Cestující" onBack={onBack} extra={<button className="text-white"><DotsIcon /></button>} />

      {/* Passenger type tab */}
      <div style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}
        className="px-4 py-3">
        <span style={{ color: BLUE_LINK }} className="text-sm font-medium">Dospělý (26–59 let)</span>
      </div>

      {/* Form */}
      <div style={{ background: CARD }} className="px-4 py-4 space-y-5 flex-1">
        <div>
          <p style={{ color: MUTED }} className="text-xs mb-1">Jméno držitele jízdenek</p>
          <input
            defaultValue="Jan"
            className="w-full bg-transparent text-white text-sm pb-2 outline-none"
            style={{ borderBottom: `1px solid ${BORDER}` }}
          />
        </div>
        <div>
          <p style={{ color: MUTED }} className="text-xs mb-1">Příjmení držitele jízdenek</p>
          <input
            defaultValue="Ukázkový"
            className="w-full bg-transparent text-white text-sm pb-2 outline-none"
            style={{ borderBottom: `1px solid ${BORDER}` }}
          />
        </div>
        <button style={{ color: BLUE_LINK }} className="text-sm">
          Slevové průkazy
        </button>
      </div>

      {/* FAB */}
      <div className="relative flex-1">
        <button
          style={{ background: "#4a7fc1", borderRadius: "50%", width: 56, height: 56 }}
          className="absolute bottom-4 right-4 flex items-center justify-center shadow-lg">
          <PlusIcon />
        </button>
      </div>

      {/* Bottom bar */}
      <button
        onClick={onNext}
        style={{ background: HEADER }}
        className="flex items-center justify-between px-4 py-4 text-white">
        <div className="flex items-center gap-2">
          <UsersIcon />
          <span className="text-sm font-medium">1</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Nabídka jízdného</span>
          <ArrowRight />
        </div>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCREEN 4: Fare Offers / Nabídka jízdného
// ─────────────────────────────────────────────────────────
function FaresScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [selected, setSelected] = useState(0);

  const offers = [
    {
      title: "Nabídka IDS",
      price: "33 Kč",
      description: "Nabídka s maximální možnou preferencí IDS tarifů",
    },
    {
      title: "Jednodenní nabídka IDS",
      price: "250 Kč",
      description: "Jednodenní IDS jízdenka pokrývající oblast z vyhledaného spojení",
    },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: BG }}>
      <Header title="Nabídka jízdného" onBack={onBack} />

      <div className="flex-1 overflow-auto">
        {offers.map((offer, i) => (
          <div key={i} style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}
            className="px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold text-sm">{offer.title}</span>
              <span className="text-white font-semibold text-sm">{offer.price}</span>
            </div>
            <p style={{ color: MUTED }} className="text-xs mb-4 leading-relaxed">{offer.description}</p>
            <div className="flex items-center justify-between">
              <button style={{ color: BLUE_LINK }} className="text-xs underline">Detail nabídky</button>
              <button
                onClick={() => setSelected(i)}
                style={{
                  border: selected === i ? "none" : `1px solid ${BORDER}`,
                  background: selected === i ? "#4a7fc1" : "transparent",
                  color: "white",
                  borderRadius: 6,
                  padding: "8px 20px",
                  fontSize: 14,
                  fontWeight: 500,
                }}
                className="flex items-center gap-2"
              >
                {selected === i ? "Vybráno" : "Vybrat"}
                <ArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <button
        onClick={onNext}
        style={{ background: HEADER }}
        className="flex items-center justify-between px-4 py-4 text-white">
        <span className="text-sm font-medium">{offers[selected].price}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Souhrn jízdenek</span>
          <ArrowRight />
        </div>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCREEN 5: Summary / Souhrn jízdenek
// ─────────────────────────────────────────────────────────
function SummaryScreen({ passengers, onBack, onNext, onShowFares, onEditPassengers }: { passengers: Passenger[]; onBack: () => void; onNext: () => void; onShowFares: () => void; onEditPassengers: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ background: BG }}>
      <Header title="Souhrn jízdenek" onBack={onBack}
        extra={<button className="text-white"><RefreshIcon /></button>} />

      <div className="flex-1 overflow-auto">
        {/* Connection timing */}
        <div style={{ background: "#0a1220", borderBottom: `1px solid ${BORDER}` }}
          className="px-4 py-3">
          <span style={{ color: MUTED }} className="text-sm">za 30 min</span>
        </div>

        {/* Passenger block */}
        <div style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }}
          className="px-4 py-3 flex items-center justify-between mt-0">
          <div className="flex items-center gap-3">
            <div style={{ background: "#1e2d44", borderRadius: "50%", width: 36, height: 36 }}
              className="flex items-center justify-center flex-shrink-0">
              <UserIcon />
            </div>
            <div>
              <p className="text-white text-sm font-medium">{countLabel(passengers.length)}</p>
              <p style={{ color: MUTED }} className="text-xs">{passengers.map(p => `${passengerLabel(p)} · ${passes.find(s => s.id === p.passId)?.label}`).join("; ")}</p>
            </div>
          </div>
          <button style={{ color: BLUE_LINK }} className="text-xs underline" onClick={onEditPassengers}>Upravit</button>
        </div>

        {/* Route summary */}
        <div style={{ background: CARD }} className="px-4 py-4 space-y-3">
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <TrainIcon color={TRAM} />
              <div className="w-0.5 flex-1 my-1" style={{ background: BORDER, minHeight: 20 }} />
            </div>
            <div className="flex-1">
              <span style={{ color: TRAM }} className="text-sm font-semibold">Tram 1</span>
              <span className="ml-2"><AccessIcon /></span>
              <span className="ml-1"><BusIcon /></span>
              <div className="mt-1">
                <div className="flex gap-2">
                  <span style={{ color: MUTED }} className="text-xs w-10">13:06</span>
                  <span className="text-white text-sm">Bráfova <span style={{ color: MUTED }}>z</span></span>
                </div>
                <div className="flex gap-2">
                  <span style={{ color: MUTED }} className="text-xs w-10">13:23</span>
                  <span className="text-white text-sm">Hlavní nádraží <span style={{ color: BLUE_LINK }}>2</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pl-0">
            <div className="w-6 flex justify-center" style={{ color: MUTED }}><WalkIcon /></div>
            <span style={{ color: MUTED }} className="text-xs">přesun asi 4 min</span>
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <TrainIcon color={TRAIN} />
              <div className="w-0.5 flex-1 my-1" style={{ background: BORDER, minHeight: 20 }} />
            </div>
            <div className="flex-1">
              <span style={{ color: TRAIN }} className="text-sm font-semibold">Vlak S2</span>
              <span className="ml-2"><AccessIcon /></span>
              <span className="ml-1"><BusIcon /></span>
              <div className="mt-1">
                <div className="flex gap-2">
                  <span style={{ color: MUTED }} className="text-xs w-10">13:29</span>
                  <span className="text-white text-sm">Brno hl. n.</span>
                </div>
                <div className="flex gap-2">
                  <span style={{ color: MUTED }} className="text-xs w-10">13:50</span>
                  <span className="text-white text-sm">Adamov zastávka</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket info */}
        <div style={{ background: CARD, borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
          className="px-4 py-4 mt-2 space-y-3">
          <div className="flex items-center gap-3">
            <ClockIcon />
            <span style={{ color: MUTED }} className="text-xs">Aktivace</span>
            <span className="text-white text-sm font-medium flex-1">Automatická aktivace</span>
            <button style={{ color: BLUE_LINK }} className="text-xs underline">Upravit</button>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: BLUE_LINK }} />
            <div>
              <p style={{ color: MUTED }} className="text-xs">tarif</p>
              <p className="text-white text-sm">{passengers.length}× IDS JMK — modelová cena (3 zóny, 90 minut)</p>
              <div className="flex items-center gap-2 mt-1">
                <span style={{ color: MUTED }} className="text-xs">cena</span>
                <span className="text-white text-sm font-semibold">{demoTotal(passengers)} Kč</span>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button style={{ color: BLUE_LINK }} className="text-xs underline">Přepravní podmínky</button>
          </div>
        </div>

        {/* Extras */}
        <div style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}
          className="px-4 py-4 flex items-center gap-6 mt-2">
          <button className="flex items-center gap-2">
            <DogIcon />
            <span style={{ color: BLUE_LINK }} className="text-xs underline">Přidat psa</span>
          </button>
          <button className="flex items-center gap-2">
            <BikeIcon />
            <span style={{ color: BLUE_LINK }} className="text-xs underline">Přidat kolo</span>
          </button>
        </div>
      </div>

      {/* FAB — Alternativní tarifní nabídky */}
      <div style={{ position: "relative", height: 0 }}>
        <button
          onClick={onShowFares}
          style={{
            position: "absolute",
            bottom: 15,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#4a7fc1",
            borderRadius: 999,
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
            whiteSpace: "nowrap",
            zIndex: 10,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
            <line x1="15" y1="9" x2="15" y2="9.01" strokeWidth="3" strokeLinecap="round" />
            <line x1="15" y1="15" x2="15" y2="15.01" strokeWidth="3" strokeLinecap="round" />
            <line x1="15" y1="12" x2="15" y2="12.01" strokeWidth="3" strokeLinecap="round" />
            <circle cx="18.5" cy="17.5" r="3.5" fill="#4a7fc1" stroke="white" strokeWidth="1.5" />
            <line x1="18.5" y1="16" x2="18.5" y2="19" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="17" y1="17.5" x2="20" y2="17.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-white text-sm font-medium">Alternativní tarifní nabídky</span>
        </button>
      </div>

      {/* Bottom bar */}
      <button
        onClick={onNext}
        style={{ background: HEADER }}
        className="flex items-center justify-between px-4 py-4 text-white">
        <div className="flex items-center gap-2">
          <UsersIcon />
          <span className="text-sm font-medium">{passengers.length}</span>
          <span style={{ color: "rgba(255,255,255,0.6)" }}>·</span>
          <span className="text-sm font-medium">{demoTotal(passengers)} Kč</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Platba</span>
          <ArrowRight />
        </div>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCREEN 6: Payment / Platba
// ─────────────────────────────────────────────────────────
function PaymentScreen({ passengers, total, ticketCount, onBack, onPay }: { passengers: Passenger[]; total: number; ticketCount: number; onBack: () => void; onPay: () => void }) {
  const [payMethod, setPayMethod] = useState<"gpay" | "card">("gpay");
  const [agreed, setAgreed] = useState(true);

  return (
    <div className="flex flex-col h-full" style={{ background: BG }}>
      <Header title="Platba — ukázka" onBack={onBack} extra={<button className="text-white"><DotsIcon /></button>} />

      <div className="flex-1 overflow-auto px-4 py-4 space-y-5">
        <div className="journey-totals"><span>{countLabel(passengers.length)} · Počet jízdenek: {ticketCount}</span><strong>{total} Kč</strong></div>
        {/* User info */}
        <div className="flex items-center gap-3">
          <div style={{ background: "#1e2d44", borderRadius: "50%", width: 44, height: 44 }}
            className="flex items-center justify-center text-white flex-shrink-0">
            <UserIcon />
          </div>
          <div>
            <p className="text-white text-sm font-medium">Ukázkový cestující</p>
            <p style={{ color: MUTED }} className="text-xs">cestujici@example.com</p>
          </div>
        </div>

        {/* Email field */}
        <div>
          <p style={{ color: MUTED }} className="text-xs mb-1">E-mail</p>
          <input
            defaultValue="cestujici@example.com"
            className="w-full bg-transparent text-white text-sm pb-2 outline-none"
            style={{ borderBottom: `1px solid ${BORDER}` }}
          />
        </div>

        {/* Terms */}
        <div className="flex items-start gap-3">
          <button
            onClick={() => setAgreed(!agreed)}
            style={{
              width: 22, height: 22, borderRadius: 4, flexShrink: 0,
              background: agreed ? "#4a7fc1" : "transparent",
              border: agreed ? "none" : `1.5px solid ${MUTED}`,
            }}
            className="flex items-center justify-center mt-0.5">
            {agreed && <CheckIcon />}
          </button>
          <p className="text-white text-sm leading-relaxed">
            Souhlasím se{" "}
            <span style={{ color: BLUE_LINK }} className="underline">Smluvními podmínkami IDOS.cz</span>
          </p>
        </div>

        {/* Payment methods */}
        <div className="flex gap-3">
          <button
            onClick={() => setPayMethod("gpay")}
            style={{
              flex: 1, borderRadius: 8, padding: "16px",
              border: payMethod === "gpay" ? `2px solid ${BLUE_LINK}` : `1px solid ${BORDER}`,
              background: payMethod === "gpay" ? "#1a2a40" : CARD,
              position: "relative",
            }}
            className="flex flex-col items-center justify-center gap-2">
            {payMethod === "gpay" && (
              <div style={{
                position: "absolute", top: -8, left: -8,
                background: BLUE_LINK, borderRadius: "50%",
                width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <CheckIcon />
              </div>
            )}
            {/* Google Pay logo */}
            <div className="bg-white rounded-full px-4 py-2">
              <span className="text-sm font-medium" style={{ color: "#555" }}>
                <span style={{ color: "#4285F4" }}>G</span>
                <span style={{ color: "#EA4335" }}>o</span>
                <span style={{ color: "#FBBC04" }}>o</span>
                <span style={{ color: "#4285F4" }}>g</span>
                <span style={{ color: "#34A853" }}>l</span>
                <span style={{ color: "#EA4335" }}>e</span>
                {" "}<span>Pay</span>
              </span>
            </div>
          </button>

          <button
            onClick={() => setPayMethod("card")}
            style={{
              flex: 1, borderRadius: 8, padding: "12px",
              border: payMethod === "card" ? `2px solid ${BLUE_LINK}` : `1px solid ${BORDER}`,
              background: payMethod === "card" ? "#1a2a40" : CARD,
              position: "relative",
            }}
            className="flex items-center justify-center gap-1 flex-wrap">
            {payMethod === "card" && (
              <div style={{
                position: "absolute", top: -8, left: -8,
                background: BLUE_LINK, borderRadius: "50%",
                width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <CheckIcon />
              </div>
            )}
            {/* Card logos */}
            {["VISA", "VISA Electron", "MasterCard", "Maestro"].map((card) => (
              <div key={card} className="rounded px-1 py-0.5 text-xs font-bold"
                style={{ background: card.includes("VISA") ? "#1a1f71" : "#eb001b", color: "white", fontSize: 8 }}>
                {card.replace(" Electron", "").replace("aster", "")}
              </div>
            ))}
          </button>
        </div>

        <button style={{ color: BLUE_LINK }} className="text-sm text-center w-full">
          Další způsoby platby
        </button>
      </div>

      {/* Bottom bar */}
      <button
        onClick={onPay}
        disabled={!agreed}
        style={{ background: HEADER }}
        className="flex items-center justify-between px-4 py-4 text-white">
        <div className="flex items-center gap-2">
          <UsersIcon />
          <span className="text-sm font-medium">{passengers.length}</span>
          <span style={{ color: "rgba(255,255,255,0.6)" }}>·</span>
          <span className="text-sm font-medium">{total} Kč</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Simulovat platbu</span>
          <ArrowRight />
        </div>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
function ConfirmScreen({ passengers, total, ticketCount, multi, onDone }: { passengers: Passenger[]; total: number; ticketCount: number; multi: boolean; onDone: () => void }) {
  return (
    <div className="flex flex-col h-full items-center justify-center px-6 text-center" style={{ background: BG }}>
      <div style={{ background: "#4a7fc1", borderRadius: "50%", width: 80, height: 80 }}
        className="flex items-center justify-center mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="text-white text-xl font-semibold mb-2">Ukázka nákupu dokončena</h2>
      <p style={{ color: MUTED }} className="text-sm mb-2">{countLabel(passengers.length)} · Počet jízdenek: {ticketCount}</p>
      <p style={{ color: MUTED }} className="text-sm mb-8">{multi ? "Veverská Bítýška → Česká Lípa" : "Tram 1 → Vlak S2"} | {total} Kč</p>
      <button
        onClick={onDone}
        style={{ background: "#4a7fc1", borderRadius: 8 }}
        className="px-8 py-3 text-white font-medium text-sm">
        Zpět na hlavní stránku
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>(location.hash === "#vice-jizdenek" ? "results" : location.hash === "#cestujici" ? "passengers" : "home");
  const [passengers, setPassengers] = useState<Passenger[]>(location.hash === "#vice-jizdenek" ? [{ uid: "senior-example", catId: "senior65", passId: "none" }] : initialPassengers);
  const [favorites, setFavorites] = useState<Passenger[]>(initialFavorites);

  const [multi, setMulti] = useState(location.hash === "#vice-jizdenek");
  const [ticketIds, setTicketIds] = useState(journeyTickets.map(t => t.id));
  const total = multi ? multiTotal(ticketIds, passengers.length) : demoTotal(passengers);
  const ticketCount = passengers.length * (multi ? ticketIds.length : 1);
  const chooseScenario = (value: boolean) => {
    if (value === multi) return;
    setMulti(value);
    setTicketIds(journeyTickets.map(t => t.id));
    setPassengers(value ? [{ uid: "senior-example", catId: "senior65", passId: "none" }] : initialPassengers);
  };
  const renderScreen = () => {
    switch (screen) {
      case "home":
        return <HomeScreen onSearch={() => setScreen("results")} />;
      case "results":
        return <ResultsScreen multi={multi} onScenario={chooseScenario} onBack={() => setScreen("home")} onBuy={() => setScreen("summary")} />;
      case "passenger":
        return <PassengerScreen onBack={() => setScreen("results")} onNext={() => setScreen("fares")} />;
      case "fares":
        return <FaresScreen onBack={() => setScreen("summary")} onNext={() => setScreen("summary")} />;
      case "passengers":
        return <PassengerFlow passengers={passengers} favorites={favorites} onSaveFavorites={setFavorites} onBack={() => setScreen("summary")} onConfirm={items => { setPassengers(items); setScreen("summary"); }} />;
      case "summary":
        return multi ? <MultiTicketSummary passengers={passengers} ticketIds={ticketIds} setTicketIds={setTicketIds} onBack={() => setScreen("results")} onEditPassengers={() => setScreen("passengers")} onNext={() => setScreen("payment")} /> : <SummaryScreen passengers={passengers} onBack={() => setScreen("results")} onNext={() => setScreen("payment")} onShowFares={() => setScreen("fares")} onEditPassengers={() => setScreen("passengers")} />;
      case "payment":
        return <PaymentScreen total={total} ticketCount={ticketCount} passengers={passengers} onBack={() => setScreen("summary")} onPay={() => setScreen("confirm")} />;
      case "confirm":
        return <ConfirmScreen total={total} ticketCount={ticketCount} multi={multi} passengers={passengers} onDone={() => setScreen("home")} />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#000" }}>
      {/* Mobile frame */}
      <div className="phone-frame"
        style={{
          width: 390,
          height: 844,
          background: BG,
          borderRadius: 40,
          overflow: "hidden",
          boxShadow: "0 0 0 10px #111, 0 30px 80px rgba(0,0,0,0.8)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Status bar */}
        <div style={{ background: HEADER, color: "white", fontSize: 11, paddingTop: 12 }}
          className="flex items-center justify-between px-5 pb-1.5">
          <span className="font-medium">12:36</span>
          <div className="flex items-center gap-1">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="white">
              <rect x="0" y="5" width="3" height="5" rx="0.5" opacity="0.4" />
              <rect x="4" y="3" width="3" height="7" rx="0.5" opacity="0.6" />
              <rect x="8" y="1" width="3" height="9" rx="0.5" />
            </svg>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="white">
              <path d="M5 2.5 C3 2.5 1.5 4 1.5 5.5 L3 4.5 C3.5 3.8 4.2 3.3 5 3.3 C5.8 3.3 6.5 3.8 7 4.5 L8.5 5.5 C8.5 4 7 2.5 5 2.5Z" />
              <circle cx="5" cy="7" r="1" />
            </svg>
            <span className="font-medium">🔋 80</span>
          </div>
        </div>

        {/* Screen content */}
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {renderScreen()}
        </div>
      </div>
    </div>
  );
}


