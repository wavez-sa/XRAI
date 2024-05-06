
import base64
from decorators import prisma_session
from helpers.llm_helper import LLMHelper
from helpers.yolo_helper import YoloHelper
from modules.chat.dto.new_message import NewMessage
from prisma import Prisma
from secrets import token_hex
import os

llm_helper = LLMHelper()
yolo_helper = YoloHelper(os.getcwd() + '/data' + '/models' + '/lungs_02.pt')

class ChatService():
    @staticmethod
    @prisma_session
    async def get_chat_by_id(chat_id, prisma: Prisma):
        messages =  await prisma.message.find_many(where={'chat_id': chat_id})

        if len(messages) == 0:
            await prisma.message.create(data={
                'author': 'XRAI',
                'content': """
Welcome to XRAI, your intelligent medical assistant! 🌟

Trained on 10 comprehensive medical books covering various chest-related diseases, including:
* Aortic enlargement
* Atelectasis
* Calcification
* Cardiomegaly
* Consolidation
* Interstitial Lung Disease (ILD)
* Infiltration
* Lung Opacity
* Nodule/Mass
* Other lesion
* Pleural effusion
* Pleural thickening
* Pneumothorax
* Pulmonary fibrosis

I'm here to provide you with accurate information about these chest-related health concerns. This platform is a proof of concept, showcasing the capabilities of AI in medical assistance. For safety, I'll only answer questions related to these diseases. Feel free to ask anything, and I'll assist you! 🚀
""",
                'chat_id': chat_id,
                'type': 'MARKDOWN'
            })
            messages =  await prisma.message.find_many(where={'chat_id': chat_id})

        return messages

    @staticmethod
    @prisma_session
    async def add_new_chat(dto: NewMessage, prisma: Prisma):
        if dto.type == 'TEXT':
            prompt = """
            Prompt: You are a chatbot designed to assist medical professionals. Your purpose is to provide straightforward answers regarding various medical abnormalities. Your input will be named "chat". If you don't know the answer or the question is not related, respond with "Sorry, I cannot answer that question. I am designed to answer only chest related questions."
            Input: {chat}
            Output: Respond with simple and straightforward answers regarding medical abnormalities. If unsure or unrelated, respond with "Sorry, I cannot answer that question. I am designed to answer only chest related questions."
            """

            await prisma.message.create(data={
                'author': dto.author,
                'content': dto.content,
                'chat_id': dto.chat_id,
            })

            response = llm_helper.get_response(prompt.replace('{chat}', dto.content), '')

            await prisma.message.create(data={
                'author': 'XRAI',
                'content': response if response else 'Sorry, I cannot answer that question. I am designed to answer only chest related questions.',
                'chat_id': dto.chat_id,
            })

            return
        else:
            file_name = os.getcwd() + '/uploads/' +  f'{token_hex(16)}.png'
            with open(file_name, 'wb') as file:
                file.write(base64.b64decode(dto.content.split(',')[1]))

            # from file_name remove the path and get the file name
            user_image = file_name.split("/")[-1]

            await prisma.message.create(data={
                'author': dto.author,
                'content': str(user_image),
                'chat_id': dto.chat_id,
                'type': 'IMAGE',
            })


            prediction = yolo_helper.predict(file_name)

            if len(prediction) == 0: # type: ignore
                await prisma.message.create(data={
                    'author': 'XRAI',
                    'content': 'Sorry, I could not detect any chest related diseases in the image. Please try again with the same image with different scan or other image.',
                    'chat_id': dto.chat_id,
                })
                return


            labeled_image = yolo_helper.draw_prediction(file_name, prediction)
            labeled_image = labeled_image.split("/")[-1]


            await prisma.message.create(data={
                'author': 'XRAI',
                'content': str(labeled_image),
                'chat_id': dto.chat_id,
                'type': 'IMAGE',
            })


            prompt = """
            Given a list of tuples where each tuple contains the name of a disease, a confidence score, and a tensor (which might represent location or other attributes), write a function that outputs a brief description of each disease along with its confidence score in a human-readable format. Here's the format for the input list:

[('DiseaseName1', ConfidenceScore1, Tensor1), ('DiseaseName2', ConfidenceScore2, Tensor2)]

For example, for the input:

[('Cardiomegaly', 0.8449130654335022, tensor([187.0546, 349.5830, 504.9803, 494.4095])), ('Aortic enlargement', 0.6012927889823914, tensor([314.6760, 202.5846, 380.8713, 265.2371]))]

The function should return:

"Disease: Cardiomegaly, Confidence: 84.49%. Cardiomegaly, often referred to as an enlarged heart, is a medical condition where the heart is larger than normal. It can be a result of various conditions, including hypertension, heart valve disorders, or cardiomyopathies."

"Disease: Aortic Enlargement, Confidence: 60.13%. Aortic enlargement refers to the condition where the aorta, the large artery that carries blood from the heart to the rest of the body, is larger than normal. This can be due to conditions such as high blood pressure, genetic factors, or atherosclerosis."

Make sure the descriptions are informative and the confidence scores are formatted as percentages rounded to two decimal places and the format is MARKDOWN.

input: {prediction}
"""

            print(prediction)
            response = llm_helper.get_response(prompt.replace('{prediction}', str(prediction)), '')

            os.system('clear')
            await prisma.message.create(data={
                'author': 'XRAI',
                'content': response,
                'chat_id': dto.chat_id,
                'type': 'MARKDOWN',
            })
