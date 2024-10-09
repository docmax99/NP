import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiLogIn } from 'react-icons/fi';
import Dropdown from './Dropdown'; // Pfad anpassen

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      {/* Logo und Link zur Startseite */}
      <div className="flex items-center space-x-4">
        <Link href="/app/home">
          <div className="flex items-center cursor-pointer">
            <Image src="/Images/NettePlaezte_logo.svg" width={35} height={35} alt="Logo" />
            <span className="text-2xl font-bold text-white ml-2">Nette Plätze</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/app/explore">
          <span className="text-lg font-semibold hover:text-indigo-200 transition duration-300">Entdecken</span>
        </Link>
        <Link href="/app/about">
          <span className="text-lg font-semibold hover:text-indigo-200 transition duration-300">Über uns</span>
        </Link>
      </nav>

      {/* Login Symbol und Dropdown-Menü */}
      <div className="flex items-center space-x-6">
        <Link href="/app/login">
          <div className="flex items-center text-lg hover:text-indigo-200 transition duration-300 cursor-pointer">
            <FiLogIn className="mr-2" size={24} />
            <span>Login</span>
          </div>
        </Link>
        <Dropdown />
      </div>
    </header>
  );
};

export default Header;
