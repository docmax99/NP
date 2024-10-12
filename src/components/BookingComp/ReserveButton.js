import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../components/lib/supabaseClient';
import { format } from 'date-fns';
import Confetti from 'react-confetti'; // Feuerwerk-Effekte
import useSound from 'use-sound'; // Sound-Effekte (npm install use-sound)

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

    const { data, error } = await supabase
      .from('Booking')
      .select('start_date, end_date')
      .eq('hausId', houseId)
      .or(`and(start_date.lte.${formattedCheckOut},end_date.gte.${formattedCheckIn})`);

    if (error) {
      console.error('Fehler bei der Verfügbarkeitsprüfung:', error.message);
      return { success: false, error: error.message };
    }

    const isConflict = data.some((booking) => {
      const existingStart = new Date(booking.start_date);
      const existingEnd = new Date(booking.end_date);

      return (
        (existingStart <= new Date(formattedCheckOut) && existingEnd >= new Date(formattedCheckIn)) ||
        (existingStart <= new Date(formattedCheckIn) && existingEnd >= new Date(formattedCheckOut))
      );
    });

    return { success: true, isAvailable: !isConflict };
  } catch (err) {
    console.error('Unbekannter Fehler bei der Verfügbarkeitsprüfung:', err);
    return { success: false, error: err.message };
  }
}

export default function ReserveButton({ houseId, checkIn, checkOut, guests, totalPrice }) {
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Popup-Status
  const [play] = useSound('..//sounds//Confirmation.mp3'); // Sound laden (pfade zu deinem Sound)
  const router = useRouter();

  const handleReserve = async () => {
    try {
      setLoading(true);

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

      const bookingResponse = await createBooking(houseId, checkIn, checkOut, guests, totalPrice);

      if (!bookingResponse.success) {
        alert(`Fehler beim Buchen: ${bookingResponse.error}`);
        setLoading(false);
        return;
      }

      // Zeige Popup mit Feuerwerk und spiele Sound ab
      setShowPopup(true);
      play(); // Sound abspielen

      setTimeout(() => {
        // Leite den Benutzer nach 5 Sekunden weiter
        router.push('/app/home');
      }, 5000);
    } catch (err) {
      console.error('Fehler bei der Buchung:', err);
      alert(`Fehler bei der Buchung: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Button für die Buchung */}
      <button
        onClick={handleReserve}
        className="bg-gradient-to-r from-blue-400 to-blue-900 text-white py-3 rounded-lg mb-4 font-semibold"
        disabled={loading}
      >
        {loading ? 'Wird geladen...' : 'Reservieren'}
      </button>

      {/* Popup für die Bestätigung */}
      {showPopup && (
        
        <div className="fixed inset-0 bg-gradient-to-r from-purple-600 via-blue-400 to-blue-600 bg-opacity-90 flex justify-center items-center z-50">
        {/* Feuerwerk-Effekt */}
        <Confetti width={window.innerWidth} height={window.innerHeight} />
        <div className="relative bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md transform transition-transform duration-500 hover:scale-105 ease-in-out hover:shadow-2xl">
          
          {/* Glänzender Rand-Effekt */}
          <div className="absolute inset-0 rounded-2xl border-4 border-transparent bg-gradient-to-r from-pink-400 to-purple-500 via-transparent animate-pulse opacity-70 pointer-events-none"></div>
      
          {/* Titel mit Animation */}
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500 mb-6 animate-pulse">
            Herzlichen Glückwunsch!
          </h2>
      
          {/* Animierter Text */}
          <p className="text-xl font-semibold text-gray-700 mb-4 animate-bounce glow-effect">
            Hiermit bestätigen wir Ihre Buchung.
          </p>
      
          
      
          {/* Button zur Bestätigung */}
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-green-400 to-teal-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 duration-300 ease-in-out">
            Zurück zur Startseite
          </button>
        </div>
      
        {/* Stil für leuchtenden Text in Tailwind */}
        <style jsx>{`
          .glow-effect {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.6), 0 0 20px rgba(255, 0, 255, 0.4), 0 0 30px rgba(255, 0, 255, 0.6);
          }
        `}</style>
      </div>
      
      )}
    </>
  );
}
