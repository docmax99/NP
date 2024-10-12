import { useState, useEffect } from 'react';
import { supabase } from '../../components/lib/supabaseClient';
import Image from 'next/image';
import { useRouter } from 'next/router'; // Router importieren

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter(); // Router-Hook initialisieren

  useEffect(() => {
    const fetchUserDataAndBookings = async () => {
      try {
        setLoading(true);

        // Benutzer-Session abfragen, um die User-ID zu bekommen
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const authUser = sessionData?.session?.user;
        if (!authUser) throw new Error('User not authenticated');

        // Benutzerdaten aus der `public.User`-Tabelle holen
        const { data: userData, error: userError } = await supabase
          .from('User')
          .select('id, Email, Ort, PLZ, created_at')
          .eq('Email', authUser.email)
          .single();
        if (userError) throw userError;

        // Aktive Buchungen des Benutzers aus der `public.Booking`-Tabelle abfragen
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('Booking')
          .select('booking_id, hausId, start_date, end_date, status')
          .eq('userId', userData.id)
          .eq('status', 'active');
        if (bookingsError) throw bookingsError;

        setUserData(userData);
        setBookings(bookingsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDataAndBookings();
  }, []);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="relative w-full min-h-screen bg-gray-900 text-white">
      {/* Hintergrundbild mit Blur-Effekt */}
      <div className="absolute inset-0">
        <Image
          src="/Images/Haus_am_See.jpg"
          alt="Haus am See"
          layout="fill"
          objectFit="cover"
          className="blur-md"
        />
      </div>

      {/* Overlay, um das Bild etwas dunkler zu machen */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto p-8">
        <button
          onClick={() => router.back()} // Back-Funktion aufrufen
          className="bg-indigo-600 text-white px-4 py-2 mb-6 rounded-lg hover:bg-indigo-800 transition duration-300"
        >
          Zurück
        </button>

        <h1 className="text-5xl font-bold mb-6 text-center">Dein Profil</h1>

        {userData && (
          <div className="bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-3xl font-bold mb-4">Profilinformationen</h2>
            <p className="text-lg mb-2">
              <strong>Email:</strong> {userData.Email}
            </p>
            <p className="text-lg mb-2">
              <strong>Ort:</strong> {userData.Ort}
            </p>
            <p className="text-lg mb-2">
              <strong>PLZ:</strong> {userData.PLZ}
            </p>
            <p className="text-lg">
              <strong>Registriert seit:</strong> {new Date(userData.created_at).toLocaleDateString()}
            </p>
          </div>
        )}

        <h2 className="text-4xl font-bold mb-4">Aktive Buchungen</h2>
        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div key={booking.booking_id} className="bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-2">Buchung ID: {booking.booking_id}</h3>
                <p className="text-lg mb-2">
                  <strong>Haus ID:</strong> {booking.hausId}
                </p>
                <p className="text-lg mb-2">
                  <strong>Startdatum:</strong> {new Date(booking.start_date).toLocaleDateString()}
                </p>
                <p className="text-lg mb-2">
                  <strong>Enddatum:</strong> {new Date(booking.end_date).toLocaleDateString()}
                </p>
                <p className="text-lg">
                  <strong>Status:</strong> {booking.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-lg text-center">Keine aktiven Buchungen.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
