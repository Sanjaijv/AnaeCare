from app.repositories.user_repository import user_repository
from app.repositories.session_repository import session_repository
from app.services.auth.password_service import password_service
from app.services.auth.jwt_service import jwt_service
from app.schemas.auth import RegisterRequest, LoginRequest
from typing import Dict, Any, Tuple
from sqlalchemy.orm import Session

class AuthService:
    def register(self, db: Session, data: RegisterRequest) -> Tuple[bool, str]:
        existing_user = user_repository.get_by_email(db, data.email)
        if existing_user:
            return False, "Email already registered"

        hashed_password = password_service.get_password_hash(data.password)
        
        user_repository.create(db, {
            "email": data.email,
            "password_hash": hashed_password,
            "name": data.name,
            # We would create the profile later, User model doesn't have age/gender directly anymore
            # "age": data.age,
            # "gender": data.gender
        })
        
        return True, "User registered successfully"

    def login(self, db: Session, data: LoginRequest) -> Tuple[bool, str, Dict[str, Any]]:
        user = user_repository.get_by_email(db, data.email)
        if not user:
            return False, "Invalid email or password", {}

        if not password_service.verify_password(data.password, user.password_hash):
            return False, "Invalid email or password", {}

        # Increment or create session version
        session = session_repository.get_session(db, user.id)
        new_version = (session.version + 1) if session else 1
        
        session_repository.create_session(db, user.id, new_version)

        access_token = jwt_service.create_access_token(user.id, new_version)
        refresh_token = jwt_service.create_refresh_token(user.id, new_version)

        return True, "Login successful", {
            "token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "age": user.profile.age if user.profile else None,
                "gender": user.profile.gender if user.profile else None
            }
        }
        
    def refresh(self, db: Session, refresh_token: str) -> Tuple[bool, str, Dict[str, Any]]:
        payload = jwt_service.decode_token(refresh_token)
        if not payload or payload.get("type") != "refresh":
            return False, "Invalid refresh token", {}
            
        user_id = payload.get("sub")
        token_version = payload.get("version")
        
        session = session_repository.get_session(db, user_id)
        if not session or session.version != token_version:
            return False, "Session expired or invalid", {}
            
        # Create new tokens without incrementing version, just renewing expiry
        access_token = jwt_service.create_access_token(user_id, token_version)
        new_refresh_token = jwt_service.create_refresh_token(user_id, token_version)
        
        return True, "Token refreshed", {
            "token": access_token,
            "refresh_token": new_refresh_token
        }

    def logout(self, db: Session, access_token: str) -> bool:
        payload = jwt_service.decode_token(access_token)
        if not payload:
            return False
            
        user_id = payload.get("sub")
        if user_id:
            session_repository.invalidate_session(db, user_id)
            return True
        return False

auth_service = AuthService()
