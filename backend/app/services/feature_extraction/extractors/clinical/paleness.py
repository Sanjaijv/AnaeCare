import cv2
import numpy as np

def calculate_paleness_index(image: np.ndarray) -> float:
    """Calculate paleness index based on LAB and R channel."""
    lab_image = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, _, _ = cv2.split(lab_image)
    _, _, r = cv2.split(image)
    
    mean_l = np.mean(l) / 255.0
    mean_r = np.mean(r) / 255.0
    
    # Paleness is typically high L and low R.
    # We can model it as (L - R) normalized, or simply L / (R + epsilon)
    # A simple combined metric: L * (1 - R)
    paleness = mean_l * (1.0 - mean_r)
    return float(paleness)
