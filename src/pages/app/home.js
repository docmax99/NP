import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { supabase } from '../../components/lib/supabaseClient';

import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import FeaturedListings from '../../components/Haus';
import Footer from '../../components/Footer';
import CookieBanner from '../../components/CookieBanner';
import { getAllHouses } from '../../services/houseService';

export default function Home() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [user, setUser] = useState(null);
  const [houses, setHouses] = useState([]);
  const scrollContainerRef = useRef(null);
  const router = useRouter();

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
