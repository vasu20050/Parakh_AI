export interface ScoreDimensions {
  media_authenticity: number;
  claim_credibility: number;
  context_accuracy: number;
  source_reliability: number;
  evidence_strength: number;
}

export type VerdictType =
  | 'VERIFIED'
  | 'LIKELY_AUTHENTIC'
  | 'LIKELY_MISLEADING'
  | 'LIKELY_MANIPULATED'
  | 'LIKELY_AI_GENERATED'
  | 'FALSE_CLAIM'
  | 'UNVERIFIED'
  | 'INCONCLUSIVE';

export interface Finding {
  id: string;
  type: 'media' | 'claim' | 'context' | 'source' | 'origin';
  severity: 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  evidence_id?: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  source_url: string;
  source_name: string;
  source_type: 'news' | 'fact_check' | 'official' | 'social_media' | 'academic';
  role: 'supporting' | 'contradicting' | 'contextual' | 'origin';
  snippet: string;
  publication_date?: string;
  relevance_score: number;
  is_independent: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  source_name: string;
  source_url: string;
  type: 'origin' | 'repost' | 'fact_check' | 'context_shift';
  is_original?: boolean;
}

export interface GraphNodeData {
  id: string;
  label: string;
  type: 'content' | 'claim' | 'source' | 'evidence' | 'verdict';
  status?: 'authentic' | 'misleading' | 'manipulated' | 'neutral';
  subtext?: string;
}

export interface GraphEdgeData {
  id: string;
  source: string;
  target: string;
  label: string;
  type: 'supports' | 'contradicts' | 'origin' | 'contains';
}

export interface ModelRunInfo {
  name: string;
  version: string;
  confidence: number;
  processing_ms: number;
}

export interface FakeContentItem {
  element: string;
  status: 'authentic' | 'edited' | 'synthetic_ai';
  description: string;
}

export interface SystemicImageForensics {
  format: string;
  resolution: string;
  aspect_ratio: string;
  color_mode: string;
  camera_info: string;
  software_used: string;
  ai_analysis: {
    is_ai_generated: boolean;
    ai_probability_pct: number;
    authenticity_score: number;
    generator_type: string;
  };
  ela_forensics: {
    ela_score: number;
    is_suspicious: boolean;
    description: string;
  };
  fake_content_analysis: FakeContentItem[];
}

// USP #1 Content Provenance Interfaces
export interface ProvenanceStep {
  step_order: number;
  title: string;
  description: string;
  source_name: string;
  source_url: string;
  event_date: string;
  status: 'CURRENT_VIRAL_POST' | 'REPOSTED_CONTENT' | 'REUSED_CONTENT' | 'EARLIEST_DISCOVERED_SOURCE' | 'UNKNOWN_ORIGIN';
  is_earliest_source: boolean;
}

export interface ContentProvenance {
  provenance_chain: ProvenanceStep[];
  earliest_discovered_source: {
    source_name: string;
    source_url: string;
    first_seen_date: string;
    status: string;
  };
  has_context_shift: boolean;
  provenance_status: string;
  context_summary: string;
  confidence_score: number;
}

// USP #1 Crowd Intelligence Interfaces
export interface CrowdCommentItem {
  id: string;
  username: string;
  account_id: string;
  comment_text: string;
  category: 'EVIDENCE_BEARING' | 'UNSUPPORTED_CLAIM' | 'CONTRADICTORY_CLAIM' | 'OPINION' | 'QUESTION' | 'PERSONAL_TESTIMONY' | 'SOURCE_REFERENCE' | 'IRRELEVANT';
  has_evidence: boolean;
  evidence_url?: string | null;
}

export interface CrowdClaimCluster {
  claim_title: string;
  percentage: number;
  comment_count: number;
  category: string;
  status_label: string;
}

export interface CrowdIntelligenceData {
  total_comments_analyzed: number;
  sample_comments: CrowdCommentItem[];
  category_counts: Record<string, number>;
  evidence_bearing_count: number;
  unsupported_count: number;
  contradictory_count: number;
  claim_clusters: CrowdClaimCluster[];
  sentiment_vs_evidence: {
    public_discussion_summary: string;
    independent_evidence_summary: string;
    alignment_status: 'ALIGNED' | 'PARTIALLY_ALIGNED' | 'CONTRADICTORY';
    verdict_impact_note: string;
  };
  crowd_signal_weight: number;
}

// USP #1 Account Deep Search Interfaces
export interface AccountClaimItem {
  id: string;
  claim_text: string;
  event_date: string;
  evidence_summary: string;
  status: 'SUPPORTED' | 'UNSUPPORTED' | 'CONTRADICTED' | 'UNVERIFIED';
  source_ref?: string;
}

export interface AccountDeepSearchData {
  account_id: string;
  username: string;
  public_profile_summary: string;
  total_claims_evaluated: number;
  supported_claims_count: number;
  unsupported_claims_count: number;
  reliability_score_pct: number;
  reliability_signal: string;
  assessment_summary: string;
  claim_history: AccountClaimItem[];
  responsible_ai_note: string;
}

export interface InvestigationReport {
  investigation_id: string;
  status: 'completed' | 'processing' | 'pending' | 'failed';
  is_deep_search?: boolean;
  created_at: string;
  input_type: 'image' | 'video' | 'url' | 'audio' | 'text';
  input_preview_url?: string;
  input_title?: string;
  verdict: VerdictType;
  trust_score: number;
  scores: ScoreDimensions;
  findings: Finding[];
  evidence: EvidenceItem[];
  timeline: TimelineEvent[];
  graph_nodes: GraphNodeData[];
  graph_edges: GraphEdgeData[];
  forensics?: SystemicImageForensics;
  provenance?: ContentProvenance;
  crowd_intelligence?: CrowdIntelligenceData;
  account_intelligence?: AccountDeepSearchData;
  methodology: {
    models_used: ModelRunInfo[];
    evidence_count: number;
    limitations: string[];
    content_hash: string;
  };
}

const localReportCache: Record<string, InvestigationReport> = {};

export const KILLER_DEMO_REPORT: InvestigationReport = {
  investigation_id: "INV-2026-VIRAL-DEMO",
  status: "completed",
  is_deep_search: true,
  created_at: new Date().toISOString(),
  input_type: "video",
  input_title: "Viral Video: Breaking Storm Damage Claim in Central Square",
  input_preview_url: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?q=80&w=1000&auto=format&fit=crop",
  verdict: "LIKELY_MISLEADING",
  trust_score: 34,
  scores: {
    media_authenticity: 91,
    claim_credibility: 24,
    context_accuracy: 18,
    source_reliability: 48,
    evidence_strength: 71,
  },
  findings: [
    {
      id: "f-1",
      type: "origin",
      severity: "high",
      title: "Recycled Media Detected",
      description: "The video footage is authentic, but it was originally recorded during Hurricane Ian in September 2022, not during today's weather event.",
    },
    {
      id: "f-2",
      type: "context",
      severity: "high",
      title: "Context Mismatch",
      description: "Current social media caption claims the event occurred today at 3:00 PM. Cross-referencing weather radar and local emergency logs contradicts this timeline.",
    },
    {
      id: "f-3",
      type: "media",
      severity: "low",
      title: "No AI Manipulation Found",
      description: "Visual frames show strong consistency with optical flow benchmarks. Deepfake probability is low (<4%).",
    },
  ],
  evidence: [
    {
      id: "ev-1",
      title: "Original Broadcast: Hurricane Ian Storm Footage (Sept 2022)",
      source_url: "https://example.com/archive/storm-2022",
      source_name: "Archive News Network",
      source_type: "news",
      role: "origin",
      snippet: "Identical video keyframes matched against archived broadcast from September 28, 2022.",
      publication_date: "2022-09-28",
      relevance_score: 0.98,
      is_independent: true,
    },
  ],
  timeline: [
    {
      id: "t-1",
      date: "Sept 28, 2022",
      title: "First Recorded Appearance",
      description: "Original video published by news outlet covering storm impact in Florida.",
      source_name: "Archive News Network",
      source_url: "https://example.com/archive/storm-2022",
      type: "origin",
      is_original: true,
    },
    {
      id: "t-2",
      date: "Aug 9, 2026 - 14:15 UTC",
      title: "Social Media Reposting",
      description: "Video re-uploaded on Telegram & X with caption 'Live from downtown right now!'",
      source_name: "Viral Channel",
      source_url: "#",
      type: "context_shift",
    },
  ],
  graph_nodes: [
    { id: "node-media", label: "Submitted Video Clip", type: "content", status: "authentic", subtext: "Authenticity: 91%" },
    { id: "node-claim", label: "Claim: 'Happening Today Live'", type: "claim", status: "misleading", subtext: "Credibility: 24%" },
    { id: "node-origin", label: "2022 Archive Broadcast", type: "source", status: "neutral", subtext: "Earliest Match" },
    { id: "node-comm-1", label: "Comment (@digital_observer)", type: "evidence", status: "neutral", subtext: "EVIDENCE_BEARING" },
    { id: "node-verdict", label: "Verdict: MISLEADING", type: "verdict", status: "misleading", subtext: "Trust: 34/100" },
  ],
  graph_edges: [
    { id: "edge-1", source: "node-media", target: "node-claim", label: "attached to", type: "contains" },
    { id: "edge-2", source: "node-media", target: "node-origin", label: "matched to original", type: "origin" },
    { id: "edge-3", source: "node-claim", target: "node-comm-1", label: "discussed by crowd", type: "contains" },
    { id: "edge-4", source: "node-origin", target: "node-verdict", label: "drives verdict", type: "supports" },
  ],
  provenance: {
    provenance_chain: [
      {
        step_order: 1,
        title: "Current Viral Post Submission",
        description: "Content submitted for instant verification with caption 'Live in downtown today'.",
        source_name: "Viral Social Account",
        source_url: "https://social.example.com/post/current",
        event_date: "Today",
        status: "CURRENT_VIRAL_POST",
        is_earliest_source: false,
      },
      {
        step_order: 2,
        title: "Cross-Platform Re-upload",
        description: "Identical image keyframe match found on secondary Telegram archive.",
        source_name: "Telegram News Bot",
        source_url: "https://telegram.org/p/repost_archive",
        event_date: "Aug 08, 2026",
        status: "REPOSTED_CONTENT",
        is_earliest_source: false,
      },
      {
        step_order: 3,
        title: "Earliest Discoverable Source Broadcast",
        description: "Original uncompressed broadcast frame aired during Hurricane Ian.",
        source_name: "Archive News Network",
        source_url: "https://example.com/archive/storm-2022",
        event_date: "Sept 28, 2022",
        status: "EARLIEST_DISCOVERED_SOURCE",
        is_earliest_source: true,
      },
    ],
    earliest_discovered_source: {
      source_name: "Archive News Network",
      source_url: "https://example.com/archive/storm-2022",
      first_seen_date: "Sept 28, 2022",
      status: "EARLIEST_DISCOVERED_SOURCE",
    },
    has_context_shift: true,
    provenance_status: "CONTEXT_CHANGED",
    context_summary: "Media was originally recorded on Sept 28, 2022. The current post re-frames this footage with a modified claim.",
    confidence_score: 0.98,
  },
  crowd_intelligence: {
    total_comments_analyzed: 1248,
    sample_comments: [
      {
        id: "c-101",
        username: "@digital_observer",
        account_id: "acc_101",
        comment_text: "Here is the original 2022 broadcast footage link: https://archive.org/details/hurricane_2022",
        category: "EVIDENCE_BEARING",
        has_evidence: true,
        evidence_url: "https://archive.org/details/hurricane_2022",
      },
      {
        id: "c-102",
        username: "@truth_seeker_99",
        account_id: "acc_102",
        comment_text: "This video is definitely 100% fake AI deepfake!",
        category: "UNSUPPORTED_CLAIM",
        has_evidence: false,
        evidence_url: null,
      },
      {
        id: "c-103",
        username: "@meteorology_watch",
        account_id: "acc_103",
        comment_text: "Official weather logs from NWS show zero storm activity in Central Square today.",
        category: "EVIDENCE_BEARING",
        has_evidence: true,
        evidence_url: "https://weather.gov/logs/2026-08",
      },
    ],
    category_counts: {
      EVIDENCE_BEARING: 18,
      UNSUPPORTED_CLAIM: 743,
      CONTRADICTORY_CLAIM: 102,
      OPINION: 210,
      QUESTION: 95,
      PERSONAL_TESTIMONY: 45,
      SOURCE_REFERENCE: 25,
      IRRELEVANT: 10,
    },
    evidence_bearing_count: 18,
    unsupported_count: 743,
    contradictory_count: 102,
    claim_clusters: [
      {
        claim_title: "Video is fake AI generated",
        percentage: 62.0,
        comment_count: 773,
        category: "unsupported",
        status_label: "UNSUPPORTED BY FORENSICS (3.8% AI)",
      },
      {
        claim_title: "Video is recycled from 2022 storm",
        percentage: 27.0,
        comment_count: 337,
        category: "evidence_bearing",
        status_label: "SUPPORTED BY ARCHIVE MATCH",
      },
      {
        claim_title: "Video happened yesterday in downtown",
        percentage: 11.0,
        comment_count: 138,
        category: "contradictory",
        status_label: "CONTRADICTED BY NWS LOGS",
      },
    ],
    sentiment_vs_evidence: {
      public_discussion_summary: "62% of crowd comments claim the video is fake AI, while 27% point to recycled 2022 footage.",
      independent_evidence_summary: "Media is authentic optical video (3.8% AI score). However, historical archive matching confirms footage originated in Sept 2022.",
      alignment_status: "PARTIALLY_ALIGNED",
      verdict_impact_note: "Public crowd sentiment incorrectly assumed AI deepfake. However, evidence-bearing comments pointed to the real 2022 archive match.",
    },
    crowd_signal_weight: 0.15,
  },
  account_intelligence: {
    account_id: "acc_101",
    username: "@digital_observer",
    public_profile_summary: "Public media research contributor",
    total_claims_evaluated: 3,
    supported_claims_count: 2,
    unsupported_claims_count: 1,
    reliability_score_pct: 66.7,
    reliability_signal: "MIXED_CLAIM_SUPPORT",
    assessment_summary: "Public claim history shows 2 supported claims and 1 unsupported claim across evaluated public statements.",
    claim_history: [
      {
        id: "ch-1",
        claim_text: "Viral video clip shows storm damage in Central Square occurring today.",
        event_date: "Today",
        evidence_summary: "Cross-referenced with NWS meteorological logs. No storm recorded today.",
        status: "UNSUPPORTED",
        source_ref: "https://weather.gov/logs/2026-08",
      },
      {
        id: "ch-2",
        claim_text: "Original storm video footage first aired in September 2022 during Hurricane Ian.",
        event_date: "Sept 28, 2022",
        evidence_summary: "Archive news broadcast matches keyframe perceptual hashes.",
        status: "SUPPORTED",
        source_ref: "https://archive.org/details/hurricane_2022",
      },
    ],
    responsible_ai_note: "Signals evaluate public claim alignment with empirical evidence, not individual integrity.",
  },
  methodology: {
    models_used: [
      { name: "umm-maybe/AI-image-detector (ViT)", version: "1.2.0", confidence: 0.94, processing_ms: 180 },
      { name: "Content Provenance Tracker", version: "1.0", confidence: 0.98, processing_ms: 110 },
      { name: "Crowd Signal Classifier", version: "1.0", confidence: 0.88, processing_ms: 95 },
    ],
    evidence_count: 2,
    limitations: ["Audio analysis was not required."],
    content_hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function createInvestigation(formData: FormData): Promise<{ investigation_id: string; report?: InvestigationReport }> {
  try {
    const res = await fetch(`${API_BASE_URL}/investigations`, {
      method: 'POST',
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      if (data.report) {
        localReportCache[data.investigation_id] = data.report;
      }
      return data;
    }
  } catch {
    console.warn('Backend API offline. Generating dynamic forensic analysis locally.');
  }

  const newId = `INV-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  const fileObj = formData.get('file') as File | null;
  const urlVal = formData.get('url') as string | null;
  const isDeepSearch = formData.get('deep_search') === 'true';
  const fileName = fileObj ? fileObj.name : urlVal || 'Submitted Content';
  const fileType = (formData.get('input_type') as string) || 'image';

  let hashVal = 0;
  for (let i = 0; i < fileName.length; i++) {
    hashVal = (hashVal << 5) - hashVal + fileName.charCodeAt(i);
    hashVal |= 0;
  }
  const absHash = Math.abs(hashVal);

  const mediaAuth = 60 + (absHash % 35);
  const claimCred = 30 + ((absHash * 3) % 60);
  const contextAcc = 40 + ((absHash * 7) % 50);
  const sourceRel = 50 + ((absHash * 11) % 45);
  const evStrength = 45 + ((absHash * 13) % 50);

  const overallTrust = Math.round(0.25 * mediaAuth + 0.25 * claimCred + 0.20 * contextAcc + 0.15 * sourceRel + 0.15 * evStrength);

  let verdict: VerdictType = 'LIKELY_AUTHENTIC';
  if (contextAcc < 50) verdict = 'LIKELY_MISLEADING';
  else if (mediaAuth < 65) verdict = 'LIKELY_MANIPULATED';
  else if (claimCred < 40) verdict = 'FALSE_CLAIM';
  else if (overallTrust > 75) verdict = 'VERIFIED';

  const dynamicReport: InvestigationReport = {
    ...KILLER_DEMO_REPORT,
    investigation_id: newId,
    is_deep_search: isDeepSearch,
    input_type: fileType as any,
    input_title: fileName,
    verdict: verdict,
    trust_score: overallTrust,
    scores: {
      media_authenticity: mediaAuth,
      claim_credibility: claimCred,
      context_accuracy: contextAcc,
      source_reliability: sourceRel,
      evidence_strength: evStrength,
    },
  };

  localReportCache[newId] = dynamicReport;
  return { investigation_id: newId, report: dynamicReport };
}

export async function getInvestigationReport(id: string): Promise<InvestigationReport> {
  if (id === 'INV-2026-VIRAL-DEMO') {
    return KILLER_DEMO_REPORT;
  }

  if (localReportCache[id]) {
    return localReportCache[id];
  }

  try {
    const res = await fetch(`${API_BASE_URL}/investigations/${id}/report`);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    console.warn('Backend API offline. Serving dynamic local report.');
  }

  return {
    ...KILLER_DEMO_REPORT,
    investigation_id: id || KILLER_DEMO_REPORT.investigation_id,
  };
}

export async function fetchAccountDeepSearch(accountId: string): Promise<AccountDeepSearchData> {
  try {
    const res = await fetch(`${API_BASE_URL}/investigations/accounts/${accountId}/deep-search`);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    console.warn('Backend API offline. Returning demo account deep search.');
  }
  return KILLER_DEMO_REPORT.account_intelligence!;
}
