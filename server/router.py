
from fastapi import FastAPI
from modules import chat_router

app = FastAPI()
app.include_router(chat_router, prefix='/chat')
