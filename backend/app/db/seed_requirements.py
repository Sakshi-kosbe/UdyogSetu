from app.db.mongodb import get_database


REQUIREMENTS = [
    {
        "name": "Factory Registration",
        "code": "FACTORY_REGISTRATION",
        "category": "Registration",
        "description": (
            "Registration and licensing requirement for eligible "
            "industrial establishments operating as factories."
        ),
        "authority": "State Factory Inspectorate",
        "department": "Labour Department",
        "jurisdiction": "State",
        "applicability_summary": (
            "May apply to manufacturing units that meet applicable "
            "worker, power, premises, or production thresholds."
        ),
        "required_documents": [
            "Business Registration Certificate",
            "PAN Card",
            "Site Plan",
            "Building Plan",
            "Occupier Details",
        ],
        "official_source_url": None,
        "validity_period": "As prescribed by the applicable state rules",
        "is_active": True,
    },
    {
        "name": "GST Registration",
        "code": "GST_REGISTRATION",
        "category": "Tax",
        "description": (
            "Goods and Services Tax registration for businesses "
            "that are liable to register under applicable GST provisions."
        ),
        "authority": "Goods and Services Tax Department",
        "department": "Tax Department",
        "jurisdiction": "Central / State",
        "applicability_summary": (
            "Applicability depends on turnover, business activity, "
            "supply type, and other statutory conditions."
        ),
        "required_documents": [
            "PAN Card",
            "Business Constitution Proof",
            "Business Address Proof",
            "Bank Account Details",
            "Authorised Signatory Details",
        ],
        "official_source_url": None,
        "validity_period": "Generally ongoing while registration remains valid",
        "is_active": True,
    },
    {
        "name": "Pollution Control Consent",
        "code": "POLLUTION_CONTROL_CONSENT",
        "category": "Environment",
        "description": (
            "Environmental consent requirement applicable to "
            "eligible industrial activities based on pollution potential."
        ),
        "authority": "State Pollution Control Board",
        "department": "Environment Department",
        "jurisdiction": "State",
        "applicability_summary": (
            "Applicability depends on the industrial activity, "
            "pollution category, scale, and applicable environmental rules."
        ),
        "required_documents": [
            "Project Report",
            "Site Plan",
            "Process Description",
            "Water Consumption Details",
            "Waste Management Details",
        ],
        "official_source_url": None,
        "validity_period": "As prescribed by the applicable consent order",
        "is_active": True,
    },
    {
        "name": "Fire Safety Clearance",
        "code": "FIRE_SAFETY_CLEARANCE",
        "category": "Safety",
        "description": (
            "Fire and life-safety compliance requirement for "
            "eligible industrial premises."
        ),
        "authority": "State Fire Services",
        "department": "Fire and Emergency Services",
        "jurisdiction": "State / Local",
        "applicability_summary": (
            "Applicability may depend on building use, occupancy, "
            "height, area, storage, and fire-risk characteristics."
        ),
        "required_documents": [
            "Building Plan",
            "Fire Safety Plan",
            "Site Plan",
            "Occupancy Details",
        ],
        "official_source_url": None,
        "validity_period": "As prescribed by the relevant authority",
        "is_active": True,
    },
    {
        "name": "Labour Establishment Registration",
        "code": "LABOUR_ESTABLISHMENT_REGISTRATION",
        "category": "Labour",
        "description": (
            "Registration requirement for eligible establishments "
            "under applicable labour and establishment regulations."
        ),
        "authority": "Labour Department",
        "department": "Labour Department",
        "jurisdiction": "State",
        "applicability_summary": (
            "Applicability depends on establishment type, "
            "employment characteristics, and applicable state legislation."
        ),
        "required_documents": [
            "Business Registration Proof",
            "Address Proof",
            "Employer Details",
            "Employee Details",
        ],
        "official_source_url": None,
        "validity_period": "As prescribed by applicable legislation",
        "is_active": True,
    },
    {
        "name": "Professional Tax Registration",
        "code": "PROFESSIONAL_TAX_REGISTRATION",
        "category": "Tax",
        "description": (
            "Professional tax registration where applicable "
            "under the relevant state tax framework."
        ),
        "authority": "State Tax Department",
        "department": "State Tax Department",
        "jurisdiction": "State",
        "applicability_summary": (
            "Applicability depends on the state, employer status, "
            "employee characteristics, and applicable thresholds."
        ),
        "required_documents": [
            "PAN Card",
            "Business Registration Proof",
            "Employer Details",
            "Employee Details",
        ],
        "official_source_url": None,
        "validity_period": "As prescribed by the state",
        "is_active": True,
    },
]
    

async def seed_requirements():
    db = get_database()

    collection = db["requirements"]

    for requirement in REQUIREMENTS:
        existing = await collection.find_one(
            {"code": requirement["code"]}
        )

        if existing:
            continue

        await collection.insert_one(requirement)

    print(
        f"Regulatory knowledge base seeded: "
        f"{len(REQUIREMENTS)} records checked."
    )