from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class BoundingBox(BaseModel):
    x: int
    y: int
    width: int
    height: int

class ValidationInfo(BaseModel):
    valid: bool
    reason: Optional[str] = None
    visibility: float
    resolution: str
    blur_score: Optional[float] = None

class Landmark(BaseModel):
    x: int
    y: int

class ConjunctivaResult(BaseModel):
    success: bool
    roi_image: Optional[str] = None # Base64 encoded PNG
    landmarks: List[Landmark] = []
    bbox: Optional[BoundingBox] = None
    validation: Optional[ValidationInfo] = None
    processing_time: float
    error: Optional[str] = None

class ConjunctivaResponse(BaseModel):
    success: bool
    roiDetected: bool
    roiImage: Optional[str] = None
    boundingBox: Optional[BoundingBox] = None
    landmarks: List[Landmark] = []
    validation: Optional[ValidationInfo] = None
    processingTime: float
    error: Optional[str] = None
