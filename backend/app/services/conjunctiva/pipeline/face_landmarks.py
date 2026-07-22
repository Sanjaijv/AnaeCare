import cv2
import mediapipe as mp
import numpy as np
from typing import List, Optional
from app.schemas.conjunctiva import Landmark
from app.config.conjunctiva import CONFIDENCE_THRESHOLD

class FaceLandmarksDetector:
    def __init__(self):
        self.mp_face_mesh = mp.solutions.face_mesh
        self.face_mesh = self.mp_face_mesh.FaceMesh(
            static_image_mode=True,
            max_num_faces=2, # Allowing 2 so we can catch 'multiple faces' error
            refine_landmarks=True,
            min_detection_confidence=CONFIDENCE_THRESHOLD
        )

    def detect(self, image: np.ndarray) -> tuple[Optional[List[Landmark]], Optional[str]]:
        """
        Detects facial landmarks on the provided RGB image.
        Returns a tuple of (landmarks, error_string).
        """
        results = self.face_mesh.process(image)
        
        if not results.multi_face_landmarks:
            return None, "Face not detected. Please ensure your face is clearly visible."
        
        if len(results.multi_face_landmarks) > 1:
            return None, "Multiple faces detected. Please ensure only one face is in the frame."

        face_landmarks = results.multi_face_landmarks[0]
        height, width, _ = image.shape
        
        landmarks = []
        for landmark in face_landmarks.landmark:
            x = int(landmark.x * width)
            y = int(landmark.y * height)
            landmarks.append(Landmark(x=x, y=y))
            
        return landmarks, None
