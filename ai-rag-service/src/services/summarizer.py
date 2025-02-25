from langchain_community.chat_models import ChatOpenAI 
from langchain.schema import AIMessage, HumanMessage, SystemMessage
from src.config.settings import OPENAI_API_KEY, MODEL_NAME 

class Summarizer:
    def __init__(self):
        self.llm = ChatOpenAI(model=MODEL_NAME, openai_api_key=OPENAI_API_KEY)

    def generate_summary(self, text: str) -> str:
        messages = [
            SystemMessage(content="You are a helpful AI that summarizes medical notes."),
            HumanMessage(content=f"Summarize this medical note concisely: {text}")
        ]
        # Depending on your version, the invocation method may be `.invoke()` or simply calling the LLM
        response = self.llm.invoke(messages)
        return response.content

summarizer = Summarizer()
