from fastapi.testclient import TestClient

from app.main import app


def test_evaluation_endpoint():

    with TestClient(app) as client:

        response = client.post(
            "/api/v1/evaluation/",
            json={
                "business_profile": {
                    "industry": "Manufacturing"
                }
            },
        )

        assert response.status_code == 200

        data = response.json()

        assert "applicable_requirements" in data