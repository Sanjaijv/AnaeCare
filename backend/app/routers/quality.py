from fastapi import APIRouter, File, UploadFile, HTTPException
from app.schemas.quality import QualityCheckResponse
from app.services.quality.image_quality_service import evaluate_image_quality
import numpy as np
import cv2

router = APIRouter(prefix="/quality", tags=["Quality"])

@router.post("/check", response_model=QualityCheckResponse)
async def check_quality(image: UploadFile = File(...)):
    try:
        contents = await image.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image file")

        # The router passes the decoded OpenCV image to the engine. 
        # No OpenCV logic exists in the router itself (other than basic decoding from upload).
        result = evaluate_image_quality(img)
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
