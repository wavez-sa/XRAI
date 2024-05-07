from fastapi import Request
from fastapi.staticfiles import StaticFiles
import os



from router import app

app.mount("/downloads", StaticFiles(directory="downloads"), name="images")
app.mount("/uploads", StaticFiles(directory="uploads"), name="images")


@app.get("/", status_code=200)
async def read_root():
    return {'status': 'success', 'message': 'Welcome to XRAI api 👋',}