import React from 'react';
import { GeneratedToken } from '../types';
import { 
  Ticket, 
  Clock, 
  Printer, 
  Volume2, 
  Trash2, 
  CheckCircle2, 
  Sparkles,
  QrCode,
  Utensils
} from 'lucide-react';
import { announceTokenSpeech } from '../utils/soundEffects';

interface ActiveTokensListProps {
  tokens: GeneratedToken[];
  onCancelToken: (tokenId: string) => void;
  onOpenTokenModal: () => void;
  onPrintToken: (token: GeneratedToken) => void;
}

export const ActiveTokensList: React.FC<ActiveTokensListProps> = ({
  tokens,
  onCancelToken,
  onOpenTokenModal,
  onPrintToken,
}) => {
  if (tokens.length === 0) {
    return (
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-3xl border-2 border-dashed border-amber-300/80 bg-gradient-to-br from-amber-50/40 via-white to-orange-50/30 p-8 text-center space-y-3.5 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 flex items-center justify-center mx-auto shadow-md">
            <Ticket className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black text-slate-900 tracking-tight">
            No Active Food Tokens Generated Yet
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Select items from the SB Canteen menu or click below to generate your instant digital food token pass for Breakfast, Lunch, or Full-Time refreshments.
          </p>
          <button
            type="button"
            onClick={onOpenTokenModal}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-400/25 transition-all cursor-pointer mt-2 border border-amber-200"
          >
            <Ticket className="w-4 h-4 text-slate-950" />
            <span>Generate Food Token Now</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Your Active Campus Food Tokens</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              {tokens.length} Active
            </span>
          </h3>
        </div>
        <span className="text-xs text-slate-500 font-bold flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Present token number at respective counter</span>
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tokens.map((token) => (
          <div
            key={token.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden flex flex-col justify-between hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {/* Colorful Ticket Header with Brand & Role */}
            <div className="bg-gradient-to-r from-[#7b1122] via-[#650c1b] to-[#4e0915] text-white p-5 space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between relative z-10">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>SB CENTRAL CANTEEN PASS</span>
                </span>
                <span
                  className={`px-3 py-0.5 rounded-full text-[10px] font-black uppercase shadow-xs ${
                    token.role === 'student'
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950'
                      : 'bg-white text-[#7b1122]'
                  }`}
                >
                  {token.role === 'student' ? 'Student' : 'Faculty/Staff'}
                </span>
              </div>

              {/* Big Vibrant Token Number */}
              <div className="flex items-baseline justify-between pt-1 relative z-10">
                <span className="font-mono font-black text-3xl tracking-tight text-white drop-shadow-sm">
                  {token.tokenNumber}
                </span>
                <span className="text-xs font-black text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-xl border border-amber-400/30">
                  {token.counter}
                </span>
              </div>
            </div>

            {/* Decorative Ticket Divider with Notch effect */}
            <div className="relative flex items-center justify-between px-4 py-1 bg-slate-50 border-y border-dashed border-slate-200">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Digital Pass Voucher
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-emerald-700 uppercase">Valid Today</span>
              </div>
            </div>

            {/* Token Content */}
            <div className="p-5 space-y-3.5 grow bg-white">
              {/* Holder details */}
              <div className="text-xs flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="font-black text-slate-900 text-sm">{token.personName}</span>
                <span className="font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {token.personIdentifier}
                </span>
              </div>

              {/* Items breakdown */}
              <div className="space-y-1.5 text-xs">
                {token.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-700">
                    <span className="truncate pr-2">
                      <strong className="text-slate-950 font-black">{item.quantity}x</strong> {item.name}
                    </span>
                    <span className="font-mono font-bold text-slate-900 shrink-0">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Price */}
              <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  Total Amount (Subsidized)
                </span>
                <span className="text-xl font-black text-[#7b1122]">
                  ₹{token.totalAmount}
                </span>
              </div>

              {/* Time Stamp */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Issued at: {token.timestamp}</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-3.5 bg-gradient-to-r from-slate-50 via-amber-50/20 to-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {/* Print button */}
                <button
                  type="button"
                  onClick={() => onPrintToken(token)}
                  className="px-3 py-1.5 rounded-xl text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 border border-slate-200 transition-all font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
                  title="Print Token Pass"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print</span>
                </button>

                {/* Speech announcement */}
                <button
                  type="button"
                  onClick={() => announceTokenSpeech(token.tokenNumber, token.counter)}
                  className="px-3 py-1.5 rounded-xl text-amber-900 hover:text-amber-950 bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300/80 transition-all font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
                  title="Announce token over speaker"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                  <span>Call</span>
                </button>
              </div>

              {/* Cancel / Delete token */}
              <button
                type="button"
                onClick={() => onCancelToken(token.id)}
                className="px-3 py-1.5 rounded-xl text-rose-700 hover:bg-rose-100/70 text-xs font-black flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
