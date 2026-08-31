import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Clock, 
  Sparkles, 
  Ticket, 
  Coffee, 
  Flame,
  Sun,
  CheckCircle2
} from 'lucide-react';
import { MenuItem } from '../types';
import { 
  CANTEEN_BREAKFAST_ITEMS, 
  CANTEEN_LUNCH_ITEMS, 
  CANTEEN_ALLDAY_BEVERAGES_SNACKS 
} from '../data/menuData';

interface CanteenMenuProps {
  onSelectItemForToken: (item: MenuItem) => void;
}

export const CanteenMenu: React.FC<CanteenMenuProps> = ({ onSelectItemForToken }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'breakfast' | 'lunch' | 'allday'>('all');

  return (
    <section id="canteen" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1.5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#fbf2f4] text-[#7b1122] border border-rose-200">
            <UtensilsCrossed className="w-3.5 h-3.5 text-[#7b1122]" />
            <span>MAIN CANTEEN (മെയിൻ കാന്റീൻ)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Canteen Menu &amp; Dining Timings
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Authentic Kerala breakfast &amp; lunch meals, plus <strong className="text-slate-900">all-day fresh juices, snacks, tea and coffee continuously available from 8:00 AM to 5:00 PM</strong>.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 overflow-x-auto text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'all' ? 'bg-[#7b1122] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Items
          </button>
          <button
            onClick={() => setActiveTab('breakfast')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'breakfast' ? 'bg-[#7b1122] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Breakfast (8–11:30 AM)
          </button>
          <button
            onClick={() => setActiveTab('lunch')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'lunch' ? 'bg-[#7b1122] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lunch (12–2:30 PM)
          </button>
          <button
            onClick={() => setActiveTab('allday')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'allday' ? 'bg-[#7b1122] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All-Day (8 AM–5 PM)
          </button>
        </div>
      </div>

      {/* 1. MORNING BREAKFAST SECTION */}
      {(activeTab === 'all' || activeTab === 'breakfast') && (
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between bg-amber-50/70 border border-amber-200 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-600" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Morning Breakfast (പ്രഭാതഭക്ഷണം)
              </h3>
            </div>
            <span className="text-xs font-semibold text-amber-900 bg-amber-200/70 px-2.5 py-0.5 rounded-full">
              8:00 AM – 11:30 AM
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CANTEEN_BREAKFAST_ITEMS.map((item) => (
              <FoodItemCard key={item.id} item={item} onSelect={onSelectItemForToken} />
            ))}
          </div>
        </div>
      )}

      {/* 2. LUNCH MESS SECTION */}
      {(activeTab === 'all' || activeTab === 'lunch') && (
        <div className="space-y-4 text-left pt-2">
          <div className="flex items-center justify-between bg-rose-50/70 border border-rose-200 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#7b1122]" />
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                Lunch Mess Specials (ഉച്ചഭക്ഷണം)
              </h3>
            </div>
            <span className="text-xs font-semibold text-rose-900 bg-rose-200/70 px-2.5 py-0.5 rounded-full">
              12:00 PM – 2:30 PM
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CANTEEN_LUNCH_ITEMS.map((item) => (
              <FoodItemCard key={item.id} item={item} onSelect={onSelectItemForToken} />
            ))}
          </div>
        </div>
      )}

      {/* 3. ALL-DAY CONTINUOUS ITEMS (JUICES, SNACKS, TEA & COFFEE) */}
      {(activeTab === 'all' || activeTab === 'allday') && (
        <div className="space-y-4 text-left pt-2">
          <div className="flex items-center justify-between bg-emerald-50/70 border border-emerald-200 px-4 py-2.5 rounded-xl">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-emerald-700" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  All-Day Juices, Snacks, Bakery, Tea &amp; Coffee
                </h3>
                <span className="text-xs text-emerald-800">
                  ജ്യൂസുകൾ, സ്നാക്സ്, ചായ, കാപ്പി (മുഴുവൻ സമയവും ലഭ്യമാണ്)
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-900 bg-emerald-200/70 px-2.5 py-0.5 rounded-full shrink-0">
              Continuous 8:00 AM – 5:00 PM
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {CANTEEN_ALLDAY_BEVERAGES_SNACKS.map((item) => (
              <FoodItemCard key={item.id} item={item} onSelect={onSelectItemForToken} />
            ))}
          </div>
        </div>
      )}

    </section>
  );
};

interface FoodCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

const FoodItemCard: React.FC<FoodCardProps> = ({ item, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 p-4.5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div className="space-y-2.5">
        
        {/* Diet indicator and price */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-3 h-3 rounded-full shrink-0 border ${
                item.diet === 'veg'
                  ? 'bg-emerald-500 border-emerald-600'
                  : item.diet === 'egg'
                  ? 'bg-amber-500 border-amber-600'
                  : 'bg-red-500 border-red-600'
              }`}
              title={item.diet.toUpperCase()}
            />
            {item.popular && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200">
                <Sparkles className="w-2.5 h-2.5 text-amber-700" />
                Popular
              </span>
            )}
          </div>
          <span className="text-base font-extrabold text-slate-900 font-mono">
            ₹{item.price}
          </span>
        </div>

        {/* Item Title & Malayalam Screening */}
        <div>
          <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#7b1122] transition-colors leading-snug">
            {item.name}
          </h4>
          {/* Prominent Malayalam Screening */}
          <div className="mt-1 inline-block text-xs font-semibold text-[#7b1122] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            {item.nameMalayalam}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-500 leading-relaxed">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 pt-1">
          {item.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action */}
      <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {item.timing.split('(')[0]}
        </span>

        <button
          type="button"
          onClick={() => onSelect(item)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-[#7b1122] text-[#7b1122] hover:text-white border border-amber-200 hover:border-[#7b1122] text-xs font-bold transition-all shadow-2xs"
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>Get Token</span>
        </button>
      </div>
    </div>
  );
};
