export default function PriceBreakdown() {
    return (
      <div className="flex flex-col text-sm">
        <div className="flex justify-between mb-2">
          <span>125€ x 6 Nächte</span>
          <span>749€</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-green-600">Special offer</span>
          <span className="text-green-600">-150€</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Cleaning fee</span>
          <span>45€</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>NP service fee</span>
          <span>108€</span>
        </div>
        <hr className="border-gray-300 mb-4" />
      </div>
    );
  }
  