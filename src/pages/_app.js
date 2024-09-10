// pages/_app.js
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  // Verwende das Layout, das auf Seitenebene definiert wurde
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
