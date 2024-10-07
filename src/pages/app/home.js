import { useState, useEffect, useRef, useCallback } from 'react';
import Cookies from 'js-cookie';
import { supabase } from '../../components/lib/supabaseClient';
import { FiLogIn } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { getAllHouses } from "../../services/houseService";
import Link from 'next/link';
import Dropdown from '../../components/Dropdown'; // Import Dropdown component
import Image from 'next/image';

const Header = ({ user, onAvatarClick, onLogout }) => ( // Add onLogout prop
  <header className="bg-white text-gray-800 p-6 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50 shadow-md">
    <div className="flex items-center space-x-4">
      <Image src="/Images/LogoNicePlaces.png" width={50} height={50} alt="Logo" />
    </div>
    <div className="flex items-center space-x-6">
      {user ? (
        <Image
          src={user.user_metadata?.avatar_url || "/Images/defaultAvatar.png"}
          alt="Profile Picture"
          width={40}
          height={40}
          className="rounded-full border-2 border-gray-300 hover:border-gray-500 transition duration-300 cursor-pointer"
          onClick={onAvatarClick}
        />
      ) : (
        <Link href="/app/login" passHref>
          <FiLogIn size={28} className="text-gray-800 hover:text-blue-600 transition duration-300 cursor-pointer" />
        </Link>
      )}
      <Dropdown />
    </div>
  </header>
);

const SearchBar = ({ inputData, handleChange, handleSearch }) => (
  <div className="w-full max-w-6xl">
    <div className="flex gap-4 border rounded-full bg-white shadow-lg p-6 items-center">
      {['destination', 'arrivalDate', 'departureDate', 'guests'].map((field, index) => (
        <input
          key={index}
          type={field.includes('Date') ? 'date' : field === 'guests' ? 'number' : 'text'}
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={inputData[field]}
          onChange={handleChange}
          className="flex-grow bg-gray-50 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-700 placeholder-gray-500"
        />
      ))}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  </div>
);

const FeaturedListings = ({ houses, scrollContainerRef }) => (
  <div className="w-full max-w-6xl py-8 overflow-hidden">
    <div
      className="flex gap-8 px-4 py-4 scroll-smooth snap-x snap-mandatory scroll-container"
      ref={scrollContainerRef}
      style={{
        overflowX: 'scroll',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {houses.map((house) => (
        <div
          key={house.id}
          className="group relative overflow-hidden rounded-3xl shadow-lg transform transition duration-700 hover:scale-105 hover:shadow-2xl min-w-[300px] max-w-sm snap-start"
        >
          <Link href={`/app/houseHobbit?id=${house.id}`} legacyBehavior>
            <a>
            <img
              src={house.Bild_3}
              width={400}
              height={300}
              alt={house.Title}
              className="w-full h-64 object-cover rounded-3xl"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full p-4 text-white opacity-0 group-hover:opacity-100 transition duration-500">
              <h2 className="text-xl font-bold">{house.Title}</h2>
              <p className="text-sm mt-1">{house.Beschreibung}</p>
            </div>
            </a>
            </Link>
        </div>
      ))}
    </div>
  </div>
);

const Footer = () => (
  <footer className="bg-white text-gray-800 p-8 mt-16 shadow-inner">
    <nav className="space-x-8 text-center text-lg">
      <Link href="/about" passHref>
        About Us
      </Link>
      <Link href="/contact" passHref>
        Contact
      </Link>
      <Link href="/app/impressum" passHref>
        Impressum
      </Link>
      <Link href="/privacy" passHref>
        Privacy
      </Link>
    </nav>
    <p className="text-center text-gray-500 mt-6 text-sm">&copy; 2024 Nice Places. All rights reserved.</p>
  </footer>
);

const CookieBanner = ({ showCookieBanner, onAccept }) => (
  showCookieBanner && (
    <div className="fixed bottom-0 w-full bg-gray-800 p-4 flex justify-between items-center shadow-md text-white">
      <p>This website uses cookies to enhance the user experience.</p>
      <button
        onClick={onAccept}
        className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300"
      >
        Accept
      </button>
    </div>
  )
);

export default function Home() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [user, setUser] = useState(null);
  const [houses, setHouses] = useState([]);
  const scrollContainerRef = useRef(null);
  const router = useRouter();
  const { query } = router;

  const [inputData, setInputData] = useState({
    destination: '',
    arrivalDate: '',
    departureDate: '',
    guests: '',
  });

  const handleChange = useCallback((e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }, [inputData]);

  const handleSearch = useCallback(() => {
    router.push({
      pathname: '/app/suchliste',
      query: { ...inputData },
    });
  }, [inputData, router]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const houseData = await getAllHouses();
        setHouses(houseData);
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };

    fetchHouses();
  }, []);

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

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const scrollStep = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 0.5;
      }
    };

    const interval = setInterval(scrollStep, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header user={user} onAvatarClick={() => router.push('/app/login')} onLogout={() => supabase.auth.signOut()} />
      <main className="flex-grow flex flex-col items-center gap-16 py-24 px-10 bg-gradient-to-b from-white to-gray-50">
        <SearchBar inputData={inputData} handleChange={handleChange} handleSearch={handleSearch} />
        <FeaturedListings houses={houses} scrollContainerRef={scrollContainerRef} />
      </main>
      <Footer />
      <CookieBanner showCookieBanner={showCookieBanner} onAccept={() => setShowCookieBanner(false)} />
    </div>
  );
}
