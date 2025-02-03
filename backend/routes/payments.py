import base64
import hashlib
import hmac
import os

import requests
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

load_dotenv()

router = APIRouter()

class PaymentRequest(BaseModel):
    amount: float
    productName: str
    transactionId: str
    method: str

@router.post("/initiate-payment")
def initiate_payment(payment: PaymentRequest):
    """Handles payment initiation for eSewa and Khalti"""

    if payment.method == "esewa":
        return initiate_esewa_payment(payment)
    elif payment.method == "khalti":
        return initiate_khalti_payment(payment)
    else:
        raise HTTPException(status_code=400, detail="Invalid payment method")

def generate_esewa_signature(secret_key: str, message: str) -> str:
    """Generate HMAC-SHA256 signature for eSewa"""
    hash_object = hmac.new(secret_key.encode(), message.encode(), hashlib.sha256)
    return base64.b64encode(hash_object.digest()).decode()

def initiate_esewa_payment(payment: PaymentRequest):
    """Initiate eSewa Payment"""
    esewa_secret_key = os.getenv("ESEWA_SECRET_KEY")
    esewa_merchant_code = os.getenv("ESEWA_MERCHANT_CODE")
    base_url = os.getenv("BASE_URL")

    signature_data = f"total_amount={payment.amount},transaction_uuid={payment.transactionId},product_code={esewa_merchant_code}"
    signature = generate_esewa_signature(esewa_secret_key, signature_data)

    esewa_payload = {
        "amount": payment.amount,
        "tax_amount": 0,
        "total_amount": payment.amount,
        "transaction_uuid": payment.transactionId,
        "product_code": esewa_merchant_code,
        "product_service_charge": 0,
        "product_delivery_charge": 0,
        "success_url": f"{base_url}/success?method=esewa",
        "failure_url": f"{base_url}",
        "signed_field_names": "total_amount,transaction_uuid,product_code",
        "signature": signature
    }

    return {"esewaConfig": esewa_payload}

def initiate_khalti_payment(payment: PaymentRequest):
    """Initiate Khalti Payment"""
    khalti_secret_key = os.getenv("KHALTI_SECRET_KEY")
    base_url = os.getenv("BASE_URL")

    khalti_payload = {
        "return_url": f"{base_url}/success?method=khalti",
        "website_url": base_url,
        "amount": int(payment.amount * 100),
        "purchase_order_id": payment.transactionId,
        "purchase_order_name": payment.productName,
        "customer_info": {
            "name": "User",
            "email": "user@example.com",
            "phone": "9800000000"
        }
    }

    headers = {
        "Authorization": f"Key {khalti_secret_key}",
        "Content-Type": "application/json"
    }

    response = requests.post("https://a.khalti.com/api/v2/epayment/initiate/", json=khalti_payload, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        raise HTTPException(status_code=response.status_code, detail=response.json())
