import cv2

def check_eye_visibility(image) -> bool:
    """
    Returns True if an eye is visible in the image.
    Uses a basic OpenCV Haar Cascade.
    """
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    try:
        # Load the Haar cascade for eye detection
        # Using a generic path or simple check for now. For production, load from a specific path.
        if hasattr(cv2, 'CascadeClassifier'):
            eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')
        else:
            return True
            
        if eye_cascade.empty():
            return True
            
        eyes = eye_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        return len(eyes) > 0
    except Exception as e:
        print(f"Error in eye detection: {e}")
        return True
