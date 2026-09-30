import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/geist';
import './styles.css';
import { App } from './App';
import { readLang } from './i18n';

const root = document.getElementById('root')!;
// the language is part of the page (index.html = fa, en.html = en), never the URL
const lang = readLang(root);
const app = (
  <StrictMode>
    <App lang={lang} />
  </StrictMode>
);

// The production build ships prerendered HTML; the dev server does not.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
