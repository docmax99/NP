import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from 'next/image';  // Importing the Image component from Next.js

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /app/home after 6 seconds
    const timer = setTimeout(() => {
      router.push("/app/home");
    }, 6000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <Head>
        <style>{`
          /* Keyframes for foundation animation */
          @keyframes build-foundation {
            0% {
              transform: scaleY(0);
            }
            100% {
              transform: scaleY(1);
            }
          }

          /* Keyframes for roof animation */
          @keyframes build-roof {
            0% {
              transform: scaleY(0);
            }
            100% {
              transform: scaleY(1);
            }
          }

          /* Keyframes for door animation */
          @keyframes build-door {
            0% {
              transform: scaleY(0);
            }
            100% {
              transform: scaleY(1);
            }
          }

          /* Applying foundation animation */
          .animate-build-foundation {
            animation: build-foundation 1s ease-out forwards;
            animation-delay: 0.5s;
          }

          /* Applying roof animation */
          .animate-build-roof {
            animation: build-roof 1s ease-out forwards;
            animation-delay: 1.5s;
          }

          /* Applying door animation */
          .animate-build-door {
            animation: build-door 1s ease-out forwards;
            animation-delay: 2s;
          }

          /* Keyframes for fade-in animation */
          @keyframes fade-in {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          /* Applying fade-in animation */
          .animate-fade-in {
            animation: fade-in 1.5s ease-in-out;
          }
        `}</style>
      </Head>
      <div className="relative flex items-center justify-center min-h-screen">
        {/* Background image */}
        <Image
          src="/Images/Haus_am_See.jpg"
          alt="Haus am See"
          fill
          className="object-cover opacity-30"
        />
        {/* Overlay with content */}
        <div className="absolute flex flex-col items-center text-center space-y-6 animate-fade-in bg-white bg-opacity-80 p-8 rounded-xl">
          {/* House illustration */}
          <div className="relative w-32 h-32 mb-8">
            {/* House foundation (black) */}
            <div className="w-full h-2/3 bg-black origin-bottom transform scale-y-0 animate-build-foundation absolute bottom-0 rounded-b-lg"></div>
            {/* House roof (black) */}
            <div className="w-0 h-0 border-l-[4rem] border-l-transparent border-r-[4rem] border-r-transparent border-b-[3rem] border-b-black absolute top-[-0.5rem] left-[0%] transform -translate-x-[50%] origin-bottom scale-y-0 animate-build-roof"></div>
            {/* House door (white) */}
            <div className="w-8 h-12 bg-white absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom scale-y-0 animate-build-door rounded-b-lg"></div>
          </div>
          {/* Welcome text */}
          <h1 className="text-5xl font-bold text-blue-900">Willkommen bei Nette Plaetze</h1>
          <p className="text-md text-gray-800">
            Die besten Plätze zum Wohlfühlen, in wenigen Augenblicken...
          </p>
        </div>
      </div>
    </>
  );
}
