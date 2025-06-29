import React, { Component } from 'react';
import './ModificaProfiloBanner.css'; // Importa il file CSS

class ModificaProfiloBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Inizializza lo stato del form con i dati attuali del profilo
      username: props.currentProfilo.username || '',
      biografia: props.currentProfilo.biografia || '',
      // L'immagine è disabilitata per la modifica qui, ma possiamo visualizzarla
      url_immagine_profilo: props.currentProfilo.url_immagine_profilo || '/default-avatar.png',
    };
    this.wrapperRef = React.createRef(); // Crea un riferimento per l'elemento del banner
  }

  // Aggiunge un event listener al documento quando il componente viene montato
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  // Rimuove l'event listener dal documento quando il componente viene smontato
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  // Gestisce i click fuori dal banner per chiuderlo
  handleClickOutside = (event) => {
    // Se il riferimento esiste e il click non è all'interno del banner
    if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
      this.props.onClose(); // Chiama la funzione onClose passata dalle props
    }
  };

  // Gestisce i cambiamenti negli input del form
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Gestisce la sottomissione del form
  handleSubmit = (e) => {
    e.preventDefault(); // Previene il comportamento di default di ricarica della pagina
    const { username, biografia } = this.state;
    // Chiama la funzione onSave passata dalle props, inviando i dati aggiornati
    this.props.onSave({ username, biografia });
  };

  render() {
    const { username, biografia, url_immagine_profilo } = this.state;
    const { onClose } = this.props; // Prendo onClose direttamente dalle props

    return (
      // Overlay che copre l'intera pagina
      <div className="modifica-profilo-overlay">
        {/* Il banner modale vero e proprio */}
        <div className="modifica-profilo-banner" ref={this.wrapperRef}>
          {/* Header del banner con titolo e pulsante di chiusura */}
          <div className="banner-header">
            <h2>Modifica Profilo</h2>
            <button className="close-button" onClick={onClose} aria-label="Chiudi">
              &times; {/* Carattere X */}
            </button>
          </div>

          {/* Contenuto del form di modifica */}
          <div className="banner-content">
            {/* Campo Immagine Profilo (disabilitato) */}
            <div className="form-group">
              <label>Immagine Profilo (disabilitato)</label>
              <div className="profile-image-preview">
                <img
                  src={url_immagine_profilo}
                />
              </div>
              <input type="file" disabled className="disabled-input" />
              <p className="disabled-text">La modifica dell'immagine di profilo è disabilitata in questa versione.</p>
            </div>

            {/* Campo Username */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={this.handleChange}
                placeholder="Inserisci il tuo nuovo username"
                maxLength="50" // Limite di lunghezza per il campo
              />
            </div>

            {/* Campo Biografia */}
            <div className="form-group">
              <label htmlFor="biografia">Biografia</label>
              <textarea
                id="biografia"
                name="biografia"
                value={biografia}
                onChange={this.handleChange}
                rows="4" // Numero di righe visibili di default
                placeholder="Racconta qualcosa di te..."
                maxLength="500" // Limite di lunghezza per la biografia
              ></textarea>
            </div>
          </div>

          {/* Footer del banner con pulsanti Annulla e Salva */}
          <div className="banner-footer">
            <button className="btn btn-secondary" onClick={onClose}>Annulla</button>
            <button className="btn btn-primary" onClick={this.handleSubmit}>Salva Modifiche</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ModificaProfiloBanner;