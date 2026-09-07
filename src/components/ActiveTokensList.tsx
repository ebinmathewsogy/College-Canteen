import React from 'react';
import { GeneratedToken } from '../types';
import { 
  Ticket, 
  Clock, 
  Printer, 
  Volume2, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  QrCode, 
  ExternalLink 
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
        <div className="rounded-3xl border-2 border-dashed border-slate-200 bg-white p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <Ticket className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            No Active Food Tokens Generated Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Select items from the SB Canteen menu to generate your instant digital food token pass.
          </p>
          <button
            type="button"
            onClick={onOpenTokenModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer mt-2"
          >
            <Ticket className="w-4 h-4 text-slate-950" />
            <span>Generate Food Token Now</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Your Active Campus Tokens ({tokens.length})
          </h3>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          Show token at collection counter
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tokens.map((token) => (
          <div
            key={token.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            {/* Card Header (Red & Gold Campus Branding) */}
            <div className="bg-gradient-to-r from-[#7b1122] to-[#550b17] text-white p-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  SB Central Canteen
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    token.role === 'student'
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-white text-[#7b1122]'
                  }`}
                >
                  {token.role === 'student' ? 'Student' : 'Faculty/Staff'}
                </span>
              </div>

              {/* Big Token Number */}
              <div className="flex items-baseline justify-between pt-1">
                <span className="font-mono font-black text-2xl tracking-tight text-white">
                  {token.tokenNumber}
                </span>
                <span className="text-xs font-semibold text-amber-200">
                  {token.counter}
                </span>
              </div>
            </div>

            {/* Token Content */}
            <div className="p-4 space-y-3 grow">
              {/* Holder details */}
              <div className="text-xs flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-800">{token.personName}</span>
                <span className="font-mono text-slate-500">{token.personIdentifier}</span>
              </div>

              {/* Items breakdown */}
              <div className="space-y-1 text-xs">
                {token.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-slate-700">
                    <span className="truncate pr-2">
                      <strong className="text-slate-900 font-bold">{item.quantity}x</strong> {item.name}
                    </span>
                    <span className="font-semibold shrink-0">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Total Price */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase">Total Amount</span>
                <span className="text-lg font-black text-[#7b1122]">₹{token.totalAmount}</span>
              </div>

              {/* Time Stamp */}
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Issued: {token.timestamp}</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                {/* Print button */}
                <button
                  type="button"
                  onClick={() => onPrintToken(token)}
                  className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200 transition-colors"
                  title="Print Token Pass"
                >
                  <Printer className="w-4 h-4" />
                </button>

                {/* Speech announcement */}
                <button
                  type="button"
                  onClick={() => announceTokenSpeech(token.tokenNumber, token.counter)}
                  className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200 transition-colors"
                  title="Announce token over speaker"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Cancel / Delete token */}
              <button
                type="button"
                onClick={() => onCancelToken(token.id)}
                className="px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1 transition-colors"
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
