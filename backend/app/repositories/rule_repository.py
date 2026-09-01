<<<<<<< HEAD
from app.db.mongodb import mongodb


def serialize_rule(rule: dict) -> dict:
    """
    Convert MongoDB document into a JSON-safe dictionary.
    """

    rule["id"] = str(rule.pop("_id", ""))
=======
from app.db.mongodb import get_database


def serialize_rule(rule):
    if rule is None:
        return None

    rule["id"] = str(rule["_id"])
    del rule["_id"]
>>>>>>> phase-8

    return rule


<<<<<<< HEAD
async def get_active_rules() -> list[dict]:
    """
    Get all active rules.
    """

    collection = mongodb.database["rules"]
=======
async def get_active_rules():
    db = get_database()
    collection = db["rules"]
>>>>>>> phase-8

    rules = await collection.find(
        {"is_active": True}
    ).to_list(length=100)

<<<<<<< HEAD
    return [
        serialize_rule(rule)
        for rule in rules
    ]


async def get_rule_by_code(
    rule_code: str,
) -> dict | None:
    """
    Get a rule using its unique code.
    """

    collection = mongodb.database["rules"]

    rule = await collection.find_one(
        {
            "code": rule_code,
            "is_active": True,
        }
    )

    if rule is None:
        return None

    return serialize_rule(rule)


async def get_rules_by_requirement(
    requirement_code: str,
) -> list[dict]:
    """
    Get all active rules for a requirement.
    """

    collection = mongodb.database["rules"]
=======
    return [serialize_rule(rule) for rule in rules]


async def get_rules_by_requirement(requirement_code: str):
    db = get_database()
    collection = db["rules"]
>>>>>>> phase-8

    rules = await collection.find(
        {
            "requirement_code": requirement_code,
            "is_active": True,
        }
    ).to_list(length=100)

<<<<<<< HEAD
    return [
        serialize_rule(rule)
        for rule in rules
    ]
=======
    return [serialize_rule(rule) for rule in rules]


async def get_rule_by_code(rule_code: str):
    db = get_database()
    collection = db["rules"]

    rule = await collection.find_one(
        {"code": rule_code}
    )

    return serialize_rule(rule)
>>>>>>> phase-8
