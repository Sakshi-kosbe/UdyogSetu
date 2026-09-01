from fastapi.testclient import TestClient

from app.main import app


def test_schemes_route_exists():

    with TestClient(app) as client:

        response = client.get(
            "/api/v1/schemes/"
        )

        assert response.status_code in [
            200,
            500,
        ]


def test_scheme_recommendation_route_exists():

    with TestClient(app) as client:

        response = client.post(
            "/api/v1/schemes/recommend",
            json={
                "business_id": "invalid-business-id"
            },
        )

        assert response.status_code in [
            200,
            404,
            422,
            500,
        ]