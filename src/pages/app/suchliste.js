import Link from "next/link";
import Image from "next/image";
import Dropdown from '../../components/Dropdown';
import TextField from '../../components/TextField';
import { useState } from 'react';

export default function UserList({destination, arrivalDate, departureDate, guests}) {
 


  return (
    
    <div className="flex flex-col gap-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-slate-700 text-white p-4 flex justify-between items-center shadow-md">
        <div className="flex items-center">
          <Link href="/app/home">
            <Image src="/Images/LogoNicePlaces.png" width={140} height={140} alt="Logo" className="ml-6" />
          </Link>
        </div>
        <Dropdown />
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center gap-8 p-6">
        <p></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
            <Link href="/app/houseHobbit">
            <Image src="/Images/HobbitPic/Hobbit.png" width={400} height={300} alt="Dreamhouse" className="w-full h-48 object-cover rounded-t-xl" />
            </Link>  
            <h2 className="text-lg font-semibold mt-4">Dreamhouse</h2>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
            <Image src="/Images/Berghaus.png" width={400} height={300} alt="BergHaus" className="w-full h-48 object-cover rounded-t-xl" />
            <h2 className="text-lg font-semibold mt-4">BergHaus</h2>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
            <Image src="/Images/Modernhouse.png" width={400} height={300} alt="Modernhouse" className="w-full h-48 object-cover rounded-t-xl" />
            <h2 className="text-lg font-semibold mt-4">Modernhouse</h2>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
            <Image src="/Images/Hobbit.png" width={400} height={300} alt="Dreamhouse" className="w-full h-48 object-cover rounded-t-xl" />
            <h2 className="text-lg font-semibold mt-4">Dreamhouse</h2>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
            <Image src="/Images/Berghaus.png" width={400} height={300} alt="BergHaus" className="w-full h-48 object-cover rounded-t-xl" />
            <h2 className="text-lg font-semibold mt-4">BergHaus</h2>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
            <Image src="/Images/Modernhouse.png" width={400} height={300} alt="Modernhouse" className="w-full h-48 object-cover rounded-t-xl" />
            <h2 className="text-lg font-semibold mt-4">Modernhouse</h2>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
            <Image src="/Images/Hobbit.png" width={400} height={300} alt="Dreamhouse" className="w-full h-48 object-cover rounded-t-xl" />
            <h2 className="text-lg font-semibold mt-4">Dreamhouse</h2>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
            <Image src="/Images/Berghaus.png" width={400} height={300} alt="BergHaus" className="w-full h-48 object-cover rounded-t-xl" />
            <h2 className="text-lg font-semibold mt-4">BergHaus</h2>
          </div>
          <div className="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col items-center p-4 hover:shadow-xl">
            <Image src="/Images/Modernhouse.png" width={400} height={300} alt="Modernhouse" className="w-full h-48 object-cover rounded-t-xl" />
            <h2 className="text-lg font-semibold mt-4">Modernhouse</h2>
          </div>
        </div>
      </main>

      {/* Footer with Links */}
      <footer className="bg-black text-white p-4">
        <nav className="space-x-4 text-center">
          <Link href="/about" className="hover:underline">Über uns</Link>
          <Link href="/contact" className="hover:underline">Kontakt</Link>
          <Link href="/app/impressum" className="hover:underline">Impressum</Link>
          <Link href="/privacy" className="hover:underline">Datenschutz</Link>
        </nav>
      </footer>

    </div>
   
  );
}
