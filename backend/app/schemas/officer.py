from pydantic import BaseModel, Field


class OfficerReviewUpdate(BaseModel):

    reviewer_name: str | None = None

    review_status: str = Field(
        ...,
        description="Current officer review status",
    )

    remarks: str | None = None


class OfficerNoteCreate(BaseModel):

    officer_name: str

    note: str


class QueryCreate(BaseModel):

    query_id: str

    officer_name: str

    message: str


class QueryResponseCreate(BaseModel):

    response: str


class DecisionCreate(BaseModel):

    decision: str = Field(
        ...,
        description="APPROVED or REJECTED",
    )

    remarks: str | None = None