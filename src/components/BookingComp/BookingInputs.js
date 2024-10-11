import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, differenceInCalendarDays } from 'date-fns';
import { de } from 'date-fns/locale'; // Für deutsche Lokalisierung

export default function BookingInputs({ setNights, setCheckIn, setCheckOut, setGuests, GästeDB }) {
  const [checkInDate, setCheckInDate] = useState(new Date('2024-10-17'));
  const [checkOutDate, setCheckOutDate] = useState(new Date('2024-10-23'));
  const [guests, setLocalGuests] = useState(1);
  const [nights, setLocalNights] = useState(0);

  // Berechnung der Nächte
  const calculateNights = (checkIn, checkOut) => (checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 0);

  const handleCheckInChange = (date) => {
    setCheckInDate(date);
    setCheckIn(format(date, 'yyyy-MM-dd'));
    if (checkOutDate && date >= checkOutDate) {
      const newCheckOutDate = new Date(date);
      newCheckOutDate.setDate(newCheckOutDate.getDate() + 1);
      setCheckOutDate(newCheckOutDate);
      setCheckOut(format(newCheckOutDate, 'yyyy-MM-dd'));
    }
    const calculatedNights = calculateNights(date, checkOutDate);
    setNights(calculatedNights);
    setLocalNights(calculatedNights);
  };

  const handleCheckOutChange = (date) => {
    if (date > checkInDate) {
      setCheckOutDate(date);
      setCheckOut(format(date, 'yyyy-MM-dd'));
      const calculatedNights = calculateNights(checkInDate, date);
      setNights(calculatedNights);
      setLocalNights(calculatedNights);
    } else {
      alert('Checkout muss nach dem Check-In-Datum liegen.');
    }
  };

  const handleGuestsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLocalGuests(value);
    setGuests(value);
  };

  useEffect(() => {
    const calculatedNights = calculateNights(checkInDate, checkOutDate);
    setNights(calculatedNights);
    setLocalNights(calculatedNights);
  }, [checkInDate, checkOutDate, setNights]);

  return (
    <div className="p-6 bg-gradient-to-r from-blue-100 to-purple-200 shadow-lg rounded-lg max-w-lg mx-auto border border-gray-300">
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Buchungsdetails</h2>
        <p className="text-gray-600">Bitte wählen Sie Ihr An- und Abreisedatum</p>
      </div>

      {/* Datumsauswahl */}
      <div className="flex items-center gap-6 mb-4">
        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold text-gray-700 mb-1">CHECK-IN</label>
          <DatePicker
            selected={checkInDate}
            onChange={handleCheckInChange}
            selectsStart
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={new Date()}
            placeholderText="Wählen Sie das Check-In-Datum"
            className="mt-1 p-3 bg-white border border-gray-300 rounded-md shadow-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
            dateFormat="dd/MM/yyyy"
            locale={de}
          />
        </div>
        <div className="flex flex-col w-full">
          <label className="text-sm font-semibold text-gray-700 mb-1">CHECKOUT</label>
          <DatePicker
            selected={checkOutDate}
            onChange={handleCheckOutChange}
            selectsEnd
            startDate={checkInDate}
            endDate={checkOutDate}
            minDate={checkInDate || new Date()}
            placeholderText="Wählen Sie das Check-Out-Datum"
            className="mt-1 p-3 bg-white border border-gray-300 rounded-md shadow-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
            dateFormat="dd/MM/yyyy"
            locale={de}
            disabled={!checkInDate}
          />
        </div>
      </div>

      {/* Gästeauswahl */}
      <div className="flex flex-col mb-6">
        <label className="text-sm font-semibold text-gray-700 mb-1">GÄSTE</label>
        <select
          value={guests}
          onChange={handleGuestsChange}
          className="mt-1 p-3 bg-white border border-gray-300 rounded-md shadow-sm w-full focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
        >
          {[...Array(GästeDB)].map((_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1} Gast{index + 1 > 1 ? 'e' : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Berechnete Anzahl der Nächte */}
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700">Nächte: {nights}</p>
      </div>
    </div>
  );
}
