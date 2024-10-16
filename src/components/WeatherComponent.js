// components/WeatherComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Wetterkomponente, die Wetterdaten für einen bestimmten Ort anzeigt
const WeatherComponent = ({ Ort }) => {
  // Zustand für Wetterdaten
  const [weatherData, setWeatherData] = useState(null);
  // Zustand für Ladeanzeige
  const [loading, setLoading] = useState(false);
  // Zustand für Fehleranzeige
  const [error, setError] = useState(null);

  // API-Schlüssel für OpenWeatherMap (ersetze dies mit deinem eigenen API-Schlüssel)
  const API_KEY = 'd7d63f8ba7310aa9d371501d0b3483be';

  // Funktion zum Abrufen der Wetterdaten basierend auf dem übergebenen Ortsnamen
  const fetchWeather = async () => {
    // Überprüfen, ob ein Ort angegeben wurde
    if (!Ort) {
      setError('Kein Ort angegeben. Bitte geben Sie einen gültigen Ort ein.');
      return;
    }

    // Ladezustand setzen und Fehlerzustand zurücksetzen
    setLoading(true);
    setError(null);

    try {
      // Wetterdaten vom OpenWeatherMap-API abrufen basierend auf dem Ort
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${Ort}&units=metric&appid=${API_KEY}`
      );
      // Wetterdaten im Zustand speichern
      setWeatherData(response.data);
    } catch (err) {
      // Fehlerzustand setzen, falls der Abruf fehlschlägt
      setError('Wetterdaten konnten nicht abgerufen werden. Bitte erneut versuchen.');
    }

    // Ladezustand zurücksetzen
    setLoading(false);
  };

  // Abruf der Wetterdaten bei Erstladen der Komponente und bei Änderungen des Ortsnamens
  useEffect(() => {
    fetchWeather();
  }, [Ort]); // Abhängig von Ort, um bei jeder Änderung des Ortes die Daten neu abzurufen

  return (
    <div style={{ textAlign: 'center', marginTop: '1px' }}>
      <h1>Live Wetteranzeige für {Ort}</h1>

      {/* Ladezustand anzeigen */}
      {loading && <p>Lade Wetterdaten...</p>}
      {/* Fehler anzeigen */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Wetterdaten anzeigen, wenn verfügbar */}
      {weatherData && (
        <div style={{ marginTop: '1px' }}>
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Temperatur: {weatherData.main.temp} °C</p>
          <p>Wetter: {weatherData.weather[0].description}</p>
          <p>Luftfeuchtigkeit: {weatherData.main.humidity} %</p>
          <p>Windgeschwindigkeit: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
