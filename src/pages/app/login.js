import { useState } from 'react'; // useState-Hook von React importieren
import { useRouter } from 'next/router'; // useRouter-Hook von Next.js importieren
import { supabase } from '@components/lib/supabaseClient'; // Supabase-Client importieren
import BackButton from '@components/BackButton'; // BackButton-Komponente importieren
import Cookies from 'js-cookie'; // js-cookie-Bibliothek importieren

export default function Login() {
  const router = useRouter(); // Router-Instanz erstellen
  const [email, setEmail] = useState(''); // State für die E-Mail-Adresse
  const [password, setPassword] = useState(''); // State für das Passwort
  const [errorMessage, setErrorMessage] = useState(''); // State für Fehlermeldungen

  const handleLogin = async (e) => {
    e.preventDefault(); // Standardverhalten des Formulars verhindern
    setErrorMessage(''); // Fehlermeldung zurücksetzen

    // Anmeldung bei Supabase mit E-Mail und Passwort
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // Fehlermeldung setzen, falls ein Fehler auftritt
      setErrorMessage('"Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse. Schauen Sie dafür in Ihrem Posteingang nach, insbesondere im Spam-Ordner. :)".');
    } else {
      // Speichern des Tokens in einem Cookie für 7 Tage
      Cookies.set('sb-access-token', data.session.access_token, { expires: 7 });
      Cookies.set('sb-refresh-token', data.session.refresh_token, { expires: 7 });

      // Weiterleitung nach erfolgreichem Login
      router.push('/app/home');
    }
  };

  return (   
    <div className="relative h-screen bg-fixed bg-[url('/Images/Haus_am_See.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
      {/* Dein anderer Inhalt kommt hier hin */}
      <div className="relative z-10 p-8 rounded-lg shadow-lg max-w-md w-full bg-white">
      <BackButton />

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Anmelden</h2>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Anmelden
          </button>
        </form>
      </div>
    </div>
  );
}