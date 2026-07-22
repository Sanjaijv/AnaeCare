from typing import List
from sqlalchemy.orm import Session

from ...schemas.history import PredictionHistory, PredictionHistoryCreate, HistoryResponse
from app.repositories.history_repository import history_repository
from .statistics_service import StatisticsService
from .timeline_service import TimelineService

class HistoryService:
    def __init__(self):
        self.statistics_service = StatisticsService()
        self.timeline_service = TimelineService()

    def get_full_history(self, db: Session) -> HistoryResponse:
        try:
            history = history_repository.list(db)
            stats = self.statistics_service.calculate_statistics(history)
            timeline = self.timeline_service.generate_timeline(history)
            
            return HistoryResponse(
                success=True,
                predictions=history,
                statistics=stats,
                timeline=timeline
            )
        except Exception as e:
            # Fallback empty response in case of error
            return HistoryResponse(
                success=False,
                predictions=[],
                statistics=self.statistics_service.calculate_statistics([]),
                timeline=[],
                error=str(e)
            )

    def save_prediction(self, db: Session, prediction_data: PredictionHistoryCreate) -> PredictionHistory:
        # TODO: Handle mapping Pydantic to Dict and generating UUID if not auto
        # Convert schema to dict for creation
        obj_in = prediction_data.model_dump()
        return history_repository.create(db, obj_in)

    def get_prediction(self, db: Session, prediction_id: str) -> PredictionHistory | None:
        return history_repository.get_by_id(db, prediction_id)

    def delete_prediction(self, db: Session, prediction_id: str) -> bool:
        return history_repository.delete(db, prediction_id)

history_service = HistoryService()
