import os
import shutil
import uuid
from typing import Optional
from fastapi import UploadFile

class StorageService:
    def __init__(self):
        self.storage_type = os.getenv("STORAGE_TYPE", "local")
        self.base_path = os.getenv("STORAGE_BASE_PATH", "./uploads")
        self.api_base_url = os.getenv("API_BASE_URL", "http://localhost:8000")

    def _get_local_url(self, file_path: str) -> str:
        # Assuming we will serve the uploads directory statically at /uploads
        relative_path = os.path.relpath(file_path, start=self.base_path)
        # normalize for URL
        relative_path = relative_path.replace(os.sep, "/")
        return f"{self.api_base_url}/uploads/{relative_path}"

    async def upload_image(self, file: UploadFile, folder: str = "original") -> Optional[str]:
        if self.storage_type == "local":
            return await self._upload_local(file, folder)
        elif self.storage_type == "s3":
            return await self._upload_s3(file, folder)
        return None

    async def _upload_local(self, file: UploadFile, folder: str) -> Optional[str]:
        ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
        filename = f"{uuid.uuid4()}.{ext}"
        
        target_dir = os.path.join(self.base_path, folder)
        os.makedirs(target_dir, exist_ok=True)
        
        file_path = os.path.join(target_dir, filename)
        
        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            return self._get_local_url(file_path)
        except Exception as e:
            print(f"Failed to upload file locally: {e}")
            return None

    async def _upload_s3(self, file: UploadFile, folder: str) -> Optional[str]:
        # TODO: Implement AWS S3 upload logic
        print("S3 upload not yet implemented")
        return None

storage_service = StorageService()
