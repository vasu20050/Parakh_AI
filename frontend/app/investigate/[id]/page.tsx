'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import TrustScoreGauge from '@/components/report/TrustScoreGauge';
import VerdictBadge from '@/components/report/VerdictBadge';
import ScoreDimensionsView from '@/components/report/ScoreDimensions';
import FindingsList from '@/components/report/FindingsList';
import EvidenceGraph from '@/components/report/EvidenceGraph';
import TruthTimeline from '@/components/report/TruthTimeline';
import ChallengeVerdictModal from '@/components/report/ChallengeVerdictModal';
import VerificationReceipt from '@/components/report/VerificationReceipt';
import { getInvestigationReport, InvestigationReport } from '@/services/api';
import { ShieldCheck, HelpCircle, FileCheck, Network, Clock, Cpu, ExternalLink, Share2 } from 'lucide-react';

export default function InvestigationReportPage() {
  const params = useParams();
  const id = (params?.id as string) || 'INV-2026-VIRAL-DEMO';
  const [report, setReport] = useState<InvestigationReport | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'graph' | 'timeline' | 'forensics' | 'receipt'>('overview');
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);

  useEffect(() => {
    async function loadReport() {
      const data = await getInvestigationReport(id);
      setReport(data);
    }
    loadReport();
  }, [id]);

  if (!report) {
    return (
      <div className="min-h-screen bg-[#07090e] text-slate-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-semibold text-slate-400">Loading Investigation Details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 relative overflow-hidden flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full z-10 space-y-8">
        
        {/* HEADER SECTION */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-slate-900 text-slate-400 border border-slate-800">
                ID: {report.investigation_id}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {new Date(report.created_at).toLocaleDateString()} • {report.input_type.toUpperCase()}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              {report.input_title || 'Multimedia Verification Report'}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-2 pt-1">
              <VerdictBadge verdict={report.verdict} size="lg" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <TrustScoreGauge score={report.trust_score} size={180} />
          </div>
        </div>

        {/* TOP ACTIONS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Tabs Nav */}
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
            {[
              { key: 'overview', label: 'Overview & Scores', icon: <ShieldCheck className="w-4 h-4" /> },
              { key: 'graph', label: 'Evidence Graph', icon: <Network className="w-4 h-4" /> },
              { key: 'timeline', label: 'Truth Timeline', icon: <Clock className="w-4 h-4" /> },
              { key: 'forensics', label: 'Forensics & Models', icon: <Cpu className="w-4 h-4" /> },
              { key: 'receipt', label: 'Verification Receipt', icon: <FileCheck className="w-4 h-4" /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsChallengeOpen(true)}
              className="px-4 py-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
            >
              <HelpCircle className="w-4 h-4 text-purple-400" />
              <span>Challenge Verdict</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'TrustGraph Report', url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Report URL copied to clipboard!');
                }
              }}
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs font-bold transition-all flex items-center gap-1"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TAB 1: OVERVIEW & SCORES */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            
            {/* 5-Axis Score Breakdown */}
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-base">5-Axis Trust Dimension Breakdown</h3>
              <ScoreDimensionsView scores={report.scores} />
            </div>

            {/* Findings List */}
            <div className="space-y-3">
              <h3 className="font-bold text-white text-base">Key Forensics & Context Findings</h3>
              <FindingsList findings={report.findings} />
            </div>

            {/* Retrieved Evidence Table */}
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-base">Retrieved Evidence & Sources</h3>
              <div className="space-y-3">
                {report.evidence.map((ev) => (
                  <div key={ev.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-white">{ev.title}</span>
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                          ev.role === 'origin'
                            ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            : ev.role === 'contradicting'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}
                      >
                        {ev.role}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{ev.snippet}</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                      <span>Source: {ev.source_name} ({ev.source_type})</span>
                      <a href={ev.source_url} target="_blank" rel="noreferrer" className="text-blue-400 hover:underline flex items-center gap-1">
                        View Source <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: EVIDENCE GRAPH */}
        {activeTab === 'graph' && (
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div>
              <h3 className="font-bold text-white text-base mb-1">Interactive Verification Graph</h3>
              <p className="text-xs text-slate-400">Maps relationship nodes between content, extracted claims, origin sources, and evidence.</p>
            </div>
            <EvidenceGraph nodesData={report.graph_nodes} edgesData={report.graph_edges} />
          </div>
        )}

        {/* TAB 3: TRUTH TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div>
              <h3 className="font-bold text-white text-base mb-1">Chronological Truth Timeline</h3>
              <p className="text-xs text-slate-400">Traces historical appearances and context shifts from first discovery to present.</p>
            </div>
            <TruthTimeline events={report.timeline} />
          </div>
        )}

        {/* TAB 4: FORENSICS & MODELS */}
        {activeTab === 'forensics' && (
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
            <div>
              <h3 className="font-bold text-white text-base mb-1">Model Registry & Execution Audit</h3>
              <p className="text-xs text-slate-400">Detailed list of AI/ML models invoked during this investigation run.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {report.methodology.models_used.map((model, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white">{model.name}</span>
                    <span className="font-mono text-slate-400">v{model.version}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Confidence: {(model.confidence * 100).toFixed(0)}%</span>
                    <span>Latency: {model.processing_ms} ms</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Methodology Limitations</h4>
              <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                {report.methodology.limitations.map((lim, idx) => (
                  <li key={idx}>{lim}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TAB 5: VERIFICATION RECEIPT */}
        {activeTab === 'receipt' && (
          <VerificationReceipt report={report} />
        )}

      </main>

      {/* Challenge Verdict Modal */}
      <ChallengeVerdictModal
        report={report}
        isOpen={isChallengeOpen}
        onClose={() => setIsChallengeOpen(false)}
      />

      <Footer />
    </div>
  );
}
