export default function KhaltiPayment() {
    const handlePayment = async () => {
      const response = await fetch("http://localhost:8000/api/initiate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: "khalti", amount: 100, productName: "Test", transactionId: "12345" }),
      });
  
      const data = await response.json();
      if (data.payment_url) {
        window.location.href = data.payment_url;
      }
    };
  
    return <button onClick={handlePayment} className="bg-purple-500 text-white p-2 rounded">Pay with Khalti</button>;
  }
  