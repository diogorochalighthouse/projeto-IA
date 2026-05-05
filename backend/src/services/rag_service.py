from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from src.services.ingestion_service import vector_store

def ask_rag(question: str, llm: ChatOpenAI):
    embeddings = OpenAIEmbeddings()

    query_embedding = embeddings.embed_query(question)

    context_chunks = vector_store.search(query_embedding)

    context = "\n\n".join(context_chunks)

    prompt = f"""
    Responda com base no contexto abaixo:

    {context}

    Pergunta: {question}
    """

    response = llm.invoke(prompt)

    return response.content