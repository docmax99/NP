// components/MapEmbed.js

export default function MapEmbed({ mapsLink }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%', // Elternelement wird 100% der verfügbaren Breite haben
        paddingBottom: '56.25%', // Stellt ein Seitenverhältnis von 16:9 sicher (Verhältnis von Höhe zu Breite)
        height: 0, // Initiale Höhe des Elternelements
        overflow: 'hidden',
        borderRadius: '10px', // Abgerundete Ecken (optional)
        marginTop: '20px',
      }}
    >
      {/* Bedingung zur Anzeige des iFrame nur, wenn `mapsLink` vorhanden ist */}
      {mapsLink ? (
        <iframe
          src={mapsLink}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%', // Füllt das Elternelement vollständig aus
            border: 0,
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      ) : (
        <p
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#333',
            fontSize: '18px',
            fontWeight: 'bold',
          }}
        >
          Keine Karte verfügbar.
        </p>
      )}
    </div>
  );
}
