import httpx
from fastapi import APIRouter, HTTPException

router = APIRouter()

# Khalti Payment Verification Route
@router.post("/verify")
async def verify_khalti_payment(payment_id: str, amount: int):
    """
    Verifies a Khalti payment by calling Khalti's verification API.

    Args:
        payment_id (str): The payment ID received from the client.
        amount (int): The amount paid in paisa (e.g., 1000 paisa = 10 NPR).

    Returns:
        dict: Success message or error message.
    """
    khalti_verify_url = "https://khalti.com/api/v2/payment/verify/"
    headers = {
        "Authorization": "Key your_secret_key",  
    }
    payload = {
        "token": payment_id,
        "amount": amount,
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(khalti_verify_url, headers=headers, data=payload)

        if response.status_code == 200:
            data = response.json()
            return {"message": "Payment verified successfully", "data": data}
        else:
            raise HTTPException(
                status_code=response.status_code,
                detail="Payment verification failed: " + response.text,
            )
