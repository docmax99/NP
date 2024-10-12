import React from 'react';

// Funktion, um zufällige Farben zu generieren
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Funktion, um Wasserzeichen an verschiedenen Positionen zu erstellen
const createWatermarks = () => {
  const positions = [
    { top: '5%', left: '5%' },
    { top: '10%', left: '30%' },
    { top: '15%', left: '20%' },
    { top: '20%', left: '10%' },
    { top: '25%', left: '30%' },
    { top: '30%', left: '50%' },
    { top: '35%', left: '10%' },
    { top: '40%', left: '20%' },
    { top: '45%', left: '40%' },
    { top: '50%', left: '70%' },
    { top: '55%', left: '10%' },
    { top: '60%', left: '40%' },
    { top: '65%', left: '5%' },
    { top: '70%', left: '80%' },
    { top: '75%', left: '50%' },
    { top: '80%', left: '10%' },
    { top: '85%', left: '70%' },
    { top: '90%', left: '50%' },
    { top: '100%', left: '20%' }
  ];

  return positions.map((pos, index) => (
    <div
      key={index}
      style={{ 
        position: 'absolute', 
        top: pos.top, 
        left: pos.left, 
        pointerEvents: 'none', 
        opacity: 0.2, 
        zIndex: 0,
        color: getRandomColor() // Zufällige Farbe für jedes Wasserzeichen
      }}
    >
      <p className="text-6xl font-bold">Schephoff</p>
    </div>
  ));
};

const PrivacyPolicy = () => {
  return (
    <div className="relative max-w-4xl mx-auto p-10 bg-gray-50 shadow-lg rounded-lg">
      {/* Wasserzeichen */}
      <div className="absolute inset-0">
        {createWatermarks()}
      </div>

      <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-gray-300 pb-4 relative z-10">Datenschutzerklärung</h1>

      <section className="mt-8 relative z-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Deine Privatsphäre ist uns wichtig</h2>
        <p className="text-lg text-gray-600">
          Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. In dieser Datenschutzerklärung erläutern wir, welche Daten wir sammeln, wie wir sie verwenden und welche Rechte du gemäß der Datenschutz-Grundverordnung (DSGVO) hast.
        </p>
      </section>

      <section className="mt-8 relative z-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Welche Daten wir erfassen</h2>
        <p className="text-lg text-gray-600">
          Wir sammeln verschiedene Arten von Daten, wenn du unsere Website besuchst oder unsere Dienste nutzt, darunter:
          <ul className="list-disc list-inside mt-2">
            <li>Personenbezogene Daten wie Name, E-Mail-Adresse, Telefonnummer, wenn du uns kontaktierst oder ein Konto erstellst</li>
            <li>Technische Daten wie IP-Adresse, Browser-Typ, Gerätedaten und Nutzungsverhalten auf unserer Website</li>
            <li>Cookies zur Verbesserung deines Besuchserlebnisses</li>
          </ul>
        </p>
      </section>

      <section className="mt-8 relative z-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Wie wir deine Daten verwenden</h2>
        <p className="text-lg text-gray-600">
          Wir nutzen deine Daten für:
          <ul className="list-disc list-inside mt-2">
            <li>Die Bereitstellung und Verbesserung unserer Dienste</li>
            <li>Die Kommunikation mit dir, insbesondere bei Supportanfragen oder wichtigen Updates</li>
            <li>Marketingzwecke, aber nur, wenn du dem zugestimmt hast</li>
          </ul>
        </p>
      </section>

      <section className="mt-8 relative z-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Weitergabe deiner Daten</h2>
        <p className="text-lg text-gray-600">
          Wir geben deine Daten nur in folgenden Fällen weiter:
          <ul className="list-disc list-inside mt-2">
            <li>Wenn dies zur Erbringung unserer Dienstleistungen notwendig ist</li>
            <li>Wenn es gesetzlich vorgeschrieben ist</li>
            <li>Wenn du uns deine ausdrückliche Einwilligung gegeben hast</li>
          </ul>
          Wir verkaufen deine Daten niemals an Dritte.
        </p>
      </section>

      <section className="mt-8 relative z-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Deine Rechte gemäß DSGVO</h2>
        <p className="text-lg text-gray-600">
          Gemäß der Datenschutz-Grundverordnung (DSGVO) hast du folgende Rechte in Bezug auf deine personenbezogenen Daten:
          <ul className="list-disc list-inside mt-2">
            <li><strong>Auskunft:</strong> Du hast das Recht zu erfahren, welche personenbezogenen Daten wir über dich gespeichert haben.</li>
            <li><strong>Berichtigung:</strong> Du kannst die Berichtigung unrichtiger oder unvollständiger Daten verlangen.</li>
            <li><strong>Löschung:</strong> Du hast das Recht, die Löschung deiner personenbezogenen Daten zu verlangen, sofern keine gesetzlichen Aufbewahrungspflichten bestehen.</li>
            <li><strong>Einschränkung der Verarbeitung:</strong> Unter bestimmten Umständen kannst du die Einschränkung der Verarbeitung deiner Daten verlangen.</li>
            <li><strong>Widerspruch:</strong> Du kannst der Verarbeitung deiner Daten widersprechen, insbesondere für Direktmarketingzwecke.</li>
            <li><strong>Datenübertragbarkeit:</strong> Du hast das Recht, deine personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
          </ul>
          Um eines dieser Rechte auszuüben, kontaktiere uns bitte unter: <strong>privacy@awesomewebsite.com</strong>.
        </p>
      </section>

      <section className="mt-8 relative z-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Datensicherheit</h2>
        <p className="text-lg text-gray-600">
          Wir setzen technische und organisatorische Maßnahmen ein, um deine Daten vor unbefugtem Zugriff, Verlust oder Missbrauch zu schützen. Allerdings ist keine Methode der Datenübertragung oder -speicherung 100 % sicher. Sollten wir von einem Datenvorfall erfahren, werden wir dich umgehend informieren.
        </p>
      </section>

      <section className="mt-8 relative z-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Cookies</h2>
        <p className="text-lg text-gray-600">
          Unsere Website verwendet Cookies, um dein Nutzungserlebnis zu verbessern. Du kannst die Verwendung von Cookies in den Einstellungen deines Browsers kontrollieren. Bitte beachte, dass einige Funktionen der Website möglicherweise nicht ordnungsgemäß funktionieren, wenn du Cookies deaktivierst.
        </p>
      </section>

      <section className="mt-8 relative z-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Änderungen dieser Datenschutzerklärung</h2>
        <p className="text-lg text-gray-600">
          Wir behalten uns das Recht vor, diese Datenschutzerklärung von Zeit zu Zeit zu aktualisieren, um Änderungen in unseren Praktiken oder gesetzlichen Anforderungen zu berücksichtigen. Änderungen werden auf dieser Seite bekannt gegeben, und das Datum der letzten Aktualisierung wird oben angegeben.
        </p>
      </section>

      <section className="mt-8 relative z-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Distanzierung von fremden Inhalten</h2>
        <p className="text-lg text-gray-600">
          Die Inhalte sämtlicher Links auf unserer Webseite wurden zum Zeitpunkt der Verlinkung sorgfältig geprüft und als unbedenklich eingestuft. Trotzdem möchten wir uns hiermit ausdrücklich von allen externen Inhalten distanzieren, die über diese Links erreichbar sind. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich. 
        </p>
        <p className="text-lg text-gray-600">
          Unsere Links wurden ohne jegliche finanzielle oder sonstige Gegenleistung gesetzt, sodass keine gewerbliche Absicht hinter den Verlinkungen besteht. Sollten technische Probleme auftreten oder Sie auf rechtlich bedenkliche oder unangemessene Inhalte stoßen, die über unsere Webseite zugänglich sind, bitten wir Sie, uns umgehend zu informieren, damit wir entsprechende Maßnahmen ergreifen können.
        </p>
      </section>

      <section className="mt-8 relative z-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Kontakt</h2>
        <p className="text-lg text-gray-600">
          Wenn du Fragen oder Bedenken zu dieser Datenschutzerklärung hast oder deine Rechte gemäß der DSGVO ausüben möchtest, kontaktiere uns bitte unter:
          <br />
          <strong>Email:</strong> privacy@awesomewebsite.com
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
