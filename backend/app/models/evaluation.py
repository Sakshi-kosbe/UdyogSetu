from typing import Any

from pydantic import BaseModel, Field


class EvaluationRequest(BaseModel):
    business_profile: dict[str, Any] = Field(
        ...,
        description="Business information used for rule evaluation",
    )


class MatchedRule(BaseModel):
    code: str
    name: str
    requirement_code: str
    reason: str
    priority: int


class EvaluationResult(BaseModel):
    requirement_code: str
    matched_rules: list[MatchedRule] = Field(
        default_factory=list
    )


class EvaluationResponse(BaseModel):
    applicable_requirements: list[EvaluationResult] = Field(
        default_factory=list
    )