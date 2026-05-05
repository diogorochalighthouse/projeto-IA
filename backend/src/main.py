from fastapi import FastAPI
from src.api.routes import health, ai
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(health.router)
app.include_router(ai.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)