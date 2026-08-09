'use client';

import React from 'react';

interface TrustScoreGaugeProps {
  score: number; // 0 - 100
  size?: number;
}

export default function TrustScoreGauge({ score, size = 220 }: TrustScoreGaugeProps) {
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc angle is 240 degrees (0.666 of circle)
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (score / 100) * arcLength;

  const getScoreColor = () => {
    if (score >= 75) return { stroke: '#10b981', text: 'text-emerald-400', glow: 'rgba(16, 185, 129, 0.3)', status: 'High Trust' };
    if (score >= 50) return { stroke: '#f59e0b', text: 'text-amber-400', glow: 'rgba(245, 158, 11, 0.3)', status: 'Moderate Trust' };
    if (score >= 25) return { stroke: '#f97316', text: 'text-orange-400', glow: 'rgba(249, 115, 22, 0.3)', status: 'Low Trust' };
    return { stroke: '#ef4444', text: 'text-rose-400', glow: 'rgba(239, 68, 68, 0.3)', status: 'Very Low Trust' };
  };

  const config = getScoreColor();

  return (
    <div className="relative flex flex-col items-center justify-center p-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-135" viewBox={`0 0 ${size} ${size}`}>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />

          {/* Value Progress Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={config.stroke}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 12px ${config.glow})`,
            }}
          />
        </svg>

        {/* Center Score Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-1">
            Trust Score
          </span>
          <div className="flex items-baseline gap-0.5">
            <span className={`text-5xl font-black tracking-tight ${config.text}`}>
              {score}
            </span>
            <span className="text-sm font-semibold text-slate-500">/100</span>
          </div>
          <span className={`text-xs font-bold mt-1 px-2.5 py-0.5 rounded-full border border-slate-800 ${config.text} bg-slate-900/80`}>
            {config.status}
          </span>
        </div>
      </div>

      <p className="text-[11px] text-slate-400 mt-2 text-center max-w-[200px]">
        Calibrated probabilistic assessment across 5 evidence dimensions
      </p>
    </div>
  );
}
