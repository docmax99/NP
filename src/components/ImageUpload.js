// components/ImageUpload.js
import { useState } from 'react';


export default function ImageUpload(props) {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (event) => {
    // ... (Upload-Logik bleibt gleich)
  };

  return (
    <div>
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg h-40 bg-gray-50 hover:bg-gray-100"
      >
        {uploading ? (
          <p>Lädt hoch...</p>
        ) : (
          <>
            <svg
              className="w-10 h-10 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16v-4m0 0L3 12m4 0l4 0M7 12V8m0 4h4m0 0l-4-4m4 4l4-4" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Klicke hier oder ziehe ein Bild hinein
            </p>
          </>
        )}
      </label>
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={uploadImage}
        disabled={uploading}
        className="hidden"
      />
    </div>
  );
}
