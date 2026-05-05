from fastapi import APIRouter, Depends
from src.schemas.ai_schema import AIRequest
from src.core.dependencies import get_llm
from src.services.rag_service import ask_rag

router = APIRouter(prefix="/ai")

@router.post("/")
def ask(data: AIRequest, llm = Depends(get_llm)):
    response = ask_rag(data.question, llm)
    return {"response": response}