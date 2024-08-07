import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/translation.json'),
    },
    fallbackLng: 'en',
    preload: ['en', 'es'],
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
    },
  });

export default i18next;
