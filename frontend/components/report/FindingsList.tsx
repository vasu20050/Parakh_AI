import React from 'react';
import { Finding } from '@/services/api';
import { AlertCircle, Info, AlertTriangle, ShieldCheck } from 'lucide-react';

interface FindingsListProps {
  findings: Finding[];
}

export default function FindingsList({ findings }: FindingsListProps) {
  const getSeverityBadge = (sev: Finding['severity']) => {
    switch (sev) {
      case 'high':
        return {
          icon: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
          badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
          label: 'HIGH IMPACT',
        };
      case 'medium':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
          label: 'MEDIUM SIGNAL',
        };
      case 'low':
        return {
          icon: <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />,
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          label: 'INFORMATIONAL',
        };
      default:
        return {
          icon: <Info className="w-4 h-4 text-blue-400 shrink-0" />,
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
          label: 'NOTE',
        };
    }
  };

  return (
    <div className="space-y-3">
      {findings.map((item) => {
        const config = getSeverityBadge(item.severity);
        return (
          <div
            key={item.id}
            className="p-4 rounded-xl glass-panel border border-slate-800 hover:border-slate-700 transition-colors flex items-start gap-3.5"
          >
            <div className="mt-0.5">{config.icon}</div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    {item.type}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${config.badge}`}>
                    {config.label}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
