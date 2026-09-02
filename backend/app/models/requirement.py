from pydantic import BaseModel
from typing import List, Optional


class Requirement(BaseModel):
    id: str
    name: str
    category: str
    description: str
    authority: str
    priority: str
    status: str = "pending"

    why_applies: List[str] = []

    documents: List[dict] = []

    application_process: Optional[str] = None