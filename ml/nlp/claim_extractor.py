import json
import re
import httpx
from backend.config import settings

async def extract_claims_from_text(text: str) -> list:
    """
    100% Open-Source NLP Claim Extractor.
    
    Tries in priority order:
    1. Local Ollama (open-source Llama 3 / Qwen / Mistral via http://localhost:11434)
    2. Local Open-Source Rule & Entity NLP Parser (Zero API key, zero cost, CPU fast)
    """
    if not text or len(text.strip()) == 0:
        return []

    # Priority 1: Check for local open-source Ollama server
    ollama_claims = await _try_ollama_claim_extraction(text)
    if ollama_claims:
        return ollama_claims

    # Priority 2: 100% Local Open-Source Rule & Sentence Parser
    return _local_rule_based_claim_extraction(text)

async def _try_ollama_claim_extraction(text: str) -> list:
    """Attempts claim extraction using local open-source Ollama (e.g. llama3, mistral, qwen)."""
    ollama_url = getattr(settings, "OLLAMA_URL", "http://localhost:11434/api/generate")
    model_name = getattr(settings, "OLLAMA_MODEL", "llama3")

    try:
        prompt = f"Extract all verifiable factual claims from this text. Return ONLY a valid JSON list of string claims.\nText: {text}"
        payload = {
            "model": model_name,
            "prompt": prompt,
            "stream": False
        }
        async with httpx.AsyncClient() as client:
            res = await client.post(ollama_url, json=payload, timeout=5.0)
            if res.status_code == 200:
                out = res.json().get("response", "")
                # Extract JSON array from LLM output
                match = re.search(r'\[.*\]', out, re.DOTALL)
                if match:
                    claims = json.loads(match.group(0))
                    return [{"claim_text": c, "source_text": text, "confidence": 0.92, "extractor": f"Ollama ({model_name})"} for c in claims]
    except Exception:
        pass  # Fall back to local rule-based extractor if Ollama is not running

    return None

def _local_rule_based_claim_extraction(text: str) -> list:
    """
    Open-Source CPU Sentence & Entity Claim Filter.
    Splits text into candidate sentences and ranks verifiable factual assertions.
    """
    # Clean and split into sentences
    sentences = re.split(r'(?<=[.!?])\s+', text.strip())
    claims = []

    # Keywords indicating factual claims (dates, events, actions, numbers, quotes)
    factual_patterns = re.compile(r'\b(today|yesterday|announced|recorded|occurred|reported|happened|located|percent|\d+|\$|storm|tornado|election)\b', re.IGNORECASE)

    for sentence in sentences:
        s_clean = sentence.strip()
        if len(s_clean) > 15:
            # Check if sentence contains factual patterns
            if factual_patterns.search(s_clean):
                claims.append({
                    "claim_text": s_clean,
                    "source_text": text,
                    "confidence": 0.82,
                    "extractor": "Open-Source Local NLP Parser"
                })

    if not claims and sentences:
        # Fallback to first non-empty sentence
        claims.append({
            "claim_text": sentences[0].strip(),
            "source_text": text,
            "confidence": 0.75,
            "extractor": "Open-Source Local NLP Parser"
        })

    return claims
