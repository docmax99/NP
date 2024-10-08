
import Image from 'next/image';

export default function ListingInfo({house}) {
  const Badezimmer = house ? house.Badezimmer : 0; 
  const Schlafzimmer = house ? house.Schlafzimmer : 0;
  const Betten = house ? house.Betten : 0;
  const Gästeanzahl = house ? house.Gästeanzahl : 0;
  const Bewertung = house ? house.Bewertungen_int : 0;
  const Titel_long = house ? house.Titel_long : 'Unbekanntes Haus';
  



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
          <p className="font-semibold">Guest favorite</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">4.98</p>
          <p className="text-sm">★★★★★</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold"> {`${Bewertung}`} </span>
          <p className="text-sm underline">Reviews</p>
        </div>
      </div>

      {/* Gastgeber Information */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <Image
            src="/Images/PersonalPic/FordoBild.png" // Füge hier das richtige Bild hinzu
            width={48}
            height={48}
            alt="Host"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold">Hosted by Frodo</p>
          <p className="text-gray-600">Superhost · 14 years hosting</p>
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="text-xl mr-4">🏅</span>
          <div>
            <p className="font-semibold">Top 10% of homes</p>
            <p className="text-gray-600">This home is highly ranked based on ratings, reviews, and reliability.</p>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-xl mr-4">🔑</span>
          <div>
            <p className="font-semibold">Self check-in</p>
            <p className="text-gray-600">Check yourself in with the keypad.</p>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-xl mr-4">📅</span>
          <div>
            <p className="font-semibold">Free cancellation for 48 hours</p>
            <p className="text-gray-600">Get a full refund if you change your mind.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
