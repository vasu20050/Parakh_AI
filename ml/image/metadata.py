from PIL import Image, ExifTags

def analyze_image_metadata(image_path: str) -> dict:
    """Extract EXIF metadata and flag editing software or anomalies."""
    try:
        image = Image.open(image_path)
        exif_raw = image._getexif() if hasattr(image, '_getexif') else None
        
        flags = []
        parsed_exif = {}

        if not exif_raw:
            flags.append("EXIF metadata absent (common in social re-uploads)")
            return {
                "has_exif": False,
                "flags": flags,
                "exif_data": {},
                "score": 60 # neutral score for missing EXIF (Rule #3: missing info != negative)
            }

        for tag_id, value in exif_raw.items():
            tag_name = ExifTags.TAGS.get(tag_id, str(tag_id))
            parsed_exif[tag_name] = str(value)

        # Detect software manipulation tags
        software = parsed_exif.get("Software", "").lower()
        if any(sw in software for sw in ["photoshop", "gimp", "snapseed", "canva", "midjourney"]):
            flags.append(f"Image processed with editing software: {parsed_exif.get('Software')}")

        return {
            "has_exif": True,
            "flags": flags,
            "exif_data": parsed_exif,
            "score": 40 if flags else 95
        }
    except Exception as e:
        return {
            "has_exif": False,
            "flags": [f"Metadata extraction warning: {str(e)}"],
            "exif_data": {},
            "score": 50
        }
