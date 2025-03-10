import os
import uuid

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordBearer
from motor.motor_asyncio import AsyncIOMotorClient

from ..configurations.config import settings
from ..services.auth_services import hash_password, verify_token

router = APIRouter()

client = AsyncIOMotorClient(settings.MONGODB_URI)
db = client.userdata
collection_name = db["users"]

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

IMAGEDIR = "profile_pictures/"
os.makedirs(IMAGEDIR, exist_ok=True)  # Ensure the directory exists


@router.put("/profile/update")
async def update_profile(
    firstName: str = None,
    lastName: str = None,
    email: str = None,
    password: str = None,
    profile_image: UploadFile = File(None),
    token: str = Depends(oauth2_scheme),
):
    """Update user profile information, including profile image and password."""
    credentials_exception = HTTPException(
        status_code=401, detail="Invalid credentials"
    )
    
    token_data = verify_token(token, credentials_exception)
    user_email = token_data.username

    user = await collection_name.find_one({"email": user_email})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = {}

    if firstName:
        update_data["firstName"] = firstName
    if lastName:
        update_data["lastName"] = lastName
    if email and email != user_email:
        existing_user = await collection_name.find_one({"email": email})
        if existing_user:
            raise HTTPException(status_code=400, detail="Email already in use")
        update_data["email"] = email
    if password:
        update_data["password"] = hash_password(password)

    if profile_image:
        # Generate a unique filename and save the image
        filename = f"{uuid.uuid4()}.jpg"
        filepath = os.path.join(IMAGEDIR, filename)
        
        with open(filepath, "wb") as f:
            f.write(await profile_image.read())

        # Remove old profile image (if not default)
        old_image_path = user.get("profile_image")
        if old_image_path and old_image_path != f"{IMAGEDIR}default.jpg":
            try:
                os.remove(old_image_path)
            except FileNotFoundError:
                pass  # Ignore if file not found

        update_data["profile_image"] = filepath  # Update image path

    await collection_name.update_one({"email": user_email}, {"$set": update_data})

    return {"message": "Profile updated successfully", "profile_image": update_data.get("profile_image", user.get("profile_image"))}


@router.get("/profile/get")
async def get_profile(token: str = Depends(oauth2_scheme)):
    """Fetch the user's profile data, including profile image."""
    credentials_exception = HTTPException(status_code=401, detail="Invalid credentials")
    token_data = verify_token(token, credentials_exception)
    
    user = await collection_name.find_one({"email": token_data.username}, {"_id": 0, "password": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user  # Now includes "profile_image"
