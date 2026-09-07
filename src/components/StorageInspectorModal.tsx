import React, { useState } from 'react';
import { GeneratedToken } from '../types';
import { X, Database, Copy, Check, Trash2, RefreshCw } from 'lucide-react';

interface StorageInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokens: GeneratedToken[];
  onClearStorage: () => void;
}

export const StorageInspectorModal: React.FC<StorageInspectorModalProps> = ({
  isOpen,
  onClose,
  tokens,
  onClearStorage,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(tokens, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Tokens Data Storage Inspector
              </h3>
              <p className="text-[11px] text-slate-500">
                Key: <code className="font-mono font-bold text-amber-800">sb_canteen_tokens</code> • {tokens.length} tokens persisted
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto grow space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">
              Raw JSON Snapshot:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center gap-1.5 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Clear all local tokens?')) {
                    onClearStorage();
                  }
                }}
                className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-2xl bg-slate-900 text-amber-200 font-mono text-xs overflow-x-auto max-h-96 border border-slate-800">
            {tokens.length === 0 ? '// No tokens currently stored in sb_canteen_tokens' : jsonString}
          </pre>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>St. Berchmans College Canteen Management</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
