from app.repositories.document_repository import (
    create_document,
    delete_document,
    get_documents_by_business,
    get_documents_by_requirement,
    update_document,
)


VALID_DOCUMENT_STATUSES = [
    "MISSING",
    "UPLOADED",
    "UNDER_CHECK",
    "READY",
]


async def create_document_record(
    business_id: str,
    requirement_code: str,
    document_name: str,
    document_type: str | None = None,
):

    document = {
        "business_id": business_id,
        "requirement_code": requirement_code,
        "document_name": document_name,
        "document_type": document_type,
        "status": "MISSING",
        "file_id": None,
        "original_filename": None,
        "content_type": None,
        "file_size": None,
    }

    return await create_document(
        document
    )


async def get_business_documents(
    business_id: str,
):

    return await get_documents_by_business(
        business_id
    )


async def get_requirement_documents(
    business_id: str,
    requirement_code: str,
):

    return await get_documents_by_requirement(
        business_id,
        requirement_code,
    )


async def calculate_readiness(
    business_id: str,
):

    documents = await get_documents_by_business(
        business_id
    )

    total_documents = len(documents)

    if total_documents == 0:

        return {
            "business_id": business_id,
            "total_documents": 0,
            "completed_documents": 0,
            "missing_documents": 0,
            "readiness_percentage": 0,
        }

    completed_documents = sum(
        1
        for document in documents
        if document.get("status")
        in [
            "UPLOADED",
            "UNDER_CHECK",
            "READY",
        ]
    )

    missing_documents = sum(
        1
        for document in documents
        if document.get("status") == "MISSING"
    )

    readiness_percentage = (
        completed_documents
        / total_documents
    ) * 100

    return {
        "business_id": business_id,
        "total_documents": total_documents,
        "completed_documents": completed_documents,
        "missing_documents": missing_documents,
        "readiness_percentage": round(
            readiness_percentage,
            2,
        ),
    }


async def remove_document(
    document_id: str,
):

    return await delete_document(
        document_id
    )


async def update_document_status(
    document_id: str,
    status: str,
):

    status = status.upper()

    if status not in VALID_DOCUMENT_STATUSES:

        return None

    return await update_document(
        document_id,
        {
            "status": status
        },
    )