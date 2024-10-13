// FeaturedListings component that takes in houses and a scrollContainerRef as props
const FeaturedListings = ({ houses, scrollContainerRef }) => (
  <div className="w-full max-w-6xl py-8 overflow-hidden">
    {/* Container for the scrollable list of houses */}
    <div
      className="flex gap-8 px-4 py-4 scroll-smooth snap-x snap-mandatory scroll-container"
      ref={scrollContainerRef}
      style={{
        overflowX: 'scroll', // Enable horizontal scrolling
        scrollbarWidth: 'none', // Hide scrollbar in Firefox
        msOverflowStyle: 'none', // Hide scrollbar in Internet Explorer 10+
      }}
    >
      {/* Hide scrollbar in Chrome, Safari, and Opera */}
      <style jsx>{`
        .scroll-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Map through the houses array and render each house */}
      {houses.map((house, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-3xl shadow-lg transform transition duration-700 hover:scale-105 hover:shadow-2xl min-w-[300px] max-w-sm snap-start"
        >
          {/* Link to the house detail page */}
          <Link href={`/app/house/${house.id}`}>
            {/* House image */}
            <Image
              src={house.imageUrl}
              width={400}
              height={300}
              alt={house.title}
              className="w-full h-64 object-cover rounded-3xl"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
            {/* House title and description, visible on hover */}
            <div className="absolute bottom-0 left-0 w-full p-4 text-white opacity-0 group-hover:opacity-100 transition duration-500">
              <h2 className="text-xl font-bold">{house.title}</h2>
              <p className="text-sm mt-1">{house.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturedListings;
