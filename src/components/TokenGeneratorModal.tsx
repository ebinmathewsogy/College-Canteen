import React, { useState } from 'react';
import { 
  X, 
  Ticket, 
  GraduationCap, 
  Briefcase, 
  Check, 
  UtensilsCrossed, 
  Coffee, 
  Plus, 
  Minus, 
  ArrowRight, 
  QrCode, 
  Printer, 
  Download, 
  CheckCircle2, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { UserRole, GeneratedToken, TokenItem } from '../types';
import { ALL_MENU_ITEMS } from '../data/menuData';

interface TokenGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTokenGenerated: (token: GeneratedToken) => void;
  initialRole?: UserRole;
  preselectedItemId?: string;
}

export const TokenGeneratorModal: React.FC<TokenGeneratorModalProps> = ({
  isOpen,
  onClose,
  onTokenGenerated,
  initialRole,
  preselectedItemId,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [role, setRole] = useState<UserRole>(initialRole || 'student');
  const [personName, setPersonName] = useState('');
  const [personIdentifier, setPersonIdentifier] = useState('');
  const [facility, setFacility] = useState<'canteen' | 'cafeteria'>('canteen');
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    if (preselectedItemId) {
      return { [preselectedItemId]: 1 };
    }
    return {};
  });
  const [generatedToken, setGeneratedToken] = useState<GeneratedToken | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleRoleSelect = (selectedRole: UserRole) => {
    setRole(selectedRole);
  };

  const handleQuantityChange = (itemId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      const updated = { ...prev };
      if (next === 0) {
        delete updated[itemId];
      } else {
        updated[itemId] = next;
      }
      return updated;
    });
  };

  // Filter items matching the chosen facility
  const availableItems = ALL_MENU_ITEMS.filter((item) => {
    if (facility === 'cafeteria') {
      return item.location === 'cafeteria' || item.id === 'tea' || item.id === 'coffee' || item.id === 'bakery-snacks';
    }
    return item.location === 'canteen' || item.location === 'both';
  });

  const selectedItemsList: TokenItem[] = Object.entries(quantities)
    .map(([itemId, qty]) => {
      const item = ALL_MENU_ITEMS.find((i) => i.id === itemId);
      if (!item) return null;
      const tokenItem: TokenItem = {
        menuItemId: item.id,
        name: item.name,
        nameMalayalam: item.nameMalayalam,
        quantity: Number(qty),
        price: item.price,
      };
      return tokenItem;
    })
    .filter((i): i is TokenItem => Boolean(i && i.quantity > 0));

  const totalItemCount = selectedItemsList.reduce((sum, item) => sum + item.quantity, 0);
  const totalEstimatedAmount = selectedItemsList.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleGenerateToken = (e: React.FormEvent) => {
    e.preventDefault();

    if (!personName.trim()) {
      alert('Please enter your name');
      return;
    }

    if (!personIdentifier.trim()) {
      alert(
        role === 'student'
          ? 'Please enter your Class / Roll Number'
          : 'Please enter your Department / Staff ID'
      );
      return;
    }

    if (selectedItemsList.length === 0) {
      alert('Please select at least 1 food or beverage item for your token.');
      return;
    }

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const prefix = role === 'student' ? 'SB-STU' : 'SB-STF';
    const tokenNumber = `${prefix}-${randomDigits}`;

    // Determine counter
    let counter = 'Main Canteen - Food Counter 1';
    if (facility === 'cafeteria') {
      counter = 'Cafeteria Express Kiosk Window';
    } else if (
      selectedItemsList.every((i) => ['tea', 'coffee', 'lemon-juice', 'milk-shakes', 'fresh-fruit-juices'].includes(i.menuItemId))
    ) {
      counter = 'Canteen Beverage & Juice Counter';
    }

    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateString = now.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });

    const newToken: GeneratedToken = {
      id: `token-${Date.now()}`,
      tokenNumber,
      role,
      personName: personName.trim(),
      personIdentifier: personIdentifier.trim(),
      location: facility,
      items: selectedItemsList,
      totalAmount: totalEstimatedAmount,
      status: 'active',
      counter,
      timestamp: `${dateString} • ${timeString}`,
      createdAt: Date.now(),
    };

    setGeneratedToken(newToken);
    onTokenGenerated(newToken);
    setStep(4);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyToken = () => {
    if (generatedToken) {
      navigator.clipboard.writeText(
        `Campus Canteen Token: ${generatedToken.tokenNumber} (${generatedToken.role.toUpperCase()})\nName: ${generatedToken.personName} (${generatedToken.personIdentifier})\nItems: ${generatedToken.items.map((i) => `${i.nameMalayalam} (${i.name}) x${i.quantity}`).join(', ')}\nCounter: ${generatedToken.counter}\nCollected online without paying at: ${generatedToken.timestamp}\nDesigned by Ebin Mathew Sogy`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const resetModal = () => {
    setStep(1);
    setPersonName('');
    setPersonIdentifier('');
    setQuantities({});
    setGeneratedToken(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Top Header */}
        <div className="bg-[#7b1122] text-white px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-amber-950 flex items-center justify-center font-bold">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">
                Cashless Online Token Generator
              </h3>
              <p className="text-xs text-amber-200">
                Collect food token online without paying • Campus Dining
              </p>
            </div>
          </div>
          <button
            onClick={resetModal}
            className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress tracker */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-[#7b1122]' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 1 ? 'bg-[#7b1122] text-white' : 'bg-slate-200 text-slate-600'}`}>1</span>
            <span>1. Role (Student/Staff)</span>
          </div>
          <div className="w-6 h-0.5 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-[#7b1122]' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 2 ? 'bg-[#7b1122] text-white' : 'bg-slate-200 text-slate-600'}`}>2</span>
            <span>2. Facility</span>
          </div>
          <div className="w-6 h-0.5 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-[#7b1122]' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 3 ? 'bg-[#7b1122] text-white' : 'bg-slate-200 text-slate-600'}`}>3</span>
            <span>3. Food Selection</span>
          </div>
          <div className="w-6 h-0.5 bg-slate-200"></div>
          <div className={`flex items-center gap-1.5 ${step === 4 ? 'text-[#7b1122]' : 'text-slate-400'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step === 4 ? 'bg-[#7b1122] text-white' : 'bg-slate-200 text-slate-600'}`}>4</span>
            <span>4. Pass</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Student or Staff Role Declaration */}
          {step === 1 && (
            <div className="space-y-5 text-left">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Step 1: Are you a Student or Staff member?
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  നിങ്ങൾ വിദ്യാർത്ഥിയാണോ ജീവനക്കാരനാണോ എന്ന് തിരഞ്ഞെടുക്കുക (Tokens are generated without paying).
                </p>
              </div>

              {/* Role Select Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleRoleSelect('student')}
                  className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${
                    role === 'student'
                      ? 'border-sky-500 bg-sky-50/70 shadow-sm ring-2 ring-sky-200'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${role === 'student' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm">Student</span>
                      <span className="text-xs font-semibold text-sky-700 bg-sky-100 px-2 py-0.2 rounded-full">
                        വിദ്യാർത്ഥി
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      For all UG, PG &amp; Research Scholars.
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect('staff')}
                  className={`p-4 rounded-xl border-2 text-left flex items-start gap-3 transition-all ${
                    role === 'staff'
                      ? 'border-purple-500 bg-purple-50/70 shadow-sm ring-2 ring-purple-200'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`p-2.5 rounded-lg shrink-0 ${role === 'staff' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm">Staff / Faculty</span>
                      <span className="text-xs font-semibold text-purple-700 bg-purple-100 px-2 py-0.2 rounded-full">
                        ജീവനക്കാർ
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      For Teaching Faculty, Administrative &amp; Non-Teaching staff.
                    </p>
                  </div>
                </button>
              </div>

              {/* Input details */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {role === 'student' ? 'Student Full Name' : 'Staff / Faculty Member Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    placeholder={role === 'student' ? 'e.g. Rahul K. / Ananya Joseph' : 'e.g. Dr. Thomas Mathew / Prof. Priya'}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b1122] focus:border-[#7b1122]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {role === 'student'
                      ? 'Department & Roll Number / Class *'
                      : 'Department / Staff ID Number *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={personIdentifier}
                    onChange={(e) => setPersonIdentifier(e.target.value)}
                    placeholder={
                      role === 'student'
                        ? 'e.g. 3rd Year B.Sc Computer Science (Roll 24)'
                        : 'e.g. Dept of Physics / Staff ID #SB-412'
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#7b1122] focus:border-[#7b1122]"
                  />
                </div>
              </div>

              {/* No Payment Notice */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <strong>No Payment Required Online:</strong> Tokens are collected 100% cashless on this web portal. Your digital token will be issued instantly for campus food collection.
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  disabled={!personName.trim() || !personIdentifier.trim()}
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7b1122] text-white font-semibold text-sm hover:bg-[#600d1a] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <span>Continue to Step 2</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Choose Dining Facility */}
          {step === 2 && (
            <div className="space-y-5 text-left">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Step 2: Choose Dining Location
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Select whether you want to collect your items from the Main Canteen or the Express Cafeteria.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Main Canteen Option */}
                <div
                  onClick={() => setFacility('canteen')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    facility === 'canteen'
                      ? 'border-[#7b1122] bg-[#fbf2f4] ring-2 ring-rose-200'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-[#7b1122] text-white">
                        <UtensilsCrossed className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-900 text-sm">
                        Main Canteen (മെയിൻ കാന്റീൻ)
                      </span>
                    </div>
                    {facility === 'canteen' && <Check className="w-5 h-5 text-[#7b1122]" />}
                  </div>
                  <p className="text-xs text-slate-600 space-y-1">
                    <span>• Morning Breakfast (8 AM - 11:30 AM)</span><br />
                    <span>• Lunch Mess (12 PM - 2:30 PM)</span><br />
                    <span className="text-amber-800 font-semibold">• Juices, Snacks, Tea &amp; Coffee all day (8 AM - 5 PM)</span>
                  </p>
                </div>

                {/* Cafeteria Option */}
                <div
                  onClick={() => setFacility('cafeteria')}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    facility === 'cafeteria'
                      ? 'border-amber-500 bg-amber-50/70 ring-2 ring-amber-200'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-amber-600 text-white">
                        <Coffee className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-slate-900 text-sm">
                        Express Cafeteria (കഫറ്റീരിയ)
                      </span>
                    </div>
                    {facility === 'cafeteria' && <Check className="w-5 h-5 text-amber-600" />}
                  </div>
                  <p className="text-xs text-slate-600 space-y-1">
                    <span className="font-semibold text-emerald-700">Full Time 8:00 AM – 5:00 PM</span><br />
                    <span>• Exclusively Bakery Items (Chicken/Egg Puffs, Meat Rolls)</span><br />
                    <span>• Express Hot Kerala Tea &amp; Filter Coffee</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#7b1122] text-white font-semibold text-sm hover:bg-[#600d1a] transition-all"
                >
                  <span>Select Food Items</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Food Items Selection with Malayalam screening */}
          {step === 3 && (
            <div className="space-y-4 text-left">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h4 className="text-base font-bold text-slate-900">
                    Step 3: Select Food &amp; Beverage Items
                  </h4>
                  <p className="text-xs text-slate-500">
                    Malayalam screening for food items • Choose quantity
                  </p>
                </div>
                <div className="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">
                  {facility === 'canteen' ? 'Main Canteen Menu' : 'Cafeteria Express Menu'}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {availableItems.map((item) => {
                  const qty = quantities[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                        qty > 0 ? 'bg-amber-50/50 border-amber-300 shadow-xs' : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                              item.diet === 'veg'
                                ? 'bg-emerald-500'
                                : item.diet === 'egg'
                                ? 'bg-amber-500'
                                : 'bg-red-500'
                            }`}
                            title={item.diet.toUpperCase()}
                          />
                          <span className="font-bold text-sm text-slate-900">
                            {item.name}
                          </span>
                          {/* Malayalam Screening */}
                          <span className="text-xs font-semibold text-[#7b1122] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                            {item.nameMalayalam}
                          </span>
                        </div>

                        <div className="text-xs text-slate-500 flex items-center gap-3">
                          <span className="font-semibold text-slate-800">₹{item.price}</span>
                          <span>• {item.timing}</span>
                        </div>
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 shrink-0">
                        {qty > 0 ? (
                          <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-1 border border-slate-300">
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(item.id, -1)}
                              className="w-7 h-7 rounded bg-white text-slate-700 flex items-center justify-center hover:bg-slate-200 shadow-xs"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-6 text-center font-bold text-sm text-slate-900">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(item.id, 1)}
                              className="w-7 h-7 rounded bg-[#7b1122] text-white flex items-center justify-center hover:bg-[#600d1a] shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#7b1122] hover:text-white text-slate-700 text-xs font-semibold border border-slate-300 transition-colors"
                          >
                            + Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Summary Bar */}
              <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400">Total Items: </span>
                  <strong className="text-white text-sm">{totalItemCount} items</strong>
                  <span className="text-slate-400 ml-2">Estimated Value: </span>
                  <strong className="text-amber-300 text-sm">₹{totalEstimatedAmount}</strong>
                </div>
                <span className="text-emerald-400 font-semibold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  0 Online Payment Required
                </span>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-50"
                >
                  Back
                </button>

                <button
                  type="button"
                  disabled={totalItemCount === 0}
                  onClick={handleGenerateToken}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Generate Token Online (No Cash)</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Token Card Generated! */}
          {step === 4 && generatedToken && (
            <div className="space-y-5 text-left animate-in fade-in zoom-in-95 duration-200">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-1">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-extrabold text-slate-900">
                  Cashless Token Generated Successfully!
                </h4>
                <p className="text-xs text-slate-500">
                  Present this digital token on your mobile screen at the campus counter to collect your food.
                </p>
              </div>

              {/* Printable Digital Token Pass */}
              <div
                id="printable-token-pass"
                className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 border-2 border-amber-400 rounded-2xl p-5 shadow-lg relative overflow-hidden space-y-4"
              >
                {/* Watermark */}
                <div className="absolute right-2 -bottom-6 text-9xl font-serif font-black text-amber-500/5 select-none pointer-events-none">
                  TOKEN
                </div>

                {/* Header of Pass */}
                <div className="flex items-center justify-between border-b border-amber-200 pb-3">
                  <div>
                    <div className="text-[10px] font-bold tracking-wider text-amber-900 uppercase">
                      Campus Canteen &amp; Cafeteria
                    </div>
                    <div className="text-xs text-slate-500">Main Dining Hall &amp; Express Counter</div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                      generatedToken.role === 'student'
                        ? 'bg-sky-100 text-sky-800 border border-sky-300'
                        : 'bg-purple-100 text-purple-800 border border-purple-300'
                    }`}
                  >
                    {generatedToken.role === 'student' ? (
                      <>
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>STUDENT (വിദ്യാർത്ഥി)</span>
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>STAFF (ജീവനക്കാർ)</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Big Token Number & Verification */}
                <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-amber-300 font-semibold tracking-wider uppercase">
                      Official Token Number
                    </div>
                    <div className="text-2xl sm:text-3xl font-mono font-extrabold tracking-wider text-amber-400">
                      {generatedToken.tokenNumber}
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      {generatedToken.timestamp}
                    </div>
                  </div>

                  {/* QR Graphic Mock */}
                  <div className="p-2 bg-white rounded-lg text-slate-900 flex flex-col items-center">
                    <QrCode className="w-10 h-10" />
                    <span className="text-[8px] font-mono font-bold">VERIFIED</span>
                  </div>
                </div>

                {/* Person details & Counter */}
                <div className="grid grid-cols-2 gap-3 text-xs bg-white/80 p-3 rounded-lg border border-amber-100">
                  <div>
                    <span className="text-slate-500 block">Name:</span>
                    <strong className="text-slate-900 font-semibold text-sm">{generatedToken.personName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">
                      {generatedToken.role === 'student' ? 'Class / Roll No:' : 'Department / Staff ID:'}
                    </span>
                    <strong className="text-slate-900 font-semibold">{generatedToken.personIdentifier}</strong>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-100">
                    <span className="text-slate-500 block">Collection Counter:</span>
                    <strong className="text-[#7b1122] font-bold">{generatedToken.counter}</strong>
                  </div>
                </div>

                {/* Items breakdown with Malayalam Screening */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Ordered Food Items (ഭക്ഷണ സാധനങ്ങൾ)
                  </div>
                  <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100 text-xs">
                    {generatedToken.items.map((item, idx) => (
                      <div key={idx} className="p-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{item.name}</span>
                          <span className="text-[11px] font-semibold text-[#7b1122] bg-rose-50 px-1.5 py-0.2 rounded">
                            {item.nameMalayalam}
                          </span>
                        </div>
                        <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cashless Seal & Designer Credit */}
                <div className="pt-2 border-t border-amber-200/80 flex flex-wrap items-center justify-between text-[11px] text-slate-600 gap-2">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cashless Online Token • 0 Cash Paid Online</span>
                  </div>

                  <div className="text-slate-500">
                    Designed by <strong className="text-slate-800 font-semibold">Ebin Mathew Sogy</strong>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCopyToken}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 inline-flex items-center gap-1.5"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>Copied Token!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Copy Details</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-white font-semibold text-xs hover:bg-slate-700 inline-flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Token</span>
                  </button>

                  <button
                    type="button"
                    onClick={resetModal}
                    className="px-5 py-2 rounded-xl bg-[#7b1122] text-white font-semibold text-xs hover:bg-[#600d1a]"
                  >
                    Done &amp; Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
