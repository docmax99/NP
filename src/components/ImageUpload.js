import React from 'react';

export default function ImageUpload({ onUpload }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="fileInput"
      />
      <label
        htmlFor="fileInput"
        className="cursor-pointer border-dashed border-2 border-gray-400 p-4 rounded text-center"
      >
        Klick hier oder ziehe ein Bild hinein
      </label>
    </div>
  );
}
