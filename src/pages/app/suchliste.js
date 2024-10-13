import Link from 'next/link';
import Header from '@components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAllHouses } from '@services/houseService';
import { supabase } from '@components/lib/supabaseClient';
import Footer from '@components/Footer';

export default function Suchliste() {
  const router = useRouter();
  const { query } = router; // Extract query parameters from the URL
  const [houses, setHouses] = useState([]); // State to store all houses
  const [filteredHouses, setFilteredHouses] = useState([]); // State to store filtered houses

  // Fetch house data from the database and store it in the state
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const houseData = await getAllHouses(); // Fetch data from the database
        setHouses(houseData); // Store fetched data in the state
        console.log('House data:', houseData);
      } catch (error) {
        console.error('Error fetching house data:', error);
      }
    };

    fetchHouses();
  }, []);

  // Filter the house list based on search criteria
  useEffect(() => {
    const filterHouses = async () => {
      if (query.destination && query.arrivalDate && query.departureDate && query.guests) {
        // First, filter by country (case insensitive)
        let filtered = houses.filter(
          (house) => house.Land.toLowerCase() === query.destination.toLowerCase()
        );
  
        // Filter houses that are available in the specified date range
        const availableHouses = await getAvailableHousesInDateRange(
          query.arrivalDate,
          query.departureDate
        );
  
        // Check if the house is not in the list of booked houses
        filtered = filtered.filter((house) =>
          availableHouses.some((availableHouse) => availableHouse.id === house.id)
        );
  
        // Filter by the number of guests (house capacity must be >= number of guests)
        filtered = filtered.filter((house) => house.Gästeanzahl >= parseInt(query.guests));
  
        setFilteredHouses(filtered);
      } else if (query.destination) {
        // If only `destination` is specified, filter by country (case insensitive)
        const filtered = houses.filter(
          (house) => house.Land.toLowerCase() === query.destination.toLowerCase()
        );
        setFilteredHouses(filtered);
      } else {
        // If no `destination` is specified, display all houses
        setFilteredHouses(houses);
      }
    };
  
    filterHouses();
  }, [houses, query]);
  

  // Function to query houses that are available in the specified date range
  const getAvailableHousesInDateRange = async (arrivalDate, departureDate) => {
    try {
      // Query Supabase to get all bookings that collide with the date range
      const { data, error } = await supabase
        .from('Booking')
        .select('hausId, start_date, end_date')
        .or(`and(start_date.lte.${departureDate},end_date.gte.${arrivalDate})`);

      if (error) {
        console.error('Error fetching availability:', error);
        return [];
      }

      // Collect booked house IDs
      const bookedHouseIds = data.map((booking) => booking.hausId);

      // Filter houses that are not booked
      return houses.filter((house) => !bookedHouseIds.includes(house.id));
    } catch (error) {
      console.error('Error querying available houses:', error);
      return [];
    }
  };

  return (
    <div className="flex flex-col gap-8 bg-gray-100 min-h-screen">
      <Header />
      {/* Main Content */}
      <main className="flex flex-col items-center gap-8 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Dynamically display all filtered houses from the database */}
          {filteredHouses.length > 0 ? (
            filteredHouses.map((house) => (
              <div
                key={house.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl"
              >
                <Link
                  href={{
                    pathname: `/app/Unterkunft`,
                    query: {
                      id: house.id,
                      arrivalDate: query.arrivalDate,
                      departureDate: query.departureDate,
                      guests: query.guests,
                    },
                  }}
                  legacyBehavior
                >
                  <a>
                    <img
                      src={house.bilder[0]} // Image URL from the data
                      width={400}
                      height={300}
                      alt={house.Titel}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                  </a>
                </Link>
                <h2 className="text-lg font-semibold mt-4">{house.Titel}</h2>
              </div>
            ))
          ) : (
            <p>No houses found.</p> // Display this text if no houses are found in the database
          )}
        </div>

        {/* Additional information based on query parameters */}
      
      </main>

      {/* Footer with links */}
      <Footer />
    </div>
  );
}
