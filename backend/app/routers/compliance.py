from fastapi import APIRouter, HTTPException

from app.schemas.compliance import (
    ComplianceCreate,
    ComplianceUpdate,
    ComplianceStatusUpdate,
)

from app.services.compliance_service import (
    compliance_service,
)


router = APIRouter(
    prefix="/compliance",
    tags=["Compliance"],
)


@router.post("/")
def create_compliance(compliance: ComplianceCreate):

    return compliance_service.create_compliance(
        compliance
    )


@router.get("/")
def get_all_compliance():

    return compliance_service.get_all_compliance()


@router.get("/summary")
def get_compliance_summary():

    return compliance_service.get_summary()


@router.get("/business/{business_id}")
def get_business_compliance(business_id: str):

    return compliance_service.get_compliance_by_business(
        business_id
    )


@router.get("/{compliance_id}")
def get_compliance(compliance_id: str):

    compliance = compliance_service.get_compliance_by_id(
        compliance_id
    )

    if not compliance:

        raise HTTPException(
            status_code=404,
            detail="Compliance record not found",
        )

    return compliance


@router.put("/{compliance_id}")
def update_compliance(
    compliance_id: str,
    updates: ComplianceUpdate,
):

    compliance = compliance_service.update_compliance(
        compliance_id,
        updates,
    )

    if not compliance:

        raise HTTPException(
            status_code=404,
            detail="Compliance record not found",
        )

    return compliance


@router.patch("/{compliance_id}/status")
def change_compliance_status(
    compliance_id: str,
    status_update: ComplianceStatusUpdate,
):

    compliance = compliance_service.change_compliance_status(
        compliance_id,
        status_update,
    )

    if not compliance:

        raise HTTPException(
            status_code=404,
            detail="Compliance record not found",
        )

    return compliance


@router.delete("/{compliance_id}")
def delete_compliance(compliance_id: str):

    deleted = compliance_service.delete_compliance(
        compliance_id
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Compliance record not found",
        )

    return {
        "message": "Compliance record deleted successfully"
    }