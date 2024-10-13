import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiLogIn, FiLogOut } from 'react-icons/fi';
import Dropdown from './Dropdown'; // Pfad anpassen
import { supabase } from '@lib/supabaseClient'; // Supabase-Client importieren

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Zustand für Login-Status
  const [profileImageUrl, setProfileImageUrl] = useState(null); // Zustand für das Profilbild
  const [userId, setUserId] = useState(null); // Zustand für die richtige User-ID

  // Check if user is logged in and get profile image URL
  useEffect(() => {
    const checkUserSession = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session data:', error);
        return;
      }

      const authUser = sessionData?.session?.user;

      if (authUser) {
        setIsLoggedIn(true);

        // Hole die korrekte User-ID aus der `public.User` Tabelle basierend auf der Authentifizierungs-E-Mail
        const { data: userData, error: userError } = await supabase
          .from('User')
          .select('id') // Hole nur die ID
          .eq('Email', authUser.email) // E-Mail muss übereinstimmen
          .single(); // Wir erwarten nur einen Benutzer

        if (userError || !userData) {
          console.error('Error fetching user from public.User table:', userError);
          return;
        }

        setUserId(userData.userId); // Speichern der korrekten User-ID

        // Generiere die URL basierend auf der korrekten User-ID
        const { data, error: imageUrlError } = await supabase
          .storage
          .from('Users')
          .getPublicUrl(`${userData.id}Profilepic`);

        if (imageUrlError) {
          console.error('Error fetching profile image URL:', imageUrlError);
        } else {
          console.log('Generated profile image URL:', data.publicUrl); // Debugging der URL
          setProfileImageUrl(data.publicUrl); // Hier wird die URL gesetzt
        }
      }
    };
    checkUserSession();
  }, []);

  // Logout-Funktion
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false); // Zustand zurücksetzen nach dem Logout
    window.location.href = '/app/login'; // Weiterleitung zur Login-Seite nach dem Logout
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50 shadow-lg">
      {/* Logo und Link zur Startseite */}
      <div className="flex items-center space-x-4">
        <Link href="/app/home">
          <div className="flex items-center cursor-pointer">
            <img src="/Images/NettePlaezte_logo.svg" width={35} height={35} alt="Logo" />
            <span className="text-2xl font-bold text-white ml-2">Nette Plätze</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center space-x-8">
        <Link href="/app/suchliste">
          <span className="text-lg font-semibold hover:text-indigo-200 transition duration-300">Entdecken</span>
        </Link>
        <Link href="/app/about">
          <span className="text-lg font-semibold hover:text-indigo-200 transition duration-300">Über uns</span>
        </Link>
      </nav>

      {/* Login/Logout Symbol, Profilbild und Dropdown-Menü */}
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
