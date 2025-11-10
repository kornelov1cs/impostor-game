import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import global styles
import { fontsImport, globalReset, globalStyles, utilities } from './styles/global';

// Apply global styles by importing them
// Linaria extracts these at build time automatically
// The imports above ensure the CSS is included in the bundle
void fontsImport;
void globalReset;
void globalStyles;
void utilities;

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
