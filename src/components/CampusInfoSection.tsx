import React from 'react';
import { 
  ShieldCheck, 
  GraduationCap, 
  Briefcase, 
  Clock, 
  UtensilsCrossed, 
  Coffee, 
  Sparkles,
  CheckCircle2,
  Smartphone
} from 'lucide-react';

interface CampusInfoSectionProps {
  onOpenTokenModal: (role?: 'student' | 'staff') => void;
}

export const CampusInfoSection: React.FC<CampusInfoSectionProps> = ({ onOpenTokenModal }) => {
  return (
    <section id="token-system" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      
      {/* 1. Cashless Online Token Protocol */}
      <div className="bg-gradient-to-br from-slate-900 via-[#18060b] to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-amber-500/20 shadow-xl space-y-8 text-left">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>COLLECT TOKEN ONLINE WITHOUT PAYING</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Cashless Token Collection for Students &amp; Staff
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              No cash transactions at the food counters. Follow these 3 easy steps on this website to generate your digital token instantly.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenTokenModal('student')}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student Token</span>
            </button>

            <button
              onClick={() => onOpenTokenModal('staff')}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Staff Token</span>
            </button>
          </div>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg">
              1
            </div>
            <h4 className="font-bold text-white text-base">
              1. Choose Role &amp; Enter Details
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Select whether you are a <strong className="text-sky-300">Student (വിദ്യാർത്ഥി)</strong> with Roll No/Class, or <strong className="text-purple-300">Staff (ജീവനക്കാർ)</strong> with Department/ID.
            </p>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
              2
            </div>
            <h4 className="font-bold text-white text-base">
              2. Select Food Items (Bilingual Menu)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pick your food or drinks with clear Malayalam screening. Generate the token directly on this portal with <strong className="text-amber-300">zero cash payment online</strong>.
            </p>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              3
            </div>
            <h4 className="font-bold text-white text-base">
              3. Present Digital Pass at Counter
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Show your generated token pass or token number directly on your mobile screen at the assigned counter to receive your food hot and fresh.
            </p>
          </div>

        </div>

      </div>

      {/* 2. Facility Operational Scope & Timings Table */}
      <div id="timings" className="space-y-6 text-left">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            <span>OPERATIONAL SCOPE</span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">
            Canteen vs. Cafeteria Timings &amp; Service Rules
          </h3>
          <p className="text-xs sm:text-sm text-slate-600">
            Understanding the distinction between Main Canteen and the Express Cafeteria kiosk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Main Canteen Box */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-[#7b1122] text-white">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    Main Canteen (മെയിൻ കാന്റീൻ)
                  </h4>
                  <span className="text-xs text-slate-500">Comprehensive Dining Hall</span>
                </div>
              </div>
              <span className="text-xs font-bold text-[#7b1122] bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                8:00 AM – 5:00 PM
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Morning Breakfast (8:00 AM – 11:30 AM):</strong> Fresh Palappam, Kerala Porotta, Egg Roast, Kadala Curry.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Lunch Mess (12:00 PM – 2:30 PM):</strong> Traditional Kerala Meals (Nadan Oonu), Fish Curry, Chicken Dum Biryani.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-amber-800">All-Day Continuous (8:00 AM – 5:00 PM):</strong> Fresh Juices, Milk Shakes, Ice Creams, Bakery Snacks, Kerala Tea &amp; Filter Coffee.
                </span>
              </li>
            </ul>
          </div>

          {/* Express Cafeteria Box */}
          <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2.5 rounded-xl bg-amber-600 text-white">
                  <Coffee className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">
                    Express Cafeteria (കഫറ്റീരിയ)
                  </h4>
                  <span className="text-xs text-slate-500">Quick Grab Kiosk</span>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                Full Time 8 AM – 5 PM
              </span>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Dedicated Scope:</strong> Exclusively sells bakery items, hot tea, and filter coffee.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Bakery Selection:</strong> Chicken Puffs, Egg Puffs, Meat Rolls, and Vegetable Cutlets kept warm.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-emerald-800">Non-Stop Service:</strong> Operates continuously throughout the academic day with zero mid-day lunch closures.
                </span>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </section>
  );
};
