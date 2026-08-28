from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from app.core.config import settings


class MongoDB:
    client: AsyncIOMotorClient | None = None
    database: AsyncIOMotorDatabase | None = None


mongodb = MongoDB()


async def connect_to_mongodb() -> None:
    mongodb.client = AsyncIOMotorClient(settings.MONGODB_URL)

    await mongodb.client.admin.command("ping")

    mongodb.database = mongodb.client[settings.MONGODB_DB_NAME]


async def close_mongodb_connection() -> None:
    if mongodb.client is not None:
        mongodb.client.close()
        mongodb.client = None
        mongodb.database = None


def get_database() -> AsyncIOMotorDatabase:
    if mongodb.database is None:
        raise RuntimeError("MongoDB connection has not been initialized.")

    return mongodb.database