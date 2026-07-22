import cv2
import numpy as np

def extract_rgb_features(image: np.ndarray) -> list[float]:
    """Extract Mean R, G, B and Std R, G, B"""
    # OpenCV loads images in BGR format
    b, g, r = cv2.split(image)
    
    mean_r, std_r = cv2.meanStdDev(r)
    mean_g, std_g = cv2.meanStdDev(g)
    mean_b, std_b = cv2.meanStdDev(b)
    
    return [
        float(mean_r[0][0]), float(mean_g[0][0]), float(mean_b[0][0]),
        float(std_r[0][0]), float(std_g[0][0]), float(std_b[0][0])
    ]
