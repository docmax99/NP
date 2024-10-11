import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../../components/lib/supabaseClient';
import { useRouter } from 'next/router';
import { getAllHouses } from "../../services/houseService";
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import FeaturedListings from '../../components/featuredListings';
import Footer from '../../components/Footer';
import CookieBanner from '../../components/CookieBanner';

export default function Home() {
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

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <Header />

      {/* Hauptinhalt mit Suchleiste und Featured Listings */}
      <main className="flex-grow flex flex-col items-center gap-16 py-24 px-10 bg-gradient-to-b from-white to-gray-50">
        <SearchBar inputData={inputData} handleChange={handleChange} handleSearch={handleSearch} />
        <FeaturedListings houses={houses} scrollContainerRef={scrollContainerRef} />
      </main>
      <CookieBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
}
