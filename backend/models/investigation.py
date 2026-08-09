import uuid
from datetime import datetime
from sqlalchemy import Column, String, Integer, Float, ForeignKey, Text, JSON, DateTime
from backend.database.session import Base

class Investigation(Base):
    __tablename__ = "investigations"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    input_type = Column(String(50), nullable=False)  # image, video, url, text
    input_hash = Column(String(64), nullable=True)
    title = Column(String(500), nullable=True)
    status = Column(String(30), default="pending")   # pending, processing, completed, failed
    verdict = Column(String(30), nullable=True)
    trust_score = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class FileRecord(Base):
    __tablename__ = "files"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    investigation_id = Column(String(36), ForeignKey("investigations.id", ondelete="CASCADE"), nullable=False)
    filename = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=False)
    file_size = Column(Integer, nullable=False)
    storage_path = Column(String(500), nullable=False)
    content_hash = Column(String(64), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class MediaAnalysis(Base):
    __tablename__ = "media_analysis"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    investigation_id = Column(String(36), ForeignKey("investigations.id", ondelete="CASCADE"), nullable=False)
    file_id = Column(String(36), ForeignKey("files.id", ondelete="CASCADE"), nullable=True)
    analysis_type = Column(String(50), nullable=False) # ai_detection, manipulation, metadata, face
    result_json = Column(JSON, nullable=False)
    confidence = Column(Float, nullable=True)
    model_name = Column(String(100), nullable=True)
    model_version = Column(String(50), nullable=True)
    processing_ms = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ModelRun(Base):
    __tablename__ = "model_runs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    investigation_id = Column(String(36), ForeignKey("investigations.id", ondelete="CASCADE"), nullable=False)
    model_name = Column(String(100), nullable=False)
    model_version = Column(String(50), nullable=False)
    input_hash = Column(String(64), nullable=True)
    confidence = Column(Float, nullable=True)
    processing_ms = Column(Integer, nullable=True)
    result_summary = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
