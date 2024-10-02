import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../components/lib/supabaseClient';
import bcrypt from 'bcryptjs';
import Image from "next/image";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    Email: '',
    Password: '',
    Straße: '',
    Hausnummer: '',
    PLZ: '',
    Ort: '',
    Zahlungsinformationen: '',
    Profilbild: '',
    Land: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Überprüfen, ob alle Felder ausgefüllt sind
    const allFieldsFilled = Object.values(formData).every(field => field.trim() !== '');
    if (!allFieldsFilled) {
      setError('Bitte alle Felder ausfüllen.');
      return;
    }

    try {
      // Passwort hashen
      const hashedPassword = await bcrypt.hash(formData.password, 10);

      // Benutzer bei Supabase authentifizieren
      const { user, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password, // Das unverschlüsselte Passwort wird für Auth verwendet
      });

      if (authError) {
        // Überprüfen, ob die E-Mail bereits registriert ist
        if (authError.message.toLowerCase().includes('user already registered')) {
          setError('Diese E-Mail ist bereits registriert. Melden Sie sich an, oder nutzen Sie eine andere E-Mail-Adresse.');
          setTimeout(() => {
            router.push('/app/login'); // Weiterleitung zur Login-Seite
          }, 5000); // Weiterleitung nach 5 Sekunden
        } else {
          console.log('Fehler bei der Registrierung:', authError.message);
          setError(authError.message);
        }
        return;
      }

      // Benutzerinformationen in die Datenbanktabelle einfügen
      const { data, error: insertError } = await supabase
        .from('User')
        .insert([
          {
            'First Name': formData.firstName,
            'Last Name': formData.lastName,
            Email: formData.email,
            Password: hashedPassword, // Das gehashte Passwort wird in die Datenbank geschrieben
            Straße: formData.strasse,
            Hausnummer: formData.hausNr,
            PLZ: formData.plz,
            Ort: formData.ort,
            Zahlungsinformationen: formData.zahlungsinfo,
            Profilbild: formData.profilbild,
            Land: formData.land,
          },
        ]);

      if (insertError) {
        // Abfangen des Fehlers für die doppelte E-Mail (Duplicate key)
        if (insertError.message.toLowerCase().includes('duplicate key value')) {
          setError('Diese E-Mail ist bereits registriert. Melden Sie sich an, oder nutzen Sie eine andere E-Mail-Adresse.');
          setTimeout(() => {
            router.push('/app/login'); // Weiterleitung zur Login-Seite nach 5 Sekunden
          }, 4000);
        } else {
          console.log('Fehler beim Einfügen in die Tabelle:', insertError.message);
          setError(insertError.message);
        }
        return;
      }

      console.log('Benutzer erfolgreich registriert:', data);

      // Weiterleitung zur Bestätigungsseite
      router.push('/confirmation');

    } catch (err) {
      console.log('Fehler bei der Registrierung:', err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/Images/BackgroundRG.png')] bg-cover bg-center flex items-center justify-center">
      <div className=" bg-slate-50 p-8 rounded-3xl shadow-2xl max-w-lg w-full relative z-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrieren</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex space-x-4">
            <input
              className="w-1/2 p-2 border border-gray-300 rounded"
              name="firstName"
              placeholder="Vorname"
              onChange={handleChange}
            />
            <input
              className="w-1/2 p-2 border border-gray-300 rounded"
              name="lastName"
              placeholder="Nachname"
              onChange={handleChange}
            />
          </div>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            name="password"
            type="password"
            placeholder="Passwort"
            onChange={handleChange}
          />
          <div className="flex space-x-4">
            <input
              className="w-2/3 p-2 border border-gray-300 rounded"
              name="strasse"
              placeholder="Straße"
              onChange={handleChange}
            />
            <input
              className="w-1/3 p-2 border border-gray-300 rounded"
              name="hausNr"
              placeholder="Hausnummer"
              onChange={handleChange}
            />
          </div>
          <input
            className="w-full p-2 border border-gray-300 rounded"
            name="plz"
            placeholder="PLZ"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            name="ort"
            placeholder="Ort"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            name="zahlungsinfo"
            placeholder="Zahlungsinfo"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            name="profilbild"
            placeholder="Profilbild-URL"
            onChange={handleChange}
          />
          <input
            className="w-full p-2 border border-gray-300 rounded"
            name="land"
            placeholder="Land"
            onChange={handleChange}
          />

          {error && <p className="text-red-500">{error}</p>} {/* Fehleranzeige */}
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Registrieren
          </button>
        </form>
      </div>

      {/* Overlay für bessere Lesbarkeit */}
      <div className="absolute inset-0 "></div>
    </div>
  );
}
