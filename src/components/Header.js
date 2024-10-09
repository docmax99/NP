import Image from 'next/image';
import Link from 'next/link';
import { FiLogIn } from 'react-icons/fi';
import Dropdown from './Dropdown'; // Adjust path if necessary

const Header = ({ user, onAvatarClick, onLogout }) => (
  <header className="bg-white text-gray-800 p-6 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50 shadow-md">
    <div className="flex items-center space-x-4">
      <Image src="/Images/LogoNicePlaces.png" width={50} height={50} alt="Logo" />
    </div>
    <div className="flex items-center space-x-6">
      {user ? (
        <Image
          src={user.Profilbild}
          alt="Profile Picture"
          width={40}
          height={40}
          className="rounded-full border-2 border-gray-300 hover:border-gray-500 transition duration-300 cursor-pointer"
          onClick={onAvatarClick}
        />
      ) : (
        <Link href="/app/login" passHref>
          <FiLogIn size={28} className="text-gray-800 hover:text-blue-600 transition duration-300 cursor-pointer" />
        </Link>
      )}
      <Dropdown />
    </div>
  </header>
);

export default Header;
