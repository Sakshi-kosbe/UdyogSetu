from fastapi import APIRouter, HTTPException, Query
from bson import ObjectId

from app.db.mongodb import mongodb
from app.services.requirement_service import (
    get_applicable_requirements,
)


router = APIRouter(
    prefix="/requirements",
    tags=["Requirements"],
)


def serialize_document(document: dict) -> dict:
    """Convert MongoDB document into JSON-safe response."""

    document = dict(document)

    if "_id" in document:
        document["id"] = str(document.pop("_id"))

    return document


def serialize_requirement(requirement: dict) -> dict:
    """Convert requirement document into JSON-safe response."""

    return serialize_document(requirement)


@router.get("/")
async def get_requirements(
    industry: str | None = Query(
        default=None,
        description="Filter requirements by industry",
    ),
):
    """
    Get active regulatory requirements.

    Optionally filter by industry.
    """

    collection = mongodb.database["requirements"]

    query = {
        "is_active": True
    }

    if industry:
        query["applicable_industries"] = {
            "$in": [industry]
        }

    requirements = await collection.find(
        query
    ).to_list(length=100)

    return [
        serialize_requirement(requirement)
        for requirement in requirements
    ]


@router.post("/discover/{business_id}")
async def discover_requirements(
    business_id: str,
):
    """
    Discover potentially applicable requirements
    for a selected business.
    """

    if not ObjectId.is_valid(business_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid business ID",
        )

    businesses_collection = mongodb.database["businesses"]

    business = await businesses_collection.find_one(
        {
            "_id": ObjectId(business_id)
        }
    )

    if not business:
        raise HTTPException(
            status_code=404,
            detail="Business not found",
        )

    requirements = await get_applicable_requirements(
        business
    )

    return [
        serialize_requirement(requirement)
        for requirement in requirements
    ]


@router.post("/evaluate")
async def evaluate_requirements(
    business: dict,
):
    """
    Evaluate a complete business object against
    active regulatory rules.
    """

    requirements = await get_applicable_requirements(
        business
    )

    return [
        serialize_requirement(requirement)
        for requirement in requirements
    ]


@router.get("/{requirement_id}")
async def get_requirement(
    requirement_id: str,
):
    """
    Get a single regulatory requirement by MongoDB ObjectId.
    """

    if not ObjectId.is_valid(requirement_id):
        raise HTTPException(
            status_code=400,
            detail="Invalid requirement ID",
        )

    collection = mongodb.database["requirements"]

    requirement = await collection.find_one(
        {
            "_id": ObjectId(requirement_id),
            "is_active": True,
        }
    )

    if not requirement:
        raise HTTPException(
            status_code=404,
            detail="Requirement not found",
        )

    return serialize_requirement(requirement)