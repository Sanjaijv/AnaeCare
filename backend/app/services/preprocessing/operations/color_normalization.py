import cv2
import numpy as np

def normalize_color(image: np.ndarray) -> np.ndarray:
    """
    Normalizes color using the Gray World Assumption.
    """
    result = np.zeros_like(image, dtype=np.float32)
    
    # Calculate means of each channel
    b_mean = np.mean(image[:,:,0])
    g_mean = np.mean(image[:,:,1])
    r_mean = np.mean(image[:,:,2])
    
    avg_mean = (b_mean + g_mean + r_mean) / 3.0
    
    # Avoid division by zero
    b_mean = b_mean if b_mean > 0 else 1
    g_mean = g_mean if g_mean > 0 else 1
    r_mean = r_mean if r_mean > 0 else 1
    
    result[:,:,0] = image[:,:,0] * (avg_mean / b_mean)
    result[:,:,1] = image[:,:,1] * (avg_mean / g_mean)
    result[:,:,2] = image[:,:,2] * (avg_mean / r_mean)
    
    return np.clip(result, 0, 255).astype(np.uint8)
