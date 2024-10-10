import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../components/lib/supabaseClient';
import { format } from 'date-fns';

// Funktion zur Erstellung einer Buchung
async function createBooking(houseId, checkIn, checkOut, guests, totalPrice) {
  try {
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
      console.error('Fehler beim Erstellen der Buchung:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Unbekannter Fehler bei der Buchung:', err);
    return { success: false, error: err.message };
  }
}

// Funktion zur Verfügbarkeitsprüfung
async function checkAvailability(houseId, checkIn, checkOut) {
  try {
    const formattedCheckIn = format(new Date(checkIn), 'yyyy-MM-dd');
    const formattedCheckOut = format(new Date(checkOut), 'yyyy-MM-dd');

    console.log('Prüfe Verfügbarkeit für Haus ID:', houseId);
    console.log('Check-in Datum:', formattedCheckIn);
    console.log('Check-out Datum:', formattedCheckOut);

    // Abfrage zur Überprüfung der Verfügbarkeit
    const { data, error } = await supabase
      .from('Booking')
      .select('start_date, end_date')
      .eq('hausId', houseId)
      .or(`and(start_date.lte.${formattedCheckOut},end_date.gte.${formattedCheckIn})`);

    if (error) {
      console.error('Fehler bei der Verfügbarkeitsprüfung:', error.message);
      return { success: false, error: error.message };
    }

    // Überprüfen, ob es eine Überschneidung gibt
    const isConflict = data.some((booking) => {
      const existingStart = new Date(booking.start_date);
      const existingEnd = new Date(booking.end_date);

      return (
        (existingStart <= new Date(formattedCheckOut) && existingEnd >= new Date(formattedCheckIn)) ||
        (existingStart <= new Date(formattedCheckIn) && existingEnd >= new Date(formattedCheckOut))
      );
    });

    // Wenn keine Konflikte vorhanden sind, ist das Haus verfügbar
    return { success: true, isAvailable: !isConflict };
  } catch (err) {
    console.error('Unbekannter Fehler bei der Verfügbarkeitsprüfung:', err);
    return { success: false, error: err.message };
  }
}

export default function ReserveButton({ houseId, checkIn, checkOut, guests, totalPrice }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReserve = async () => {
    try {
      setLoading(true);

      // Überprüfe die Verfügbarkeit des Hauses
      const availabilityResponse = await checkAvailability(houseId, checkIn, checkOut);

      if (!availabilityResponse.success) {
        alert(`Fehler bei der Verfügbarkeitsprüfung: ${availabilityResponse.error}`);
        setLoading(false);
        return;
      }

      if (!availabilityResponse.isAvailable) {
        alert('Das Haus ist leider zu dieser Zeit nicht verfügbar.');
        setLoading(false);
        return;
      }

      // Buchung erstellen, wenn das Haus verfügbar ist
      const bookingResponse = await createBooking(houseId, checkIn, checkOut, guests, totalPrice);

      if (!bookingResponse.success) {
        alert(`Fehler beim Buchen: ${bookingResponse.error}`);
        setLoading(false);
        return;
      }

      alert('Buchung erfolgreich!');

      // Leite den Benutzer zur Seite "/app/home" weiter
      router.push('/app/home');
    } catch (err) {
      console.error('Fehler bei der Buchung:', err);
      alert(`Fehler bei der Buchung: ${err.message}`);
    } finally {
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
