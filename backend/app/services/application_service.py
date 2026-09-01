from app.repositories.application_repository import (
    add_timeline_event,
    create_application,
    delete_application,
    get_all_applications,
    get_application_by_id,
    get_application_by_requirement,
    get_applications_by_business,
    update_application,
)

from app.repositories.business_repository import (
    get_business_by_id,
)

from app.repositories.requirement_repository import (
    get_requirement_by_code,
)


VALID_STATUSES = [
    "DRAFT",
    "READY_TO_SUBMIT",
    "SUBMITTED",
    "UNDER_REVIEW",
    "QUERY_RAISED",
    "APPROVED",
    "REJECTED",
]


STATUS_STAGES = {
    "DRAFT": "APPLICATION_PREPARATION",
    "READY_TO_SUBMIT": "READINESS_COMPLETE",
    "SUBMITTED": "APPLICATION_SUBMITTED",
    "UNDER_REVIEW": "OFFICER_REVIEW",
    "QUERY_RAISED": "QUERY_RESPONSE",
    "APPROVED": "DECISION",
    "REJECTED": "DECISION",
}


async def create_new_application(
    business_id: str,
    requirement_code: str,
) -> dict | None:
    """
    Create an application for a business requirement.
    """

    business = await get_business_by_id(business_id)

    if not business:
        return None

    requirement = await get_requirement_by_code(
        requirement_code
    )

    if not requirement:
        return None

    existing_application = await get_application_by_requirement(
        business_id,
        requirement_code,
    )

    if existing_application:
        return {
            "error": "Application already exists for this requirement.",
            "application": existing_application,
        }

    application_data = {
        "business_id": business_id,
        "requirement_code": requirement_code,
        "requirement_name": requirement.get(
            "name",
            requirement_code,
        ),
        "business_name": business.get(
            "name",
            "Unknown Business",
        ),
        "application_reference": None,
        "officer_notes": [],
    }

    return await create_application(application_data)


async def get_applications() -> list[dict]:
    return await get_all_applications()


async def get_business_applications(
    business_id: str,
) -> list[dict]:
    return await get_applications_by_business(
        business_id
    )


async def get_application(
    application_id: str,
) -> dict | None:
    return await get_application_by_id(application_id)


async def change_application_status(
    application_id: str,
    status: str,
    message: str | None = None,
) -> dict | None:
    """
    Change application workflow status.
    """

    status = status.upper()

    if status not in VALID_STATUSES:
        return {
            "error": (
                f"Invalid status. Allowed statuses: "
                f"{', '.join(VALID_STATUSES)}"
            )
        }

    application = await get_application_by_id(
        application_id
    )

    if not application:
        return None

    stage = STATUS_STAGES[status]

    updated_application = await update_application(
        application_id,
        {
            "status": status,
            "current_stage": stage,
        },
    )

    timeline_message = message or (
        f"Application status changed to {status}."
    )

    return await add_timeline_event(
        application_id,
        {
            "stage": stage,
            "status": status,
            "message": timeline_message,
        },
    )


async def add_application_note(
    application_id: str,
    note: str,
) -> dict | None:
    """
    Add an officer/system note to an application.
    """

    application = await get_application_by_id(
        application_id
    )

    if not application:
        return None

    notes = application.get("officer_notes", [])

    notes.append(note)

    return await update_application(
        application_id,
        {
            "officer_notes": notes,
        },
    )


async def remove_application(
    application_id: str,
) -> bool:
    return await delete_application(application_id)