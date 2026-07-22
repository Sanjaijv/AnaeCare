from pydantic import BaseModel
from typing import List, Optional

class Hospital(BaseModel):
    id: int
    name: str
    address: str
    phone: str
    latitude: float
    longitude: float
    rating: float
    open: bool
    distance: Optional[str] = None

class HealthcareRecommendationResponse(BaseModel):
    success: bool
    risk: str
    priority: str
    consultationRequired: bool
    recommendedSpecialist: str
    emergencyWarnings: Optional[List[str]] = None
    hospitals: List[Hospital]
