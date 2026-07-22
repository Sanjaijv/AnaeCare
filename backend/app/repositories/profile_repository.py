from typing import Optional
from sqlalchemy.orm import Session
from app.models.profile import Profile
from app.repositories.base_repository import BaseRepository

class ProfileRepository(BaseRepository[Profile]):
    def __init__(self):
        super().__init__(Profile)
        
    def get_by_user_id(self, db: Session, user_id: str) -> Optional[Profile]:
        return db.query(self.model).filter(self.model.user_id == user_id).first()

profile_repository = ProfileRepository()
