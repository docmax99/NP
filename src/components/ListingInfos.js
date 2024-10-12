
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

export default function ListingInfo({house}) {
  const Badezimmer = house ? house.Badezimmer : 0; 
  const Schlafzimmer = house ? house.Schlafzimmer : 0;
  const Betten = house ? house.Betten : 0;
  const Gästeanzahl = house ? house.Gästeanzahl : 0;
  const Bewertung = house ? house.Bewertungen_int : 0;
  const Titel_long = house ? house.Titel_long : 'Unbekanntes Haus';

  
    const [randomNumber, setRandomNumber] = useState(4.98);
  
    useEffect(() => {
      // Array mit 7 möglichen Zahlen
      const possibleNumbers = [4.98, 3.87, 5.12, 4.65, 4.33, 4.89, 5.00];
  
      // Zufällig eine Zahl aus dem Array auswählen
      const randomIndex = Math.floor(Math.random() * possibleNumbers.length);
      setRandomNumber(possibleNumbers[randomIndex]);
    }, []);
  
  



  return (
    <div className="max-w-4xl mx-auto bg-gray-100 p-6 rounded-lg">
      {/* Unterkunft Titel und Details */}
      <div className="mb-4" >
        <h1 className="text-2xl font-bold">{Titel_long}</h1>
        <span className="text-gray-600">{`${Gästeanzahl}`} Gäste · {`${Schlafzimmer}`} Schlafzimmer · {`${Betten}`} Betten · {`${Badezimmer}`} Badezimmer</span>
        
        
      </div>

      {/* Bewertung und Favoriten */}
      <div className="flex justify-around items-center border rounded-lg p-4 mb-6">
        <div className="text-center">
          <span className="text-xl">🏆</span>
          <p className="font-semibold">Gäste Liebling</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{randomNumber}</p>
          <p className="text-sm">★★★★★</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold"> {`${Bewertung}`} </span>
          <p className="text-sm underline">Bewertungen</p>
        </div>
      </div>

      {/* Gastgeber Information */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src="/Images/PersonalPic/FordoBild.png" // Host-Bild
            width={48}
            height={48}
            alt="Host"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold">Vermietet von Frodo</p>
          <p className="text-gray-600">Superhost · 14 Jahre Vermieter</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="text-xl mr-4">🏅</span>
          <div>
            <p className="font-semibold">Die besten 10% der Wohnungen</p>
            <p className="text-gray-600">Dieses Heim wird aufgrund von Bewertungen, Rezensionen und Zuverlässigkeit hoch bewertet.</p>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-xl mr-4">🔑</span>
          <div>
            <p className="font-semibold">Selbst einchecken möglich</p>
            <p className="text-gray-600">Melden Sie sich mit dem Tastenfeld an.</p>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-xl mr-4">📅</span>
          <div>
            <p className="font-semibold">Kostenlose Stornierung innerhalb von 48 Stunden</p>
            <p className="text-gray-600">Sie erhalten eine volle Rückerstattung, wenn Sie Ihre Meinung ändern.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
