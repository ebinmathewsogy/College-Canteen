import React from 'react';
import { Coffee, Sparkles, Clock, Ticket, CheckCircle2 } from 'lucide-react';
import { MenuItem } from '../types';
import { CAFETERIA_ITEMS } from '../data/menuData';

interface CafeteriaMenuProps {
  onSelectItemForToken: (item: MenuItem) => void;
}

export const CafeteriaMenu: React.FC<CafeteriaMenuProps> = ({ onSelectItemForToken }) => {
  return (
    <section id="cafeteria" className="py-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5 text-left">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300">
              <Coffee className="w-3.5 h-3.5 text-amber-700" />
              <span>EXPRESS CAFETERIA KIOSK (കഫറ്റീരിയ)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Express Bakery, Hot Tea &amp; Coffee
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
              Dedicated express window that <strong className="text-slate-900">exclusively serves bakery savories, fresh hot tea, and filter coffee full time (8:00 AM – 5:00 PM)</strong> for quick campus break intervals.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-900 border border-emerald-300 px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0">
            <Clock className="w-4 h-4 text-emerald-700" />
            <span>Non-Stop Full Time: 8:00 AM – 5:00 PM</span>
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/10 border border-amber-300/80 flex flex-wrap items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Quick Grab &amp; Go Window (എക്സ്പ്രസ്സ് വിൻഡോ)
              </h4>
              <p className="text-xs text-slate-600">
                Collect your token online without paying, show your digital token ID, and pick up hot bakery snacks instantly.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Zero Cashless Waiting</span>
          </div>
        </div>

        {/* Grid of Cafeteria Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAFETERIA_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-amber-400 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group text-left"
            >
              <div className="space-y-3">
                {/* Diet + Price */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
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
                        Top Seller
                      </span>
                    )}
                  </div>
                  <span className="text-lg font-extrabold text-slate-900 font-mono">
                    ₹{item.price}
                  </span>
                </div>

                {/* Name & Malayalam Screening */}
                <div>
                  <h4 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition-colors leading-snug">
                    {item.name}
                  </h4>
                  {/* Prominent Malayalam Screening */}
                  <div className="mt-1 inline-block text-xs font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {item.nameMalayalam}
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
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

              {/* Action */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  Full Time 8 AM – 5 PM
                </span>

                <button
                  type="button"
                  onClick={() => onSelectItemForToken(item)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-[#7b1122] text-amber-950 hover:text-white border border-amber-300 hover:border-[#7b1122] text-xs font-bold transition-all shadow-2xs"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>Collect Token</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
