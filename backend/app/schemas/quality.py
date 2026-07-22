from pydantic import BaseModel

class QualityChecks(BaseModel):
    blur: bool
    brightness: bool
    contrast: bool
    resolution: bool
    eyeVisible: bool
    conjunctivaVisible: bool

class QualityCheckResponse(BaseModel):
    success: bool
    qualityScore: int
    status: str
    recommendation: str
    checks: QualityChecks
