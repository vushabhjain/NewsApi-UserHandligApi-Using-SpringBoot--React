import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './NewsApi.css'; // Importing the CSS file for styling


function NewsApi({country1}) {
  const [news, setNews] = useState([]);
  const[country, setCountry]=useState("");

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  useEffect(() => {
    if (country1) {
      setCountry(country1);
    }
  }, [country1]);
 
 
  // Store API key in .env
  const url = `https://newsapi.org/v2/everything?q=${country}&from=2025-02-03&to=2025-02-03&sortBy=popularity&apiKey=${API_KEY}`;

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setNews(res.data.articles);
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, [country]); // Empty dependency array ensures it runs only once

  const handleCountryChange=(e)=>{
    setCountry(e.target.value);

  }

  return (
    <div className="news-container">
      <h2 className="news-title">Latest {country} News</h2>
       {/* Country selection dropdown */}
       <div className="country-selector">
        <label htmlFor="country">Select Country: </label>
        <select id="country" onChange={handleCountryChange} value={country}>
          <option value="India">India</option>
          <option value="United-States">United States</option>
          <option value="United-Kingdom">United Kingdom</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
          <option value="Germany">Germany</option>
          {/* Add more country options here */}
        </select>
      </div>

      <div className="news-list">
        {news.map((article, index) => (
          <div key={index} className="news-card">
            <img src={article.urlToImage} alt={article.title} className="news-image" />
            <div className="news-details">
              <h3 className="news-headline">{article.title}</h3>
              <p className="news-description">{article.description}</p>
              <button className="btn btn-primary text-white" type="button">  <a href={article.url} target="_blank" rel="noopener noreferrer" className="news-link">Read More</a></button>
            
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsApi;
