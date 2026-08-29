from fastapi import APIRouter

from app.api.routes import database, health, businesses, requirements


api_router = APIRouter()

api_router.include_router(health.router)
api_router.include_router(database.router)
api_router.include_router(businesses.router)
api_router.include_router(requirements.router)