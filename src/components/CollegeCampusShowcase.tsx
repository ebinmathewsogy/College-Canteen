import React from 'react';
import { 
  Clock, 
  Coffee, 
  IceCream, 
  Utensils, 
  CheckCircle2, 
  Sparkles, 
  Sun, 
  Flame, 
  Cookie, 
  ArrowRight,
  ShieldCheck,
  Building,
  GlassWater,
  Tag
} from 'lucide-react';

interface CollegeCampusShowcaseProps {
  onSelectCategory?: (category: string) => void;
}

export const CollegeCampusShowcase: React.FC<CollegeCampusShowcaseProps> = ({ onSelectCategory }) => {
  const scrollToMenuCategory = (cat: string) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
    const elem = document.getElementById('canteen-menu-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-10 mb-10 relative z-20">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden">
        
        {/* Top Header Showcase Banner with Deep Burgundy & Gold Accents */}
        <div className="bg-gradient-to-r from-[#7b1122] via-[#650c1b] via-[#4e0915] to-[#3a060f] text-white p-6 sm:p-8 border-b border-amber-400/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-rose-500/15 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400/25 to-yellow-400/20 text-amber-300 text-xs font-black border border-amber-400/30 shadow-xs">
                  <Building className="w-3.5 h-3.5 text-amber-400" />
                  <span>SB COLLEGE CAMPUS CENTRAL CANTEEN</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-400/40 font-bold text-xs">
                  NAAC A++ Grade (CGPA 3.66)
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white font-medium text-xs border border-white/15">
                  Est. 1922 • Changanassery
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                Official Campus Meal Timings &amp; Subsidized Kerala Rates
              </h3>
              <p className="text-xs sm:text-sm text-amber-100/90 font-normal max-w-3xl leading-relaxed">
                Wholesome, freshly prepared South Indian dining cooked daily in industrial steam kitchens. Governed by college canteen advisory committee with heavily subsidized rates for students and staff.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-center px-5 shadow-lg">
                <div className="text-2xl sm:text-3xl font-black text-amber-400">3,500+</div>
                <div className="text-[10px] text-amber-100 font-extrabold uppercase tracking-wider">Daily Meals Served</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Main Dining Schedules & Rates Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 bg-white">
          
          {/* Card 1: Morning Breakfast Service (Vibrant Golden Sunrise) */}
          <div className="p-6 sm:p-7 flex flex-col justify-between space-y-6 bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-white hover:from-amber-500/15 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xs flex items-center gap-1.5 shadow-sm">
                  <Sun className="w-3.5 h-3.5 text-white" />
                  <span>MORNING BREAKFAST</span>
                </span>
                <span className="font-mono text-xs font-black text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-lg border border-amber-300">
                  Counter 1
                </span>
              </div>

              <div>
                <div className="text-xl font-black text-slate-900 tracking-tight">
                  Kerala Breakfast Service
                </div>
                <div className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-black text-amber-950 bg-amber-100/90 px-3 py-1 rounded-xl border border-amber-300 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  <span>08:00 AM – 10:00 AM Daily</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Piping hot steamed puttu with slow-roasted kadala curry, soft lacy vellayappams with spiced egg roast, thattu dosas, and crispy ghee roast at subsidized student rates.
              </p>

              {/* Rates Breakdown with Colorful Badges */}
              <div className="pt-3 border-t border-amber-200/60 space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-amber-100/60">
                  <span className="text-slate-700 font-semibold">Nadan Puttu &amp; Kadala:</span>
                  <span className="font-mono font-black text-amber-950 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-200">₹30</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-amber-100/60">
                  <span className="text-slate-700 font-semibold">Vellayappam &amp; Egg Roast (3 Pcs):</span>
                  <span className="font-mono font-black text-amber-950 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-200">₹35</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-amber-100/60">
                  <span className="text-slate-700 font-semibold">Thattu Dosa Set with Sambar (3 Pcs):</span>
                  <span className="font-mono font-black text-amber-950 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-200">₹30</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-amber-100/60">
                  <span className="text-slate-700 font-semibold">Crispy Ghee Roast / Masala Dosa:</span>
                  <span className="font-mono font-black text-amber-950 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-200">₹40</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-700 font-semibold">Poori Masala (3 Nos):</span>
                  <span className="font-mono font-black text-amber-950 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-200">₹35</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToMenuCategory('breakfast')}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-400/25 cursor-pointer active:scale-98 border border-amber-200"
            >
              <span>Explore Breakfast Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 2: Campus Lunch Service (Rich Savory Spiced Ruby) */}
          <div className="p-6 sm:p-7 flex flex-col justify-between space-y-6 bg-gradient-to-b from-rose-500/10 via-red-500/5 to-white hover:from-rose-500/15 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-400/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs flex items-center gap-1.5 shadow-sm">
                  <Utensils className="w-3.5 h-3.5 text-white" />
                  <span>CAMPUS LUNCH MEALS</span>
                </span>
                <span className="font-mono text-xs font-black text-rose-900 bg-rose-200/70 px-2.5 py-0.5 rounded-lg border border-rose-300">
                  Counter 1
                </span>
              </div>

              <div>
                <div className="text-xl font-black text-slate-900 tracking-tight">
                  Kerala Meals &amp; Biryani
                </div>
                <div className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-black text-rose-950 bg-rose-100/90 px-3 py-1 rounded-xl border border-rose-300 shadow-xs">
                  <Clock className="w-3.5 h-3.5 text-rose-700" />
                  <span>12:00 PM – 01:30 PM Daily</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Wholesome boiled matta rice with sambar, pulissery, avial, thoran, authentic Kottayam kudampuli fish curry, fragrant Thalassery biryani, and flaky parotta combos.
              </p>

              {/* Rates Breakdown with Colorful Badges */}
              <div className="pt-3 border-t border-rose-200/60 space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-rose-100/60">
                  <span className="text-slate-700 font-semibold">Special Kerala Veg Meals:</span>
                  <span className="font-mono font-black text-emerald-950 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-300">₹40</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-rose-100/60">
                  <span className="text-slate-700 font-semibold">Special Fish Curry Meals:</span>
                  <span className="font-mono font-black text-rose-950 bg-rose-100 px-2.5 py-0.5 rounded-md border border-rose-200">₹50</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-rose-100/60">
                  <span className="text-slate-700 font-semibold">Thalassery Chicken Biryani:</span>
                  <span className="font-mono font-black text-rose-950 bg-rose-100 px-2.5 py-0.5 rounded-md border border-rose-200">₹100</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-rose-100/60">
                  <span className="text-slate-700 font-semibold">Kerala Parotta &amp; Beef Roast:</span>
                  <span className="font-mono font-black text-rose-950 bg-rose-100 px-2.5 py-0.5 rounded-md border border-rose-200">₹70</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-700 font-semibold">Crispy Fish Fry Special:</span>
                  <span className="font-mono font-black text-rose-950 bg-rose-100 px-2.5 py-0.5 rounded-md border border-rose-200">₹40</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToMenuCategory('meals')}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-red-700 via-rose-700 to-[#7b1122] hover:from-red-600 hover:to-rose-600 text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-rose-700/25 cursor-pointer active:scale-98 border border-rose-600"
            >
              <span>Explore Lunch Meals Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card 3: Full Time Continuous Refreshments (Lush Tropical Emerald & Mint) */}
          <div className="p-6 sm:p-7 flex flex-col justify-between space-y-6 bg-gradient-to-b from-emerald-500/10 via-teal-500/5 to-white hover:from-emerald-500/15 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs flex items-center gap-1.5 shadow-sm">
                  <Flame className="w-3.5 h-3.5 text-white" />
                  <span>CONTINUOUS ALL DAY</span>
                </span>
                <span className="font-mono text-xs font-black text-emerald-900 bg-emerald-200/70 px-2.5 py-0.5 rounded-lg border border-emerald-300">
                  Counters 2 &amp; 3
                </span>
              </div>

              <div>
                <div className="text-xl font-black text-slate-900 tracking-tight">
                  Snacks, Chai, Juices &amp; Bakery
                </div>
                <div className="inline-flex items-center gap-1.5 mt-1.5 text-xs font-black text-emerald-950 bg-emerald-100/90 px-3 py-1 rounded-xl border border-emerald-300 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>08:00 AM – 05:30 PM (Non-Stop)</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Available throughout college hours! Enjoy hot Pazham Pori, crispy Parippu Vada, spicy Egg/Chicken Puffs, Special Meter Chai, Royal Falooda, and Sharjah Shakes.
              </p>

              {/* Rates Breakdown with Colorful Badges */}
              <div className="pt-3 border-t border-emerald-200/60 space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-emerald-100/60">
                  <span className="text-slate-700 font-semibold">Special Meter Chai / Kattan:</span>
                  <span className="font-mono font-black text-emerald-950 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-200">₹8 – ₹10</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-emerald-100/60">
                  <span className="text-slate-700 font-semibold">Hot Pazham Pori / Parippu Vada:</span>
                  <span className="font-mono font-black text-emerald-950 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-200">₹12 – ₹15</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-emerald-100/60">
                  <span className="text-slate-700 font-semibold">Kerala Egg / Chicken Puffs:</span>
                  <span className="font-mono font-black text-emerald-950 bg-emerald-100 px-2.5 py-0.5 rounded-md border border-emerald-200">₹22 – ₹28</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-emerald-100/60">
                  <span className="text-slate-700 font-semibold">SB Royal Falooda &amp; Sharjah Shake:</span>
                  <span className="font-mono font-black text-pink-950 bg-pink-100 px-2.5 py-0.5 rounded-md border border-pink-200">₹50 – ₹80</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-700 font-semibold">Kulukki Sarbath / Fresh Lime:</span>
                  <span className="font-mono font-black text-teal-950 bg-teal-100 px-2.5 py-0.5 rounded-md border border-teal-200">₹25 – ₹30</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToMenuCategory('snacks')}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/25 cursor-pointer active:scale-98 border border-emerald-500"
            >
              <span>Explore Snacks &amp; Juices</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Footer info bar with Colorful Summary Pills */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-50 via-amber-50/40 to-slate-50 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-700 gap-3">
          <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
            <span className="font-black text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Canteen Timings:</span>
            </span>
            <span className="bg-amber-100/80 text-amber-950 px-2.5 py-1 rounded-lg border border-amber-300 font-bold">
              Breakfast: 08:00 – 10:00 AM
            </span>
            <span className="bg-rose-100/80 text-rose-950 px-2.5 py-1 rounded-lg border border-rose-300 font-bold">
              Lunch: 12:00 – 01:30 PM
            </span>
            <span className="bg-emerald-100/80 text-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-300 font-black">
              Full-Time: 08:00 AM – 05:30 PM
            </span>
          </div>

          <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5 shrink-0">
            <span>Changanassery, Kottayam District, Kerala</span>
          </div>
        </div>

      </div>
    </section>
  );
};
