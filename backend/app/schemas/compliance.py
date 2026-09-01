from datetime import datetime

from pydantic import BaseModel


class ComplianceCreate(BaseModel):

    business_id: str

    compliance_name: str

    description: str | None = None

    due_date: datetime | None = None

    renewal_date: datetime | None = None


class ComplianceStatusUpdate(BaseModel):

    status: str


class ComplianceResponse(BaseModel):

    id: str

    business_id: str

    business_name: str

    compliance_name: str

    description: str | None = None

    status: str

    due_date: datetime | None = None

    renewal_date: datetime | None = None

    created_at: datetime

    updated_at: datetime