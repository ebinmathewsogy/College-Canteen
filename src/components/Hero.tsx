import React from 'react';
import { Ticket, Clock, CheckCircle2, Award, ArrowRight, Sparkles, Coffee, IceCream, Utensils } from 'lucide-react';
import { UserRole } from '../types';

interface HeroProps {
  onOpenTokenModal: (role?: UserRole) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTokenModal }) => {
  return (
    <div className="relative bg-gradient-to-b from-[#7b1122] via-[#6a0e1c] to-[#550b17] text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>St. Berchmans College Central Campus Canteen • Changanassery</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Fast, Cashless Dining Tokens at <br />
              <span className="text-amber-400 font-serif">SB College Canteen</span>
            </h2>

            <p className="text-sm sm:text-base text-amber-100/90 max-w-2xl leading-relaxed">
              Skip dining queues in our campus canteen! Generate instant digital token passes for 
              Special Kerala Meals, Biryani, or grab <strong className="text-amber-300">Snacks, Tea, Coffee, Ice Cream, Juices, and Bakery items available full-time</strong> with bilingual Malayalam menus.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenTokenModal('student')}
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-400/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Ticket className="w-4 h-4 text-slate-950" />
                <span>Student Token (Roll No)</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                type="button"
                onClick={() => onOpenTokenModal('staff')}
                className="px-5 py-3 rounded-2xl bg-[#5c0a18] hover:bg-[#4a0813] active:scale-95 text-white font-bold text-sm border border-amber-400/30 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Faculty / Staff Token</span>
              </button>
            </div>

            {/* Timing badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-amber-200/90 pt-3">
              <div className="flex items-center gap-1.5 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Breakfast: <strong>08:00 AM - 10:00 AM</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Lunch: <strong>12:00 PM - 01:30 PM</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/15 px-2.5 py-1 rounded-lg border border-emerald-400/30 text-emerald-300">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Snacks &amp; Bakery: <strong>Full Time (08:00 AM - 05:30 PM)</strong></span>
              </div>
            </div>
          </div>

          {/* Quick Counter Card Info */}
          <div className="lg:col-span-4">
            <div className="rounded-3xl bg-white/10 backdrop-blur-md p-6 border border-white/15 text-white space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Canteen Service Desks
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  LIVE OPEN
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-[#550b17]/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">Counter 1: Meals &amp; Tiffin</div>
                    <div className="text-amber-200/80 text-[11px]">Meals, Biryani, Appam, Dosa</div>
                  </div>
                  <span className="font-mono font-black text-amber-400">Tokens 1 - 200</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#550b17]/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">Counter 2: Tea, Snacks &amp; Bakery</div>
                    <div className="text-amber-200/80 text-[11px]">Chai, Coffee, Pazham Pori, Puffs</div>
                  </div>
                  <span className="font-mono font-black text-amber-400">Full Time</span>
                </div>

                <div className="p-3 rounded-2xl bg-[#550b17]/60 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-white text-sm">Counter 3: Ice Cream &amp; Juices</div>
                    <div className="text-amber-200/80 text-[11px]">Falooda, Sharjah Shake, Kulukki</div>
                  </div>
                  <span className="font-mono font-black text-amber-400">Full Time</span>
                </div>
              </div>

              <p className="text-[11px] text-amber-200/70 text-center italic">
                Show digital token on mobile or print paper slip at the collection counter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
