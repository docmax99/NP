// components/ReserveButton.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../lib/supabaseClient';

async function createBooking(userId, houseId, checkIn, checkOut, guests, totalPrice) {
  const { data, error } = await supabase
    .from('Booking')
    .insert([
      {
        userid: userId,
        hausid: houseId,
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

async function sendConfirmationEmail(email, houseName, checkIn, checkOut, totalPrice) {
  try {
    const response = await fetch('/api/sendConfirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        houseName,
        checkIn,
        checkOut,
        totalPrice,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Confirmation email sent successfully:', result.message);
    } else {
      console.error('Failed to send confirmation email:', result.error);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export default function ReserveButton({ userId, houseId, houseName, checkIn, checkOut, guests, totalPrice, userEmail }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleReserve = async () => {
    // Prüfe, ob der Benutzer eingeloggt ist
    const { data: sessionData } = await supabase.auth.getSession();

    if (!sessionData.session) {
      // Benutzer ist nicht eingeloggt, leite zur Registrierungsseite weiter
      router.push('/register'); // Leitet zur Registrierungsseite weiter
      return;
    }

    setLoading(true);

    // Benutzer ist eingeloggt, Buchungslogik ausführen
    const booking = await createBooking(userId, houseId, checkIn, checkOut, guests, totalPrice);

    if (booking) {
      alert('Buchung erfolgreich!');

      // E-Mail-Bestätigung senden
      await sendConfirmationEmail(userEmail, houseName, checkIn, checkOut, totalPrice);
    } else {
      alert('Fehler beim Buchen');
    }

    setLoading(false);
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
