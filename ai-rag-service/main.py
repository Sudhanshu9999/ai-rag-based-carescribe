from fastapi import FastAPI
from src.routes.query import router as query_router

app = FastAPI()

app.include_router(query_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "AI Summarization Service is Running!"}
