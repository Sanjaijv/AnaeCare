from fastapi import APIRouter
from app.schemas.recommendation import RecommendationResponse
from app.services.recommendation.diet_engine import generate_recommendations

router = APIRouter(
    prefix="/recommendation",
    tags=["Recommendation"]
)

@router.get("/{riskLevel}", response_model=RecommendationResponse)
def get_recommendation(riskLevel: str):
    return generate_recommendations(riskLevel)
