import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ImageUpload from '../../components/ImageUpload';

export default function UploadDerBilder() {
  const [filePath, setFilePath] = useState(null);
  const [error, setError] = useState('');

  const handleUpload = async (path) => {
    try {
      // Speichern des Bildpfads in der Datenbank für die Wohnung
      const { data, error } = await supabase
        .from('Houses')
        .update({ Bild_1: path }) // Beispielhaftes Update für Bild_1
        .eq('Haus_id', 1); // Beispielhaftes Update für Haus mit ID 1

      if (error) {
        console.error('Fehler beim Speichern des Bildpfades:', error);
        setError(error.message);
        return;
      }

      setFilePath(path);
    } catch (err) {
      setError('Fehler beim Hochladen des Bildes.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Wohnungsbilder hochladen</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <ImageUpload onUpload={handleUpload} />
      </div>
      {filePath && (
        <div className="mt-6 w-96">
          <h2 className="text-xl font-semibold mb-4">Vorschau des hochgeladenen Bildes:</h2>
          <img src={filePath} alt="Wohnungsbild" className="w-full h-auto" />
        </div>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
