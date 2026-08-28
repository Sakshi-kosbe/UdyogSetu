from fastapi import FastAPI

from app.core.config import settings


app = FastAPI(
    title=settings.app_name,
    description="Backend API for the Udyog Setu platform.",
    version="0.1.0",
)


@app.get("/")
async def root():
    return {
        "message": "Udyog Setu API is running",
        "status": "healthy",
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
    }