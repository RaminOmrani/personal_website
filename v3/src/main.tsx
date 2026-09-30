import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/estedad';
import '@fontsource-variable/noto-nastaliq-urdu';
// English page: Bricolage Grotesque for headlines, Instrument Sans for reading, Instrument Serif italic
// for the calligraphic accents. Browsers only download the faces a page actually uses.
import '@fontsource-variable/bricolage-grotesque/opsz.css';
import '@fontsource-variable/instrument-sans';
import '@fontsource/instrument-serif/400-italic.css';
import './styles/index.css';
import { App } from './App';
import { pageLang } from './i18n';

const root = document.getElementById('root')!;
// the HTML says which language this page is (index.html: Persian, en.html: English)
const lang = pageLang(root);
const app = (
  <StrictMode>
    <App lang={lang} />
  </StrictMode>
);

// The production build ships prerendered HTML; the dev server does not.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
