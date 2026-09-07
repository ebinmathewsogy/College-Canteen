import React, { useState, useMemo } from 'react';
import { CANTEEN_ITEMS } from '../data/menuData';
import { MenuItem } from '../types';
import { 
  Search, 
  Plus, 
  Sparkles, 
  Clock, 
  Leaf, 
  Drumstick, 
  Egg, 
  Ticket, 
  Coffee, 
  IceCream, 
  Cookie, 
  Flame, 
  GlassWater,
  Utensils
} from 'lucide-react';

interface CanteenMenuProps {
  onSelectItemForToken: (item: MenuItem) => void;
}

export const CanteenMenu: React.FC<CanteenMenuProps> = ({ onSelectItemForToken }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [onlyFullTime, setOnlyFullTime] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'All Items', icon: Utensils, count: CANTEEN_ITEMS.length },
    { id: 'breakfast', label: 'Breakfast (08:00 AM - 10:00 AM)', icon: Clock, count: CANTEEN_ITEMS.filter(i => i.category === 'breakfast').length },
    { id: 'meals', label: 'Lunch Meals (12:00 PM - 01:30 PM)', icon: Utensils, count: CANTEEN_ITEMS.filter(i => i.category === 'meals').length },
    { id: 'snacks', label: 'Snacks (ലഘുഭക്ഷണം)', icon: Flame, count: CANTEEN_ITEMS.filter(i => i.category === 'snacks').length },
    { id: 'teacoffee', label: 'Tea & Coffee (ചായ & കാപ്പി)', icon: Coffee, count: CANTEEN_ITEMS.filter(i => i.category === 'teacoffee').length },
    { id: 'icecream', label: 'Ice Cream (ഐസ്ക്രീം)', icon: IceCream, count: CANTEEN_ITEMS.filter(i => i.category === 'icecream').length },
    { id: 'juices', label: 'Juices & Shakes (ജ്യൂസ്)', icon: GlassWater, count: CANTEEN_ITEMS.filter(i => i.category === 'juices').length },
    { id: 'bakery', label: 'Bakery Items (ബേക്കറി)', icon: Cookie, count: CANTEEN_ITEMS.filter(i => i.category === 'bakery').length },
  ];

  const filteredItems = useMemo(() => {
    return CANTEEN_ITEMS.filter((item) => {
      // Full time filter toggle
      if (onlyFullTime && !item.isFullTime) {
        return false;
      }
      // Category
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Diet
      if (dietFilter === 'veg' && item.diet !== 'veg') {
        return false;
      }
      if (dietFilter === 'nonveg' && item.diet === 'veg') {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchMal = item.nameMalayalam.includes(searchQuery);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchMal && !matchDesc && !matchTag) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, dietFilter, onlyFullTime]);

  const fullTimeCount = useMemo(() => CANTEEN_ITEMS.filter(i => i.isFullTime).length, []);

  return (
    <div id="canteen-menu-section" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      {/* Title & Section intro */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#7b1122] text-xs font-black mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>St. Berchmans College Central Canteen Menu</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Campus Dining &amp; Refreshment Menu
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Bilingual Malayalam &amp; English menu. Freshly prepared under FSSAI food safety standards.
          </p>
        </div>

        {/* Quick Full-Time Switch and Diets */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Full-time button highlight */}
          <button
            type="button"
            onClick={() => setOnlyFullTime(!onlyFullTime)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
              onlyFullTime
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${onlyFullTime ? 'bg-white' : 'bg-emerald-500 animate-pulse'}`}></span>
            <span>Full Time Items ({fullTimeCount})</span>
          </button>

          {/* Veg / Non-Veg filter toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setDietFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                dietFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Diets
            </button>
            <button
              type="button"
              onClick={() => setDietFilter('veg')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                dietFilter === 'veg'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Leaf className="w-3 h-3" />
              <span>Veg</span>
            </button>
            <button
              type="button"
              onClick={() => setDietFilter('nonveg')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                dietFilter === 'nonveg'
                  ? 'bg-rose-700 text-white shadow-xs'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              <Drumstick className="w-3 h-3" />
              <span>Non-Veg</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Category Filter Row */}
      <div className="space-y-3">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by English or Malayalam name (e.g. Pazham Pori, ചായ, Falooda, Puffs, Meals, Biryani)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7b1122] shadow-xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700 px-1.5 py-0.5"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pill Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (onlyFullTime && cat.id !== 'all') {
                    // keep fulltime or leave
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#7b1122] text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Menu Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-2">
          <p className="text-slate-500 text-sm font-semibold">
            No canteen items found matching your filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setDietFilter('all');
              setOnlyFullTime(false);
            }}
            className="text-xs font-bold text-[#7b1122] hover:underline"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item) => {
            return (
              <div
                key={item.id}
                className="group rounded-3xl bg-white border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all hover:border-amber-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Popular Ribbon if applicable */}
                {item.popular && (
                  <div className="absolute top-0 right-0">
                    <span className="px-3 py-1 rounded-bl-xl bg-amber-400 text-slate-950 font-black text-[10px] tracking-wider uppercase shadow-xs">
                      Popular
                    </span>
                  </div>
                )}

                <div className="space-y-2.5">
                  {/* Category & Diet Badge Header */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-extrabold uppercase border ${
                        item.diet === 'veg'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : item.diet === 'egg'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {item.diet === 'veg' && <Leaf className="w-2.5 h-2.5" />}
                      {item.diet === 'egg' && <Egg className="w-2.5 h-2.5" />}
                      {item.diet === 'nonveg' && <Drumstick className="w-2.5 h-2.5" />}
                      <span>{item.diet}</span>
                    </span>

                    {/* Full Time Badge Highlight */}
                    {item.isFullTime ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black bg-emerald-100/80 text-emerald-900 border border-emerald-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                        <span>Full Time Available</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{item.timing}</span>
                      </span>
                    )}
                  </div>

                  {/* Malayalam Name and English Name */}
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-[#7b1122] transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs font-bold text-[#7b1122] mt-0.5 font-serif">
                      {item.nameMalayalam}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  <p className="text-[11px] text-slate-500 italic line-clamp-1">
                    {item.descriptionMalayalam}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Generate Token CTA */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Canteen Rate
                    </span>
                    <span className="text-xl font-black text-slate-900 tracking-tight">
                      ₹{item.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectItemForToken(item)}
                    className="px-4 py-2 rounded-xl bg-[#7b1122] hover:bg-[#600d1a] active:scale-95 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" />
                    <span>Add to Token</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
