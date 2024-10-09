import React, { useState } from 'react';
import { useRouter } from 'next/router';

// Hilfsfunktion zur Generierung einer zufälligen linearen Gleichung wie "ax + b = c"
const generateRandomEquation = () => {
  const a = Math.floor(Math.random() * 10) + 1; // Zufälliger Koeffizient
  const b = Math.floor(Math.random() * 10); // Zufällige Konstante
  const c = Math.floor(Math.random() * 50) + 10; // Zufälliges Ergebnis
  return { a, b, c };
};

// Berechne den Wert von x aus der Gleichung ax + b = c
const calculateX = (a, b, c) => {
  return (c - b) / a;
};

const MathPopup = ({ onClose }) => {
  const [equation, setEquation] = useState(generateRandomEquation());
  const [userAnswer, setUserAnswer] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const router = useRouter(); // Verwende den Next.js-Router für die Weiterleitung

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = () => {
    const correctX = calculateX(equation.a, equation.b, equation.c);
    if (parseFloat(userAnswer) === correctX) {
      setFeedbackMessage('🎉 Richtig! Gut gemacht.');
      setTimeout(() => {
        onClose(); // Schließt das Popup
        router.push('/app/home'); // Leitet zur gewünschten Seite weiter
      }, 1000); // Nach 1 Sekunde wird weitergeleitet
    } else {
      setFeedbackMessage(`❌ Falsch! Der richtige Wert von x ist ${correctX}.`);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 text-center transform transition-all duration-500 scale-100">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Löse die Gleichung</h2>
        
        {/* MathML für die Gleichung */}
        <div className="bg-gray-100 p-4 mb-6 rounded-lg border border-gray-300">
          <math xmlns="http://www.w3.org/1998/Math/MathML">
            <mrow className="text-2xl">
              <mn>{equation.a}</mn>
              <mo>&#x2062;</mo> {/* invisible multiplication operator */}
              <mi>x</mi>
              <mo>+</mo>
              <mn>{equation.b}</mn>
              <mo>=</mo>
              <mn>{equation.c}</mn>
            </mrow>
          </math>
        </div>

        <input
          type="number"
          value={userAnswer}
          onChange={handleInputChange}
          className="border border-gray-300 p-3 w-full mb-4 text-lg rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Dein Wert für x"
        />

        {feedbackMessage && (
          <p className={`text-lg font-medium mb-4 ${feedbackMessage.includes('Richtig') ? 'text-green-600' : 'text-red-500'}`}>
            {feedbackMessage}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:from-indigo-600 hover:to-blue-500 transition-all duration-300"
        >
          Überprüfen
        </button>
      </div>
    </div>
  );
};

export default MathPopup;
