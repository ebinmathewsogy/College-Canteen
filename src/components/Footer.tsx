import React from 'react';
import { ShieldCheck, Heart, MapPin, Phone, Mail, Clock, Ticket, UtensilsCrossed } from 'lucide-react';

interface FooterProps {
  onOpenTokenModal: (role?: 'student' | 'staff') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTokenModal }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand & Designer Attribution */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#7b1122] text-amber-300 font-bold text-lg flex items-center justify-center border border-amber-400/30">
                <UtensilsCrossed className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">
                  Campus Canteen
                </h4>
                <p className="text-xs text-slate-400">
                  Canteen &amp; Express Cafeteria
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Official dining &amp; cashless token portal for campus students, faculty, and administrative staff.
            </p>

            {/* Prominent Designer Highlight */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/30 text-xs">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold mb-1">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Developer &amp; Designer</span>
              </div>
              <p className="text-slate-300">
                Designed &amp; Developed by <strong className="text-white font-bold underline decoration-amber-400 underline-offset-2">Ebin Mathew Sogy</strong>.
              </p>
            </div>
          </div>

          {/* Dining Services */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Dining Facilities
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <strong className="text-slate-200 block">Main Canteen:</strong>
                Breakfast (8:00–11:30 AM), Lunch (12:00–2:30 PM), All-day Snacks &amp; Juices (8 AM–5 PM).
              </li>
              <li>
                <strong className="text-slate-200 block">Express Cafeteria:</strong>
                Bakery snacks, Hot Kerala tea &amp; Filter coffee full time (8:00 AM – 5:00 PM).
              </li>
              <li>
                <strong className="text-slate-200 block">Malayalam Screening:</strong>
                All food and beverage items feature bilingual Malayalam &amp; English names.
              </li>
            </ul>
          </div>

          {/* Quick Token Portal */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Online Token Portal
            </h5>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generate free cashless tokens directly online without paying upfront cash at counters.
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={() => onOpenTokenModal('student')}
                className="w-full text-left px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-sky-300 font-medium flex items-center justify-between border border-slate-800"
              >
                <span>Student Token (വിദ്യാർത്ഥി)</span>
                <Ticket className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onOpenTokenModal('staff')}
                className="w-full text-left px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-purple-300 font-medium flex items-center justify-between border border-slate-800"
              >
                <span>Staff Token (ജീവനക്കാർ)</span>
                <Ticket className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Campus Location & Info */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Dining Location
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Campus Dining Block, Main Canteen &amp; Express Cafeteria Kiosk
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Monday – Friday • 8:00 AM – 5:00 PM</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>canteen-dining@campus.edu</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Campus Canteen &amp; Cafeteria. All Rights Reserved.
          </div>

          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Website designed and built by</span>
            <span className="text-amber-300 font-bold">Ebin Mathew Sogy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
