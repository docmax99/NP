import { createClient } from '@supabase/supabase-js';

// Supabase-URL und Anon-Key aus den Umgebungsvariablen abrufen
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Erstellen und exportieren des Supabase-Clients
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.log(supabaseUrl, supabaseAnonKey);
