import asyncio

from app.db.mongodb import connect_to_mongodb
from app.db.seed_rules import seed_rules


async def main():
    await connect_to_mongodb()
    await seed_rules()


if __name__ == "__main__":
    asyncio.run(main())