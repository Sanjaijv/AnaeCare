import cv2
import numpy as np

def extract_lab_features(image: np.ndarray) -> list[float]:
    """Extract Mean L, A, B and Std L, A, B"""
    lab_image = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab_image)
    
    mean_l, std_l = cv2.meanStdDev(l)
    mean_a, std_a = cv2.meanStdDev(a)
    mean_b, std_b = cv2.meanStdDev(b)
    
    return [
        float(mean_l[0][0]), float(mean_a[0][0]), float(mean_b[0][0]),
        float(std_l[0][0]), float(std_a[0][0]), float(std_b[0][0])
    ]
