import Link from "next/link";
import Image from "next/image";
import Dropdown from '../../components/Dropdown';
import { useState, useEffect, useRef, useEffect } from 'react';
import { supabase } from '../../components/lib/supabaseClient';
import Cookies from 'js-cookie';
import { FiLogIn } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { getAllHouses } from "../../services/houseService"; // Importiere die getAllHouses-Funktion

export default function Home() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [user, setUser] = useState(null);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const accessToken = Cookies.get('sb-access-token');
    const refreshToken = Cookies.get('sb-refresh-token');

    if (accessToken && refreshToken) {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error('Error setting session:', error);
        } else {
          setUser(data.user);
        }
      })
      .catch((err) => {
        console.error('Unexpected error:', err);
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

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
    window.location.href = '/app/suchliste';
  };

  // House data
  const houseData = [
    { src: "/Images/HobbitPic/Hobbit.png", title: "Dreamhouse", description: "Ein ruhiges kleines Paradies, ideal für Naturliebhaber." },
    { src: "/Images/Berghaus.png", title: "BergHaus", description: "Perfekt für Bergliebhaber mit atemberaubender Aussicht." },
    { src: "/Images/Modernhouse.png", title: "Modernhouse", description: "Modernes Design für den luxuriösen Aufenthalt." },
  ];

  useEffect(() => {
    // Infinite conveyor belt effect with manual scrolling enabled
    const scrollContainer = scrollContainerRef.current;

    const scrollStep = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 0.5; // Adjust to control speed (smooth and slow)
      }
    };

    const interval = setInterval(scrollStep, 10); // Adjust interval for smoother scrolling (lower interval for smooth effect)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Header */}
      <header className="bg-gray-100 text-gray-800 p-6 flex justify-between items-center border-b border-gray-300 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center space-x-4">
          <Image src="/Images/LogoNicePlaces.png" width={50} height={50} alt="Logo" />
        </div>
        <div className="flex items-center space-x-6">
          {user ? (
            <Image
              src={user.user_metadata?.avatar_url || "/Images/defaultAvatar.png"}
              alt="Profilbild"
              width={40}
              height={40}
              className="rounded-full border-2 border-gray-300 hover:border-gray-500 transition duration-300 cursor-pointer"
              onClick={() => window.location.href = '/app/login'} // Redirect to login page when avatar is clicked
            />
          ) : (
            <Link href="/app/login">
              <FiLogIn size={28} className="text-gray-800 hover:text-blue-600 transition duration-300 cursor-pointer" />
            </Link>
          )}
          <Dropdown />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center gap-16 py-24 px-10 bg-gradient-to-b from-white to-gray-100">
        {/* Search Bar */}
        <div className="w-full max-w-6xl">
          <div className="flex gap-4 border rounded-full bg-white shadow-lg p-6 items-center">
            <TextField
              label="Wohin?"
              placeholder="  Reiseziel"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <TextField
              label="Anreise"
              placeholder="  Datum"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
            />
            <TextField
              label="Abreise"
              placeholder="  Datum"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
            />
            <TextField
              label="Wer?"
              placeholder="  Anzahl der Gäste"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={handleSearch}
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
            <h2 className="text-lg font-semibold mt-4">Modernhouse</h2>
          </div>
          {/* Weitere Karten können hinzugefügt werden */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-800 p-8 mt-16 shadow-inner">
        <nav className="space-x-8 text-center text-lg">
          <Link href="/about" className="hover:text-blue-600 transition duration-300">Über uns</Link>
          <Link href="/contact" className="hover:text-blue-600 transition duration-300">Kontakt</Link>
          <Link href="/app/impressum" className="hover:text-blue-600 transition duration-300">Impressum</Link>
          <Link href="/privacy" className="hover:text-blue-600 transition duration-300">Datenschutz</Link>
        </nav>
        <p className="text-center text-gray-500 mt-6 text-sm">&copy; 2024 Nice Places. Alle Rechte vorbehalten.</p>
      </footer>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 w-full bg-gray-800 p-4 flex justify-between items-center shadow-md text-white">
          <p>Diese Website verwendet Cookies, um die Benutzererfahrung zu verbessern.</p>
          <button
            onClick={() => setShowCookieBanner(false)}
            className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300"
          >
            Akzeptieren
          </button>
        </div>
      )}
    </div>
  );
}

