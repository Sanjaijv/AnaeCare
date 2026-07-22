from fastapi import APIRouter, HTTPException, Depends, Header
from sqlalchemy.orm import Session
from app.schemas.auth import RegisterRequest, LoginRequest, AuthResponse, TokenResponse
from app.services.auth.auth_service import auth_service
from app.database.session import get_db
from pydantic import BaseModel

router = APIRouter()

class RefreshRequest(BaseModel):
    refresh_token: str

@router.post("/register")
def register(request: RegisterRequest, db: Session = Depends(get_db)):
    success, message = auth_service.register(db, request)
    if not success:
        raise HTTPException(status_code=400, detail=message)
    return {"success": True, "message": message}

@router.post("/login", response_model=AuthResponse)
def login(request: LoginRequest, db: Session = Depends(get_db)):
    success, message, data = auth_service.login(db, request)
    if not success:
        raise HTTPException(status_code=401, detail=message)
    return {
        "success": True,
        "token": data["token"],
        "refresh_token": data["refresh_token"],
        "user": data["user"]
    }

@router.post("/refresh")
def refresh(request: RefreshRequest, db: Session = Depends(get_db)):
    success, message, data = auth_service.refresh(db, request.refresh_token)
    if not success:
        raise HTTPException(status_code=401, detail=message)
    return {
        "success": True,
        "token": data["token"],
        "refresh_token": data["refresh_token"]
    }

@router.post("/logout")
def logout(authorization: str = Header(None), db: Session = Depends(get_db)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    token = authorization.split(" ")[1]
    success = auth_service.logout(db, token)
    if not success:
        raise HTTPException(status_code=401, detail="Logout failed")
        
    return {"success": True, "message": "Logged out successfully"}
