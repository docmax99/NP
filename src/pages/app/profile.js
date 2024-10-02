import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import ImageUpload from '../../components/ImageUpload';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = supabase.auth.user();
      if (user) {
        setUser(user);
        const { data, error } = await supabase
          .from('User')
          .select('*')
          .eq('Email', user.email)
          .single();
        if (error) {
          setError('Fehler beim Laden der Profildaten.');
        } else {
          setProfileData(data);
        }
      }
    };
    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async (updates) => {
    const { data, error } = await supabase
      .from('User')
      .update(updates)
      .eq('Email', user.email);
    if (error) {
      setError('Fehler beim Aktualisieren des Profils.');
    } else {
      setProfileData(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-6">Profil</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white shadow-md rounded-lg p-6 w-96">
        <ImageUpload
          onUpload={(path) => handleProfileUpdate({ Profilbild: path })}
          currentImage={profileData?.Profilbild || 'default-avatar-url'}
        />
        {/* Weitere Felder zum Bearbeiten */}
      </div>
    </div>
  );
}
