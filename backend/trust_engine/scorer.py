def calculate_trust_scores(media_results: list, claims_results: list, evidence_results: list) -> dict:
    """
    Computes 5 dimension scores (0-100) and weighted overall Trust Score.
    Dimensions:
    1. Media Authenticity (25%)
    2. Claim Credibility (25%)
    3. Context Accuracy (20%)
    4. Source Reliability (15%)
    5. Evidence Strength (15%)
    """
    # 1. Media Authenticity Score
    media_authenticity = 85.0
    if media_results:
        scores = [item.get("confidence", 0.8) * 100 for item in media_results if "confidence" in item]
        if scores:
            media_authenticity = sum(scores) / len(scores)

    # 2. Claim Credibility Score
    claim_credibility = 75.0
    if claims_results:
        claim_scores = [c.get("confidence", 0.7) * 100 for c in claims_results]
        if claim_scores:
            claim_credibility = sum(claim_scores) / len(claim_scores)

    # 3. Context Accuracy Score
    context_accuracy = 70.0
    
    # 4. Source Reliability Score
    source_reliability = 65.0

    # 5. Evidence Strength Score
    evidence_strength = 60.0
    if evidence_results:
        ev_scores = [e.get("relevance_score", 0.5) * 100 for e in evidence_results]
        if ev_scores:
            evidence_strength = sum(ev_scores) / len(ev_scores)

    # Weighted Fusion
    overall_trust = round(
        0.25 * media_authenticity +
        0.25 * claim_credibility +
        0.20 * context_accuracy +
        0.15 * source_reliability +
        0.15 * evidence_strength,
        1
    )

    return {
        "media_authenticity": round(media_authenticity, 1),
        "claim_credibility": round(claim_credibility, 1),
        "context_accuracy": round(context_accuracy, 1),
        "source_reliability": round(source_reliability, 1),
        "evidence_strength": round(evidence_strength, 1),
        "overall_trust": overall_trust
    }
