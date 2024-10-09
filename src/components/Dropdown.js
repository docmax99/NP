import { useState, useEffect, useRef } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import { supabase } from './lib/supabaseClient';

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Zustand für Login-Status
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const firstMenuItemRef = useRef(null);

  // Check if user is logged in
  useEffect(() => {
    const checkUserSession = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      setIsLoggedIn(!!sessionData.session); // Setzt den Zustand basierend auf der Session
    };
    checkUserSession();
  }, []);

  // Toggle dropdown open/close
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown
  const closeDropdown = () => {
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isOpen) {
        switch (event.key) {
          case 'Escape':
            closeDropdown();
            buttonRef.current.focus();
            break;
          case 'ArrowDown':
            event.preventDefault();
            firstMenuItemRef.current?.focus();
            break;
          default:
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Handle focus trap within dropdown
  const handleMenuKeyDown = (event, currentIndex, totalItems) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const nextIndex = (currentIndex + 1) % totalItems;
      document.getElementById(`menu-item-${nextIndex}`)?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
      document.getElementById(`menu-item-${prevIndex}`)?.focus();
    } else if (event.key === 'Tab') {
      closeDropdown();
    }
  };

  const menuItems = [
    { href: '/app/register', label: 'Registrieren' },
    { href: '#', label: 'Hilfe' },
  ];

  // Falls eingeloggt, füge die Option "Haus erstellen" hinzu
  if (isLoggedIn) {
    menuItems.unshift({ href: '/app/insert-house', label: 'Haus erstellen' });
  }

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className="inline-flex items-center justify-center w-10 h-10 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <FiMoreVertical size={24} aria-hidden="true" />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 origin-top-right transform opacity-0 scale-95 animate-dropdown"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                id={`menu-item-${index}`}
                ref={index === 0 ? firstMenuItemRef : null}
                className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                role="menuitem"
                tabIndex="0"
                onKeyDown={(e) => handleMenuKeyDown(e, index, menuItems.length)}
                onClick={closeDropdown}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
