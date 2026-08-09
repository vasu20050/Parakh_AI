import cv2

def analyze_faces_in_image(image_path: str) -> dict:
    """
    Detect faces in media to evaluate count and bounding boxes.
    Complies with Responsible AI: DOES NOT perform facial recognition or identity tracking.
    """
    try:
        image = cv2.imread(image_path)
        if image is None:
            return {"face_count": 0, "faces": [], "score": 80}

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        face_list = []
        for (x, y, w, h) in faces:
            face_list.append({"bbox": [int(x), int(y), int(w), int(h)]})

        return {
            "face_count": len(face_list),
            "faces": face_list,
            "score": 90 if len(face_list) > 0 else 75
        }
    except Exception as e:
        return {
            "face_count": 0,
            "faces": [],
            "score": 75,
            "error": str(e)
        }
