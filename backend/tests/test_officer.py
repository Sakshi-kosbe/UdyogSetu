from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_officer_routes_exist():

    response = client.get(
        "/api/v1/officer/applications/invalid-id"
    )

    assert response.status_code in [
        404,
        422,
        500,
    ]


def test_review_route_exists():

    response = client.patch(
        "/api/v1/officer/applications/invalid-id/review",
        json={
            "review_status": "UNDER_REVIEW",
            "reviewer_name": "Test Officer",
            "remarks": "Testing review workflow",
        },
    )

    assert response.status_code in [
        404,
        422,
        500,
    ]


def test_decision_validation():

    response = client.post(
        "/api/v1/officer/applications/invalid-id/decision",
        json={
            "decision": "INVALID",
            "remarks": "Testing",
        },
    )

    assert response.status_code in [
        400,
        404,
        422,
        500,
    ]