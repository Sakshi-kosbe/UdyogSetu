from fastapi import APIRouter

<<<<<<< HEAD
from app.api.routes import (
    database,
    health,
    businesses,
    requirements,
    rules,
    evaluation,
)
=======
from app.api.routes import database, health, businesses, requirements, rules
>>>>>>> phase-8


api_router = APIRouter()


api_router.include_router(health.router)

api_router.include_router(database.router)

api_router.include_router(businesses.router)

api_router.include_router(requirements.router)

<<<<<<< HEAD
api_router.include_router(rules.router)

api_router.include_router(evaluation.router)
=======
api_router.include_router(rules.router)
>>>>>>> phase-8
