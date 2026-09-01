from app.db.mongodb import get_database


RULES = [
    {
        "name": "Manufacturing Factory Registration Rule",
        "code": "RULE_MANUFACTURING_FACTORY",
        "requirement_code": "FACTORY_REGISTRATION",
        "condition": {
            "field": "industry",
            "operator": "equals",
            "value": "Manufacturing",
        },
        "reason": (
            "Factory registration may apply to manufacturing units "
            "that meet applicable worker, power, premises, or production thresholds."
        ),
        "priority": 10,
        "is_active": True,
    },
    {
        "name": "GST Registration Rule",
        "code": "RULE_GST_REGISTRATION",
        "requirement_code": "GST_REGISTRATION",
        "condition": {
            "field": "business_activity",
            "operator": "contains",
            "value": "supply",
        },
        "reason": (
            "GST registration may apply to businesses engaged in taxable "
            "supplies when applicable statutory conditions are met."
        ),
        "priority": 20,
        "is_active": True,
    },
    {
        "name": "Pollution Control Rule",
        "code": "RULE_POLLUTION_CONTROL",
        "requirement_code": "POLLUTION_CONTROL_CONSENT",
        "condition": {
            "field": "industry",
            "operator": "in",
            "value": [
                "Manufacturing",
                "Chemical",
                "Pharmaceutical",
            ],
        },
        "reason": (
            "Environmental consent may apply to industrial activities "
            "based on pollution potential, scale, and applicable rules."
        ),
        "priority": 30,
        "is_active": True,
    },
    {
        "name": "Fire Safety Rule",
        "code": "RULE_FIRE_SAFETY",
        "requirement_code": "FIRE_SAFETY_CLEARANCE",
        "condition": {
            "field": "business_type",
            "operator": "in",
            "value": [
                "Factory",
                "Industrial Unit",
                "Warehouse",
            ],
        },
        "reason": (
            "Fire and life-safety clearance may apply to industrial "
            "premises depending on occupancy and fire-risk characteristics."
        ),
        "priority": 40,
        "is_active": True,
    },
    {
        "name": "Labour Establishment Registration Rule",
        "code": "RULE_LABOUR_ESTABLISHMENT",
        "requirement_code": "LABOUR_ESTABLISHMENT_REGISTRATION",
        "condition": {
            "field": "business_size",
            "operator": "in",
            "value": [
                "Small",
                "Medium",
                "Large",
            ],
        },
        "reason": (
            "Eligible establishments may require registration under "
            "applicable labour and establishment regulations."
        ),
        "priority": 50,
        "is_active": True,
    },
    {
        "name": "Professional Tax Rule",
        "code": "RULE_PROFESSIONAL_TAX",
        "requirement_code": "PROFESSIONAL_TAX_REGISTRATION",
        "condition": {
            "field": "has_employees",
            "operator": "equals",
            "value": True,
        },
        "reason": (
            "Professional tax registration may apply where the business "
            "has employees and the relevant state framework requires it."
        ),
        "priority": 60,
        "is_active": True,
    },
]


async def seed_rules():
    db = get_database()

    collection = db["rules"]

    for rule in RULES:
        existing = await collection.find_one(
            {"code": rule["code"]}
        )

        if existing:
            continue

        await collection.insert_one(rule)

    print(
        f"Regulatory rules seeded: "
        f"{len(RULES)} records checked."
    )