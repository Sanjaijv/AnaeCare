from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class PredictionHistoryCreate(BaseModel):
    userId: str
    riskLevel: str
    confidence: float
    predictionSummary: str = ""
    imagePath: Optional[str] = None
    processingTime: float
    modelVersion: str
    explanation: Optional[str] = None
    dietRecommendation: Optional[str] = None

class PredictionHistory(PredictionHistoryCreate):
    id: str
    timestamp: datetime
    createdAt: datetime

class HistoryStatistics(BaseModel):
    totalScans: int
    highestConfidence: float
    averageConfidence: float
    lowRiskPercent: float
    moderateRiskPercent: float
    highRiskPercent: float
    latestScan: Optional[datetime] = None
    firstScan: Optional[datetime] = None
    mostCommonRisk: Optional[str] = None

class TimelineEntry(BaseModel):
    predictionId: str
    timestamp: datetime
    riskLevel: str
    confidence: float
    modelVersion: str

class HistoryResponse(BaseModel):
    success: bool
    predictions: List[PredictionHistory]
    statistics: HistoryStatistics
    timeline: List[TimelineEntry]
    error: Optional[str] = None
