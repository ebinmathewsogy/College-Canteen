import React from 'react';
import { Clock, Coffee, IceCream, Utensils, CheckCircle2, Sparkles, Sun, Flame, Cookie } from 'lucide-react';

export const CollegeCampusShowcase: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-8 relative z-20">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#7b1122] via-[#6a0e1c] to-[#550b17] text-white p-5 sm:p-6 border-b border-[#5c0a18] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>ST. BERCHMANS COLLEGE CENTRAL CANTEEN • CHANGANASSERY</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Official Campus Dining Timings &amp; Subsidized Kerala Rates
            </h3>
            <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
              Authentic Kerala cuisine prepared fresh daily with subsidized rates for students and staff.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-extrabold text-xs flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              FSSAI Certified Campus Kitchen
            </span>
          </div>
        </div>

        {/* 3 Main Timings Columns: Breakfast, Lunch, and Full-Time */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Card 1: Breakfast Service */}
          <div className="p-6 sm:p-7 space-y-4 bg-gradient-to-b from-amber-50/40 to-white flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-700" />
                  <span>MORNING BREAKFAST</span>
                </span>
                <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-md">
                  Counter 1
                </span>
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 tracking-tight">
                  Kerala Breakfast Service
                </h4>
                <div className="inline-flex items-center gap-1.5 mt-1 text-sm font-black text-[#7b1122]">
                  <Clock className="w-4 h-4 text-[#7b1122]" />
                  <span>08:00 AM – 10:00 AM</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Hot steamed puttu, lacy vellayappams, crispy ghee roast dosas, thattu dosas, and puffed poori masala served fresh every morning at student subsidized rates.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Puttu &amp; Kadala Curry:</span>
                <strong className="text-slate-900">₹30</strong>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Vellayappam &amp; Egg Roast (3 Pcs):</span>
                <strong className="text-slate-900">₹35</strong>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Thattu Dosa Set (3 Pcs):</span>
                <strong className="text-slate-900">₹30</strong>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Ghee Roast / Masala Dosa:</span>
                <strong className="text-slate-900">₹40</strong>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Poori Masala (3 Nos):</span>
                <strong className="text-slate-900">₹35</strong>
              </div>
            </div>
          </div>

          {/* Card 2: Lunch Service */}
          <div className="p-6 sm:p-7 space-y-4 bg-gradient-to-b from-red-50/40 to-white flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-red-100 text-[#7b1122] font-extrabold text-xs flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#7b1122]" />
                  <span>CAMPUS LUNCH</span>
                </span>
                <span className="font-mono text-xs font-bold text-red-900 bg-red-100/60 px-2 py-0.5 rounded-md">
                  Counter 1
                </span>
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 tracking-tight">
                  Kerala Meals &amp; Biryani
                </h4>
                <div className="inline-flex items-center gap-1.5 mt-1 text-sm font-black text-[#7b1122]">
                  <Clock className="w-4 h-4 text-[#7b1122]" />
                  <span>12:00 PM – 01:30 PM</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Wholesome boiled Kerala matta rice meals, tangy Kottayam kudampuli fish curry meals, Thalassery chicken/beef biryani, and flaky parotta combos.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Kerala Veg Meals (സദ്യ സ്റ്റൈൽ):</span>
                <strong className="text-emerald-700 font-extrabold">₹40</strong>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Fish Curry Meals (മീൻ കറി ഊണ്):</span>
                <strong className="text-slate-900">₹50</strong>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Thalassery Chicken Biryani:</span>
                <strong className="text-slate-900">₹100</strong>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Parotta &amp; Beef Roast (3 Pcs):</span>
                <strong className="text-slate-900">₹70</strong>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Crispy Fish Fry Special:</span>
                <strong className="text-slate-900">₹40</strong>
              </div>
            </div>
          </div>

          {/* Card 3: Full Time Continuous Refreshments */}
          <div className="p-6 sm:p-7 space-y-4 bg-gradient-to-b from-emerald-50/40 to-white flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-extrabold text-xs flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-emerald-700" />
                  <span>CONTINUOUS SERVICE</span>
                </span>
                <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                  Counters 2 &amp; 3
                </span>
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 tracking-tight">
                  Snacks, Tea, Ice Cream &amp; Bakery
                </h4>
                <div className="inline-flex items-center gap-1.5 mt-1 text-sm font-black text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>08:00 AM – 05:30 PM (Full Time)</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Available full-time non-stop! Grab fresh Pazham Pori, Parippu Vada, Egg Puffs, Meter Tea, Royal Falooda, Sharjah Shakes, and oven-fresh bakery goods anytime.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Special Meter Tea / Kattan:</span>
                <strong className="text-slate-900">₹8 – ₹10</strong>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Hot Pazham Pori / Parippu Vada:</span>
                <strong className="text-slate-900">₹12 – ₹15</strong>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Kerala Spicy Egg / Chicken Puffs:</span>
                <strong className="text-slate-900">₹22 – ₹28</strong>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Royal Falooda &amp; Sharjah Shake:</span>
                <strong className="text-slate-900">₹50 – ₹80</strong>
              </div>
              <div className="flex justify-between text-slate-700 font-medium">
                <span>Fresh Lime Soda / Kulukki Sarbath:</span>
                <strong className="text-slate-900">₹25 – ₹30</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info bar */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">Daily Timing Summary:</span>
            <span>Breakfast (08:00 AM – 10:00 AM)</span>
            <span className="hidden sm:inline">•</span>
            <span>Lunch (12:00 PM – 01:30 PM)</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-emerald-700 font-bold">Refreshments (Full Time 08:00 AM – 05:30 PM)</span>
          </div>

          <div className="text-[11px] font-semibold text-slate-500">
            Cashless digital tokens accepted at all counters
          </div>
        </div>
      </div>
    </section>
  );
};
