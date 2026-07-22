from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid
from app.database.base import Base

class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    prediction_id = Column(String(36), ForeignKey("predictions.id", ondelete="CASCADE"), unique=True, nullable=False)
    image_url = Column(String, nullable=True)
    processed_image_url = Column(String, nullable=True)
    roi_image_url = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    notes = Column(String, nullable=True)

    # Relationships
    prediction = relationship("Prediction", back_populates="history_entry")
