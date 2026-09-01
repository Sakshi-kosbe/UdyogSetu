from fastapi import APIRouter, HTTPException

from app.schemas.scheme import (
    SchemeCreate,
    SchemeResponse,
    SchemeUpdate,
)

from app.services.scheme_service import (
    create_new_scheme,
    discover_business_schemes,
    get_scheme,
    get_schemes,
    modify_scheme,
    remove_scheme,
)


router = APIRouter(
    prefix="/api/v1/schemes",
    tags=["Government Schemes"],
)


@router.get(
    "/",
    response_model=list[SchemeResponse],
)
async def get_all_schemes():

    return await get_schemes()


@router.post(
    "/",
    response_model=SchemeResponse,
    status_code=201,
)
async def create_scheme(
    scheme: SchemeCreate,
):

    result = await create_new_scheme(
        scheme.model_dump()
    )

    if result.get("error"):

        raise HTTPException(
            status_code=400,
            detail=result["error"],
        )

    return result


# IMPORTANT:
# This route must come BEFORE "/{scheme_id}"


@router.post(
    "/recommend",
)
async def recommend_schemes(
    business_data: dict,
):

    business_id = business_data.get(
        "business_id"
    )

    if not business_id:

        raise HTTPException(
            status_code=422,
            detail="business_id is required.",
        )

    result = await discover_business_schemes(
        business_id
    )

    if not result:

        raise HTTPException(
            status_code=404,
            detail="Business not found.",
        )

    return result


@router.get(
    "/{scheme_id}",
    response_model=SchemeResponse,
)
async def get_scheme_by_id(
    scheme_id: str,
):

    scheme = await get_scheme(
        scheme_id
    )

    if not scheme:

        raise HTTPException(
            status_code=404,
            detail="Scheme not found.",
        )

    return scheme


@router.patch(
    "/{scheme_id}",
    response_model=SchemeResponse,
)
async def update_scheme(
    scheme_id: str,
    scheme: SchemeUpdate,
):

    update_data = scheme.model_dump(
        exclude_unset=True
    )

    updated_scheme = await modify_scheme(
        scheme_id,
        update_data,
    )

    if not updated_scheme:

        raise HTTPException(
            status_code=404,
            detail="Scheme not found.",
        )

    return updated_scheme


@router.delete(
    "/{scheme_id}",
)
async def delete_scheme(
    scheme_id: str,
):

    deleted = await remove_scheme(
        scheme_id
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Scheme not found.",
        )

    return {
        "message": "Scheme deleted successfully."
    }