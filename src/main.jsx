import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

// Importa le pagine
import Terms from './pages/Terms/Terms.jsx';
import Policy from './pages/Policy/Policy.jsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
import FAQ from './pages/FAQ/FAQ.jsx';
import Polo128CdL from './pages/Polo128CdL/Polo128CdL.jsx';
import Polo128 from './pages/Polo128/Polo128.jsx';
import Polo128CorsiSingoli from './pages/Polo128CorsiSingoli/Polo128CorsiSingoli.jsx';
import Economia from './pages/pagesCdL/ECONOMIA/ECONOMIA.jsx';
import ScienzeDelTurismoPerIlManagementEBeniCulturali from './pages/pagesCdL/SCIENZE DEL TURISMO PER IL MANAGEMENT E I BENI CULTURALI/SCIENZE DEL TURISMO PER IL MANAGEMENT E I BENI CULTURALI.jsx';
import ScienzeDellaComunicazione from './pages/pagesCdL/SCIENZE DELLA COMUNICAZIONE/SCIENZE DELLA COMUNICAZIONE.jsx';
import ScienzePoliticheESociali from './pages/pagesCdL/SCIENZE POLITICHE E SOCIALI/SCIENZE POLITICHE E SOCIALI.jsx';
import ServiziGiuridici from './pages/pagesCdL/SERVIZI GIURIDICI/SERVIZI GIURIDICI.jsx';
import IngegneriaCivileEAmbientale from './pages/pagesCdL/INGEGNERIA CIVILE E AMBIENTALE/INGEGNERIA CIVILE E AMBIENTALE.jsx';
import IngegneriaIndustriale from './pages/pagesCdL/INGEGNERIA INDUSTRIALE/INGEGNERIA INDUSTRIALE.jsx';
import IngegneriaInformaticaEDellAutomazione from './pages/pagesCdL/INGEGNERIA INFORMATICA E DELLA AUTOMAZIONE/INGEGNERIA INFORMATICA E DELLA AUTOMAZIONE.jsx';
import DesignEDisciplineDellaModa from './pages/pagesCdL/DESIGN E DISCIPLINE DELLA MODA/DESIGN E DISCIPLINE DELLA MODA.jsx';
import LetteraturaArteMusicaESpettacolo from './pages/pagesCdL/LETTERATURA ARTE MUSICA E SPETTACOLO/LETTERATURA ARTE MUSICA E SPETTACOLO.jsx';
import LingueECultureEuropeeEDelRestoDelMondo from './pages/pagesCdL/LINGUE E CULTURE EUROPEE E DEL RESTO DEL MONDO/LINGUE E CULTURE EUROPEE E DEL RESTO DEL MONDO.jsx';
import ScienzeDelleAttivitaMotorieESportive from './pages/pagesCdL/SCIENZE DELLE ATTIVITA MOTORIE E SPORTIVE/SCIENZE DELLE ATTIVITA MOTORIE E SPORTIVE.jsx';
import ScienzeDellEducazioneEDellaFormazione from './pages/pagesCdL/SCIENZE DELLA EDUCAZIONE E DELLA FORMAZIONE/SCIENZE DELLA EDUCAZIONE E DELLA FORMAZIONE.jsx';
import ScienzeETecnichePsicologiche from './pages/pagesCdL/SCIENZE E TECNICHE PSICOLOGICHE/SCIENZE E TECNICHE PSICOLOGICHE.jsx';
import ScienzeBiologiche from './pages/pagesCdL/SCIENZE BIOLOGICHE/SCIENZE BIOLOGICHE.jsx';
import GiurisprudenzaM from './pages/pagesCdL/GIURISPRUDENZA M/GIURISPRUDENZA M.jsx';
import ScienzeDellEconomiaS from './pages/pagesCdL/SCIENZE DELLA ECONOMIA S/SCIENZE DELLA ECONOMIA S.jsx';
import IngegneriaCivileS from './pages/pagesCdL/INGEGNERIA CIVILE S/INGEGNERIA CIVILE S.jsx';
import IngegneriaIndustrialeS from './pages/pagesCdL/INGEGNERIA INDUSTRIALE S/INGEGNERIA INDUSTRIALE S.jsx';
import IngegneriaInformaticaEDellAutomazioneS from './pages/pagesCdL/INGEGNERIA INFORMATICA E DELLA AUTOMAZIONE S/INGEGNERIA INFORMATICA E DELLA AUTOMAZIONE S.jsx';
import LetteraturaLinguaECulturaItalianaS from './pages/pagesCdL/LETTERATURA LINGUA E CULTURA ITALIANA S/LETTERATURA LINGUA E CULTURA ITALIANA S.jsx';
import LingueELetteratureModerneETraduzioneInterculturaleS from './pages/pagesCdL/LINGUE E LETTERATURE MODERNE E TRADUZIONE INTERCULTURALE S/LINGUE E LETTERATURE MODERNE E TRADUZIONE INTERCULTURALE S.jsx';
import PsicologiaS from './pages/pagesCdL/PSICOLOGIA S/PSICOLOGIA S.jsx';
import ScienzeDellEsercizioFisicoPerIlBenessereELaSaluteS from './pages/pagesCdL/SCIENZE DELLO ESERCIZIO FISICO PER IL BENESSERE E LA SALUTE S/SCIENZE DELLO ESERCIZIO FISICO PER IL BENESSERE E LA SALUTE S.jsx';
import ScienzeDellaNutrizioneUmanaS from './pages/pagesCdL/SCIENZE DELLA NUTRIZIONE UMANA S/SCIENZE DELLA NUTRIZIONE UMANA S.jsx';
import ScienzePedagogicheS from './pages/pagesCdL/SCIENZE PEDAGOGICHE S/SCIENZE PEDAGOGICHE S.jsx';
import TFA from './pages/TFA/TFA.jsx';
import Moscati from './pages/Moscati/Moscati.jsx';
import Master from './pages/Master/Master.jsx';
import Cookies from './Components/Cookies/Cookies.jsx';
import CFU30 from './pages/30CFU/30CFU.jsx';
import News from './pages/News/News.jsx';

// Definisci le rotte
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/terms", element: <Terms /> },
  { path: "/policy", element: <Policy /> },
  { path: "/FAQ", element: <FAQ /> },
  { path: "/Polo_universitario_128_eCampus", element: <Polo128 /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea", element: <Polo128CdL /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_Singoli", element: <Polo128CorsiSingoli /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/ECONOMIA (D.M. 270/04)", element: <Economia /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/SCIENZE DEL TURISMO PER IL MANAGEMENT E I BENI CULTURALI", element: <ScienzeDelTurismoPerIlManagementEBeniCulturali /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/SCIENZE DELLA COMUNICAZIONE", element: <ScienzeDellaComunicazione /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/SCIENZE POLITICHE E SOCIALI", element: <ScienzePoliticheESociali /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/SERVIZI GIURIDICI", element: <ServiziGiuridici /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/INGEGNERIA CIVILE E AMBIENTALE (D.M. 270/04)", element: <IngegneriaCivileEAmbientale /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/INGEGNERIA INDUSTRIALE (D.M. 270/04)", element: <IngegneriaIndustriale /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/INGEGNERIA INFORMATICA E DELL'AUTOMAZIONE (D.M. 270/04)", element: <IngegneriaInformaticaEDellAutomazione /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/DESIGN E DISCIPLINE DELLA MODA (D.M. 270/04)", element: <DesignEDisciplineDellaModa /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/LETTERATURA, ARTE, MUSICA E SPETTACOLO", element: <LetteraturaArteMusicaESpettacolo /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/LINGUE E CULTURE EUROPEE E DEL RESTO DEL MONDO", element: <LingueECultureEuropeeEDelRestoDelMondo /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/SCIENZE DELLE ATTIVITA' MOTORIE E SPORTIVE", element: <ScienzeDelleAttivitaMotorieESportive /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/SCIENZE DELL'EDUCAZIONE E DELLA FORMAZIONE", element: <ScienzeDellEducazioneEDellaFormazione /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/SCIENZE E TECNICHE PSICOLOGICHE (D.M. 270/04)", element: <ScienzeETecnichePsicologiche /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/SCIENZE BIOLOGICHE", element: <ScienzeBiologiche /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/GIURISPRUDENZA (D.M. 270/04)", element: <GiurisprudenzaM /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/SCIENZE DELL'ECONOMIA", element: <ScienzeDellEconomiaS /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/INGEGNERIA CIVILE", element: <IngegneriaCivileS /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/INGEGNERIA INDUSTRIALE", element: <IngegneriaIndustrialeS /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/INGEGNERIA INFORMATICA E DELL'AUTOMAZIONE", element: <IngegneriaInformaticaEDellAutomazioneS /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/LETTERATURA, LINGUA E CULTURA ITALIANA", element: <LetteraturaLinguaECulturaItalianaS /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/LINGUE E LETTERATURE MODERNE E TRADUZIONE INTERCULTURALE", element: <LingueELetteratureModerneETraduzioneInterculturaleS /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/PSICOLOGIA", element: <PsicologiaS /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/SCIENZE DELL'ESERCIZIO FISICO PER IL BENESSERE E LA SALUTE", element: <ScienzeDellEsercizioFisicoPerIlBenessereELaSaluteS /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/SCIENZE DELLA NUTRIZIONE UMANA", element: <ScienzeDellaNutrizioneUmanaS /> },
  { path: "/Polo_universitario_128_eCampus/Corsi_di_Laurea/SCIENZE PEDAGOGICHE", element: <ScienzePedagogicheS /> },
  { path: "/TFA", element: <TFA /> },
  { path: "/Scuola Moscati", element: <Moscati /> },
  { path: "/Polo_universitario_128_eCampus/Master", element: <Master /> },
  { path: "/Polo_universitario_128_eCampus/30CFU", element: <CFU30 /> },
  { path: "/News", element: <News /> },
  { path: "/error/404", element: <PageNotFound /> },
  { path: "*", element: <PageNotFound /> }  // Fallback per route non definiti
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Cookies />
    <RouterProvider router={router} />
  </React.StrictMode>
);
