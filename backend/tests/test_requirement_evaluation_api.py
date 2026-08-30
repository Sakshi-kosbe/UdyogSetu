from fastapi.testclient import TestClient

from app.main import app


def test_evaluate_requirements_api():
    with TestClient(app) as client:
        response = client.post(
            "/api/v1/requirements/evaluate",
            json={
                "industry": "Manufacturing",
            },
        )

        assert response.status_code == 200

        data = response.json()

        assert isinstance(data, list)

        if data:
            assert "code" in data[0]
            assert "name" in data[0]
            assert "applicability_reason" in data[0]


def test_evaluate_requirements_no_match():
    with TestClient(app) as client:
        response = client.post(
            "/api/v1/requirements/evaluate",
            json={
                "industry": "UnknownIndustry",
            },
        )

        assert response.status_code == 200
        assert isinstance(response.json(), list)