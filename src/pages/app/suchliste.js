import Link from 'next/link';
import Image from 'next/image';
import Dropdown from '../../components/Dropdown';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAllHouses } from '../../services/houseService';

export default function Suchliste() {
  const router = useRouter();
  const { query } = router;
  const [houses, setHouses] = useState([]);

  // Häuserdaten aus der Datenbank abrufen und im State speichern
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const houseData = await getAllHouses(); // Abruf der Daten aus der Datenbank
        setHouses(houseData); // Speichern der abgerufenen Daten im State
        console.log('House data:', houseData);
      } catch (error) {
        console.error('Fehler beim Abrufen der Häuserdaten:', error);
      }
    };

    fetchHouses();
  }, []);

  return (
    <div className="flex flex-col gap-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-slate-700 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Link href="/app/home">
            <Image src="/Images/LogoNicePlaces.png" width={140} height={140} alt="Logo" className="ml-6" />
          </Link>
        </div>
        <Dropdown />
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center gap-8 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Dynamische Anzeige aller Häuser aus der Datenbank */}
          {houses.length > 0 ? (
            houses.map((house) => (
              <div key={house.Haus_Id} className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
                <Link href={`/app/houseHobbit?id=${house.Haus_Id}`} legacyBehavior>
                  <img
                    src={house.Bild_3} // Bild-URL aus den Daten
                    width={400}
                    height={300}
                    alt={house.Titel}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                </Link>
                <h2 className="text-lg font-semibold mt-4">{house.Titel}</h2>
              </div>
            ))
          ) : (
            <p>Keine Häuser verfügbar.</p> // Falls keine Häuser in der Datenbank sind, wird dieser Text angezeigt
          )}
        </div>

        {/* Zusätzliche Informationen basierend auf den Query-Parametern */}
        <div style={{ padding: '20px' }}>
          <h1>Ergebnisseite</h1>
          <ul>
            <li><strong>Reiseziel:</strong> {query.destination || '(empty)'}</li>
            <li><strong>Anreise:</strong> {query.arrivalDate || '(empty)'}</li>
            <li><strong>Abreise:</strong> {query.departureDate || '(empty)'}</li>
            <li><strong>Anzahl der Gäste:</strong> {query.guests || '(empty)'}</li>
          </ul>
        </div>
      </main>

      {/* Footer mit Links */}
      <footer className="bg-black text-white p-4">
        <nav className="space-x-4 text-center">
          <Link href="/about" legacyBehavior><a className="hover:underline">Über uns</a></Link>
          <Link href="/contact" legacyBehavior><a className="hover:underline">Kontakt</a></Link>
          <Link href="/app/impressum" legacyBehavior><a className="hover:underline">Impressum</a></Link>
          <Link href="/privacy" legacyBehavior><a className="hover:underline">Datenschutz</a></Link>
        </nav>
      </footer>
    </div>
  );
}
