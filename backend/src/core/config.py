from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    APP_NAME: str = "DocMind"
    ENV: str = "dev"
    OPENAI_API_KEY: str = ""
    DATABASE_URL: str = "postgresql+psycopg://postgres:postgres@localhost:5432/docmind"

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
