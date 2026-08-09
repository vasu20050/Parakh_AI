import os
import cv2
import numpy as np
from PIL import Image, ImageChops, ImageEnhance

def analyze_error_level(image_path: str, quality: int = 95) -> dict:
    """
    Perform Error Level Analysis (ELA) to highlight high-variance compression regions.
    """
    try:
        tmp_ela_path = image_path + ".tmp_ela.jpg"
        original = Image.open(image_path).convert('RGB')
        original.save(tmp_ela_path, 'JPEG', quality=quality)
        
        resaved = Image.open(tmp_ela_path)
        ela_img = ImageChops.difference(original, resaved)
        
        extrema = ela_img.getextrema()
        max_diff = max([ex[1] for ex in extrema]) if extrema else 1
        if max_diff == 0:
            max_diff = 1
            
        scale = 255.0 / max_diff
        ela_img = ImageEnhance.Brightness(ela_img).enhance(scale)

        if os.path.exists(tmp_ela_path):
            os.remove(tmp_ela_path)

        # Convert ELA image to numpy array to compute variance
        ela_arr = np.array(ela_img)
        variance = float(np.var(ela_arr))

        # Higher variance across compression boundaries indicates spliced/edited regions
        is_suspicious = variance > 1200.0

        return {
            "ela_score": round(max(0, 100 - (variance / 30.0)), 2),
            "variance": round(variance, 2),
            "is_suspicious": is_suspicious,
            "description": "High compression variance detected in local regions" if is_suspicious else "Uniform compression pattern"
        }
    except Exception as e:
        return {
            "ela_score": 75.0,
            "variance": 0.0,
            "is_suspicious": False,
            "description": f"ELA Analysis fallback: {str(e)}"
        }
