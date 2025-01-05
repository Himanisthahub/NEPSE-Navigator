from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import router as auth_router

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
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include the authentication routes
app.include_router(auth_router)

@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint to confirm that the API is running.
    """
    return {
        "message": "Welcome to the FastAPI Authentication System!",
        "documentation_url": "/docs",
        "authentication_routes": "/auth",
    }
