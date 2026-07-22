from sqlalchemy.orm import Session
from app.models.history import PredictionHistory
from app.repositories.base_repository import BaseRepository

class HistoryRepository(BaseRepository[PredictionHistory]):
    def __init__(self):
        super().__init__(PredictionHistory)
        
    def get_by_prediction_id(self, db: Session, prediction_id: str) -> PredictionHistory | None:
        return db.query(self.model).filter(self.model.prediction_id == prediction_id).first()

history_repository = HistoryRepository()
