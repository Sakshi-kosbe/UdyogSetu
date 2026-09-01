from datetime import datetime, timezone

from bson import ObjectId

from app.db.mongodb import get_database


def serialize_application(application: dict | None) -> dict | None:
    """
    Convert MongoDB ObjectId values into JSON-safe strings.
    """

    if application is None:
        return None

    application = dict(application)

    application["id"] = str(application.pop("_id", ""))

    return application


async def create_application(application_data: dict) -> dict:
    """
    Create a new application.
    """

    db = get_database()

    now = datetime.now(timezone.utc)

    application_data["status"] = "DRAFT"
    application_data["current_stage"] = "APPLICATION_PREPARATION"

    application_data["created_at"] = now
    application_data["updated_at"] = now

    application_data["timeline"] = [
        {
            "stage": "APPLICATION_PREPARATION",
            "status": "DRAFT",
            "message": "Application workflow created.",
            "timestamp": now,
        }
    ]

    result = await db.applications.insert_one(application_data)

    application = await db.applications.find_one(
        {"_id": result.inserted_id}
    )

    return serialize_application(application)


async def get_all_applications() -> list[dict]:
    """
    Return all applications.
    """

    db = get_database()

    applications = await db.applications.find({}).to_list(
        length=None
    )

    return [
        serialize_application(application)
        for application in applications
    ]


async def get_application_by_id(application_id: str) -> dict | None:
    """
    Return an application by MongoDB ID.
    """

    if not ObjectId.is_valid(application_id):
        return None

    db = get_database()

    application = await db.applications.find_one(
        {"_id": ObjectId(application_id)}
    )

    return serialize_application(application)


async def get_applications_by_business(
    business_id: str,
) -> list[dict]:
    """
    Return applications belonging to a business.
    """

    db = get_database()

    applications = await db.applications.find(
        {"business_id": business_id}
    ).to_list(length=None)

    return [
        serialize_application(application)
        for application in applications
    ]


async def get_application_by_requirement(
    business_id: str,
    requirement_code: str,
) -> dict | None:
    """
    Return the application for a business and requirement.
    """

    db = get_database()

    application = await db.applications.find_one(
        {
            "business_id": business_id,
            "requirement_code": requirement_code,
        }
    )

    return serialize_application(application)


async def update_application(
    application_id: str,
    update_data: dict,
) -> dict | None:
    """
    Update application fields.
    """

    if not ObjectId.is_valid(application_id):
        return None

    db = get_database()

    update_data["updated_at"] = datetime.now(timezone.utc)

    await db.applications.update_one(
        {"_id": ObjectId(application_id)},
        {"$set": update_data},
    )

    application = await db.applications.find_one(
        {"_id": ObjectId(application_id)}
    )

    return serialize_application(application)


async def add_timeline_event(
    application_id: str,
    event: dict,
) -> dict | None:
    """
    Add an event to the application timeline.
    """

    if not ObjectId.is_valid(application_id):
        return None

    db = get_database()

    event["timestamp"] = datetime.now(timezone.utc)

    await db.applications.update_one(
        {"_id": ObjectId(application_id)},
        {
            "$push": {"timeline": event},
            "$set": {
                "updated_at": datetime.now(timezone.utc)
            },
        },
    )

    application = await db.applications.find_one(
        {"_id": ObjectId(application_id)}
    )

    return serialize_application(application)


async def delete_application(
    application_id: str,
) -> bool:
    """
    Delete an application.
    """

    if not ObjectId.is_valid(application_id):
        return False

    db = get_database()

    result = await db.applications.delete_one(
        {"_id": ObjectId(application_id)}
    )

    return result.deleted_count > 0