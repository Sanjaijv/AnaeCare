from app.schemas.recommendation import RecommendationResponse, FoodsModel
from .nutrition_database import iron_rich_foods, vitamin_c_foods, foods_to_avoid
from .hydration import hydration_tips
from .education import educational_tips
from .rules import low_risk, moderate_risk, high_risk

def generate_recommendations(risk_level: str) -> RecommendationResponse:
    risk_level = risk_level.capitalize()
    
    if risk_level == "Low":
        lifestyle = low_risk.get_low_risk_lifestyle()
    elif risk_level == "Moderate":
        lifestyle = moderate_risk.get_moderate_risk_lifestyle()
    elif risk_level == "High":
        lifestyle = high_risk.get_high_risk_lifestyle()
    else:
        lifestyle = low_risk.get_low_risk_lifestyle()
        risk_level = "Unknown"

    foods = FoodsModel(
        iron=iron_rich_foods,
        vitaminC=vitamin_c_foods,
        avoid=foods_to_avoid
    )

    return RecommendationResponse(
        success=True,
        risk=risk_level,
        foods=foods,
        hydration=hydration_tips,
        lifestyle=lifestyle,
        education=educational_tips
    )
