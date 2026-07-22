from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class FeatureVectorInput(BaseModel):
    featureVector: List[float] = Field(..., description="Array of extracted numerical features.")

class ExplanationFeature(BaseModel):
    feature: str = Field(..., description="Name of the feature")
    impact: str = Field(..., description="Impact category, e.g., 'High', 'Medium', 'Low'")
    shapValue: float = Field(..., description="Actual SHAP value for the feature")

class PredictionProbabilities(BaseModel):
    low: float = Field(..., description="Probability of Low risk")
    moderate: float = Field(..., description="Probability of Moderate risk")
    high: float = Field(..., description="Probability of High risk")

class PredictionData(BaseModel):
    risk: str = Field(..., description="Risk classification: 'Low Risk', 'Moderate Risk', 'High Risk'")
    confidence: float = Field(..., description="Confidence score between 0 and 100")
    probabilities: PredictionProbabilities
    explanation: List[ExplanationFeature]

class PredictionResponse(BaseModel):
    success: bool
    prediction: Optional[PredictionData] = None
    processingTime: float
    modelVersion: str
    error: Optional[str] = None
