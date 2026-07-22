from app.database.base import Base
from app.models.user import User
from app.models.profile import Profile
from app.models.session import Session
from app.models.prediction import Prediction
from app.models.history import PredictionHistory
from app.models.healthcare import Healthcare

# Export Base and all models so Alembic can discover them
__all__ = [
    "Base",
    "User",
    "Profile",
    "Session",
    "Prediction",
    "PredictionHistory",
    "Healthcare"
]
