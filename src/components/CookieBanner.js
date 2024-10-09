const CookieBanner = ({ showCookieBanner, onAccept }) => (
  showCookieBanner && (
    <div className="fixed bottom-0 w-full bg-gray-800 p-4 flex justify-between items-center shadow-md text-white">
      <p>This website uses cookies to enhance the user experience.</p>
      <button
        onClick={onAccept}
        className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300"
      >
        Accept
      </button>
    </div>
  )
);

export default CookieBanner;
