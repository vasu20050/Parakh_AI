'use client';

import React, { useState } from 'react';
import { Link2, Search, ArrowRight, Sparkles, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function URLInput() {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const router = useRouter();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      router.push('/investigate/INV-2026-VIRAL-DEMO');
    }, 1000);
  };

  const sampleUrls = [
    { label: 'Viral Storm Video Claim', value: 'https://twitter.com/breakingnews/status/182109281' },
    { label: 'Unverified Deepfake Audio', value: 'https://telegram.org/p/unverified_audio_clip' },
    { label: 'Recycled Election Image', value: 'https://news.example.com/article/election-claim' },
  ];

  return (
    <form onSubmit={handleAnalyze} className="w-full space-y-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Globe className="h-5 w-5 text-blue-400" />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste URL (Tweet, News Article, YouTube, Telegram message, Image link)..."
          className="w-full pl-11 pr-32 py-4 bg-slate-900/60 border border-slate-700/80 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
        />
        <button
          type="submit"
          disabled={!url || isAnalyzing}
          className="absolute right-2 top-2 bottom-2 px-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-md"
        >
          {isAnalyzing ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Verify</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-1">
        <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
          <Sparkles className="w-3 h-3 text-amber-400" /> Try sample targets:
        </span>
        {sampleUrls.map((sample, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setUrl(sample.value)}
            className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-300 border border-slate-700/60 transition-colors"
          >
            {sample.label}
          </button>
        ))}
      </div>
    </form>
  );
}
