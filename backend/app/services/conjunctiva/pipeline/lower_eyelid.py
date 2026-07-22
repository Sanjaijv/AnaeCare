from typing import List
from app.schemas.conjunctiva import Landmark

class LowerEyelidDetector:
    def __init__(self):
        # Indices corresponding to the lower eyelid/conjunctiva region for the Left Eye
        # We want the lower contour of the eye where the palpebral conjunctiva is exposed when pulled down.
        # Outer lower contour indices for Left Eye: 373, 374, 380, 381, 382, 362
        self.LOWER_EYELID_INDICES = [362, 382, 381, 380, 374, 373, 390]

    def detect_lower_eyelid(self, landmarks: List[Landmark], eye_side: str) -> List[Landmark]:
        """
        Extracts the polyline for the lower eyelid from the full face landmarks.
        """
        # For simplicity, we are assuming 'left' eye
        lower_eyelid_landmarks = [landmarks[i] for i in self.LOWER_EYELID_INDICES]
        return lower_eyelid_landmarks
