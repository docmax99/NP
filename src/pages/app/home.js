import { useState, useEffect, useRef, useCallback } from 'react';
import Cookies from 'js-cookie';
import { supabase } from '../../components/lib/supabaseClient';
import { useRouter } from 'next/router';
import { getAllHouses } from "../../services/houseService";
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import FeaturedListings from '../../components/FeaturedListings';
import Footer from '../../components/Footer';
import CookieBanner from '../../components/CookieBanner';

export default function Home() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);  // Zustand für Cookie-Banner
  const [user, setUser] = useState(null);  // Zustand für eingeloggten Benutzer
  const [houses, setHouses] = useState([]);  // Zustand für die Liste der Häuser
  const scrollContainerRef = useRef(null);  // Referenz für das Scroll-Container-Element
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

  // Funktion zum Abrufen der Häuser
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

  // Funktion zur Wiederherstellung der Benutzer-Session über Cookies
  useEffect(() => {
    // Prüfe, ob Access-Token und Refresh-Token in den Cookies vorhanden sind
    const accessToken = Cookies.get('sb-access-token');
    const refreshToken = Cookies.get('sb-refresh-token');

    if (accessToken && refreshToken) {
      // Setze die Session basierend auf den gespeicherten Cookies
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })
      .then(({ data, error }) => {
        if (error) {
          console.error('Fehler beim Wiederherstellen der Sitzung:', error);
        } else {
          setUser(data.user);  // Benutzer im Zustand speichern, wenn die Sitzung wiederhergestellt wurde
        }
      })
      .catch((err) => {
        console.error('Unerwarteter Fehler bei der Sitzung:', err);
      });

      // Authentifizierungsstatus-Listener
      const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);
      });

      // Aufräumfunktion bei Verlassen der Komponente
      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  // Automatischer Bildlauf in der Featured Listings Sektion
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

  // Funktion zum Verwalten des Cookie-Banners
  useEffect(() => {
    // Überprüfen, ob der Benutzer das Cookie-Banner bereits akzeptiert hat
    const cookieBannerAccepted = Cookies.get('cookie-banner-accepted');
    if (cookieBannerAccepted) {
      setShowCookieBanner(false);  // Cookie-Banner nicht anzeigen, wenn es bereits akzeptiert wurde
    }
  }, []);

  // Funktion, um Cookie-Banner zu akzeptieren und den Status in einem Cookie zu speichern
  const handleCookieAccept = () => {
    Cookies.set('cookie-banner-accepted', 'true', { expires: 365 });  // Cookie für 1 Jahr setzen
    setShowCookieBanner(false);  // Cookie-Banner ausblenden
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header mit Benutzerstatus und Logout-Option */}
      <Header user={user} onAvatarClick={() => router.push('/app/login')} onLogout={() => supabase.auth.signOut()} />

      {/* Hauptinhalt mit Suchleiste und Featured Listings */}
      <main className="flex-grow flex flex-col items-center gap-16 py-24 px-10 bg-gradient-to-b from-white to-gray-50">
        <SearchBar inputData={inputData} handleChange={handleChange} handleSearch={handleSearch} />
        <FeaturedListings houses={houses} scrollContainerRef={scrollContainerRef} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Cookie-Banner, nur anzeigen, wenn es noch nicht akzeptiert wurde */}
      {showCookieBanner && (
        <CookieBanner showCookieBanner={showCookieBanner} onAccept={handleCookieAccept} />
      )}
    </div>
  );
}
