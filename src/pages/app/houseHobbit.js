import Link from "next/link";
import Image from "next/image";
import Dropdown from '../../components/Dropdown';
import { useState, useEffect } from 'react';
import BookingCard from "../../components/BookingCard";
import ListingInfo from "../../components/ListingInfos";
import { getAllHouses } from "../../services/houseService";

export default function Unterkunft() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [house, setHouse] = useState(null);
  const houseId = 2; // Hier kannst du die ID des Hauses manuell setzen
  const Beschreibung = house ? house.Beschreibung : 0; ;

  useEffect(() => {
    const fetchHouse = async () => {
      const houseData = await getAllHouses();
      console.log("House data", houseData);
      const selectedHouse = houseData.find(h => h.Haus_Id === houseId); // Finde das Haus basierend auf der ID
      setHouse(selectedHouse);
      console.log("Haus: " + selectedHouse);
    };

    fetchHouse();
    }, []);



  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-slate-700 text-white p-2 flex justify-between items-center shadow-md">
        <Link href="/app/home">
          <Image src="/Images/LogoNicePlaces.png" width={100} height={100} alt="Logo" className="ml-4" />
        </Link>
        <Dropdown />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center gap-4 p-2 bg-gray-100">
      <div className="text-4xl text-inherit">
          {house ? (<h1>{house.Titel}</h1>  ) : (<p>Haus wird geladen...</p>  )}
        </div>
        {/* Responsives 3x3 Grid Layout */}
        <div className="grid grid-cols-4 grid-rows-[2fr_1fr] gap-2 w-full max-w-6xl bg-white shadow-lg rounded-xl p-4">
          {/* Erstes Bild (nimmt 2 Spalten und 2 Reihen ein) */}
          <div className="col-span-2 row-span-1">
            <Image
              src="/Images/Hobbit.png"
              layout="responsive"
              width={500}  // Relative Bildgröße
              height={500}  // Relative Bildgröße
              alt="Dreamhouse"
              className="w-full object-cover rounded-xl"
            />
          </div>

          {/* Zweites Bild */}
          <div className="col-span-2 row-span-1">
            <Image
              src="/Images/HobbitPic/Room1Hobbit.png"
              layout="responsive"
              width={500}
              height={500}
              alt="Room 1 Hobbit"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Text */}
          <div className="col-span-1 row-span-1">
            <h1 className="text-lg font-bold">Dreamhouse</h1>
            <span className="text-base"> {`${Beschreibung}`} </span>
          </div>

          {/* Drittes Bild */}
          <div className="col-span-2 row-span-1">
            <Image
              src="/Images/HobbitPic/Room2Hobbit.png"
              layout="responsive"
              width={900}
              height={450}
              alt="Room 2 Hobbit"
              className="w-full aspect-[2/1] object-cover rounded-xl"
            />
          </div>

          {/* Viertes Bild */}
          <div className="col-span-1 row-span-1">
            <Image
              src="/Images/HobbitPic/Room3Hobbit.png"
              layout="responsive"
              width={900}
              height={450}
              alt="Room 3 Hobbit"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Buchung und weitere Informationen */}
        <div className="bg-gray-100 grid grid-cols-2 grid-rows-1 w-full max-w-6xl shadow-2xl rounded-xl gap-4 p-4 h-[500vh] ">
          <div className="w-full ">
            <ListingInfo house={house}/>
          </div>
          <div className="w-full  ">
            <BookingCard house={house}/>
          </div>
        </div>

        <p className="h-[500vh]">Test</p>
      </main>

      {/* Footer */}
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
