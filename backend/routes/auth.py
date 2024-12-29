from bson import ObjectId
from fastapi import APIRouter, HTTPException
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

# Pydantic model to handle user data
class User(BaseModel):
    firstName: str
    lastName: str
    email: str
    password: str
    confirmPassword: str

    # The confirmPassword field is not necessary for MongoDB, it will be removed in the request model
    class Config:
        fields = {'confirmPassword': {'exclude': True}}

# Helper function to hash passwords
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

# Function to validate password match
def validate_passwords(password: str, confirmPassword: str) -> bool:
    return password == confirmPassword

# Function to check if user exists by email
async def user_exists(email: str) -> bool:
    user = await collection_name.find_one({"email": email})
    return user is not None

# Register user endpoint
@router.post("/register")
async def register_user(user: User):
    # Validate password match
    if not validate_passwords(user.password, user.confirmPassword):
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    # Check if user exists
    if await user_exists(user.email):
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Hash the password before saving
    hashed_password = hash_password(user.password)
    
    # Prepare the user document
    new_user = {
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "password": hashed_password
    }
    
    # Insert user into MongoDB
    result = await collection_name.insert_one(new_user)
    
    # Return success message
    return {"message": "Account created successfully!", "user_id": str(result.inserted_id)}
