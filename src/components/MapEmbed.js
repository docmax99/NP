// components/MapEmbed.js

// Diese Komponente rendert ein eingebettetes Karten-Widget basierend auf einem übergebenen Link.
export default function MapEmbed({ mapsLink }) {
  return (
    <div
      style={{
        position: 'relative', // Ermöglicht die absolute Positionierung der Kinder-Elemente
        width: '100%', // Elternelement wird 100% der verfügbaren Breite haben
        paddingBottom: '56.25%', // Stellt ein Seitenverhältnis von 16:9 sicher (Verhältnis von Höhe zu Breite)
        height: 0, // Initiale Höhe des Elternelements
        overflow: 'hidden', // Verhindert das Überlaufen von Inhalten aus dem Elternelement
        borderRadius: '10px', // Abgerundete Ecken (optional)
        marginTop: '20px', // Abstand nach oben
      }}
    >
      {/* Bedingung zur Anzeige des iFrame nur, wenn `mapsLink` vorhanden ist */}
      {mapsLink ? (
        <iframe
          src={mapsLink} // Der Link zur eingebetteten Karte
          style={{
            position: 'absolute', // Ermöglicht die Positionierung relativ zum Elternelement
            top: 0, // Positioniert das iFrame oben im Elternelement
            left: 0, // Positioniert das iFrame links im Elternelement
            width: '100%', // iFrame füllt die gesamte Breite des Elternelements aus
            height: '100%', // iFrame füllt die gesamte Höhe des Elternelements aus
            border: 0, // Entfernt den Standardrahmen des iFrames
          }}
          allowFullScreen="" // Ermöglicht den Vollbildmodus
          loading="lazy" // Verzögert das Laden des iFrames bis es im Viewport ist
          referrerPolicy="no-referrer-when-downgrade" // Verhindert das Senden des Referrer-Headers in bestimmten Fällen
        ></iframe>
      ) : (
        // Fallback-Text, wenn kein `mapsLink` vorhanden ist
        <p
          style={{
            position: 'absolute', // Ermöglicht die Positionierung relativ zum Elternelement
            top: '50%', // Positioniert den Text vertikal in der Mitte
            left: '50%', // Positioniert den Text horizontal in der Mitte
            transform: 'translate(-50%, -50%)', // Zentriert den Text exakt
            color: '#333', // Textfarbe
            fontSize: '18px', // Schriftgröße
            fontWeight: 'bold', // Schriftgewicht
          }}
        >
          Keine Karte verfügbar.
        </p>
      )}
    </div>
  );
}
