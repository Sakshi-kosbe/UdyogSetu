from fastapi import APIRouter, HTTPException

from app.repositories.rule_repository import (
    get_active_rules,
    get_rule_by_code,
    get_rules_by_requirement,
)


router = APIRouter(
    prefix="/rules",
    tags=["Rules"],
)


@router.get("/")
async def get_rules():
    rules = await get_active_rules()
    return rules


@router.get("/requirement/{requirement_code}")
async def get_requirement_rules(requirement_code: str):
    rules = await get_rules_by_requirement(requirement_code)
    return rules


@router.get("/{rule_code}")
async def get_rule(rule_code: str):
    rule = await get_rule_by_code(rule_code)

    if rule is None:
        raise HTTPException(
            status_code=404,
            detail="Rule not found",
        )

    return rule