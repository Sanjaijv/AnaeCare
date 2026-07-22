from typing import Optional
from sqlalchemy.orm import Session
from app.models.session import Session as SessionModel
from app.repositories.base_repository import BaseRepository

class SessionRepository(BaseRepository[SessionModel]):
    def __init__(self):
        super().__init__(SessionModel)

    def get_session(self, db: Session, user_id: str) -> Optional[SessionModel]:
        return db.query(self.model).filter(self.model.user_id == user_id).first()

    def create_session(self, db: Session, user_id: str, version: int) -> SessionModel:
        # Invalidate old sessions
        db.query(self.model).filter(self.model.user_id == user_id).delete()
        db.commit()

        new_session = self.model(user_id=user_id, version=version)
        db.add(new_session)
        db.commit()
        db.refresh(new_session)
        return new_session

    def invalidate_session(self, db: Session, user_id: str) -> None:
        db.query(self.model).filter(self.model.user_id == user_id).delete()
        db.commit()

session_repository = SessionRepository()
