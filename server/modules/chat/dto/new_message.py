
from pydantic import BaseModel

class NewMessage(BaseModel):
    chat_id: str
    author: str
    content: str
    type: str