// Importiere notwendige Hooks und Funktionen aus React und Next.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Definiere die Confirmation-Komponente als Standardexport
export default function Confirmation() {
  // Initialisiere den Router-Hook von Next.js
  const router = useRouter();
  // Initialisiere den Countdown-State mit 5 Sekunden
  const [countdown, setCountdown] = useState(5);

  // useEffect-Hook, der bei jeder Änderung des Countdown-States ausgeführt wird
  useEffect(() => {
    // Setze ein Intervall, das jede Sekunde den Countdown um 1 reduziert
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    // Wenn der Countdown 0 erreicht, leite zur Startseite weiter
    if (countdown === 0) {
      router.push('/app/home');
    }

    // Bereinige das Intervall, wenn die Komponente unmountet
    return () => clearInterval(timer);
  }, [countdown, router]); // Abhängigkeiten: countdown und router

  // Render-Methode der Komponente
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">🎉 Erfolgreich registriert! 🎉</h1>
      <p className="text-lg text-gray-600">Du wirst in {countdown} Sekunden zur Startseite weitergeleitet.</p>
      <p className="text-sm text-gray-500">Halte dich fest, es geht los!</p>
    </div>
  );
}
