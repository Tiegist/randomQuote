import React, { useState, useEffect } from 'react';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('Loading quote...');
  const [savedQuotes, setSavedQuotes] = useState([]);

  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('https://api.quotable.io/random');
      const data = await response.json();
      setQuote(data.content);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Failed to fetch quote');
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const generateQuote = () => {
    fetchRandomQuote();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(quote);
    alert('Quote copied to clipboard!');
  };

  const shareOnTwitter = () => {
    const tweetText = encodeURIComponent(quote);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, '_blank');
  };

  const saveQuote = () => {
    setSavedQuotes(prevQuotes => [...prevQuotes, quote]);
  };

  const resetQuotes = () => {
    setSavedQuotes([]);
  };

  return (
    <div className='boxcontainer'>
      <h1 className='h1'>Random Quote Generator</h1>
    
      <div className="btngroups">
      <div className="btngroupone">
      <button className='btn' onClick={generateQuote}>Generate Quote</button>
      <button className='btn' id='btn2' onClick={copyToClipboard}>Copy to Clipboard</button>
      <button className='btn'id='btn3' onClick={shareOnTwitter}>Share on Twitter</button>
      </div>
      <div className="btngrouptwo">
      <button className='btn' id='btn4' onClick={saveQuote}>Save Quote</button>
      <button className='btn' id='btn5' onClick={resetQuotes}>Reset Quotes</button>
      </div>
      </div>
    
      <div className='qoutediv'>
        <p className='qoute'>{quote}</p>
      </div>
      <h2 className='h2'>Saved Quotes</h2>
      {savedQuotes.length === 0 ? (
        <p className='noqoutetext'>No quotes saved</p>
      ) : (
        <ul className='saved-quotes'>
          {savedQuotes.map((savedQuote, index) => (
            <li key={index}>{savedQuote}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuoteGenerator;