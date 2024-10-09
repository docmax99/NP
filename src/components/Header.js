import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiLogIn } from 'react-icons/fi';
import Dropdown from './Dropdown'; // Pfad anpassen

const Header = () => {
  return (
    <header className="bg-white text-gray-800 p-6 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50 shadow-md">
      {/* Logo und Link zur Startseite */}
      <div className="flex items-center space-x-4">
        <Link href="/app/home">
          <div className="flex items-center cursor-pointer">
            <Image src="/Images/NettePlaezte_logo.svg" width={40} height={40} alt="Logo" />
            <span className="text-xl font-semibold text-gray-800 ml-2">Nette Plätze</span>
          </div>
        </Link>
      </div>

      {/* Dropdown-Menü */}
      <div className="flex items-center space-x-6">
        <Dropdown />
      </div>
    </header>
  );
};

export default Header;
