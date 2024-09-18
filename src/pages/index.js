import Link from "next/link";
// pages/index.js
export default function Home() {
  return (
    <div>
     
      <h1>Willkommen auf meiner Next.js-Seite!</h1>
      <Link href={'/app/home'}>
      <p>Dies ist die Startseite der Anwendung.</p>
      </Link>
      <p> Das ist der Test</p>
      <p class="text-sky-400">The quick brown fox...</p>
    </div>
    
  );
}

// Optional: Definiere hier das Layout für diese Seite
Home.getLayout = function getLayout(page) {
  return (
    <main>
      <header>
        <h2>Meine Beispielseite</h2>
      </header>
      {page}
      <footer>
        <p>© 2024, Mein Beispiel-Layout</p>
      </footer>
    </main>
  );
};
