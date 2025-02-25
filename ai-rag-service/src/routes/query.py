from fastapi import APIRouter
from pydantic import BaseModel
from src.services.summarizer import summarizer

router = APIRouter()

# Define a Pydantic model for the request body
class SummarizationRequest(BaseModel):
    text: str

@router.post("/summarize/")
def summarize_text(request: SummarizationRequest):
    summary = summarizer.generate_summary(request.text)
    return {"summary": summary}
