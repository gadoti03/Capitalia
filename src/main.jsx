import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Importa le pagine
import Autenticazione from './pages/Autenticazione/Autenticazione.jsx'
import Profilo from './pages/Profilo/Profilo.jsx'
// import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';

import Cookies from './Components/Cookies/Cookies.jsx';


const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/autenticazione", element: <Autenticazione /> },
  { path: "/profilo/:username", element: <Profilo /> },
  // { path: "/servizio", element: <Servizio /> },
  // { path: "/:capoluogo", element: <Capoluogo /> },
  // { path: "*", element: <PageNotFound /> } // fallback
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
