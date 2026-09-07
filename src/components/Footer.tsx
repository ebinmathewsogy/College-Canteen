import React from 'react';
import { MapPin, Phone, Mail, Globe, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#450711] text-amber-100/90 border-t border-[#36050d] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white text-[#7b1122] flex items-center justify-center font-serif font-black text-lg border border-amber-400">
                SB
              </div>
              <div>
                <h4 className="font-black text-white text-base tracking-tight">
                  St. Berchmans College (Autonomous)
                </h4>
                <p className="text-[11px] text-amber-200">
                  Affiliated to Mahatma Gandhi University, Kottayam
                </p>
              </div>
            </div>
            <p className="text-xs text-amber-200/80 max-w-md leading-relaxed">
              SB College Canteen Management System Changanassery enables students, faculty, and campus staff to access fresh campus food through streamlined digital token passes.
            </p>
            <div className="text-xs font-bold text-amber-300">
              NAAC Re-accredited with A++ Grade (CGPA 3.66)
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <h5 className="font-extrabold text-white text-xs uppercase tracking-wider">
              Canteen Counters &amp; Facilities
            </h5>
            <ul className="space-y-1.5 text-xs text-amber-200/80">
              <li>Central Canteen (Main Hall)</li>
              <li>Full-Time Tea, Snacks &amp; Bakery Desk</li>
              <li>Fresh Juices &amp; Ice Cream Corner</li>
              <li>Faculty Priority Dining Room</li>
              <li>Meals &amp; Biryani Token Counter</li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <h5 className="font-extrabold text-white text-xs uppercase tracking-wider">
              Campus Contact
            </h5>
            <div className="space-y-1.5 text-xs text-amber-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Changanassery, Kottayam District, Kerala - 686101</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>0481 2420025 / 2420125</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>sbc@sbcollege.ac.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-amber-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-amber-200/70">
          <div>
            © {new Date().getFullYear()} St. Berchmans College, Changanassery. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed &amp; Developed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>by</span>
            <strong className="font-bold text-white ml-0.5">Ebin Mathew Sogy</strong>
          </div>
        </div>
      </div>
    </footer>
  );
};
