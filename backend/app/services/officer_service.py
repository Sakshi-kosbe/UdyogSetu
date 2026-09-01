from app.repositories.officer_repository import (
    add_officer_note,
    add_query,
    add_query_response,
    get_application_for_review,
    make_decision,
    update_officer_review,
)


VALID_DECISIONS = [
    "APPROVED",
    "REJECTED",
]


async def get_application_review(
    application_id: str,
) -> dict | None:

    return await get_application_for_review(
        application_id
    )


async def update_review(
    application_id: str,
    reviewer_name: str | None,
    review_status: str,
    remarks: str | None,
) -> dict | None:

    review_data = {
        "review": {
            "reviewer_name": reviewer_name,
            "review_status": review_status.upper(),
            "remarks": remarks,
        },
        "status": "UNDER_REVIEW",
        "current_stage": "OFFICER_REVIEW",
    }

    return await update_officer_review(
        application_id,
        review_data,
    )


async def create_officer_note(
    application_id: str,
    officer_name: str,
    note: str,
) -> dict | None:

    note_data = {
        "officer_name": officer_name,
        "note": note,
    }

    return await add_officer_note(
        application_id,
        note_data,
    )


async def raise_query(
    application_id: str,
    query_id: str,
    officer_name: str,
    message: str,
) -> dict | None:

    query_data = {
        "query_id": query_id,
        "officer_name": officer_name,
        "message": message,
    }

    return await add_query(
        application_id,
        query_data,
    )


async def respond_to_query(
    application_id: str,
    query_id: str,
    response: str,
) -> dict | None:

    return await add_query_response(
        application_id,
        query_id,
        response,
    )


async def record_decision(
    application_id: str,
    decision: str,
    remarks: str | None,
) -> dict | None:

    decision = decision.upper()

    if decision not in VALID_DECISIONS:

        return {
            "error": (
                "Invalid decision. "
                "Allowed decisions: APPROVED, REJECTED"
            )
        }

    return await make_decision(
        application_id,
        decision,
        remarks,
    )