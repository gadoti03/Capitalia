// src/utils/cookieUtils.js

export function getCookie(name) {
  // Importante: Controlla se document è disponibile (utile per Server-Side Rendering)
  if (typeof document === 'undefined') {
    return null;
  }
  const nameEQ = name + "=";
  const ca = document.cookie.split(';'); // Dividi la stringa di tutti i cookie
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length); // Rimuovi spazi bianchi iniziali
    if (c.indexOf(nameEQ) === 0) { // Se trovi l'inizio del tuo cookie
      return c.substring(nameEQ.length, c.length); // Restituisci solo il valore
    }
  }
  return null; // Cookie non trovato
}