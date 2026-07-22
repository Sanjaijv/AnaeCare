from typing import Optional
from app.schemas.profile import ProfileCreate, ProfileUpdate, ProfileResponse
from app.services.profile.profile_repository import ProfileRepository

class ProfileService:
    def __init__(self):
        self.repository = ProfileRepository()

    def get_profile(self, profile_id: str = "default_user") -> Optional[ProfileResponse]:
        return self.repository.get_profile(profile_id)

    def create_profile(self, profile_data: ProfileCreate) -> ProfileResponse:
        return self.repository.create_profile(profile_data)

    def update_profile(self, profile_id: str, profile_data: ProfileUpdate) -> Optional[ProfileResponse]:
        return self.repository.update_profile(profile_id, profile_data)
