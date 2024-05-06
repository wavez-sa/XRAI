from dotenv import load_dotenv
import uvicorn
import os

if __name__ == "__main__":
    load_dotenv()
    if not os.path.exists('uploads'): os.makedirs('uploads')
    if not os.path.exists('downloads'): os.makedirs('downloads')
    uvicorn.run('app:app', host="0.0.0.0", port=int(os.getenv('PORT')), reload= True if os.getenv('PYTHON_ENV') == 'development' else False, ) # type: ignore
