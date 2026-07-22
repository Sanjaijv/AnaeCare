import cv2
import numpy as np

def apply_clahe(image: np.ndarray) -> np.ndarray:
    """
    Applies CLAHE (Contrast Limited Adaptive Histogram Equalization) to improve contrast.
    If brightness normalization already applied CLAHE to the L channel, this could be skipped
    or applied selectively to channels. For this implementation, we apply it to each channel.
    """
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    
    # We can apply CLAHE to the intensity channel for better results without distorting colors
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    l_clahe = clahe.apply(l)
    lab_clahe = cv2.merge((l_clahe, a, b))
    return cv2.cvtColor(lab_clahe, cv2.COLOR_LAB2BGR)
