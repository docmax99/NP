import Link from 'next/link'; // Importing the Link component from Next.js for client-side navigation
import { FiArrowLeft } from 'react-icons/fi'; // Importing the left arrow icon from react-icons library

const BackButton = () => {
  return (
    <div className="fixed top-4 left-4"> {/* Positioning the button fixed at the top-left corner */}
      <Link href="/app/home" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300 bg-white shadow-lg px-3 py-2 rounded-full hover:bg-blue-50 transform hover:scale-105 hover:shadow-2xl">
        {/* Link component for navigation to the home page with various styling classes for appearance and hover effects */}
        <FiArrowLeft className="text-gray-700 hover:text-blue-600" size={20} />
        {/* Left arrow icon with styling and hover effects */}
        <span className="text-lg font-semibold">Zurück</span>
        {/* Text "Zurück" (Back) with styling */}
      </Link>
    </div>
  );
};

export default BackButton; // Exporting the BackButton component as the default export
