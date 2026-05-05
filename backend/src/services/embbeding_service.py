import os
from langchain_openai import OpenAIEmbeddings

def get_embeddings():
    if not os.getenv("OPENAI_API_KEY"):
        raise RuntimeError("OPENAI_API_KEY nao configurada no ambiente.")

    return OpenAIEmbeddings()