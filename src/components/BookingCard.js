// components/BookingCard.js
import { useState } from 'react';
import PriceSection from './BookingComp/PriceSection';
import BookingInputs from './BookingComp/BookingInputs';
import ReserveButton from './BookingComp/ReserveButton';
import PriceBreakdown from './BookingComp/PriceBreakdown';

export default function BookingCard({ house, userId }) {
  const [nights, setNights] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  const totalPrice = house ? house.Kosten * nights + 45 + 108 - 150 : 0;


  return (
    <div className="flex flex-col max-w-md mx-auto bg-white rounded-md shadow-md p-6 sticky top-10 border border-gray-200">
      {/* Preisübersicht */}
      <PriceSection price={house ? house.Kosten : 0} />
      
      {/* Eingabefelder */}
      <BookingInputs GästeDB={house ? house.Gästeanzahl : 0} setNights={setNights} setCheckIn={setCheckIn} setCheckOut={setCheckOut} setGuests={setGuests} GästeanzahlDB/>

      {/* Reservierungsbutton */}
      <ReserveButton
        userId={userId}
        houseId={house?.id}
        checkIn={checkIn}
        checkOut={checkOut}
        guests={guests}
        totalPrice={totalPrice}
      />

      {/* Zusatzinformationen */}
      <p className="text-gray-600 text-center my-2 text-xs">Sie werden noch nicht belastet</p>
      <p className="text-gray-600 text-center my-2 text-xs">Der Preis pro Nacht enthält die Mehrwertsteuer und alle anfallenden Gebühren.</p>
      
      {/* Preisaufschlüsselung */}
      <PriceBreakdown price={house ? house.Kosten : 0} nights={nights} />
    </div>
  );
}
