'use client';

import React, { useState, useEffect } from 'react';
import { AccountDeepSearchData, fetchAccountDeepSearch } from '@/services/api';
import { X, Search, ShieldCheck, AlertCircle, ExternalLink, CheckCircle2, FileText, UserCheck } from 'lucide-react';

interface AccountIntelligenceModalProps {
  accountId: string | null;
  username?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountIntelligenceModal({ accountId, username, isOpen, onClose }: AccountIntelligenceModalProps) {
  const [data, setData] = useState<AccountDeepSearchData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && accountId) {
      setLoading(true);
      fetchAccountDeepSearch(accountId).then((res) => {
        setData(res);
        setLoading(false);
      });
    }
  }, [isOpen, accountId]);

  if (!isOpen || !accountId) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0c0f17] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                🔎 Account Deep Search: {username || accountId}
              </h3>
              <p className="text-xs text-slate-400 font-mono">Public Claim History & Reliability Signals</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <div className="w-7 h-7 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-mono text-slate-400">Analyzing public claim history...</span>
          </div>
        ) : data ? (
          <div className="space-y-6">
            
            {/* Reliability Signal Score Banner */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  CLAIM RELIABILITY SIGNAL
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">{data.reliability_score_pct}%</span>
                  <span className="text-xs font-mono text-blue-400 font-bold uppercase">
                    {data.reliability_signal.replace(/_/g, ' ')}
                  </span>
                </div>
                <p className="text-xs text-slate-300 pt-1 leading-relaxed">
                  {data.assessment_summary}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-right shrink-0">
                <span className="text-emerald-400 block font-bold">{data.supported_claims_count} Supported Claims</span>
                <span className="text-rose-400 block font-bold">{data.unsupported_claims_count} Unsupported Claims</span>
              </div>
            </div>

            {/* Responsible AI Notice */}
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{data.responsible_ai_note}</span>
            </div>

            {/* Public Claim History Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-purple-400" /> Evaluated Public Claim History
              </h4>

              <div className="space-y-3">
                {data.claim_history.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-white">{item.claim_text}</span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                        item.status === 'SUPPORTED'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : item.status === 'UNSUPPORTED'
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.evidence_summary}
                    </p>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
                      <span>Date: {item.event_date}</span>
                      {item.source_ref && (
                        <a href={item.source_ref} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                          Proof Source <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : null}

        {/* Modal Actions */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            Close Deep Search
          </button>
        </div>

      </div>
    </div>
  );
}
