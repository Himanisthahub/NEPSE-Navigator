from pydantic import BaseModel, EmailStr


class User(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    password: str
    confirmPassword: str
    
    class Config:
        fields = {"confirmPassword": {"exclude": True}}
