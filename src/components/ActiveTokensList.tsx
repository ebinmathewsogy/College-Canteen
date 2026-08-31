import React from 'react';
import { Ticket, QrCode, Trash2, Printer, CheckCircle2, GraduationCap, Briefcase, Plus } from 'lucide-react';
import { GeneratedToken } from '../types';

interface ActiveTokensListProps {
  tokens: GeneratedToken[];
  onDeleteToken: (id: string) => void;
  onGenerateNew: () => void;
}

export const ActiveTokensList: React.FC<ActiveTokensListProps> = ({
  tokens,
  onDeleteToken,
  onGenerateNew,
}) => {
  if (tokens.length === 0) return null;

  return (
    <section className="bg-amber-50/60 border-y border-amber-200/80 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#7b1122]" />
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Your Saved Cashless Tokens ({tokens.length})
              </h2>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Collected online without paying • Show these tokens at the campus dining counters
            </p>
          </div>

          <button
            onClick={onGenerateNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7b1122] text-white text-xs font-semibold hover:bg-[#600d1a] shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Another Token</span>
          </button>
        </div>

        {/* Grid of Tokens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens.map((token) => (
            <div
              key={token.id}
              className="bg-white rounded-2xl border-2 border-amber-300 p-4 shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        token.role === 'student'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {token.role === 'student' ? (
                        <>
                          <GraduationCap className="w-3 h-3" />
                          <span>STUDENT (വിദ്യാർത്ഥി)</span>
                        </>
                      ) : (
                        <>
                          <Briefcase className="w-3 h-3" />
                          <span>STAFF (ജീവനക്കാർ)</span>
                        </>
                      )}
                    </span>
                  </div>

                  <span className="text-[10px] text-slate-400 font-mono">
                    {token.timestamp.split('•')[1] || token.timestamp}
                  </span>
                </div>

                {/* Token Badge */}
                <div className="bg-slate-900 text-white p-3 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-amber-400 font-bold block">
                      Token Pass ID
                    </span>
                    <span className="text-xl font-mono font-extrabold text-amber-300">
                      {token.tokenNumber}
                    </span>
                  </div>
                  <div className="p-1.5 bg-white rounded text-slate-900">
                    <QrCode className="w-6 h-6" />
                  </div>
                </div>

                {/* Beneficiary */}
                <div className="text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Name:</span>
                    <strong className="text-slate-800">{token.personName}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      {token.role === 'student' ? 'Roll / Class:' : 'Dept / ID:'}
                    </span>
                    <span className="text-slate-700 font-medium">{token.personIdentifier}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200/60">
                    <span className="text-slate-500">Counter:</span>
                    <strong className="text-[#7b1122]">{token.counter}</strong>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                    Items:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {token.items.map((item, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100/60 text-amber-950 text-xs border border-amber-200"
                      >
                        <span className="font-semibold">{item.nameMalayalam}</span>
                        <span className="text-slate-600">({item.name})</span>
                        <span className="font-bold text-[#7b1122]">x{item.quantity}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Cashless Online Pass
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => window.print()}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                    title="Print Token"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDeleteToken(token.id)}
                    className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                    title="Remove Token"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
