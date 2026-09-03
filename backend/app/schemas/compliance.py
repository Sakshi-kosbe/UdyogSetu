from typing import Optional

from pydantic import BaseModel


class ComplianceCreate(BaseModel):
    business_id: str

    title: str
    category: str

    description: Optional[str] = None

    status: str = "pending"

    authority: Optional[str] = None

    due_date: Optional[str] = None
    renewal_date: Optional[str] = None


class ComplianceUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None

    description: Optional[str] = None

    status: Optional[str] = None

    authority: Optional[str] = None

    due_date: Optional[str] = None
    renewal_date: Optional[str] = None


class ComplianceStatusUpdate(BaseModel):
    status: str

    notes: Optional[str] = None