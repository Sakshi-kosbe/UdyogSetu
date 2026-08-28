from fastapi import APIRouter

from app.api.routes import businesses, database, health


api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(database.router)
api_router.include_router(businesses.router)