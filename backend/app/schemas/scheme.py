from datetime import datetime

from pydantic import BaseModel, Field


class SchemeCreate(BaseModel):
    scheme_code: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    name: str = Field(
        ...,
        min_length=2,
        max_length=300,
    )

    description: str

    category: str

    target_sectors: list[str] = []

    target_business_types: list[str] = []

    states: list[str] = []

    minimum_investment: float | None = None

    maximum_investment: float | None = None

    benefits: list[str] = []

    eligibility_criteria: list[str] = []

    official_url: str | None = None


class SchemeUpdate(BaseModel):
    name: str | None = None

    description: str | None = None

    category: str | None = None

    target_sectors: list[str] | None = None

    target_business_types: list[str] | None = None

    states: list[str] | None = None

    minimum_investment: float | None = None

    maximum_investment: float | None = None

    benefits: list[str] | None = None

    eligibility_criteria: list[str] | None = None

    official_url: str | None = None


class SchemeResponse(BaseModel):
    id: str

    scheme_code: str

    name: str

    description: str

    category: str

    target_sectors: list[str]

    target_business_types: list[str]

    states: list[str]

    minimum_investment: float | None

    maximum_investment: float | None

    benefits: list[str]

    eligibility_criteria: list[str]

    official_url: str | None

    created_at: datetime

    updated_at: datetime


class SchemeMatch(BaseModel):
    scheme: SchemeResponse

    match_score: int

    reasons: list[str]