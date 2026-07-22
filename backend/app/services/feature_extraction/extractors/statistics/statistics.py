import cv2
import numpy as np
from scipy.stats import skew, kurtosis, entropy

def extract_statistics(image: np.ndarray) -> list[float]:
    """Extract statistical features: Mean, Median, Variance, Std, Entropy, Skewness, Kurtosis"""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    pixels = gray.ravel()
    
    mean_val = np.mean(pixels)
    median_val = np.median(pixels)
    var_val = np.var(pixels)
    std_val = np.std(pixels)
    
    # Histogram for entropy
    hist, _ = np.histogram(pixels, bins=256, range=(0, 256), density=True)
    ent_val = entropy(hist + 1e-7) # Add small epsilon to avoid log(0)
    
    skew_val = skew(pixels)
    kurt_val = kurtosis(pixels)
    
    return [
        float(mean_val), float(median_val), float(var_val), float(std_val),
        float(ent_val), float(skew_val), float(kurt_val)
    ]
