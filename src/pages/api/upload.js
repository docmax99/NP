// pages/api/upload.js
import { supabase } from '@lib/supabaseClient';
import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer();

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error(error);
    res.status(501).json({ error: `Fehler beim Hochladen: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Methode ${req.method} nicht erlaubt` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
  const { filePath } = req.body;
  const file = req.file;

  // Upload zu Supabase Storage
  const { error } = await supabase.storage
    .from('your-bucket-name') // Ersetze durch den Namen deines Buckets
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
    });

  if (error) {
    console.error(error);
    return res.status(500).json({ error: 'Fehler beim Hochladen zu Supabase.' });
  }

  res.status(200).json({ message: 'Bild erfolgreich hochgeladen!' });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Multer benötigt bodyParser deaktiviert
  },
};
