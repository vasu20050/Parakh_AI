import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, Text, JSON, DateTime, Float
from backend.database.session import Base

class ProvenanceEvent(Base):
    __tablename__ = "provenance_events"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    investigation_id = Column(String(36), ForeignKey("investigations.id", ondelete="CASCADE"), nullable=False)
    step_order = Column(Integer, nullable=False, default=1)
    event_date = Column(String(50), nullable=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    source_name = Column(String(255), nullable=True)
    source_url = Column(String(500), nullable=True)
    status = Column(String(50), default="REPOSTED_CONTENT")  # VERIFIED_ORIGINAL, EARLIEST_DISCOVERED_SOURCE, REPOSTED_CONTENT, CONTEXT_CHANGED, UNKNOWN_ORIGIN
    is_earliest_source = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class CrowdComment(Base):
    __tablename__ = "crowd_comments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    investigation_id = Column(String(36), ForeignKey("investigations.id", ondelete="CASCADE"), nullable=False)
    username = Column(String(100), nullable=False)
    account_id = Column(String(100), nullable=False)
    comment_text = Column(Text, nullable=False)
    category = Column(String(50), nullable=False)  # EVIDENCE_BEARING, UNSUPPORTED_CLAIM, CONTRADICTORY_CLAIM, OPINION, QUESTION, PERSONAL_TESTIMONY, SOURCE_REFERENCE, IRRELEVANT
    has_evidence = Column(Boolean, default=False)
    evidence_url = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class CrowdClaimCluster(Base):
    __tablename__ = "crowd_claim_clusters"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    investigation_id = Column(String(36), ForeignKey("investigations.id", ondelete="CASCADE"), nullable=False)
    claim_title = Column(String(255), nullable=False)
    percentage = Column(Float, nullable=False)
    comment_count = Column(Integer, nullable=False)
    category = Column(String(50), default="unsupported") # evidence_bearing, unsupported, contradictory
    created_at = Column(DateTime, default=datetime.utcnow)

class AccountClaimHistory(Base):
    __tablename__ = "account_claim_history"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    account_id = Column(String(100), nullable=False, index=True)
    username = Column(String(100), nullable=False)
    claim_text = Column(Text, nullable=False)
    evidence_summary = Column(Text, nullable=True)
    status = Column(String(50), default="UNVERIFIED") # SUPPORTED, UNSUPPORTED, CONTRADICTED, UNVERIFIED
    source_ref = Column(String(500), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
