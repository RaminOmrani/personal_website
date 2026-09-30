import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import '@fontsource-variable/vazirmatn';
import '@fontsource-variable/geist';
import './styles.css';
import { App } from './App';

const root = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The production build ships prerendered HTML; the dev server does not.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
