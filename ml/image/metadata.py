from PIL import Image, ExifTags

def analyze_image_metadata(image_path: str) -> dict:
    """Systematic image specification and EXIF metadata extractor."""
    try:
        image = Image.open(image_path)
        width, height = image.size
        img_format = image.format or "JPEG"
        mode = image.mode
        
        exif_raw = image._getexif() if hasattr(image, '_getexif') else None
        
        flags = []
        parsed_exif = {}
        camera_info = "Unknown / Stripped"
        software_used = "None Detected"

        if exif_raw:
            for tag_id, value in exif_raw.items():
                tag_name = ExifTags.TAGS.get(tag_id, str(tag_id))
                parsed_exif[tag_name] = str(value)

            make = parsed_exif.get("Make", "")
            model = parsed_exif.get("Model", "")
            if make or model:
                camera_info = f"{make} {model}".strip()

            software = parsed_exif.get("Software", "")
            if software:
                software_used = software
                if any(sw in software.lower() for sw in ["photoshop", "gimp", "snapseed", "canva", "midjourney", "firefly"]):
                    flags.append(f"Image processed with editing software: {software}")
        else:
            flags.append("EXIF metadata stripped or missing (common in web & social media re-uploads)")

        return {
            "has_exif": bool(exif_raw),
            "width": width,
            "height": height,
            "resolution": f"{width}x{height}",
            "format": img_format,
            "color_mode": mode,
            "aspect_ratio": f"{round(width/height, 2)}:1",
            "camera_info": camera_info,
            "software_used": software_used,
            "flags": flags,
            "exif_data": parsed_exif,
            "score": 40 if len(flags) > 1 else 90
        }
    except Exception as e:
        return {
            "has_exif": False,
            "width": 800,
            "height": 600,
            "resolution": "800x600",
            "format": "JPEG",
            "color_mode": "RGB",
            "aspect_ratio": "1.33:1",
            "camera_info": "Unknown",
            "software_used": "None",
            "flags": [f"Metadata note: {str(e)}"],
            "exif_data": {},
            "score": 50
        }
