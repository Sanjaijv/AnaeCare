import time
import numpy as np
from app.schemas.conjunctiva import ConjunctivaResult
from .face_landmarks import FaceLandmarksDetector
from .eye_detector import EyeDetector
from .lower_eyelid import LowerEyelidDetector
from .roi_extractor import ROIExtractor
from .roi_validator import ROIValidator

class ConjunctivaPipeline:
    def __init__(self):
        self.face_detector = FaceLandmarksDetector()
        self.eye_detector = EyeDetector()
        self.lower_eyelid_detector = LowerEyelidDetector()
        self.roi_extractor = ROIExtractor()
        self.roi_validator = ROIValidator()

    def process(self, image: np.ndarray) -> ConjunctivaResult:
        start_time = time.time()
        
        try:
            # 1. Face Detection & Landmarks
            landmarks, error = self.face_detector.detect(image)
            if error:
                return self._error_result(error, start_time)

            # 2. Eye Detection
            bbox, eye_side = self.eye_detector.detect_eye_bounding_box(landmarks)
            if not bbox:
                return self._error_result("Unable to detect eye bounding box.", start_time)

            # 3. Lower Eyelid
            lower_eyelid = self.lower_eyelid_detector.detect_lower_eyelid(landmarks, eye_side)

            # 4. ROI Extraction
            roi_np, roi_base64 = self.roi_extractor.extract_roi(image, lower_eyelid)
            if roi_base64 is None:
                return self._error_result("Failed to extract ROI.", start_time)

            # 5. ROI Validation
            validation = self.roi_validator.validate(roi_np)
            
            processing_time = round(time.time() - start_time, 2)
            
            return ConjunctivaResult(
                success=validation.valid,
                roi_image=roi_base64,
                landmarks=landmarks,
                bbox=bbox,
                validation=validation,
                processing_time=processing_time,
                error=validation.reason if not validation.valid else None
            )
            
        except Exception as e:
            return self._error_result(f"Pipeline error: {str(e)}", start_time)
            
    def _error_result(self, error_msg: str, start_time: float) -> ConjunctivaResult:
        return ConjunctivaResult(
            success=False,
            processing_time=round(time.time() - start_time, 2),
            error=error_msg
        )
