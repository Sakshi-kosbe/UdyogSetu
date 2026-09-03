from fastapi import APIRouter, HTTPException
from app.database import db


router = APIRouter(
    prefix="/requirements",
    tags=["Requirements"]
)


@router.get("/{business_id}/{requirement_id}")
def get_requirement_details(
    business_id: str,
    requirement_id: str
):

    business = db.businesses.find_one(
        {"_id": business_id}
    )

    if not business:
        raise HTTPException(
            status_code=404,
            detail="Business not found"
        )

    requirements = business.get(
        "requirements",
        []
    )

    requirement = next(
        (
            item
            for item in requirements
            if item.get("id") == requirement_id
        ),
        None
    )

    if not requirement:
        raise HTTPException(
            status_code=404,
            detail="Requirement not found"
        )

    document_statuses = list(
        db.document_checklists.find({
            "business_id": business_id,
            "requirement_id": requirement_id
        })
    )

    status_map = {
        item["document_id"]: item.get(
            "status",
            "pending"
        )
        for item in document_statuses
    }

    documents = []

    for document in requirement.get(
        "documents",
        []
    ):

        documents.append({
            **document,
            "status": status_map.get(
                document["id"],
                "pending"
            )
        })

    requirement["documents"] = documents

    return requirement