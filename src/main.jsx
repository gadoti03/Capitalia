import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Importa le pagine
import Autenticazione from './pages/Autenticazione/Autenticazione.jsx'
// import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';

import Cookies from './Components/Cookies/Cookies.jsx';


// Definisci le rotte
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/autenticazione", element: <Autenticazione />},

  // { path: "*", element: <PageNotFound /> }  // Fallback per route non definiti
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Cookies />
    <RouterProvider router={router} />
  </React.StrictMode>
);
