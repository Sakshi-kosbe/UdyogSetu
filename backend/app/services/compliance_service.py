from datetime import datetime, timedelta
from uuid import uuid4


compliance_records = []


async def get_compliances():
    """Return all compliance records."""
    return compliance_records


async def get_compliance(compliance_id: str):
    """Return one compliance record by ID."""

    for compliance in compliance_records:
        if compliance["id"] == compliance_id:
            return compliance

    return None


async def get_business_compliances(business_id: str):
    """Return all compliance records for a business."""

    return [
        compliance
        for compliance in compliance_records
        if compliance.get("business_id") == business_id
    ]


async def create_new_compliance(
    business_id: str,
    compliance_name: str,
    description: str | None = None,
    due_date=None,
    renewal_date=None,
):
    """Create a new compliance record."""

    compliance = {
        "id": str(uuid4()),
        "business_id": business_id,
        "compliance_name": compliance_name,
        "description": description,
        "due_date": due_date,
        "renewal_date": renewal_date,
        "status": "pending",
        "notes": None,
        "created_at": datetime.utcnow().isoformat(),
        "updated_at": datetime.utcnow().isoformat(),
    }

    compliance_records.append(compliance)

    return compliance


async def change_compliance_status(
    compliance_id: str,
    status: str,
):
    """Change the status of a compliance record."""

    compliance = await get_compliance(compliance_id)

    if compliance is None:
        return None

    allowed_statuses = {
        "pending",
        "completed",
        "overdue",
    }

    if status not in allowed_statuses:
        return {
            "error": (
                "Invalid status. "
                "Allowed values are: pending, completed, overdue."
            )
        }

    compliance["status"] = status
    compliance["updated_at"] = datetime.utcnow().isoformat()

    return compliance


async def get_overdue_compliances():
    """Return overdue compliance records."""

    return [
        compliance
        for compliance in compliance_records
        if compliance.get("status") == "overdue"
    ]


async def get_upcoming_renewals(days: int = 30):
    """Return compliance records with upcoming renewal dates."""

    today = datetime.utcnow().date()
    future_date = today + timedelta(days=days)

    upcoming = []

    for compliance in compliance_records:
        renewal_date = compliance.get("renewal_date")

        if renewal_date is None:
            continue

        try:
            if hasattr(renewal_date, "date"):
                renewal = renewal_date.date()
            elif hasattr(renewal_date, "year"):
                renewal = renewal_date
            else:
                renewal = datetime.fromisoformat(
                    str(renewal_date)
                ).date()

            if today <= renewal <= future_date:
                upcoming.append(compliance)

        except (ValueError, TypeError):
            continue

    return upcoming


async def remove_compliance(compliance_id: str):
    """Delete a compliance record."""

    compliance = await get_compliance(compliance_id)

    if compliance is None:
        return False

    compliance_records.remove(compliance)

    return True