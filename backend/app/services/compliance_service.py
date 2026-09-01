from datetime import datetime, timezone

from app.repositories.business_repository import (
    get_business_by_id,
)

from app.repositories.compliance_repository import (
    create_compliance,
    delete_compliance,
    get_all_compliances,
    get_compliance_by_id,
    get_compliances_by_business,
    update_compliance,
)


VALID_COMPLIANCE_STATUSES = [
    "COMPLIANT",
    "PENDING",
    "OVERDUE",
    "NOT_APPLICABLE",
]


async def create_new_compliance(
    business_id: str,
    compliance_name: str,
    description: str | None,
    due_date: datetime | None,
    renewal_date: datetime | None,
) -> dict | None:
    """
    Create a compliance record for a business.
    """

    business = await get_business_by_id(
        business_id
    )

    if not business:
        return None

    compliance_data = {
        "business_id": business_id,
        "business_name": business.get(
            "name",
            "Unknown Business",
        ),
        "compliance_name": compliance_name,
        "description": description,
        "status": "PENDING",
        "due_date": due_date,
        "renewal_date": renewal_date,
    }

    return await create_compliance(
        compliance_data
    )


async def get_compliances() -> list[dict]:
    return await get_all_compliances()


async def get_business_compliances(
    business_id: str,
) -> list[dict]:
    return await get_compliances_by_business(
        business_id
    )


async def get_compliance(
    compliance_id: str,
) -> dict | None:
    return await get_compliance_by_id(
        compliance_id
    )


async def change_compliance_status(
    compliance_id: str,
    status: str,
) -> dict | None:
    """
    Update compliance status.
    """

    status = status.upper()

    if status not in VALID_COMPLIANCE_STATUSES:
        return {
            "error": (
                "Invalid compliance status. "
                f"Allowed statuses: "
                f"{', '.join(VALID_COMPLIANCE_STATUSES)}"
            )
        }

    compliance = await get_compliance_by_id(
        compliance_id
    )

    if not compliance:
        return None

    return await update_compliance(
        compliance_id,
        {"status": status},
    )


async def get_overdue_compliances() -> list[dict]:
    """
    Return compliances with due dates in the past.
    """

    compliances = await get_all_compliances()

    now = datetime.now(timezone.utc)

    overdue = []

    for compliance in compliances:

        due_date = compliance.get("due_date")

        if due_date and due_date < now:
            overdue.append(compliance)

    return overdue


async def get_upcoming_renewals(
    days: int = 30,
) -> list[dict]:
    """
    Return compliance renewals coming soon.
    """

    compliances = await get_all_compliances()

    now = datetime.now(timezone.utc)

    upcoming = []

    for compliance in compliances:

        renewal_date = compliance.get(
            "renewal_date"
        )

        if renewal_date:

            remaining_days = (
                renewal_date - now
            ).days

            if 0 <= remaining_days <= days:
                upcoming.append(compliance)

    return upcoming


async def remove_compliance(
    compliance_id: str,
) -> bool:
    return await delete_compliance(
        compliance_id
    )