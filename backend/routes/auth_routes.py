from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorClient

from ..configurations.config import settings
from ..models.token_model import LoginRequest, Token, UserInfo
from ..models.user_model import User
from ..services.auth_services import (create_access_token, hash_password,
                                      verify_password, verify_token)

# Initialize router
router = APIRouter()

# Database client
client = AsyncIOMotorClient(settings.MONGODB_URI)
db = client.userdata
collection_name = db["users"]

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

@router.post("/register")
async def register_user(user: User):
    if user.password != user.confirmPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    user_db = await collection_name.find_one({"email": user.email})
    if user_db:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = hash_password(user.password)
    new_user = {
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "password": hashed_password,
    }

    result = await collection_name.insert_one(new_user)
    return {"message": "Account created successfully!", "user_id": str(result.inserted_id)}

@router.post("/auth/login", response_model=Token)
async def login(request: LoginRequest):
    user = await collection_name.find_one({"email": request.email})
    if not user:
        raise HTTPException(status_code=400, detail="User not found.")
    if not verify_password(request.password, user["password"]):
        raise HTTPException(status_code=400, detail="Incorrect password.")
    
    access_token = create_access_token(data={"sub": user["email"]})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/protected", response_model=UserInfo)
async def protected_route(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    token_data = verify_token(token, credentials_exception)
    return {"username": token_data.username, "exp": token_data.exp}

