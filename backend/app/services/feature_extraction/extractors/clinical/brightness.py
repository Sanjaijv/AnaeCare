import cv2
import numpy as np

def calculate_brightness(image: np.ndarray) -> float:
    """Calculate mean brightness based on HSV Value channel or LAB L channel."""
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    _, _, v = cv2.split(hsv_image)
    
    return float(np.mean(v) / 255.0)
