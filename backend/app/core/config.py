from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "Udyog Setu API"
    APP_VERSION: str = "0.1.0"
    API_V1_PREFIX: str = "/api/v1"

    ENVIRONMENT: str = "development"
    DEBUG: bool = True

    MONGODB_URL: str = "MONGODB_URI=mongodb+srv://udyogsetu:UdyogSetu89@cluster0.usdsf3d.mongodb.net/udyogsetu"
    MONGODB_DB_NAME: str = "udyogsetu"

    FRONTEND_ORIGINS: str = "http://localhost:3000,https://udyog-setu-two.vercel.app/"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    @property
    def cors_origins(self) -> list[str]:
        return [
            origin.strip()
            for origin in self.FRONTEND_ORIGINS.split(",")
            if origin.strip()
        ]


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()