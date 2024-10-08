
export default function PriceBreakdown({ price, nights }) {
  // Berechnungen außerhalb des JSX
  const fullnights = nights;
  const fullPrice = price * fullnights;
  const specialOffer = 150;
  const cleaningFee = 45;
  const serviceFee = 108; // Beispiel für eine Servicegebühr
  const totalPrice = fullPrice - specialOffer + cleaningFee + serviceFee;
  const euroFormattedFullPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(fullPrice);
  const euroFormattedTottalPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalPrice);

  return (
    <div className="flex flex-col text-sm">
      <div className="flex justify-between mb-2">
        <span>{`${price}€`} x {`${fullnights}`} Nächte</span>
        <span>{`${euroFormattedFullPrice}`}</span>
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
        <span>{`${euroFormattedTottalPrice}`}</span>
      </div>
    </div>
  );
}

  