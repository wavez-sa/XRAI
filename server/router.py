
from fastapi import FastAPI
from modules import chat_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(chat_router, prefix='/chat')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
