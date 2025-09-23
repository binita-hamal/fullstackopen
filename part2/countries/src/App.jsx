import { useState, useEffect } from "react";
import axios from "axios";
const api_key = import.meta.env.VITE_API_KEY;

const CountryList = ({ countries, handleShow }) => {
  if (countries.length === 0) return null;
  if (countries.length > 10) {
    return <p>Too many matches,specify another filter</p>;
  }
  if (countries.length > 1) {
    return (
      <div>
        {countries.map((c) => (
          <p key={c.cca3}>
            {c.name.common}
            <button onClick={() => handleShow(c)}>show</button>
          </p>
        ))}
      </div>
    );
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />;
  }
};

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const capital = country.capital ? country.capital[0] : null;

  console.log("API KEY:", import.meta.env.VITE_API_KEY);

  useEffect(() => {
    if (!capital) return;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
      )
      .then((res) => {
        setWeather(res.data);
      });
  }, [capital]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital ? country.capital[0] : "N/A"}</p>
      <p>area {country.area}</p>

      <h3>languages:</h3>
      <ul>
        {country.languages &&
          Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
      </ul>

      <img src={country.flags.png} />

      {weather && (
        <div>
          <h3>Weather in {capital}</h3>
          <p>temperature {weather.main.temp} C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>wind {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((res) => {
        console.log(res.data);
        const filterCountries = res.data.filter((c) =>
          c.name.common.toLowerCase().includes(input.toLowerCase())
        );

        setCountries(filterCountries);
        setSelectedCountry(null);
      });
  }, [input]);

  return (
    <>
      <div>
        <label>find countries</label>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
      </div>

      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : (
        <CountryList countries={countries} handleShow={setSelectedCountry} />
      )}
    </>
  );
}

export default App;
