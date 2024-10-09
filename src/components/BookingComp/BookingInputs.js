// components/BookingInputs.js
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, differenceInCalendarDays } from 'date-fns';

export default function BookingInputs({ setNights, setCheckIn, setCheckOut, setGuests, GästeDB }) {
  const [checkInDate, setCheckInDate] = useState(new Date('2024-10-17'));
  const [checkOutDate, setCheckOutDate] = useState(new Date('2024-10-23'));
  const [guests, setLocalGuests] = useState(1);

  // Berechnung der Nächte
  const calculateNights = (checkIn, checkOut) => {
    if (checkIn && checkOut) {
      return differenceInCalendarDays(checkOut, checkIn);
    }
    return 0;
  };

  // Änderungen für Check-In und Check-Out
  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    setCheckIn(format(date, 'yyyy-MM-dd'));

    if (checkOutDate && date >= checkOutDate) {
      const newCheckOutDate = new Date(date);
      newCheckOutDate.setDate(newCheckOutDate.getDate() + 1);
      setCheckOutDate(newCheckOutDate);
      setCheckOut(format(newCheckOutDate, 'yyyy-MM-dd'));
    }

    setNights(calculateNights(date, checkOutDate));
  };

  const handleCheckOutChange = (date) => {
    if (date > checkInDate) {
      setCheckOutDate(date);
      setCheckOut(format(date, 'yyyy-MM-dd'));
      setNights(calculateNights(checkInDate, date));
    } else {
      alert('Checkout muss nach dem Check-In-Datum liegen.');
    }
  };

  // Änderung für Gästeanzahl
  const handleGuestsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLocalGuests(value);
    setGuests(value);
  };

  useEffect(() => {
    setNights(calculateNights(checkInDate, checkOutDate));
  }, [checkInDate, checkOutDate]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg max-w-lg mx-auto ">
      {/* Anzahl der Nächte */}
      

      {/* Datumsauswahl */}
      <div className="flex items-center gap-6">
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-600">CHECK-IN</label>
          <DatePicker
            selected={checkInDate}
            onChange={handleCheckInChange}
            selectsStart
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={new Date()}
            placeholderText="Wählen Sie das Check-In-Datum"
            className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm w-full focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            dateFormat="MM/dd/yyyy"
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-sm text-gray-600">CHECKOUT</label>
          <DatePicker
            selected={checkOutDate}
            onChange={handleCheckOutChange}
            selectsEnd
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={checkInDate || new Date()}
            placeholderText="Wählen Sie das Check-Out-Datum"
            className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm w-full focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            dateFormat="MM/dd/yyyy"
            disabled={!checkInDate}
          />
        </div>
      </div>

      {/* Gästeauswahl */}
      <div className="flex flex-col mt-6">
        <label className="text-sm text-gray-600">GÄSTE</label>
        <select value={guests} onChange={handleGuestsChange} className="mt-1 p-3 border border-gray-300 rounded-md shadow-sm w-full focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          {[...Array(GästeDB)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1} Gast{index + 1 > 1 ? 'e' : ''}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}
