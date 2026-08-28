from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "Backend API for Udyog Setu — an SIH 2026 prototype for "
        "industrial approvals, compliance guidance, and government support services."
    ),
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/", tags=["Root"])
async def root() -> dict[str, str]:
    return {
        "message": "Udyog Setu API is running",
        "environment": settings.ENVIRONMENT,
    }


app.include_router(
    api_router,
    prefix=settings.API_V1_PREFIX,
)