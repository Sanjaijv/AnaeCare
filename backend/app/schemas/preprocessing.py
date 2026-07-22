from pydantic import BaseModel
from typing import List

class PreprocessingResponse(BaseModel):
    success: bool
    status: str
    processedImage: str
    resolution: str
    processingTime: float
    operations: List[str]
