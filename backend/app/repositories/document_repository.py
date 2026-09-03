from bson import ObjectId

from app.db.mongodb import mongodb


def serialize_document(
    document: dict,
) -> dict:

    document = dict(document)

    document["id"] = str(
        document.pop("_id")
    )

    return document


async def create_document(
    document: dict,
):

    collection = (
        mongodb.database["documents"]
    )

    result = await collection.insert_one(
        document
    )

    created_document = await collection.find_one(
        {
            "_id": result.inserted_id
        }
    )

    return serialize_document(
        created_document
    )


async def get_documents_by_business(
    business_id: str,
):

    collection = (
        mongodb.database["documents"]
    )

    documents = await collection.find(
        {
            "business_id": business_id
        }
    ).to_list(
        length=100
    )

    return [
        serialize_document(document)
        for document in documents
    ]


async def get_documents_by_requirement(
    business_id: str,
    requirement_code: str,
):

    collection = (
        mongodb.database["documents"]
    )

    documents = await collection.find(
        {
            "business_id": business_id,
            "requirement_code": requirement_code,
        }
    ).to_list(
        length=100
    )

    return [
        serialize_document(document)
        for document in documents
    ]


async def get_document_by_id(
    document_id: str,
):

    if not ObjectId.is_valid(
        document_id
    ):
        return None

    collection = (
        mongodb.database["documents"]
    )

    document = await collection.find_one(
        {
            "_id": ObjectId(document_id)
        }
    )

    if not document:
        return None

    return serialize_document(
        document
    )


async def update_document(
    document_id: str,
    update_data: dict,
):

    if not ObjectId.is_valid(
        document_id
    ):
        return None

    collection = (
        mongodb.database["documents"]
    )

    result = await collection.find_one_and_update(
        {
            "_id": ObjectId(document_id)
        },
        {
            "$set": update_data
        },
        return_document=True,
    )

    if not result:
        return None

    return serialize_document(
        result
    )


async def delete_document(
    document_id: str,
):

    if not ObjectId.is_valid(
        document_id
    ):
        return False

    collection = (
        mongodb.database["documents"]
    )

    result = await collection.delete_one(
        {
            "_id": ObjectId(document_id)
        }
    )

    return result.deleted_count > 0