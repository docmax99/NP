// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

//Dieser Code erstellt eine Instanz des Supabase-Clients und exportiert sie als supabase.
//Dieser Client wird in den folgenden Abschnitten verwendet, um mit der Supabase-Datenbank zu interagieren.
//Die URL und der anonyme Key werden aus den Umgebungsvariablen NEXT_PUBLIC_SUPABASE_URL und NEXT_PUBLIC_SUPABASE_ANON_KEY gelesen.
//Diese Umgebungsvariablen werden in der .env.local-Datei definiert, die wir im vorherigen Abschnitt erstellt haben.
//Der Supabase-Client wird in den folgenden Abschnitten verwendet, um mit der Supabase-Datenbank zu interagieren.

//BEISPIEL KOMPONENTEVERWENDUNG 
/*pages/index.js
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [ferienhaeuser, setFerienhaeuser] = useState([])

  useEffect(() => {
    fetchFerienhaeuser()
  }, [])

  const fetchFerienhaeuser = async () => {
    const { data, error } = await supabase.from('ferienhaeuser').select('*')
    if (error) console.log('Fehler beim Abrufen der Daten:', error)
    else setFerienhaeuser(data)
  }

  return (
    <div>
      <h1>Ferienhäuser</h1>
      <ul>
        {ferienhaeuser.map((haus) => (
          <li key={haus.id}>{haus.name}</li>
        ))}
      </ul>
    </div>
  )
}*/
