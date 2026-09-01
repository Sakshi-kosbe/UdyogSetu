from fastapi.testclient import TestClient

from app.main import app


def test_list_applications():
    with TestClient(app) as client:
        response = client.get(
            "/api/v1/applications/"
        )

    assert response.status_code == 200


def test_create_application_invalid_business():
    with TestClient(app) as client:
        response = client.post(
            "/api/v1/applications/",
            json={
                "business_id": "invalid_business_id",
                "requirement_code": "FACTORY_REGISTRATION",
            },
        )

    assert response.status_code == 404


def test_get_invalid_application():
    with TestClient(app) as client:
        response = client.get(
            "/api/v1/applications/invalid_id"
        )

    assert response.status_code == 404