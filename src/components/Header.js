import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import Dropdown from '@components/Dropdown';
import { supabase } from '@lib/supabaseClient';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    const checkUserSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const user = sessionData?.session?.user;

      if (user) {
        setIsLoggedIn(true);

        // Hole die korrekte User-ID aus der "User"-Tabelle
        const { data: userData, error } = await supabase
          .from('User')
          .select('id')
          .eq('Email', user.email)
          .single();

        if (error) {
          console.error('Fehler beim Abrufen der User-ID:', error.message);
          return;
        }

        // Verwende die User-ID, um das Profilbild abzurufen
        const { data: imageUrl, error: imageError } = await supabase
          .storage
          .from('Users')
          .getPublicUrl(`${userData.id}Profilepic`);

        if (imageError) {
          console.error('Fehler beim Abrufen der Bild-URL:', imageError.message);
          return;
        }

        setProfileImageUrl(imageUrl.publicUrl);
      }
    };
    checkUserSession();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    window.location.href = '/app/login';
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center space-x-4">
        <Link href="/app/home">
          <div className="flex items-center cursor-pointer">
            <Image src="/Images/NettePlaezte_logo.svg" width={35} height={35} alt="Logo" />
            <span className="text-2xl font-bold text-white ml-2">Nette Plätze</span>
          </div>
        </Link>
      </div>

      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/app/suchliste">
          <span className="text-lg font-semibold hover:text-indigo-200 transition duration-300">Entdecken</span>
        </Link>
        <Link href="/app/about">
          <span className="text-lg font-semibold hover:text-indigo-200 transition duration-300">Über uns</span>
        </Link>
      </nav>

      <div className="flex items-center space-x-6">
        {isLoggedIn ? (
          <>
            <div
              className="flex items-center text-lg hover:text-indigo-200 transition duration-300 cursor-pointer"
              onClick={handleLogout}
            >
              <FiLogOut className="mr-2" size={24} />
              <span>Logout</span>
            </div>
            {profileImageUrl && (
              <div className="flex items-center">
                <img
                  src={profileImageUrl}
                  alt="Profilbild"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
            )}
          </>
        ) : (
          <Link href="/app/login">
            <div className="flex items-center text-lg hover:text-indigo-200 transition duration-300 cursor-pointer">
              <FiLogIn className="mr-2" size={24} />
              <span>Login</span>
            </div>
          </Link>
        )}
        <Dropdown />
      </div>
    </header>
  );
};

export default Header;
