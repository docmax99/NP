import { useState } from 'react'; // Importiert den useState Hook aus React

// Definiert eine funktionale Komponente namens TextField
export default function TextField({ label, placeholder }) {
  // useState Hook, um den Zustand des Eingabefelds zu verwalten
  const [inputValue, setInputValue] = useState('');

  // Funktion, die aufgerufen wird, wenn sich der Wert des Eingabefelds ändert
  const handleChange = (e) => {
    setInputValue(e.target.value); // Aktualisiert den Zustand mit dem neuen Wert
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Label für das Textfeld */}
      <label className="block text-pinegreen text-lg font-semibold mb-2" htmlFor="textField">
        {label} {/* Zeigt das übergebene Label an */}
      </label>
      {/* Textfeld */}
      <input
        type="text"
        id="textField"
        value={inputValue} // Bindet den Wert des Eingabefelds an den Zustand
        onChange={handleChange} // Ruft handleChange auf, wenn sich der Wert ändert
        placeholder={placeholder} // Zeigt den übergebenen Platzhaltertext an
        className="shadow-md appearance-none border border-pinegreen-light rounded-full w-full py-5 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pinegreen-light focus:border-transparent transition duration-300"
      />
      {/* Optional: Zeigt den aktuellen Wert des Textfelds */}
      {/*<p className="text-sm text-gray-500 mt-2">Eingabe: {inputValue}</p>*/}
    </div>
  );
}
