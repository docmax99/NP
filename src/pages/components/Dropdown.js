import { useState, useEffect, useRef } from 'react';

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to open the dropdown on hover
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  // Function to close the dropdown when leaving the dropdown area
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div 
      className="relative inline-block text-left" 
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter} // Open on hover
      onMouseLeave={handleMouseLeave} // Close when mouse leaves
    >
      <button
        className="inline-flex justify-center w-32 px-4 py-2 text-lg font-semibold text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none"
      >
        Menü
        <svg
          className="ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a
              href="/app/login"
              className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Anmelden
            </a>
            <a
              href="/app/register"
              className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Registrieren
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Hilfe
            </a>
          </div>
        </div>
      )}
    </div>
  );
}


/*import { useState } from 'react';

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDropdown}
          className="inline-flex justify-center w-32 px-4 py-2 text-lg font-semibold text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none"
        >
          Menü
          <svg
            className="ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-4 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a
              href="/app/login"
              className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Anmelden
            </a>
            <a
              href="/app/register"
              className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Registrieren
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              Hilfe
            </a>
          </div>
        </div>
      )}
    </div>
  );
}*/
