from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..models.model import PredictionPipeline  # Import the AI model

router = APIRouter()

# Load the AI Model
pipeline = PredictionPipeline()
pipeline.load_model_and_tokenizers()
pipeline.load_sentence_transformer()
pipeline.load_reranking_model()
pipeline.load_embeddings()

# Define request schema
class QueryRequest(BaseModel):
    question: str

# Define API endpoint to process user query
@router.post("/ask")
async def ask_question(request: QueryRequest):
    try:
        response_generator = pipeline.make_predictions(request.question)

        full_response = ""
        for chunk in response_generator:
            full_response += chunk.replace("data: ", "").strip()

        return {"response": full_response}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
