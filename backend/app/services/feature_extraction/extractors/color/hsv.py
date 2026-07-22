import cv2
import numpy as np

def extract_hsv_features(image: np.ndarray) -> list[float]:
    """Extract Mean H, S, V and Std H, S, V"""
    hsv_image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    h, s, v = cv2.split(hsv_image)
    
    mean_h, std_h = cv2.meanStdDev(h)
    mean_s, std_s = cv2.meanStdDev(s)
    mean_v, std_v = cv2.meanStdDev(v)
    
    return [
        float(mean_h[0][0]), float(mean_s[0][0]), float(mean_v[0][0]),
        float(std_h[0][0]), float(std_s[0][0]), float(std_v[0][0])
    ]
