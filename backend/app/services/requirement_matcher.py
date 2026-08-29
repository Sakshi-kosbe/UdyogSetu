from app.db.mongodb import mongodb


async def discover_requirements_for_business(business: dict):
    """
    Rule-based requirement discovery for the SIH prototype.

    This does not make statutory decisions.
    It only identifies potentially applicable requirements.
    """

    collection = mongodb.database["requirements"]

    requirements = await collection.find(
        {"is_active": True}
    ).to_list(length=100)

    matches = []

    industry = str(
        business.get("industry", "")
    ).lower()

    size = str(
        business.get("business_size", "")
    ).lower()

    activity = str(
        business.get("activity", "")
    ).lower()

    for requirement in requirements:

        score = 0
        reasons = []

        industries = [
            value.lower()
            for value in requirement.get("industries", [])
        ]

        if industries and industry in industries:
            score += 2
            reasons.append(
                f"Industry matches ({business['industry']})."
            )

        sizes = [
            value.lower()
            for value in requirement.get("business_sizes", [])
        ]

        if sizes and size in sizes:
            score += 1
            reasons.append(
                f"Business size matches ({business['business_size']})."
            )

        activities = [
            value.lower()
            for value in requirement.get("activities", [])
        ]

        if activities and activity in activities:
            score += 2
            reasons.append(
                f"Business activity matches ({business['activity']})."
            )

        # Prototype fallback using existing regulatory summaries
        if score == 0:
            summary = str(
                requirement.get("applicability_summary", "")
            ).lower()

            if industry and industry in summary:
                score += 1
                reasons.append(
                    "Matched applicability summary."
                )

        if score > 0:
            matches.append(
                {
                    "id": str(requirement["_id"]),
                    "name": requirement["name"],
                    "code": requirement["code"],
                    "category": requirement["category"],
                    "authority": requirement["authority"],
                    "description": requirement["description"],
                    "required_documents": requirement.get(
                        "required_documents",
                        [],
                    ),
                    "applicability_summary": requirement.get(
                        "applicability_summary"
                    ),
                    "match_score": score,
                    "why_it_applies": reasons,
                }
            )

    matches.sort(
        key=lambda item: item["match_score"],
        reverse=True,
    )

    return matches