from langchain_text_splitters import RecursiveCharacterTextSplitter
from src.services.embbeding_service import get_embeddings
from src.vectorstore.faiss_store import VectorStore

vector_store = VectorStore()

def ingest_text(text: str):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    chunks = splitter.split_text(text)

    embeddings = get_embeddings()
    vectors = embeddings.embed_documents(chunks)

    vector_store.add(chunks, vectors)