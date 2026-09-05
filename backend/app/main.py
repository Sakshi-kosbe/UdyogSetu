from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router

from app.core.config import settings

from app.db.mongodb import (
    close_mongodb_connection,
    connect_to_mongodb,
)

from app.db.seed_requirements import seed_requirements
from app.db.seed_rules import seed_rules

from app.api.routes.documents import (
    router as documents_router,
)

from app.api.routes.applications import (
    router as applications_router,
)

from app.api.routes.compliance import (
    router as compliance_router,
)

from app.api.routes.officer import (
    router as officer_router,
)

from app.api.routes.schemes import (
    router as schemes_router,
)

from app.api.routes.readiness import (
    router as readiness_router,
)


@asynccontextmanager
async def lifespan(app: FastAPI):

    await connect_to_mongodb()

    await seed_requirements()

    await seed_rules()

    yield

    await close_mongodb_connection()


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description=(
        "Backend API for Udyog Setu - "
        "industrial approvals, compliance guidance, "
        "and government support services."
    ),
    lifespan=lifespan,
)


# CORS

app.add_middleware(
    CORSMiddleware,

    allow_origins=settings.cors_origins,

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# Root endpoint

@app.get(
    "/",
    tags=["Root"],
)
async def root():

    return {
        "message": "Udyog Setu API is running",
        "environment": settings.ENVIRONMENT,
    }


# Main API router

app.include_router(
    api_router,
    prefix=settings.API_V1_PREFIX,
)


# Additional routers

app.include_router(
    documents_router,
    prefix="/api/v1",
)

app.include_router(applications_router)

app.include_router(compliance_router)

app.include_router(officer_router)

app.include_router(schemes_router)

app.include_router(readiness_router)