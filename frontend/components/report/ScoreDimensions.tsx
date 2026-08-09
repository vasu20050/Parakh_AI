'use client';

import React from 'react';
import { ScoreDimensions } from '@/services/api';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

interface ScoreDimensionsProps {
  scores: ScoreDimensions;
}

export default function ScoreDimensionsView({ scores }: ScoreDimensionsProps) {
  const data = [
    { subject: 'Media Authenticity', value: scores.media_authenticity, fullMark: 100 },
    { subject: 'Claim Credibility', value: scores.claim_credibility, fullMark: 100 },
    { subject: 'Context Accuracy', value: scores.context_accuracy, fullMark: 100 },
    { subject: 'Source Signals', value: scores.source_reliability, fullMark: 100 },
    { subject: 'Evidence Strength', value: scores.evidence_strength, fullMark: 100 },
  ];

  const dimensionsList = [
    { label: 'Media Authenticity', score: scores.media_authenticity, desc: 'Forensic integrity & AI probability' },
    { label: 'Claim Credibility', score: scores.claim_credibility, desc: 'Factual claim alignment with facts' },
    { label: 'Context Accuracy', score: scores.context_accuracy, desc: 'Event, location & temporal match' },
    { label: 'Source Signals', score: scores.source_reliability, desc: 'Publisher footprint & historical consistency' },
    { label: 'Evidence Strength', score: scores.evidence_strength, desc: 'Relevance, quality & source independence' },
  ];

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
      {/* Radar Chart */}
      <div className="md:col-span-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
            <PolarAngleAxis dataKey="subject" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(255, 255, 255, 0.2)" />
            <Radar name="Trust Score" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.35} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Progress Bars Breakdown */}
      <div className="md:col-span-6 space-y-3">
        {dimensionsList.map((dim, idx) => {
          const getColor = (s: number) => {
            if (s >= 75) return 'bg-emerald-500';
            if (s >= 50) return 'bg-amber-500';
            if (s >= 25) return 'bg-orange-500';
            return 'bg-rose-500';
          };

          return (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">{dim.label}</span>
                <span className="font-mono font-bold text-slate-300">{dim.score}/100</span>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700/50">
                <div
                  className={`h-full ${getColor(dim.score)} transition-all duration-700 ease-out`}
                  style={{ width: `${dim.score}%` }}
                />
              </div>
              <p className="text-[10px] text-slate-400">{dim.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
