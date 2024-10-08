import PriceSection from './BookingComp/PriceSection';
import BookingInputs from './BookingComp/BookingInputs';
import ReserveButton from './BookingComp/ReserveButton';
import PriceBreakdown from './BookingComp/PriceBreakdown';
import { useState } from 'react';


export default function BookingCard({house}) {
  const [nights, setNights] = useState(0);
  
  
  
  return (
    <div className="flex flex-col max-w-sm mx-auto bg-white rounded-lg shadow-xl p-6 sticky top-10">
      <PriceSection price={house? house.Kosten : 0} nights={nights}/>
      <BookingInputs setNights={setNights} />
      <ReserveButton />
      <p className="text-gray-600 text-center mb-4 text-sm">Sie werden noch nicht belastet</p>
      <p className="text-gray-600 text-center mb-4 text-sm">Der Preis pro Nacht enthält die Mehrwertsteuer und alle anfallenden Gebühren.</p>
      <PriceBreakdown price={house? house.Kosten : 0} nights={nights} />
    
    </div>
  );
}
