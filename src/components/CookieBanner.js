// CookieBanner component definition, which takes in two props: showCookieBanner and onAccept
const CookieBanner = ({ showCookieBanner, onAccept }) => (
  // If showCookieBanner is true, render the banner
  showCookieBanner && (
    <div className="fixed bottom-0 w-full bg-gray-800 p-4 flex justify-between items-center shadow-md text-white">
      {/* Informational text about cookie usage */}
      <p>This website uses cookies to enhance the user experience.</p>
      {/* Accept button that triggers the onAccept function when clicked */}
      <button
        onClick={onAccept}
        className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300"
      >
        Accept
      </button>
    </div>
  )
);

// Export the CookieBanner component as the default export
export default CookieBanner;
