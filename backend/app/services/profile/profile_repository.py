from typing import Optional
from app.schemas.profile import ProfileCreate, ProfileUpdate, ProfileResponse
from datetime import datetime
import uuid

# In-memory mock database for profiles
_profile_db = {}

class ProfileRepository:
    def __init__(self):
        pass

    def get_profile(self, profile_id: str) -> Optional[ProfileResponse]:
        if profile_id in _profile_db:
            return _profile_db[profile_id]
        # Return first profile if exists (since no auth for now)
        if _profile_db:
            return list(_profile_db.values())[0]
        return None

    def create_profile(self, profile_data: ProfileCreate) -> ProfileResponse:
        new_id = str(uuid.uuid4())
        now = datetime.utcnow()
        profile_response = ProfileResponse(
            id=new_id,
            created_at=now,
            updated_at=now,
            **profile_data.dict()
        )
        _profile_db[new_id] = profile_response
        return profile_response

    def update_profile(self, profile_id: str, profile_data: ProfileUpdate) -> Optional[ProfileResponse]:
        if profile_id not in _profile_db:
            # Try to get the first one if id doesn't match
            if _profile_db:
                profile_id = list(_profile_db.keys())[0]
            else:
                return None
                
        existing_profile = _profile_db[profile_id]
        now = datetime.utcnow()
        updated_profile = ProfileResponse(
            id=existing_profile.id,
            created_at=existing_profile.created_at,
            updated_at=now,
            **profile_data.dict()
        )
        _profile_db[profile_id] = updated_profile
        return updated_profile
