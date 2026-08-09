import React from 'react';
import { TimelineEvent } from '@/services/api';
import { Clock, ExternalLink, Calendar, History, AlertCircle } from 'lucide-react';

interface TruthTimelineProps {
  events: TimelineEvent[];
}

export default function TruthTimeline({ events }: TruthTimelineProps) {
  return (
    <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
      {events.map((evt) => {
        const isOriginal = evt.is_original;
        return (
          <div key={evt.id} className="relative group">
            {/* Timeline Marker Dot */}
            <div
              className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                isOriginal
                  ? 'bg-purple-500 border-purple-300 shadow-lg shadow-purple-500/50'
                  : evt.type === 'context_shift'
                  ? 'bg-amber-500 border-amber-300 shadow-lg shadow-amber-500/40'
                  : 'bg-blue-600 border-slate-700'
              }`}
            >
              {isOriginal ? (
                <History className="w-2.5 h-2.5 text-white" />
              ) : (
                <Clock className="w-2.5 h-2.5 text-white" />
              )}
            </div>

            {/* Content Box */}
            <div className="p-4 rounded-xl glass-panel border border-slate-800 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  {evt.date}
                </span>

                {isOriginal && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Earliest Discovered Origin
                  </span>
                )}
                {evt.type === 'context_shift' && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Context Mismatch Event
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-white mb-1">{evt.title}</h4>
              <p className="text-xs text-slate-300 mb-2 leading-relaxed">{evt.description}</p>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
                <span className="text-slate-400 font-medium">Source: {evt.source_name}</span>
                {evt.source_url && evt.source_url !== '#' && (
                  <a
                    href={evt.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 hover:underline flex items-center gap-1 font-mono"
                  >
                    Inspect Evidence <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
