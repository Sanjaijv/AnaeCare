from typing import List, Tuple
from app.schemas.conjunctiva import Landmark, BoundingBox
import numpy as np

class EyeDetector:
    def __init__(self):
        # Indices for the left and right eyes based on MediaPipe FaceMesh
        # Right eye (user's right, left on image)
        self.RIGHT_EYE_INDICES = [33, 7, 163, 144, 145, 153, 154, 155, 133, 173, 157, 158, 159, 160, 161, 246]
        # Left eye (user's left, right on image)
        self.LEFT_EYE_INDICES = [362, 382, 381, 380, 374, 373, 390, 249, 263, 466, 388, 387, 386, 385, 384, 398]

    def detect_eye_bounding_box(self, landmarks: List[Landmark]) -> Tuple[BoundingBox, str]:
        """
        Given the face landmarks, detects the bounding box of the more prominent/visible eye.
        For simplicity in this pipeline, we will default to the user's left eye (right side of image) 
        as it often has fewer occlusions from hair depending on typical styling, or simply pick the left eye.
        """
        # We will focus on the Left Eye (indices 362-398)
        eye_points = [landmarks[i] for i in self.LEFT_EYE_INDICES]
        
        if not eye_points:
            return None, "Eye landmarks not found."
            
        xs = [pt.x for pt in eye_points]
        ys = [pt.y for pt in eye_points]
        
        x_min, x_max = min(xs), max(xs)
        y_min, y_max = min(ys), max(ys)
        
        # Add a bit of padding around the eye for context
        padding_x = int((x_max - x_min) * 0.2)
        padding_y = int((y_max - y_min) * 0.5)
        
        bbox = BoundingBox(
            x=max(0, x_min - padding_x),
            y=max(0, y_min - padding_y),
            width=(x_max - x_min) + 2 * padding_x,
            height=(y_max - y_min) + 2 * padding_y
        )
        
        return bbox, "left"
