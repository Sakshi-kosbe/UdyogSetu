from typing import Any


def evaluate_condition(
    condition: dict,
    business: dict,
) -> bool:
    field = condition["field"]
    operator = condition["operator"]
    expected = condition["value"]

    actual = business.get(field)

    if operator == "equals":
        return actual == expected

    if operator == "not_equals":
        return actual != expected

    if operator == "in":
        return actual in expected

    if operator == "not_in":
        return actual not in expected

    if operator == "contains":
        if isinstance(actual, list):
            return expected in actual

        if isinstance(actual, str):
            return str(expected).lower() in actual.lower()

        return False

    return False


def evaluate_rule(
    rule: dict,
    business: dict,
) -> bool:
    if not rule.get("is_active", True):
        return False

    return evaluate_condition(
        rule["condition"],
        business,
    )
def evaluate_rules(
    rules: list[dict],
    business: dict,
) -> list[dict]:
    applicable_rules = []

    for rule in rules:
        if evaluate_rule(rule, business):
            applicable_rules.append(rule)

    applicable_rules.sort(
        key=lambda rule: rule.get("priority", 0),
        reverse=True,
    )

    return applicable_rules