from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class ComplianceRecord(BaseModel):
    id: str
    business_id: str

    title: str
    category: str
    description: Optional[str] = None

    status: str = "pending"

    authority: Optional[str] = None

    due_date: Optional[str] = None
    renewal_date: Optional[str] = None

    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)