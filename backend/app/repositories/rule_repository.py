from app.db.mongodb import get_database


def serialize_rule(rule):
    if rule is None:
        return None

    rule["id"] = str(rule["_id"])
    del rule["_id"]

    return rule


async def get_active_rules():
    db = get_database()
    collection = db["rules"]

    rules = await collection.find(
        {"is_active": True}
    ).to_list(length=100)

    return [serialize_rule(rule) for rule in rules]


async def get_rules_by_requirement(requirement_code: str):
    db = get_database()
    collection = db["rules"]

    rules = await collection.find(
        {
            "requirement_code": requirement_code,
            "is_active": True,
        }
    ).to_list(length=100)

    return [serialize_rule(rule) for rule in rules]


async def get_rule_by_code(rule_code: str):
    db = get_database()
    collection = db["rules"]

    rule = await collection.find_one(
        {"code": rule_code}
    )

    return serialize_rule(rule)