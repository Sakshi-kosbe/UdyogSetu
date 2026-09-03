from enum import Enum

from pydantic import BaseModel, Field
from pydantic import BaseModel
from typing import Optional



class DocumentStatus(str, Enum):
    MISSING = "MISSING"
    UPLOADED = "UPLOADED"
    UNDER_CHECK = "UNDER_CHECK"
    READY = "READY"
    NEEDS_ATTENTION = "NEEDS_ATTENTION"


class DocumentMetadata(BaseModel):
    business_id: str
    requirement_code: str

    document_name: str
    document_type: str | None = None

    status: DocumentStatus = DocumentStatus.MISSING

    file_id: str | None = None
    original_filename: str | None = None
    content_type: str | None = None
    file_size: int | None = None


class DocumentResponse(BaseModel):
    id: str

    business_id: str
    requirement_code: str

    document_name: str
    document_type: str | None = None

    status: DocumentStatus

    original_filename: str | None = None
    content_type: str | None = None
    file_size: int | None = None

class DocumentStatusUpdate(BaseModel):
    status: str


class DocumentChecklistItem(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    mandatory: bool = True
    status: str = "pending"