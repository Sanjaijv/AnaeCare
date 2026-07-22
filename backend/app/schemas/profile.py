from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class NotificationSettings(BaseModel):
    daily_health_tips: bool = True
    weekly_reminder: bool = True
    monthly_screening_reminder: bool = True
    diet_reminder: bool = True

class PrivacySettings(BaseModel):
    store_images: bool = False
    store_prediction_history: bool = True
    share_anonymous_data: bool = False
    allow_analytics: bool = True

class HealthProfileBase(BaseModel):
    blood_group: Optional[str] = None
    known_medical_conditions: Optional[List[str]] = []
    current_medications: Optional[List[str]] = []
    previous_anemia_diagnosis: bool = False
    iron_supplement_usage: bool = False
    pregnancy_status: bool = False
    is_vegetarian: bool = False
    smoking_status: bool = False
    alcohol_consumption: bool = False

class ProfileBase(BaseModel):
    full_name: str
    age: int = Field(gt=0)
    gender: str
    height: float = Field(gt=0) # cm
    weight: float = Field(gt=0) # kg
    phone_number: Optional[str] = None
    email: Optional[str] = None
    profile_photo: Optional[str] = None
    
    health_profile: HealthProfileBase
    symptoms: List[str] = []
    notification_settings: NotificationSettings
    privacy_settings: PrivacySettings

class ProfileCreate(ProfileBase):
    pass

class ProfileUpdate(ProfileBase):
    pass

class ProfileResponse(ProfileBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
