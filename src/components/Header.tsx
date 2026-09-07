import React from 'react';
import { Ticket, Sparkles, Database, Coffee, IceCream, UtensilsCrossed, Clock, Sun, Flame, GlassWater } from 'lucide-react';

interface HeaderProps {
  activeTokenCount: number;
  onOpenTokenModal: () => void;
  onOpenStorageModal: () => void;
  onScrollToMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTokenCount,
  onOpenTokenModal,
  onOpenStorageModal,
  onScrollToMenu,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#7b1122] via-[#650c1b] to-[#500814] text-white shadow-xl border-b border-amber-400/20 backdrop-blur-md">
      {/* Top micro bar with College identity & colorful accreditation pill */}
      <div className="bg-[#480710]/95 px-4 py-1.5 text-[11px] text-amber-200/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5">
          <div className="flex items-center gap-2 text-center sm:text-left flex-wrap justify-center sm:justify-start">
            <span className="font-extrabold tracking-wider text-amber-300">ST. BERCHMANS COLLEGE (AUTONOMOUS)</span>
            <span className="text-amber-400/60 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-amber-100/90 font-medium">CHANGANASSERY, KERALA</span>
            <span className="text-amber-400/60 hidden md:inline">•</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-black border border-emerald-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              NAAC A++ Grade (CGPA 3.66)
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-amber-200/80 font-medium text-[11px]">
              Designed by <strong className="font-bold text-amber-300">Ebin Mathew Sogy</strong>
            </span>
            <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/30">
              SB-1922
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3.5">
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-rose-500 to-orange-500 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative w-12 h-12 rounded-2xl bg-white text-[#7b1122] flex items-center justify-center font-extrabold text-xl shadow-lg border-2 border-amber-400 shrink-0">
                <span className="tracking-tighter font-serif font-black">SB</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-lg sm:text-2xl tracking-tight text-white leading-none">
                  SB COLLEGE CANTEEN
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 uppercase tracking-wide shadow-xs">
                  Changanassery
                </span>
              </div>
              <p className="text-xs text-amber-100/90 font-medium mt-1 flex items-center gap-1.5">
                <span>Central Campus Dining &amp; Cashless Token Pass</span>
                <span className="hidden md:inline text-amber-400">•</span>
                <span className="hidden md:inline text-emerald-300 font-semibold">Subsidized Kerala Student Rates</span>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Storage / Database Inspector */}
            <button
              type="button"
              onClick={onOpenStorageModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-amber-200 text-xs font-bold transition-all border border-white/15 backdrop-blur-sm cursor-pointer active:scale-95"
              title="Inspect stored tokens in local storage and cloud database"
            >
              <Database className="w-3.5 h-3.5 text-amber-300" />
              <span>Tokens Hub</span>
            </button>

            {/* Primary Generate Token Button with Colorful Gradient */}
            <button
              type="button"
              onClick={onOpenTokenModal}
              className="relative group inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 active:scale-95 text-slate-950 text-xs sm:text-sm font-black shadow-xl shadow-amber-400/30 transition-all cursor-pointer transform hover:-translate-y-0.5 border border-amber-200"
            >
              <Ticket className="w-4 h-4 text-slate-950" />
              <span>Get Food Token</span>
              {activeTokenCount > 0 && (
                <span className="ml-1 px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-300 text-xs font-black shadow-inner animate-pulse">
                  {activeTokenCount} Active
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Colorful live service ticker bar */}
        <div className="py-2 border-t border-white/10 flex items-center justify-between text-xs text-amber-100 overflow-x-auto gap-4 scrollbar-none">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-[10px] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              FULL-TIME ACTIVE
            </span>
            <span className="font-semibold text-white/95 text-xs">
              Snacks, Tea, Coffee, Ice Cream, Juices &amp; Bakery non-stop (08:00 AM – 05:30 PM)
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-3 text-[11px] font-bold shrink-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-400/20 text-amber-200 border border-amber-400/30">
              <Sun className="w-3 h-3 text-amber-400" />
              <span>Breakfast: 08:00 – 10:00 AM</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-rose-500/20 text-rose-200 border border-rose-400/30">
              <UtensilsCrossed className="w-3 h-3 text-rose-300" />
              <span>Lunch: 12:00 – 01:30 PM</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-400/30">
              <Flame className="w-3 h-3 text-emerald-300" />
              <span>Snacks: ₹12 – ₹15</span>
            </span>
          </div>
        </div>
      </div>

      {/* Radiant Rainbow Accent Line */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-rose-500 via-purple-500 via-teal-400 to-emerald-400"></div>
    </header>
  );
};
