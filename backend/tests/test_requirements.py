from fastapi.testclient import TestClient

from app.main import app


def test_requirements_endpoint():
    with TestClient(app) as client:
        response = client.get("/api/v1/requirements/")

        assert response.status_code == 200
        assert isinstance(response.json(), list)


def test_requirement_invalid_id():
    with TestClient(app) as client:
        response = client.get(
            "/api/v1/requirements/123"
        )

        assert response.status_code in [400, 404]


def test_requirement_discovery_business_not_found():
    with TestClient(app) as client:
        response = client.get(
            "/api/v1/businesses/000000000000000000000000/requirements"
        )

        assert response.status_code == 404  