from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
import uuid
from app.database.base import Base

class Session(Base):
    __tablename__ = "sessions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    version = Column(Integer, default=1, nullable=False)

    # Relationships
    user = relationship("User", back_populates="sessions")
