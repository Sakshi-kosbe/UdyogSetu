from app.db.mongodb import get_database


async def get_requirement_by_code(code: str):
    db = get_database()

    requirement = await db["requirements"].find_one(
        {
            "code": code,
            "is_active": True,
        }
    )

    return requirement