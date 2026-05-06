from typing import Protocol


class TextExtractorPort(Protocol):
    def extract(self, file_bytes: bytes) -> str: ...


class EmbeddingsPort(Protocol):
    def embed_documents(self, chunks: list[str]) -> list[list[float]]: ...

    def embed_query(self, query: str) -> list[float]: ...


class VectorStorePort(Protocol):
    def add(self, texts: list[str], embeddings: list[list[float]]) -> None: ...

    def search(self, query_embedding: list[float], k: int = 3) -> list[str]: ...


class LLMPort(Protocol):
    def invoke(self, prompt: str): ...
