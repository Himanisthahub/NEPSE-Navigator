import { useState } from "react";

export default function EsewaPayment() {
  const [amount, setAmount] = useState("");
  const [productName, setProductName] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const handlePayment = async () => {
    const response = await fetch("http://localhost:8000/api/initiate-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method: "esewa", amount, productName, transactionId }),
    });

    const data = await response.json();
    if (data.esewaConfig) {
      window.location.href = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg">
      <input type="text" className="border p-2 m-2" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <input type="text" className="border p-2 m-2" placeholder="Product Name" onChange={(e) => setProductName(e.target.value)} />
      <input type="text" className="border p-2 m-2" placeholder="Transaction ID" onChange={(e) => setTransactionId(e.target.value)} />
      <button onClick={handlePayment} className="bg-green-500 text-white p-2 rounded">Pay with eSewa</button>
    </div>
  );
}
