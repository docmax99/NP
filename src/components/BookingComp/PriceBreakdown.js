// components/PriceBreakdown.js
export default function PriceBreakdown({ price, nights, addOnPrice }) {
  const fullnights = nights;
  const fullPrice = price * fullnights;
  const specialOffer = 0.15;
  const cleaningFee = 45;
  const serviceFee = 108;

  // Berechne den Gesamtpreis mit Add-ons
  const totalPrice = fullPrice - specialOffer + cleaningFee + serviceFee + addOnPrice;

  const euroFormattedFullPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(fullPrice);
  const euroFormattedTotalPrice = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(totalPrice);

  return (
    <div className="flex flex-col text-sm">
      <div className="flex justify-between mb-2">
        <span>{`${price}€`} x {`${fullnights}`} Nächte</span>
        <span>{`${euroFormattedFullPrice}`}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-green-600">Sonderangebot</span>
        <span className="text-green-600">-{specialOffer * fullPrice}€</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Reinigungsgebühr</span>
        <span>{`${cleaningFee}€`}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>NP Servicegebühr</span>
        <span>{`${serviceFee}€`}</span>
      </div>
      <div className="flex justify-between mb-4">
        <span>Zusatzangebote</span>
        <span>{`${addOnPrice}€`}</span>
      </div>
      <hr className="border-gray-300 mb-4" />
      <div className="flex justify-between font-bold text-lg">
        <span>Gesamt</span>
        <span>{`${euroFormattedTotalPrice}`}</span>
      </div>
    </div>
  );
}
