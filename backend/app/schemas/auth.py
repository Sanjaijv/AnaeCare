from pydantic import BaseModel, EmailStr
from typing import Optional

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str
    age: Optional[int] = None
    gender: Optional[str] = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    age: Optional[int] = None
    gender: Optional[str] = None

class AuthResponse(BaseModel):
    success: bool
    token: str
    refresh_token: str
    user: UserResponse
