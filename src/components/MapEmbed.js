export default function MapEmbed({ mapsLink }) {
    return (
      <div className="rounded-full mt-5">
        {/* Bedingung zur Anzeige des iFrame nur, wenn `mapsLink` vorhanden ist */}
        {mapsLink ? (
          <iframe
            src={mapsLink}
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        ) : (
          <p>Keine Karte verfügbar.</p> // Alternative Anzeige, wenn kein Link vorhanden ist
        )}
      </div>
    );
  }
  