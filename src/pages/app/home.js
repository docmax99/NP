
import Link from "next/link";
import Image from "next/image";
import Dropdown from '../../components/Dropdown';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAllHouses } from "../../services/houseService"; // Importiere die getAllHouses-Funktion

export default function Home() {
  // State-Variablen für die Textfelder
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [inputData, setInputData] = useState({
    destination: '',
    arrivalDate: '',
    departureDate: '',
    guests: '',
  });
  
  const [houses, setHouses] = useState([]); // State für die Liste aller Häuser
  const router = useRouter();

  // Handhabt die Änderung der Eingabefelder
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  // Handhabt die Weiterleitung zur Suchseite
  const handleSearch = () => {
    router.push({
      pathname: '/app/suchliste',
      query: { ...inputData },
    });
  };

  // Ruft alle Häuser aus der Datenbank ab, sobald die Komponente geladen wird
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const houseData = await getAllHouses(); // Hole alle Häuser aus der Datenbank
        setHouses(houseData); // Setze die Häuser im State
      } catch (error) {
        console.error("Fehler beim Abrufen der Häuser:", error);
      }
    };

    fetchHouses();
  }, []);

  return (
    <div className="flex flex-col gap-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-slate-700 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Image src="/Images/LogoNicePlaces.png" width={140} height={140} alt="Logo" className="ml-6" />
        </div>
        <Dropdown />
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center gap-8 p-6">
        {/* Search Bar */}
        <div className="w-full max-w-6xl">
          <div className="flex gap-4 border rounded-full bg-white shadow-lg p-6 items-center">
            {/* Reiseziel Input */}
            <div className="flex flex-col">
              <label htmlFor="destination" className="mb-2">Wohin?</label>
              <input
                type="text"
                id="destination"
                name="destination"
                value={inputData.destination}
                onChange={handleChange}
                placeholder="Reiseziel"
                className="border rounded-lg p-2"
              />
            </div>

            {/* Anreise Input */}
            <div className="flex flex-col">
              <label htmlFor="arrivalDate" className="mb-2">Anreise</label>
              <input
                type="date"
                id="arrivalDate"
                name="arrivalDate"
                value={inputData.arrivalDate}
                onChange={handleChange}
                placeholder="Datum"
                className="border rounded-lg p-2"
              />
            </div>

            {/* Abreise Input */}
            <div className="flex flex-col">
              <label htmlFor="departureDate" className="mb-2">Abreise</label>
              <input
                type="date"
                id="departureDate"
                name="departureDate"
                value={inputData.departureDate}
                onChange={handleChange}
                placeholder="Datum"
                className="border rounded-lg p-2"
              />
            </div>

            {/* Gäste Input */}
            <div className="flex flex-col">
              <label htmlFor="guests" className="mb-2">Wer?</label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={inputData.guests}
                onChange={handleChange}
                placeholder="Anzahl der Gäste"
                className="border rounded-lg p-2"
              />
            </div>

            {/* Suchen Button */}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              onClick={handleSearch}
            >
              Suchen
            </button>
          </div>
        </div>

        {/* Dynamische Anzeige der Häuser */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl mx-auto">
          {houses.length > 0 ? (
            houses.map((house) => (
              <div key={house.Haus_Id} className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
                <Link href={`/house/${house.Haus_Id}`}>
                  <Image
                    src={house.ImageUrl || "/Images/placeholder.png"} // Platzhalterbild, falls kein Bild vorhanden
                    width={400}
                    height={300}
                    alt={house.Titel}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                </Link>  
                <h2 className="text-lg font-semibold mt-4">{house.Titel}</h2>
                <p className="text-sm text-gray-600">{house.Beschreibung}</p>
                <Link href={`/house/${house.Haus_Id}`}>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Mehr Details
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p>Häuser werden geladen...</p>
          )}
        </div>
      </main>

      {/* Footer with Links */}
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

