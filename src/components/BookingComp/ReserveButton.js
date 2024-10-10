import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../components/lib/supabaseClient';


async function createBooking(houseId, checkIn, checkOut, guests, totalPrice) {
  console.log('Supabase Client:', supabase);
  console.log('House ID:', houseId);
  console.log('Check-in:', checkIn);
  console.log('Check-out:', checkOut);
  console.log('Guests:', guests);
  console.log('Total Price:', totalPrice);

  const { data, error } = await supabase
    .from('Booking')
    .insert([
      {
        hausId: houseId,
        start_date: checkIn,
        end_date: checkOut,
        number_of_guests: guests,
        total_price: totalPrice,
        status: 'pending',
      },
    ]);

  if (error) {
    console.error('Error creating booking:', error.message);
    return null;
  }

  return data;
}


export default function ReserveButton({ houseId, checkIn, checkOut, guests, totalPrice }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReserve = async () => {
    try {
      setLoading(true);

      // Buchungslogik ausführen
      const booking = await createBooking(houseId, checkIn, checkOut, guests, totalPrice);

      if (booking) {
        alert('Buchung erfolgreich!');

        // Leite den Benutzer zur Seite "/app/home" weiter
        router.push('/app/home');
      } else {
        alert('Fehler beim Buchen');
      }

      setLoading(false);
    } catch (err) {
      console.error('Fehler bei der Buchung:', err);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleReserve}
      className="bg-gradient-to-r from-blue-400 to-blue-900 text-white py-3 rounded-lg mb-4 font-semibold"
      disabled={loading}
    >
      {loading ? 'Wird geladen...' : 'Reservieren'}
    </button>
  );
}
