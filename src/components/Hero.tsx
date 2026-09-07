import React, { useState, useEffect } from 'react';
import { 
  Ticket, 
  Clock, 
  CheckCircle2, 
  Award, 
  ArrowRight, 
  Sparkles, 
  Coffee, 
  Utensils, 
  Flame, 
  ShieldCheck, 
  Sun,
  IceCream,
  GlassWater,
  Cookie
} from 'lucide-react';
import { UserRole } from '../types';

interface HeroProps {
  onOpenTokenModal: (role?: UserRole) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTokenModal }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentMealSession, setCurrentMealSession] = useState<{
    name: string;
    timing: string;
    statusText: string;
    badgeColor: string;
    glowColor: string;
    sessionIcon: any;
  }>({
    name: 'Full Time Refreshments Active',
    timing: '08:00 AM - 05:30 PM',
    statusText: 'Hot Snacks, Chai, Coffee, Ice Cream & Shakes Live',
    badgeColor: 'from-emerald-500 to-teal-500',
    glowColor: 'bg-emerald-500/20',
    sessionIcon: Flame,
  });

  useEffect(() => {
    const updateTimeAndSession = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setCurrentTime(timeStr);

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      // Breakfast: 08:00 AM (480 min) to 10:00 AM (600 min)
      if (totalMinutes >= 480 && totalMinutes < 600) {
        setCurrentMealSession({
          name: 'Morning Breakfast Service',
          timing: '08:00 AM - 10:00 AM',
          statusText: 'Hot Puttu, Appam, Dosa, Poori & Kadala Curry Serving',
          badgeColor: 'from-amber-500 via-orange-500 to-yellow-400',
          glowColor: 'bg-amber-500/25',
          sessionIcon: Sun,
        });
      }
      // Lunch: 12:00 PM (720 min) to 01:30 PM (810 min)
      else if (totalMinutes >= 720 && totalMinutes <= 810) {
        setCurrentMealSession({
          name: 'Campus Lunch Meals Service',
          timing: '12:00 PM - 01:30 PM',
          statusText: 'Kerala Meals, Fish Curry, Chicken Biryani & Beef Fry Hot',
          badgeColor: 'from-rose-600 via-red-600 to-orange-500',
          glowColor: 'bg-rose-500/25',
          sessionIcon: Utensils,
        });
      }
      // Canteen Operating Hours: 08:00 AM (480 min) to 05:30 PM (1050 min)
      else if (totalMinutes >= 480 && totalMinutes <= 1050) {
        setCurrentMealSession({
          name: 'Full-Time Refreshment Counters',
          timing: '08:00 AM - 05:30 PM',
          statusText: 'Hot Pazham Pori, Chai, Puffs, Juices & Falooda Live',
          badgeColor: 'from-emerald-500 via-teal-500 to-cyan-500',
          glowColor: 'bg-emerald-500/25',
          sessionIcon: Flame,
        });
      } else {
        setCurrentMealSession({
          name: 'Counters Closed for Tonight',
          timing: 'Next Service: Breakfast 08:00 AM',
          statusText: 'Token Pre-Booking Active for Next Working Day',
          badgeColor: 'from-slate-600 to-slate-700',
          glowColor: 'bg-slate-500/20',
          sessionIcon: Clock,
        });
      }
    };

    updateTimeAndSession();
    const interval = setInterval(updateTimeAndSession, 1000);
    return () => clearInterval(interval);
  }, []);

  const SessionIcon = currentMealSession.sessionIcon;

  return (
    <div className="relative bg-gradient-to-br from-[#7b1122] via-[#5e0c19] via-[#480612] to-[#2b040a] text-white pt-10 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Radiant colorful atmospheric glowing orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-500/10 rounded-full blur-3xl pointer-events-none -mt-20"></div>
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-gradient-to-tr from-rose-600/25 to-pink-500/15 rounded-full blur-3xl pointer-events-none -mb-20"></div>
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-gradient-to-bl from-teal-400/15 to-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Hero Content & Quick Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Colorful Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-400/25 to-orange-400/20 text-amber-300 text-xs font-black border border-amber-400/40 shadow-sm backdrop-blur-md">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>ST. BERCHMANS COLLEGE • ESTD. 1922</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 text-xs font-black border border-emerald-400/30 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>NAAC A++ Grade (CGPA 3.66)</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/20 text-pink-200 text-xs font-bold border border-pink-400/30 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                <span>Subsidized Kerala Rates</span>
              </span>
            </div>

            {/* Main Headline with Colorful Gradients */}
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-[1.12]">
                Delicious Campus Dining at <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-200 drop-shadow-sm">
                  SB College Canteen
                </span>
              </h2>
              <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed font-normal max-w-2xl">
                Experience instant, cashless food token passes in Changanassery. Enjoy Kerala boiled rice meals, Thalassery chicken biryani, morning puttu &amp; appam, plus full-time express hot snacks and juices at student subsidized rates.
              </p>
            </div>

            {/* Real-time Dynamic Session Alert Banner */}
            <div className="p-4 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-xl pointer-events-none"></div>

              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${currentMealSession.badgeColor} flex items-center justify-center text-white shadow-md shrink-0`}>
                  <SessionIcon className="w-5 h-5 text-white" />
                </div>

                <div>
                  <div className="font-black text-white text-sm flex items-center gap-2">
                    <span>{currentMealSession.name}</span>
                    <span className="px-2 py-0.5 rounded-md bg-black/40 text-amber-300 font-mono text-xs border border-white/10">
                      {currentMealSession.timing}
                    </span>
                  </div>
                  <div className="text-amber-200/90 text-xs mt-0.5 font-medium">
                    {currentMealSession.statusText}
                  </div>
                </div>
              </div>

              {currentTime && (
                <div className="font-mono text-xs font-extrabold px-3 py-1.5 rounded-xl bg-black/40 text-amber-300 border border-amber-400/30 shrink-0 shadow-inner flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>{currentTime}</span>
                </div>
              )}
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Vibrant Student Token Button */}
              <button
                type="button"
                onClick={() => onOpenTokenModal('student')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 active:scale-95 text-slate-950 font-black text-sm shadow-xl shadow-amber-400/25 flex items-center gap-2.5 transition-all cursor-pointer transform hover:-translate-y-0.5 border border-amber-200"
              >
                <Ticket className="w-4 h-4 text-slate-950" />
                <span>Student Token (Roll No)</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              {/* Staff Token Button */}
              <button
                type="button"
                onClick={() => onOpenTokenModal('staff')}
                className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-sm border border-white/20 backdrop-blur-sm flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Faculty / Staff Token</span>
              </button>

              {/* Scroll to Menu */}
              <a
                href="#canteen-menu-section"
                className="px-4 py-3.5 rounded-2xl text-amber-300 hover:text-white text-xs font-black flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 4 Multi-Colored Metric Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {/* Card 1: Meals */}
              <div className="p-3 rounded-2xl bg-gradient-to-b from-rose-500/20 to-red-600/10 border border-rose-400/30 backdrop-blur-sm text-center">
                <div className="text-xl font-black text-rose-300">₹40</div>
                <div className="text-[10px] text-rose-100 font-bold">Kerala Meals</div>
              </div>

              {/* Card 2: Breakfast */}
              <div className="p-3 rounded-2xl bg-gradient-to-b from-amber-500/20 to-orange-600/10 border border-amber-400/30 backdrop-blur-sm text-center">
                <div className="text-xl font-black text-amber-300">08–10 AM</div>
                <div className="text-[10px] text-amber-100 font-bold">Morning Puttu/Appam</div>
              </div>

              {/* Card 3: Lunch */}
              <div className="p-3 rounded-2xl bg-gradient-to-b from-orange-500/20 to-amber-600/10 border border-orange-400/30 backdrop-blur-sm text-center">
                <div className="text-xl font-black text-orange-300">12–1:30 PM</div>
                <div className="text-[10px] text-orange-100 font-bold">Sadya &amp; Biryani</div>
              </div>

              {/* Card 4: Full Time */}
              <div className="p-3 rounded-2xl bg-gradient-to-b from-emerald-500/20 to-teal-600/10 border border-emerald-400/30 backdrop-blur-sm text-center">
                <div className="text-xl font-black text-emerald-300">Non-Stop</div>
                <div className="text-[10px] text-emerald-100 font-bold">Chai &amp; Hot Snacks</div>
              </div>
            </div>
          </div>

          {/* Right Column: Colorful Interactive Campus Counter Desks Board */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl p-6 sm:p-7 border border-white/25 text-white space-y-4 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-amber-400/20 to-pink-500/20 rounded-full blur-2xl pointer-events-none"></div>

              {/* Board Header */}
              <div className="flex items-center justify-between border-b border-white/15 pb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider text-amber-300 block leading-tight">
                      Live Counter Desks
                    </span>
                    <span className="text-[11px] text-amber-100/70">Central Dining Hall</span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-[10px] font-black bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  COUNTERS ACTIVE
                </span>
              </div>

              {/* 3 Color-Coded Counter Desks */}
              <div className="space-y-3 text-xs">
                
                {/* Counter 1: Morning Tiffin & Lunch Meals (Golden Amber & Spiced Red) */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#500814]/90 via-[#450711]/90 to-[#3b050d]/90 border border-amber-400/30 hover:border-amber-400 transition-all flex items-center justify-between group shadow-md">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      <span className="font-black text-white text-sm group-hover:text-amber-300 transition-colors">
                        Counter 1: Meals &amp; Tiffin
                      </span>
                    </div>
                    <div className="text-amber-200/90 text-[11px] font-medium">
                      Breakfast (08–10 AM) • Lunch (12–01:30 PM)
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-black text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-xl border border-amber-400/40 block">
                      Token 1–200
                    </span>
                  </div>
                </div>

                {/* Counter 2: Tea, Snacks & Hot Puffs (Emerald Green & Caramel Chai) */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#1b3d2b]/80 via-[#163324]/80 to-[#10291d]/80 border border-emerald-400/30 hover:border-emerald-400 transition-all flex items-center justify-between group shadow-md">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="font-black text-white text-sm group-hover:text-emerald-300 transition-colors">
                        Counter 2: Tea &amp; Snacks
                      </span>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-emerald-500/30 text-emerald-300 border border-emerald-400/30">
                        Full Time
                      </span>
                    </div>
                    <div className="text-emerald-100/90 text-[11px] font-medium">
                      Chai, Coffee, Pazham Pori, Parippu Vada, Cutlet
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-black text-emerald-300 bg-emerald-500/20 px-2.5 py-1 rounded-xl border border-emerald-400/40 block">
                      08 AM–05:30 PM
                    </span>
                  </div>
                </div>

                {/* Counter 3: Bakery, Shakes, Ice Cream & Juices (Magenta & Tropical Cyan) */}
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#441133]/80 via-[#370e2a]/80 to-[#2c0b22]/80 border border-pink-400/30 hover:border-pink-400 transition-all flex items-center justify-between group shadow-md">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                      <span className="font-black text-white text-sm group-hover:text-pink-300 transition-colors">
                        Counter 3: Bakery &amp; Juices
                      </span>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-md bg-pink-500/30 text-pink-300 border border-pink-400/30">
                        Full Time
                      </span>
                    </div>
                    <div className="text-pink-100/90 text-[11px] font-medium">
                      Puffs, Royal Falooda, Sharjah Shake, Dilkush
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-black text-pink-300 bg-pink-500/20 px-2.5 py-1 rounded-xl border border-pink-400/40 block">
                      08 AM–05:30 PM
                    </span>
                  </div>
                </div>

              </div>

              {/* Verified Subsidized Notice */}
              <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-amber-200/80">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Subsidized Kerala Student Food Rates</span>
                </span>
                <span className="italic font-medium">Present QR or Token Pass</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
