'use client';

import React from 'react';
import { CrowdIntelligenceData } from '@/services/api';
import { Users, MessageSquare, AlertCircle, CheckCircle2, Link2, ExternalLink, Search, UserCheck } from 'lucide-react';

interface CrowdIntelligenceViewProps {
  crowdData?: CrowdIntelligenceData;
  onInvestigateAccount?: (accountId: string, username: string) => void;
}

export default function CrowdIntelligenceView({ crowdData, onInvestigateAccount }: CrowdIntelligenceViewProps) {
  if (!crowdData) return null;

  const sentiment = crowdData.sentiment_vs_evidence;
  const clusters = crowdData.claim_clusters || [];
  const comments = crowdData.sample_comments || [];

  return (
    <div className="space-y-6">

      {/* CORE PRINCIPLE BANNER */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-blue-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
              Crowd Signal Principle
            </h4>
            <p className="text-xs text-slate-300 font-semibold">
              "THE CROWD IS A SOURCE OF SIGNALS, NOT A SOURCE OF TRUTH."
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-400 border border-slate-800">
          {crowdData.total_comments_analyzed.toLocaleString()} Comments Evaluated
        </span>
      </div>

      {/* PUBLIC SENTIMENT VS INDEPENDENT EVIDENCE COMPARISON */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h3 className="font-bold text-white text-base flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-purple-400" />
          Public Sentiment vs. Independent Evidence
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Public Discussion */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-purple-400 block">
              PUBLIC DISCUSSION SUMMARY
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {sentiment.public_discussion_summary}
            </p>
          </div>

          {/* Independent Verification */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-blue-400 block">
              INDEPENDENT FORENSIC VERIFICATION
            </span>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              {sentiment.independent_evidence_summary}
            </p>
          </div>

        </div>

        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
          <span className="font-mono text-[11px] text-slate-400">Alignment Note:</span>
          <span className="font-semibold text-slate-200">{sentiment.verdict_impact_note}</span>
        </div>
      </div>

      {/* CROWD CLAIM CLUSTERS */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
          Main Crowd Claim Clusters & Proportions
        </h4>

        <div className="space-y-3">
          {clusters.map((cluster, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{cluster.claim_title}</span>
                <span className="font-mono font-bold text-blue-400">{cluster.percentage}% ({cluster.comment_count} comments)</span>
              </div>
              
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className={`h-full transition-all duration-500 ${
                    cluster.category === 'evidence_bearing'
                      ? 'bg-emerald-500'
                      : cluster.category === 'contradictory'
                      ? 'bg-rose-500'
                      : 'bg-purple-500'
                  }`}
                  style={{ width: `${cluster.percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">Cross-Verification Status:</span>
                <span className={`font-bold ${
                  cluster.category === 'evidence_bearing'
                    ? 'text-emerald-400'
                    : cluster.category === 'contradictory'
                    ? 'text-rose-400'
                    : 'text-amber-400'
                }`}>
                  {cluster.status_label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SAMPLE CLASSIFIED COMMENTS & EVIDENCE BEARING COMMENTS */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            Evaluated Public Comments & Investigation Leads
          </h4>
          <span className="text-xs text-emerald-400 font-mono font-bold">
            {crowdData.evidence_bearing_count} Evidence-Bearing Comments Discovered
          </span>
        </div>

        <div className="space-y-3">
          {comments.map((comm) => (
            <div key={comm.id} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <button
                  onClick={() => onInvestigateAccount && onInvestigateAccount(comm.account_id, comm.username)}
                  className="font-bold text-blue-400 hover:underline flex items-center gap-1.5"
                >
                  <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>{comm.username}</span>
                  <span className="text-[10px] text-slate-500 font-mono font-normal">(Click for Deep Search)</span>
                </button>

                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${
                  comm.has_evidence
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : comm.category === 'CONTRADICTORY_CLAIM'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    : 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                }`}>
                  {comm.category.replace('_', ' ')}
                </span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed italic">
                "{comm.comment_text}"
              </p>

              {comm.evidence_url && (
                <div className="pt-1 text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <Link2 className="w-3 h-3" />
                  <span>Referenced Proof: </span>
                  <a href={comm.evidence_url} target="_blank" rel="noreferrer" className="underline hover:text-emerald-300">
                    {comm.evidence_url}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
