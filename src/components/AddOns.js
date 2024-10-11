    // components/AddOns.js
import { useState, useEffect } from 'react';

const AddOns = ({ onPriceChange }) => {
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const addOnOptions = [
    { id: 1, name: 'Zustellbett', price: 30 },
    { id: 2, name: 'Kinderbett', price: 20 },
    { id: 3, name: 'Hochstuhl', price: 10 },
    { id: 4, name: 'Handtücher', price: 15 },
    { id: 5, name: 'Bettzeug', price: 25 },
    { id: 6, name: 'Fahrräder', price: 50 },
    { id: 7, name: 'Stellplatz', price: 10 },
    { id: 8, name: 'Grillpaket', price: 35 },
    { id: 9, name: 'Eintritt ins Schwimmbad', price: 15 },
    { id: 10, name: 'Brötchen-Service', price: 5 },
    { id: 11, name: 'Shuttle-Service', price: 40 },
    { id: 12, name: 'Cleaning-Service', price: 40 },
  ];

  const handleAddOnChange = (addOnId, price) => {
    setSelectedAddOns((prevSelectedAddOns) => {
      const isSelected = !!prevSelectedAddOns[addOnId];
      const updatedAddOns = { ...prevSelectedAddOns };

      if (isSelected) {
        delete updatedAddOns[addOnId];
        setTotalPrice((prevTotal) => prevTotal - price);
      } else {
        updatedAddOns[addOnId] = true;
        setTotalPrice((prevTotal) => prevTotal + price);
      }

      return updatedAddOns;
    });
  };

  // Verwende useEffect, um den Gesamtpreis an die Elternkomponente weiterzugeben
  useEffect(() => {
    onPriceChange(totalPrice);
  }, [totalPrice, onPriceChange]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Zusatzangebote buchen (optional)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {addOnOptions.map((addOn) => (
          <div
            key={addOn.id}
            className={`flex flex-col items-center justify-between bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ${
              selectedAddOns[addOn.id] ? 'border-2 border-blue-500' : 'border border-gray-200'
            }`}
          >
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-medium mb-1">{addOn.name}</h3>
              <p className="text-sm text-gray-500 mb-2">Preis: {addOn.price} €</p>
            </div>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600"
              checked={!!selectedAddOns[addOn.id]}
              onChange={() => handleAddOnChange(addOn.id, addOn.price)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddOns;
