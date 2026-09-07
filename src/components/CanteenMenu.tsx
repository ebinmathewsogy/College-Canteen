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
  Utensils,
  Sun,
  Check,
  Tag,
  Percent
} from 'lucide-react';

interface CanteenMenuProps {
  onSelectItemForToken: (item: MenuItem) => void;
  activeCategoryOverride?: string;
}

// Quick Search Tags with individual accent colors
const POPULAR_QUICK_TAGS = [
  { name: 'Puttu & Kadala', color: 'hover:bg-amber-100 hover:text-amber-900 border-amber-200' },
  { name: 'Kerala Meals', color: 'hover:bg-red-100 hover:text-red-900 border-red-200' },
  { name: 'Chicken Biryani', color: 'hover:bg-orange-100 hover:text-orange-900 border-orange-200' },
  { name: 'Appam & Egg Roast', color: 'hover:bg-yellow-100 hover:text-yellow-900 border-yellow-200' },
  { name: 'Dosa', color: 'hover:bg-amber-100 hover:text-amber-900 border-amber-200' },
  { name: 'Pazham Pori', color: 'hover:bg-orange-100 hover:text-orange-900 border-orange-200' },
  { name: 'Meter Chai', color: 'hover:bg-amber-100 hover:text-amber-900 border-amber-200' },
  { name: 'Royal Falooda', color: 'hover:bg-pink-100 hover:text-pink-900 border-pink-200' },
  { name: 'Chicken Puffs', color: 'hover:bg-rose-100 hover:text-rose-900 border-rose-200' },
  { name: 'Sharjah Shake', color: 'hover:bg-teal-100 hover:text-teal-900 border-teal-200' },
];

// Color and aesthetic mapping per category
const CATEGORY_THEMES: Record<string, {
  tabActiveGradient: string;
  tabIconColor: string;
  cardAccentBar: string;
  cardLightBg: string;
  cardHoverBorder: string;
  badgeBg: string;
  badgeText: string;
}> = {
  all: {
    tabActiveGradient: 'bg-gradient-to-r from-[#7b1122] via-[#650c1b] to-[#4e0915] text-white',
    tabIconColor: 'text-amber-300',
    cardAccentBar: 'from-amber-400 via-rose-500 to-[#7b1122]',
    cardLightBg: 'group-hover:bg-gradient-to-b group-hover:from-amber-50/40 group-hover:to-white',
    cardHoverBorder: 'hover:border-amber-400',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
  },
  breakfast: {
    tabActiveGradient: 'bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-slate-950',
    tabIconColor: 'text-amber-500',
    cardAccentBar: 'from-amber-400 via-orange-400 to-yellow-400',
    cardLightBg: 'group-hover:bg-gradient-to-b group-hover:from-amber-50/60 group-hover:to-white',
    cardHoverBorder: 'hover:border-amber-400',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
  },
  meals: {
    tabActiveGradient: 'bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 text-white',
    tabIconColor: 'text-rose-500',
    cardAccentBar: 'from-red-600 via-rose-500 to-orange-500',
    cardLightBg: 'group-hover:bg-gradient-to-b group-hover:from-rose-50/60 group-hover:to-white',
    cardHoverBorder: 'hover:border-rose-400',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-900',
  },
  snacks: {
    tabActiveGradient: 'bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-slate-950',
    tabIconColor: 'text-orange-500',
    cardAccentBar: 'from-orange-500 via-amber-400 to-yellow-400',
    cardLightBg: 'group-hover:bg-gradient-to-b group-hover:from-orange-50/60 group-hover:to-white',
    cardHoverBorder: 'hover:border-orange-400',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-900',
  },
  teacoffee: {
    tabActiveGradient: 'bg-gradient-to-r from-amber-800 via-amber-700 to-orange-800 text-white',
    tabIconColor: 'text-amber-700',
    cardAccentBar: 'from-amber-700 via-amber-600 to-orange-500',
    cardLightBg: 'group-hover:bg-gradient-to-b group-hover:from-amber-50/60 group-hover:to-white',
    cardHoverBorder: 'hover:border-amber-600',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-950',
  },
  icecream: {
    tabActiveGradient: 'bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 text-white',
    tabIconColor: 'text-pink-500',
    cardAccentBar: 'from-pink-500 via-rose-400 to-purple-400',
    cardLightBg: 'group-hover:bg-gradient-to-b group-hover:from-pink-50/60 group-hover:to-white',
    cardHoverBorder: 'hover:border-pink-400',
    badgeBg: 'bg-pink-100',
    badgeText: 'text-pink-900',
  },
  juices: {
    tabActiveGradient: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white',
    tabIconColor: 'text-emerald-500',
    cardAccentBar: 'from-emerald-400 via-teal-400 to-cyan-400',
    cardLightBg: 'group-hover:bg-gradient-to-b group-hover:from-emerald-50/60 group-hover:to-white',
    cardHoverBorder: 'hover:border-emerald-400',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
  },
  bakery: {
    tabActiveGradient: 'bg-gradient-to-r from-amber-600 via-orange-500 to-yellow-600 text-white',
    tabIconColor: 'text-amber-600',
    cardAccentBar: 'from-amber-500 via-orange-400 to-yellow-500',
    cardLightBg: 'group-hover:bg-gradient-to-b group-hover:from-amber-50/60 group-hover:to-white',
    cardHoverBorder: 'hover:border-amber-500',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
  },
};

export const CanteenMenu: React.FC<CanteenMenuProps> = ({ 
  onSelectItemForToken,
  activeCategoryOverride
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategoryOverride || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'nonveg'>('all');
  const [onlyFullTime, setOnlyFullTime] = useState<boolean>(false);
  const [addedItemEffect, setAddedItemEffect] = useState<string | null>(null);

  // Synchronize category if overridden externally
  React.useEffect(() => {
    if (activeCategoryOverride) {
      setSelectedCategory(activeCategoryOverride);
    }
  }, [activeCategoryOverride]);

  const categories = [
    { id: 'all', label: 'All Items', icon: Utensils, count: CANTEEN_ITEMS.length, themeKey: 'all' },
    { id: 'breakfast', label: 'Breakfast (08–10 AM)', icon: Sun, count: CANTEEN_ITEMS.filter(i => i.category === 'breakfast').length, themeKey: 'breakfast' },
    { id: 'meals', label: 'Lunch Meals (12–01:30 PM)', icon: Utensils, count: CANTEEN_ITEMS.filter(i => i.category === 'meals').length, themeKey: 'meals' },
    { id: 'snacks', label: 'Snacks & Quick Bites', icon: Flame, count: CANTEEN_ITEMS.filter(i => i.category === 'snacks').length, themeKey: 'snacks' },
    { id: 'teacoffee', label: 'Tea & Coffee', icon: Coffee, count: CANTEEN_ITEMS.filter(i => i.category === 'teacoffee').length, themeKey: 'teacoffee' },
    { id: 'icecream', label: 'Ice Cream & Sundaes', icon: IceCream, count: CANTEEN_ITEMS.filter(i => i.category === 'icecream').length, themeKey: 'icecream' },
    { id: 'juices', label: 'Juices & Shakes', icon: GlassWater, count: CANTEEN_ITEMS.filter(i => i.category === 'juices').length, themeKey: 'juices' },
    { id: 'bakery', label: 'Bakery & Puffs', icon: Cookie, count: CANTEEN_ITEMS.filter(i => i.category === 'bakery').length, themeKey: 'bakery' },
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
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchTag = item.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchName && !matchDesc && !matchTag) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, dietFilter, onlyFullTime]);

  const fullTimeCount = useMemo(() => CANTEEN_ITEMS.filter(i => i.isFullTime).length, []);

  const handleAddItemWithEffect = (item: MenuItem) => {
    setAddedItemEffect(item.id);
    onSelectItemForToken(item);
    setTimeout(() => {
      setAddedItemEffect(null);
    }, 1200);
  };

  return (
    <div id="canteen-menu-section" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-7">
      
      {/* Section Header with Colorful Accents */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400/20 via-rose-500/15 to-pink-500/15 text-[#7b1122] text-xs font-black mb-2.5 shadow-xs border border-amber-400/30">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>ST. BERCHMANS COLLEGE CAMPUS CANTEEN MENU</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Vibrant Campus Menu &amp; Subsidized Rates
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-2xl leading-relaxed">
            Freshly prepared under strict FSSAI hygiene standards. Color-coded food categories with subsidized student rates across all campus counters.
          </p>
        </div>

        {/* Quick Filter Controls with Colorful Accents */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          
          {/* Full-time button highlight */}
          <button
            type="button"
            onClick={() => setOnlyFullTime(!onlyFullTime)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black transition-all cursor-pointer border shadow-sm ${
              onlyFullTime
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-400/30'
                : 'bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${onlyFullTime ? 'bg-white' : 'bg-emerald-500 animate-ping'}`}></span>
            <span>Full Time Active ({fullTimeCount})</span>
          </button>

          {/* Veg / Non-Veg Diet segmented control */}
          <div className="flex items-center gap-1 bg-slate-200/90 p-1.5 rounded-2xl border border-slate-300">
            <button
              type="button"
              onClick={() => setDietFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                dietFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Dishes
            </button>

            <button
              type="button"
              onClick={() => setDietFilter('veg')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                dietFilter === 'veg'
                  ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-xs'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Veg</span>
            </button>

            <button
              type="button"
              onClick={() => setDietFilter('nonveg')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                dietFilter === 'nonveg'
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-xs'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              <Drumstick className="w-3.5 h-3.5" />
              <span>Non-Veg</span>
            </button>
          </div>

        </div>
      </div>

      {/* Search and Category Filter Row */}
      <div className="space-y-4">
        
        {/* Search input with quick-tags */}
        <div className="space-y-2.5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Puttu, Kerala Meals, Biryani, Pazham Pori, Chai, Falooda, Puffs)..."
              className="w-full pl-11 pr-20 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7b1122] shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400 hover:text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick-tags suggestions with individual color themes */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-500 font-extrabold text-[11px] shrink-0 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-amber-600" />
              <span>Popular Picks:</span>
            </span>
            {POPULAR_QUICK_TAGS.map((tag) => (
              <button
                key={tag.name}
                type="button"
                onClick={() => setSearchQuery(tag.name)}
                className={`px-3 py-1 rounded-xl bg-white text-slate-700 text-[11px] font-bold shrink-0 transition-all border shadow-2xs ${tag.color} cursor-pointer active:scale-95`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        {/* Colorful Category Pill Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const theme = CATEGORY_THEMES[cat.themeKey] || CATEGORY_THEMES.all;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-black whitespace-nowrap transition-all shrink-0 cursor-pointer shadow-sm ${
                  isSelected
                    ? `${theme.tabActiveGradient} shadow-md ring-2 ring-black/10 scale-102`
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200/90'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-inherit' : theme.tabIconColor}`} />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-black ${
                    isSelected ? 'bg-black/25 text-white' : 'bg-slate-100 text-slate-600'
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
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-xs space-y-3">
          <Utensils className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-slate-700 text-sm font-bold">
            No canteen items found matching your filters or search query.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
              setDietFilter('all');
              setOnlyFullTime(false);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7b1122] to-red-700 text-white text-xs font-black hover:opacity-90 transition-all shadow-md cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => {
            const isJustAdded = addedItemEffect === item.id;
            const theme = CATEGORY_THEMES[item.category] || CATEGORY_THEMES.all;

            return (
              <div
                key={item.id}
                className={`group rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 ${theme.cardHoverBorder} flex flex-col justify-between relative overflow-hidden transform hover:-translate-y-1 ${
                  isJustAdded ? 'ring-2 ring-emerald-500 bg-emerald-50/30' : theme.cardLightBg
                }`}
              >
                {/* Category Colorful Accent Strip at Top */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${theme.cardAccentBar}`}></div>

                {/* Card Interior Padding */}
                <div className="p-5 sm:p-6 space-y-3.5">
                  
                  {/* Category & Diet Badge Header */}
                  <div className="flex items-center justify-between gap-2">
                    
                    {/* Diet Symbol with Rich Colors */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase border ${
                          item.diet === 'veg'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : item.diet === 'egg'
                            ? 'bg-amber-50 text-amber-900 border-amber-300'
                            : 'bg-rose-50 text-rose-800 border-rose-300'
                        }`}
                      >
                        {item.diet === 'veg' && <Leaf className="w-3 h-3 text-emerald-600" />}
                        {item.diet === 'egg' && <Egg className="w-3 h-3 text-amber-600" />}
                        {item.diet === 'nonveg' && <Drumstick className="w-3 h-3 text-rose-600" />}
                        <span>{item.diet}</span>
                      </span>

                      {/* Full Time or Specific Timing Badge */}
                      {item.isFullTime ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-900 border border-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                          <span>Full Time</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{item.timing}</span>
                        </span>
                      )}
                    </div>

                    {/* Popular Badge */}
                    {item.popular && (
                      <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-slate-950 font-black text-[10px] tracking-wide uppercase shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-slate-950" />
                        <span>Popular</span>
                      </span>
                    )}
                  </div>

                  {/* Dish Name */}
                  <div>
                    <h3 className="font-black text-slate-900 text-lg group-hover:text-[#7b1122] transition-colors leading-snug">
                      {item.name}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Tags with Colorful Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-lg bg-slate-100/90 text-slate-600 text-[10px] font-bold border border-slate-200/60"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price and Add to Token Action Bar */}
                <div className="p-5 sm:p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 block">
                      Kerala Student Rate
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-slate-900 tracking-tight">
                        ₹{item.price}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase">
                        Subsidized
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddItemWithEffect(item)}
                    className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs font-black flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 ${
                      isJustAdded
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                        : 'bg-gradient-to-r from-[#7b1122] via-[#650c1b] to-[#500814] hover:from-[#650c1b] hover:to-[#7b1122] text-white hover:shadow-md'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-amber-300" />
                        <span>Add to Token</span>
                      </>
                    )}
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
