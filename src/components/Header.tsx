import React from 'react';
import { Ticket, Sparkles, Database, Coffee, IceCream, UtensilsCrossed, Clock } from 'lucide-react';

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
    <header className="sticky top-0 z-40 bg-[#7b1122] text-white shadow-lg border-b border-[#600d1a]">
      {/* Top micro bar with College identity & Accreditation */}
      <div className="bg-[#5c0a18] px-4 py-1.5 text-[11px] text-amber-200/90 border-b border-[#4d0713]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="font-bold tracking-wide">ST. BERCHMANS COLLEGE (AUTONOMOUS)</span>
            <span className="text-amber-400/60 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-amber-200/80">CHANGANASSERY, KERALA</span>
            <span className="text-amber-400/60 hidden md:inline">•</span>
            <span className="hidden md:inline text-amber-300/90 font-medium">NAAC Re-accredited at A++ Grade (CGPA 3.66)</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-amber-300 font-medium">
              Designed by <strong className="font-bold text-white">Ebin Mathew Sogy</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white text-[#7b1122] flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-amber-400 shrink-0">
              <span className="tracking-tighter font-serif">SB</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white leading-none">
                  SB COLLEGE CANTEEN
                </h1>
                <span className="hidden sm:inline px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 uppercase tracking-wide">
                  Changanassery
                </span>
              </div>
              <p className="text-xs text-amber-200/90 font-medium mt-1">
                Central Campus Canteen Management &amp; Cashless Token System
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Storage / Database Inspector */}
            <button
              type="button"
              onClick={onOpenStorageModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#5c0a18] hover:bg-[#4d0713] text-amber-200 text-xs font-semibold transition-colors border border-[#8a1a2d]"
              title="Inspect stored tokens in local storage and cloud"
            >
              <Database className="w-3.5 h-3.5 text-amber-300" />
              <span>Tokens Data</span>
            </button>

            {/* Primary Generate Token Button */}
            <button
              type="button"
              onClick={onOpenTokenModal}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 text-xs sm:text-sm font-extrabold shadow-md shadow-amber-400/20 transition-all cursor-pointer"
            >
              <Ticket className="w-4 h-4 text-slate-950" />
              <span>Get Food Token</span>
              {activeTokenCount > 0 && (
                <span className="ml-1 px-2 py-0.5 rounded-full bg-slate-950 text-amber-400 text-xs font-black">
                  {activeTokenCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick full-time service ticker bar */}
        <div className="py-2.5 border-t border-[#8a1a2d]/60 flex items-center justify-between text-xs text-amber-200/90 overflow-x-auto gap-4 scrollbar-none">
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 font-extrabold text-[11px] border border-emerald-400/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              FULL-TIME ACTIVE
            </span>
            <span className="font-semibold text-white">
              Snacks, Tea, Coffee, Ice Cream, Juices &amp; Bakery items available full time (08:00 AM - 05:30 PM)
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-4 text-[11px] text-amber-200/80 shrink-0">
            <span>Counter 1: Meals &amp; Biryani</span>
            <span>•</span>
            <span>Counter 2: Tea, Snacks &amp; Bakery</span>
            <span>•</span>
            <span>Counter 3: Shakes, Juices &amp; Ice Cream</span>
          </div>
        </div>
      </div>
    </header>
  );
};
