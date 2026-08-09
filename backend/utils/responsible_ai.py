"""
TrustGraph Responsible AI Module.
Enforces non-absolute, evidence-backed phrasing across all generated explanations and verdicts.
"""

RESPONSIBLE_AI_TEMPLATES = {
    "BOT_ACTIVITY": "The available activity signals show patterns potentially associated with automated or coordinated behavior.",
    "MEDIA_MANIPULATION": "The media shows strong forensic indicators of digital manipulation or editing.",
    "AI_GENERATED": "Statistical analysis indicates a high probability of synthetic AI media generation (confidence: {confidence}%).",
    "CONTEXT_MISMATCH": "The media itself appears authentic, but the attached claim or timestamp does not align with retrieved evidence.",
    "FALSE_CLAIM": "The submitted claim is not supported by the available independent evidence examined.",
    "UNVERIFIED": "The available evidence is incomplete or insufficient to reach a decisive conclusion.",
    "SOURCE_UNRELIABLE": "Public historical signals for this source indicate limited verifiable credibility.",
}

def format_hedged_explanation(category: str, **kwargs) -> str:
    """Format explanation strictly using Responsible AI hedged language templates."""
    template = RESPONSIBLE_AI_TEMPLATES.get(category, "Evidence-backed analysis indicates potential variance in credibility.")
    return template.format(**kwargs)
