import cv2
import numpy as np

def calculate_redness_index(image: np.ndarray) -> float:
    """Calculate the redness index: R / (R + G + B). Normalize safely."""
    b, g, r = cv2.split(image.astype(np.float32))
    total = r + g + b
    
    # Avoid division by zero
    total[total == 0] = 1.0
    
    redness = r / total
    return float(np.mean(redness))
