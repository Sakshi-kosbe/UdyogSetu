from fastapi.testclient import TestClient

from app.main import app


def test_get_rules():
    with TestClient(app) as client:
        response = client.get("/api/v1/rules/")

        assert response.status_code == 200
        assert isinstance(response.json(), list)


def test_get_rules_by_requirement():
    with TestClient(app) as client:
        response = client.get(
            "/api/v1/rules/requirement/FACTORY_REGISTRATION"
        )

        assert response.status_code == 200
        assert isinstance(response.json(), list)


def test_get_rule_by_code():
    with TestClient(app) as client:
        response = client.get(
            "/api/v1/rules/RULE_MANUFACTURING_FACTORY"
        )

        assert response.status_code == 200

        data = response.json()

        assert data["code"] == "RULE_MANUFACTURING_FACTORY"


def test_get_invalid_rule():
    with TestClient(app) as client:
        response = client.get(
            "/api/v1/rules/DOES_NOT_EXIST"
        )

        assert response.status_code == 404