from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from typing import List, Dict, Any
from app.services.auth.sync_service import sync_service
from app.services.auth.jwt_service import jwt_service

router = APIRouter()

class SyncBatchRequest(BaseModel):
    operations: List[Dict[str, Any]]

@router.post("/batch")
def sync_batch(request: SyncBatchRequest, authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
        
    token = authorization.split(" ")[1]
    payload = jwt_service.decode_token(token)
    if not payload or payload.get("type") != "access":
        raise HTTPException(status_code=401, detail="Invalid or expired access token")
        
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload")
        
    success = sync_service.process_sync_batch(user_id, request.operations)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to process sync batch")
        
    return {"success": True, "message": "Batch synced successfully"}
