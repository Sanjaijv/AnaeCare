from app.services.healthcare.hospital_repository import get_all_hospitals
from app.services.healthcare.maps_service import calculate_distance, format_distance
from app.services.healthcare.recommendation_rules import get_recommendation
from app.schemas.healthcare import HealthcareRecommendationResponse, Hospital

def get_nearby_hospitals(lat: float, lon: float, radius_km: float = 50.0):
    all_hospitals = get_all_hospitals()
    nearby = []
    
    for h in all_hospitals:
        dist = calculate_distance(lat, lon, h["latitude"], h["longitude"])
        if dist <= radius_km:
            h["distance"] = format_distance(dist)
            # Add to response
            nearby.append(Hospital(**h))
            
    # Sort by distance
    nearby.sort(key=lambda x: float(x.distance.split()[0]) if x.distance else 0)
    
    return nearby

def get_consultation_recommendation(risk_level: str, lat: float, lon: float, has_emergency: bool = False):
    rec = get_recommendation(risk_level, has_emergency)
    hospitals = get_nearby_hospitals(lat, lon)
    
    return HealthcareRecommendationResponse(
        success=True,
        risk=risk_level,
        priority=rec["priority"],
        consultationRequired=rec["consultationRequired"],
        recommendedSpecialist=rec["recommendedSpecialist"],
        emergencyWarnings=rec["emergencyWarnings"],
        hospitals=hospitals
    )
