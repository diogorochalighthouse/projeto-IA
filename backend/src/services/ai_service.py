from langchain_openai import ChatOpenAI

def ask_ai(llm: ChatOpenAI, question: str) -> str:
    response = llm.invoke(question)
    return response.content