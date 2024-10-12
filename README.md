# 🏡 Nette Plätze – Deine moderne Hausvermietungs-Plattform 🏡

## 🚀 Projektübersicht

**Nette Plätze** ist eine moderne Plattform für die Vermietung von Ferienhäusern, die sich an Nutzer richtet, die auf der Suche nach einzigartigen Erlebnissen sind. Sie bietet eine einfache Möglichkeit, Häuser zu mieten oder zu vermieten. Dieses Projekt entstand als Teil eines **Schulprojekts**, bei dem wir uns bemüht haben, eine professionelle und benutzerfreundliche Lösung zu entwickeln – mit Funktionen wie **Benutzerregistrierung**, **Buchungssystem** und **Google Maps-Integration**.

## 🛠️ Technologien

Um die Plattform leistungsfähig und skalierbar zu machen, haben wir auf die neuesten Technologien gesetzt:

- **Node.js**: Serverseitiger Code für eine reibungslose Verarbeitung.
- **Next.js**: Für das Frontend und serverseitiges Rendering.
- **React.js**: Damit die Benutzeroberfläche interaktiv und modular bleibt.
- **Tailwind CSS**: Für ein flexibles und ansprechendes Design.
- **Supabase**: Open-Source-Backend für Authentifizierung und Datenbankverwaltung.
- **Google Maps API**: Zur Darstellung der Häuser auf einer Karte.

## 🏗️ Setup – So bringst du Nette Plätze zum Laufen

Hier ist, wie du **Nette Plätze** auf deinem Rechner startest:

1. **Repository klonen**:
   ```bash
   git clone <repository-url>
   ```

2. **Abhängigkeiten installieren**:
   ```bash
   npm install
   ```

3. **Supabase-Details einfügen**:
   Erstelle eine `.env`-Datei und trage deine Supabase-Keys ein:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=<deine-supabase-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<dein-supabase-anon-key>
   ```

4. **Entwicklungsumgebung starten**:
   ```bash
   npm run dev
   ```

Öffne deinen Browser und navigiere zu [http://localhost:3000](http://localhost:3000), um die Plattform zu nutzen.

## 💡 Hauptfunktionen

1. **Benutzerregistrierung und Login**
   - Nutzer können sich registrieren, einloggen und ihre Profile verwalten.
   - Passwörter werden sicher gehasht und in der Supabase-Datenbank gespeichert.

2. **Hausverwaltung**
   - Vermieter können ihre Häuser mit Bildern und Beschreibungen hochladen. Die Bilder werden in **Supabase-Buckets** gespeichert und automatisch referenziert.

3. **Buchungssystem**
   - Nutzer können Verfügbarkeiten prüfen und Häuser buchen. Die Buchungsinformationen werden sicher in der Datenbank gespeichert.

4. **Google Maps Integration**
   - Häuser werden auf der Karte angezeigt, sodass Nutzer genau wissen, wo sich das Mietobjekt befindet.

## 🌍 Zukunftspläne

In der Zukunft planen wir:

- **Erweiterte Such- und Filterfunktionen**: Damit Nutzer gezielt nach Preis, Lage oder verfügbaren Daten suchen können.
- **Benutzerbewertungen**: Bewertungen und Feedback von Nutzern für vertrauenswürdige Vermietungen.
- **Integrierte Zahlungsabwicklung**: Um den Buchungsprozess zu vereinfachen.

## 🤓 Was wir gelernt haben

Dieses Projekt hat uns tiefere Einblicke in die Entwicklung mit **Frontend- und Backend-Technologien**, **Datenbank-Management** und die Optimierung der **Benutzererfahrung (UX)** gegeben. Besondere Herausforderungen waren die Integration von **Supabase** für Benutzer-Authentifizierung und Dateispeicher, das Handling von **Echtzeit-Datenbankupdates** und die Gestaltung einer benutzerfreundlichen Oberfläche mit **Tailwind CSS**.

## 📞 Kontakt

Bei Fragen oder Anmerkungen kannst du uns gerne kontaktieren:

- **Eric Uphoff**: [mailto:s232658@student.dhbw.mannheim.de](mailto:s232658@student.dhbw.mannheim.de)
- **Louis Schneider**

---

Projekt von **Louis Schneider & Eric Uphoff** – Wir hoffen, **Nette Plätze** bringt dir genauso viel Spaß wie uns bei der Entwicklung! 🎉

---

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can edit the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
