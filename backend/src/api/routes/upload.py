from fastapi import APIRouter, UploadFile, File, HTTPException
from src.services.pdf_service import extract_text_from_pdf
from src.services.ingestion_service import ingest_text

router = APIRouter(prefix="/upload")

@router.post("/")
async def upload(file: UploadFile = File(...)):
    content = await file.read()
    try:
        text = extract_text_from_pdf(content)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    try:
        ingest_text(text)
    except RuntimeError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    return {"status": "document indexed"}