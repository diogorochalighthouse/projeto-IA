from src.core.config import settings
from langchain_openai import ChatOpenAI


def get_settings():
    return settings


def get_llm():
    return ChatOpenAI(
        model="gpt-4o-mini",
        api_key=settings.OPENAI_API_KEY,
    )
