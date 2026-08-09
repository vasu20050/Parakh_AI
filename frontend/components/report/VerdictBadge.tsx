import React from 'react';
import { VerdictType } from '@/services/api';
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, ShieldAlert, Sparkles } from 'lucide-react';

interface VerdictBadgeProps {
  verdict: VerdictType;
  size?: 'sm' | 'md' | 'lg';
}

export default function VerdictBadge({ verdict, size = 'md' }: VerdictBadgeProps) {
  const getVerdictConfig = () => {
    switch (verdict) {
      case 'VERIFIED':
        return {
          label: 'VERIFIED',
          subtext: 'Strong available evidence supports content and claims',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: <CheckCircle2 className="w-4 h-4" />,
        };
      case 'LIKELY_AUTHENTIC':
        return {
          label: 'LIKELY AUTHENTIC',
          subtext: 'Media appears genuine with no strong manipulation indicators',
          bg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          icon: <CheckCircle2 className="w-4 h-4" />,
        };
      case 'LIKELY_MISLEADING':
        return {
          label: 'MISLEADING CONTEXT',
          subtext: 'Media may be real but claim or temporal context is inaccurate',
          bg: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
          icon: <AlertTriangle className="w-4 h-4" />,
        };
      case 'LIKELY_MANIPULATED':
        return {
          label: 'MANIPULATED MEDIA',
          subtext: 'Forensic evidence indicates digital editing or alteration',
          bg: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
          icon: <ShieldAlert className="w-4 h-4" />,
        };
      case 'LIKELY_AI_GENERATED':
        return {
          label: 'AI GENERATED',
          subtext: 'Strong statistical indicators suggest synthetic AI generation',
          bg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          icon: <XCircle className="w-4 h-4" />,
        };
      case 'FALSE_CLAIM':
        return {
          label: 'FALSE CLAIM',
          subtext: 'Reliable retrieved evidence directly contradicts the claim',
          bg: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          icon: <XCircle className="w-4 h-4" />,
        };
      default:
        return {
          label: 'UNVERIFIED / INCONCLUSIVE',
          subtext: 'Available evidence is incomplete or conflicting',
          bg: 'bg-slate-500/15 text-slate-400 border-slate-500/30',
          icon: <HelpCircle className="w-4 h-4" />,
        };
    }
  };

  const config = getVerdictConfig();
  const sizeClasses =
    size === 'lg'
      ? 'px-4 py-2 text-sm font-extrabold gap-2 rounded-xl border'
      : size === 'sm'
      ? 'px-2.5 py-0.5 text-xs font-bold gap-1 rounded-md border'
      : 'px-3 py-1.5 text-xs font-bold gap-1.5 rounded-lg border';

  return (
    <div className={`inline-flex items-center ${config.bg} ${sizeClasses} shadow-sm backdrop-blur-md`}>
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
}
