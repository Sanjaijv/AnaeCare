import cv2
import numpy as np

def reduce_noise(image: np.ndarray) -> np.ndarray:
    """
    Reduces noise using Gaussian Blur.
    """
    return cv2.GaussianBlur(image, (5, 5), 0)
