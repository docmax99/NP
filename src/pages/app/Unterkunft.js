import { useState, useEffect } from 'react';
import BookingCard from '../../components/BookingCard';
import ListingInfo from '../../components/ListingInfos';
import { useRouter } from 'next/router';
import MapEmbed from '../../components/MapEmbed';
import Header from '../../components/Header';
import { supabase } from '../../components/lib/supabaseClient';
import WeatherComponent from '../../components/WeatherComponent';
import AddOns from '../../components/AddOns';
import Footer from '../../components/Footer';

export default function Unterkunft() {
  // State variables
  const [showCookieBanner, setShowCookieBanner] = useState(true); // State for showing cookie banner
  const [house, setHouse] = useState(null); // State for house data
  const [user, setUser] = useState(null); // State for user data
  const [addOnPrice, setAddOnPrice] = useState(0); // State for add-on price
  const router = useRouter();
  const { query } = router;

  // Get houseId from query parameters
  const houseId = query.id;
  const mapsDBLink = house ? house.URL : ""; // Google Maps link for the house
  const Ort = house ? house.Ort : ""; // Location of the house

  useEffect(() => {
    // Fetch user data if logged in
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    // Fetch house data if houseId is available
    if (houseId) {
      const fetchHouse = async () => {
        try {
          const { data, error } = await supabase
            .from('Houses')
            .select('*')
            .eq('id', houseId);

          if (error) console.error('Fehler beim Abrufen des Hauses:', error);

          const selectedHouse = data[0];
          setHouse(selectedHouse);
          console.log("Ausgewähltes Haus:", selectedHouse);
        } catch (error) {
          console.error("Fehler beim Abrufen des Hauses:", error);
        }
      };

      fetchHouse();
    }
  }, [houseId]); // Re-run useEffect when houseId changes

  // Handle add-on price change
  const handleAddOnPriceChange = (price) => {
    setAddOnPrice(price);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header user={user} onAvatarClick={() => router.push('/app/login')} onLogout={() => supabase.auth.signOut()} />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center gap-4 p-2 bg-gray-100">
        {/* House Title */}
        <div className="text-4xl text-inherit font-bold">
          {house ? (
            <h1>{house?.Titel}</h1>
          ) : (
            <p>Haus wird geladen...</p>
          )}
        </div>

        {/* Responsive 3x3 Grid Layout */}
        <div className="grid grid-cols-4 grid-rows-[1fr_1fr] gap-2 w-full max-w-6xl bg-white shadow-lg rounded-xl p-4">
          {/* First Image (spans 2 columns and 1 row) */}
          <div className="col-span-2 row-span-1">
            <img
              src={house?.bilder[0] ?? ''} // Image URL from data or fallback image
              layout="responsive"
              width={900}
              height={450}
              alt={house?.Titel}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Second Image */}
          <div className="col-span-2 row-span-1">
            <img
              src={house?.bilder[1] ?? ''}
              layout="responsive"
              width={900}
              height={450}
              alt={house?.Titel}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Third Image */}
          <div className="col-span-2 row-span-2">
            <img
              src={house?.bilder[2] ?? ''}
              layout="responsive"
              width={900}
              height={450}
              alt="Room 2 Hobbit"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Fourth Image */}
          <div className="col-span-2 row-span-2">
            <img
              src={house?.bilder[3] ?? ''}
              layout="responsive"
              width={900}
              height={450}
              alt="Room 3 Hobbit"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Text */}
          <div className="col-span-4 row-span-1">
            <h1 className="text-lg font-bold">{house?.Titel}</h1>
            <span className="text-base">{house?.Beschreibung}</span>
          </div>
        </div>

        {/* Booking and Additional Information */}
        <div className="bg-gray-100 grid grid-cols-2 grid-rows-1 w-full max-w-6xl shadow-2xl rounded-xl gap-4 p-4 h-[110vh]">
          <div className="w-full">
            <ListingInfo house={house} />
          </div>
          <div className="w-full">
            <BookingCard house={house} Ankuft={query.arrivalDate} Abgang={query.departureDate} GästeZahl={query.guests} addOnPrice={addOnPrice} />
          </div>
        </div>

        {/* Add-Ons Component */}
        <div className="w-full max-w-6xl mt-4">
          <AddOns onPriceChange={handleAddOnPriceChange} />
        </div>

        {/* Weather and Map Components */}
        <div className="w-full max-w-6xl mt-4 p-6 bg-white rounded-lg shadow-2xl">
          <WeatherComponent Ort={Ort} />
          <MapEmbed mapsLink={mapsDBLink} />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 w-full bg-gray-200 p-4 flex justify-between items-center shadow-lg">
          <p>Diese Website verwendet Cookies, um die Benutzererfahrung zu verbessern.</p>
          <button
            onClick={() => setShowCookieBanner(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Akzeptieren
          </button>
        </div>
      )}
    </div>
  );
}
