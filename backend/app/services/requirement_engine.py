def get_requirements_for_business(business):

    requirements = []

    industry = business.get("industry", "").lower()
    business_type = business.get("business_type", "").lower()

    # GST Registration

    requirements.append({
        "id": "gst-registration",
        "name": "GST Registration",
        "category": "Registration",
        "description": (
            "GST registration may be required for businesses "
            "meeting applicable turnover and business criteria."
        ),
        "authority": "Goods and Services Tax Network",
        "priority": "High",

        "why_applies": [
            "The business is engaged in commercial activity.",
            "Businesses meeting applicable GST criteria may require registration.",
            "The requirement should be verified according to official GST rules."
        ],

        "documents": [
            {
                "id": "pan",
                "name": "PAN Card",
                "description": "PAN details of the business or applicant.",
                "mandatory": True
            },
            {
                "id": "address-proof",
                "name": "Business Address Proof",
                "description": "Proof of the registered business address.",
                "mandatory": True
            },
            {
                "id": "bank-details",
                "name": "Bank Account Details",
                "description": "Business bank account information.",
                "mandatory": True
            }
        ],

        "application_process": (
            "Review official GST eligibility requirements and "
            "proceed through the official GST registration process."
        )
    })

    # Factory License

    if "manufactur" in industry or business_type == "factory":

        requirements.append({
            "id": "factory-license",
            "name": "Factory License",
            "category": "Industrial Approval",
            "description": (
                "Industrial manufacturing establishments may require "
                "factory-related approvals depending on applicable laws."
            ),
            "authority": "Factory Inspectorate / State Authority",
            "priority": "High",

            "why_applies": [
                "The business profile indicates manufacturing activity.",
                "Industrial establishments may be subject to factory regulations.",
                "Final applicability depends on applicable state and statutory rules."
            ],

            "documents": [
                {
                    "id": "factory-layout",
                    "name": "Factory Layout Plan",
                    "description": "Approved or prepared factory layout documentation.",
                    "mandatory": True
                },
                {
                    "id": "ownership-proof",
                    "name": "Land / Building Ownership Proof",
                    "description": "Ownership or legal occupancy documents.",
                    "mandatory": True
                },
                {
                    "id": "safety-plan",
                    "name": "Safety Documentation",
                    "description": "Relevant workplace and industrial safety documents.",
                    "mandatory": True
                }
            ],

            "application_process": (
                "Review the applicable factory regulations and "
                "submit the required application through the "
                "appropriate official authority."
            )
        })

    # Pollution Control

    if (
        "manufactur" in industry
        or "chemical" in industry
        or "industrial" in industry
    ):

        requirements.append({
            "id": "pollution-consent",
            "name": "Pollution Control Consent",
            "category": "Environmental Compliance",
            "description": (
                "Certain industrial activities may require environmental "
                "consent or authorization from pollution control authorities."
            ),
            "authority": "State Pollution Control Board",
            "priority": "High",

            "why_applies": [
                "The business profile indicates industrial activity.",
                "Certain industrial operations may generate environmental impact.",
                "The applicable consent category must be verified with the relevant authority."
            ],

            "documents": [
                {
                    "id": "industry-details",
                    "name": "Industrial Activity Details",
                    "description": "Details about industrial processes and operations.",
                    "mandatory": True
                },
                {
                    "id": "site-plan",
                    "name": "Site Layout Plan",
                    "description": "Plan showing the industrial site layout.",
                    "mandatory": True
                },
                {
                    "id": "environment-plan",
                    "name": "Environmental Management Details",
                    "description": "Information about waste and environmental management.",
                    "mandatory": True
                }
            ],

            "application_process": (
                "Review the applicable pollution control category and "
                "follow the official consent application process."
            )
        })

    return requirements