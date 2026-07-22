from sqlalchemy import Column, String, Integer, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
import uuid
from app.database.base import Base

class Profile(Base):
    __tablename__ = "profiles"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    age = Column(Integer, nullable=True)
    gender = Column(String, nullable=True)
    height = Column(Float, nullable=True)
    weight = Column(Float, nullable=True)
    blood_group = Column(String, nullable=True)
    medical_history = Column(JSON, nullable=True)
    symptoms = Column(JSON, nullable=True)
    preferences = Column(JSON, nullable=True)

    # Relationships
    user = relationship("User", back_populates="profile")
