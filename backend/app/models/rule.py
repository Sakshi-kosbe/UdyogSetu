from typing import Any, Literal

from pydantic import BaseModel, Field


RuleOperator = Literal[
    "equals",
    "not_equals",
    "in",
    "not_in",
    "contains",
]


class RuleCondition(BaseModel):
    field: str
    operator: RuleOperator
    value: Any


class Rule(BaseModel):
    name: str
    code: str
    requirement_code: str
    condition: RuleCondition
    reason: str
    priority: int = 0
    is_active: bool = True