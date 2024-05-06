from langchain_openai import OpenAI
from dotenv import load_dotenv
import os

class LLMHelper:
    def __init__(self):
        self.llm = OpenAI(temperature=0, api_key='sk-proj-9lKyZJIXQ5gS2eaGDNU6T3BlbkFJimcK4MjAca3DS9zLSZ1a') # type: ignore
    def get_response(self, chat, prompt):
        return self.llm.invoke(chat)

