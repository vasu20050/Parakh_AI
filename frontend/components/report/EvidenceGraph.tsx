'use client';

import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls, Node, Edge, Position } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { GraphNodeData, GraphEdgeData } from '@/services/api';

interface EvidenceGraphProps {
  nodesData: GraphNodeData[];
  edgesData: GraphEdgeData[];
}

export default function EvidenceGraph({ nodesData, edgesData }: EvidenceGraphProps) {
  const initialNodes: Node[] = useMemo(() => {
    return nodesData.map((n, idx) => {
      let bg = 'bg-slate-900 border-slate-700 text-white';
      if (n.type === 'content') bg = 'bg-blue-950/80 border-blue-500 text-blue-200';
      if (n.type === 'claim') bg = 'bg-amber-950/80 border-amber-500 text-amber-200';
      if (n.type === 'source') bg = 'bg-indigo-950/80 border-indigo-500 text-indigo-200';
      if (n.type === 'evidence') bg = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
      if (n.type === 'verdict') bg = 'bg-rose-950/80 border-rose-500 text-rose-200';

      const xPos = (idx % 3) * 260 + 40;
      const yPos = Math.floor(idx / 3) * 150 + 40;

      return {
        id: n.id,
        position: { x: xPos, y: yPos },
        data: {
          label: (
            <div className={`p-3 rounded-xl border shadow-xl backdrop-blur-md ${bg} text-left`}>
              <div className="text-[10px] uppercase font-mono tracking-wider opacity-70 mb-1">{n.type}</div>
              <div className="font-bold text-xs leading-tight mb-1">{n.label}</div>
              {n.subtext && <div className="text-[10px] opacity-80">{n.subtext}</div>}
            </div>
          ),
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
    });
  }, [nodesData]);

  const initialEdges: Edge[] = useMemo(() => {
    return edgesData.map((e) => {
      let stroke = '#64748b';
      if (e.type === 'contradicts') stroke = '#ef4444';
      if (e.type === 'supports') stroke = '#10b981';
      if (e.type === 'origin') stroke = '#8b5cf6';

      return {
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        animated: true,
        style: { stroke, strokeWidth: 2 },
        labelStyle: { fill: '#94a3b8', fontSize: 10, fontWeight: 600 },
        labelBgStyle: { fill: '#0f172a', rx: 4 },
      };
    });
  }, [edgesData]);

  return (
    <div className="w-full h-80 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950/90 relative">
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
        <Background color="#334155" gap={20} size={1} />
        <Controls className="bg-slate-900 text-slate-200 border-slate-800" />
      </ReactFlow>
      <div className="absolute bottom-2 right-2 text-[10px] text-slate-500 font-mono bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
        Interactive Evidence Graph • Click and Drag Nodes
      </div>
    </div>
  );
}
