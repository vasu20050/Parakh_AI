'use client';

import React from 'react';
import { ContentProvenance } from '@/services/api';
import { GitBranch, ExternalLink, ShieldCheck, AlertOctagon, CheckCircle2, Clock, FileSearch } from 'lucide-react';

interface ProvenanceChainProps {
  provenance?: ContentProvenance;
}

export default function ProvenanceChain({ provenance }: ProvenanceChainProps) {
  if (!provenance) return null;

  const chain = provenance.provenance_chain || [];
  const earliest = provenance.earliest_discovered_source;

  return (
    <div className="space-y-6">
      
      {/* SUMMARY BANNER */}
      <div className={`p-5 rounded-2xl glass-panel border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        provenance.has_context_shift
          ? 'border-amber-500/40 bg-amber-950/20'
          : 'border-emerald-500/40 bg-emerald-950/20'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-black px-2.5 py-0.5 rounded border uppercase tracking-wider ${
              provenance.has_context_shift
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            }`}>
              {provenance.provenance_status.replace('_', ' ')}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Provenance Confidence: {(provenance.confidence_score * 100).toFixed(0)}%
            </span>
          </div>
          <p className="text-sm font-semibold text-white pt-1">
            {provenance.context_summary}
          </p>
        </div>

        {earliest && (
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 shrink-0 text-xs text-right">
            <span className="text-[10px] text-slate-500 font-mono block">EARLIEST DISCOVERED SOURCE</span>
            <span className="font-bold text-white">{earliest.source_name}</span>
            <span className="text-slate-400 block font-mono text-[10px]">{earliest.first_seen_date}</span>
          </div>
        )}
      </div>

      {/* PROVENANCE STEP CHAIN FLOW */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
          <GitBranch className="w-4 h-4 text-purple-400" /> Content Distribution Chain (Earliest ➔ Present)
        </h4>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-blue-500 before:to-emerald-500">
          {chain.map((step) => (
            <div key={step.step_order} className="relative group">
              {/* Dot Icon */}
              <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full border flex items-center justify-center ${
                step.is_earliest_source
                  ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-500/40 ring-4 ring-purple-500/20'
                  : step.status === 'CURRENT_VIRAL_POST'
                  ? 'bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-500/40 ring-4 ring-blue-500/20'
                  : 'bg-slate-900 border-slate-700 text-slate-400'
              }`}>
                {step.is_earliest_source ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Clock className="w-3 h-3" />
                )}
              </div>

              {/* Step Card */}
              <div className={`p-4 rounded-xl border glass-panel transition-all ${
                step.is_earliest_source
                  ? 'border-purple-500/40 bg-purple-950/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-bold text-sm text-white">{step.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {step.event_date}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  {step.description}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800/80 pt-2">
                  <span>Source: {step.source_name}</span>
                  {step.source_url && step.source_url !== '#' && (
                    <a
                      href={step.source_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline flex items-center gap-1"
                    >
                      Inspect Source <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
