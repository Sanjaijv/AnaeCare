from fastapi import APIRouter, File, UploadFile, HTTPException
from app.schemas.preprocessing import PreprocessingResponse
from app.services.preprocessing.preprocessing_service import process_eye_image
import numpy as np
import cv2

router = APIRouter(prefix="/preprocessing", tags=["Preprocessing"])

@router.post("/process", response_model=PreprocessingResponse)
async def process_image(image: UploadFile = File(...)):
    try:
        contents = await image.read()
        nparr = np.frombuffer(contents, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if img is None:
            raise HTTPException(status_code=400, detail="Invalid image file")

        result = process_eye_image(img)
        
        if not result["success"]:
            raise HTTPException(status_code=500, detail=result.get("error", "Unknown processing error"))
            
        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
