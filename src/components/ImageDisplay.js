// components/ImageDisplay.js
import { useState, useEffect } from 'react';

export default function ImageDisplay({ filePath }) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (filePath) downloadImage(filePath);
  }, [filePath]);

  const downloadImage = async (path) => {
    // ... (Download-Logik bleibt gleich)
  };

  return imageUrl ? (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={imageUrl} alt="Hochgeladenes Bild" className="w-full h-auto" />
    </div>
  ) : (
    <p>Kein Bild verfügbar.</p>
  );
}
