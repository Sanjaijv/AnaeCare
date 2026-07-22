from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
import uuid
from app.database.base import Base

class Healthcare(Base):
    __tablename__ = "healthcare"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    hospital_visited = Column(String, nullable=True)
    doctor_recommendation = Column(String, nullable=True)
    last_consultation = Column(DateTime, nullable=True)

    # Relationships
    user = relationship("User", back_populates="healthcare_records")
