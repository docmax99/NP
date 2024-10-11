import Link from 'next/link';
import Image from 'next/image';
import Dropdown from '../../components/Dropdown';
import { useState, useEffect } from 'react';
import BookingCard from '../../components/BookingCard';
import ListingInfo from '../../components/ListingInfos';
import { getAllHouses } from '../../services/houseService';
import { useRouter } from 'next/router';
import MapEmbed from '../../components/MapEmbed';
import Header from '../../components/Header';
import { supabase } from '../../components/lib/supabaseClient';
import WeatherComponent from '../../components/WeatherComponent';
import AddOns from '../../components/AddOns';




export default function Unterkunft() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [house, setHouse] = useState(null);
  const [user, setUser] = useState(null); // Zustand für Benutzer hinzufügen
  const [addOnPrice, setAddOnPrice] = useState(0); // Zustand für den Preis der Add-Ons
  const router = useRouter();
  const { query } = router;

  // houseId wird aus den Query-Parametern abgerufen
  const houseId = query.id;
  const mapsDBLink = house ? house.URL : ""; // Link zur Google Maps-Seite des Hauses
  const Ort = house ? house.Ort : ""; // Ort des Hauses

  useEffect(() => {
    // Überprüfen, ob ein Benutzer eingeloggt ist
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    // Nur abrufen, wenn die houseId vorhanden ist
    if (houseId) {
      const fetchHouse = async () => {
        try {
          const { data, error } = await supabase
        .from('Houses')
        .select('*')
        .eq('id', houseId)

        if (error)console.error('Fehler beim Abrufen des Hauses:', error);

        const selectedHouse = data[0];
          setHouse(selectedHouse);
          console.log("Ausgewähltes Haus:", selectedHouse);
        } catch (error) {
          console.error("Fehler beim Abrufen des Hauses:", error);
        }
      };

      fetchHouse();
    }
  }, [houseId]); // useEffect wird erneut ausgeführt, wenn houseId geändert wird

  // Zustand für den Preis der Add-Ons
  const handleAddOnPriceChange = (price) => {
    setAddOnPrice(price);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header user={user} onAvatarClick={() => router.push('/app/login')} onLogout={() => supabase.auth.signOut()} />

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center gap-4 p-2 bg-gray-100">
        {/* Haus Titel */}
        <div className="text-4xl text-inherit font-bold">
          {house ? (
            <h1>{house?.Titel}</h1>
          ) : (
            <p>Haus wird geladen...</p>
          )}
        </div>

        {/* Responsives 3x3 Grid Layout */}
        <div className="grid grid-cols-4 grid-rows-[1fr_1fr] gap-2 w-full max-w-6xl bg-white shadow-lg rounded-xl p-4">
          {/* Erstes Bild (nimmt 2 Spalten und 1 Reihe ein) */}
          <div className="col-span-2 row-span-1">
            <img
              src={house?.bilder[0] ?? ''} // Bild-URL aus den Daten oder Fallback-Bild
              layout="responsive"
              width={500}
              height={500}
              alt={house?.Titel}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Zweites Bild */}
          <div className="col-span-2 row-span-1">
            <img
              src={house?.bilder[1] ?? ''}
              layout="responsive"
              width={500}
              height={500}
              alt={house?.Titel}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Drittes Bild */}
          <div className="col-span-2 row-span-1">
            <img
              src={house?.bilder[2] ?? ''}
              layout="responsive"
              width={900}
              height={450}
              alt="Room 2 Hobbit"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Viertes Bild */}
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

        {/* Buchung und weitere Informationen */}
        <div className="bg-gray-100 grid grid-cols-2 grid-rows-1 w-full max-w-6xl shadow-2xl rounded-xl gap-4 p-4 h-[110vh]">
          <div className="w-full">
            <ListingInfo house={house} />
            
          </div>
          <div className="w-full">
            <BookingCard house={house} Ankuft={query.arrivalDate} Abgang={query.departureDate} GästeZahl={query.guests} addOnPrice={addOnPrice}/>
          </div> 
          
             
        </div>
          
          {/* Hier fügen wir die AddOns-Komponente ein */}
          <div className="w-full max-w-6xl mt-4">
            <AddOns onPriceChange={handleAddOnPriceChange} />
          </div>
          <div className="w-full max-w-6xl mt-4 p-6 bg-white rounded-lg shadow-2xl">
          <WeatherComponent Ort={Ort} />
          <MapEmbed mapsLink={mapsDBLink} />
          </div>

        
        
      </main>

      {/* Footer */}
      <footer className="bg-black text-white p-4">
        <nav className="space-x-4 text-center">
          <Link href="/about" className="hover:underline">Über uns</Link>
          <Link href="/contact" className="hover:underline">Kontakt</Link>
          <Link href="/app/impressum" className="hover:underline">Impressum</Link>
          <Link href="/privacy" className="hover:underline">Datenschutz</Link>
        </nav>
      </footer>

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
