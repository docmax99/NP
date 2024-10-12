import Link from 'next/link';
import Image from 'next/image';

// FeaturedListings Component: Displays a list of featured houses with images and titles
const FeaturedListings = ({ houses, scrollContainerRef }) => (
  <div className="w-full max-w-6xl py-8 overflow-hidden">
    {/* Scrollable container for the house listings */}
    <div
      className="flex gap-8 px-4 py-4 scroll-container overflow-x-scroll"
      ref={scrollContainerRef}
    >
      {/* Iterate over the houses array and render each house */}
      {houses.map((house, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-3xl shadow-lg transform transition duration-700 hover:scale-105 hover:shadow-2xl min-w-[300px] max-w-sm"
        >
          {/* Link to the house details page */}
          <Link href={`/app/Unterkunft?id=${house.id}`}>
            <div>
              {/* Container for the house image */}
              <div className="relative w-full h-64">
                <Image
                  src={house?.bilder[0] ?? ''} // Use the first image or an empty string if not available
                  alt={house.Titel} // Alt text for the image
                  layout="fill"  // Image will fully cover the container
                  objectFit="cover"  // Maintain aspect ratio and crop if necessary
                  className="rounded-3xl"
                />
              </div>

              {/* Gradient overlay for better text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
              {/* House title, visible on hover */}
              <div className="absolute bottom-0 left-0 w-full p-4 text-white opacity-0 group-hover:opacity-100 transition duration-500">
                <h2 className="text-xl font-bold">{house.Titel}</h2>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturedListings;
