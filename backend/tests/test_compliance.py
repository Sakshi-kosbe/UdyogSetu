from fastapi.testclient import TestClient

from app.main import app


def test_compliance_routes_exist():

    with TestClient(app) as client:

        response = client.get(
            "/api/v1/compliance/"
        )

        assert response.status_code in [
            200,
            500,
        ]


def test_overdue_compliance_route_exists():

    with TestClient(app) as client:

        response = client.get(
            "/api/v1/compliance/overdue"
        )

        assert response.status_code in [
            200,
            500,
        ]


def test_upcoming_renewals_route_exists():

    with TestClient(app) as client:

        response = client.get(
            "/api/v1/compliance/renewals/upcoming"
        )

        assert response.status_code in [
            200,
            500,
        ]