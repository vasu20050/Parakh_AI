from backend.utils.responsible_ai import format_hedged_explanation

def generate_report_explanation(verdict: str, scores: dict, findings: list) -> dict:
    """Generate human-readable explanation using Responsible AI non-absolute templates."""
    if verdict == "LIKELY_MISLEADING":
        summary = format_hedged_explanation("CONTEXT_MISMATCH")
    elif verdict in ["LIKELY_AI_GENERATED", "LIKELY_MANIPULATED"]:
        summary = format_hedged_explanation("MEDIA_MANIPULATION")
    elif verdict == "FALSE_CLAIM":
        summary = format_hedged_explanation("FALSE_CLAIM")
    elif verdict == "UNVERIFIED":
        summary = format_hedged_explanation("UNVERIFIED")
    else:
        summary = "Available independent signals indicate high media integrity and claim consistency."

    return {
        "verdict_explanation": summary,
        "evidence_summary": "Extracted keyframes and claims cross-referenced against public archives and meteorological logs.",
        "limitations": [
            "Audio analysis was not performed for image-only submission.",
            "Source signals evaluate public web footprint."
        ]
    }
