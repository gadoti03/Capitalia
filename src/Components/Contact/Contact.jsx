import React from 'react'

import './Contact.css'

import { FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';

import msg_icon from "../../assets/msg_icon.png"
import mail_icon from "../../assets/mail_icon.png"
import location_icon from "../../assets/location_icon.png"
import white_arrow from "../../assets/white_arrow.png"

const Contact = () => {
  const [result, setResult] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Inverte lo stato attuale della checkbox
  };

  const onSubmit = async (event) => {
    event.preventDefault(); //previene il comportamento predefinito del form di ricaricare la pagina quando viene inviato.
    setResult("Messaggio non inviato, si prega di accettare i Termini di servizio e la Privacy Policy");
    if(isChecked){
      event.preventDefault(); //previene il comportamento predefinito del form di ricaricare la pagina quando viene inviato.
      setResult("Invio in corso...");
      const formData = new FormData(event.target); //Crea un nuovo oggetto FormData contenente i dati del form. event.target fa riferimento al form stesso, quindi tutti i dati inseriti dall'utente vengono inclusi in formData.
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
      if(true){
        formData.append("access_key", "2218a2a8-8714-4c75-8d6e-2b161d418316");
  
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          body: formData
        });
    
        const data = await response.json();
  
        if (data.success) {
          setResult("Messaggio inviato con successo");
          event.target.reset();
        } else {
          console.log("Error", data);
          setResult(data.message);
        }
      }
    }
  };
  return (
    <div className='contact'>
    <div className='contact-col'>
        <h3>Mandaci un messaggio<img src={msg_icon} alt=""/></h3>
        <p>Sentiti libera/o di contattarci per qualsiasi necessità o suggerimento. Il tuo feedback ci aiuterà a migliorare continuamente i nostri servizi e a soddisfare meglio le tue esigenze.</p>
        <ul>
        <li><img src={mail_icon} alt=""/><a href="mailto:info@tasl.it">info@tasl.it</a></li>
        <li>
          <FaWhatsapp color="#25D366" className='contact-icon'/> {/* Icona WhatsApp */}
            <a href="https://api.whatsapp.com/send?phone=390971282212" target="_blank" rel="noopener noreferrer">
              +39 0971 282212
            </a>
        </li>
        <li>
          <FaFacebook color="#3b5998" className='contact-icon'/> {/* Icona Facebook */}
            <a href="https://www.facebook.com/profile.php?id=61563875285189&locale=it_IT" target="_blank" rel="noopener noreferrer">
              Facebook Page
            </a>
        </li>
        <li>
          <FaInstagram color="#3b5998" className='contact-icon'/> {/* Icona Facebook */}
            <a href="https://www.instagram.com/tasl.formazione/" target="_blank" rel="noopener noreferrer">
              Instagram Page
            </a>
        </li>
        <li><img src={location_icon} alt=""/>via Giovanni Leone 3, Tito (PZ)<br/>85050, Italia</li>
        </ul>
    </div>
    <div className="contact-col">
        <form onSubmit={onSubmit}>
            <label>Il tuo nome</label>
            <input type="text" name='name' placeholder='Inserisci il tuo nome' required/>
            <label>La tua mail</label>
            <input type="mail" name='mail' placeholder='Inserisci la tua mail' required/>
            <label>Il tuo numero di telefono</label>
            <input type="tel" name='phone' placeholder='Inserisci il tuo numero di telefono' required/>
            <label>Scrivi qua il tuo messaggio</label>
            <textarea name='message' rows='6' placeholder='Inserisci il tuo messaggio' required></textarea>
            <button name='sumbit' className='btn dark-btn'>Invia ora<img src={white_arrow} alt=""/></button>
          </form>
          <span>
            <input type="checkbox" onChange={handleCheckboxChange}/>
              <label style={{color: '#333'}}>
                {' '} Per continuare è necessario accettare i <a href="/terms" style={{ color: 'blue' }}> Termini di servizio</a> e la<a href="/policy" style={{ color: 'blue' }}> Privacy Policy</a>
              </label>
          </span>
        <span>{result}</span>
    </div>
    </div>
  )
}

export default Contact