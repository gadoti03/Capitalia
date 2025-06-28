import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Importa le pagine
import Autenticazione from './pages/Autenticazione/Autenticazione.jsx'
import Terms from './pages/Terms/Terms.jsx';
import Policy from './pages/Policy/Policy.jsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
import FAQ from './pages/FAQ/FAQ.jsx';

import Cookies from './Components/Cookies/Cookies.jsx';


// Definisci le rotte
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/autenticazione", element: <Autenticazione />},
  { path: "/terms", element: <Terms /> },
  { path: "/policy", element: <Policy /> },
  { path: "/FAQ", element: <FAQ /> },

  { path: "/error/404", element: <PageNotFound /> },
  { path: "*", element: <PageNotFound /> }  // Fallback per route non definiti
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Cookies />
    <RouterProvider router={router} />
  </React.StrictMode>
);
