import os
import sys

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Add the project root directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.routes.auth_routes import router as auth_router

# from backend.routes.chat_routes import router as chat_router

app = FastAPI(
    title="NEPSE-Navigator",
    description="A system for finance",
    version="1.0.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Include authentication and chat routes
app.include_router(auth_router)
# app.include_router(chat_router)  # Ensure AI chat routes are included

@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to the FastAPI Authentication System!",
        "documentation_url": "/docs",
        "authentication_routes": "/auth",
        "chat_routes": "/ask"
    }
