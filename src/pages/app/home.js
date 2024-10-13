import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { getAllHouses } from "@services/houseService";
import Header from '@components/Header';
import SearchBar from '@components/SearchBar';
import FeaturedListings from '@components/featuredListings';
import Footer from '@components/Footer';
import CookieBanner from '@components/CookieBanner';

export default function Home() {
  // State to store the list of houses
  const [houses, setHouses] = useState([]);
  
  // Reference for the scroll container element
  const scrollContainerRef = useRef(null);
  
  // Router instance from Next.js for navigation
  const router = useRouter();
  
  // State to store the input data from the search bar
  const [inputData, setInputData] = useState({
    destination: '',
    arrivalDate: '',
    departureDate: '',
    guests: '',
  });

  // Handler for input changes in the search bar
  const handleChange = useCallback((e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }, [inputData]);

  // Handler for the search button click
  const handleSearch = useCallback(() => {
    router.push({
      pathname: '/app/suchliste',
      query: { ...inputData },
    });
  }, [inputData, router]);

  // Fetch the list of houses when the component mounts
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

  // Automatic scrolling in the Featured Listings section
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

      {/* Main content with search bar and featured listings */}
      <main className="flex-grow flex flex-col items-center gap-16 py-24 px-10 bg-gradient-to-b from-white to-gray-50">
        <SearchBar inputData={inputData} handleChange={handleChange} handleSearch={handleSearch} />
        <FeaturedListings houses={houses} scrollContainerRef={scrollContainerRef} />
      </main>
      
      {/* Cookie Banner */}
      <CookieBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
}
