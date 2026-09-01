from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.document_service import (
    calculate_readiness,
    create_document_record,
    get_business_documents,
    get_requirement_documents,
    remove_document,
    update_document_status,
)


router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


class CreateDocumentRequest(BaseModel):
    business_id: str
    requirement_code: str

    document_name: str
    document_type: str | None = None


class UpdateDocumentStatusRequest(BaseModel):
    status: str


@router.post("/")
async def create_document(
    request: CreateDocumentRequest,
):
    return await create_document_record(
        business_id=request.business_id,
        requirement_code=request.requirement_code,
        document_name=request.document_name,
        document_type=request.document_type,
    )


@router.get("/business/{business_id}")
async def get_documents(
    business_id: str,
):
    return await get_business_documents(
        business_id
    )


@router.get(
    "/business/{business_id}/requirement/{requirement_code}"
)
async def get_requirement_document_list(
    business_id: str,
    requirement_code: str,
):
    return await get_requirement_documents(
        business_id,
        requirement_code,
    )


@router.get("/business/{business_id}/readiness")
async def get_readiness(
    business_id: str,
):
    return await calculate_readiness(
        business_id
    )


@router.patch("/{document_id}/status")
async def update_status(
    document_id: str,
    request: UpdateDocumentStatusRequest,
):
    document = await update_document_status(
        document_id,
        request.status,
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    return document


@router.delete("/{document_id}")
async def delete_document(
    document_id: str,
):
    deleted = await remove_document(
        document_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Document not found",
        )

    return {
        "message": "Document deleted successfully"
    }