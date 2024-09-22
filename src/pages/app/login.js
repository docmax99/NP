import { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../../components/lib/supabaseClient'

export default function Login() {
  const router = useRouter(); 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('') // Um Fehler anzuzeigen
  const [successMessage, setSuccessMessage] = useState('') // Erfolgsmeldung für Passwort-Zurücksetzen

  const handleLogin = async (e) => {
    e.preventDefault()

    setErrorMessage('') // Fehler zurücksetzen
    setSuccessMessage('') // Erfolgsmeldung zurücksetzen

    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      // Fehlerbehandlung basierend auf Supabase-Fehlermeldungen
      if (error.message.toLowerCase().includes('invalid login credentials')) {
        setErrorMessage('Falsche E-Mail oder falsches Passwort.')
      } else if (error.message.toLowerCase().includes('user not found')) {
        setErrorMessage('Diese E-Mail-Adresse ist nicht registriert.')
      } else if (error.message.toLowerCase().includes('email not confirmed')) {
        setErrorMessage('Bitte bestätige zuerst deine E-Mail-Adresse.')
      } else {
        setErrorMessage('Anmeldefehler. Bitte überprüfe deine Eingaben und versuche es erneut.')
      }
      console.log('Fehler beim Anmelden:', error.message)
      return
    }

    console.log('Erfolgreich angemeldet:', user)
    // Weiterleitung zu /app/home nach erfolgreicher Anmeldung
    router.push('/app/home')
  }

  const handlePasswordReset = async () => {
    setErrorMessage('') // Fehler zurücksetzen
    setSuccessMessage('') // Erfolgsmeldung zurücksetzen

    if (!email) {
      setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein.')
      return
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
      if (error.message.toLowerCase().includes('invalid email')) {
        setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein.')
      } else {
        setErrorMessage('Fehler beim Senden der Zurücksetzungs-E-Mail. Bitte versuche es später erneut.')
      }
      console.log('Fehler beim Zurücksetzen des Passworts:', error.message)
      return
    }

    setSuccessMessage('Eine E-Mail zum Zurücksetzen des Passworts wurde gesendet. Bitte überprüfe dein Postfach.')
    console.log('Passwort-Zurücksetzungs-E-Mail gesendet:', data)
  }

  return (
    <div className="h-screen bg-fixed bg-[url('/Images/Backgroundlogin.png')] bg-cover bg-center flex items-center justify-center">
      <div className="relative z-10 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Anmelden</h2>
        
        {/* Fehleranzeige */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        
        {/* Erfolgsmeldung für Passwort-Zurücksetzen */}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        {/* Login Formular */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Passwort"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Anmelden
          </button>
        </form>

        {/* Passwort-Zurücksetzen-Link */}
        <div className="text-center mt-4">
          <button
            onClick={handlePasswordReset}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            Passwort vergessen? Hier zurücksetzen
          </button>
        </div>
      </div>
    </div>
  )
}
