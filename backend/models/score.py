import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, ForeignKey, Text, JSON, DateTime
from backend.database.session import Base

class Score(Base):
    __tablename__ = "scores"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    investigation_id = Column(String(36), ForeignKey("investigations.id", ondelete="CASCADE"), nullable=False)
    media_authenticity = Column(Float, nullable=False)
    claim_credibility = Column(Float, nullable=False)
    context_accuracy = Column(Float, nullable=False)
    source_reliability = Column(Float, nullable=False)
    evidence_strength = Column(Float, nullable=False)
    overall_trust = Column(Float, nullable=False)
    methodology_json = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class VerdictRecord(Base):
    __tablename__ = "verdicts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    investigation_id = Column(String(36), ForeignKey("investigations.id", ondelete="CASCADE"), nullable=False)
    verdict_category = Column(String(30), nullable=False)
    explanation = Column(Text, nullable=False)
    evidence_summary = Column(Text, nullable=True)
    limitations = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ReportRecord(Base):
    __tablename__ = "reports"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    investigation_id = Column(String(36), ForeignKey("investigations.id", ondelete="CASCADE"), nullable=False)
    report_json = Column(JSON, nullable=False)
    report_html = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
