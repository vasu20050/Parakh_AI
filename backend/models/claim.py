import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, ForeignKey, Text, Boolean, DateTime
from backend.database.session import Base

class Claim(Base):
    __tablename__ = "claims"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    investigation_id = Column(String(36), ForeignKey("investigations.id", ondelete="CASCADE"), nullable=False)
    claim_text = Column(Text, nullable=False)
    source_text = Column(Text, nullable=True)
    verdict = Column(String(30), nullable=True)
    confidence = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    investigation_id = Column(String(36), ForeignKey("investigations.id", ondelete="CASCADE"), nullable=False)
    claim_id = Column(String(36), ForeignKey("claims.id", ondelete="SET NULL"), nullable=True)
    source_url = Column(Text, nullable=True)
    source_type = Column(String(50), nullable=True)
    role = Column(String(20), nullable=False) # supporting, contradicting, contextual, origin
    title = Column(Text, nullable=True)
    snippet = Column(Text, nullable=True)
    relevance_score = Column(Float, nullable=True)
    source_quality = Column(Float, nullable=True)
    publication_date = Column(DateTime, nullable=True)
    is_independent = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
