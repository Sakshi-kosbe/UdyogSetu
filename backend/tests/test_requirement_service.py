import asyncio

from app.services.requirement_service import (
    get_applicable_rules,
    get_applicable_requirements,
)


def test_get_applicable_rules(monkeypatch):
    rules = [
        {
            "code": "FACTORY_RULE",
            "priority": 10,
            "is_active": True,
            "condition": {
                "field": "industry",
                "operator": "equals",
                "value": "Manufacturing",
            },
        },
        {
            "code": "RETAIL_RULE",
            "priority": 5,
            "is_active": True,
            "condition": {
                "field": "industry",
                "operator": "equals",
                "value": "Retail",
            },
        },
    ]

    async def mock_get_active_rules():
        return rules

    monkeypatch.setattr(
        "app.services.requirement_service.get_active_rules",
        mock_get_active_rules,
    )

    business = {
        "industry": "Manufacturing",
    }

    result = asyncio.run(
        get_applicable_rules(business)
    )

    assert len(result) == 1
    assert result[0]["code"] == "FACTORY_RULE"


def test_get_applicable_requirements(monkeypatch):
    rules = [
        {
            "code": "FACTORY_RULE",
            "requirement_code": "FACTORY_REGISTRATION",
            "priority": 10,
            "is_active": True,
            "condition": {
                "field": "industry",
                "operator": "equals",
                "value": "Manufacturing",
            },
        }
    ]

    async def mock_get_active_rules():
        return rules

    async def mock_get_requirement_by_code(code):
        if code == "FACTORY_REGISTRATION":
            return {
                "name": "Factory Registration",
                "code": "FACTORY_REGISTRATION",
                "category": "Registration",
                "is_active": True,
            }

        return None

    monkeypatch.setattr(
        "app.services.requirement_service.get_active_rules",
        mock_get_active_rules,
    )

    monkeypatch.setattr(
        "app.services.requirement_service.get_requirement_by_code",
        mock_get_requirement_by_code,
    )

    result = asyncio.run(
        get_applicable_requirements(
            {"industry": "Manufacturing"}
        )
    )

    assert len(result) == 1
    assert result[0]["code"] == "FACTORY_REGISTRATION"