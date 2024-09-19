import Link from "next/link";
import Image from "next/image";
import Dropdown from '../components/Dropdown';
import TextField from '../components/TextField';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-slate-700 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/Images/LogoNicePlaces.png" width={140} height={140} alt="Logo" className="ml-6" />
          <h1 className="text-2xl ml-4 font-bold">Nice Places</h1>
        </div>
        <nav className="space-x-4">
          <Link href="/about">Über uns</Link>
          <Link href="/contact">Kontakt</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/privacy">Datenschutz</Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-8 p-6">
        {/* Search Bar */}
        <div className="flex justify-center">
          <div className="flex gap-4 border rounded-xl bg-white shadow-lg p-4">
            <TextField label="Wohin?" placeholder="Reiseziel" />
            <TextField label="Anreise" placeholder="Datum" />
            <TextField label="Abreise" placeholder="Datum" />
            <TextField label="Wer?" placeholder="Anzahl der Gäste" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Suchen</button>
            <Dropdown />
          </div>
        </div>

        {/* Featured Listings */}
        <div className="flex justify-center gap-6">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <Image src="/Images/Hobbit.png" width={400} height={300} alt="Dreamhouse" className="w-full h-48 object-cover" />
            <h2 className="text-lg font-semibold p-4">Dreamhouse</h2>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <Image src="/Images/Berghaus.png" width={400} height={300} alt="BergHaus" className="w-full h-48 object-cover" />
            <h2 className="text-lg font-semibold p-4">BergHaus</h2>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden">
            <Image src="/Images/Modernhouse.png" width={400} height={300} alt="Modernhouse" className="w-full h-48 object-cover" />
            <h2 className="text-lg font-semibold p-4">Modernhouse</h2>
          </div>
        </div>

        {/* Additional Content */}
        <div className="flex gap-4 mt-8">
          <div className="bg-red-400 w-1/3 h-64 mr-2 ml-4 rounded-3xl">
            <Image src="/Images/Hobbit.png" width={140} height={140} alt="Dreamhouse" className="w-full h-full object-cover rounded-3xl" />
          </div>
          <div className="bg-yellow-300 w-1/3 h-64 mr-2 ml-4 rounded-3xl">
            <Image src="/Images/Berghaus.png" width={140} height={140} alt="BergHaus" className="w-full h-full object-cover rounded-3xl" />
          </div>
          <div className="bg-green-400 w-1/3 h-64 mr-4 ml-2 rounded-3xl">
            <Image src="/Images/Modernhouse.png" width={140} height={140} alt="Modernhouse" className="w-full h-full object-cover rounded-3xl" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white p-4">
        <div className="container mx-auto flex justify-between">
          <div>
            <h3 className="font-bold text-lg">Rechtliche Informationen</h3>
            <ul>
              <li><Link href="/app/impressum">Impressum</Link></li>
              <li><Link href="/app/privacy">Datenschutz</Link></li>
              <li><Link href="/app/terms">AGBs</Link></li>
            </ul>
          </div>
          <div>
            <p>© 2024 Nice Places. Alle Rechte vorbehalten.</p>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      <div className="fixed bottom-0 w-full bg-gray-200 p-4 flex justify-between items-center shadow-lg">
        <p>Diese Website verwendet Cookies, um die Benutzererfahrung zu verbessern.</p>
        <Link href="/impressum">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Impressum</button>
        </Link>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Akzeptieren</button>
      </div>
    </div>
  );
}
