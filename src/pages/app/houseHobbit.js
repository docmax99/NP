import Link from 'next/link';
import Image from 'next/image';
import Dropdown from '../../components/Dropdown';
import { useState, useEffect } from 'react';
import BookingCard from '../../components/BookingCard';
import ListingInfo from '../../components/ListingInfos';
import { getAllHouses } from '../../services/houseService';
import { useRouter } from 'next/router';
import MapEmbed from '../../components/MapEmbed';

export default function Unterkunft() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [house, setHouse] = useState(null);
  const router = useRouter();
  const { query } = router;

  // `houseId` wird aus den Query-Parametern abgerufen
  const houseId = query.id;

  // Fallback-Werte für Titel und Bild
  const mapsLink = house ?  house.URL : 'URL nicht verfügbar.'; // URL-Aus der Datenbank
  const Beschreibung = house ? house.Beschreibung : 'Beschreibung nicht verfügbar.';
  const Bild_3 = house ? house.Bild_3 || '/Images/placeholder.png' : '/Images/placeholder.png'; // Fallback-Bild // Front Pictuer
  const Bild_1 = house ? house.Bild_1 || '/Images/placeholder.png' : '/Images/placeholder.png'; // Fallback-Bild // Room 1
  const Bild_2 = house ? house.Bild_2 || '/Images/placeholder.png' : '/Images/placeholder.png'; // Fallback-Bild // Room 2
  const Bild_4 = house ? house.Bild_4 || '/Images/placeholder.png' : '/Images/placeholder.png'; // Fallback-Bild // Room 3
  const Titel = house ? house.Titel || 'Unbekanntes Haus' : 'Unbekanntes Haus'; // Fallback-Titel

  useEffect(() => {
    // Nur abrufen, wenn die `houseId` vorhanden ist
    if (houseId) {
      const fetchHouse = async () => {
        try {
          const houseData = await getAllHouses();
          console.log("Abgerufene Hausdaten:", houseData);

          // Finde das Haus basierend auf der `houseId` (UUID wird als String verglichen)
          const selectedHouse = houseData.find((h) => h.id === houseId);
          setHouse(selectedHouse);
          console.log("Ausgewähltes Haus:", selectedHouse);
        } catch (error) {
          console.error("Fehler beim Abrufen des Hauses:", error);
        }
      };

      fetchHouse();
    }
  }, [houseId]); // `useEffect` wird erneut ausgeführt, wenn `houseId` geändert wird

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-slate-700 text-white p-2 flex justify-between items-center shadow-md">
        <Link href="/app/home">
          <Image src="/Images/LogoNicePlaces.png" width={100} height={100} alt="Logo" className="ml-4" />
        </Link>
        <Dropdown />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center gap-4 p-2 bg-gray-100">
        {/* Haus Titel */}
        <div className="text-4xl text-inherit">
          {house ? (
            <h1>{house.Titel}</h1>
          ) : (
            <p>Haus wird geladen...</p>
          )}
        </div>

        {/* Responsives 3x3 Grid Layout */}
        <div className="grid grid-cols-4 grid-rows-[2fr_1fr] gap-2 w-full max-w-6xl bg-white shadow-lg rounded-xl p-4">
          {/* Erstes Bild (nimmt 2 Spalten und 1 Reihe ein) */}
          <div className="col-span-2 row-span-1">
            <img
              src={Bild_3} // Bild-URL aus den Daten oder Fallback-Bild
              layout="responsive"
              width={500}
              height={500}
              alt={Titel}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Zweites Bild (statisches Beispielbild) */}
          <div className="col-span-2 row-span-1">
            <img
              src={Bild_1}
              layout="responsive"
              width={500}
              height={500}
              alt={Titel}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Text */}
          <div className="col-span-1 row-span-1">
            <h1 className="text-lg font-bold">{Titel}</h1>
            <span className="text-base">{`${Beschreibung}`}</span>
          </div>

          {/* Drittes Bild (statisches Beispielbild) */}
          <div className="col-span-2 row-span-1">
            <img
              src={Bild_2}
              layout="responsive"
              width={900}
              height={450}
              alt="Room 2 Hobbit"
              className="w-full aspect-[2/1] object-cover rounded-xl"
            />
          </div>

          {/* Viertes Bild (statisches Beispielbild) */}
          <div className="col-span-1 row-span-1">
            <img
              src={Bild_4}
              layout="responsive"
              width={900}
              height={450}
              alt="Room 3 Hobbit"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Buchung und weitere Informationen */}
        <div className="bg-gray-100 grid grid-cols-2 grid-rows-1 w-full max-w-6xl shadow-2xl rounded-xl gap-4 p-4 h-[200vh]">
          <div className="w-full">
            <ListingInfo house={house} />
            <MapEmbed mapsLink={mapsLink} />
            <p>{mapsLink}</p>
          </div>
          <div className="w-full">
            <BookingCard house={house} />
          </div>
          
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

