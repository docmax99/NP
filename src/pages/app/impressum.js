import React from 'react';

const Impressum = () => {
  return (
    <div className="max-w-4xl mx-auto p-10 bg-gray-50 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 border-b-4 border-gray-300 pb-4">Impressum</h1>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Provider dieser unglaublich gut aussehenden und ansprechenden Website:</h2>
        <p className="text-lg text-gray-600">
          <strong>Eric Uphoff & Louis Schneider</strong><br />
          (codierend, designend und gelegentlich diskutierend, ob Pizza oder Döner die bessere Coding-Nahrung ist)
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Firmenadresse (aber eigentlich arbeiten wir überall, wo's WLAN gibt):</h2>
        <p className="text-lg text-gray-600">
          Wohnzimmer, Cafés oder die Uni – je nach Laune und Koffeinpegel.<br />
          Offiziell natürlich: Duale Hochschule Baden-Württemberg Mannheim Coblitzallee 1-9 68163 Mannheim (wenn wir mal zu finden sein sollen).
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Wichtige Leute:</h2>
        <p className="text-lg text-gray-600">
            <strong>Louis Schneider</strong> (CEO, CTO, CFO, COO und König von allem, was er sieht)<br />
            <strong>Eric Uphoff</strong> ("Ist auch dabei")<br />
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Umsatzsteuer-Identifikationsnummer:</h2>
        <p className="text-lg text-gray-600">Nein, gibt's noch nicht, aber wir arbeiten dran!</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Handelsregisternummer:</h2>
        <p className="text-lg text-gray-600">Irgendetwas mit einer 2 am Ende.</p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Kontakt:</h2>
        <p className="text-lg text-gray-600">
          Du hast Fragen, Lob, Kritik oder einfach nur Langeweile? Dann schreib uns gerne an:
          <br />
          <strong>Email:</strong> schreib.uns@supercoolewebsite.com
          <br />
          Oder versuch's einfach per Flaschenpost – das klappt immer!.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Verantwortlich für Zahlungen:</h2>
        <p className="text-lg text-gray-600">
          Das machen wir selbst!
        </p>
      </section>
    </div>
  );
};

export default Impressum;
