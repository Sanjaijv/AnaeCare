from fastapi import APIRouter, Query
from typing import Optional
from app.schemas.healthcare import HealthcareRecommendationResponse, Hospital
from app.services.healthcare.healthcare_service import get_consultation_recommendation, get_nearby_hospitals

router = APIRouter(tags=["Healthcare"])

@router.get("/healthcare/nearby", response_model=list[Hospital])
def get_nearby(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
    radius: float = Query(50.0, description="Radius in km")
):
    return get_nearby_hospitals(lat, lon, radius)

@router.get("/healthcare/recommendation/{risk_level}", response_model=HealthcareRecommendationResponse)
def get_recommendation_endpoint(
    risk_level: str,
    lat: float = Query(13.0, description="Latitude"),
    lon: float = Query(80.2, description="Longitude"),
    has_emergency: bool = Query(False, description="Whether user has emergency symptoms")
):
    return get_consultation_recommendation(risk_level, lat, lon, has_emergency)
