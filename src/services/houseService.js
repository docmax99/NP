import { supabase } from '../components/lib/supabaseClient'; // Pfad zu deinem Supabase-Client

// Funktion zum Abrufen aller House Infos   
export const getAllHouses = async () => {
  const { data, error } = await supabase
    .from('Houses')  // Ersetze 'users' mit der richtigen Tabelle in deiner Datenbank
    .select('Ort');  // Hier den richtigen Spaltennamen wählen, z.B. 'username' oder 'name'

  if (error) {
    console.error('Fehler beim Abrufen der Häuse:', error);
    return [];
  }

  return data;  // Gibt die Liste der Benutzer zurück
};

