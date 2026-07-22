import cv2
import numpy as np
import time
from .operations.resize import resize_image
from .operations.noise_reduction import reduce_noise
from .operations.brightness_normalization import normalize_brightness
from .operations.histogram_equalization import apply_clahe
from .operations.color_normalization import normalize_color

def run_preprocessing_pipeline(image: np.ndarray) -> tuple[np.ndarray, dict]:
    """
    Runs the full image preprocessing pipeline on the given image.
    Returns the processed image and metadata about the processing.
    """
    start_time = time.time()
    
    # 1. Resize
    resized = resize_image(image, (512, 512))
    
    # 2. Noise Reduction
    denoised = reduce_noise(resized)
    
    # 3. Brightness Normalization
    brightness_normalized = normalize_brightness(denoised)
    
    # 4. Histogram Equalization
    clahe_applied = apply_clahe(brightness_normalized)
    
    # 5. Color Normalization
    final_image = normalize_color(clahe_applied)
    
    end_time = time.time()
    processing_time = round(end_time - start_time, 3)
    
    metadata = {
        "original_resolution": f"{image.shape[1]}x{image.shape[0]}",
        "processed_resolution": "512x512",
        "processing_time_seconds": processing_time,
        "operations_applied": [
            "Resize to 512x512",
            "Gaussian Blur Noise Reduction",
            "LAB Brightness Normalization",
            "CLAHE Histogram Equalization",
            "Gray World Color Normalization"
        ]
    }
    
    return final_image, metadata
