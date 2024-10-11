import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

const BackButton = () => {
  return (
    <div className="fixed top-4 left-4">
      <Link href="/app/home" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300 bg-white shadow-lg px-3 py-2 rounded-full hover:bg-blue-50 transform hover:scale-105 hover:shadow-2xl">
        <FiArrowLeft className="text-gray-700 hover:text-blue-600" size={20} />
        <span className="text-lg font-semibold">Zurück</span>
      </Link>
    </div>
  );
};

export default BackButton;
