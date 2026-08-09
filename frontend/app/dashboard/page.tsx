'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VerdictBadge from '@/components/report/VerdictBadge';
import Link from 'next/link';
import { Search, Filter, ArrowRight, LayoutDashboard, Film, FileImage, Globe, AlertTriangle, ShieldCheck } from 'lucide-react';
import { VerdictType } from '@/services/api';

interface SampleInvestigation {
  id: string;
  title: string;
  type: 'image' | 'video' | 'url';
  date: string;
  verdict: VerdictType;
  trust_score: number;
}

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'url'>('all');

  const history: SampleInvestigation[] = [
    {
      id: 'INV-2026-VIRAL-DEMO',
      title: 'Viral Video: Storm Damage Claim in Central Square',
      type: 'video',
      date: '2026-08-09 15:30',
      verdict: 'LIKELY_MISLEADING',
      trust_score: 34,
    },
    {
      id: 'INV-2026-88491',
      title: 'Press Release Image: Solar Breakthrough Claim',
      type: 'image',
      date: '2026-08-08 11:20',
      verdict: 'LIKELY_AUTHENTIC',
      trust_score: 88,
    },
    {
      id: 'INV-2026-77319',
      title: 'Social Post Screenshot: Alleged Executive Speech Quote',
      type: 'url',
      date: '2026-08-07 09:45',
      verdict: 'FALSE_CLAIM',
      trust_score: 18,
    },
    {
      id: 'INV-2026-66120',
      title: 'Synthesized Voice Memo of Candidate',
      type: 'video',
      date: '2026-08-05 18:10',
      verdict: 'LIKELY_AI_GENERATED',
      trust_score: 12,
    },
  ];

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    if (type === 'image') return <FileImage className="w-4 h-4 text-blue-400" />;
    if (type === 'video') return <Film className="w-4 h-4 text-purple-400" />;
    return <Globe className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 relative overflow-hidden flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full z-10 space-y-8">
        
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-6 h-6 text-emerald-400" />
              <h1 className="text-2xl font-extrabold text-white">Investigation Workspace</h1>
            </div>
            <p className="text-xs text-slate-400">Manage past verifications, trace content updates, and inspect audit logs.</p>
          </div>

          <Link
            href="/"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20"
          >
            <span>+ New Investigation</span>
          </Link>
        </div>

        {/* METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-mono uppercase">TOTAL VERIFICATIONS</span>
            <div className="text-2xl font-black text-white">1,482</div>
            <span className="text-[10px] text-emerald-400">+12% this week</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-mono uppercase">VERIFIED AUTHENTIC</span>
            <div className="text-2xl font-black text-emerald-400">842</div>
            <span className="text-[10px] text-slate-500">56.8% of total</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-mono uppercase">MISLEADING / MANIPULATED</span>
            <div className="text-2xl font-black text-amber-400">419</div>
            <span className="text-[10px] text-slate-500">28.2% of total</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <span className="text-[10px] text-slate-400 font-mono uppercase">SYNTHETIC AI GENERATED</span>
            <div className="text-2xl font-black text-rose-400">221</div>
            <span className="text-[10px] text-slate-500">14.9% of total</span>
          </div>
        </div>

        {/* FILTERS & SEARCH */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or investigation ID..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500" />
            {(['all', 'image', 'video', 'url'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all ${
                  filterType === type ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* INVESTIGATION HISTORY LIST */}
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0 mt-0.5 sm:mt-0">
                  {getTypeIcon(item.type)}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">{item.id}</span>
                    <span className="text-[10px] text-slate-500 font-mono">• {item.date}</span>
                  </div>
                  <h3 className="font-bold text-sm text-white">{item.title}</h3>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                <VerdictBadge verdict={item.verdict} size="sm" />
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-200">{item.trust_score}/100</div>
                  <span className="text-[10px] text-slate-500">Trust Score</span>
                </div>
                <Link
                  href={`/investigate/${item.id}`}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-300 hover:text-white border border-slate-800 transition-all"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
