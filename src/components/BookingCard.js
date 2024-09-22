import PriceSection from './BookingComp/PriceSection';
import BookingInputs from './BookingComp/BookingInputs';
import ReserveButton from './BookingComp/ReserveButton';
import PriceBreakdown from './BookingComp/PriceBreakdown';
import TotalSection from './BookingComp/TotalSection';

export default function BookingCard() {
  return (
    <div className="flex flex-col max-w-sm mx-auto bg-white rounded-lg shadow-xl p-6">
      <PriceSection />
      <BookingInputs />
      <ReserveButton />
      <p className="text-gray-600 text-center mb-4 text-sm">Sie werden noch nicht belastet</p>
      <p className="text-gray-600 text-center mb-4 text-sm">Der Preis pro Nacht enthält die Mehrwertsteuer und alle anfallenden Gebühren.</p>
      <PriceBreakdown />
      <TotalSection />
    </div>
  );
}
