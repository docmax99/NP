import { useState, useEffect } from 'react';

const SearchBar = ({ inputData, handleChange, handleSearch }) => {
  const [minDepartureDate, setMinDepartureDate] = useState('');

  // Aktualisiert `minDepartureDate`, wenn `arrivalDate` geändert wird
  useEffect(() => {
    if (inputData.arrivalDate) {
      setMinDepartureDate(inputData.arrivalDate);
    }
  }, [inputData.arrivalDate]);

  // Funktion zur Handhabung von Änderungen in den Eingabefeldern mit Validierung
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validierung für Zielort: Nur Buchstaben (Regulärer Ausdruck)
    if (name === 'destination') {
      const lettersOnly = /^[a-zA-Z\s]*$/;
      if (!lettersOnly.test(value)) return; // Ignoriert Eingaben, die keine Buchstaben sind
    }

    // Validierung für Gästeanzahl: Mindestwert 1
    if (name === 'guests' && value < 1) return;

    // Validierung für das Ankunftsdatum: Darf nicht in der Vergangenheit liegen
    if (name === 'arrivalDate') {
      const today = new Date().toISOString().split('T')[0];
      if (value < today) return;
    }

    // Validierung für das Abreisedatum: Darf nicht vor dem Ankunftsdatum liegen
    if (name === 'departureDate' && inputData.arrivalDate) {
      if (value <= inputData.arrivalDate) return;
    }

    handleChange(e);
  };

  // Funktion zur Einschränkung von Zeichen in den Eingabefeldern
  const handleKeyPress = (e, field) => {
    // Nur Zahlen für Gästeanzahl
    if (field === 'guests') {
      if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
      }
    }

    // Nur Buchstaben für Zielort
    if (field === 'destination') {
      if (!/[a-zA-Z\s]/.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center bg-white rounded-full shadow-2xl shadow-blue-300 p-2">
        {/* Zielort */}
        <div className="flex-grow px-4 py-2 border-r border-gray-300">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Wo?</label>
          <input
            type="text"
            name="destination"
            placeholder="Zielort"
            value={inputData.destination}
            onChange={handleInputChange}
            onKeyPress={(e) => handleKeyPress(e, 'destination')} // Einschränkung auf Buchstaben
            className="w-full bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Anreise */}
        <div className="flex-grow px-4 py-2 border-r border-gray-300">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Start</label>
          <input
            type="date"
            name="arrivalDate"
            value={inputData.arrivalDate}
            onChange={handleInputChange}
            className="w-full bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400"
            min={new Date().toISOString().split('T')[0]} // Mindestdatum: Heute
          />
        </div>

        {/* Abreise */}
        <div className="flex-grow px-4 py-2 border-r border-gray-300">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Ende</label>
          <input
            type="date"
            name="departureDate"
            value={inputData.departureDate}
            onChange={handleInputChange}
            className="w-full bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400"
            min={minDepartureDate} // Mindestdatum: Anreise-Datum
            disabled={!inputData.arrivalDate} // Deaktiviert, bis Anreisedatum ausgewählt ist
          />
        </div>

        {/* Gäste */}
        <div className="flex-grow px-4 py-2">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Anzahl der Personen</label>
          <input
            type="number"
            name="guests"
            placeholder="Anzahl"
            value={inputData.guests}
            onChange={handleInputChange}
            onKeyPress={(e) => handleKeyPress(e, 'guests')} // Einschränkung auf Zahlen
            className="w-full bg-transparent focus:outline-none text-sm text-gray-700 placeholder-gray-400"
            min="1" // Mindestwert: 1
          />
        </div>

        {/* Such-Button */}
        <button
          onClick={handleSearch}
          className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition duration-300"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 4.35a7.5 7.5 0 010 10.3z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
