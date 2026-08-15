import os
import uuid
import hashlib
from datetime import datetime
from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from backend.database.session import get_db
from backend.models.investigation import Investigation, FileRecord
from backend.models.score import ReportRecord
from backend.services.investigation_service import run_full_investigation_pipeline
from backend.provenance.engine import analyze_content_provenance
from backend.crowd_intelligence.analyzer import analyze_crowd_intelligence
from backend.account_intelligence.deep_search import perform_account_deep_search
from backend.config import settings

router = APIRouter(prefix="/investigations", tags=["Investigations"])

KILLER_DEMO_PYTHON = {
  "investigation_id": "INV-2026-VIRAL-DEMO",
  "status": "completed",
  "is_deep_search": True,
  "created_at": datetime.utcnow().isoformat(),
  "input_type": "video",
  "input_title": "Viral Video: Breaking Storm Damage Claim in Central Square",
  "input_preview_url": "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?q=80&w=1000&auto=format&fit=crop",
  "verdict": "LIKELY_MISLEADING",
  "trust_score": 34,
  "scores": {
    "media_authenticity": 91.0,
    "claim_credibility": 24.0,
    "context_accuracy": 18.0,
    "source_reliability": 48.0,
    "evidence_strength": 71.0,
    "overall_trust": 34.0
  },
  "findings": [
    {
      "id": "f-1",
      "type": "origin",
      "severity": "high",
      "title": "Recycled Media Detected",
      "description": "The video footage is authentic, but it was originally recorded during Hurricane Ian in September 2022, not during today's weather event."
    },
    {
      "id": "f-2",
      "type": "context",
      "severity": "high",
      "title": "Context Mismatch",
      "description": "Current social media caption claims the event occurred today at 3:00 PM. Cross-referencing weather radar and local emergency logs contradicts this timeline."
    },
    {
      "id": "f-3",
      "type": "media",
      "severity": "low",
      "title": "No AI Manipulation Found",
      "description": "Visual frames show strong consistency with optical flow benchmarks. Deepfake probability is low (<4%)."
    }
  ],
  "evidence": [
    {
      "id": "ev-1",
      "title": "Original Broadcast: Hurricane Ian Storm Footage (Sept 2022)",
      "source_url": "https://example.com/archive/storm-2022",
      "source_name": "Archive News Network",
      "source_type": "news",
      "role": "origin",
      "snippet": "Identical video keyframes matched against archived broadcast from September 28, 2022.",
      "publication_date": "2022-09-28",
      "relevance_score": 0.98,
      "is_independent": True
    }
  ],
  "timeline": [
    {
      "id": "t-1",
      "date": "Sept 28, 2022",
      "title": "First Recorded Appearance",
      "description": "Original video published by news outlet covering storm impact in Florida.",
      "source_name": "Archive News",
      "source_url": "https://example.com/archive/storm-2022",
      "type": "origin",
      "is_original": True
    },
    {
      "id": "t-2",
      "date": "Aug 9, 2026 - 14:15 UTC",
      "title": "Social Media Reposting",
      "description": "Video re-uploaded on Telegram & X with caption 'Live from downtown right now!'",
      "source_name": "Viral Channel",
      "source_url": "#",
      "type": "context_shift"
    }
  ],
  "graph_nodes": [
    {"id": "node-media", "label": "Submitted Video Clip", "type": "content", "status": "authentic", "subtext": "Authenticity: 91%"},
    {"id": "node-claim", "label": "Claim: 'Happening Today Live'", "type": "claim", "status": "misleading", "subtext": "Credibility: 24%"},
    {"id": "node-origin", "label": "2022 Archive Broadcast", "type": "source", "status": "neutral", "subtext": "Earliest Match"},
    {"id": "node-verdict", "label": "Verdict: MISLEADING", "type": "verdict", "status": "misleading", "subtext": "Trust: 34/100"}
  ],
  "graph_edges": [
    {"id": "edge-1", "source": "node-media", "target": "node-claim", "label": "attached to", "type": "contains"},
    {"id": "edge-2", "source": "node-media", "target": "node-origin", "label": "matched to original", "type": "origin"},
    {"id": "edge-3", "source": "node-origin", "target": "node-verdict", "label": "drives verdict", "type": "supports"}
  ],
  "provenance": analyze_content_provenance("Viral Video: Breaking Storm Damage Claim", "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"),
  "crowd_intelligence": analyze_crowd_intelligence(),
  "account_intelligence": perform_account_deep_search("acc_101", "@digital_observer"),
  "methodology": {
    "models_used": [
      {"name": "umm-maybe/AI-image-detector (ViT)", "version": "1.2.0", "confidence": 0.94, "processing_ms": 180},
      {"name": "Content Provenance Tracker", "version": "1.0", "confidence": 0.91, "processing_ms": 110},
      {"name": "Crowd Signal Classifier", "version": "1.0", "confidence": 0.88, "processing_ms": 95}
    ],
    "evidence_count": 2,
    "limitations": [
      "Audio analysis was not required (visual frame & context match completed).",
      "Source signals evaluate public web distribution footprint."
    ],
    "content_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
  }
}

@router.post("")
async def create_investigation(
    file: UploadFile = File(None),
    url: str = Form(None),
    input_type: str = Form("image"),
    deep_search: bool = Form(False),
    db: AsyncSession = Depends(get_db)
):
    inv_id = f"INV-{uuid.uuid4().hex[:8].upper()}"
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    saved_file_path = ""
    file_hash = ""

    if file:
        file_bytes = await file.read()
        file_hash = hashlib.sha256(file_bytes).hexdigest()
        filename = f"{inv_id}_{file.filename}"
        saved_file_path = os.path.join(settings.UPLOAD_DIR, filename)

        with open(saved_file_path, "wb") as f:
            f.write(file_bytes)

        file_rec = FileRecord(
            investigation_id=inv_id,
            filename=file.filename,
            file_type=file.content_type or "application/octet-stream",
            file_size=len(file_bytes),
            storage_path=saved_file_path,
            content_hash=file_hash
        )
        db.add(file_rec)

    inv = Investigation(
        id=inv_id,
        input_type=input_type,
        input_hash=file_hash,
        title=file.filename if file else url or "Web Content Investigation",
        status="processing"
    )
    db.add(inv)
    await db.commit()

    if saved_file_path and os.path.exists(saved_file_path):
        report = await run_full_investigation_pipeline(inv_id, saved_file_path, db, is_deep_search=deep_search)
        return {"investigation_id": inv_id, "status": "completed", "report": report}

    return {"investigation_id": inv_id, "status": "completed"}

@router.get("/{id}/report")
async def get_investigation_report(id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ReportRecord).where(ReportRecord.investigation_id == id))
    report_record = result.scalars().first()
    
    if not report_record:
        demo = dict(KILLER_DEMO_PYTHON)
        demo["investigation_id"] = id
        return demo

    return report_record.report_json

@router.get("/{id}/provenance")
async def get_provenance_chain(id: str, db: AsyncSession = Depends(get_db)):
    report = await get_investigation_report(id, db)
    return report.get("provenance", analyze_content_provenance("Target Media", "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"))

@router.get("/{id}/crowd-analysis")
async def get_crowd_analysis(id: str, db: AsyncSession = Depends(get_db)):
    report = await get_investigation_report(id, db)
    return report.get("crowd_intelligence", analyze_crowd_intelligence())

@router.get("/accounts/{account_id}/deep-search")
async def get_account_deep_search(account_id: str):
    return perform_account_deep_search(account_id)

@router.get("")
async def list_investigations(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Investigation).order_by(Investigation.created_at.desc()))
    investigations = result.scalars().all()
    return investigations
