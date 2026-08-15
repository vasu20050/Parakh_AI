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
import ProvenanceChain from '@/components/report/ProvenanceChain';
import CrowdIntelligenceView from '@/components/report/CrowdIntelligenceView';
import AccountIntelligenceModal from '@/components/report/AccountIntelligenceModal';
import ChallengeVerdictModal from '@/components/report/ChallengeVerdictModal';
import VerificationReceipt from '@/components/report/VerificationReceipt';
import { getInvestigationReport, InvestigationReport } from '@/services/api';
import { ShieldCheck, HelpCircle, FileCheck, Network, Clock, Cpu, ExternalLink, Share2, FileImage, Camera, Sparkles, GitBranch, Users, Search } from 'lucide-react';

export default function InvestigationReportPage() {
  const params = useParams();
  const id = (params?.id as string) || 'INV-2026-VIRAL-DEMO';
  const [report, setReport] = useState<InvestigationReport | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'provenance' | 'crowd' | 'forensics' | 'graph' | 'timeline' | 'receipt'>('overview');
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);

  // Account Deep Search State
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [selectedUsername, setSelectedUsername] = useState<string>('');
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

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
          <span className="text-sm font-semibold text-slate-400">Loading Investigation Details & Provenance Engine...</span>
        </div>
      </div>
    );
  }

  const forensics = report.forensics;
  const provenance = report.provenance;
  const crowdData = report.crowd_intelligence;

  const handleInvestigateAccount = (accountId: string, username: string) => {
    setSelectedAccountId(accountId);
    setSelectedUsername(username);
    setIsAccountModalOpen(true);
  };

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
              {report.is_deep_search && (
                <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1 font-bold">
                  <Search className="w-3 h-3" /> DEEP SEARCH ACTIVE
                </span>
              )}
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

        {/* SYSTEMIC FORENSIC SUMMARY CARDS */}
        {forensics && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* CARD 1: AI Generation Analysis */}
            <div className={`p-5 rounded-2xl glass-panel border space-y-3 ${
              forensics.ai_analysis.is_ai_generated
                ? 'border-rose-500/40 bg-rose-950/20'
                : 'border-emerald-500/30 bg-emerald-950/10'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-4 h-4 text-purple-400" /> AI Detection Analysis
                </span>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded border ${
                  forensics.ai_analysis.is_ai_generated
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                }`}>
                  {forensics.ai_analysis.is_ai_generated ? 'AI GENERATED' : 'OPTICAL PHOTO'}
                </span>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-black text-white">{forensics.ai_analysis.ai_probability_pct}%</span>
                  <span className="text-xs text-slate-400 font-mono">AI Probability</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-2 mt-1.5 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      forensics.ai_analysis.is_ai_generated ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${forensics.ai_analysis.ai_probability_pct}%` }}
                  />
                </div>
              </div>

              <div className="text-xs text-slate-300 pt-1 border-t border-slate-800/80">
                <span className="text-slate-500 font-mono block text-[10px]">CLASSIFIED GENERATOR</span>
                <span className="font-semibold text-slate-200">{forensics.ai_analysis.generator_type}</span>
              </div>
            </div>

            {/* CARD 2: Technical Image Specifications */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                  <FileImage className="w-4 h-4 text-blue-400" /> Image Specifications
                </span>
                <span className="text-[10px] font-mono font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                  {forensics.format}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">RESOLUTION</span>
                  <span className="font-bold text-slate-200">{forensics.resolution}</span>
                </div>
                <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 font-mono block">ASPECT RATIO</span>
                  <span className="font-bold text-slate-200">{forensics.aspect_ratio}</span>
                </div>
              </div>

              <div className="text-xs text-slate-300 pt-1 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 font-mono block text-[10px]">CAMERA METADATA</span>
                  <span className="font-medium text-slate-300">{forensics.camera_info}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 font-mono block text-[10px]">SOFTWARE TAG</span>
                  <span className="font-medium text-slate-300">{forensics.software_used}</span>
                </div>
              </div>
            </div>

            {/* CARD 3: Provenance Origin Quick Status */}
            <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 font-mono">
                  <GitBranch className="w-4 h-4 text-purple-400" /> Provenance & Context
                </span>
                {provenance && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                    provenance.has_context_shift
                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {provenance.provenance_status.replace('_', ' ')}
                  </span>
                )}
              </div>

              {provenance?.earliest_discovered_source && (
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block uppercase">Earliest Discovered Source</span>
                  <span className="text-sm font-extrabold text-white">{provenance.earliest_discovered_source.source_name}</span>
                  <span className="text-xs text-slate-400 block font-mono">First Seen: {provenance.earliest_discovered_source.first_seen_date}</span>
                </div>
              )}

              <p className="text-xs text-slate-300 leading-relaxed pt-1 border-t border-slate-800/80">
                {provenance?.context_summary || 'Media forensics evaluated against origin source database.'}
              </p>
            </div>

          </div>
        )}

        {/* TOP ACTIONS & TABS BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
            {[
              { key: 'overview', label: 'Overview & Scores', icon: <ShieldCheck className="w-4 h-4" /> },
              { key: 'provenance', label: 'Content Provenance Chain', icon: <GitBranch className="w-4 h-4" /> },
              { key: 'crowd', label: 'Crowd Intelligence', icon: <Users className="w-4 h-4" /> },
              { key: 'forensics', label: 'Systemic Content Breakdown', icon: <Cpu className="w-4 h-4" /> },
              { key: 'graph', label: 'Evidence Graph', icon: <Network className="w-4 h-4" /> },
              { key: 'timeline', label: 'Truth Timeline', icon: <Clock className="w-4 h-4" /> },
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
                  navigator.share({ title: 'Parakh AI Report', url: window.location.href });
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
            <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
              <h3 className="font-bold text-white text-base">5-Axis Trust Dimension Breakdown</h3>
              <ScoreDimensionsView scores={report.scores} />
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-white text-base">Key Forensics & Context Findings</h3>
              <FindingsList findings={report.findings} />
            </div>

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

        {/* TAB 2: CONTENT PROVENANCE CHAIN */}
        {activeTab === 'provenance' && (
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base mb-1">Content Provenance & Origin Chain</h3>
            <ProvenanceChain provenance={provenance} />
          </div>
        )}

        {/* TAB 3: CROWD INTELLIGENCE */}
        {activeTab === 'crowd' && (
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base mb-1">Crowd Intelligence & Sentiment Comparison</h3>
            <CrowdIntelligenceView
              crowdData={crowdData}
              onInvestigateAccount={handleInvestigateAccount}
            />
          </div>
        )}

        {/* TAB 4: SYSTEMIC CONTENT BREAKDOWN */}
        {activeTab === 'forensics' && (
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
            <div>
              <h3 className="font-bold text-white text-base mb-1">Systemic Content Integrity Breakdown</h3>
              <p className="text-xs text-slate-400">Detailed component-by-component audit of what elements are authentic, modified, or synthetic AI.</p>
            </div>

            {forensics && forensics.fake_content_analysis && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Detected Image Element Breakdown</h4>
                {forensics.fake_content_analysis.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-white">{item.element}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                          item.status === 'authentic'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : item.status === 'synthetic_ai'
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}>
                          {item.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: EVIDENCE GRAPH */}
        {activeTab === 'graph' && (
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div>
              <h3 className="font-bold text-white text-base mb-1">Interactive Verification Graph</h3>
              <p className="text-xs text-slate-400">Maps relationship nodes between content, extracted claims, origin sources, evidence, and crowd comments.</p>
            </div>
            <EvidenceGraph nodesData={report.graph_nodes} edgesData={report.graph_edges} />
          </div>
        )}

        {/* TAB 6: TRUTH TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div>
              <h3 className="font-bold text-white text-base mb-1">Chronological Truth Timeline</h3>
              <p className="text-xs text-slate-400">Traces historical appearances and context shifts from first discovery to present.</p>
            </div>
            <TruthTimeline events={report.timeline} />
          </div>
        )}

        {/* TAB 7: VERIFICATION RECEIPT */}
        {activeTab === 'receipt' && (
          <VerificationReceipt report={report} />
        )}

      </main>

      {/* Account Deep Search Drawer Modal */}
      <AccountIntelligenceModal
        accountId={selectedAccountId}
        username={selectedUsername}
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
      />

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
