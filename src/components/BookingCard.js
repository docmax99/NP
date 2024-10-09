// components/BookingCard.js
import { useState } from 'react';
import PriceSection from './BookingComp/PriceSection';
import BookingInputs from './BookingComp/BookingInputs';
import ReserveButton from './BookingComp/ReserveButton';
import PriceBreakdown from './BookingComp/PriceBreakdown';

export default function BookingCard({ house, userId }) {
  const [nights, setNights] = useState(0);
  const [checkIn, setCheckIn] = useState('2024-10-17');
  const [checkOut, setCheckOut] = useState('2024-10-23');
  const [guests, setGuests] = useState(1);

  const totalPrice = house ? house.Kosten * nights + 45 + 108 - 150 : 0;

  return (
    <div className="flex flex-col max-w-sm mx-auto bg-white rounded-lg shadow-xl p-6 sticky top-10">
      <PriceSection price={house ? house.Kosten : 0} />
      <BookingInputs setNights={setNights} setCheckIn={setCheckIn} setCheckOut={setCheckOut} setGuests={setGuests} />
      <ReserveButton
        userId={userId}
        houseId={house?.id}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        totalPrice={totalPrice}
      />
      <p className="text-gray-600 text-center mb-4 text-sm">Sie werden noch nicht belastet</p>
      <p className="text-gray-600 text-center mb-4 text-sm">Der Preis pro Nacht enthält die Mehrwertsteuer und alle anfallenden Gebühren.</p>
      <PriceBreakdown price={house ? house.Kosten : 0} nights={nights} />
    </div>
  );
}
