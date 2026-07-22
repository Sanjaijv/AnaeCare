from fastapi import APIRouter, HTTPException, Depends
from typing import Any
from sqlalchemy.orm import Session

from app.database.session import get_db
from ..schemas.history import PredictionHistoryCreate, PredictionHistory, HistoryResponse
from ..services.history.history_service import history_service

router = APIRouter()

@router.get("", response_model=HistoryResponse)
async def get_history(db: Session = Depends(get_db)) -> Any:
    """
    Get all prediction history, statistics, and timeline.
    """
    return history_service.get_full_history(db)

@router.get("/{prediction_id}", response_model=PredictionHistory)
async def get_prediction(prediction_id: str, db: Session = Depends(get_db)) -> Any:
    """
    Get a specific prediction by ID.
    """
    prediction = history_service.get_prediction(db, prediction_id)
    if not prediction:
        raise HTTPException(status_code=404, detail="Prediction not found")
    return prediction

@router.post("", response_model=PredictionHistory)
async def save_prediction(data: PredictionHistoryCreate, db: Session = Depends(get_db)) -> Any:
    """
    Save a new prediction to history.
    """
    try:
        return history_service.save_prediction(db, data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{prediction_id}")
async def delete_prediction(prediction_id: str, db: Session = Depends(get_db)) -> Any:
    """
    Delete a prediction from history.
    """
    success = history_service.delete_prediction(db, prediction_id)
    if not success:
        raise HTTPException(status_code=404, detail="Prediction not found")
    return {"success": True}
