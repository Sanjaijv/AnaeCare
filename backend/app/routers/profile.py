from fastapi import APIRouter, HTTPException, Depends
from app.schemas.profile import ProfileCreate, ProfileUpdate, ProfileResponse
from app.services.profile.profile_service import ProfileService

router = APIRouter(prefix="/profile", tags=["Profile"])
profile_service = ProfileService()

@router.get("", response_model=ProfileResponse)
def get_profile():
    # In a real app we'd get user_id from token, using default for now
    profile = profile_service.get_profile("default_user")
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.post("", response_model=ProfileResponse)
def create_profile(profile_data: ProfileCreate):
    return profile_service.create_profile(profile_data)

@router.put("", response_model=ProfileResponse)
def update_profile(profile_data: ProfileUpdate):
    profile = profile_service.update_profile("default_user", profile_data)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile
