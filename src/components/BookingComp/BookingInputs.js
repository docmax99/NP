// components/BookingInputs.js
import { useState, useEffect } from 'react';

export default function BookingInputs({ setNights, setCheckIn, setCheckOut, setGuests }) {
  const [checkIn, setLocalCheckIn] = useState('2024-10-17');
  const [checkOut, setLocalCheckOut] = useState('2024-10-23');
  const [guests, setLocalGuests] = useState(1);

  const calculateNights = (checkInDate, checkOutDate) => {
    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    const timeDifference = outDate.getTime() - inDate.getTime();
    return timeDifference / (1000 * 3600 * 24); // Anzahl der Nächte berechnen
  };

  const handleCheckInChange = (e) => {
    const value = e.target.value;
    setLocalCheckIn(value);
    setCheckIn(value);
    if (new Date(value) >= new Date(checkOut)) {
      const newCheckOutDate = new Date(value);
      newCheckOutDate.setDate(newCheckOutDate.getDate() + 1);
      setLocalCheckOut(newCheckOutDate.toLocaleDateString('en-CA'));
      setCheckOut(newCheckOutDate.toLocaleDateString('en-CA'));
    } else {
      setNights(calculateNights(value, checkOut));
    }
  };

  const handleCheckOutChange = (e) => {
    const value = e.target.value;
    if (new Date(value) > new Date(checkIn)) {
      setLocalCheckOut(value);
      setCheckOut(value);
      setNights(calculateNights(checkIn, value));
    } else {
      alert('Checkout muss nach dem Checkin-Datum liegen.');
    }
  };

  const handleGuestsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLocalGuests(value);
    setGuests(value);
  };

  useEffect(() => {
    setNights(calculateNights(checkIn, checkOut));
  }, [checkIn, checkOut]);

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <label className="text-gray-600 text-sm">CHECK-IN</label>
          <input type="date" value={checkIn} onChange={handleCheckInChange} className="border border-gray-300 rounded p-2 w-full" />
        </div>
        <div className="flex flex-col w-full ml-4">
          <label className="text-gray-600 text-sm">CHECKOUT</label>
          <input type="date" value={checkOut} onChange={handleCheckOutChange} className="border border-gray-300 rounded p-2 w-full" />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-gray-600 text-sm">GUESTS</label>
        <select value={guests} onChange={handleGuestsChange} className="border border-gray-300 rounded p-2">
          {[...Array(10)].map((_, index) => (
            <option key={index + 1} value={index + 1}>{index + 1} guest{index + 1 > 1 ? 's' : ''}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
