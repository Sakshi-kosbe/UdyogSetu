from datetime import datetime, timezone

from bson import ObjectId

from app.db.mongodb import get_database


def serialize_business(business: dict | None) -> dict | None:
    """
    Convert a MongoDB business document into a JSON-safe dictionary.
    """

    if business is None:
        return None

    business = dict(business)

    business["id"] = str(business.pop("_id", ""))

    return business


async def create_business(business_data: dict) -> dict:
    """
    Create a new business.
    """

    db = get_database()

    now = datetime.now(timezone.utc)

    business_data["created_at"] = now
    business_data["updated_at"] = now

    result = await db.businesses.insert_one(business_data)

    business = await db.businesses.find_one(
        {"_id": result.inserted_id}
    )

    return serialize_business(business)


async def get_all_businesses() -> list[dict]:
    """
    Return all businesses.
    """

    db = get_database()

    businesses = await db.businesses.find({}).to_list(
        length=None
    )

    return [
        serialize_business(business)
        for business in businesses
    ]


async def get_business_by_id(
    business_id: str,
) -> dict | None:
    """
    Return a business by MongoDB ID.
    """

    if not ObjectId.is_valid(business_id):
        return None

    db = get_database()

    business = await db.businesses.find_one(
        {"_id": ObjectId(business_id)}
    )

    return serialize_business(business)


async def update_business(
    business_id: str,
    update_data: dict,
) -> dict | None:
    """
    Update a business.
    """

    if not ObjectId.is_valid(business_id):
        return None

    db = get_database()

    update_data["updated_at"] = datetime.now(
        timezone.utc
    )

    await db.businesses.update_one(
        {"_id": ObjectId(business_id)},
        {"$set": update_data},
    )

    business = await db.businesses.find_one(
        {"_id": ObjectId(business_id)}
    )

    return serialize_business(business)


async def delete_business(
    business_id: str,
) -> bool:
    """
    Delete a business.
    """

    if not ObjectId.is_valid(business_id):
        return False

    db = get_database()

    result = await db.businesses.delete_one(
        {"_id": ObjectId(business_id)}
    )

    return result.deleted_count > 0