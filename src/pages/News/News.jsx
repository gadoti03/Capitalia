import React, { useEffect, useState } from 'react';
import './News.css';
import { Link as ScrollLink } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import Navbar2 from '../../Components/Navbar2/Navbar2';
import PreFooter from '../../Components/PreFooter/PreFooter';
import Footer from '../../Components/Footer/Footer';

const News = () => {
  const [newsData, setNewsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchNews = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/gadoti03/tasl/main/data.json');
        if (!response.ok) {
          throw new Error('Errore nel recupero delle notizie');
        }
        const data = await response.json();
        setNewsData(data);  // Salviamo i dati nel nostro stato
        setLoading(false);  // Finito il caricamento
      } catch (err) {
        setError(err.message);  // Gestiamo gli errori
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Caricamento...</div>;
  }
  
  if (error) {
    navigate("/error"); // Reindirizza direttamente alla pagina di errore
    return null; // Evita di renderizzare altro dopo il reindirizzamento
  }

  return (
    <>
      <Navbar2 />
      <div className="news-container">
        {Object.keys(newsData).map((groupKey) => {
          const group = newsData[groupKey];
          return (
            <div key={groupKey}>
              <h1 className="news-heading">{group.title}</h1>
              <div className="news-list">
                {group.articles && group.articles.map((article, index) => {
                  // Evitiamo gli articoli nulli
                  if (article === null) return null;
                  
                  return (
                    <div key={index} className="news-item">
                      {/* Aggiungi un'immagine se presente */}
                      {/*article.image_link && <img src={article.image_link} alt={article.title} className="news-image" />*/}
                      <div className="news-content">
                        <div>
                          <h3 className="news-title">{article.title}</h3>
                          <p className="news-category">{article.category}</p>
                          <p className="news-date">{article.date} - {article.time}</p>
                        </div>
                        <div>
                          <a href={article.link} target="_blank" rel="noopener noreferrer" className="news-link">Leggi di più</a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <PreFooter />
      <Footer />
    </>
  );
};

export default News;
