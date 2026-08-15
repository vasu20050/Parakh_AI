import os
import uuid
import hashlib
from datetime import datetime
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.models.investigation import Investigation, FileRecord, MediaAnalysis, ModelRun
from backend.models.claim import Claim, Evidence
from backend.models.score import Score, VerdictRecord, ReportRecord
from ml.image.ai_detector import detect_ai_generated_image
from ml.image.manipulation import analyze_error_level
from ml.image.metadata import analyze_image_metadata
from ml.image.face_analysis import analyze_faces_in_image
from backend.trust_engine.scorer import calculate_trust_scores
from backend.trust_engine.verdict import determine_verdict
from backend.trust_engine.explainer import generate_report_explanation
from backend.provenance.engine import analyze_content_provenance
from backend.crowd_intelligence.analyzer import analyze_crowd_intelligence
from backend.account_intelligence.deep_search import perform_account_deep_search

async def run_full_investigation_pipeline(investigation_id: str, file_path: str, db: AsyncSession, is_deep_search: bool = False) -> dict:
    """Executes full forensics, claim, provenance search, crowd analysis, scoring, and report storage pipeline."""
    # 1. Media Forensics
    ai_res = detect_ai_generated_image(file_path)
    ela_res = analyze_error_level(file_path)
    exif_res = analyze_image_metadata(file_path)
    face_res = analyze_faces_in_image(file_path)

    media_results = [ai_res, ela_res, exif_res, face_res]

    # Calculate content hash
    with open(file_path, 'rb') as f:
        file_hash = hashlib.sha256(f.read()).hexdigest()

    filename = os.path.basename(file_path)

    # 2. Provenance Chain Analysis
    provenance_data = analyze_content_provenance(filename, file_hash)

    # 3. Crowd Intelligence Analysis
    crowd_data = analyze_crowd_intelligence(content_title=filename)

    # 4. Account Deep Search Analysis (if enabled or sample account)
    account_data = perform_account_deep_search("acc_101", "@digital_observer") if is_deep_search else None

    # 5. Score Calculation
    scores = calculate_trust_scores(media_results, [], [])
    
    # 6. Verdict Determination
    findings = [
        {
            "id": "f-1",
            "type": "media",
            "severity": "high" if ai_res.get("is_ai_generated") else "low",
            "title": "AI Generation Analysis",
            "description": f"ViT Classifier assigned {ai_res.get('authenticity_score')}% authenticity confidence."
        },
        {
            "id": "f-2",
            "type": "media",
            "severity": "medium" if ela_res.get("is_suspicious") else "low",
            "title": "Error Level Forensics (ELA)",
            "description": ela_res.get("description")
        },
        {
            "id": "f-3",
            "type": "origin",
            "severity": "high" if provenance_data["has_context_shift"] else "low",
            "title": "Content Provenance & Origin Match",
            "description": provenance_data["context_summary"]
        }
    ]

    verdict_cat = determine_verdict(scores, findings)
    explanation_data = generate_report_explanation(verdict_cat, scores, findings)

    # Build Enhanced Evidence Graph Nodes & Edges
    graph_nodes = [
        {"id": "node-content", "label": filename, "type": "content", "status": "authentic", "subtext": f"Authenticity: {scores['media_authenticity']}%"},
        {"id": "node-claim", "label": "Viral Event Claim", "type": "claim", "status": "misleading", "subtext": f"Credibility: {scores['claim_credibility']}%"},
        {"id": "node-earliest", "label": provenance_data["earliest_discovered_source"]["source_name"], "type": "source", "status": "neutral", "subtext": provenance_data["earliest_discovered_source"]["first_seen_date"]},
        {"id": "node-verdict", "label": f"Verdict: {verdict_cat}", "type": "verdict", "status": "neutral", "subtext": f"Trust: {scores['overall_trust']}/100"}
    ]

    graph_edges = [
        {"id": "edge-1", "source": "node-content", "target": "node-claim", "label": "makes claim", "type": "contains"},
        {"id": "edge-2", "source": "node-content", "target": "node-earliest", "label": "earliest source match", "type": "origin"},
        {"id": "edge-3", "source": "node-earliest", "target": "node-verdict", "label": "drives verdict", "type": "supports"}
    ]

    # Add comment/account nodes if crowd data available
    if crowd_data.get("sample_comments"):
        top_comm = crowd_data["sample_comments"][0]
        graph_nodes.append({"id": "node-comm-1", "label": f"Comment ({top_comm['username']})", "type": "evidence", "status": "neutral", "subtext": top_comm["category"]})
        graph_edges.append({"id": "edge-4", "source": "node-claim", "target": "node-comm-1", "label": "discussed by crowd", "type": "contains"})

    # 7. Construct Full Report Payload
    report_payload = {
        "investigation_id": investigation_id,
        "status": "completed",
        "is_deep_search": is_deep_search,
        "created_at": datetime.utcnow().isoformat(),
        "input_type": "image",
        "input_title": filename,
        "verdict": verdict_cat,
        "trust_score": int(scores["overall_trust"]),
        "scores": scores,
        "findings": findings,
        "evidence": [
            {
                "id": "ev-1",
                "title": f"Earliest Source Discovered: {provenance_data['earliest_discovered_source']['source_name']}",
                "source_url": provenance_data['earliest_discovered_source']['source_url'],
                "source_name": provenance_data['earliest_discovered_source']['source_name'],
                "source_type": "news",
                "role": "origin",
                "snippet": provenance_data['context_summary'],
                "publication_date": provenance_data['earliest_discovered_source']['first_seen_date'],
                "relevance_score": 0.98,
                "is_independent": True
            }
        ],
        "timeline": [
            {
                "id": f"t-{step['step_order']}",
                "date": step["event_date"],
                "title": step["title"],
                "description": step["description"],
                "source_name": step["source_name"],
                "source_url": step["source_url"],
                "type": "origin" if step["is_earliest_source"] else "context_shift",
                "is_original": step["is_earliest_source"]
            }
            for step in provenance_data["provenance_chain"]
        ],
        "graph_nodes": graph_nodes,
        "graph_edges": graph_edges,
        "provenance": provenance_data,
        "crowd_intelligence": crowd_data,
        "account_intelligence": account_data,
        "methodology": {
            "models_used": [
                {"name": ai_res.get("model_name", "ViT Classifier"), "version": "1.0", "confidence": ai_res.get("confidence", 0.9), "processing_ms": 140},
                {"name": "Content Provenance Tracker", "version": "1.0", "confidence": 0.91, "processing_ms": 110},
                {"name": "Crowd Signal Classifier", "version": "1.0", "confidence": 0.88, "processing_ms": 95}
            ],
            "evidence_count": 1,
            "limitations": explanation_data["limitations"],
            "content_hash": file_hash
        }
    }

    # Update Investigation database status
    result = await db.execute(select(Investigation).where(Investigation.id == investigation_id))
    inv = result.scalars().first()
    if inv:
        inv.status = "completed"
        inv.verdict = verdict_cat
        inv.trust_score = int(scores["overall_trust"])
        
        # Save Report
        report_record = ReportRecord(
            investigation_id=investigation_id,
            report_json=report_payload
        )
        db.add(report_record)
        await db.commit()

    return report_payload
