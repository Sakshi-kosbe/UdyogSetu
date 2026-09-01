from app.services.rule_engine import (
    evaluate_condition,
    evaluate_rule,
    evaluate_rules,
)


def test_equals_condition():
    condition = {
        "field": "industry",
        "operator": "equals",
        "value": "Manufacturing",
    }

    business = {
        "industry": "Manufacturing",
    }

    assert evaluate_condition(condition, business) is True


def test_not_equals_condition():
    condition = {
        "field": "industry",
        "operator": "not_equals",
        "value": "Retail",
    }

    business = {
        "industry": "Manufacturing",
    }

    assert evaluate_condition(condition, business) is True


def test_in_condition():
    condition = {
        "field": "business_size",
        "operator": "in",
        "value": ["Small", "Medium"],
    }

    business = {
        "business_size": "Medium",
    }

    assert evaluate_condition(condition, business) is True


def test_contains_condition():
    condition = {
        "field": "activities",
        "operator": "contains",
        "value": "manufacturing",
    }

    business = {
        "activities": ["manufacturing", "processing"],
    }

    assert evaluate_condition(condition, business) is True


def test_inactive_rule_is_not_applicable():
    rule = {
        "condition": {
            "field": "industry",
            "operator": "equals",
            "value": "Manufacturing",
        },
        "is_active": False,
    }

    business = {
        "industry": "Manufacturing",
    }

    assert evaluate_rule(rule, business) is False


def test_rules_are_sorted_by_priority():
    rules = [
        {
            "code": "LOW",
            "priority": 1,
            "is_active": True,
            "condition": {
                "field": "industry",
                "operator": "equals",
                "value": "Manufacturing",
            },
        },
        {
            "code": "HIGH",
            "priority": 10,
            "is_active": True,
            "condition": {
                "field": "industry",
                "operator": "equals",
                "value": "Manufacturing",
            },
        },
    ]

    business = {
        "industry": "Manufacturing",
    }

    result = evaluate_rules(rules, business)

    assert result[0]["code"] == "HIGH"