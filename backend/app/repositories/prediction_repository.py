from typing import List
from sqlalchemy.orm import Session
from app.models.prediction import Prediction
from app.repositories.base_repository import BaseRepository

class PredictionRepository(BaseRepository[Prediction]):
    def __init__(self):
        super().__init__(Prediction)
        
    def get_by_user_id(self, db: Session, user_id: str) -> List[Prediction]:
        return db.query(self.model).filter(self.model.user_id == user_id).order_by(self.model.created_at.desc()).all()

prediction_repository = PredictionRepository()
