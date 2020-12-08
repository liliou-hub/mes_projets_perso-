import React, { useState } from 'react';
const api = {
  key: "6f69c5841927cc881dca8b055eac5fd9",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setweather] = useState({});

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setweather(result);
          setQuery('');
          console.log('je suis le search', result);
        })
    }
  }

  const dateBuilder = (v) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[v.getDay()];
    let date = v.getDate();
    let month = months[v.getMonth()];
    let year = v.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className={
      (typeof weather.main != "undefined")
        ? ((weather.main.temp > 16)
          ? 'app warm'
          : 'app cold')
        : 'app cold'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}
              </div>
              <div className="weather"> {weather.weather[0].main}</div>
            </div>
          </div>
        )
          : ('')}
      </main>
    </div >
  );

}

export default App;
