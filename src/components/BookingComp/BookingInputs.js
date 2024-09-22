import { useState } from 'react';

export default function BookingInputs() {
  const [checkIn, setCheckIn] = useState('10/17/2024');
  const [checkOut, setCheckOut] = useState('10/23/2024');
  const [guests, setGuests] = useState(1);

  return (
    <div className="flex flex-col gap-4 mb-4">
      <div className="flex justify-between">
        <div className="flex flex-col w-full">
          <label className="text-gray-600 text-sm">CHECK-IN</label>
          <input
            type="text"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
          />
        </div>
        <div className="flex flex-col w-32 ml-4">
          <label className="text-gray-600 text-sm ">CHECKOUT</label>
          <input
            type="text"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border border-gray-300 rounded p-2 "
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-gray-600 text-sm">GUESTS</label>
        <select
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value={1}>1 guest</option>
          <option value={2}>2 guests</option>
          <option value={3}>3 guests</option>
          <option value={4}>4 guests</option>
          <option value={5}>5 guests</option>
          <option value={6}>6 guests</option>
          <option value={7}>7 guests</option>
          <option value={8}>8 guests</option>
          <option value={9}>9 guests</option>
          <option value={10}>10 guests</option>
        </select>
      </div>
    </div>
  );
}
