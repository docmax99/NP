import Link from 'next/link';
import Header from '../../components/Header';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getAllHouses } from '../../services/houseService';
import { supabase } from '../../components/lib/supabaseClient';
import Footer from '../../components/Footer';

export default function Suchliste() {
  const router = useRouter();
  const { query } = router;
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);

  // Häuserdaten aus der Datenbank abrufen und im State speichern
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const houseData = await getAllHouses(); // Abruf der Daten aus der Datenbank
        setHouses(houseData); // Speichern der abgerufenen Daten im State
        console.log('House data:', houseData);
      } catch (error) {
        console.error('Fehler beim Abrufen der Häuserdaten:', error);
      }
    };

    fetchHouses();
  }, []);

  // Filtert die Häuserliste basierend auf den Suchkriterien
  useEffect(() => {
    const filterHouses = async () => {
      if (query.destination && query.arrivalDate && query.departureDate && query.guests) {
        // Zuerst filtern wir nach Land (Groß- und Kleinschreibung ignorieren)
        let filtered = houses.filter(
          (house) => house.Land.toLowerCase() === query.destination.toLowerCase()
        );
  
        // Filtern nach Häusern, die in dem angegebenen Zeitraum frei sind
        const availableHouses = await getAvailableHousesInDateRange(
          query.arrivalDate,
          query.departureDate
        );
  
        // Überprüfen, ob das Haus nicht in der Liste der gebuchten Häuser ist
        filtered = filtered.filter((house) =>
          availableHouses.some((availableHouse) => availableHouse.id === house.id)
        );
  
        // Filtern nach der Anzahl der Gäste (Kapazität des Hauses muss >= Gästeanzahl sein)
        filtered = filtered.filter((house) => house.Gästeanzahl >= parseInt(query.guests));
  
        setFilteredHouses(filtered);
      } else if (query.destination) {
        // Wenn nur `destination` angegeben ist, filtern wir nur nach dem Land (Groß- und Kleinschreibung ignorieren)
        const filtered = houses.filter(
          (house) => house.Land.toLowerCase() === query.destination.toLowerCase()
        );
        setFilteredHouses(filtered);
      } else {
        // Wenn kein `destination` angegeben ist, werden alle Häuser angezeigt
        setFilteredHouses(houses);
      }
    };
  
    filterHouses();
  }, [houses, query]);
  

  // Funktion zur Abfrage der Häuser, die im angegebenen Zeitraum verfügbar sind
  const getAvailableHousesInDateRange = async (arrivalDate, departureDate) => {
    try {
      // Abfrage in Supabase, um alle Buchungen zu erhalten, die mit dem Zeitraum kollidieren
      const { data, error } = await supabase
        .from('Booking')
        .select('hausId, start_date, end_date')
        .or(`and(start_date.lte.${departureDate},end_date.gte.${arrivalDate})`);

      if (error) {
        console.error('Fehler beim Abrufen der Verfügbarkeiten:', error);
        return [];
      }

      // Gebuchte Haus-IDs sammeln
      const bookedHouseIds = data.map((booking) => booking.hausId);

      // Häuser filtern, die nicht gebucht sind
      return houses.filter((house) => !bookedHouseIds.includes(house.id));
    } catch (error) {
      console.error('Fehler bei der Abfrage der verfügbaren Häuser:', error);
      return [];
    }
  };

  return (
    <div className="flex flex-col gap-8 bg-gray-100 min-h-screen">
     <Header />
      {/* Main Content */}
      <main className="flex flex-col items-center gap-8 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Dynamische Anzeige aller gefilterten Häuser aus der Datenbank */}
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
                      src={house.bilder[0]} // Bild-URL aus den Daten
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
            <p>Keine Häuser Gefunden.</p> // Falls keine Häuser in der Datenbank sind, wird dieser Text angezeigt
          )}
        </div>

        {/* Zusätzliche Informationen basierend auf den Query-Parametern */}
      
      </main>

      {/* Footer mit Links */}
      <Footer />
    </div>
  );
}
