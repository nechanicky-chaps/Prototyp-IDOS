import FareFab, { SummaryVersionSwitch, type SummaryVersion } from './FareFab';
import MultiTicketSummary, { JourneyResult, journeyTickets, multiTotal } from "./MultiTicketSummary";
import { useState } from "react";
import PassengerFlow, { initialPassengers, initialFavorites, hasPassengerName, passengerLabel, passLabels, countLabel, passes, type DesignVersion, type Passenger } from "./PassengerFlow";

type Screen =
  | "results"
  | "passenger"
  | "passengers"
  | "fares"
  | "summary"
  | "payment"
  | "confirm";

const BG = "#00101d";
const CARD = "#00101d";
const HEADER = "#0365ac";
const BAND = "#013354";
const BORDER = "#0e273c";
const MUTED = "#8ba0b3";
const BLUE_LINK = "#5fa8d5";
const BLUE_BTN = "#026cb6";
const TRAM = "#ff6e7f";
const TRAIN = "#ea5bf6";
const GREEN = "#4ade80";

export const purchaseFareOptions = [
  { title: "Nabídka IDS", detail: "IDS JMK Základní (3 zóny, 90 minut)", price: 33 },
  { title: "Jízdenka dopravce", detail: "Základní jednosměrná", price: 46 },
  { title: "Jednodenní nabídka IDS", detail: "Celodenní cestování v oblasti", price: 250 },
  { title: "Flexi nabídka", detail: "Více možností změny spojení", price: 58 },
];

// ─────────────────────────────────────────────────────────
// Icons & Graphic Elements
// ─────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7.5" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" />
  </svg>
);

const TramIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v2M8 4h8M6 6h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <circle cx="8" cy="16" r="1.5" fill={color} />
    <circle cx="16" cy="16" r="1.5" fill={color} />
    <line x1="7" y1="20" x2="6" y2="22" />
    <line x1="17" y1="20" x2="18" y2="22" />
  </svg>
);

const TrainIcon = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="14" rx="2" />
    <line x1="4" y1="11" x2="20" y2="11" />
    <circle cx="8" cy="15" r="1.5" fill={color} />
    <circle cx="16" cy="15" r="1.5" fill={color} />
    <line x1="7" y1="18" x2="5" y2="21" />
    <line x1="17" y1="18" x2="19" y2="21" />
  </svg>
);

const RouteTrack = ({ height = 36 }: { height?: number }) => (
  <svg width="6" height={height} viewBox={`0 0 6 ${height}`} fill="none" className="my-0.5 flex-shrink-0">
    <line x1="3" y1="2" x2="3" y2={height - 2} stroke="#c5d2db" strokeWidth="2.5" strokeDasharray="1 5" strokeLinecap="round" />
  </svg>
);

const WalkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={MUTED}>
    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z" />
  </svg>
);

const MapIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={BLUE_LINK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9.5" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "#f59e0b" : "none"} stroke={filled ? "#f59e0b" : "currentColor"} strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ChevronDown = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const ArrowRight = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ArrowLeft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const DotsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="5" r="1.7" />
    <circle cx="12" cy="12" r="1.7" />
    <circle cx="12" cy="19" r="1.7" />
  </svg>
);

const SwapIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="4" x2="7" y2="20" />
    <polyline points="4 7 7 4 10 7" />
    <line x1="17" y1="20" x2="17" y2="4" />
    <polyline points="14 17 17 20 20 17" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6" />
    <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
  </svg>
);

const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const TicketIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2z" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const DeparturesIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

const CartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const DogIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE_LINK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2 .336-3.5 2.098-3.5 4 0 .548.076 1.086.22 1.61C2.954 9.425 3 10.217 3 11c0 3.5 2.686 6.5 6 6.5s6-3 6-6.5c0-1.007-.164-1.947-.44-2.828" />
    <path d="M14.5 4.5c0-1-1-2-2-1.5S11 5 11 6" />
    <circle cx="8" cy="10" r="0.8" fill={BLUE_LINK} />
  </svg>
);

const BikeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={BLUE_LINK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6h-3l-3 8.5M5.5 17.5l4-8.5" />
    <path d="M18.5 17.5L16 10h-3" />
  </svg>
);

const AccessIcon = () => (
  <span style={{ color: MUTED, fontSize: 13 }} title="Bezbariérový přístup">♿</span>
);

const CartStrollerIcon = () => (
  <span title="Přeprava kočárku / vozíku" className="inline-flex">
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M3 4h3l2.5 11h10l2-8H6.5" />
    </svg>
  </span>
);

const ReplayIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6" />
    <path d="M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.19" />
  </svg>
);

const WarningIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="3" />
  </svg>
);

const GooglePayLogo = () => (
  <div className="flex items-center gap-1.5">
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
    <span className="text-[17px] font-medium tracking-tight text-neutral-800">Pay</span>
  </div>
);

const CardLogos = () => (
  <div className="grid grid-cols-2 gap-1.5 w-full max-w-[130px]">
    <div className="bg-[#1a1f71] rounded flex items-center justify-center py-1 px-2 shadow-2xs">
      <span className="text-white font-extrabold italic text-[11px] tracking-wider leading-none">VISA</span>
    </div>
    <div className="bg-[#0f2b5c] rounded flex flex-col items-center justify-center py-0.5 px-1 shadow-2xs">
      <span className="text-white font-extrabold italic text-[9px] tracking-tight leading-none">VISA</span>
      <span className="text-white text-[6px] tracking-tighter leading-none mt-0.5">Electron</span>
    </div>
    <div className="bg-[#111] rounded flex items-center justify-center py-1 px-1 relative overflow-hidden shadow-2xs">
      <div className="w-3.5 h-3.5 rounded-full bg-[#eb001b] opacity-90 -mr-1.5" />
      <div className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] opacity-90" />
    </div>
    <div className="bg-[#111] rounded flex items-center justify-center py-1 px-1 relative overflow-hidden shadow-2xs">
      <div className="w-3.5 h-3.5 rounded-full bg-[#eb001b] opacity-90 -mr-1.5" />
      <div className="w-3.5 h-3.5 rounded-full bg-[#00a2e5] opacity-90" />
    </div>
  </div>
);

// Android system navigation bar
function AndroidNavBar() {
  return (
    <div style={{ background: "#000000" }} className="flex items-center justify-around py-2 px-8 text-neutral-400 select-none flex-shrink-0">
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
      <button aria-label="Back" onClick={() => window.dispatchEvent(new Event("passenger-back"))} className="p-1 hover:text-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
    </div>
  );
}

// Bottom navigation
function BottomNav({ active }: { active: string }) {
  const items = [
    { id: "search", label: "Spojení", icon: <SearchIcon /> },
    { id: "departures", label: "Odjezdy", icon: <DeparturesIcon /> },
    { id: "tickets", label: "Jízdenky", icon: <TicketIcon /> },
    { id: "more", label: "Více", icon: <MenuIcon /> },
  ];
  return (
    <div style={{ background: BG, borderTop: `1px solid ${BORDER}` }} className="flex flex-shrink-0">
      {items.map((item) => (
        <button
          key={item.id}
          style={{ color: item.id === active ? BLUE_LINK : MUTED }}
          className="flex-1 flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors"
        >
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
    <div style={{ background: HEADER }} className="flex items-center gap-3 px-4 py-3 min-h-[52px] flex-shrink-0">
      {onBack && (
        <button onClick={onBack} aria-label="Zpět" className="text-white opacity-95 hover:opacity-100 -ml-1">
          <ArrowLeft />
        </button>
      )}
      <span className="text-white font-medium text-[19px] flex-1 tracking-tight">{title}</span>
      {extra}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCREEN 1: Home / Spojení (Screenshot 4)
// ─────────────────────────────────────────────────────────
function HomeScreen({
  onSearch,
  passengersCount,
  onOpenPassengers,
}: {
  onSearch: () => void;
  passengersCount: number;
  onOpenPassengers: () => void;
}) {
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
      to: "Brno, Bráfova 1617/21",
      connections: [
        { time: "za 1 min", line: "Vlak S2", color: TRAIN, hasAccess: true },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full" style={{ background: BG }}>
      {/* Header with region selector */}
      <div style={{ background: HEADER }}>
        <div className="flex items-center justify-between px-4 pt-3 pb-1">
          <span className="text-white font-medium text-[19px] tracking-tight">Spojení</span>
          <div className="flex items-center gap-4 text-white">
            <button
              onClick={onOpenPassengers}
              className="flex items-center gap-1.5 text-sm font-medium hover:opacity-85"
              title="Upravit cestující"
            >
              <span className="text-sm font-semibold">{passengersCount}</span>
              <UsersIcon />
            </button>
            <button className="text-white opacity-90 hover:opacity-100">
              <DotsIcon />
            </button>
          </div>
        </div>
        {/* Region selector directly inside header */}
        <div className="flex items-center gap-1.5 px-4 pb-2.5 text-white/95">
          <span className="text-[10px]">▼</span>
          <span className="text-sm font-normal">Brno + IDS JMK</span>
        </div>
      </div>

      {/* Search form */}
      <div style={{ background: BG }} className="px-4 py-4 space-y-3">
        {/* From */}
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full border-2 flex-shrink-0" style={{ borderColor: BLUE_LINK }} />
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 text-white bg-transparent text-sm outline-none font-normal"
            placeholder="Odkud"
          />
          <button style={{ color: MUTED }} className="hover:text-white">
            <MapIcon />
          </button>
        </div>

        {/* Swap */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const temp = from;
              setFrom(to);
              setTo(temp);
            }}
            style={{ color: BLUE_LINK }}
            className="ml-0.5 hover:opacity-80"
            title="Prohodit stanice"
          >
            <SwapIcon />
          </button>
          <div className="flex-1 h-px" style={{ background: BORDER }} />
        </div>

        {/* To */}
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: BLUE_LINK }} />
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 text-white bg-transparent text-sm outline-none font-normal"
            placeholder="Kam"
          />
          <button style={{ color: MUTED }} className="hover:text-white">
            <MapIcon />
          </button>
        </div>

        <div className="h-px" style={{ background: BORDER }} />

        {/* Departure time */}
        <div className="flex items-center gap-3 cursor-pointer">
          <ClockIcon />
          <span style={{ color: BLUE_LINK }} className="text-sm font-normal">Odjezd nyní</span>
        </div>

        {/* Extended search */}
        <div className="flex items-center gap-1.5 cursor-pointer">
          <span style={{ color: BLUE_LINK }} className="text-[10px]">▼</span>
          <span style={{ color: BLUE_LINK }} className="text-sm font-normal">Rozšířené zadání</span>
        </div>

        {/* Search button */}
        <button
          onClick={onSearch}
          style={{ background: BLUE_BTN }}
          className="w-full py-3.5 rounded-md flex items-center justify-center gap-2 text-white font-medium text-base mt-2 shadow-sm active:opacity-90 transition-opacity"
        >
          <SearchIcon />
          Hledat
        </button>
      </div>

      {/* Favorites */}
      <div className="flex-1 overflow-auto px-4 pt-3">
        <p style={{ color: MUTED }} className="text-xs mb-3 font-normal">Oblíbená spojení</p>
        <div className="space-y-3">
          {favorites.map((fav, i) => (
            <div key={i} style={{ background: CARD }} className="pb-3 border-b border-[#0e273c] last:border-b-0">
              <div className="flex items-start gap-3">
                {/* Drag handle */}
                <div style={{ color: MUTED }} className="mt-2 text-base select-none">≡</div>
                {/* MHD Badge */}
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0 relative mt-0.5"
                  style={{ background: "#4d4b4c" }}
                >
                  <span className="text-[11px] font-bold">MHD</span>
                  <span className="absolute -bottom-0.5 -right-0.5 text-[9px]" style={{ color: BLUE_LINK }}>★</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white text-sm font-normal">{fav.from}</p>
                      <p className="text-white text-sm font-normal">{fav.to}</p>
                    </div>
                    <button style={{ color: MUTED }} className="hover:text-white">
                      <DotsIcon />
                    </button>
                  </div>
                  <div className="mt-2 space-y-1">
                    {fav.connections.map((c, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ background: MUTED }} />
                        <span style={{ color: MUTED }} className="text-xs">{c.time}</span>
                        <span style={{ color: c.color }} className="text-xs font-semibold">{c.line}</span>
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
// SCREEN 2: Results (Screenshot 5)
// ─────────────────────────────────────────────────────────
export function ResultsScreen({
  onBack,
  onBuy,
  multi,
  onScenario,
  presentation = false,
  showScenarioTabs = !presentation,
}: {
  onBack?: () => void;
  onBuy: () => void;
  multi: boolean;
  onScenario: (multi: boolean) => void;
  presentation?: boolean;
  showScenarioTabs?: boolean;
}) {
  const connections = [
    {
      wait: "za 30 min",
      duration: "44 min",
      segments: [
        { type: "walk", text: "přesun asi 8 min z Moje poloha" },
        {
          type: "tram",
          line: "Tram 1",
          color: TRAM,
          hasWarning: true,
          stops: [
            { time: "13:06", name: "Bráfova", suffix: " z" },
            { time: "13:23", name: "Hlavní nádraží", platform: "2" },
          ],
          status: "odjezd bývá včas",
        },
        { type: "walk", text: "přesun asi 4 min" },
        {
          type: "train",
          line: "Vlak S2",
          color: TRAIN,
          hasWarning: false,
          stops: [
            { time: "13:29", name: "Brno hl. n." },
            { time: "13:50", name: "Adamov zastávka" },
          ],
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
          type: "tram",
          line: "Tram 10",
          color: TRAM,
          hasWarning: false,
          stops: [
            { time: "13:34", name: "Mozolky" },
            { time: "13:50", name: "Hlavní nádraží", platform: "5" },
          ],
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
        extra={presentation ? undefined : (
          <div className="flex items-center gap-4 text-white">
            <button aria-label="Oblíbené"><StarIcon /></button>
            <button aria-label="Mapa"><MapIcon /></button>
            <button aria-label="Více"><DotsIcon /></button>
          </div>
        )}
      />

      {showScenarioTabs && <div className="scenario-tabs" aria-label="Ukázkové scénáře">
        <button aria-pressed={!multi} onClick={() => onScenario(false)}>Jedna jízdenka</button>
        <button aria-pressed={multi} onClick={() => onScenario(true)}>Více jízdenek</button>
      </div>}

      <div className="flex-1 overflow-auto">
        {multi ? (
          <JourneyResult onBuy={onBuy} />
        ) : (
          connections.map((conn, ci) => (
            <div key={ci} className="mb-2">
              {/* Connection header band */}
              <div
                style={{ background: BAND }}
                className="flex items-center justify-between px-4 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: MUTED }} />
                  <span className="text-white text-sm font-medium">{conn.wait}</span>
                </div>
                <span style={{ color: MUTED }} className="text-sm font-normal">{conn.duration}</span>
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
                      {/* Line indicator and dotted track */}
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 flex items-center justify-center">
                          {seg.type === "tram" ? <TramIcon color={seg.color} /> : <TrainIcon color={seg.color} />}
                        </div>
                        {seg.hasWarning && (
                          <div className="my-0.5">
                            <WarningIcon />
                          </div>
                        )}
                        <RouteTrack height={seg.hasWarning ? 32 : 38} />
                      </div>
                      {/* Content */}
                      <div className="flex-1 pb-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span style={{ color: seg.color }} className="text-sm font-semibold">{seg.line}</span>
                          <AccessIcon />
                          <CartStrollerIcon />
                        </div>
                        {seg.stops?.map((stop: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 mb-0.5">
                            <span className="text-white font-medium text-xs w-10">{stop.time}</span>
                            <span className="text-white text-sm">{stop.name}</span>
                            {stop.suffix && <span style={{ color: MUTED }} className="text-xs">{stop.suffix}</span>}
                            {stop.platform && (
                              <span style={{ color: GREEN }} className="text-xs font-semibold">{stop.platform}</span>
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
                <div
                  style={{ background: CARD, borderTop: `1px solid ${BORDER}` }}
                  className="flex items-center justify-end gap-2.5 px-4 py-3"
                >
                  <span style={{ color: BLUE_LINK }} className="text-sm font-semibold mr-auto">
                    {conn.price}
                  </span>
                  <button
                    onClick={onBuy}
                    style={{ border: `1.5px solid ${BLUE_BTN}`, color: BLUE_LINK, borderRadius: 6 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium hover:bg-[#026cb6]/10 active:opacity-85"
                  >
                    <CartIcon />
                    Koupit
                  </button>
                  {!presentation && <button
                    style={{ border: `1.5px solid ${BORDER}`, borderRadius: 6, color: MUTED }}
                    className="px-2 py-1.5 hover:bg-white/5"
                  >
                    <DotsIcon />
                  </button>}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {!presentation && <BottomNav active="search" />}
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCREEN 3: Passenger / Cestující
// ─────────────────────────────────────────────────────────
function PassengerScreen({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return (
    <div className="flex flex-col h-full" style={{ background: BG }}>
      <Header title="Cestující" onBack={onBack} extra={<button className="text-white opacity-95"><DotsIcon /></button>} />

      {/* Passenger type tab */}
      <div style={{ background: CARD, borderBottom: `1px solid ${BORDER}` }} className="px-4 py-3">
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
          style={{ background: BLUE_BTN, borderRadius: "50%", width: 56, height: 56 }}
          className="absolute bottom-4 right-4 flex items-center justify-center shadow-lg active:scale-95"
        >
          <span className="text-white text-2xl">＋</span>
        </button>
      </div>

      {/* Bottom bar */}
      <button
        onClick={onNext}
        style={{ background: HEADER }}
        className="flex items-center justify-between px-4 py-3.5 text-white active:opacity-90"
      >
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
// SCREEN 4: Fare Offers / Nabídka jízdného (Screenshot 1)
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
          <div key={i} className="mb-2">
            {/* Offer Header Strip */}
            <div style={{ background: BAND }} className="flex items-center justify-between px-4 py-3">
              <span className="text-white font-semibold text-sm">{offer.title}</span>
              <span className="text-white font-semibold text-sm">{offer.price}</span>
            </div>
            {/* Offer Content */}
            <div style={{ background: CARD }} className="px-4 py-3.5">
              <p className="text-white text-xs mb-4 leading-relaxed font-normal">{offer.description}</p>
              <div className="flex items-center justify-between">
                <button style={{ color: BLUE_LINK }} className="text-xs underline font-normal hover:opacity-80">
                  Detail nabídky
                </button>
                <button
                  onClick={() => setSelected(i)}
                  style={{
                    background: selected === i ? BLUE_BTN : "#ffffff",
                    color: selected === i ? "#ffffff" : "#0365ac",
                    borderRadius: 4,
                    padding: "8px 20px",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                  className="flex items-center gap-2 shadow-xs transition-opacity active:opacity-90"
                >
                  <span>{selected === i ? "Vybráno" : "Vybrat"}</span>
                  <ArrowRight />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <button
        onClick={onNext}
        style={{ background: HEADER }}
        className="flex items-center justify-between px-4 py-3.5 text-white active:opacity-90"
      >
        <span className="text-base font-semibold">{offers[selected].price}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Souhrn jízdenek</span>
          <ArrowRight />
        </div>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCREEN 5: Summary / Souhrn jízdenek (Screenshot 2)
// ─────────────────────────────────────────────────────────
export function SummaryScreen({
  summaryVersion, onSummaryVersionChange,
  presentation = false,
  passengers,
  selectedFare,
  onSelectFare,
  onBack,
  onNext,
  onEditPassengers,
}: {
  summaryVersion: SummaryVersion; onSummaryVersionChange: (version: SummaryVersion) => void;
  presentation?: boolean;
  passengers: Passenger[];
  selectedFare: number;
  onSelectFare: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
  onEditPassengers: () => void;
}) {
  const chosenFare = purchaseFareOptions[selectedFare];
  const chosenTotal = chosenFare.price * passengers.length;
  const missingNames = passengers.some(p => !hasPassengerName(p));
  return (
    <div className="relative flex flex-col h-full" style={{ background: BG }}>
      <SummaryVersionSwitch version={summaryVersion} onChange={onSummaryVersionChange} />
      <Header
        title="Souhrn jízdenek"
        onBack={onBack}
        extra={presentation ? undefined : (
          <button className="text-white opacity-95 hover:opacity-100">
            <RefreshIcon />
          </button>
        )}
      />

      <div className="flex-1 overflow-auto">
        <div className="journey-passengers-summary">
          <div className="journey-passengers">
            <span className="journey-passenger-number" aria-label={`${passengers.length} cestujících`}>{passengers.length}</span>
            <UsersIcon />
            <button className="journey-passenger-main" onClick={onEditPassengers}>
              <span className="journey-passenger-list">{passengers.map(passenger => <span key={passenger.uid}>{passengerLabel(passenger)}</span>)}</span>
            </button>
            <button className="journey-edit-passengers" onClick={onEditPassengers}>{missingNames && <strong className="journey-required-mark" aria-label="Chybí údaje">!</strong>}Upravit</button>
            {missingNames && <button className="flow-required-notice" onClick={onEditPassengers}>Dopravce vyžaduje doplnit údaje</button>}
          </div>
        </div>

        {/* Connection timing banner */}
        <div style={{ background: BAND }} className="px-4 py-2.5">
          <span className="text-white/90 text-sm font-medium">za 30 min</span>
        </div>

        {/* Route summary */}
        <div style={{ background: CARD }} className="px-4 py-3.5 space-y-3">
          {/* Tram 1 */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <TramIcon color={TRAM} />
              <RouteTrack height={38} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span style={{ color: TRAM }} className="route-name">Tram 1</span>
                <AccessIcon />
                <CartStrollerIcon />
              </div>
              <div className="mt-1 space-y-0.5">
                <div className="flex gap-2">
                  <span className="text-white font-medium text-xs w-10">13:06</span>
                  <span className="text-white text-sm">
                    Bráfova <span style={{ color: MUTED }}>z</span>
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-white font-medium text-xs w-10">13:23</span>
                  <span className="text-white text-sm">
                    Hlavní nádraží <span style={{ color: GREEN }} className="font-semibold">2</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Walk transfer */}
          <div className="flex items-center gap-3">
            <div className="w-6 flex justify-center" style={{ color: MUTED }}>
              <WalkIcon />
            </div>
            <span style={{ color: MUTED }} className="text-xs">přesun asi 4 min</span>
          </div>

          {/* Vlak S2 */}
          <div className="flex gap-3">
            <div className="flex flex-col items-center">
              <TrainIcon color={TRAIN} />
              <RouteTrack height={38} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <span style={{ color: TRAIN }} className="route-name">Vlak S2</span>
                <AccessIcon />
                <CartStrollerIcon />
              </div>
              <div className="mt-1 space-y-0.5">
                <div className="flex gap-2">
                  <span className="text-white font-medium text-xs w-10">13:29</span>
                  <span className="text-white text-sm">Brno hl. n.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-white font-medium text-xs w-10">13:50</span>
                  <span className="text-white text-sm">Adamov zastávka</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section divider */}
        <div className="h-px" style={{ background: BORDER }} />

        {/* Ticket activation and fare details */}
        <div style={{ background: CARD }} className="px-4 py-3.5 space-y-3">
          {/* Activation row */}
          <div className="flex items-center gap-3">
            <ClockIcon />
            <span style={{ color: MUTED }} className="text-xs">Aktivace</span>
            <span className="text-white text-sm font-medium flex-1">Automatická aktivace</span>
            <button style={{ color: BLUE_LINK }} className="text-xs underline hover:opacity-80">
              Upravit
            </button>
          </div>

          {/* Tarif row */}
          <div className="flex items-start gap-3">
            <div className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: BLUE_LINK }} />
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span style={{ color: MUTED }} className="text-xs w-8">tarif</span>
                <span className="text-white text-sm">
                  {passengers.length}x {chosenFare.detail}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span style={{ color: MUTED }} className="text-xs w-8">cena</span>
                <span className="text-white text-sm font-bold">{chosenTotal} Kč</span>
              </div>
            </div>
          </div>

          {/* Přepravní podmínky */}
          <div className="flex justify-end">
            <button style={{ color: BLUE_LINK }} className="text-xs underline hover:opacity-80">
              Přepravní podmínky
            </button>
          </div>
        </div>

        {/* Section divider */}
        <div className="h-px" style={{ background: BORDER }} />

        {/* Extras: Dog and Bike */}
        <div style={{ background: CARD }} className="px-4 py-3.5 flex items-center gap-8">
          <button className="flex items-center gap-2 hover:opacity-80">
            <DogIcon />
            <span style={{ color: BLUE_LINK }} className="text-xs underline">Přidat psa</span>
          </button>
          <button className="flex items-center gap-2 hover:opacity-80">
            <BikeIcon />
            <span style={{ color: BLUE_LINK }} className="text-xs underline">Přidat kolo</span>
          </button>
        </div>

        {summaryVersion === 'v2' && <section className="inline-fares">
          <h2>Alternativní tarifní nabídky</h2>
          {purchaseFareOptions.map((offer, index) => index !== selectedFare && (
            <div key={offer.title} className="checkout-offer">
              <div>
                <strong>{offer.title}</strong>
                <span>{offer.detail}</span>
              </div>
              <button className="checkout-offer-action" onClick={() => onSelectFare(index)}>
                Vybrat za {offer.price * passengers.length} Kč
              </button>
            </div>
          ))}
        </section>}
      </div>

      {summaryVersion === 'v1' && <FareFab offers={purchaseFareOptions.flatMap((offer, index) => index === selectedFare ? [] : [{ id: String(index), title: offer.title, price: `${offer.price * passengers.length} Kč`, onSelect: () => onSelectFare(index) }])} />}
      {/* Bottom bar */}
      <div
        style={{ background: HEADER }}
        className="flex items-center justify-between px-4 py-3.5 text-white"
      >
        <button
          onClick={onEditPassengers}
          className="flex items-center gap-2 hover:opacity-80 text-white"
          title="Upravit cestující"
        >
          <span className="text-sm font-semibold">{passengers.length}</span>
          <UsersIcon />
          <span className="text-base font-semibold ml-2">{chosenTotal} Kč</span>
        </button>
        <button
          onClick={onNext}
          disabled={!passengers.length}
          className="summary-payment flex items-center gap-2 text-white font-medium hover:opacity-80"
        >
          <span className="text-sm">Platba</span>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCREEN 6: Payment / Platba (Screenshot 3)
// ─────────────────────────────────────────────────────────
function PaymentScreen({
  passengers,
  total,
  ticketCount,
  onBack,
  onPay,
}: {
  passengers: Passenger[];
  total: number;
  ticketCount: number;
  onBack: () => void;
  onPay: () => void;
}) {
  const [payMethod, setPayMethod] = useState<"gpay" | "card">("gpay");
  const [agreed, setAgreed] = useState(true);
  const namedPassenger = passengers.find((passenger) => passenger.firstName?.trim() && passenger.lastName?.trim());
  const [holderFirstName, setHolderFirstName] = useState(namedPassenger?.firstName || "");
  const [holderLastName, setHolderLastName] = useState(namedPassenger?.lastName || "");
  const requiresHolderName = !namedPassenger;
  const hasHolderName = Boolean(holderFirstName.trim() && holderLastName.trim());

  return (
    <div className="flex flex-col h-full" style={{ background: BG }}>
      <Header
        title="Platba"
        onBack={onBack}
        extra={
          <button className="text-white opacity-95 hover:opacity-100">
            <DotsIcon />
          </button>
        }
      />

      <div className="flex-1 overflow-auto px-4 py-4 space-y-4">
        {/* User profile row */}
        <div className="flex items-center gap-3">
          <div
            style={{ borderColor: BLUE_LINK }}
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-[#5fa8d5] flex-shrink-0"
          >
            <UserIcon />
          </div>
          <div>
            <p className="text-white text-sm font-medium">Petr Nechanický</p>
            <p style={{ color: MUTED }} className="text-xs">p.nechanicky@gmail.com</p>
          </div>
        </div>

        {/* Optional holder name if requested */}
        {requiresHolderName && (
          <div className="space-y-3 pt-1 border-t border-[#0e273c]">
            <p className="text-xs leading-relaxed text-white">Tento druh jízdenek vyžaduje jméno a příjmení držitele jízdenek.</p>
            <div>
              <p style={{ color: MUTED }} className="text-xs mb-1">Jméno držitele jízdenek</p>
              <input
                value={holderFirstName}
                onChange={(event) => setHolderFirstName(event.target.value)}
                autoComplete="given-name"
                className="w-full bg-transparent text-white text-sm pb-2 outline-none font-normal"
                style={{ borderBottom: `1px solid ${BORDER}` }}
              />
            </div>
            <div>
              <p style={{ color: MUTED }} className="text-xs mb-1">Příjmení držitele jízdenek</p>
              <input
                value={holderLastName}
                onChange={(event) => setHolderLastName(event.target.value)}
                autoComplete="family-name"
                className="w-full bg-transparent text-white text-sm pb-2 outline-none font-normal"
                style={{ borderBottom: `1px solid ${BORDER}` }}
              />
            </div>
          </div>
        )}

        {/* Email field */}
        <div className="pt-1">
          <p style={{ color: MUTED }} className="text-xs mb-1 font-normal">E-mail</p>
          <input
            defaultValue="p.nechanicky@gmail.com"
            className="w-full bg-transparent text-white text-sm pb-2 outline-none font-normal"
            style={{ borderBottom: `1px solid ${BORDER}` }}
          />
        </div>

        {/* Terms agreement checkbox */}
        <div className="flex items-start gap-3 pt-1">
          <button
            onClick={() => setAgreed(!agreed)}
            style={{
              width: 20,
              height: 20,
              borderRadius: 3,
              flexShrink: 0,
              background: agreed ? BLUE_BTN : "transparent",
              border: agreed ? "none" : `1.5px solid ${MUTED}`,
            }}
            className="flex items-center justify-center mt-0.5 text-white"
          >
            {agreed && <CheckIcon />}
          </button>
          <p className="text-white text-xs leading-relaxed">
            Souhlasím se{" "}
            <span style={{ color: BLUE_LINK }} className="underline cursor-pointer">
              Smluvními podmínkami IDOS.cz
            </span>
          </p>
        </div>

        {/* Payment method tiles */}
        <div className="flex gap-3 pt-2">
          {/* Google Pay tile */}
          <button
            onClick={() => setPayMethod("gpay")}
            style={{
              flex: 1,
              height: 74,
              borderRadius: 8,
              background: payMethod === "gpay" ? "#d6ecf8" : "#e8eff5",
              border: payMethod === "gpay" ? `2px solid ${BLUE_LINK}` : `1px solid #cad9e4`,
              position: "relative",
            }}
            className="flex items-center justify-center cursor-pointer transition-all active:opacity-95"
          >
            {payMethod === "gpay" && (
              <div
                style={{
                  position: "absolute",
                  top: -7,
                  left: -7,
                  background: "#1e88e5",
                  border: "2px solid #ffffff",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <CheckIcon />
              </div>
            )}
            <div className="bg-white rounded-full px-5 py-2 flex items-center justify-center shadow-2xs border border-neutral-200/40">
              <GooglePayLogo />
            </div>
          </button>

          {/* Cards tile */}
          <button
            onClick={() => setPayMethod("card")}
            style={{
              flex: 1,
              height: 74,
              borderRadius: 8,
              background: payMethod === "card" ? "#d6ecf8" : "#e8eff5",
              border: payMethod === "card" ? `2px solid ${BLUE_LINK}` : `1px solid #cad9e4`,
              position: "relative",
            }}
            className="flex items-center justify-center cursor-pointer transition-all active:opacity-95 px-2"
          >
            {payMethod === "card" && (
              <div
                style={{
                  position: "absolute",
                  top: -7,
                  left: -7,
                  background: "#1e88e5",
                  border: "2px solid #ffffff",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                }}
              >
                <CheckIcon />
              </div>
            )}
            <CardLogos />
          </button>
        </div>

        {/* Další způsoby platby */}
        <button style={{ color: BLUE_LINK }} className="text-sm font-medium text-center w-full pt-1 hover:opacity-80">
          Další způsoby platby
        </button>
      </div>

      {/* Bottom bar */}
      <button
        onClick={onPay}
        disabled={!agreed || (requiresHolderName && !hasHolderName)}
        style={{ background: HEADER }}
        className="flex items-center justify-between px-4 py-3.5 text-white disabled:opacity-50 transition-opacity active:opacity-90 flex-shrink-0"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{passengers.length}</span>
          <UsersIcon />
          <span className="text-base font-semibold ml-2">{total} Kč</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Zaplatit</span>
          <ArrowRight />
        </div>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// SCREEN 7: Confirm
// ─────────────────────────────────────────────────────────
function ConfirmScreen({
  passengers,
  total,
  ticketCount,
  multi,
  onDone,
}: {
  passengers: Passenger[];
  total: number;
  ticketCount: number;
  multi: boolean;
  onDone: () => void;
}) {
  return (
    <div className="flex flex-col h-full items-center justify-center px-6 text-center" style={{ background: BG }}>
      <div
        style={{ background: BLUE_BTN, borderRadius: "50%", width: 80, height: 80 }}
        className="flex items-center justify-center mb-6 shadow-md"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="text-white text-xl font-semibold mb-2">Ukázka nákupu dokončena</h2>
      <p style={{ color: MUTED }} className="text-sm mb-2">{countLabel(passengers.length)} · Počet jízdenek: {ticketCount}</p>
      <p style={{ color: MUTED }} className="text-sm mb-8">{multi ? "Veverská Bítýška → Česká Lípa" : "Tram 1 → Vlak S2"} | {total} Kč</p>
      <button
        onClick={onDone}
        style={{ background: BLUE_BTN, borderRadius: 6 }}
        className="px-8 py-3 text-white font-medium text-sm active:opacity-90 shadow-sm"
      >
        Zpět na hlavní stránku
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>(
    location.hash === "#cestujici" ? "passengers" : "results"
  );
  const [passengers, setPassengers] = useState<Passenger[]>(
    location.hash === "#vice-jizdenek" ? [{ uid: "senior-example", catId: "senior65", passIds: ["none"] }] : initialPassengers
  );
  const [availablePassengers, setAvailablePassengers] = useState<Passenger[]>(
    location.hash === "#vice-jizdenek" ? [{ uid: "senior-example", catId: "senior65", passIds: ["none"] }] : initialPassengers
  );
  const [favorites, setFavorites] = useState<Passenger[]>(initialFavorites);
  const [designVersion, setDesignVersion] = useState<DesignVersion>("v5.0");
  const [summaryVersion, setSummaryVersion] = useState<SummaryVersion>('v2');
  const [multiActivation, setMultiActivation] = useState('Automatická aktivace');
  const [requireNames, setRequireNames] = useState(false);
  const [selectedFare, setSelectedFare] = useState(0);

  const [multi, setMulti] = useState(location.hash === "#vice-jizdenek");
  const [ticketIds, setTicketIds] = useState(journeyTickets.map((t) => t.id));
  const total = multi ? multiTotal(ticketIds, passengers.length) : purchaseFareOptions[selectedFare].price * passengers.length;
  const ticketCount = passengers.length * (multi ? ticketIds.length : 1);

  const chooseScenario = (value: boolean) => {
    if (value === multi) return;
    const scenarioPassengers = value ? [{ uid: "senior-example", catId: "senior65", passIds: ["none"] }] : initialPassengers;
    setMulti(value);
    setSelectedFare(0);
    setTicketIds(journeyTickets.map((t) => t.id));
    setPassengers(scenarioPassengers);
    setAvailablePassengers(scenarioPassengers);
  };

  const proceedToPayment = () => {
    if (!passengers.length) return;
    if (!passengers.every(hasPassengerName)) {
      setRequireNames(true);
      setDesignVersion("v5.0");
      setScreen("passengers");
      return;
    }
    setScreen("payment");
  };

  const renderScreen = () => {
    switch (screen) {
      case "results":
        return (
          <ResultsScreen
            multi={multi}
            onScenario={chooseScenario}
            onBuy={() => setScreen("summary")}
          />
        );
      case "passenger":
        return <PassengerScreen onBack={() => setScreen("results")} onNext={() => setScreen("fares")} />;
      case "fares":
        return <FaresScreen onBack={() => setScreen("summary")} onNext={() => setScreen("summary")} />;
      case "passengers":
        return (
          <PassengerFlow
            passengers={passengers}
            availablePassengers={availablePassengers}
            favorites={favorites}
            version={designVersion}
            requireNames={requireNames}
            onVersionChange={setDesignVersion}
            onSaveAvailablePassengers={setAvailablePassengers}
            onSaveFavorites={setFavorites}
            onBack={() => setScreen("summary")}
            onConfirm={(items) => {
              setPassengers(items);
              setScreen("summary");
            }}
          />
        );
      case "summary":
        return multi ? (
          <MultiTicketSummary
            summaryVersion={summaryVersion}
            onSummaryVersionChange={setSummaryVersion}
            activation={multiActivation}
            setActivation={setMultiActivation}
            passengers={passengers}
            ticketIds={ticketIds}
            setTicketIds={setTicketIds}
            onBack={() => setScreen("results")}
            onEditPassengers={() => { setRequireNames(true); setDesignVersion("v5.0"); setScreen("passengers"); }}
            onNext={proceedToPayment}
          />
        ) : (
          <SummaryScreen
            summaryVersion={summaryVersion}
            onSummaryVersionChange={setSummaryVersion}
            passengers={passengers}
            selectedFare={selectedFare}
            onSelectFare={setSelectedFare}
            onBack={() => setScreen("results")}
            onNext={proceedToPayment}
            onEditPassengers={() => { setRequireNames(true); setDesignVersion("v5.0"); setScreen("passengers"); }}
          />
        );
      case "payment":
        return (
          <PaymentScreen
            total={total}
            ticketCount={ticketCount}
            passengers={passengers}
            onBack={() => setScreen("summary")}
            onPay={() => setScreen("confirm")}
          />
        );
      case "confirm":
        return (
          <ConfirmScreen
            total={total}
            ticketCount={ticketCount}
            multi={multi}
            passengers={passengers}
            onDone={() => setScreen("results")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#000000" }}>
      {/* Mobile frame */}
      <div
        className="phone-frame"
        style={{
          width: 390,
          height: 844,
          background: BG,
          borderRadius: 36,
          overflow: "hidden",
          boxShadow: "0 0 0 10px #1a1a1a, 0 30px 80px rgba(0,0,0,0.9)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        {/* Screen content */}
        <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
          {renderScreen()}
        </div>

        {/* Android system navigation bar */}
        <AndroidNavBar />
      </div>
    </div>
  );
}
