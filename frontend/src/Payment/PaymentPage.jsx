import EsewaPayment from "../components/EsewaPayment";
import KhaltiPayment from "../components/KhaltiPayment";

export default function PaymentPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Choose Your Payment Method</h1>
      <EsewaPayment />
      <KhaltiPayment />
    </div>
  );
}
