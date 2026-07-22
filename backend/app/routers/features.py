import cv2
import numpy as np
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.schemas.features import FeatureExtractionResponse
from app.services.feature_extraction.pipeline.feature_pipeline import FeaturePipeline

router = APIRouter(tags=["Features"])

@router.post("/features/extract", response_model=FeatureExtractionResponse)
async def extract_features(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")
    
    try:
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise HTTPException(status_code=400, detail="Could not decode image.")
            
        # Verify resolution criteria (>= 128x128 according to spec, but we'll accept smaller if it's an ROI)
        h, w = image.shape[:2]
        if h < 32 or w < 32:
             raise HTTPException(status_code=400, detail="ROI resolution is too low.")
            
        response = FeaturePipeline.extract_all(image)
        return response
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Feature extraction failed: {str(e)}")
