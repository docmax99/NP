// components/BookingCard.js
import { useState } from 'react';
import PriceSection from '@BookingComp/PriceSection';
import BookingInputs from '@BookingComp/BookingInputs';
import ReserveButton from '@BookingComp/ReserveButton';
import PriceBreakdown from '@BookingComp/PriceBreakdown';

export default function BookingCard({ house, userId, Ankunft, Abgang, GästeZahl, addOnPrice }) {
  // Initialisiere State-Werte
  const [nights, setNights] = useState(0); // Anzahl der Nächte
  const [checkIn, setCheckIn] = useState(''); // Check-In Datum
  const [checkOut, setCheckOut] = useState(''); // Check-Out Datum
  const [guests, setGuests] = useState(1); // Anzahl der Gäste
  const [internalAddOnPrice, setInternalAddOnPrice] = useState(0); // Interner Zusatzpreis

  // Fallback, falls `house` nicht vorhanden ist
  const houseData = house || {}; // Vermeidet wiederholte `house ? ...` Abfragen

  // Berechnung des Gesamtpreises basierend auf Nächten und Hauskosten
  const totalPrice = houseData.Kosten ? houseData.Kosten * nights + 45 + 108 - 150 + addOnPrice : 0;

  return (
    <div className="flex flex-col max-w-md mx-auto bg-white rounded-md shadow-md p-6 top-10 border border-gray-200">
      {/* Preisübersicht */}
      <PriceSection price={houseData.Kosten || 0} />

      {/* Eingabefelder für Check-In, Check-Out und Gäste */}
      <BookingInputs
        GästeDB={houseData.Gästeanzahl || 1} // Fallback auf 1 Gast, falls `house.Gästeanzahl` nicht vorhanden ist
        setNights={setNights} // Setzt die Anzahl der Nächte
        setCheckIn={setCheckIn} // Setzt das Check-In Datum
        setCheckOut={setCheckOut} // Setzt das Check-Out Datum
        setGuests={setGuests} // Setzt die Anzahl der Gäste
      />

      {/* Reservierungsbutton */}
      <ReserveButton
        userId={userId} // Benutzer-ID
        houseId={houseData.id || ''} // Haus-ID, fallback auf leere Zeichenkette falls nicht vorhanden
        checkIn={checkIn} // Übergebe Check-In-Wert (sollte vorher validiert sein)
        checkOut={checkOut} // Übergebe Check-Out-Wert (sollte vorher validiert sein)
        guests={guests} // Gästeanzahl
        totalPrice={totalPrice} // Berechneter Gesamtpreis
      />

      {/* Zusatzinformationen */}
      <p className="text-gray-600 text-center my-2 text-xs">Sie werden noch nicht belastet</p>
      <p className="text-gray-600 text-center my-2 text-xs">Der Preis pro Nacht enthält die Mehrwertsteuer und alle anfallenden Gebühren.</p>

      {/* Preisaufschlüsselung */}
      <PriceBreakdown price={houseData.Kosten || 0} nights={nights} addOnPrice={addOnPrice} />

      {/* Zusatzangebote */}
    </div>
  );
}
