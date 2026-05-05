from fastapi import FastAPI
from src.api.routes import health, ai, upload
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(health.router)
app.include_router(ai.router)
app.include_router(upload.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # depois restringe
    # Com origem curinga, credenciais devem ficar desativadas (regra do CORS).
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)