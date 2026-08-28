from fastapi.testclient import TestClient

from app.main import app


def test_root_endpoint():
    with TestClient(app, raise_server_exceptions=False) as client:
        response = client.get("/")

        assert response.status_code == 200

        data = response.json()

        assert data["message"] == "Udyog Setu API is running"


def test_health_endpoint():
    with TestClient(app, raise_server_exceptions=False) as client:
        response = client.get("/api/v1/health/")

        assert response.status_code == 200

        data = response.json()

        assert data["status"] == "healthy"
        assert data["service"] == "udyog-setu-api"