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

export function setCookie(name, value, days = 1, path = '/') {
  // Importante: Controlla se document è disponibile (utile per Server-Side Rendering)
  if (typeof document === 'undefined') {
    return;
  }

  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Converte i giorni in millisecondi
    expires = "; expires=" + date.toUTCString();
  }

  // Imposta il cookie con nome, valore, scadenza e path
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=" + path;
}

export function deleteCookie(name, path = '/') {
  // Importante: Controlla se document è disponibile (utile per Server-Side Rendering)
  if (typeof document === 'undefined') {
    return;
  }

  // Imposta il cookie con una scadenza passata per forzarne l'eliminazione
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=" + path + ";";
}
