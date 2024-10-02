
import Link from "next/link";
import Image from "next/image";
import Dropdown from '../../components/Dropdown';
import TextField from '../../components/TextField';
import { useState } from 'react';
import { useRouter } from 'next/router';


export default function Home() {
  // State-Variablen für die Textfelder
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  
  const [inputData, setInputData] = useState({
    destination: '',
    arrivalDate: '',
    departureDate: '',
    guests: '',
  });
  
  const router = useRouter();

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    router.push({
      pathname: '/app/suchliste',
      query: { ...inputData },
    });
  };

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

        {/* Featured Listings 3x3 Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Card Example */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
            <Link href="/app/houseHobbit">
              <Image src="/Images/HobbitPic/Hobbit.png" width={400} height={300} alt="Dreamhouse" className="w-full h-48 object-cover rounded-t-xl" />
            </Link>  
            <h2 className="text-lg font-semibold mt-4">Dreamhouse</h2>
          </div>
          {/* Weitere Cards */}
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
            <Image src="/Images/Berghaus.png" width={400} height={300} alt="BergHaus" className="w-full h-48 object-cover rounded-t-xl" />
            <h2 className="text-lg font-semibold mt-4">BergHaus</h2>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
            <Image src="/Images/Modernhouse.png" width={400} height={300} alt="Modernhouse" className="w-full h-48 object-cover rounded-t-xl" />
            <h2 className="text-lg font-semibold mt-4">Modernhouse </h2>
          </div>
          {/* Weitere Karten können hinzugefügt werden */}
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
