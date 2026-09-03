from app.repositories.requirement_repository import (
    get_requirement_by_code,
)

from app.repositories.rule_repository import (
    get_active_rules,
)

from app.services.rule_engine import (
    evaluate_rules,
)


async def get_applicable_rules(
    business: dict,
) -> list[dict]:

    rules = await get_active_rules()

    return evaluate_rules(
        rules,
        business,
    )


async def get_applicable_requirements(
    business: dict,
) -> list[dict]:

    rules = await get_applicable_rules(
        business
    )

    requirements = []

    added_requirement_codes = set()

    for rule in rules:

        requirement_code = rule.get(
            "requirement_code"
        )

        if not requirement_code:
            continue

        if requirement_code in added_requirement_codes:
            continue

        requirement = await get_requirement_by_code(
            requirement_code
        )

        if not requirement:
            continue

        requirement = dict(requirement)

        requirement["applicability_reason"] = (
            rule.get(
                "reason",
                "Requirement matched based on the provided business information.",
            )
        )

        requirements.append(requirement)

        added_requirement_codes.add(
            requirement_code
        )

    return requirements