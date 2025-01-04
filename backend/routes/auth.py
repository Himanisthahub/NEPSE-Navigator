from datetime import datetime, timedelta
from typing import Optional

import jwt  # PyJWT for token handling
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorClient
from passlib.context import CryptContext
from pydantic import BaseModel

# Initialize the router
router = APIRouter()

# MongoDB connection URI
uri = "mongodb+srv://database:dbpassword@userdata.o9orl.mongodb.net/?retryWrites=true&w=majority&appName=userdata"
client = AsyncIOMotorClient(uri)
db = client.userdata
collection_name = db["users"]

# CryptContext for password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT configuration
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# OAuth2PasswordBearer instance
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


# Pydantic models
class User(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str
    confirmPassword: str

    class Config:
        fields = {"confirmPassword": {"exclude": True}}


class LoginRequest(BaseModel):
    email: str
    password: str


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None
    exp: Optional[int] = None  # Include expiration for debugging


class UserInfo(BaseModel):
    username: str
    exp: int


# Helper functions
def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed_password: str) -> bool:
    return pwd_context.verify(password, hashed_password)


def create_access_token(data: dict) -> str:
    """
    Create a JWT token.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def verify_token(token: str, credentials_exception):
    """
    Decode and verify the JWT token.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        exp: int = payload.get("exp")
        if username is None or exp is None:
            raise credentials_exception
        return TokenData(username=username, exp=exp)
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise credentials_exception


# Routes
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
        raise HTTPException(
            status_code=400,
            detail="User not found. Please check your email or register."
        )

    if not verify_password(request.password, user["password"]):
        raise HTTPException(
            status_code=400,
            detail="Incorrect password. Please try again."
        )

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
