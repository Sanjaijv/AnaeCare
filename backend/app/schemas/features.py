from pydantic import BaseModel
from typing import List, Optional

class FeatureSummary(BaseModel):
    redness: float
    paleness: float
    brightness: float
    contrast: float
    saturation: float
    mean_intensity: float

class FeatureVector(BaseModel):
    rgb: List[float]
    hsv: List[float]
    lab: List[float]
    redness: float
    paleness: float
    brightness: float
    texture: List[float]
    statistics: List[float]
    normalized_vector: List[float]

class FeatureExtractionResponse(BaseModel):
    success: bool
    featureCount: int
    processingTime: float
    featureVector: FeatureVector
    summary: FeatureSummary
    modelVersion: str = "1.0.0"
    roiResolution: str
    normalizationMethod: str = "min-max"
