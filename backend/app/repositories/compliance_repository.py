from datetime import datetime, timezone

from bson import ObjectId

from app.db.mongodb import get_database


def serialize_compliance(compliance: dict | None) -> dict | None:
    """
    Convert MongoDB ObjectId values into JSON-safe strings.
    """

    if compliance is None:
        return None

    compliance = dict(compliance)

    compliance["id"] = str(compliance.pop("_id", ""))

    return compliance


async def create_compliance(compliance_data: dict) -> dict:
    """
    Create a new compliance record.
    """

    db = get_database()

    now = datetime.now(timezone.utc)

    compliance_data["created_at"] = now
    compliance_data["updated_at"] = now

    result = await db.compliances.insert_one(
        compliance_data
    )

    compliance = await db.compliances.find_one(
        {"_id": result.inserted_id}
    )

    return serialize_compliance(compliance)


async def get_all_compliances() -> list[dict]:
    """
    Return all compliance records.
    """

    db = get_database()

    compliances = await db.compliances.find({}).to_list(
        length=None
    )

    return [
        serialize_compliance(compliance)
        for compliance in compliances
    ]


async def get_compliance_by_id(
    compliance_id: str,
) -> dict | None:
    """
    Return a compliance record by MongoDB ID.
    """

    if not ObjectId.is_valid(compliance_id):
        return None

    db = get_database()

    compliance = await db.compliances.find_one(
        {"_id": ObjectId(compliance_id)}
    )

    return serialize_compliance(compliance)


async def get_compliances_by_business(
    business_id: str,
) -> list[dict]:
    """
    Return compliance records belonging to a business.
    """

    db = get_database()

    compliances = await db.compliances.find(
        {"business_id": business_id}
    ).to_list(length=None)

    return [
        serialize_compliance(compliance)
        for compliance in compliances
    ]


async def update_compliance(
    compliance_id: str,
    update_data: dict,
) -> dict | None:
    """
    Update a compliance record.
    """

    if not ObjectId.is_valid(compliance_id):
        return None

    db = get_database()

    update_data["updated_at"] = datetime.now(
        timezone.utc
    )

    await db.compliances.update_one(
        {"_id": ObjectId(compliance_id)},
        {"$set": update_data},
    )

    compliance = await db.compliances.find_one(
        {"_id": ObjectId(compliance_id)}
    )

    return serialize_compliance(compliance)


async def delete_compliance(
    compliance_id: str,
) -> bool:
    """
    Delete a compliance record.
    """

    if not ObjectId.is_valid(compliance_id):
        return False

    db = get_database()

    result = await db.compliances.delete_one(
        {"_id": ObjectId(compliance_id)}
    )

    return result.deleted_count > 0