from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any

# Auth
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str

# Investigation
class InvestigationCreate(BaseModel):
    input_type: str  # image, video, url, text
    url: Optional[str] = None
    title: Optional[str] = None

class InvestigationSummary(BaseModel):
    investigation_id: str
    status: str
    verdict: Optional[str] = None
    trust_score: Optional[int] = None

class ReportResponse(BaseModel):
    investigation_id: str
    status: str
    created_at: str
    input_type: str
    verdict: str
    trust_score: int
    scores: dict
    findings: List[dict]
    evidence: List[dict]
    timeline: List[dict]
    graph_nodes: List[dict]
    graph_edges: List[dict]
    methodology: dict
