from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class BusinessBase(BaseModel):
    name: str = Field(
        ...,
        min_length=2,
        max_length=150,
        examples=["ABC Manufacturing Pvt Ltd"],
    )

    industry: str = Field(
        ...,
        min_length=2,
        max_length=100,
        examples=["Manufacturing"],
    )

    business_size: str = Field(
        ...,
        examples=["Medium"],
    )

    location: str = Field(
        ...,
        min_length=2,
        max_length=150,
        examples=["Demo Region"],
    )

    activity: str = Field(
        ...,
        min_length=2,
        max_length=150,
        examples=["Industrial Unit"],
    )


class BusinessCreate(BusinessBase):
    pass


class BusinessUpdate(BaseModel):
    name: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=150,
    )

    industry: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=100,
    )

    business_size: Optional[str] = None

    location: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=150,
    )

    activity: Optional[str] = Field(
        default=None,
        min_length=2,
        max_length=150,
    )


class BusinessResponse(BusinessBase):
    id: str
    created_at: datetime
    updated_at: datetime