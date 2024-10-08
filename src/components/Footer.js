import Link from 'next/link';

const Footer = () => (
  <footer className="bg-white text-gray-800 p-8 mt-16 shadow-inner">
    <nav className="space-x-8 text-center text-lg">
      <Link href="/about" passHref>
        About Us
      </Link>
      <Link href="/contact" passHref>
        Contact
      </Link>
      <Link href="/app/impressum" passHref>
        Impressum
      </Link>
      <Link href="/privacy" passHref>
        Privacy
      </Link>
    </nav>
    <p className="text-center text-gray-500 mt-6 text-sm">&copy; 2024 Nice Places. All rights reserved.</p>
  </footer>
);

export default Footer;
