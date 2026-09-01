from app.repositories.business_repository import (
    get_business_by_id,
)

from app.repositories.scheme_repository import (
    create_scheme,
    delete_scheme,
    get_all_schemes,
    get_scheme_by_code,
    get_scheme_by_id,
    update_scheme,
)


async def create_new_scheme(
    scheme_data: dict,
) -> dict:

    existing_scheme = await get_scheme_by_code(
        scheme_data["scheme_code"]
    )

    if existing_scheme:
        return {
            "error": "Scheme code already exists."
        }

    return await create_scheme(
        scheme_data
    )


async def get_schemes() -> list[dict]:

    return await get_all_schemes()


async def get_scheme(
    scheme_id: str,
) -> dict | None:

    return await get_scheme_by_id(
        scheme_id
    )


async def modify_scheme(
    scheme_id: str,
    update_data: dict,
) -> dict | None:

    return await update_scheme(
        scheme_id,
        update_data,
    )


async def remove_scheme(
    scheme_id: str,
) -> bool:

    return await delete_scheme(
        scheme_id
    )


def calculate_scheme_match(
    business: dict,
    scheme: dict,
) -> dict:

    score = 0

    reasons = []

    business_sector = str(
        business.get("sector", "")
    ).lower()

    business_type = str(
        business.get("business_type", "")
    ).lower()

    business_state = str(
        business.get("state", "")
    ).lower()

    investment = business.get(
        "investment_amount",
        0,
    )

    target_sectors = [
        str(item).lower()
        for item in scheme.get(
            "target_sectors",
            [],
        )
    ]

    target_business_types = [
        str(item).lower()
        for item in scheme.get(
            "target_business_types",
            [],
        )
    ]

    states = [
        str(item).lower()
        for item in scheme.get(
            "states",
            [],
        )
    ]

    # Sector matching

    if not target_sectors:

        score += 25

        reasons.append(
            "The scheme is open to multiple sectors."
        )

    elif business_sector in target_sectors:

        score += 35

        reasons.append(
            f"Matches the business sector: "
            f"{business.get('sector')}."
        )

    # Business type matching

    if not target_business_types:

        score += 20

        reasons.append(
            "The scheme is not restricted to a specific business type."
        )

    elif business_type in target_business_types:

        score += 25

        reasons.append(
            f"Matches the business type: "
            f"{business.get('business_type')}."
        )

    # State matching

    if not states:

        score += 20

        reasons.append(
            "The scheme may be applicable across multiple locations."
        )

    elif business_state in states:

        score += 25

        reasons.append(
            f"Matches the business location: "
            f"{business.get('state')}."
        )

    # Investment matching

    minimum_investment = scheme.get(
        "minimum_investment"
    )

    maximum_investment = scheme.get(
        "maximum_investment"
    )

    investment_matches = True

    if minimum_investment is not None:

        if investment < minimum_investment:
            investment_matches = False

    if maximum_investment is not None:

        if investment > maximum_investment:
            investment_matches = False

    if investment_matches:

        score += 20

        reasons.append(
            "The business investment appears to fall within the scheme criteria."
        )

    return {
        "scheme": scheme,
        "match_score": min(score, 100),
        "reasons": reasons,
    }


async def discover_business_schemes(
    business_id: str,
) -> dict | None:

    business = await get_business_by_id(
        business_id
    )

    if not business:
        return None

    schemes = await get_all_schemes()

    matches = []

    for scheme in schemes:

        match = calculate_scheme_match(
            business,
            scheme,
        )

        if match["match_score"] > 0:

            matches.append(match)

    matches.sort(
        key=lambda item: item["match_score"],
        reverse=True,
    )

    return {
        "business_id": business_id,
        "business_name": business.get(
            "name"
        ),
        "matched_schemes": matches,
    }