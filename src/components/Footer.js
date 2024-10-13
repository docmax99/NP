import Link from 'next/link'; // Import the Link component from Next.js for client-side navigation

// Define the Footer functional component
const Footer = () => (
  <footer className="bg-white text-gray-800 p-8 mt-16 shadow-inner">
    {/* Footer container with background color, text color, padding, margin-top, and inner shadow */}
    <nav className="space-x-8 text-center text-lg">
      {/* Navigation container with horizontal spacing between links, centered text, and large text size */}
      <Link href="/app/about" passHref>
        {/* Link to the "About Us" page */}
        Über uns
      </Link>
      <Link href="/app/contactUs" passHref>
        {/* Link to the "Contact Us" page */}
        Kontakt
      </Link>
      <Link href="/app/impressum" passHref>
        {/* Link to the "Impressum" page */}
        Impressum
      </Link>
      <Link href="/app/privacyPolicy" passHref>
        {/* Link to the "Privacy Policy" page */}
        Privatsphäre
      </Link>
    </nav>
    <p className="text-center text-gray-500 mt-6 text-sm">
      {/* Paragraph with centered text, gray color, margin-top, and small text size */}
      &copy; 2024 Nice Places. All rights reserved.
      {/* Copyright notice */}
    </p>
  </footer>
);

// Export the Footer component as the default export
export default Footer;
