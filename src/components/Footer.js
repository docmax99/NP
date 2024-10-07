import Link from 'next/link';

const Footer = () => (
  <footer className="bg-white text-gray-800 p-8 mt-16 shadow-inner">
    <nav className="space-x-8 text-center text-lg">
      <Link href="/about" className="hover:text-blue-600 transition duration-300">About Us</Link>
      <Link href="/contact" className="hover:text-blue-600 transition duration-300">Contact</Link>
      <Link href="/app/impressum" className="hover:text-blue-600 transition duration-300">Impressum</Link>
      <Link href="/privacy" className="hover:text-blue-600 transition duration-300">Privacy</Link>
    </nav>
    <p className="text-center text-gray-500 mt-6 text-sm">&copy; 2024 Nice Places. All rights reserved.</p>
  </footer>
);

export default Footer;
