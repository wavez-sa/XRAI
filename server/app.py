from fastapi import Request
from fastapi.staticfiles import StaticFiles
import os



from router import app

app.mount("/downloads", StaticFiles(directory="downloads"), name="images")
app.mount("/uploads", StaticFiles(directory="uploads"), name="images")


@app.get("/", status_code=201)
async def read_root(request: Request):
    token = request.cookies.get(os.getenv('XRAI_TOKEN') or 'xrai_token')
    print(token)
    return {'status': 'success', 'message': 'Hello World', 'token': token}