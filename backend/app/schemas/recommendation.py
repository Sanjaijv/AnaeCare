from pydantic import BaseModel
from typing import List, Dict

class FoodsModel(BaseModel):
    iron: List[str]
    vitaminC: List[str]
    avoid: List[str]

class RecommendationResponse(BaseModel):
    success: bool
    risk: str
    foods: FoodsModel
    hydration: List[str]
    lifestyle: List[str]
    education: List[str]
