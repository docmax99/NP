import Link from 'next/link';
import Image from 'next/image';

const FeaturedListings = ({ houses, scrollContainerRef }) => (
  <div className="w-full max-w-6xl py-8 overflow-hidden">
    <div
      className="flex gap-8 px-4 py-4 scroll-smooth snap-x snap-mandatory scroll-container overflow-x-scroll"
      ref={scrollContainerRef}
    >
      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {houses.map((house, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-3xl shadow-lg transform transition duration-700 hover:scale-105 hover:shadow-2xl min-w-[300px] max-w-sm snap-start"
        >
          {/* Link ohne explizites <a> Tag */}
          <Link href={`/app/Unterkunft?id=${house.id}`}>
            <div>
              <Image
                src={house.Bild_3}
                width={400}
                height={300}
                alt={house.Titel}
                layout="responsive"
                className="w-full h-64 object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-full p-4 text-white opacity-0 group-hover:opacity-100 transition duration-500">
                <h2 className="text-xl font-bold">{house.Titel}</h2>
                <p className="text-sm mt-1">{house.Beschreibung}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturedListings;
