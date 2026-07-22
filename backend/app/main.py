from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.routers import quality, preprocessing, conjunctiva, features, prediction, recommendation, history, profile, healthcare, auth, sync
from prometheus_fastapi_instrumentator import Instrumentator
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from loguru import logger
import sys

# Configure loguru
logger.remove()
logger.add(sys.stderr, format="{time} {level} {message}", level="INFO")
logger.add("logs/app.log", rotation="500 MB", retention="10 days", level="INFO")

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="AnaeCare Backend API", version="1.0.0")

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth")
app.include_router(sync.router, prefix="/api/v1/sync")
app.include_router(quality.router, prefix="/api/v1")
app.include_router(preprocessing.router, prefix="/api/v1")
app.include_router(conjunctiva.router, prefix="/api/v1")
app.include_router(features.router, prefix="/api/v1")
app.include_router(prediction.router, prefix="/api/v1/prediction")
app.include_router(recommendation.router, prefix="/api/v1")
app.include_router(history.router, prefix="/api/v1/history")
app.include_router(profile.router, prefix="/api/v1")
app.include_router(healthcare.router, prefix="/api/v1")

@app.on_event("startup")
async def startup():
    Instrumentator().instrument(app).expose(app)
    logger.info("Starting up AnaeCare Backend API")

@app.get("/")
def read_root():
    return {"message": "AnaeCare API is running"}

@app.get("/health")
@limiter.limit("10/minute")
def health_check(request: Request):
    return {
        "status": "healthy",
        "database": "connected",
        "model": "loaded",
        "version": "1.0.0"
    }
