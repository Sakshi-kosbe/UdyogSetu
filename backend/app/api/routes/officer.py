from fastapi import APIRouter, HTTPException

from app.schemas.officer import (
    DecisionCreate,
    OfficerNoteCreate,
    OfficerReviewUpdate,
    QueryCreate,
    QueryResponseCreate,
)

from app.services.officer_service import (
    create_officer_note,
    get_application_review,
    raise_query,
    record_decision,
    respond_to_query,
    update_review,
)


router = APIRouter(
    prefix="/api/v1/officer",
    tags=["Officer Review"],
)


@router.get("/applications/{application_id}")
async def get_application_for_officer(
    application_id: str,
):

    application = await get_application_review(
        application_id
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found.",
        )

    return application


@router.patch(
    "/applications/{application_id}/review"
)
async def review_application(
    application_id: str,
    data: OfficerReviewUpdate,
):

    application = await update_review(
        application_id,
        data.reviewer_name,
        data.review_status,
        data.remarks,
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found.",
        )

    return application


@router.post(
    "/applications/{application_id}/notes"
)
async def add_note(
    application_id: str,
    data: OfficerNoteCreate,
):

    application = await create_officer_note(
        application_id,
        data.officer_name,
        data.note,
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found.",
        )

    return application


@router.post(
    "/applications/{application_id}/queries"
)
async def create_query(
    application_id: str,
    data: QueryCreate,
):

    application = await raise_query(
        application_id,
        data.query_id,
        data.officer_name,
        data.message,
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found.",
        )

    return application


@router.post(
    "/applications/{application_id}/queries/{query_id}/respond"
)
async def answer_query(
    application_id: str,
    query_id: str,
    data: QueryResponseCreate,
):

    application = await respond_to_query(
        application_id,
        query_id,
        data.response,
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application or query not found.",
        )

    return application


@router.post(
    "/applications/{application_id}/decision"
)
async def make_application_decision(
    application_id: str,
    data: DecisionCreate,
):

    application = await record_decision(
        application_id,
        data.decision,
        data.remarks,
    )

    if application is None:
        raise HTTPException(
            status_code=404,
            detail="Application not found.",
        )

    if "error" in application:
        raise HTTPException(
            status_code=400,
            detail=application["error"],
        )

    return application