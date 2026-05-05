from fastapi import APIRouter
from src.schemas.ai_schema import AIRequest
from src.services.ai_service import ask_ai

router = APIRouter(prefix="/ai")

@router.post("")
def ask(data: AIRequest):
    return {"response": ask_ai(data.question)}