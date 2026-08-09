'use client';

import React, { useState } from 'react';
import { HelpCircle, X, Sparkles, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { InvestigationReport } from '@/services/api';

interface ChallengeVerdictProps {
  report: InvestigationReport;
  isOpen: boolean;
  onClose: () => void;
}

export default function ChallengeVerdictModal({ report, isOpen, onClose }: ChallengeVerdictProps) {
  const [query, setQuery] = useState('');
  const [answers, setAnswers] = useState<{ question: string; answer: string }[]>([]);

  if (!isOpen) return null;

  const presetQuestions = [
    "Why was this flagged as Misleading instead of Deepfake?",
    "Show me the strongest contradicting evidence.",
    "What would be required to change this verdict to Authentic?",
    "Are there any missing metadata signals?",
  ];

  const handleAsk = (q: string) => {
    let answerText = "";
    if (q.includes("Why was this flagged")) {
      answerText = `The platform separated media forensics from claim context. While the video frame analysis scored 91/100 (authentic pixels), the accompanying text claim ("Happening today") was matched against an archived broadcast from September 2022. This mismatch triggered the LIKELY_MISLEADING verdict according to Rule #2 of our Responsible AI engine.`;
    } else if (q.includes("strongest contradicting evidence")) {
      answerText = `The strongest contradicting item is Evidence #EV-1 (Archive News Network broadcast from Sept 28, 2022) combined with National Weather Service daily logs showing zero storm activity in Central Square today.`;
    } else if (q.includes("change this verdict")) {
      answerText = `To reclassify as VERIFIED, the submitter would need to provide verified primary meteorological data confirming tornado activity in Central Square on August 9, 2026, or demonstrate that the original 2022 footage was independently recorded today in identical weather conditions.`;
    } else {
      answerText = `EXIF metadata was missing from the social re-upload, which is common during platform compression. Missing metadata was NOT penalized as negative evidence (Rule #3).`;
    }

    setAnswers((prev) => [{ question: q, answer: answerText }, ...prev]);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white text-base">Challenge My Verdict</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 leading-relaxed flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <span>
              TrustGraph results are explainable and evidence-backed. Ask any question regarding model confidence, retrieved sources, or verdict methodology.
            </span>
          </div>

          {/* Presets */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Suggested Questions</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presetQuestions.map((pq, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAsk(pq)}
                  className="p-2.5 text-left text-xs bg-slate-800/60 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-700/60 transition-all hover:border-blue-500/40 flex items-center justify-between"
                >
                  <span className="line-clamp-2">{pq}</span>
                  <ArrowRight className="w-3 h-3 text-slate-500 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Q&A List */}
          {answers.length > 0 && (
            <div className="space-y-4 pt-2 border-t border-slate-800">
              {answers.map((qa, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Q: {qa.question}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{qa.answer}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query) handleAsk(query);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask why a specific score was assigned..."
              className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={!query}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all disabled:opacity-40"
            >
              Ask Engine
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
