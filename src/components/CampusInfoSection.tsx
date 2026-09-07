import React from 'react';
import { Clock, ShieldCheck, Award, HeartHandshake, Coffee, IceCream, Utensils } from 'lucide-react';

export const CampusInfoSection: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* College Info Cards */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#7b1122]">
          Campus Dining Services
        </span>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          St. Berchmans College Central Canteen Services
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Providing wholesome, nutritious, and subsidized dining to over 3,500 students, faculty, and campus visitors daily in Changanassery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Operating Hours & Full-Time Services */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-[#7b1122] flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-slate-900 text-base">
            Counter Operating Hours
          </h4>
          <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
            <li className="flex justify-between border-b border-slate-100 pb-1">
              <span>Breakfast (Puttu, Appam, Dosa):</span>
              <strong className="text-slate-800">08:00 AM - 10:00 AM</strong>
            </li>
            <li className="flex justify-between border-b border-slate-100 pb-1">
              <span>Lunch (Kerala Meals &amp; Biryani):</span>
              <strong className="text-slate-800">12:00 PM - 01:30 PM</strong>
            </li>
            <li className="flex justify-between border-b border-slate-100 pb-1 text-emerald-800 font-bold bg-emerald-50/60 px-1 rounded">
              <span>Snacks, Tea &amp; Coffee:</span>
              <strong className="text-emerald-900">Full Time (08 AM - 05:30 PM)</strong>
            </li>
            <li className="flex justify-between text-pink-800 font-bold bg-pink-50/60 px-1 rounded">
              <span>Ice Cream, Juices &amp; Bakery:</span>
              <strong className="text-pink-900">Full Time (08 AM - 05:30 PM)</strong>
            </li>
          </ul>
        </div>

        {/* Card 2: Hygiene & Safety */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-slate-900 text-base">
            Hygiene &amp; Quality Guarantee
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            All ingredients are sourced locally from organic suppliers in Kottayam district. Meals, snacks, and bakery pastries are cooked in stainless steel industrial steam kitchens under rigorous FSSAI food safety protocols.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-bold text-[#7b1122]">
            <Award className="w-4 h-4 text-amber-600" />
            <span>FSSAI Certified Campus Kitchen</span>
          </div>
        </div>

        {/* Card 3: Subsidized Rates */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-slate-900 text-base">
            Subsidized Campus Student Rates
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            St. Berchmans College offers subsidized food rates for regular enrolled students with verified college roll numbers, ensuring quality nutrition at student-friendly costs.
          </p>
          <div className="pt-2 text-xs text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-xl">
            Meals: ₹40–50 • Biryani: ₹100–110 • Tea: ₹8–10 • Snacks: ₹12–15 • Puffs: ₹18–28
          </div>
        </div>
      </div>

      {/* Designer Ribbon */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#7b1122] via-[#5c0a18] to-[#450711] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border border-amber-400/20">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
            System Designer &amp; Developer
          </span>
          <h4 className="text-lg font-black tracking-tight">
            Designed by Ebin Mathew Sogy
          </h4>
          <p className="text-xs text-amber-100/80">
            St. Berchmans College (SB College), Changanassery • Campus Technology Innovation
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-extrabold text-xs shrink-0 shadow-md">
          Changanassery, Kerala
        </div>
      </div>
    </section>
  );
};
