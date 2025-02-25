import faiss
import numpy as np
import os
from langchain_community.embeddings import OpenAIEmbeddings
from src.config.settings import FAISS_INDEX_PATH, OPENAI_API_KEY

class VectorDB:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
        self.index = self.load_or_create_index()

    def load_or_create_index(self):
        if os.path.exists(FAISS_INDEX_PATH):
            return faiss.read_index(FAISS_INDEX_PATH)
        else:
            return faiss.IndexFlatL2(1536)

    def add_texts(self, texts):
        vectors = np.array([self.embeddings.embed_query(text) for text in texts])
        self.index.add(vectors)
        faiss.write_index(self.index, FAISS_INDEX_PATH)

    def query(self, text, top_k=3):
        query_vector = np.array([self.embeddings.embed_query(text)])
        distances, indices = self.index.search(query_vector, top_k)
        return indices.tolist()

vector_db = VectorDB()
