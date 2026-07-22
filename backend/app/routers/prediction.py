from fastapi import APIRouter, HTTPException, Depends
from typing import Any
import time

from ..schemas.prediction import FeatureVectorInput, PredictionResponse
from ..services.prediction.prediction_service import process_prediction

router = APIRouter()

@router.post("/predict", response_model=PredictionResponse)
async def predict_risk(data: FeatureVectorInput) -> Any:
    """
    Run AI inference on the provided feature vector.
    """
    start_time = time.time()
    try:
        prediction_result, model_version = await process_prediction(data.featureVector)
        processing_time = time.time() - start_time
        
        return PredictionResponse(
            success=True,
            prediction=prediction_result,
            processingTime=round(processing_time, 2),
            modelVersion=model_version
        )
    except Exception as e:
        processing_time = time.time() - start_time
        return PredictionResponse(
            success=False,
            processingTime=round(processing_time, 2),
            modelVersion="unknown",
            error=str(e)
        )
