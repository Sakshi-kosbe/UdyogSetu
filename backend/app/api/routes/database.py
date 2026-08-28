from fastapi import APIRouter, HTTPException, status

from app.db.mongodb import mongodb


router = APIRouter(
    prefix="/database",
    tags=["Database"],
)


@router.get("/health")
async def database_health() -> dict[str, str]:
    if mongodb.client is None or mongodb.database is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Database connection is not available.",
        )

    try:
        await mongodb.client.admin.command("ping")

        return {
            "status": "healthy",
            "database": "connected",
        }

    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail=f"Database connection failed: {str(error)}",
        ) from error