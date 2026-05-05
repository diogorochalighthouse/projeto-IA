import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI

load_dotenv()

def ask_ai(question: str):
    llm = ChatOpenAI(
        model="gpt-4o-mini",
        api_key=os.getenv("OPENAI_API_KEY")
    )

    response = llm.invoke(question)
    return response.content