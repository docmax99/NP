import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from 'next/image';  // Image-Komponente importieren

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Weiterleitung nach 4 Sekunden zu /app/home
    const timer = setTimeout(() => {
      router.push("/app/home");
    }, 4000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <style>{`
          @keyframes build-foundation {
            0% {
              transform: scaleY(0);
            }
            100% {
              transform: scaleY(1);
            }
          }

          @keyframes build-roof {
            0% {
              transform: scaleY(0);
            }
            100% {
              transform: scaleY(1);
            }
          }

          @keyframes build-door {
            0% {
              transform: scaleY(0);
            }
            100% {
              transform: scaleY(1);
            }
          }

          .animate-build-foundation {
            animation: build-foundation 1s ease-out forwards;
            animation-delay: 0.5s;
          }

          .animate-build-roof {
            animation: build-roof 1s ease-out forwards;
            animation-delay: 1.5s;
          }

          .animate-build-door {
            animation: build-door 1s ease-out forwards;
            animation-delay: 2s;
          }

          @keyframes fade-in {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
          .animate-fade-in {
            animation: fade-in 1.5s ease-in-out;
          }
        `}</style>
      </Head>
      <div className="relative flex items-center justify-center min-h-screen">
        {/* Hintergrundbild */}
        <Image
          src="/Images/Haus_am_See.jpg"
          alt="Haus am See"
          fill
          className="object-cover opacity-30"
        />
        {/* Überlagerung mit Inhalt */}
        <div className="absolute flex flex-col items-center text-center space-y-6 animate-fade-in bg-white bg-opacity-80 p-8 rounded-xl">
          {/* Haus-Anfang */}
          <div className="relative w-32 h-32 mb-8">
            {/* Fundament des Hauses (schwarz) */}
            <div className="w-full h-2/3 bg-black origin-bottom transform scale-y-0 animate-build-foundation absolute bottom-0 rounded-b-lg"></div>
            {/* Dach des Hauses (schwarz) */}
            <div className="w-0 h-0 border-l-[4rem] border-l-transparent border-r-[4rem] border-r-transparent border-b-[3rem] border-b-black absolute top-[-0.5rem] left-[0%] transform -translate-x-[50%] origin-bottom scale-y-0 animate-build-roof"></div>
            {/* Tür des Hauses (weiß) */}
            <div className="w-8 h-12 bg-white absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom scale-y-0 animate-build-door rounded-b-lg"></div>
          </div>
          {/* Text zur Begrüßung */}
          <h1 className="text-5xl font-bold text-blue-900">Willkommen bei Nette Plaetze</h1>
          <p className="text-md text-gray-800">
            Die besten Plätze zum Wohlfühlen, in wenigen Augenblicken...
          </p>
        </div>
      </div>
    </>
  );
}
