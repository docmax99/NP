// pages/confirmation.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Confirmation() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5); // Timer startet bei 5 Sekunden

  // Reduziere den Timer jede Sekunde
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    // Weiterleitung zur Login-Seite nach 5 Sekunden
    if (countdown === 0) {
      router.push('/app/login');
    }

    // Bereinige das Intervall, wenn die Komponente unmountet
    return () => clearInterval(timer);
  }, [countdown, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-yellow-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">🎉 Erfolgreich registriert! 🎉</h1>
      <p className="text-lg text-gray-600">Du wirst in {countdown} Sekunden zur Anmeldeseite weitergeleitet.</p>
      <p className="text-sm text-gray-500">Halte dich fest, es geht los!</p>
    </div>
  );
}
