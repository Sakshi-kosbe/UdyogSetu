from pydantic import BaseModel, Field


class DocumentCreate(BaseModel):
    business_id: str

    requirement_code: str

    document_name: str = Field(
        min_length=1,
        max_length=200,
    )

    document_type: str | None = None


class DocumentStatusUpdate(BaseModel):
    status: str