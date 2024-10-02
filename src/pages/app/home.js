import Link from "next/link";
import Image from "next/image";
import TextField from '../../components/TextField';
import Dropdown from '../../components/Dropdown';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../components/lib/supabaseClient';
import Cookies from 'js-cookie';
import { FiLogIn } from 'react-icons/fi';

export default function Home() {
  const [destination, setDestination] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [guests, setGuests] = useState('');
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

  const handleSearch = () => {
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
        <div className="w-full max-w-4xl bg-white p-4 rounded-full shadow-lg border border-gray-200 flex items-center gap-4">
          <TextField
            label=""
            placeholder="Reiseziel"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="flex-grow bg-gray-50 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-700 placeholder-gray-500"
          />
          <TextField
            label=""
            placeholder="Anreise"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="flex-grow bg-gray-50 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-700 placeholder-gray-500"
          />
          <TextField
            label=""
            placeholder="Abreise"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="flex-grow bg-gray-50 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-700 placeholder-gray-500"
          />
          <TextField
            label=""
            placeholder="Anzahl der Gäste"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="flex-grow bg-gray-50 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-700 placeholder-gray-500"
          />
          <button
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full hover:shadow-xl transition duration-300 transform hover:scale-105"
            onClick={handleSearch}
          >
            Suchen
          </button>
        </div>

        {/* Featured Listings - Infinite Horizontal Scroll */}
        <div className="w-full max-w-6xl py-8 overflow-hidden">
          <div
            className="flex gap-8 px-4 py-4 scroll-smooth snap-x snap-mandatory scroll-container"
            ref={scrollContainerRef}
            style={{
              overflowX: 'scroll', // Allow horizontal scrolling
              scrollbarWidth: 'none', // Hide scrollbar for Firefox
              msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
            }}
          >
            {houseData.concat(houseData).map((house, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-lg transform transition duration-700 hover:scale-105 hover:shadow-2xl min-w-[300px] max-w-sm snap-start"
              >
                <Link href={`/app/house${house.title.replace(' ', '')}`}>
                  <Image
                    src={house.src}
                    width={400}
                    height={300}
                    alt={house.title}
                    className="w-full h-64 object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 text-white opacity-0 group-hover:opacity-100 transition duration-500">
                    <h2 className="text-xl font-bold">{house.title}</h2>
                    <p className="text-sm mt-1">{house.description}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
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
