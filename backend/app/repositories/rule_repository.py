from app.db.mongodb import mongodb


def serialize_rule(rule: dict) -> dict:
    """
    Convert MongoDB document into a JSON-safe dictionary.
    """

    rule["id"] = str(rule.pop("_id", ""))

    return rule


async def get_active_rules() -> list[dict]:
    """
    Get all active rules.
    """

    collection = mongodb.database["rules"]

    rules = await collection.find(
        {"is_active": True}
    ).to_list(length=100)

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

    rules = await collection.find(
        {
            "requirement_code": requirement_code,
            "is_active": True,
        }
    ).to_list(length=100)

    return [
        serialize_rule(rule)
        for rule in rules
    ]