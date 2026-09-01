from datetime import datetime, timezone

from bson import ObjectId
from fastapi import APIRouter, HTTPException, status

from app.db.mongodb import get_database
from app.models.business import business_document, serialize_business
from app.schemas.business import (
    BusinessCreate,
    BusinessResponse,
    BusinessUpdate,
)
from app.services.requirement_matcher import discover_requirements_for_business
from app.services.scheme_service import (
    discover_business_schemes,
)



router = APIRouter(
    prefix="/businesses",
    tags=["Businesses"],
)


@router.post(
    "/",
    response_model=BusinessResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_business(business: BusinessCreate):
    db = get_database()

    document = business_document(business.model_dump())

    result = await db.businesses.insert_one(document)

    created_business = await db.businesses.find_one(
        {"_id": result.inserted_id}
    )

    return serialize_business(created_business)


@router.get(
    "/",
    response_model=list[BusinessResponse],
)
async def get_businesses():
    db = get_database()

    businesses = []

    cursor = db.businesses.find({})

    async for business in cursor:
        businesses.append(serialize_business(business))

    return businesses


@router.get(
    "/{business_id}",
    response_model=BusinessResponse,
)
async def get_business(business_id: str):
    if not ObjectId.is_valid(business_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid business ID",
        )

    db = get_database()

    business = await db.businesses.find_one(
        {"_id": ObjectId(business_id)}
    )

    if business is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found",
        )

    return serialize_business(business)


@router.patch(
    "/{business_id}",
    response_model=BusinessResponse,
)
async def update_business(
    business_id: str,
    business: BusinessUpdate,
):
    if not ObjectId.is_valid(business_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid business ID",
        )

    update_data = business.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="No update data provided",
        )

    update_data["updated_at"] = datetime.now(timezone.utc)

    db = get_database()

    result = await db.businesses.update_one(
        {"_id": ObjectId(business_id)},
        {"$set": update_data},
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found",
        )

    updated_business = await db.businesses.find_one(
        {"_id": ObjectId(business_id)}
    )

    return serialize_business(updated_business)


@router.delete(
    "/{business_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_business(business_id: str):
    if not ObjectId.is_valid(business_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid business ID",
        )

    db = get_database()

    result = await db.businesses.delete_one(
        {"_id": ObjectId(business_id)}
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found",
        )

    return None


@router.get("/{business_id}/requirements")
async def discover_business_requirements(
    business_id: str,
):
    """
    Discover potentially applicable requirements for a business.
    """

    if not ObjectId.is_valid(business_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid business ID",
        )

    db = get_database()

    business = await db.businesses.find_one(
        {"_id": ObjectId(business_id)}
    )

    if business is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Business not found",
        )

    business["id"] = str(business["_id"])
    del business["_id"]

    matches = await discover_requirements_for_business(
        business
    )

    return {
        "business": {
            "id": business["id"],
            "name": business["name"],
            "industry": business["industry"],
            "business_size": business["business_size"],
            "activity": business["activity"],
            "location": business["location"],
        },
        "matched_requirements": matches,
        "total_matches": len(matches),
        "note": (
            "Prototype guidance based on structured rules. "
            "This does not constitute a statutory decision."
        ),
    }

@router.get(
    "/{business_id}/schemes",
)
async def discover_schemes_for_business(
    business_id: str,
):

    result = await discover_business_schemes(
        business_id
    )

    if not result:

        raise HTTPException(
            status_code=404,
            detail="Business not found.",
        )

    return result