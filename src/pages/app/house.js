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
      <header className="bg-slate-700 text-white p-4 flex justify-between items-center shadow-md">
        <Link href="/app/home">
          <Image src="/Images/LogoNicePlaces.png" width={140} height={140} alt="Logo" className="ml-6" />
        </Link>
        <Dropdown />
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center gap-8 p-6 bg-gray-100">
        {/* Unterkunft Details */}
        <div className="flex flex-col sm:flex-row w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">
          <div className="w-full sm:w-1/2">
            <Image 
              src="/Images/Hobbit.png" 
              width={800} 
              height={600} 
              alt="Dreamhouse" 
              className="w-full h-96 object-cover rounded-t-xl" 
            />
          </div>
          <div className="flex flex-col justify-between p-6 sm:w-1/2">
            <h1 className="text-3xl font-bold mb-4">Dreamhouse</h1>
            <p className="text-lg mb-4 flex-1">
              Ein einzigartiges Hobbit-ähnliches Haus in den malerischen Hügeln von Mittelerde. Perfekt für einen ruhigen Rückzugsort inmitten der Natur. Es bietet atemberaubende Aussichten und moderne Annehmlichkeiten für alle Gäste.
            </p>

            {/* Zimmerbilder */}
            <div className="flex flex-col md:flex-row w-full gap-4">
              <div className="relative w-full h-48">
                <Image
                  src="/Images/HobbitPic/Room1Hobbit.png"
                  layout="fill"
                  objectFit="cover"
                  alt="Room 1 Hobbit"
                  className="rounded-lg"
                />
              </div>
              <div className="relative w-full h-48">
                <Image
                  src="/Images/HobbitPic/Room2Hobbit.png"
                  layout="fill"
                  objectFit="cover"
                  alt="Room 2 Hobbit"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Buchung und weitere Informationen */}
        <div className="bg-gray-100 flex flex-col sm:flex-row w-full max-w-4xl shadow-2xl rounded-xl p-6">
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
