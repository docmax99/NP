import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Weiterleitung nach 3 Sekunden zu /app/home
    const timer = setTimeout(() => {
      router.push("/app/home");
    }, 3000);

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
            animation-delay: 1.5s;
          }

          .animate-fade-in {
            animation: fade-in 0.5s ease-in-out;
          }
        `}</style>
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="flex flex-col items-center text-center space-y-6 animate-fade-in">
          {/* Haus-Anfang */}
          <div className="relative w-32 h-32 mb-8">
            {/* Fundament des Hauses */}
            <div className="w-full h-2/3 bg-yellow-500 origin-bottom transform scale-y-0 animate-build-foundation absolute bottom-0"></div>
            {/* Dach des Hauses */}
            <div className="w-0 h-0 border-l-[4rem] border-l-transparent border-r-[4rem] border-r-transparent border-b-[3rem] border-b-yellow-600 absolute top-[-0.5rem] left-[0%] transform -translate-x-[70%] origin-bottom scale-y-0 animate-build-roof"></div>
            {/* Tür des Hauses */}
            <div className="w-8 h-12 bg-gray-700 absolute bottom-0 left-1/2 transform -translate-x-1/2 origin-bottom scale-y-0 animate-build-door"></div>
          </div>
          {/* Text zur Begrüßung */}
          <h1 className="text-4xl font-bold">Willkommen bei nette Plätze</h1>
          <p className="text-lg text-gray-400">
            Die besten Plätze zum Wohlfühlen, in wenigen Augenblicken...
          </p>
        </div>
      </div>
    </>
  );
}

// Optional: Definiere hier das Layout für diese Seite
Home.getLayout = function getLayout(page) {
  return (
    <main>
      <header className="bg-gray-800 p-4 text-center">
        <h2 className="text-2xl text-yellow-400 font-bold">nette Plätze</h2>
      </header>
      {page}
      <footer className="bg-gray-800 p-4 text-center text-sm text-gray-500">
        <p>© 2024, nette Plätze - Finde dein Traumhaus</p>
      </footer>
    </main>
  );
};
