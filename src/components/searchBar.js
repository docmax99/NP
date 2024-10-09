const SearchBar = ({ inputData, handleChange, handleSearch }) => (
    <div className="w-full max-w-6xl">
      <div className="flex gap-4 border rounded-full bg-white shadow-lg p-6 items-center">
        {['destination', 'arrivalDate', 'departureDate', 'guests'].map((field, index) => (
          <input
            key={index}
            type={field.includes('Date') ? 'date' : field === 'guests' ? 'number' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={inputData[field]}
            onChange={handleChange}
            className="flex-grow bg-gray-50 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg text-gray-700 placeholder-gray-500"
          />
        ))}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
  
  export default SearchBar;
  