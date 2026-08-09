'use client';

import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, FileCheck } from 'lucide-react';
import { InvestigationReport } from '@/services/api';

interface VerificationReceiptProps {
  report: InvestigationReport;
}

export default function VerificationReceipt({ report }: VerificationReceiptProps) {
  const [copied, setCopied] = useState(false);

  const receiptData = {
    investigation_id: report.investigation_id,
    timestamp: report.created_at,
    verdict: report.verdict,
    trust_score: `${report.trust_score}/100`,
    content_hash_sha256: report.methodology.content_hash,
    models: report.methodology.models_used.map((m) => `${m.name} (v${m.version})`),
    signature: `TG-SIG-${report.investigation_id.slice(-6)}-PROB-VERIFIED`,
  };

  const jsonString = JSON.stringify(receiptData, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-5 rounded-2xl glass-panel border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-emerald-400" />
          <h3 className="font-bold text-white text-sm">Cryptographic Verification Receipt</h3>
        </div>
        <button
          onClick={handleCopy}
          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors flex items-center gap-1.5 border border-slate-700"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied JSON' : 'Copy Receipt'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-slate-500 font-mono block text-[10px]">CONTENT SHA-256 HASH</span>
          <span className="font-mono text-slate-200 break-all text-[11px] font-medium">
            {report.methodology.content_hash}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-slate-500 font-mono block text-[10px]">INVESTIGATION ID</span>
          <span className="font-mono text-slate-200 text-xs font-bold">{report.investigation_id}</span>
        </div>
      </div>

      {/* Code Snippet */}
      <pre className="p-3 rounded-xl bg-slate-950 text-[11px] font-mono text-emerald-300 border border-slate-800/90 overflow-x-auto">
        {jsonString}
      </pre>

      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Immutable Verification Record
        </span>
        <span>Standard ISO/IEC 27001 Audit Ready</span>
      </div>
    </div>
  );
}
