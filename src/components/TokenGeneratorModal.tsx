import React, { useState, useEffect } from 'react';
import { ALL_MENU_ITEMS } from '../data/menuData';
import { GeneratedToken, MenuItem, TokenItem, UserRole } from '../types';
import { 
  X, 
  Ticket, 
  Plus, 
  Minus, 
  User, 
  GraduationCap, 
  Briefcase, 
  UtensilsCrossed, 
  Coffee, 
  IceCream, 
  Check, 
  Printer, 
  Sparkles,
  Search,
  Cookie,
  Flame,
  GlassWater
} from 'lucide-react';
import { playOrderChime } from '../utils/soundEffects';

interface TokenGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTokenGenerated: (token: GeneratedToken) => void;
  initialRole?: UserRole;
  preselectedItem?: MenuItem;
}

const DEPARTMENTS = [
  'B.Sc Computer Science',
  'BCA (Computer Applications)',
  'B.Com Finance & Taxation',
  'B.A English Literature',
  'B.Sc Physics',
  'B.Sc Chemistry',
  'B.Sc Mathematics',
  'B.A Economics',
  'M.Sc Data Analytics',
  'MBA (Management Studies)',
  'Other Department / Faculty',
];

export const TokenGeneratorModal: React.FC<TokenGeneratorModalProps> = ({
  isOpen,
  onClose,
  onTokenGenerated,
  initialRole = 'student',
  preselectedItem,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [role, setRole] = useState<UserRole>(initialRole);
  const [personName, setPersonName] = useState('');
  const [personId, setPersonId] = useState('');
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [generatedToken, setGeneratedToken] = useState<GeneratedToken | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-populate preselected item if provided
  useEffect(() => {
    if (preselectedItem) {
      setSelectedItems({ [preselectedItem.id]: 1 });
      if (preselectedItem.category) {
        setSelectedCategory(preselectedItem.category);
      }
    }
  }, [preselectedItem]);

  if (!isOpen) return null;

  const filteredMenuItems = ALL_MENU_ITEMS.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      if (!matchName) return false;
    }
    return true;
  });

  const handleItemQuantityChange = (itemId: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[itemId] || 0;
      const next = current + delta;
      if (next <= 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  // Calculate items summary
  const tokenItemsList: TokenItem[] = Object.entries(selectedItems).map(([id, qty]) => {
    const item = ALL_MENU_ITEMS.find((m) => m.id === id)!;
    return {
      menuItemId: id,
      name: item.name,
      quantity: Number(qty),
      price: item.price,
    };
  });

  const totalAmount = tokenItemsList.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim()) return;
    if (tokenItemsList.length === 0) {
      alert('Please select at least 1 food, snack, beverage or bakery item.');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const prefix = role === 'student' ? 'SB-STU' : 'SB-STF';
    const tokenNumber = `${prefix}-${randomSuffix}`;

    // Smart Counter allocation
    const hasMeals = tokenItemsList.some(i => {
      const it = ALL_MENU_ITEMS.find(m => m.id === i.menuItemId);
      return it?.category === 'meals' || it?.category === 'breakfast';
    });
    const hasJuicesOrIceCream = tokenItemsList.some(i => {
      const it = ALL_MENU_ITEMS.find(m => m.id === i.menuItemId);
      return it?.category === 'juices' || it?.category === 'icecream';
    });

    let counter = 'Counter 2 (Tea, Snacks & Bakery)';
    if (hasMeals) {
      counter = 'Counter 1 (Meals & Breakfast)';
    } else if (hasJuicesOrIceCream) {
      counter = 'Counter 3 (Juices & Ice Cream)';
    }

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newToken: GeneratedToken = {
      id: `token-${Date.now()}-${randomSuffix}`,
      tokenNumber,
      role,
      personName: personName.trim(),
      personIdentifier: `${department} • ${personId || (role === 'student' ? 'Roll N/A' : 'Staff N/A')}`,
      location: 'canteen',
      items: tokenItemsList,
      totalAmount,
      status: 'active',
      counter,
      timestamp: timeFormatted,
      createdAt: Date.now(),
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
        `SB-COLLEGE-CANTEEN:${tokenNumber}:${totalAmount}:${personName.trim()}`
      )}`,
    };

    setGeneratedToken(newToken);
    onTokenGenerated(newToken);
    playOrderChime();
    setStep('success');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCloseAndReset = () => {
    setStep('form');
    setSelectedItems({});
    setGeneratedToken(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in-50 zoom-in-95 max-h-[92vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="bg-[#7b1122] text-white p-5 flex items-center justify-between border-b border-[#600d1a] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-[#7b1122] flex items-center justify-center font-serif font-black text-lg border border-amber-400">
              SB
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-white">
                {step === 'form' ? 'Generate Campus Canteen Food Token' : 'Digital Token Pass Issued'}
              </h3>
              <p className="text-xs text-amber-200">
                St. Berchmans College (SB College), Changanassery
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCloseAndReset}
            className="p-2 rounded-xl text-amber-200 hover:text-white hover:bg-[#5c0a18] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-5 sm:p-6 grow space-y-5">
          {step === 'form' ? (
            <form onSubmit={handleGenerate} className="space-y-5">
              {/* Step 1: Role Switcher */}
              <div className="space-y-2">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                  Step 1: Select User Role
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('student')}
                    className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      role === 'student'
                        ? 'border-[#7b1122] bg-red-50/60 ring-2 ring-[#7b1122]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">Student Token</div>
                      <div className="text-[11px] text-slate-500">With Roll / Reg Number</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('staff')}
                    className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      role === 'staff'
                        ? 'border-[#7b1122] bg-red-50/60 ring-2 ring-[#7b1122]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#7b1122] text-white flex items-center justify-center font-bold shrink-0">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-extrabold text-sm text-slate-900">Faculty / Staff Token</div>
                      <div className="text-[11px] text-slate-500">Priority Counter Dining</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Step 2: Personal Identification */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder="e.g. Ebin Mathew"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#7b1122]"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {role === 'student' ? 'Roll No / Reg ID' : 'Staff ID'}
                  </label>
                  <input
                    type="text"
                    value={personId}
                    onChange={(e) => setPersonId(e.target.value)}
                    placeholder={role === 'student' ? 'e.g. 210021' : 'e.g. FAC-402'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#7b1122]"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Department
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#7b1122]"
                  >
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 3: Food Items Selection */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Step 2: Select Items ({tokenItemsList.length} added)
                  </label>
                  <div className="relative w-44">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search items..."
                      className="w-full pl-7 pr-2 py-1 rounded-lg border border-slate-200 text-[11px]"
                    />
                  </div>
                </div>

                {/* Category tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
                  {[
                    { id: 'all', label: 'All', activeColor: 'bg-gradient-to-r from-[#7b1122] to-rose-700 text-white' },
                    { id: 'breakfast', label: 'Breakfast (08-10 AM)', activeColor: 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black' },
                    { id: 'meals', label: 'Lunch Meals (12-01:30 PM)', activeColor: 'bg-gradient-to-r from-red-600 to-rose-600 text-white' },
                    { id: 'snacks', label: 'Snacks', activeColor: 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black' },
                    { id: 'teacoffee', label: 'Tea & Coffee', activeColor: 'bg-gradient-to-r from-amber-800 to-yellow-800 text-white' },
                    { id: 'icecream', label: 'Ice Cream', activeColor: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' },
                    { id: 'juices', label: 'Juices', activeColor: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' },
                    { id: 'bakery', label: 'Bakery', activeColor: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedCategory(tab.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold shrink-0 transition-all shadow-xs cursor-pointer ${
                        selectedCategory === tab.id
                          ? `${tab.activeColor} shadow-sm ring-1 ring-black/10 scale-102`
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Items list */}
                <div className="max-h-64 overflow-y-auto border border-slate-200 rounded-2xl divide-y divide-slate-100 p-1 bg-slate-50/50">
                  {filteredMenuItems.map((item) => {
                    const count = selectedItems[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        className="p-2.5 flex items-center justify-between gap-2 hover:bg-white rounded-xl transition-colors"
                      >
                        <div className="min-w-0 pr-2">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-slate-900 truncate">
                              {item.name}
                            </span>
                            {item.isFullTime && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-emerald-100 text-emerald-800 shrink-0">
                                Full Time
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-black text-[#7b1122]">₹{item.price}</div>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {count > 0 ? (
                            <>
                              <button
                                type="button"
                                onClick={() => handleItemQuantityChange(item.id, -1)}
                                className="w-7 h-7 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 flex items-center justify-center font-bold text-sm"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="w-6 text-center font-black text-xs text-slate-900">
                                {count}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleItemQuantityChange(item.id, 1)}
                                className="w-7 h-7 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 flex items-center justify-center font-bold text-sm"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleItemQuantityChange(item.id, 1)}
                              className="px-3 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Total & Submit */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Total Payable:</span>
                  <span className="text-2xl font-black text-[#7b1122]">₹{totalAmount}</span>
                </div>

                <button
                  type="submit"
                  disabled={!personName.trim() || tokenItemsList.length === 0}
                  className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-sm shadow-md transition-all disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  <Ticket className="w-4 h-4 text-slate-950" />
                  <span>Issue Canteen Token (₹{totalAmount})</span>
                </button>
              </div>
            </form>
          ) : (
            /* Step: Success / Printable Pass Display */
            generatedToken && (
              <div className="space-y-6">
                {/* Visual Pass Ticket Card */}
                <div
                  id="printable-token-pass"
                  className="rounded-3xl border-2 border-amber-400 bg-gradient-to-b from-amber-50 to-white p-6 shadow-lg space-y-4 max-w-md mx-auto"
                >
                  <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#7b1122] block">
                        St. Berchmans College Changanassery
                      </span>
                      <h4 className="font-extrabold text-slate-900 text-base">
                        Digital Food Token Pass
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#7b1122] text-amber-300 text-xs font-black uppercase">
                      {generatedToken.role}
                    </span>
                  </div>

                  {/* Token Number */}
                  <div className="text-center py-2.5 bg-white rounded-2xl border border-amber-200/80 shadow-xs">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">
                      Token Number
                    </span>
                    <span className="text-3xl sm:text-4xl font-mono font-black text-[#7b1122] tracking-wider">
                      {generatedToken.tokenNumber}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 block mt-1">
                      {generatedToken.counter}
                    </span>
                  </div>

                  {/* QR Code */}
                  {generatedToken.qrCodeUrl && (
                    <div className="flex flex-col items-center justify-center p-2">
                      <img
                        src={generatedToken.qrCodeUrl}
                        alt="Token QR"
                        className="w-32 h-32 rounded-xl border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[10px] text-slate-400 font-mono mt-1">
                        Scan at Canteen Pickup Desk
                      </span>
                    </div>
                  )}

                  {/* User & Order Meta */}
                  <div className="bg-slate-50 p-3 rounded-2xl text-xs space-y-1 border border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Name:</span>
                      <span className="font-bold text-slate-900">{generatedToken.personName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ID / Dept:</span>
                      <span className="font-semibold text-slate-700">
                        {generatedToken.personIdentifier}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Time:</span>
                      <span className="font-mono text-slate-700">{generatedToken.timestamp}</span>
                    </div>
                  </div>

                  {/* Selected Items list */}
                  <div className="space-y-1.5 text-xs">
                    <div className="font-bold text-slate-700 pb-1 border-b border-slate-100">
                      Items Ordered:
                    </div>
                    {generatedToken.items.map((it) => (
                      <div key={it.menuItemId} className="flex justify-between text-slate-800">
                        <span>
                          {it.quantity}x {it.name}
                        </span>
                        <span className="font-bold">₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 border-t border-slate-200 font-black text-sm text-slate-900">
                      <span>Total Amount:</span>
                      <span className="text-[#7b1122]">₹{generatedToken.totalAmount}</span>
                    </div>
                  </div>

                  {/* Credit footer */}
                  <div className="text-center pt-2 text-[10px] text-slate-400 border-t border-slate-100">
                    St. Berchmans College Canteen • Designed by Ebin Mathew Sogy
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Token Pass</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCloseAndReset}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs"
                  >
                    Done &amp; Close
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
