def determine_verdict(scores: dict, findings: list) -> str:
    """
    Deterministic rule engine mapping score vectors and evidence findings to supported Verdict categories.
    Rules:
    - High media authenticity (>75) + Low context (<40) => LIKELY_MISLEADING
    - Low media authenticity (<40) => LIKELY_MANIPULATED / LIKELY_AI_GENERATED
    - High evidence + low claim (<30) => FALSE_CLAIM
    - Overall > 75 => VERIFIED / LIKELY_AUTHENTIC
    """
    media = scores.get("media_authenticity", 50)
    claim = scores.get("claim_credibility", 50)
    context = scores.get("context_accuracy", 50)
    overall = scores.get("overall_trust", 50)

    # Check for context mismatch (Killer Demo scenario)
    if media >= 70 and context < 40:
        return "LIKELY_MISLEADING"

    if media < 35:
        return "LIKELY_MANIPULATED"

    if claim < 30:
        return "FALSE_CLAIM"

    if overall >= 75:
        return "VERIFIED"
    
    if overall >= 60:
        return "LIKELY_AUTHENTIC"

    if overall < 35:
        return "UNVERIFIED"

    return "INCONCLUSIVE"
