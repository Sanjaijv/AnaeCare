import cv2
import numpy as np
import base64
from typing import Dict, Any
from .pipeline import run_preprocessing_pipeline

def process_eye_image(image: np.ndarray) -> Dict[str, Any]:
    """
    Service entry point for preprocessing an image.
    Executes the pipeline and formats the response.
    """
    try:
        # Run pipeline
        processed_image, metadata = run_preprocessing_pipeline(image)
        
        # Encode the processed image to base64 so we can return it via API easily
        # Alternatively we could save it to disk and return a URL, but for the MVP
        # base64 is a straightforward way to return it to the frontend
        _, buffer = cv2.imencode('.png', processed_image)
        img_base64 = base64.b64encode(buffer).decode('utf-8')
        
        return {
            "success": True,
            "status": "completed",
            "processedImage": f"data:image/png;base64,{img_base64}",
            "resolution": metadata["processed_resolution"],
            "processingTime": metadata["processing_time_seconds"],
            "operations": metadata["operations_applied"]
        }
    except Exception as e:
        return {
            "success": False,
            "status": "failed",
            "processedImage": "",
            "resolution": "",
            "processingTime": 0.0,
            "operations": [],
            "error": str(e)
        }
