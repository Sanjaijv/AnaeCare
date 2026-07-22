from sqlalchemy import Column, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database.base import Base

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    risk = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    probabilities = Column(JSON, nullable=True)
    explanation = Column(JSON, nullable=True)
    model_version = Column(String, nullable=True)
    processing_time = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="predictions")
    history_entry = relationship("PredictionHistory", back_populates="prediction", uselist=False, cascade="all, delete-orphan")
