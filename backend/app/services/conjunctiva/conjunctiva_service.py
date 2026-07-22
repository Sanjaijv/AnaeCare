import cv2
import numpy as np
from fastapi import UploadFile
from app.schemas.conjunctiva import ConjunctivaResult
from .pipeline.conjunctiva_pipeline import ConjunctivaPipeline

class ConjunctivaService:
    def __init__(self):
        self.pipeline = ConjunctivaPipeline()

    async def detect_conjunctiva(self, file: UploadFile) -> ConjunctivaResult:
        # Read the image file
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        
        # Decode image using cv2
        image_bgr = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        if image_bgr is None:
            # Fake processing time
            return ConjunctivaResult(success=False, processing_time=0.0, error="Invalid image format.")
            
        # Convert BGR to RGB for MediaPipe
        image_rgb = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2RGB)
        
        # Process through pipeline
        result = self.pipeline.process(image_rgb)
        
        return result
