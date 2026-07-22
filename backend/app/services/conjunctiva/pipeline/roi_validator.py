import numpy as np
from app.schemas.conjunctiva import ValidationInfo
from app.config.conjunctiva import MIN_ROI_SIZE, MIN_VISIBILITY, MAX_OCCLUSION

class ROIValidator:
    def __init__(self):
        pass

    def validate(self, roi_image: np.ndarray) -> ValidationInfo:
        """
        Validates the extracted ROI based on minimum size and basic heuristics.
        """
        if roi_image is None or roi_image.size == 0:
            return ValidationInfo(
                valid=False,
                reason="ROI extraction failed.",
                visibility=0.0,
                resolution="0x0",
                blur_score=0.0
            )
            
        height, width, _ = roi_image.shape
        resolution_str = f"{width}x{height}"
        
        # Size validation
        min_w, min_h = MIN_ROI_SIZE
        if width < min_w or height < min_h:
            return ValidationInfo(
                valid=False,
                reason=f"ROI resolution {resolution_str} is below minimum {min_w}x{min_h}.",
                visibility=1.0, # Assuming visible but too small
                resolution=resolution_str,
                blur_score=None
            )
            
        # Simplified visibility check for the MVP scope
        # (A real model would classify % conjunctiva vs skin/sclera)
        visibility = 1.0 
        
        return ValidationInfo(
            valid=True,
            visibility=visibility,
            resolution=resolution_str,
            blur_score=100.0 # Placeholder for blur evaluation
        )
