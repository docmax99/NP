import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import Dropdown from './Dropdown';
import { FiLogIn } from 'react-icons/fi';

const Header = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState("/Images/defaultAvatar.png"); // Default Avatar als Standardbild
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setUser(session.user);
        fetchProfileImage(session.user.id);
      } else {
        setLoading(false);
      }
    };

    getSession();

    const {
      data: authListener,
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchProfileImage(session.user.id);
      } else {
        setUser(null);
        setProfileImage("/Images/defaultAvatar.png");
      }
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const fetchProfileImage = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('User')
        .select('Profilbild')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile image:', error);
      } else if (data?.Profilbild) {
        setProfileImage(data.Profilbild);
      }
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  const handleAvatarClick = async () => {
    if (user) {
      await supabase.auth.signOut();
      setUser(null);
      setProfileImage("/Images/defaultAvatar.png");
    } else {
      window.location.href = '/app/login';
    }
  };

  if (loading) {
    return (
      <header className="bg-white text-gray-800 p-6 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50 shadow-md">
        <div className="flex items-center space-x-4">
          <Image src="/Images/LogoNicePlaces.png" width={50} height={50} alt="Logo" />
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white text-gray-800 p-6 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50 shadow-md">
      <div className="flex items-center space-x-4">
        <Image src="/Images/LogoNicePlaces.png" width={50} height={50} alt="Logo" />
      </div>
      <div className="flex items-center space-x-6">
        {user ? (
          <div className="flex items-center space-x-4">
            <Image
              src={profileImage}
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-full border-2 border-gray-300 hover:border-gray-500 transition duration-300 cursor-pointer"
              onClick={handleAvatarClick}
              onError={() => setProfileImage("/Images/defaultAvatar.png")} // Fallback zu default Avatar, falls Bild nicht geladen werden kann
            />
          </div>
        ) : (
          <FiLogIn
            size={28}
            className="text-gray-800 hover:text-blue-600 transition duration-300 cursor-pointer"
            onClick={handleAvatarClick}
          />
        )}
        <Dropdown />
      </div>
    </header>
  );
};

export default Header;
