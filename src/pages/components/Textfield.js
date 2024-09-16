import { useState } from 'react';

export default function TextField({ label, placeholder }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Label für das Textfeld */}
      <label className="block text-pinegreen text-lg font-semibold mb-2" htmlFor="textField">
        {label}
      </label>
      {/* Textfeld */}
      <input
        type="text"
        id="textField"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="shadow-md appearance-none border border-pinegreen-light rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pinegreen-light focus:border-transparent transition duration-300"
      />
      {/* Optional: Zeigt den aktuellen Wert des Textfelds */}
      {/*<p className="text-sm text-gray-500 mt-2">Eingabe: {inputValue}</p>*/}
    </div>
  );
}
