import os
from dotenv import load_dotenv

load_dotenv()

# API Keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# VectorDB Storage Path
FAISS_INDEX_PATH = "src/services/faiss_index"

# LLM Model Settings
MODEL_NAME = "gpt-4"
