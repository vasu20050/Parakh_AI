'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Cpu, Server, Activity, ShieldAlert, CheckCircle2, Clock } from 'lucide-react';

export default function AdminPage() {
  const auditFeed = [
    { time: '18:14:02', action: 'MODEL_INVOCATION', details: 'umm-maybe/AI-image-detector executed on INV-2026-VIRAL-DEMO', status: 'success' },
    { time: '18:13:58', action: 'CLAIM_EXTRACTION', details: 'Gemini 1.5 Flash extracted 3 factual claims from transcript', status: 'success' },
    { time: '18:12:45', action: 'EVIDENCE_SEARCH', details: 'Google Custom Search retrieved 14 candidate sources', status: 'success' },
    { time: '18:10:11', action: 'ORIGIN_TRACKING', details: 'Reverse image match found 2022 Archive Broadcast', status: 'success' },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 relative overflow-hidden flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full z-10 space-y-8">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl font-extrabold text-white">System Operations & Admin Console</h1>
          </div>
          <p className="text-xs text-slate-400">Real-time model cluster telemetry, worker queues, and audit trail.</p>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>WORKER CLUSTER</span>
              <Server className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl font-black text-white">8 Active Workers</div>
            <span className="text-[10px] text-emerald-400">Redis Queue Healthy</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>AVG INFERENCE LATENCY</span>
              <Activity className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-xl font-black text-blue-400">320 ms</div>
            <span className="text-[10px] text-slate-500">P95: 680 ms</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>DAILY VERIFICATION VOLUME</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl font-black text-purple-400">1,482</div>
            <span className="text-[10px] text-slate-500">0.02% failure rate</span>
          </div>

          <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>BENCHMARK CALIBRATION</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl font-black text-amber-400">96.4% F1 Score</div>
            <span className="text-[10px] text-slate-500">Calibrated vs Expert Labels</span>
          </div>
        </div>

        {/* AUDIT LOG FEED */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-base">Real-time System Audit Stream</h3>
          <div className="space-y-2">
            {auditFeed.map((log, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-slate-500">{log.time}</span>
                  <span className="font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">{log.action}</span>
                  <span className="text-slate-300">{log.details}</span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
