import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../components/lib/supabaseClient';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MathPopup from '../../components/MathPopup'; // Importiere MathPopup

export default function InsertHouse() {
  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    title: '',
    description: '',
    street: '',
    city: '',
    plz: '',
    country: '',
    price: '',
    size: '',
    guestCount: '',
    houseType: '',
    bedrooms: '',
    bathrooms: '',
    beds: '',
    petsAllowed: false,
    smoking: false,
    barrierFree: false,
    parkingAvailable: false,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMathPopup, setShowMathPopup] = useState(false); // Steuert, ob das MathPopup angezeigt wird
  const [houseData, setHouseData] = useState(null); // Speichert die hochgeladenen Daten für die spätere Weiterleitung
  const [houseImageUrls, setHouseImageUrls] = useState([]); // Speichert die öffentliche URL des Bildes
  const [uploadedFiles, setUploadedFiles] = useState([]); // Speichert die hochgeladenen Dateien
  const router = useRouter();
  const userId = '3871b652-ab49-4eea-9a9f-a6db4be01ded'; // Feste User-ID

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = async (file) => {

    // Bild in Supabase Bucket hochladen
    const folderName = formData.id; // ID als Ordnername nutzen
    const filePath = `${folderName}/${file.name}`;
    
    const { data, error } = await supabase.storage.from('Houses').upload(filePath, file);
    if (error) {
      console.error('Fehler beim Hochladen des Hausbildes:', error.message);
      setErrorMessage(error.message);
      return;
    }
    console.log('Bild hochgeladen:', data.fullPath);

    // Öffentliche URL des Bildes holen
    const { data: publicData, error: publicError } = supabase
      .storage
      .from('Houses')
      .getPublicUrl(filePath);

    if (publicError) {
      console.error('Fehler beim Abrufen der öffentlichen URL:', publicError.message);
      setErrorMessage(publicError.message);
      return;
    }

    console.log('Öffentliche URL:', publicData.publicUrl);

    setHouseImageUrls((existingUrls) => [...existingUrls, publicData.publicUrl]); // Speichere die öffentliche URL des Bildes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert house data into the "Houses" table
      console.log(houseImageUrls)
      const { data, error } = await supabase
        .from('Houses')
        .insert([{
          id: formData.id,
          Erstellt: new Date().toISOString(),
          Titel: formData.title,
          Beschreibung: formData.description,
          Straße: formData.street,
          Ort: formData.city,
          PLZ: formData.plz,
          Land: formData.country,
          Kosten: parseFloat(formData.price),
          Größe: parseInt(formData.size),
          Schlafzimmer: parseInt(formData.bedrooms),
          Badezimmer: parseInt(formData.bathrooms),
          Betten: parseInt(formData.beds),
          Gästeanzahl: parseInt(formData.guestCount),
          Haustiere: formData.petsAllowed,
          Rauchen: formData.smoking,
          Barrierefrei: formData.barrierFree,
          Parkmöglichkeiten: formData.parkingAvailable,
          Haus_Typ: formData.houseType,
          userId: userId, // Save fixed user ID
          bilder: houseImageUrls, // Speichere die öffentliche URL des Bildes
        }]);

      if (error) {
        console.error('Error inserting house:', error.message);
        throw new Error(`Error inserting house: ${error.message}`);
      }

      // Speichere die hochgeladenen Hausdaten
      setHouseData(data);
      // Zeige MathPopup nach dem erfolgreichen Upload
      setShowMathPopup(true);
    } catch (error) {
      console.error('Error during house insertion:', error);
      setErrorMessage(`Fehler beim Inserieren des Hauses: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMathPopupClose = (isCorrect) => {
    if (!isCorrect) {
      setErrorMessage('Die Matheaufgabe wurde nicht korrekt gelöst.');
      return;
    }
    setShowMathPopup(false);
    if (houseData) {
      router.push('/app/home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Haus Inserieren</h1>
        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titel</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Beschreibung</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Street */}
          <div>
            <label htmlFor="street" className="block text-sm font-medium text-gray-700">Straße</label>
            <input type="text" id="street" name="street" value={formData.street} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ort</label>
            <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Postal Code */}
          <div>
            <label htmlFor="plz" className="block text-sm font-medium text-gray-700">PLZ</label>
            <input type="text" id="plz" name="plz" value={formData.plz} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Country */}
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Land</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preis pro Nacht (&euro;)</label>
            <input type="number" id="price" name="price" min="0" value={formData.price} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Size */}
          <div>
            <label htmlFor="size" className="block text-sm font-medium text-gray-700">Größe (m²)</label>
            <input type="number" id="size" name="size" min="0" value={formData.size} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* House Type */}
          <div>
            <label htmlFor="houseType" className="block text-sm font-medium text-gray-700">Haus Typ</label>
            <input type="text" id="houseType" name="houseType" value={formData.houseType} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Guest Count */}
          <div>
            <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700">Gästeanzahl</label>
            <input type="number" id="guestCount" name="guestCount" min="1" value={formData.guestCount} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Bedrooms */}
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Schlafzimmer</label>
            <input type="number" id="bedrooms" name="bedrooms" min="1" value={formData.bedrooms} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Bathrooms */}
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Badezimmer</label>
            <input type="number" id="bathrooms" name="bathrooms" min="1" value={formData.bathrooms} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Beds */}
          <div>
            <label htmlFor="beds" className="block text-sm font-medium text-gray-700">Betten</label>
            <input type="number" id="beds" name="beds" min="1" value={formData.beds} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Pets Allowed */}
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" name="petsAllowed" checked={formData.petsAllowed} onChange={handleChange} />
              <span className="ml-2">Haustiere erlaubt</span>
            </label>
          </div>
          {/* Barrier Free */}
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" name="barrierFree" checked={formData.barrierFree} onChange={handleChange} />
              <span className="ml-2">Barrierefrei</span>
            </label>
          </div>
          {/* URL */}
          <div>
            <label htmlFor="URL" className="block text-sm font-medium text-gray-700">URL</label>
            <input type="text" id="URL" name="URL" value={formData.URL} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Smoking */}
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" name="smoking" checked={formData.smoking} onChange={handleChange} />
              <span className="ml-2">Rauchen</span>
            </label>
          </div>
          {/* Parking Available */}
          <div>
            <label className="inline-flex items-center">
              <input type="checkbox" name="parkingAvailable" checked={formData.parkingAvailable} onChange={handleChange} />
              <span className="ml-2">Parkmöglichkeiten</span>
            </label>
          </div>
          {/* Image Upload */}
          <div className="border-dashed border-2 border-gray-300 p-4 rounded relative">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setUploadedFiles(files);
                files.forEach((file) => {
                  handleImageUpload(file);
                  console.log(houseImageUrls)
                });
              } 
             }
              className="cursor-pointer absolute inset-0 opacity-0 w-full h-full"
            />
            <div className="flex flex-wrap gap-2">	
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map((preview, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(preview)}
                  alt={preview.name}
                  className="w-24 h-24 object-cover rounded"
                />
              ))
            ) : (
              <p className="text-center text-gray-400">Klick hier oder ziehe ein Bild hinein</p>
            )}
          </div>

          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300" disabled={loading}>
            {loading ? 'Lädt...' : 'Haus inserieren'}
          </button>
        </form>
      </main>
      <Footer />
      {/* MathPopup anzeigen, wenn erforderlich */}
      {showMathPopup && <MathPopup onClose={handleMathPopupClose} />}
    </div>
  );
}
