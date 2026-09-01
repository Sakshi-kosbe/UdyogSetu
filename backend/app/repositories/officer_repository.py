from datetime import datetime, timezone

from bson import ObjectId

from app.db.mongodb import get_database


def serialize_record(record: dict | None) -> dict | None:
    """
    Convert MongoDB ObjectId values into JSON-safe strings.
    """

    if record is None:
        return None

    record = dict(record)

    record["id"] = str(record.pop("_id", ""))

    return record


async def get_application_for_review(
    application_id: str,
) -> dict | None:
    """
    Get an application for officer review.
    """

    if not ObjectId.is_valid(application_id):
        return None

    db = get_database()

    application = await db.applications.find_one(
        {"_id": ObjectId(application_id)}
    )

    return serialize_record(application)


async def update_officer_review(
    application_id: str,
    update_data: dict,
) -> dict | None:
    """
    Update officer review information.
    """

    if not ObjectId.is_valid(application_id):
        return None

    db = get_database()

    update_data["updated_at"] = datetime.now(timezone.utc)

    await db.applications.update_one(
        {"_id": ObjectId(application_id)},
        {
            "$set": update_data
        },
    )

    application = await db.applications.find_one(
        {"_id": ObjectId(application_id)}
    )

    return serialize_record(application)


async def add_officer_note(
    application_id: str,
    note: dict,
) -> dict | None:
    """
    Add an officer review note.
    """

    if not ObjectId.is_valid(application_id):
        return None

    db = get_database()

    note["created_at"] = datetime.now(timezone.utc)

    await db.applications.update_one(
        {"_id": ObjectId(application_id)},
        {
            "$push": {
                "officer_notes": note
            },
            "$set": {
                "updated_at": datetime.now(timezone.utc)
            },
        },
    )

    application = await db.applications.find_one(
        {"_id": ObjectId(application_id)}
    )

    return serialize_record(application)


async def add_query(
    application_id: str,
    query: dict,
) -> dict | None:
    """
    Add a query raised by an officer.
    """

    if not ObjectId.is_valid(application_id):
        return None

    db = get_database()

    now = datetime.now(timezone.utc)

    query["created_at"] = now
    query["status"] = "OPEN"

    await db.applications.update_one(
        {"_id": ObjectId(application_id)},
        {
            "$push": {
                "queries": query
            },
            "$set": {
                "status": "QUERY_RAISED",
                "current_stage": "QUERY_RESPONSE",
                "updated_at": now,
            },
        },
    )

    application = await db.applications.find_one(
        {"_id": ObjectId(application_id)}
    )

    return serialize_record(application)


async def add_query_response(
    application_id: str,
    query_id: str,
    response: str,
) -> dict | None:
    """
    Add a response to an officer query.
    """

    if not ObjectId.is_valid(application_id):
        return None

    db = get_database()

    application = await db.applications.find_one(
        {"_id": ObjectId(application_id)}
    )

    if application is None:
        return None

    queries = application.get("queries", [])

    updated = False

    for query in queries:
        if query.get("query_id") == query_id:

            query["response"] = response
            query["status"] = "ANSWERED"
            query["responded_at"] = datetime.now(
                timezone.utc
            )

            updated = True
            break

    if not updated:
        return None

    await db.applications.update_one(
        {"_id": ObjectId(application_id)},
        {
            "$set": {
                "queries": queries,
                "updated_at": datetime.now(
                    timezone.utc
                ),
            }
        },
    )

    updated_application = await db.applications.find_one(
        {"_id": ObjectId(application_id)}
    )

    return serialize_record(updated_application)


async def make_decision(
    application_id: str,
    decision: str,
    remarks: str | None = None,
) -> dict | None:
    """
    Record an officer decision.
    """

    if not ObjectId.is_valid(application_id):
        return None

    db = get_database()

    now = datetime.now(timezone.utc)

    decision = decision.upper()

    update_data = {
        "status": decision,
        "current_stage": "DECISION",
        "decision": {
            "status": decision,
            "remarks": remarks,
            "decided_at": now,
        },
        "updated_at": now,
    }

    await db.applications.update_one(
        {"_id": ObjectId(application_id)},
        {
            "$set": update_data
        },
    )

    application = await db.applications.find_one(
        {"_id": ObjectId(application_id)}
    )

    return serialize_record(application)