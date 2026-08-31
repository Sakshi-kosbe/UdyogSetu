from fastapi import APIRouter

from app.models.evaluation import (
    EvaluationRequest,
    EvaluationResponse,
)

from app.services.evaluation_service import evaluate_business


router = APIRouter(
    prefix="/evaluation",
    tags=["Evaluation"],
)


@router.post(
    "/",
    response_model=EvaluationResponse,
)
async def evaluate_requirements(
    request: EvaluationRequest,
):

    applicable_requirements = await evaluate_business(
        request.business_profile
    )

    return {
        "applicable_requirements": applicable_requirements
    }