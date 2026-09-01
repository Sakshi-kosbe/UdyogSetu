from fastapi import APIRouter, HTTPException

from app.schemas.compliance import (
    ComplianceCreate,
    ComplianceStatusUpdate,
)

from app.services.compliance_service import (
    change_compliance_status,
    create_new_compliance,
    get_business_compliances,
    get_compliance,
    get_compliances,
    get_overdue_compliances,
    get_upcoming_renewals,
    remove_compliance,
)


router = APIRouter(
    prefix="/api/v1/compliance",
    tags=["Compliance"],
)


@router.get("/")
async def get_all_compliance_records():
    return await get_compliances()


@router.post("/")
async def create_compliance_record(
    compliance: ComplianceCreate,
):

    result = await create_new_compliance(
        business_id=compliance.business_id,
        compliance_name=compliance.compliance_name,
        description=compliance.description,
        due_date=compliance.due_date,
        renewal_date=compliance.renewal_date,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Business not found.",
        )

    return result


@router.get("/overdue")
async def get_overdue():
    return await get_overdue_compliances()


@router.get("/renewals/upcoming")
async def get_upcoming(
    days: int = 30,
):
    return await get_upcoming_renewals(days)


@router.get("/business/{business_id}")
async def get_business_compliance(
    business_id: str,
):
    return await get_business_compliances(
        business_id
    )


@router.get("/{compliance_id}")
async def get_compliance_record(
    compliance_id: str,
):

    compliance = await get_compliance(
        compliance_id
    )

    if not compliance:
        raise HTTPException(
            status_code=404,
            detail="Compliance record not found.",
        )

    return compliance


@router.patch("/{compliance_id}/status")
async def update_status(
    compliance_id: str,
    status_update: ComplianceStatusUpdate,
):

    result = await change_compliance_status(
        compliance_id,
        status_update.status,
    )

    if result is None:
        raise HTTPException(
            status_code=404,
            detail="Compliance record not found.",
        )

    if "error" in result:
        raise HTTPException(
            status_code=400,
            detail=result["error"],
        )

    return result


@router.delete("/{compliance_id}")
async def delete_compliance_record(
    compliance_id: str,
):

    deleted = await remove_compliance(
        compliance_id
    )

    if not deleted:
        raise HTTPException(
            status_code=404,
            detail="Compliance record not found.",
        )

    return {
        "message": "Compliance record deleted successfully."
    }