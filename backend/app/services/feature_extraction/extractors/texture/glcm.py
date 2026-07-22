import cv2
import numpy as np
from skimage.feature import graycomatrix, graycoprops

def extract_glcm_features(image: np.ndarray) -> list[float]:
    """Extract GLCM features: Contrast, Correlation, Energy, Homogeneity"""
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Compute GLCM (distances=1, angles=0, 45, 90, 135)
    glcm = graycomatrix(gray, distances=[1], angles=[0, np.pi/4, np.pi/2, 3*np.pi/4], levels=256, symmetric=True, normed=True)
    
    contrast = graycoprops(glcm, 'contrast').mean()
    correlation = graycoprops(glcm, 'correlation').mean()
    energy = graycoprops(glcm, 'energy').mean()
    homogeneity = graycoprops(glcm, 'homogeneity').mean()
    
    return [float(contrast), float(correlation), float(energy), float(homogeneity)]
