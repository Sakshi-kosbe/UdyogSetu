from bson import ObjectId

from app.db.mongodb import get_database


def serialize_document(document: dict | None):
    if document is None:
        return None

    serialized = dict(document)

    serialized["id"] = str(serialized.pop("_id"))

    if serialized.get("file_id"):
        serialized["file_id"] = str(serialized["file_id"])

    return serialized


async def create_document(document: dict):
    db = get_database()

    result = await db.documents.insert_one(document)

    created_document = await db.documents.find_one(
        {"_id": result.inserted_id}
    )

    return serialize_document(created_document)


async def get_document_by_id(document_id: str):
    db = get_database()

    document = await db.documents.find_one(
        {
            "_id": ObjectId(document_id)
        }
    )

    return serialize_document(document)


async def get_documents_by_business(
    business_id: str
):
    db = get_database()

    documents = await db.documents.find(
        {
            "business_id": business_id
        }
    ).to_list(length=None)

    return [
        serialize_document(document)
        for document in documents
    ]


async def get_documents_by_requirement(
    business_id: str,
    requirement_code: str,
):
    db = get_database()

    documents = await db.documents.find(
        {
            "business_id": business_id,
            "requirement_code": requirement_code,
        }
    ).to_list(length=None)

    return [
        serialize_document(document)
        for document in documents
    ]


async def update_document(
    document_id: str,
    update_data: dict,
):
    db = get_database()

    await db.documents.update_one(
        {
            "_id": ObjectId(document_id)
        },
        {
            "$set": update_data
        },
    )

    return await get_document_by_id(document_id)


async def delete_document(
    document_id: str,
):
    db = get_database()

    result = await db.documents.delete_one(
        {
            "_id": ObjectId(document_id)
        }
    )

    return result.deleted_count > 0
