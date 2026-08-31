from typing import Any

from app.repositories.rule_repository import get_active_rules


def evaluate_condition(
    business_profile: dict[str, Any],
    condition: dict[str, Any],
) -> bool:
    """
    Evaluate one rule condition against a business profile.
    """

    field = condition.get("field")
    operator = condition.get("operator")
    expected_value = condition.get("value")

    actual_value = business_profile.get(field)

    if actual_value is None:
        return False

    if operator == "equals":
        return actual_value == expected_value

    if operator == "not_equals":
        return actual_value != expected_value

    if operator == "in":
        if not isinstance(expected_value, list):
            return False

        return actual_value in expected_value

    if operator == "not_in":
        if not isinstance(expected_value, list):
            return False

        return actual_value not in expected_value

    if operator == "contains":
        if isinstance(actual_value, (list, str)):
            return expected_value in actual_value

        return False

    return False


async def evaluate_business(
    business_profile: dict[str, Any],
) -> list[dict]:
    """
    Evaluate all active rules against the business profile.
    """

    rules = await get_active_rules()

    applicable_requirements: dict[str, dict] = {}

    for rule in rules:

        condition = rule.get("condition", {})

        if not evaluate_condition(
            business_profile,
            condition,
        ):
            continue

        requirement_code = rule["requirement_code"]

        matched_rule = {
            "code": rule["code"],
            "name": rule["name"],
            "requirement_code": requirement_code,
            "reason": rule["reason"],
            "priority": rule.get("priority", 0),
        }

        if requirement_code not in applicable_requirements:

            applicable_requirements[requirement_code] = {
                "requirement_code": requirement_code,
                "matched_rules": [],
            }

        applicable_requirements[
            requirement_code
        ]["matched_rules"].append(matched_rule)

    return list(applicable_requirements.values())