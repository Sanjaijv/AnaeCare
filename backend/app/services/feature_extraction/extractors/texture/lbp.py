import cv2
import numpy as np
from skimage.feature import local_binary_pattern

def extract_lbp_features(image: np.ndarray, num_points: int = 24, radius: int = 3) -> list[float]:
    """Extract Local Binary Pattern Histogram."""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    lbp = local_binary_pattern(gray, num_points, radius, method="uniform")
    
    # Calculate the histogram
    (hist, _) = np.histogram(lbp.ravel(), bins=np.arange(0, num_points + 3), range=(0, num_points + 2))
    
    # Normalize the histogram
    hist = hist.astype("float")
    hist /= (hist.sum() + 1e-7)
    
    return hist.tolist()
