import React from 'react';
import { Ticket, Clock, ShieldCheck, UserCheck, UtensilsCrossed, Coffee } from 'lucide-react';

interface HeaderProps {
  onOpenTokenModal: (role?: 'student' | 'staff') => void;
  activeTokenCount: number;
  onViewTokens: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTokenModal,
  activeTokenCount,
  onViewTokens,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-[#5b0d18] text-white text-xs sm:text-sm py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-400 text-amber-950">
              CASHLESS TOKEN PORTAL
            </span>
            <span className="hidden md:inline text-slate-200">
              Collect online token on this website without paying any upfront money • Verify as Student or Staff
            </span>
            <span className="md:hidden text-slate-200">
              Online Cashless Token Portal
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-amber-200">
            <span className="hidden sm:inline">
              Designed by <strong className="text-white font-semibold underline underline-offset-2">Ebin Mathew Sogy</strong>
            </span>
            <span className="inline-flex items-center gap-1 bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded-full text-[11px] border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Counters Open (8 AM - 5 PM)
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand & Crest */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#7b1122] to-[#4e0a13] text-amber-300 font-bold text-xl flex items-center justify-center shadow-sm border border-amber-400/30 shrink-0">
            <UtensilsCrossed className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-tight">
                Campus Canteen &amp; Cafeteria
              </h1>
              <span className="hidden lg:inline-block px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase bg-slate-100 text-slate-700 border border-slate-300">
                Dining Services
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Main Canteen &amp; Express Cafeteria Services
            </p>
          </div>
        </div>

        {/* Quick Nav & Online Token Action */}
        <div className="flex items-center gap-2 sm:gap-3">
          {activeTokenCount > 0 && (
            <button
              onClick={onViewTokens}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 text-xs sm:text-sm font-semibold hover:bg-amber-100 transition-colors"
              title="View your saved tokens"
            >
              <Ticket className="w-4 h-4 text-amber-700" />
              <span>My Tokens ({activeTokenCount})</span>
            </button>
          )}

          <button
            onClick={() => onOpenTokenModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#7b1122] text-white text-xs sm:text-sm font-semibold hover:bg-[#600d1a] shadow-sm hover:shadow transition-all"
          >
            <Ticket className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Collect Token Online (No Pay)</span>
            <span className="sm:hidden">Get Token</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-bar */}
      <div className="border-t border-slate-100 bg-slate-50/80 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs overflow-x-auto no-scrollbar gap-4 text-slate-600 font-medium">
          <div className="flex items-center gap-4 sm:gap-6 whitespace-nowrap">
            <a href="#canteen" className="hover:text-[#7b1122] flex items-center gap-1.5 transition-colors">
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#7b1122]" />
              Main Canteen (മെയിൻ കാന്റീൻ)
            </a>
            <a href="#cafeteria" className="hover:text-[#7b1122] flex items-center gap-1.5 transition-colors">
              <Coffee className="w-3.5 h-3.5 text-amber-700" />
              Cafeteria (കഫറ്റീരിയ)
            </a>
            <a href="#token-system" className="hover:text-[#7b1122] flex items-center gap-1.5 transition-colors">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              Student / Staff Token Guide
            </a>
            <a href="#timings" className="hover:text-[#7b1122] flex items-center gap-1.5 transition-colors">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              Dining Hours &amp; Timings
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-500 whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Designed by <span className="font-semibold text-slate-800">Ebin Mathew Sogy</span>
          </div>
        </div>
      </div>
    </header>
  );
};
