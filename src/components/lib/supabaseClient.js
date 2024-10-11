// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://evapvrkechtafxfxpkvn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2YXB2cmtlY2h0YWZ4Znhwa3ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5Njc4NjksImV4cCI6MjA0MTU0Mzg2OX0.3hdMaOpgt5w5nuMJXsjGfgewzU-nDdcDCRS0cF1qVAk';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL und/oder Anon Key fehlen in den Umgebungsvariablen.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
