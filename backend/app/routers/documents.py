from fastapi import APIRouter, HTTPException
from app.database import db


router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.get("/{business_id}/{requirement_id}")
def get_document_checklist(
    business_id: str,
    requirement_id: str
):

    document_statuses = list(
        db.document_checklists.find({
            "business_id": business_id,
            "requirement_id": requirement_id
        })
    )

    for item in document_statuses:
        item["_id"] = str(item["_id"])

    return document_statuses


@router.put(
    "/{business_id}/{requirement_id}/{document_id}"
)
def update_document_status(
    business_id: str,
    requirement_id: str,
    document_id: str,
    data: dict
):

    allowed_statuses = [
        "pending",
        "ready",
        "missing"
    ]

    status = data.get("status")

    if status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid document status"
        )

    db.document_checklists.update_one(
        {
            "business_id": business_id,
            "requirement_id": requirement_id,
            "document_id": document_id
        },
        {
            "$set": {
                "status": status
            }
        },
        upsert=True
    )

    return {
        "message": "Document status updated",
        "status": status
    }