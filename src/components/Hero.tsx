import React from 'react';
import { Sparkles, UtensilsCrossed, Coffee, Clock, ChefHat, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenTokenModal?: (role?: 'student' | 'staff') => void;
}

export const Hero: React.FC<HeroProps> = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#1a070e] to-slate-900 text-white py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-500/20">
      {/* Decorative backdrop elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px]"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7b1122]/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-300 border border-amber-400/30 backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Campus Dining Portal • Designed by Ebin Mathew Sogy</span>
            </div>

            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Campus Canteen <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-400">
                  &amp; Express Cafeteria
                </span>
              </h1>
              <p className="text-sm font-semibold text-rose-300/90 pt-1">
                മെയിൻ കാന്റീൻ &amp; എക്സ്പ്രസ്സ് കഫറ്റീരിയ
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Wholesome campus dining tailored for students and staff. Enjoy traditional Kerala breakfast, afternoon lunch mess, continuous fresh juices &amp; snacks in the <strong className="text-white">Main Canteen</strong>, plus hot bakery savories and fresh filter coffee at the <strong className="text-white">Express Cafeteria</strong>.
            </p>

            {/* Quick Navigation Action Buttons */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="#canteen"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#7b1122] hover:bg-[#600d1a] text-white font-semibold text-sm shadow-lg shadow-rose-950/40 transition-all transform hover:-translate-y-0.5"
              >
                <UtensilsCrossed className="w-4 h-4 text-amber-300" />
                <span>Main Canteen Menu</span>
              </a>

              <a
                href="#cafeteria"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-950/20 transition-all transform hover:-translate-y-0.5"
              >
                <Coffee className="w-4 h-4 text-slate-950" />
                <span>Express Cafeteria</span>
              </a>

              <a
                href="#timings"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-all"
              >
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Hours &amp; Timings</span>
              </a>
            </div>

            {/* Key feature pills */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2.5">
                <ChefHat className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Malayalam Screening for Food</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Full Time 8:00 AM – 5:00 PM</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-2.5">
                <HeartHandshake className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Student &amp; Staff Dining</span>
              </div>
            </div>
          </div>

          {/* Timing & Facility Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 border border-amber-500/30 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-400" />
                  <h2 className="font-bold text-white text-base">Campus Dining Hours</h2>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  Full-Day Service
                </span>
              </div>

              {/* Main Canteen Scope */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-300 text-sm flex items-center gap-1.5">
                    <UtensilsCrossed className="w-4 h-4 text-[#e06666]" />
                    Main Canteen (മെയിൻ കാന്റീൻ)
                  </span>
                  <span className="text-[11px] text-slate-400">8:00 AM – 5:00 PM</span>
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  • <strong className="text-white">Morning Breakfast:</strong> 8:00 AM – 11:30 AM (Palappam, Porotta, Egg/Kadala Curry)<br />
                  • <strong className="text-white">Lunch Mess:</strong> 12:00 PM – 2:30 PM (Nadan Meals, Fish Curry, Chicken Biryani)<br />
                  • <strong className="text-amber-200">Continuous Service (8 AM – 5 PM):</strong> Juices, Snacks, Bakery, Tea &amp; Coffee.
                </p>
              </div>

              {/* Cafeteria Scope */}
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-700 text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-amber-300 text-sm flex items-center gap-1.5">
                    <Coffee className="w-4 h-4 text-amber-400" />
                    Express Cafeteria (കഫറ്റീരിയ)
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-900/40 px-2 py-0.5 rounded">
                    Full Time 8 AM – 5 PM
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-normal">
                  Dedicated express kiosk that <strong className="text-white">exclusively sells bakery items (Chicken/Egg Puffs, Meat Rolls, Cutlets), Hot Tea, and Filter Coffee</strong> all day without pause.
                </p>
              </div>

              <div className="text-[11px] text-slate-400 text-center pt-1 border-t border-slate-700/60">
                Created &amp; Designed by <span className="text-amber-300 font-semibold">Ebin Mathew Sogy</span> for Campus Dining.
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
