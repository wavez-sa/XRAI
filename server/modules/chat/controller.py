
import base64
from fastapi import APIRouter, Request, HTTPException
import os
import asyncio

from modules.chat.dto.new_message import NewMessage
from modules.chat.service import ChatService

router = APIRouter()

messages = [
    {
        'id': 1,
        'message': 'Hello World',
        'from': 'John Doe',
    }
]

@router.get('/')
async def get_messages(request: Request):
    token = request.cookies.get(os.getenv('XRAI_TOKEN') or 'xrai_token')
    if not token:
        raise HTTPException(status_code=401, detail='Unauthorized')

    return await ChatService.get_chat_by_id(token) # type: ignore





@router.post('/')
async def create_image(request: Request):
    token = request.cookies.get(os.getenv('XRAI_TOKEN') or 'xrai_token')
    if not token:
        raise HTTPException(status_code=401, detail='Unauthorized')


    body = await request.json()
    os.system('clear')
    type = 'TEXT'

    if body.get('image'):
        type = 'IMAGE'

    dto = NewMessage(
        chat_id=token,
        author=token or '',
        content= body.get('image') if type == 'IMAGE' else body.get('message'),
        type=type,
    )


    await ChatService.add_new_chat(dto) # type: ignore

    # wait for 5 seconds
    # await asyncio.sleep(5)

    return {
        'message': 'Image created successfully',
    }
