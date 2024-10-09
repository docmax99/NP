import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/supabaseClient';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function InsertHouse() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    street: '',
    city: '',
    plz: '',
    country: '',
    price: '',
    image1: null,
    image2: null,
    image3: null,
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([null, null, null]);
  const router = useRouter();

  const checkUserSession = async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    return sessionData.session;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const newPreviewImages = [...previewImages];
      newPreviewImages[index] = URL.createObjectURL(file);
      setPreviewImages(newPreviewImages);
      setFormData({ ...formData, [`image${index + 1}`]: file });
    }
  };

  const handleImageUpload = async (files) => {
    const imageUploads = files.map(async (file, index) => {
      if (file) {
        const { data, error } = await supabase.storage
          .from('house-images')
          .upload(`public/${Date.now()}_${file.name}`, file);
        if (error) throw error;
        return data.Key;
      }
      return null;
    });
    return await Promise.all(imageUploads);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const session = await checkUserSession();
    if (!session) {
      setErrorMessage('Sie müssen eingeloggt sein, um ein Haus zu inserieren.');
      router.push('/app/login');
      return;
    }

    try {
      const imageUrls = await handleImageUpload([formData.image1, formData.image2, formData.image3]);

      const { data, error } = await supabase
        .from('houses')
        .insert([
          {
            Titel: formData.title,
            Beschreibung: formData.description,
            Straße: formData.street,
            Ort: formData.city,
            PLZ: formData.plz,
            Land: formData.country,
            Kosten: parseFloat(formData.price),
            Bild_1: imageUrls[0],
            Bild_2: imageUrls[1],
            Bild_3: imageUrls[2],
            User_id: session.user.id,
          },
        ]);

      if (error) throw error;

      router.push(`/app/house?id=${data[0].id}`);
    } catch (error) {
      setErrorMessage(`Fehler beim Inserieren des Hauses: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header user={null} />
      <main className="flex-grow container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Haus Inserieren</h1>
        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Titel */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titel</label>
            <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Beschreibung */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Beschreibung</label>
            <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>
          {/* Preis */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Preis pro Nacht (€)</label>
            <input type="number" id="price" name="price" value={formData.price} onChange={handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md" required />
          </div>

          {/* Bilder hochladen (Drag & Drop) */}
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border-dashed border-2 border-gray-300 p-4 rounded-lg relative flex justify-center items-center cursor-pointer"
                onDrop={(e) => handleDrop(e, index - 1)}
                onDragOver={(e) => e.preventDefault()}
              >
                {previewImages[index - 1] ? (
                  <img src={previewImages[index - 1]} alt={`Preview ${index}`} className="object-cover h-full w-full rounded-lg" />
                ) : (
                  <p className="text-gray-400">Bild {index} hier reinziehen</p>
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300" disabled={loading}>
            {loading ? 'Lädt...' : 'Haus inserieren'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}
