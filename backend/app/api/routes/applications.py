from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.services.application_service import (
    add_application_note,
    change_application_status,
    create_new_application,
    get_application,
    get_applications,
    get_business_applications,
    remove_application,
)


router = APIRouter(
    prefix="/api/v1/applications",
    tags=["Applications"],
)


class ApplicationCreate(BaseModel):
    business_id: str
    requirement_code: str


class ApplicationStatusUpdate(BaseModel):
    status: str
    message: str | None = None


class ApplicationNoteCreate(BaseModel):
    note: str = Field(
        min_length=1,
        max_length=2000,
    )


@router.get("/")
async def list_applications():
    return await get_applications()


@router.post("/")
async def create_application(
    application: ApplicationCreate,
):
    result = await create_new_application(
        application.business_id,
        application.requirement_code,
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail=(
                "Business or requirement was not found."
            ),
        )

    if "error" in result:
        raise HTTPException(
            status_code=409,
            detail=result["error"],
        )

    return result


@router.get("/business/{business_id}")
async def list_business_applications(
    business_id: str,
):
    return await get_business_applications(
        business_id
    )


@router.get("/{application_id}")
async def get_application_by_id(
    application_id: str,
):
    application = await get_application(
        application_id
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found.",
        )

    return application


@router.patch("/{application_id}/status")
async def update_application_status(
    application_id: str,
    status_update: ApplicationStatusUpdate,
):
    result = await change_application_status(
        application_id,
        status_update.status,
        status_update.message,
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Application not found.",
        )

    if "error" in result:
        raise HTTPException(
            status_code=400,
            detail=result["error"],
        )

    return result


@router.post("/{application_id}/notes")
async def create_application_note(
    application_id: str,
    note_data: ApplicationNoteCreate,
):
    application = await add_application_note(
        application_id,
        note_data.note,
    )

    if not application:
        raise HTTPException(
            status_code=404,
            detail="Application not found.",
        )

    return application


@router.delete("/{application_id}")
async def delete_application_by_id(
    application_id: str,
):
    deleted = await remove_application(
        application_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Application not found.",
        )

    return {
        "message": "Application deleted successfully."
    }