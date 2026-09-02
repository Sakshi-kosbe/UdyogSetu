from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List


router = APIRouter(
    prefix="/api/readiness",
    tags=["Application Readiness"],
)


class DocumentStatus(BaseModel):
    id: str
    name: str
    completed: bool


class RequirementReadiness(BaseModel):
    requirement_id: str
    requirement_name: str
    status: str
    readiness_percentage: int
    documents: List[DocumentStatus]


class ReadinessResponse(BaseModel):
    business_id: str
    overall_readiness: int
    total_requirements: int
    ready_requirements: int
    in_progress_requirements: int
    missing_documents: int
    requirements: List[RequirementReadiness]


# Temporary prototype readiness data.
# This can later be connected directly to MongoDB persistence.

READINESS_DATA = {
    "demo-business-1": [
        {
            "requirement_id": "factory-registration",
            "requirement_name": "Factory Registration",
            "documents": [
                {
                    "id": "business-registration",
                    "name": "Business Registration Certificate",
                    "completed": True,
                },
                {
                    "id": "identity-proof",
                    "name": "Identity Proof",
                    "completed": True,
                },
                {
                    "id": "factory-layout",
                    "name": "Factory Layout Plan",
                    "completed": False,
                },
            ],
        },
        {
            "requirement_id": "pollution-consent",
            "requirement_name": "Pollution Control Consent",
            "documents": [
                {
                    "id": "business-registration",
                    "name": "Business Registration Certificate",
                    "completed": True,
                },
                {
                    "id": "site-plan",
                    "name": "Site Plan",
                    "completed": False,
                },
                {
                    "id": "process-details",
                    "name": "Manufacturing Process Details",
                    "completed": False,
                },
            ],
        },
        {
            "requirement_id": "gst-registration",
            "requirement_name": "GST Registration",
            "documents": [
                {
                    "id": "pan-card",
                    "name": "PAN Card",
                    "completed": True,
                },
                {
                    "id": "business-address",
                    "name": "Business Address Proof",
                    "completed": True,
                },
            ],
        },
    ]
}


def calculate_requirement_readiness(requirement):
    documents = requirement["documents"]

    if not documents:
        return 0

    completed = sum(
        1 for document in documents if document["completed"]
    )

    percentage = round(
        (completed / len(documents)) * 100
    )

    if percentage == 100:
        status = "Ready"
    elif percentage == 0:
        status = "Not Started"
    else:
        status = "In Progress"

    return percentage, status


@router.get("/{business_id}", response_model=ReadinessResponse)
def get_application_readiness(business_id: str):

    requirements = READINESS_DATA.get(
        business_id,
        READINESS_DATA["demo-business-1"],
    )

    readiness_requirements = []

    total_documents = 0
    completed_documents = 0

    ready_requirements = 0
    in_progress_requirements = 0

    for requirement in requirements:

        percentage, status = calculate_requirement_readiness(
            requirement
        )

        documents = requirement["documents"]

        total_documents += len(documents)

        completed_documents += sum(
            1
            for document in documents
            if document["completed"]
        )

        if status == "Ready":
            ready_requirements += 1
        else:
            in_progress_requirements += 1

        readiness_requirements.append(
            RequirementReadiness(
                requirement_id=requirement[
                    "requirement_id"
                ],
                requirement_name=requirement[
                    "requirement_name"
                ],
                status=status,
                readiness_percentage=percentage,
                documents=documents,
            )
        )

    overall_readiness = 0

    if total_documents > 0:
        overall_readiness = round(
            (completed_documents / total_documents) * 100
        )

    missing_documents = (
        total_documents - completed_documents
    )

    return ReadinessResponse(
        business_id=business_id,
        overall_readiness=overall_readiness,
        total_requirements=len(requirements),
        ready_requirements=ready_requirements,
        in_progress_requirements=in_progress_requirements,
        missing_documents=missing_documents,
        requirements=readiness_requirements,
    )


@router.patch(
    "/{business_id}/documents/{document_id}"
)
def update_document_status(
    business_id: str,
    document_id: str,
    completed: bool,
):

    requirements = READINESS_DATA.get(
        business_id,
        READINESS_DATA["demo-business-1"],
    )

    for requirement in requirements:

        for document in requirement["documents"]:

            if document["id"] == document_id:

                document["completed"] = completed

                return {
                    "message":
                        "Document status updated successfully",
                    "document_id": document_id,
                    "completed": completed,
                }

    raise HTTPException(
        status_code=404,
        detail="Document not found",
    )