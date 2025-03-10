import base64
import json
import logging
import os
import sys

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, RedirectResponse

# Add the project root directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.routes.auth_routes import router as auth_router
from backend.routes.payments import PaymentRequest  # Import payment logic
from backend.routes.payments import initiate_payment

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
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

# Include authentication routes
app.include_router(auth_router)

# Payment endpoint
@app.post("/api/initiate-payment")
async def payment_endpoint(request: PaymentRequest):
    try:
        logger.info(f"Payment request received: {request.dict()}")
        response = await initiate_payment(request)
        logger.info("Payment initiation successful")
        return response
    except Exception as e:
        logger.error(f"Payment initiation error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Payment initiation failed: {str(e)}")

# Handle eSewa success redirect
@app.get("/success")
async def handle_payment_success(request: Request):
    method = request.query_params.get("method")
    data = request.query_params.get("data")

    if not method or not data:
        logger.error("Missing method or data parameter in success redirect")
        raise HTTPException(status_code=400, detail="Missing method or data parameter")

    if method == "esewa":
        try:
            # Decode the base64 data
            decoded_data = base64.b64decode(data).decode("utf-8")
            payment_data = json.loads(decoded_data)
            transaction_status = payment_data.get("status", "Unknown")

            logger.info(f"Payment data decoded: {payment_data}")

            if transaction_status == "COMPLETE":
                # Redirect to frontend success page with query parameters
                return RedirectResponse(
                    url=f"http://localhost:5173/success?method={method}&data={data}"
                )
            else:
                logger.warning(f"Payment not completed, status: {transaction_status}")
                raise HTTPException(status_code=400, detail="Payment not completed")
        except Exception as e:
            logger.error(f"Error processing payment data: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Error processing payment data: {str(e)}")

    logger.error(f"Invalid payment method in success redirect: {method}")
    raise HTTPException(status_code=400, detail="Invalid payment method")

# Handle failure redirect
@app.get("/failure")
async def handle_payment_failure():
    logger.info("Payment failure redirect triggered")
    return RedirectResponse(url="http://localhost:5173/failure")

@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to the FastAPI Authentication System!",
        "documentation_url": "/docs",
        "authentication_routes": "/auth",
        "payment_routes": "/api/initiate-payment"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
