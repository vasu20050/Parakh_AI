# TrustGraph — Digital Trust Platform

## Master Product, Functional, System & Technical Requirements Document

**Phase 1 — Web Platform & Verification Engine**
**Version:** 2.0
**Date:** August 2026
**Status:** Implementation-ready baseline for Phase 1 MVP

> **Product Vision:** Build an evidence layer for the internet.

> **One-Line Pitch:** TrustGraph is the digital trust layer for the internet — verifying not only whether content is AI-generated, but whether its claims, context, source, and origin can actually be trusted.

---

## Document Control

| Item | Details |
|---|---|
| Document | TrustGraph — Master Requirements Document |
| Version | 2.0 (aligned with implementation plan) |
| Scope | Phase 1: Website + Core Verification Engine |
| Audience | Founders, Product, Engineering, AI/ML, Design, QA, Investors/Reviewers |
| Future Scope | Telegram bot, API platform, continuous monitoring, advanced intelligence |
| Status | Implementation-ready baseline for Phase 1 MVP |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Requirements Document (PRD)](#2-product-requirements-document-prd)
3. [Functional Requirements Document (FRD)](#3-functional-requirements-document-frd)
4. [System / Software Requirements Document (SRD)](#4-system--software-requirements-document-srd)
5. [Technical Requirements Document (TRD)](#5-technical-requirements-document-trd)
6. [End-to-End User Flow](#6-end-to-end-user-flow)
7. [Trust Score & Verdict Framework](#7-trust-score--verdict-framework)
8. [Data & Evidence Model](#8-data--evidence-model)
9. [Security, Privacy & Responsible AI](#9-security-privacy--responsible-ai)
10. [Testing & Evaluation](#10-testing--evaluation)
11. [MVP Scope and Release Roadmap](#11-mvp-scope-and-release-roadmap)
12. [Startup Differentiation](#12-startup-differentiation)
13. [Future Roadmap](#13-future-roadmap)
14. [Core Engineering Principles](#14-core-engineering-principles)
15. [Final Product Definition](#15-final-product-definition)

---

# 1. Executive Summary

TrustGraph is an AI-powered web application designed to help users investigate the authenticity, credibility, and context of digital content. Users can submit images, videos, audio, text, screenshots, and supported URLs.

The platform combines:

- Digital forensics
- AI/ML analysis
- Claim extraction
- Evidence retrieval
- Source intelligence
- Content-origin analysis
- Explainable scoring

The result is an evidence-backed **Trust Score** and verdict.

The platform deliberately avoids reducing verification to a binary "real/fake" decision. A piece of media may be authentic while the claim attached to it is false or misleading. The system therefore evaluates:

- Media authenticity
- Claim credibility
- Context accuracy
- Source signals
- Evidence strength

**Telegram is explicitly outside Phase 1 scope.** It will be added later as another client of the same backend verification APIs.

---

# 2. Product Requirements Document (PRD)

## 2.1 Product Vision

> **Build an evidence layer for the internet.**

## 2.2 Problem Statement

Generative AI, synthetic media, manipulation tools, and rapid social-media propagation make it difficult for users to determine whether online information is trustworthy.

Users encounter:

- AI-generated images
- Deepfake videos
- Cloned voices
- Manipulated photographs
- Edited videos
- Recycled old content
- False captions
- Misleading headlines
- Fabricated news
- Fake screenshots
- Misleading comments
- Suspicious accounts

Existing tools often focus only on detecting AI-generated media. That is insufficient because an authentic image can still accompany a false claim.

## 2.3 Product Goals

1. Provide accessible digital-content verification through a web interface.
2. Separate media authenticity from claim truth and contextual accuracy.
3. Trace content toward its earliest discoverable source or appearance.
4. Present evidence supporting and contradicting a claim.
5. Provide transparent, explainable results rather than black-box verdicts.
6. Create an architecture that can later support APIs, monitoring, and Telegram without rebuilding the core.

## 2.4 Target Users

### General Internet Users

People who want to check suspicious images, videos, articles, screenshots, and social-media posts.

### Journalists and Fact-Checkers

Users who need to investigate viral content and verify sources.

### Researchers and OSINT Analysts

Users who need source tracing, evidence analysis, and content history.

### Organizations

Organizations monitoring misinformation affecting their brand, employees, products, or reputation.

## 2.5 Core Product Modules

| Module | Purpose | Implementation |
|---|---|---|
| Content Submission | Upload image/video/audio/text/screenshots or submit supported URLs | `frontend/components/upload/`, `backend/services/file_service.py` |
| Media Forensics | Analyze AI-generation, manipulation, metadata, faces, frames, and A/V consistency | `ml/image/`, `ml/video/` |
| Claim Verification | Extract factual claims and evaluate them against evidence | `ml/nlp/claim_extractor.py`, `ml/nlp/claim_verifier.py` |
| Source Intelligence | Analyze available public source signals | `backend/evidence_engine/web_search.py` |
| Content Origin | Find earlier appearances, likely original sources, and related versions | `backend/evidence_engine/origin_tracker.py`, `backend/evidence_engine/reverse_image.py` |
| Evidence Engine | Collect, classify, and rank evidence | `backend/evidence_engine/evidence_ranker.py` |
| Trust Score | Produce dimension-specific scores and an overall assessment | `backend/trust_engine/scorer.py` |
| Explainable Report | Show verdict, reasons, evidence, and limitations | `backend/trust_engine/explainer.py`, `backend/services/report_service.py` |

## 2.6 Verdict Categories

| Verdict | Meaning | Color |
|---|---|---|
| Verified | Strong available evidence supports the content/claim | 🟢 Green |
| Likely Authentic | Media appears genuine with no strong manipulation evidence | 🟢 Green |
| Likely Misleading | Media may be real but the claim or context is problematic | 🟡 Yellow |
| Likely Manipulated | Evidence suggests editing or manipulation | 🟠 Orange |
| Likely AI Generated | Strong indicators suggest synthetic generation | 🔴 Red |
| False Claim | Reliable available evidence contradicts the claim | 🔴 Red |
| Unverified | Insufficient evidence for a reliable conclusion | ⚪ Gray |
| Inconclusive | Evidence is conflicting or insufficiently decisive | ⚪ Gray |

## 2.7 Differentiating Features

### Evidence Graph

Visual relationship between:

- Post
- Media
- Claims
- Sources
- Evidence

**Implementation:** React Flow interactive graph in `frontend/components/report/EvidenceGraph.tsx`

### Truth Timeline

Shows the chronological history of known appearances and contextual changes.

**Implementation:** Vertical stepper with evidence cards in `frontend/components/report/TruthTimeline.tsx`

### Challenge My Verdict

Users can ask:

- Why was this flagged?
- What evidence supports it?
- What evidence contradicts it?
- What would change the verdict?
- Show strongest supporting evidence.
- Show strongest opposing evidence.

### Verification Receipt

Structured report containing:

- Content hash (SHA-256)
- Timestamp
- Model versions
- Evidence
- Verdict
- Confidence
- Methodology

### Continuous Monitoring

Future capability to monitor a claim for new evidence. *(Phase 2+)*

### Comment and Account Intelligence

Future capability for conversation and source-behavior analysis. *(Phase 2+)*

## 2.8 MVP Scope

### Must Have (Phase 1)

- [x] Web application (Next.js + React + TypeScript)
- [ ] User upload (drag-and-drop, URL submission)
- [ ] Image analysis (AI detection, manipulation, metadata, faces)
- [ ] Initial video analysis (keyframes, per-frame deepfake, temporal consistency)
- [ ] Metadata analysis (EXIF extraction + anomaly detection)
- [ ] Claim extraction (Gemini-powered NLP)
- [ ] Evidence retrieval (Google Custom Search)
- [ ] Source analysis (origin tracing, reverse image search)
- [ ] Trust score (5-dimensional scoring engine)
- [ ] Explainable report (evidence graph, truth timeline, findings)
- [ ] Investigation history (user dashboard)
- [ ] Authentication (JWT with register/login)

### Later (Phase 2+)

- Advanced account intelligence
- Comment intelligence
- Continuous monitoring
- Browser extension
- API marketplace
- Telegram bot
- Audio verification

## 2.9 Success Metrics

| Category | Metrics |
|---|---|
| Product | Verification completion rate, time to result, repeat users, investigations per user, report generation |
| Quality | False-positive rate, false-negative rate, media detection accuracy, claim verification accuracy |
| Business | Active users, paid organizations, API usage, retention, cost per verification |

---

# 3. Functional Requirements Document (FRD)

## 3.1 Functional Scope

The system shall allow users to submit digital content and receive an evidence-based authenticity and credibility assessment.

| ID | Requirement | Description | Implementation |
|---|---|---|---|
| FR-001 | User Registration | Register, authenticate, log out, reset passwords, manage profiles | `backend/api/routes/auth.py`, `backend/services/auth_service.py` |
| FR-002 | Content Submission | Submit supported media, text, screenshots, and URLs | `backend/api/routes/investigations.py`, `frontend/components/upload/` |
| FR-003 | File Validation | Validate type, size, integrity, and security of submitted files | `backend/utils/file_validators.py` |
| FR-004 | Image Analysis | Analyze images for AI-generation, manipulation, face, and forensic indicators | `ml/image/ai_detector.py`, `ml/image/manipulation.py`, `ml/image/face_analysis.py` |
| FR-005 | Video Analysis | Extract metadata, frames, audio; perform video/deepfake analysis | `ml/video/extractor.py`, `ml/video/deepfake.py`, `ml/video/temporal.py` |
| FR-006 | Audio Analysis | Synthetic-voice and audio-manipulation analysis (extensible, Phase 2) | `ml/audio/analyzer.py` (placeholder) |
| FR-007 | Metadata Analysis | Extract EXIF/media metadata; distinguish missing from suspicious metadata | `ml/image/metadata.py` |
| FR-008 | Claim Extraction | Extract factual claims from text, captions, OCR, and transcripts | `ml/nlp/claim_extractor.py` |
| FR-009 | Evidence Retrieval | Identify supporting, contradicting, contextual, and origin evidence | `backend/evidence_engine/web_search.py`, `backend/evidence_engine/evidence_ranker.py` |
| FR-010 | Source Analysis | Analyze source signals without unsupported labels | `backend/evidence_engine/origin_tracker.py` |
| FR-011 | Origin Analysis | Identify earlier appearances, likely original sources, related versions | `backend/evidence_engine/reverse_image.py`, `backend/evidence_engine/origin_tracker.py` |
| FR-012 | Trust Score | Calculate media, claim, context, source, and evidence scores + overall | `backend/trust_engine/scorer.py` |
| FR-013 | Verdict | Assign a supported classification | `backend/trust_engine/verdict.py` |
| FR-014 | Explainability | Every verdict includes understandable reasons tied to evidence | `backend/trust_engine/explainer.py` |
| FR-015 | Evidence Display | Show source, date, relevance, and evidence classification | `frontend/components/report/` |
| FR-016 | Investigation History | Users can review previous investigations | `frontend/app/dashboard/page.tsx` |
| FR-017 | Report Generation | Generate web, PDF, and structured data reports | `backend/services/report_service.py` |
| FR-018 | Investigation Status | Long-running jobs expose processing stages and status | `backend/workers/`, WebSocket in `frontend/services/websocket.ts` |
| FR-019 | Admin Dashboard | Monitor investigations, model performance, users, abuse, system health | `frontend/app/admin/page.tsx`, `backend/api/routes/admin.py` |

---

# 4. System / Software Requirements Document (SRD)

## 4.1 High-Level Architecture

```
                         WEB CLIENT (Next.js 15)
                              |
                              v
                     API GATEWAY (FastAPI)
                              |
              +---------------+---------------+
              |               |               |
           Auth API       Content API      User API
          (JWT)          (Upload/URL)     (Profile)
                              |
                              v
                   JOB ORCHESTRATOR (Celery)
                              |
              +-------+-------+-------+
              |       |       |       |
              v       v       v       v
          Media    Claim   Evidence  Trust
         Worker   Worker   Worker   Worker
              |       |       |       |
              v       v       v       v
          ML Layer  Gemini  Search   Scorer
              |       |       |       |
              +-------+-------+-------+
                              |
                              v
                      REPORT ENGINE
                              |
                              v
                    WEB CLIENT (Report)
```

## 4.2 Major System Components

### Frontend (`frontend/`)

| Component | File | Purpose |
|---|---|---|
| Landing Page | `app/page.tsx` | Hero section, upload interface |
| Investigation View | `app/investigate/[id]/page.tsx` | Full report display |
| Dashboard | `app/dashboard/page.tsx` | Investigation history |
| Auth | `app/login/page.tsx` | Login/register |
| Admin | `app/admin/page.tsx` | System monitoring |
| Upload | `components/upload/DropZone.tsx` | Drag-and-drop file upload |
| URL Input | `components/upload/URLInput.tsx` | URL submission |
| Trust Score | `components/report/TrustScore.tsx` | Animated gauge (0-100) |
| Verdict Badge | `components/report/VerdictBadge.tsx` | Color-coded verdict |
| Score Dimensions | `components/report/ScoreDimensions.tsx` | Radar chart (5 axes) |
| Evidence Graph | `components/report/EvidenceGraph.tsx` | React Flow interactive graph |
| Truth Timeline | `components/report/TruthTimeline.tsx` | Chronological evidence timeline |

### Backend (`backend/`)

| Component | File | Purpose |
|---|---|---|
| App Entry | `main.py` | FastAPI application, middleware, CORS |
| Config | `config.py` | Pydantic Settings, env loading |
| Investigation API | `api/routes/investigations.py` | CRUD for investigations |
| Auth API | `api/routes/auth.py` | Register, login, refresh |
| Schemas | `api/schemas.py` | Request/response models |
| Investigation Service | `services/investigation_service.py` | Orchestration logic |
| File Service | `services/file_service.py` | Upload, validate, store |
| Auth Service | `services/auth_service.py` | JWT, passwords |
| Report Service | `services/report_service.py` | Report generation |
| Celery App | `workers/celery_app.py` | Worker configuration |
| Media Worker | `workers/media_worker.py` | Image/video analysis tasks |
| Claim Worker | `workers/claim_worker.py` | Claim extraction tasks |
| Evidence Worker | `workers/evidence_worker.py` | Evidence retrieval tasks |
| Trust Worker | `workers/trust_worker.py` | Score computation tasks |

### AI/ML Layer (`ml/`)

| Component | File | Model/Tool |
|---|---|---|
| AI Image Detector | `image/ai_detector.py` | `umm-maybe/AI-image-detector` (HuggingFace ViT) |
| Manipulation Detector | `image/manipulation.py` | Error Level Analysis (OpenCV) |
| Metadata Extractor | `image/metadata.py` | Pillow + ExifRead |
| Face Analyzer | `image/face_analysis.py` | MTCNN (facenet-pytorch) |
| Video Frame Extractor | `video/extractor.py` | FFmpeg (ffmpeg-python) |
| Video Deepfake | `video/deepfake.py` | Frame-level ViT analysis |
| Temporal Consistency | `video/temporal.py` | Frame-to-frame comparison |
| OCR Engine | `nlp/ocr.py` | Tesseract (pytesseract) |
| Claim Extractor | `nlp/claim_extractor.py` | Google Gemini 1.5 Flash |
| Claim Verifier | `nlp/claim_verifier.py` | Google Gemini + evidence |
| Language Detector | `nlp/language_detector.py` | langdetect |

### Trust Engine (`backend/trust_engine/`)

| Component | File | Purpose |
|---|---|---|
| Scorer | `scorer.py` | Multi-dimensional scoring with weighted fusion |
| Verdict Engine | `verdict.py` | Deterministic verdict rules (NOT delegated to LLM) |
| Explainer | `explainer.py` | Human-readable explanations using Responsible AI language |

### Evidence Engine (`backend/evidence_engine/`)

| Component | File | Purpose |
|---|---|---|
| Web Search | `web_search.py` | Google Custom Search API / SerpAPI |
| Reverse Image | `reverse_image.py` | Reverse image search for origin detection |
| Evidence Ranker | `evidence_ranker.py` | Score evidence by quality, relevance, independence |
| Origin Tracker | `origin_tracker.py` | Find earliest appearances and original sources |

### Storage Layer

| Component | Technology | Purpose |
|---|---|---|
| Database | PostgreSQL | Users, investigations, claims, evidence, scores |
| Cache/Queue | Redis | Celery task queue, session cache |
| Object Storage | Local filesystem (S3-compatible later) | Uploaded media, generated artifacts |

## 4.3 Non-Functional Requirements

| Area | Requirement |
|---|---|
| Performance | Simple image verification under ~30 seconds; URL investigations under ~60 seconds; video is asynchronous |
| Availability | Target 99.5% for MVP; 99.9%+ at later scale |
| Scalability | Workers, API servers, and ML inference support horizontal scaling |
| Security | HTTPS, authentication, authorization, rate limiting, validation, malware scanning, audit logging |
| Privacy | Minimize stored data, define retention periods, support deletion, protect uploaded private content |
| Reliability | Individual detector failure allows partial analysis where possible |
| Accuracy | Report confidence and uncertainty; never claim absolute certainty |
| Compatibility | Current Chrome, Edge, Firefox, Safari; responsive desktop/tablet/mobile UI |

---

# 5. Technical Requirements Document (TRD)

## 5.1 Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend | Next.js + React + TypeScript | Next.js 15, React 19 |
| UI | Tailwind CSS + shadcn/ui | Tailwind 4, latest shadcn |
| Backend | Python + FastAPI | Python 3.11+, FastAPI 0.115+ |
| ORM | SQLAlchemy (async) + Alembic | SQLAlchemy 2.0+ |
| AI/ML | PyTorch + HuggingFace Transformers + OpenCV | Latest stable |
| Video | FFmpeg | System-installed |
| OCR | Tesseract | System-installed |
| NLP | Google Gemini API | google-generativeai SDK |
| Database | PostgreSQL | 16+ |
| Queue | Redis + Celery | Redis 7+, Celery 5+ |
| Containers | Docker + Docker Compose | Latest stable |
| Visualization | React Flow + Recharts | Latest stable |

## 5.2 Image Verification Pipeline

```
Image
  |
  v
Normalization (resize, format standardization)
  |
  +--→ ml/image/metadata.py ──→ EXIF / metadata extraction & anomaly check
  |
  +--→ ml/image/ai_detector.py ──→ AI-generation probability (ViT classifier)
  |
  +--→ ml/image/manipulation.py ──→ ELA + noise analysis (manipulation signals)
  |
  +--→ ml/image/face_analysis.py ──→ Face detection + consistency check (MTCNN)
  |
  v
Evidence Fusion (backend/trust_engine/scorer.py)
  |
  v
Media Authenticity Score (0-100)
```

## 5.3 Video Verification Pipeline

```
Video
  |
  v
ml/video/extractor.py ──→ FFmpeg metadata + keyframe/frame sampling
  |
  +--→ Face Detection (per frame)
  +--→ Deepfake Analysis (ml/video/deepfake.py) — per-frame ViT
  +--→ Temporal Consistency (ml/video/temporal.py) — frame-to-frame analysis
  +--→ Audio Extraction (ml/video/audio_extract.py)
  |
  v
Audio Analysis (Phase 2 placeholder)
  |
  v
Audio/Video Synchronization Check
  |
  v
Aggregate Media Result
```

## 5.4 NLP and Claim Verification Pipeline

```
Input (text / caption / image / video)
  |
  v
ml/nlp/ocr.py ──→ Text extraction from images (Tesseract)
ml/video/extractor.py ──→ Transcript extraction from video audio
  |
  v
ml/nlp/language_detector.py ──→ Language detection + cleaning
  |
  v
ml/nlp/claim_extractor.py ──→ Claim extraction (Gemini API)
  |
  v
backend/evidence_engine/web_search.py ──→ Evidence retrieval (Google Search)
  |
  v
backend/evidence_engine/evidence_ranker.py ──→ Evidence ranking
  |
  v
ml/nlp/claim_verifier.py ──→ Claim verdict (evidence-based, Gemini)
```

## 5.5 Database Schema

### Core Tables

```sql
-- Users
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    full_name       VARCHAR(255),
    role            VARCHAR(20) DEFAULT 'user',  -- 'user', 'admin'
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Investigations
CREATE TABLE investigations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    input_type      VARCHAR(50) NOT NULL,  -- 'image', 'video', 'url', 'text'
    input_hash      VARCHAR(64),           -- SHA-256
    status          VARCHAR(30) DEFAULT 'pending',
    verdict         VARCHAR(30),
    trust_score     INTEGER,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Files
CREATE TABLE files (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investigation_id UUID REFERENCES investigations(id) ON DELETE CASCADE,
    filename        VARCHAR(255) NOT NULL,
    file_type       VARCHAR(20) NOT NULL,
    file_size       BIGINT NOT NULL,
    storage_path    VARCHAR(500) NOT NULL,
    content_hash    VARCHAR(64) NOT NULL,  -- SHA-256
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Media Analysis Results
CREATE TABLE media_analysis (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investigation_id UUID REFERENCES investigations(id) ON DELETE CASCADE,
    file_id         UUID REFERENCES files(id) ON DELETE CASCADE,
    analysis_type   VARCHAR(50) NOT NULL,  -- 'ai_detection', 'manipulation', 'metadata', 'face'
    result_json     JSONB NOT NULL,
    confidence      FLOAT,
    model_name      VARCHAR(100),
    model_version   VARCHAR(50),
    processing_ms   INTEGER,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Claims
CREATE TABLE claims (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investigation_id UUID REFERENCES investigations(id) ON DELETE CASCADE,
    claim_text      TEXT NOT NULL,
    source_text     TEXT,           -- original text the claim was extracted from
    verdict         VARCHAR(30),
    confidence      FLOAT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Evidence
CREATE TABLE evidence (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investigation_id UUID REFERENCES investigations(id) ON DELETE CASCADE,
    claim_id        UUID REFERENCES claims(id) ON DELETE SET NULL,
    source_url      TEXT,
    source_type     VARCHAR(50),   -- 'news', 'fact_check', 'social_media', 'official', 'academic'
    role            VARCHAR(20) NOT NULL,  -- 'supporting', 'contradicting', 'contextual', 'origin'
    title           TEXT,
    snippet         TEXT,
    relevance_score FLOAT,
    source_quality  FLOAT,
    publication_date TIMESTAMPTZ,
    is_independent  BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Source Profiles
CREATE TABLE source_profiles (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investigation_id UUID REFERENCES investigations(id) ON DELETE CASCADE,
    source_url      TEXT,
    source_type     VARCHAR(50),
    reliability_score FLOAT,
    signals_json    JSONB,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Scores
CREATE TABLE scores (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investigation_id UUID REFERENCES investigations(id) ON DELETE CASCADE,
    media_authenticity FLOAT,
    claim_credibility FLOAT,
    context_accuracy FLOAT,
    source_reliability FLOAT,
    evidence_strength FLOAT,
    overall_trust   FLOAT,
    methodology_json JSONB,        -- weights, rules applied
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Verdicts
CREATE TABLE verdicts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investigation_id UUID REFERENCES investigations(id) ON DELETE CASCADE,
    verdict_category VARCHAR(30) NOT NULL,
    explanation     TEXT NOT NULL,
    evidence_summary TEXT,
    limitations     TEXT,          -- what the system couldn't determine
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Reports
CREATE TABLE reports (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investigation_id UUID REFERENCES investigations(id) ON DELETE CASCADE,
    report_json     JSONB NOT NULL,
    report_html     TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Model Runs (audit trail)
CREATE TABLE model_runs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    investigation_id UUID REFERENCES investigations(id) ON DELETE CASCADE,
    model_name      VARCHAR(100) NOT NULL,
    model_version   VARCHAR(50) NOT NULL,
    input_hash      VARCHAR(64),
    confidence      FLOAT,
    processing_ms   INTEGER,
    result_summary  JSONB,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id),
    action          VARCHAR(100) NOT NULL,
    details         JSONB,
    ip_address      VARCHAR(45),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

## 5.6 API Specification

| Method | Endpoint | Purpose | Auth |
|---|---|---|---|
| POST | `/api/v1/auth/register` | User registration | Public |
| POST | `/api/v1/auth/login` | Login, returns JWT | Public |
| POST | `/api/v1/auth/refresh` | Refresh access token | Refresh token |
| POST | `/api/v1/investigations` | Create investigation | User |
| POST | `/api/v1/investigations/{id}/content` | Attach content | User (owner) |
| GET | `/api/v1/investigations` | List user's investigations | User |
| GET | `/api/v1/investigations/{id}` | Get investigation status/summary | User (owner) |
| GET | `/api/v1/investigations/{id}/evidence` | Get evidence | User (owner) |
| GET | `/api/v1/investigations/{id}/report` | Get report | User (owner) |
| DELETE | `/api/v1/investigations/{id}` | Delete investigation | User (owner) |
| GET | `/api/v1/health` | Health check | Public |
| GET | `/api/v1/admin/stats` | System statistics | Admin |

## 5.7 Example API Response

```json
{
  "investigation_id": "INV-82F91",
  "status": "completed",
  "verdict": "MISLEADING",
  "trust_score": 32,
  "scores": {
    "media_authenticity": 91,
    "claim_credibility": 24,
    "context_accuracy": 18,
    "source_reliability": 48,
    "evidence_strength": 71
  },
  "findings": [
    {
      "type": "origin",
      "severity": "high",
      "description": "Similar media was found from an earlier date."
    },
    {
      "type": "claim",
      "severity": "high",
      "description": "The submitted claim is not supported by available evidence."
    }
  ],
  "methodology": {
    "models_used": [
      {
        "name": "AI-image-detector",
        "version": "1.0",
        "confidence": 0.12
      }
    ],
    "evidence_count": 7,
    "limitations": [
      "Audio analysis was not performed (image-only submission)."
    ]
  }
}
```

## 5.8 Trust Score Architecture

```
                     Evidence
                        |
          +-------------+-------------+
          |             |             |
          v             v             v
   ml/image/*      ml/nlp/*    evidence_engine/*
   (Media Model)  (Claim Model) (Source/Origin)
          |             |             |
          +-------------+-------------+
                        |
                        v
            trust_engine/scorer.py
                        |
              Rule + ML Fusion
           (deterministic rules first,
            NOT delegated to LLM)
                        |
                        v
           trust_engine/verdict.py
                        |
                        v
           trust_engine/explainer.py
           (Responsible AI language)
```

> **Critical Rule:** The final verdict must NOT be delegated directly to an LLM. Deterministic rules, model outputs, and ranked evidence are fused first. The language model can summarize and explain the evidence while being constrained by retrieved facts.

## 5.9 Evidence Ranking

Evidence attributes evaluated by `backend/evidence_engine/evidence_ranker.py`:

| Attribute | Description |
|---|---|
| Source quality | Reliability of the source (official, academic, news, social media) |
| Publication date | Recency and temporal relevance |
| Independence | Whether sources are truly independent |
| Relevance | Semantic similarity to the claim/content |
| Agreement | Degree of support for or against the claim |
| Contradiction strength | How directly evidence contradicts the claim |
| Confidence | Model's confidence in the evidence classification |

> **Critical Rule:** Multiple copies of the same claim must not be treated as multiple independent confirmations.

## 5.10 Evidence Graph Relationships

```
CLAIM  --supported_by-->     SOURCE
CLAIM  --contradicted_by-->  SOURCE
MEDIA  --originated_from-->  SOURCE
MEDIA  --similar_to-->       MEDIA
POST   --published_by-->     ACCOUNT
POST   --contains-->         CLAIM
```

**Rendered by:** `frontend/components/report/EvidenceGraph.tsx` using React Flow.

## 5.11 Model Registry

Every AI result records (stored in `model_runs` table):

```
model_name        -- e.g., "AI-image-detector"
model_version     -- e.g., "1.0"
timestamp         -- when analysis ran
input_hash        -- SHA-256 of input content
confidence        -- model's confidence score
processing_time   -- milliseconds
```

---

# 6. End-to-End User Flow

```
User
 |
 | 1. Upload media / submit URL
 |    (frontend/components/upload/DropZone.tsx or URLInput.tsx)
 v
Content Validation
 |    (backend/utils/file_validators.py)
 v
Create Investigation
 |    (POST /api/v1/investigations)
 v
Content Extraction
 |
 +--→ Image / Video / Audio Analysis (ml/image/, ml/video/)
 |
 +--→ OCR / Transcript (ml/nlp/ocr.py)
 |
 +--→ Metadata (ml/image/metadata.py)
 |
 v
Claim Extraction
 |    (ml/nlp/claim_extractor.py via Gemini API)
 v
Evidence Retrieval
 |    (backend/evidence_engine/web_search.py)
 v
Source + Origin Analysis
 |    (backend/evidence_engine/origin_tracker.py, reverse_image.py)
 v
Evidence Fusion + Ranking
 |    (backend/evidence_engine/evidence_ranker.py)
 v
Trust Score + Verdict
 |    (backend/trust_engine/scorer.py, verdict.py)
 v
Explainable Report
 |    (backend/trust_engine/explainer.py, services/report_service.py)
 |
 +--→ Evidence Graph (frontend/components/report/EvidenceGraph.tsx)
 +--→ Truth Timeline (frontend/components/report/TruthTimeline.tsx)
 +--→ Download / Share Report
```

---

# 7. Trust Score & Verdict Framework

The Trust Score is an evidence-weighted decision-support signal, not a statement of absolute truth.

| Dimension | What It Measures | Weight | Computed By |
|---|---|---|---|
| Media Authenticity | Likelihood that media is original/unmanipulated | 25% | `ml/image/`, `ml/video/` |
| Claim Credibility | Strength of evidence supporting the factual claim | 25% | `ml/nlp/claim_verifier.py` |
| Context Accuracy | Whether date, place, event match the claim | 20% | `backend/evidence_engine/` |
| Source Reliability | Available source-level signals and consistency | 15% | `backend/evidence_engine/` |
| Evidence Strength | Quality, relevance, independence of evidence set | 15% | `backend/evidence_engine/evidence_ranker.py` |
| **Overall Trust** | **Evidence-fused assessment across all dimensions** | **100%** | `backend/trust_engine/scorer.py` |

### Scoring Rules

- The score must be calibrated against benchmark datasets and periodically re-evaluated.
- Missing information must NOT automatically be treated as negative evidence.
- Each dimension score is 0-100.
- Overall Trust Score = weighted average across dimensions, adjusted by confidence.

---

# 8. Data & Evidence Model

## 8.1 Investigation Entity

| Field | Type | Description |
|---|---|---|
| investigation_id | UUID | Unique identifier |
| user_id | UUID | Owner |
| input_type | String | image, video, url, text |
| input_hash | String | SHA-256 content hash |
| status | String | pending → processing → completed / failed |
| verdict | String | Verdict category |
| trust_score | Integer | 0-100 overall score |
| model_versions | JSON | Models used in this investigation |
| created_at | Timestamp | Submission time |
| updated_at | Timestamp | Last update time |

## 8.2 Evidence Entity

| Field | Type | Description |
|---|---|---|
| evidence_id | UUID | Unique identifier |
| investigation_id | UUID | Parent investigation |
| claim_id | UUID | Associated claim (optional) |
| source_url | String | Source URL or reference |
| source_type | String | news, fact_check, social_media, official, academic |
| role | String | supporting, contradicting, contextual, origin |
| title | String | Evidence title |
| snippet | String | Relevant excerpt |
| relevance_score | Float | 0.0-1.0 relevance |
| source_quality | Float | 0.0-1.0 source reliability |
| publication_date | Timestamp | When evidence was published |
| is_independent | Boolean | Whether source is independent |
| created_at | Timestamp | When evidence was retrieved |

---

# 9. Security, Privacy & Responsible AI

## 9.1 Security

| Measure | Implementation |
|---|---|
| HTTPS | All traffic encrypted in transit |
| Authentication | JWT with access/refresh tokens (`backend/services/auth_service.py`) |
| Input validation | File type, size, integrity checks (`backend/utils/file_validators.py`) |
| File security | Uploaded files scanned before processing |
| Storage access | Controlled object-storage with per-user isolation |
| Rate limiting | API rate limiting and abuse prevention |
| Audit logging | Administrative actions logged (`audit_logs` table) |

## 9.2 Privacy

| Principle | Implementation |
|---|---|
| Retention policy | Configurable media retention periods |
| User deletion | Users can delete investigations and uploaded content |
| Privacy isolation | Private uploads never exposed to other users |
| Minimal collection | Only data necessary for verification is collected |
| External source disclosure | Clearly communicate when external sources are used |
| Data usage transparency | Clearly state whether submitted data is used for model improvement — **it is NOT** in Phase 1 |

## 9.3 Responsible AI

### Principles

1. **Never present probabilistic model output as absolute truth.**
2. **Distinguish media authenticity from claim truth.**
3. **Avoid unsupported claims about individuals or accounts.**
4. **Use neutral, hedged language** when evidence is incomplete.
5. **Show evidence and limitations** behind important conclusions.
6. **Track model versions** to support reproducibility and audits.
7. **Display uncertainty** whenever evidence is incomplete.

### Language Guidelines

Implemented in `backend/utils/responsible_ai.py`:

| ❌ Never Say | ✅ Instead Say |
|---|---|
| "This person is a bot." | "The available activity signals show patterns potentially associated with automated or coordinated behavior." |
| "This is definitely fake." | "The media shows strong indicators of manipulation." |
| "This is 100% AI-generated." | "Analysis indicates a high probability of AI generation (confidence: 94%)." |
| "This source is unreliable." | "Available signals for this source show limited verifiable history." |
| "The claim is false." | "The claim is not supported by the available evidence examined." |

---

# 10. Testing & Evaluation

## 10.1 Software Testing

| Test Type | Scope | Command |
|---|---|---|
| Unit tests | APIs, scoring, validation, claim extraction, DB logic | `cd backend && pytest tests/unit/ -v` |
| Integration tests | Complete investigation pipeline | `cd backend && pytest tests/integration/ -v` |
| End-to-end tests | Upload through report generation | `cd backend && pytest tests/e2e/ -v` |
| Security tests | File uploads, auth, authorization | Included in integration tests |
| Performance tests | Concurrent investigations | Load testing with locust |
| Frontend tests | Component rendering, interactions | `cd frontend && npm test` |
| Lint checks | Code quality | `ruff check .` / `npm run lint` |

### Functional Test Cases

| Test Case | Description |
|---|---|
| URL submission | Submit a valid URL and verify investigation creation |
| Image upload | Upload image files (JPEG, PNG, WebP) and verify processing |
| Video upload | Upload video files (MP4, MOV) and verify async processing |
| Audio upload | Upload audio files and verify Phase 2 placeholder response |
| Invalid files | Submit unsupported/corrupted files and verify rejection |
| Report generation | Verify JSON and web reports are generated correctly |
| Authentication | Register, login, token refresh, protected routes |
| Admin controls | Admin-only endpoints return 403 for regular users |

## 10.2 AI/ML Evaluation

| Area | Metrics | Evaluation Method |
|---|---|---|
| Deepfake detection | Precision, Recall, F1, ROC-AUC | Benchmark test set (~50 images) |
| Claim verification | Accuracy, Precision, Recall, Calibration | Curated claim/evidence pairs |
| Source retrieval | Recall@K, relevance | Manual relevance judgments |
| Origin tracing | Correct retrieval rate | Known origin test cases |
| Trust scoring | Calibration against expert labels | Expert-labeled test set |
| System | Latency, throughput, failure rate | Load testing |

## 10.3 Critical Benchmark Cases

| # | Scenario | Expected Verdict |
|---|---|---|
| 1 | Authentic media + truthful caption | ✅ Verified |
| 2 | Authentic media + false caption | 🟡 Misleading / False Claim |
| 3 | AI-generated image + plausible caption | 🔴 Likely AI Generated |
| 4 | Real old video + new false event claim | 🟡 Misleading Context |
| 5 | Manipulated video + unsupported claim | 🟠 Likely Manipulated |
| 6 | Conflicting sources | ⚪ Inconclusive / Unverified |

---

# 11. MVP Scope and Release Roadmap

## Sprint Plan

| Sprint | Focus | Key Deliverables |
|---|---|---|
| Sprint 1 | Foundation | Project scaffolding, Docker Compose, DB models, auth, file upload, landing page |
| Sprint 2 | Image Verification | ViT AI-detector, ELA manipulation, EXIF metadata, face detection, media worker |
| Sprint 3 | Claim Verification | Tesseract OCR, Gemini claim extraction, Google Search evidence, evidence ranking |
| Sprint 4 | Video Analysis | FFmpeg keyframes, per-frame deepfake, temporal consistency, audio extraction |
| Sprint 5 | Trust Engine & Reports | Multi-dimensional scoring, verdict rules, explainer, report generation, trust score UI |
| Sprint 6 | Evidence Intelligence & UX | Reverse image search, Evidence Graph, Truth Timeline, dashboard, UI polish |

## Release 1 — MVP (Phase 1)

- Web application
- Image and basic video verification
- Claim extraction
- Evidence retrieval
- Context/origin analysis
- Trust score
- Explainable report
- Investigation history

## Release 2 (Phase 2)

- Advanced account intelligence
- Comment intelligence
- Improved video and audio analysis
- Truth Timeline enhancements
- Investigation collaboration

## Release 3 (Phase 3)

- Continuous monitoring
- Public API
- Browser extension
- Enterprise dashboards
- Telegram bot

---

# 12. Startup Differentiation

## 12.1 Positioning

The product should NOT be positioned as another standalone deepfake detector.

The stronger position is:

> **Digital Trust & Evidence Intelligence Platform**

**Tagline:** *"Before you believe it, verify it."*

**Core USP:** *"We don't just detect deepfakes. We verify digital reality."*

## 12.2 Competitive Differentiation

| Conventional Detector | TrustGraph |
|---|---|
| Is this AI-generated? | Can this content and its claim be trusted? |
| Usually one score | Multiple explainable dimensions (5-axis) |
| Media-only focus | Media + claim + context + source + evidence |
| One-time result | Future-ready for continuous monitoring |
| Black-box tendency | Evidence graph and explanation |
| Detection only | Investigation and evidence synthesis |

## 12.3 Differentiators

1. Media authenticity + claim verification (not just deepfake detection)
2. Origin tracing (find earliest appearances)
3. Context mismatch detection (authentic media, false claim)
4. Evidence-backed explanations (never black-box)
5. Source intelligence (public signal analysis)
6. 5-dimensional trust scoring (not binary real/fake)
7. Shareable verification reports
8. Future verification API (Trust-as-a-Service)

## 12.4 Long-Term Moat

The long-term competitive advantage does not depend on a single deepfake model.

TrustGraph builds a **Verification Graph** connecting:

```
CONTENT
   |
   +---- CLAIM
   |
   +---- SOURCE
   |
   +---- ORIGINAL
   |
   +---- EVIDENCE
   |
   +---- CONTEXT
   |
   +---- HISTORICAL VERDICT
   |
   +---- CORRECTION
```

Over time this becomes reusable **digital trust infrastructure**.

## 12.5 Business Model

| Customer | Product |
|---|---|
| Consumers | Free + premium verification |
| Journalists | Professional investigation workspace |
| Newsrooms | Verification API |
| Businesses | Brand misinformation monitoring |
| Platforms | High-volume API |
| Researchers | Controlled analysis tools |

---

# 13. Future Roadmap

1. Telegram bot
2. Developer API / Trust-as-a-Service
3. Browser extension
4. Continuous claim monitoring
5. Advanced comment intelligence
6. Account and propagation intelligence
7. Enterprise newsroom tools
8. Collaboration and case management
9. Multilingual verification
10. Pluggable detector/model architecture

---

# 14. Core Engineering Principles

1. **Evidence before verdict.**
2. **Media authenticity and claim truth must be evaluated separately.**
3. **Missing data is not automatically negative evidence.**
4. **LLMs should explain evidence, not invent evidence.**
5. **Every model result should be versioned and traceable.**
6. **The system should support partial results when individual detectors fail.**
7. **The architecture must be modular so models can be replaced without redesigning the product.**
8. **Privacy and security must be built into ingestion and storage.**
9. **The final system should communicate uncertainty honestly.**
10. **Telegram and other future interfaces must use the same verification backend.**

---

# 15. Final Product Definition

TrustGraph is a web-based multimodal verification and investigation system.

It accepts digital content and produces an evidence-backed assessment of:

- Media authenticity
- Claim credibility
- Context accuracy
- Source signals
- Evidence strength

Its core differentiators are:

- **Evidence Graph** — visual relationship map of content, claims, sources, and evidence
- **Truth Timeline** — chronological history of appearances and contextual changes
- **Explainable Trust Score** — 5-dimensional scoring with transparent methodology
- **Evidence-driven investigation workflow** — shows WHY, not just WHAT

### Phase 1

> **Website + Verification Engine + Evidence Intelligence**

### Phase 2

> **Account Intelligence + Comment Intelligence + Advanced Multimedia Analysis**

### Phase 3

> **Continuous Monitoring + API + Telegram + Enterprise Infrastructure**

---

# Master Product Principle

> ## "Don't build an AI that simply says FAKE."
>
> ## "Build an AI investigator that shows WHY."

That principle guides the product, architecture, AI models, and UX from the first MVP onward.

---

# Killer Demo

The strongest demonstration should be a viral video scenario:

1. User uploads/submits a viral video
2. TrustGraph analyzes it
3. The media itself appears authentic
4. TrustGraph finds an older version of the video
5. The current caption claims the event happened today
6. Independent evidence does not support the current context
7. The final report:

```
🟠 MISLEADING

Media: Likely Authentic         (91/100)
Claim: Unsupported              (24/100)
Context: Mismatch               (18/100)
Source: Moderate signals         (48/100)
Evidence: Strong                (71/100)

Overall Trust: 32/100
```

The user opens the evidence timeline and sees exactly why — with links to the original video, contradicting evidence, and a clear explanation of the context mismatch.

---

## Project Structure

```
trustgraph/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── services/
│   ├── hooks/
│   └── lib/
├── backend/
│   ├── api/
│   ├── models/
│   ├── services/
│   ├── workers/
│   ├── trust_engine/
│   ├── evidence_engine/
│   ├── database/
│   └── utils/
├── ml/
│   ├── image/
│   ├── video/
│   ├── audio/
│   ├── nlp/
│   └── evaluation/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
├── docs/
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

*TrustGraph — the digital trust layer for the internet.*
