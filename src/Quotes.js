import React, {useState, useEffect} from 'react';
import './Quotes.css';
import axios from 'axios';

function Quotes() {

  const [quote, setQuote] = useState('');
  const [id, setId] = useState([]);

  const getRandomNumber = (dataQuotes) => {
    const min = 0;
    const max = dataQuotes.length;
    return Math.floor(Math.random() * (max - min) ) + min;
  } 

  useEffect(() => {
    getQuote();
  }, []);
  
  const handleId = (idb) => {
    setId([...id, idb]);
  };
  
  const url = "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json";

  const getQuote = (prevId) => {
    axios.get(url)
    .then((response) => {
      let dataQuotes = response.data;
      let randomId = prevId || getRandomNumber(dataQuotes);
      let randomQuote = dataQuotes[randomId];
      setQuote(randomQuote.quote);
      if(!prevId) {
        handleId(randomId)
      }

    }) 
  }
  
  const handleNewClick = () => {
    getQuote();
  }

  const handleLastClick = () => {
    id.pop();
    setId([...id]);
    getQuote(id[id.length -1]);
  }

  if(quote) {
    return (
      <div className="quotes">
        <h1>Cytaty</h1>
        <p className="quote">
          <b>{id[id.length - 1]}.</b> {quote}
        </p>

        <button className="btn" onClick={handleNewClick}> Losowy</button>
        <button className="btn"  onClick={handleLastClick} disabled={id.length > 1 ? '' : 'disabled'}>Poprzedni</button>

    </div>
    );
  }

  return (
    <div>Brak cytatów do wyświetlenia.</div>
  )
}

export default Quotes;
