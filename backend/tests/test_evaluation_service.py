from app.services.evaluation_service import evaluate_condition


def test_equals_operator():

    business_profile = {
        "industry": "Manufacturing"
    }

    condition = {
        "field": "industry",
        "operator": "equals",
        "value": "Manufacturing",
    }

    assert evaluate_condition(
        business_profile,
        condition,
    ) is True


def test_equals_operator_no_match():

    business_profile = {
        "industry": "Retail"
    }

    condition = {
        "field": "industry",
        "operator": "equals",
        "value": "Manufacturing",
    }

    assert evaluate_condition(
        business_profile,
        condition,
    ) is False


def test_not_equals_operator():

    business_profile = {
        "industry": "Manufacturing"
    }

    condition = {
        "field": "industry",
        "operator": "not_equals",
        "value": "Retail",
    }

    assert evaluate_condition(
        business_profile,
        condition,
    ) is True


def test_in_operator():

    business_profile = {
        "industry": "Manufacturing"
    }

    condition = {
        "field": "industry",
        "operator": "in",
        "value": [
            "Manufacturing",
            "Chemical",
        ],
    }

    assert evaluate_condition(
        business_profile,
        condition,
    ) is True


def test_not_in_operator():

    business_profile = {
        "industry": "Manufacturing"
    }

    condition = {
        "field": "industry",
        "operator": "not_in",
        "value": [
            "Retail",
            "IT",
        ],
    }

    assert evaluate_condition(
        business_profile,
        condition,
    ) is True


def test_contains_operator():

    business_profile = {
        "activities": [
            "Manufacturing",
            "Assembly",
        ]
    }

    condition = {
        "field": "activities",
        "operator": "contains",
        "value": "Manufacturing",
    }

    assert evaluate_condition(
        business_profile,
        condition,
    ) is True


def test_missing_field_returns_false():

    business_profile = {
        "industry": "Manufacturing"
    }

    condition = {
        "field": "employees",
        "operator": "equals",
        "value": 50,
    }

    assert evaluate_condition(
        business_profile,
        condition,
    ) is False