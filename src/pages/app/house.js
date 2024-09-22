import Link from "next/link";
import Image from "next/image";
import Dropdown from '../../components/Dropdown';
import { useState } from 'react';
import BookingCard from "../../components/BookingCard";
import ListingInfo from "../../components/ListingInfos";

export default function Unterkunft() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);

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
        <h1 className="text-4xl text-inherit"> Dreamhouse </h1>
        {/* Responsives 3x3 Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 w-full max-w-6xl bg-white shadow-lg rounded-xl p-4">
          {/* Erstes Bild (nimmt 2 Spalten und 2 Reihen ein) */}
          <div className="col-span-2 row-span-2">
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
          <div className="md:col-span-2 md:row-span-2 sm:col-span-1 lg:col-span-2">
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
          <div className="md:col-span-2 md:row-span-1 flex flex-col justify-between p-2  rounded-xl">
            <h1 className="text-lg font-bold">Dreamhouse</h1>
            <p className="text-sm">
              Ein einzigartiges Hobbit-ähnliches Haus in den malerischen Hügeln von Mittelerde. Perfekt für einen ruhigen Rückzugsort inmitten der Natur.
            </p>
          </div>

          {/* Drittes Bild */}
          <div className="md:col-span-1 md:row-span-2 sm:col-span-1">
            <Image
              src="/Images/HobbitPic/Room2Hobbit.png"
              layout="responsive"
              width={900}
              height={450}
              alt="Room 2 Hobbit"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          {/* Viertes Bild */}
          <div className="md:col-span-1 md:row-span-2 sm:col-span-1">
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
        <div className="bg-gray-100 flex flex-col sm:flex-row w-full max-w-6xl shadow-2xl rounded-xl p-4">
          <div className="w-full sm:w-1/2">
            <ListingInfo />
          </div>
          <div className="w-full sm:w-1/2">
            <BookingCard />
          </div>
        </div>
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
