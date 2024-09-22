import { supabase } from '../components/lib/supabaseClient'; // Pfad zu deinem Supabase-Client

// Funktion zum Abrufen aller Benutzer
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('User')  // Ersetze 'users' mit der richtigen Tabelle in deiner Datenbank
    .select('First_Name');  // Hier den richtigen Spaltennamen wählen, z.B. 'username' oder 'name'

  if (error) {
    console.error('Fehler beim Abrufen der Benutzerdaten:', error);
    return [];
  }

  return data;  // Gibt die Liste der Benutzer zurück
};

