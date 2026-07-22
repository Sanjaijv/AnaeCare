from fastapi import APIRouter, File, UploadFile, HTTPException
from app.schemas.conjunctiva import ConjunctivaResponse
from app.services.conjunctiva.conjunctiva_service import ConjunctivaService

router = APIRouter(
    prefix="/conjunctiva",
    tags=["Conjunctiva Detection"]
)

# Initialize service (so MediaPipe models are loaded once)
service = ConjunctivaService()

@router.post("/detect", response_model=ConjunctivaResponse)
async def detect_conjunctiva(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")
        
    result = await service.detect_conjunctiva(file)
    
    return ConjunctivaResponse(
        success=result.success,
        roiDetected=result.roi_image is not None,
        roiImage=result.roi_image,
        boundingBox=result.bbox,
        landmarks=result.landmarks,
        validation=result.validation,
        processingTime=result.processing_time,
        error=result.error
    )
