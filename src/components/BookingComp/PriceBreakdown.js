export default function PriceBreakdown({ price }) {
  // Berechnungen außerhalb des JSX
  const fullPrice = price * 6;
  const specialOffer = 150;
  const cleaningFee = 45;
  const serviceFee = 108; // Beispiel für eine Servicegebühr
  const totalPrice = fullPrice - specialOffer + cleaningFee + serviceFee;

  return (
    <div className="flex flex-col text-sm">
      <div className="flex justify-between mb-2">
        <span>{`${price}€`} x 6 Nächte</span>
        <span>{`${fullPrice}€`}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-green-600">Special offer</span>
        <span className="text-green-600">-{specialOffer}€</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Cleaning fee</span>
        <span>{`${cleaningFee}€`}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>NP service fee</span>
        <span>{`${serviceFee}€`}</span>
      </div>
      <hr className="border-gray-300 mb-4" />
      <div className="flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>{`${totalPrice}€`}</span>
      </div>
    </div>
  );
}

  