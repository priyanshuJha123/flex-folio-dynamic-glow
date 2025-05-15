
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Make sure we have a root element to render to
const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found! Make sure there's a div with id 'root' in your HTML.");
} else {
  createRoot(rootElement).render(<App />);
}
