import cv2
import numpy as np

def normalize_brightness(image: np.ndarray) -> np.ndarray:
    """
    Normalizes brightness by converting to LAB color space, equalizing the L channel,
    and converting back to BGR.
    """
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    
    # We apply CLAHE to the L channel instead of simple equalization to avoid over-amplification
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    cl = clahe.apply(l)
    
    limg = cv2.merge((cl, a, b))
    return cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)
