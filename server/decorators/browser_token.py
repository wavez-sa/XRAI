from fastapi import Request
import os

def browser_token(func):
    def wrapper(request: Request):
        token = request.cookies.get(os.getenv('XRAI_TOKEN') or 'xrai-token')
        return func(request, token)
    return wrapper
