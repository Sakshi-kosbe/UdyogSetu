from app.models.rule import Rule
from pydantic import BaseModel, Field
from typing import List, Optional


class RequirementBase(BaseModel):
    name: str
    description: str

    industry: List[str] = Field(default_factory=list)

    business_sizes: List[str] = Field(default_factory=list)

    activities: List[str] = Field(default_factory=list)

    location_types: List[str] = Field(default_factory=list)

    authority: str

    category: str

    required_documents: List[str] = Field(default_factory=list)

    source: Optional[str] = None

    source_url: Optional[str] = None

    applicability_reason: Optional[str] = None


class RequirementCreate(RequirementBase):
    pass


class RequirementResponse(RequirementBase):
    id: str
    rules: list[Rule] = Field(default_factory=list)