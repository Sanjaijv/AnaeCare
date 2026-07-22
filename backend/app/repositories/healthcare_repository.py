from typing import List
from sqlalchemy.orm import Session
from app.models.healthcare import Healthcare
from app.repositories.base_repository import BaseRepository

class HealthcareRepository(BaseRepository[Healthcare]):
    def __init__(self):
        super().__init__(Healthcare)
        
    def get_by_user_id(self, db: Session, user_id: str) -> List[Healthcare]:
        return db.query(self.model).filter(self.model.user_id == user_id).order_by(self.model.last_consultation.desc()).all()

healthcare_repository = HealthcareRepository()
