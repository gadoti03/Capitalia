import React from 'react';
import { useNavigate } from 'react-router-dom';
import italyMap from '../../assets/cartina.png';

const Cartina = () => {
  const navigate = useNavigate();

  const handleClickRegione = (regione) => {
    navigate(`/homecapoluogo/${regione}`);
  };

  return (
    <div className="cartina-container">
      <img src={italyMap} alt="Mappa Italia" useMap="#image-map" className="mappa-italia" />
      <map name="image-map">
        <area
          shape="poly"
          coords="378,609,377,573,511,566,498,663"
          alt="Palermo"
          title="Palermo"
          onClick={() => handleClickRegione('Palermo')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="189,416,192,538,259,526,264,395"
          alt="Cagliari"
          title="Cagliari"
          onClick={() => handleClickRegione('Cagliari')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="518,474,517,588,540,586,583,529,578,503,558,467,540,478"
          alt="Catanzaro"
          title="Catanzaro"
          onClick={() => handleClickRegione('Catanzaro')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="147,153,121,169,141,228,184,232,194,209,214,204,222,197,236,205,220,177,206,168,207,154,215,156,215,149,208,126,215,112,203,87,181,121,179,137,163,143"
          alt="Torino"
          title="Torino"
          onClick={() => handleClickRegione('Torino')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="126,126,142,146,177,142,177,116"
          alt="Aosta"
          title="Aosta"
          onClick={() => handleClickRegione('Aosta')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="232,202,195,209,159,254,184,245,216,214,267,235,244,203"
          alt="Genova"
          title="Genova"
          onClick={() => handleClickRegione('Genova')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="211,168,240,191,264,170,325,181,294,137,292,79,241,88,217,115,213,127,216,143"
          alt="Milano"
          title="Milano"
          onClick={() => handleClickRegione('Milano')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="240,201,268,212,314,235,336,229,355,252,388,244,366,183,256,175"
          alt="Bologna"
          title="Bologna"
          onClick={() => handleClickRegione('Bologna')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="288,67,296,123,321,130,341,114,350,85,371,70,360,45"
          alt="Trento"
          title="Trento"
          onClick={() => handleClickRegione('Trento')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="390,78,373,100,378,122,405,136,423,137,432,85"
          alt="Trieste"
          title="Trieste"
          onClick={() => handleClickRegione('Trieste')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="364,78,347,100,306,132,303,158,337,181,375,183,401,137,373,117,376,95,387,76"
          alt="Venezia"
          title="Venezia"
          onClick={() => handleClickRegione('Venezia')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="267,215,274,249,301,293,329,337,345,322,355,296,364,269,364,255,338,232,294,231"
          alt="Firenze"
          title="Firenze"
          onClick={() => handleClickRegione('Firenze')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="377,261,395,294,411,311,426,311,438,297,425,261,390,244,377,247"
          alt="Ancona"
          title="Ancona"
          onClick={() => handleClickRegione('Ancona')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="366,264,354,308,379,333,402,326,408,311,387,276"
          alt="Perugia"
          title="Perugia"
          onClick={() => handleClickRegione('Perugia')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="338,326,345,345,375,376,413,398,440,392,440,377,403,353,411,344,406,329,412,318,377,337,371,327,364,321,351,315"
          alt="Roma"
          title="Roma"
          onClick={() => handleClickRegione('Roma')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="438,303,418,320,405,333,405,358,430,370,454,371,466,365,477,350"
          alt="L'Aquila"
          title="L'Aquila"
          onClick={() => handleClickRegione('LAquila')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="445,388,433,406,450,429,477,435,492,477,520,468,520,456,505,427,508,412,492,404,488,395"
          alt="Napoli"
          title="Napoli"
          onClick={() => handleClickRegione('Napoli')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="454,368,446,384,469,391,492,390,486,379,495,366,478,355"
          alt="Campobasso"
          title="Campobasso"
          onClick={() => handleClickRegione('Campobasso')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="533,360,495,367,492,375,488,385,492,397,502,408,520,414,530,411,539,419,550,428,563,434,570,448,580,441,592,450,613,455,633,480,637,460,612,435,565,405,526,389,535,371"
          alt="Bari"
          title="Bari"
          onClick={() => handleClickRegione('Bari')}
          style={{ cursor: 'pointer' }}
        />
        <area
          shape="poly"
          coords="516,413,508,430,518,457,526,468,547,478,549,466,563,459,563,446,559,430,525,409"
          alt="Potenza"
          title="Potenza"
          onClick={() => handleClickRegione('Potenza')}
          style={{ cursor: 'pointer' }}
        />
      </map>
    </div>
  );
};

export default Cartina;
