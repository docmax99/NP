  import { useState } from 'react';
  import { useRouter } from 'next/router';
  import { supabase } from '../../components/lib/supabaseClient';
  import ImageUpload from '../../components/ImageUpload';

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
      Land: 'DE', // Standardwert auf 'DE' gesetzt
    });
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleImageUpload = (file) => {
      setProfileImage(file);

      // Vorschau des Bildes setzen
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    };

    const handleRegister = async (e) => {
      e.preventDefault();

      // Überprüfen, ob alle erforderlichen Felder ausgefüllt sind
      const requiredFields = ['First_Name', 'Last_Name', 'Email', 'Password'];
      const allFieldsFilled = requiredFields.every((field) => formData[field].trim() !== '');

      if (!allFieldsFilled) {
        setError('Bitte füllen Sie alle Pflichtfelder aus.');
        return;
      }

      try {
        // Benutzerregistrierung bei Supabase
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.Email,
          password: formData.Password,
        });

        if (authError) {
          console.log('Fehler bei der Registrierung:', authError.message);
          setError(authError.message);
          return;
        }

        const user = authData.user;

        // Profilbild hochladen, falls vorhanden
        let finalProfileImagePath = 'default-avatar-url'; // Standardbild-URL
        if (profileImage) {
          const fileName = `${user.id}/Profilbild`; // Ordner für jeden Benutzer im Supabase-Speicher
          const { data: imageData, error: uploadError } = await supabase.storage
            .from('Users')
            .upload(fileName, profileImage);

          if (uploadError) {
            console.log('Fehler beim Hochladen des Profilbildes:', uploadError.message);
            setError(uploadError.message);
            return;
          }

          // URL des hochgeladenen Bildes abrufen
          const { data: publicUrlData } = supabase.storage.from('Users').getPublicUrl(fileName);
          finalProfileImagePath = publicUrlData.publicUrl;
        }

        // Benutzerinformationen in die Datenbanktabelle 'User' einfügen
        const { data, error: insertError } = await supabase
          .from('User')
          .insert([
            {
              id: user.id,
              First_Name: formData.First_Name,
              Last_Name: formData.Last_Name,
              Email: formData.Email,
              Straße: formData.Straße,
              Hausnummer: formData.Hausnummer,
              PLZ: formData.PLZ,
              Ort: formData.Ort,
              Land: formData.Land,
              Profilbild: finalProfileImagePath, // Bildpfad des hochgeladenen Profilbildes oder Standardbild
            },
          ]);

        if (insertError) {
          console.log('Fehler beim Einfügen in die Tabelle:', insertError.message);
          setError(insertError.message);
          return;
        }

        console.log('Benutzer erfolgreich registriert:', data);

        // Weiterleitung zur Anmeldeseite
        router.push('/app/login');
      } catch (err) {
        console.log('Fehler bei der Registrierung:', err.message);
        setError(err.message);
      }
    };

    return (
      <div className="relative h-screen bg-fixed bg-[url('/Images/Haus_am_See.jpg')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
        <div className="bg-slate-50 p-8 rounded-3xl shadow-2xl max-w-lg w-full relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Registrieren</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex space-x-4">
              <input
                className="w-1/2 p-2 border border-gray-300 rounded"
                name="First_Name"
                placeholder="Vorname"
                onChange={handleChange}
              />
              <input
                className="w-1/2 p-2 border border-gray-300 rounded"
                name="Last_Name"
                placeholder="Nachname"
                onChange={handleChange}
              />
            </div>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              name="Email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              name="Password"
              type="password"
              placeholder="Passwort"
              onChange={handleChange}
            />
            <div className="flex space-x-4">
              <input
                className="w-2/3 p-2 border border-gray-300 rounded"
                name="Straße"
                placeholder="Straße"
                onChange={handleChange}
              />
              <input
                className="w-1/3 p-2 border border-gray-300 rounded"
                name="Hausnummer"
                placeholder="Hausnummer"
                onChange={handleChange}
              />
            </div>
            <input
              className="w-full p-2 border border-gray-300 rounded"
              name="PLZ"
              placeholder="PLZ"
              onChange={handleChange}
            />
            <input
              className="w-full p-2 border border-gray-300 rounded"
              name="Ort"
              placeholder="Ort"
              onChange={handleChange}
            />
            <select
              className="w-full p-2 border border-gray-300 rounded"
              name="Land"
              value={formData.Land}
              onChange={handleChange}
            >
              <option value="DE">🇩🇪 Deutschland</option>
              <option value="AT">🇦🇹 Österreich</option>
              <option value="CH">🇨🇭 Schweiz</option>
            </select>

            <div className="border-dashed border-2 border-gray-300 p-4 rounded relative">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files[0])}
                className="cursor-pointer absolute inset-0 opacity-0 w-full h-full"
              />
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="Profilbild Vorschau"
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <p className="text-center text-gray-400">Klick hier oder ziehe ein Bild hinein</p>
              )}
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">
              Registrieren
            </button>
          </form>
        </div>
      </div>
    );
  }
