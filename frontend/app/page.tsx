'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DropZone from '@/components/upload/DropZone';
import URLInput from '@/components/upload/URLInput';
import Link from 'next/link';
import { ShieldCheck, Cpu, GitBranch, Layers, Sparkles, ArrowRight, PlayCircle, CheckCircle, Lock, Eye } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 relative overflow-hidden flex flex-col">
      {/* Background Orbs & Grid */}
      <div className="ambient-orb-1" />
      <div className="ambient-orb-2" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 w-full z-10 space-y-20">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-6 max-w-4xl mx-auto pt-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{t('heroBadge')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            {t('heroTitle1')} <br />
            <span className="gradient-text">{t('heroTitle2')}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {t('heroDesc')}
          </p>

          {/* KILLER DEMO QUICK LAUNCH BUTTON */}
          <div className="pt-2">
            <Link
              href="/investigate/INV-2026-VIRAL-DEMO"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold transition-all shadow-lg shadow-purple-500/10 hover:scale-[1.02]"
            >
              <PlayCircle className="w-4 h-4 text-purple-400" />
              <span>Launch Killer Demo Scenario: Viral Video Context Mismatch</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* VERIFICATION INTERFACE CARD */}
        <section className="max-w-3xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl glow-box border border-slate-800">
          
          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-2 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800/80 max-w-md mx-auto mb-6">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'upload'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              {t('tabUpload')}
            </button>

            <button
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
                activeTab === 'url'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-4 h-4" />
              {t('tabUrl')}
            </button>
          </div>

          {/* Active Tab Panel */}
          {activeTab === 'upload' ? <DropZone /> : <URLInput />}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-6 border-t border-slate-800/80 text-center text-xs text-slate-400">
            <div className="flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>Private & Secure Uploads</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Responsible AI Compliant</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5 text-purple-400" />
              <span>Origin & Source Tracing</span>
            </div>
          </div>
        </section>

        {/* DIFFERENTIATION MATRIX SECTION */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Why Conventional Detectors Fail</h2>
            <p className="text-sm text-slate-400">An authentic image can still accompany a completely fabricated claim.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Conventional Detector Card */}
            <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Conventional AI Detectors
              </div>
              <ul className="space-y-3 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Asks only one basic question: "Is this media AI-generated?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Outputs a single black-box score without explainable evidence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Fails when a real 2020 video is reposted with a false 2026 caption.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">✕</span>
                  <span>Ignores factual claim credibility, source footprint, and context.</span>
                </li>
              </ul>
            </div>

            {/* Parakh AI Evidence Engine */}
            <div className="p-6 rounded-2xl glass-panel border border-blue-500/30 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Parakh AI Evidence Engine
              </div>
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Evaluates Media Authenticity, Claim Truth, and Context independently.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Generates an interactive Evidence Graph and chronological Truth Timeline.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Traces media back to its earliest discovered historical appearance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>Provides cryptographic Verification Receipts for complete auditability.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* 5 SCORING DIMENSIONS OVERVIEW */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">5-Axis Trust Framework</h2>
            <p className="text-sm text-slate-400">Multi-dimensional scoring ensures balanced decision support.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: 'Media Authenticity', desc: 'Forensic checks for AI generation, ELA artifacts, and face manipulation.', icon: <Cpu className="w-5 h-5 text-blue-400" /> },
              { title: 'Claim Credibility', desc: 'Open-source NLP extracts claims and verifies against retrieved evidence.', icon: <Sparkles className="w-5 h-5 text-purple-400" /> },
              { title: 'Context Accuracy', desc: 'Cross-checks location, weather, date, and event metadata.', icon: <Eye className="w-5 h-5 text-amber-400" /> },
              { title: 'Source Signals', desc: 'Evaluates publisher history, reliability footprint, and activity.', icon: <Layers className="w-5 h-5 text-emerald-400" /> },
              { title: 'Evidence Strength', desc: 'Weights relevance, independence, and recency of retrieved sources.', icon: <GitBranch className="w-5 h-5 text-indigo-400" /> },
            ].map((dim, idx) => (
              <div key={idx} className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-2 hover:border-slate-700 transition-colors">
                <div className="p-2 rounded-xl bg-slate-900 w-fit border border-slate-800">{dim.icon}</div>
                <h3 className="font-bold text-sm text-white">{dim.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{dim.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
