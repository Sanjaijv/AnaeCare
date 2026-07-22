import cv2
import numpy as np
import base64
from typing import List, Tuple
from app.schemas.conjunctiva import Landmark
from app.config.conjunctiva import ROI_PADDING

class ROIExtractor:
    def __init__(self):
        pass

    def extract_roi(self, image: np.ndarray, lower_eyelid_landmarks: List[Landmark]) -> Tuple[np.ndarray, str]:
        """
        Crops the conjunctiva region based on the lower eyelid landmarks and ROI padding.
        Returns the raw numpy image and a base64 encoded PNG string.
        """
        if not lower_eyelid_landmarks:
            return None, None
            
        xs = [lm.x for lm in lower_eyelid_landmarks]
        ys = [lm.y for lm in lower_eyelid_landmarks]
        
        # Calculate a bounding box around the lower eyelid curve
        x_min, x_max = min(xs), max(xs)
        y_min, y_max = min(ys), max(ys)
        
        # Apply ROI padding configured in config.py
        # We expand downwards more since the conjunctiva is exposed below the eye
        x_start = max(0, x_min - ROI_PADDING)
        x_end = min(image.shape[1], x_max + ROI_PADDING)
        y_start = max(0, y_min - (ROI_PADDING // 2)) 
        y_end = min(image.shape[0], y_max + ROI_PADDING * 2)
        
        roi_image = image[y_start:y_end, x_start:x_end]
        
        if roi_image.size == 0:
            return None, None

        # Convert to Base64 PNG for frontend
        # We use PNG to preserve exact colors (important for anemia feature extraction)
        _, buffer = cv2.imencode('.png', cv2.cvtColor(roi_image, cv2.COLOR_RGB2BGR))
        roi_base64 = base64.b64encode(buffer).decode('utf-8')
        
        return roi_image, f"data:image/png;base64,{roi_base64}"
