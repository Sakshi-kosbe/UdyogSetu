from datetime import datetime, timezone


def business_document(data: dict) -> dict:
    now = datetime.now(timezone.utc)

    return {
        **data,
        "created_at": now,
        "updated_at": now,
    }


def serialize_business(business: dict) -> dict:
    return {
        "id": str(business["_id"]),
        "name": business["name"],
        "industry": business["industry"],
        "business_size": business["business_size"],
        "location": business["location"],
        "activity": business["activity"],
        "created_at": business["created_at"],
        "updated_at": business["updated_at"],
    }