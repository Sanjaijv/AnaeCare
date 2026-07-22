import cv2
import numpy as np

def check_brightness(image, min_brightness: int = 40, max_brightness: int = 215) -> bool:
    """
    Returns True if the brightness is within acceptable limits.
    """
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    avg_brightness = np.mean(gray)
    
    return min_brightness <= avg_brightness <= max_brightness
