import React from 'react';
import { Clock, ShieldCheck, Award, HeartHandshake, Coffee, IceCream, Utensils, Sparkles, CheckCircle2 } from 'lucide-react';

export const CampusInfoSection: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* College Info Section Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2.5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-red-100 to-amber-100 text-[#7b1122] text-xs font-black uppercase tracking-wider border border-amber-300/60 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>CAMPUS DINING EXCELLENCE</span>
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          St. Berchmans College Central Canteen Services
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          Providing wholesome, nutritious, and subsidized dining to over 3,500 students, faculty, and campus researchers daily in Changanassery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Operating Hours & Full-Time Services */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-rose-50/50 via-white to-white border border-rose-200/80 shadow-md hover:shadow-xl transition-all space-y-3.5 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 to-red-600 text-white flex items-center justify-center shadow-md">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-black text-slate-900 text-base">
            Counter Operating Hours
          </h4>
          <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <li className="flex justify-between items-center border-b border-rose-100/60 pb-1.5">
              <span className="font-semibold text-slate-700">Breakfast (Puttu, Appam, Dosa):</span>
              <span className="font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                08:00 – 10:00 AM
              </span>
            </li>
            <li className="flex justify-between items-center border-b border-rose-100/60 pb-1.5">
              <span className="font-semibold text-slate-700">Lunch (Kerala Meals &amp; Biryani):</span>
              <span className="font-bold text-rose-900 bg-rose-100 px-2 py-0.5 rounded-md border border-rose-200">
                12:00 – 01:30 PM
              </span>
            </li>
            <li className="flex justify-between items-center border-b border-rose-100/60 pb-1.5 text-emerald-900 font-bold bg-emerald-50/80 px-2 py-1 rounded-xl border border-emerald-200">
              <span>Snacks, Tea &amp; Coffee:</span>
              <span className="text-emerald-950 font-black">Full Time (08 AM – 05:30 PM)</span>
            </li>
            <li className="flex justify-between items-center text-pink-900 font-bold bg-pink-50/80 px-2 py-1 rounded-xl border border-pink-200">
              <span>Ice Cream, Juices &amp; Bakery:</span>
              <span className="text-pink-950 font-black">Full Time (08 AM – 05:30 PM)</span>
            </li>
          </ul>
        </div>

        {/* Card 2: Hygiene & Safety */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-amber-50/50 via-white to-white border border-amber-200/80 shadow-md hover:shadow-xl transition-all space-y-3.5 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center shadow-md">
            <ShieldCheck className="w-6 h-6 text-slate-950" />
          </div>
          <h4 className="font-black text-slate-900 text-base">
            Hygiene &amp; Quality Guarantee
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            All ingredients are sourced locally from certified organic suppliers in Kottayam district. Meals, snacks, and bakery pastries are prepared in stainless steel industrial steam kitchens under rigorous FSSAI food safety protocols.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-black text-[#7b1122]">
            <Award className="w-4 h-4 text-amber-600" />
            <span>FSSAI Certified Campus Kitchen</span>
          </div>
        </div>

        {/* Card 3: Subsidized Rates */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-emerald-50/50 via-white to-white border border-emerald-200/80 shadow-md hover:shadow-xl transition-all space-y-3.5 relative overflow-hidden group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex items-center justify-center shadow-md">
            <HeartHandshake className="w-6 h-6 text-white" />
          </div>
          <h4 className="font-black text-slate-900 text-base">
            Subsidized Campus Student Rates
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed font-normal">
            St. Berchmans College provides subsidized food rates for regular enrolled students with verified college roll numbers, ensuring high-quality nutrition at student-friendly rates.
          </p>
          <div className="pt-2 text-xs text-emerald-900 font-bold bg-emerald-100/70 p-3 rounded-2xl border border-emerald-300 space-y-1">
            <div className="flex justify-between">
              <span>Meals: ₹40–50</span>
              <span>Biryani: ₹100–110</span>
            </div>
            <div className="flex justify-between text-[11px] text-emerald-800">
              <span>Tea/Chai: ₹8–10</span>
              <span>Snacks: ₹12–15</span>
              <span>Puffs: ₹18–28</span>
            </div>
          </div>
        </div>
      </div>

      {/* Designer & Heritage Card with Vibrant Royal Crimson and Gold */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#7b1122] via-[#5c0a18] to-[#450711] text-white flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl border border-amber-400/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="space-y-1.5 text-center sm:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-black tracking-widest text-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CAMPUS DIGITAL TOKEN SYSTEM</span>
          </div>
          <h4 className="text-xl font-black tracking-tight text-white">
            Designed by Ebin Mathew Sogy
          </h4>
          <p className="text-xs text-amber-100/90 font-medium">
            St. Berchmans College (Autonomous), Changanassery • NAAC A++ Grade (CGPA 3.66)
          </p>
        </div>

        <div className="flex items-center gap-2 relative z-10 shrink-0">
          <span className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs shadow-md border border-amber-200">
            Changanassery, Kerala
          </span>
        </div>
      </div>
    </section>
  );
};
