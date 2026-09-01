from datetime import datetime, timezone

from bson import ObjectId

from app.db.mongodb import get_database


def serialize_scheme(
    scheme: dict | None,
) -> dict | None:

    if scheme is None:
        return None

    scheme = dict(scheme)

    scheme["id"] = str(
        scheme.pop("_id", "")
    )

    return scheme


async def create_scheme(
    scheme_data: dict,
) -> dict:

    db = get_database()

    now = datetime.now(timezone.utc)

    scheme_data["created_at"] = now
    scheme_data["updated_at"] = now

    result = await db.schemes.insert_one(
        scheme_data
    )

    scheme = await db.schemes.find_one(
        {"_id": result.inserted_id}
    )

    return serialize_scheme(scheme)


async def get_all_schemes() -> list[dict]:

    db = get_database()

    schemes = await db.schemes.find(
        {}
    ).to_list(length=None)

    return [
        serialize_scheme(scheme)
        for scheme in schemes
    ]


async def get_scheme_by_id(
    scheme_id: str,
) -> dict | None:

    if not ObjectId.is_valid(scheme_id):
        return None

    db = get_database()

    scheme = await db.schemes.find_one(
        {
            "_id": ObjectId(scheme_id)
        }
    )

    return serialize_scheme(scheme)


async def get_scheme_by_code(
    scheme_code: str,
) -> dict | None:

    db = get_database()

    scheme = await db.schemes.find_one(
        {
            "scheme_code": scheme_code
        }
    )

    return serialize_scheme(scheme)


async def update_scheme(
    scheme_id: str,
    update_data: dict,
) -> dict | None:

    if not ObjectId.is_valid(scheme_id):
        return None

    db = get_database()

    update_data["updated_at"] = (
        datetime.now(timezone.utc)
    )

    await db.schemes.update_one(
        {
            "_id": ObjectId(scheme_id)
        },
        {
            "$set": update_data
        },
    )

    scheme = await db.schemes.find_one(
        {
            "_id": ObjectId(scheme_id)
        }
    )

    return serialize_scheme(scheme)


async def delete_scheme(
    scheme_id: str,
) -> bool:

    if not ObjectId.is_valid(scheme_id):
        return False

    db = get_database()

    result = await db.schemes.delete_one(
        {
            "_id": ObjectId(scheme_id)
        }
    )

    return result.deleted_count > 0