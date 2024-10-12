import Image from 'next/image';

const AboutUs = () => {
  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/Images/Haus_am_See.jpg"
          alt="Hintergrundbild"
          layout="fill"
          objectFit="cover"
          className="opacity-40 filter blur-md"
        />
      </div> 

      {/* Content Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 text-gray-100">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold tracking-tight text-white">
            Über uns
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Entdecke außergewöhnliche Unterkünfte, die das Herz der Region widerspiegeln und dir eine unvergessliche Erfahrung bieten.
          </p>
        </div>

        {/* USP Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Warum Nette Plätze?
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            Nette Plätze bietet persönlich ausgewählte lokale Unterkünfte für authentische Reiseerlebnisse. Wir bieten dir nicht nur Unterkünfte, sondern einprägsame und Lebensverändernde Momente. Jede Unterkunft wird von unseren Gastgebern sorgfältig ausgewählt und gepflegt, damit du die wahre Kultur und Gastfreundschaft der Region erleben kannst.
          </p>
        </div>

        {/* Team Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg">
              <Image
                src="/Images/Eric.jpg"
                alt="Eric Uphoff"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-white">Eric Uphoff</h3>
            <p className="mt-2 text-gray-400">Gründer & CEO</p>
            <p className="mt-4 text-gray-400 max-w-xs mx-auto">
              Eric liebt es, Reisenden einzigartige Unterkünfte zu bieten, die sie nirgendwo anders finden können.
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg">
              <Image
                src="/Images/Louis.png"
                alt="Louis Schneider"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-white">Louis Schneider</h3>
            <p className="mt-2 text-gray-400">Gründer & CTO</p>
            <p className="mt-4 text-gray-400 max-w-xs mx-auto">
              Louis sorgt dafür, dass unsere Plattform immer auf dem neuesten Stand der Technik ist und nahtlos funktioniert.
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg">
              <Image
                src="/Images/Heike.jpg"
                alt="Heike Müller"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <h3 className="mt-6 text-2xl font-semibold text-white">Heike Müller</h3>
            <p className="mt-2 text-gray-400">Community Managerin</p>
            <p className="mt-4 text-gray-400 max-w-xs mx-auto">
              Heike sorgt dafür, dass jede Unterkunft den höchsten Standards entspricht.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-16 text-center">
          <h2 className="text-4xl font-bold text-white">Unsere Mission</h2>
          <p className="mt-6 text-lg text-gray-300 max-w-3xl mx-auto">
            Wir möchten die Art und Weise verändern, wie Menschen reisen und neue Orte entdecken. Unser Ziel ist es, dir einzigartige Unterkünfte und authentische Erfahrungen zu bieten, die du sonst nirgendwo findest.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
