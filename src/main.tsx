import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Faq from './pages/Faq.tsx';
import ServicesInfo from './pages/ServicesInfo.tsx';
import About from './pages/About.tsx';
import Cta from './pages/Cta.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/faq',
    element: <Faq />
  },
  {
    path: '/services-info',
    element: <ServicesInfo />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/consultation',
    element: <Cta />
  }
]);

// Get root element once
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

// Create root once and store it
const root = createRoot(rootElement);

// Render app
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);