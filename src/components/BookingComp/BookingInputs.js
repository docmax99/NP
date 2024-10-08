import { useState, useEffect } from 'react';


export default function BookingInputs({setNights}) {
  // State-Variablen für Check-In, Check-Out und Gäste
  const [checkIn, setCheckIn] = useState('2024-10-17'); // Standardwert im Format YYYY-MM-DD
  const [checkOut, setCheckOut] = useState('2024-10-23'); // Standardwert im Format YYYY-MM-DD
  const [guests, setGuests] = useState(1);
  
   // Anzahl der Nächte

  // Funktion zur Berechnung der Nächte basierend auf Check-In und Check-Out
  const calculateNights = (checkInDate, checkOutDate) => {
    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    // Berechne die Differenz in Millisekunden und konvertiere in Tage
    const timeDifference = outDate.getTime() - inDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24); // 1 Tag = 1000ms * 3600s * 24h
    return daysDifference;
  };

  // Funktion zur Überprüfung und Festlegung des CheckIn-Datums
  const handleCheckInChange = (e) => {
    const value = e.target.value;
    setCheckIn(value);

    // Überprüfen, ob das CheckOut-Datum kleiner oder gleich dem CheckIn-Datum ist, und anpassen
    if (new Date(value) >= new Date(checkOut)) {
      // Setzt das CheckOut-Datum auf einen Tag nach CheckIn
      const newCheckOutDate = new Date(value);
      newCheckOutDate.setDate(newCheckOutDate.getDate() + 1);
      setCheckOut(newCheckOutDate.toLocaleDateString('en-CA')); // Setzt das Datum im Format YYYY-MM-DD
    } else {
      // Berechne die Nächte, wenn das Datum korrekt ist
      setNights(calculateNights(value, checkOut));
    }
  };

  // Funktion zur Überprüfung und Festlegung des CheckOut-Datums
  const handleCheckOutChange = (e) => {
    const value = e.target.value;

    // Überprüfen, ob das neue CheckOut-Datum nach dem CheckIn-Datum liegt
    if (new Date(value) > new Date(checkIn)) {
      setCheckOut(value);
      // Berechne die Nächte, wenn das Datum korrekt ist
      setNights(calculateNights(checkIn, value));
    } else {
      alert('Checkout muss nach dem Checkin-Datum liegen.');
    }
  };

  // Berechne die Nächte, wenn sich CheckIn oder CheckOut ändert
  useEffect(() => {
    if (checkIn && checkOut) {
      setNights(calculateNights(checkIn, checkOut));
    }
  }, [checkIn, checkOut]);

  return (
    <div className="flex flex-col gap-4 mb-4">
      {/* Check-In und Check-Out Eingabefelder */}
      <div className="flex justify-between">
        {/* Check-In Input */}
        <div className="flex flex-col w-full">
          <label className="text-gray-600 text-sm">CHECK-IN</label>
          <input
            type="date" // Verwende den HTML5-Inputtyp für Datumsangabe
            value={checkIn}
            onChange={handleCheckInChange}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        
        {/* Check-Out Input */}
        <div className="flex flex-col w-full ml-4">
          <label className="text-gray-600 text-sm">CHECKOUT</label>
          <input
            type="date" // Verwende den HTML5-Inputtyp für Datumsangabe
            value={checkOut}
            onChange={handleCheckOutChange}
            className="border border-gray-300 rounded p-2 w-full"
            min={checkIn} // Mindestwert auf das Check-In-Datum setzen
          />
        </div>
      </div>

      {/* Gästeanzahl Dropdown */}
      <div className="flex flex-col">
        <label className="text-gray-600 text-sm">GUESTS</label>
        <select
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value, 10))}
          className="border border-gray-300 rounded p-2"
        >
          {/* Optionen für Gästeanzahl */}
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1} guest{index + 1 > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Anzeige der Anzahl der Nächte */}
      
    </div>
  );
}
