import { useState, useEffect } from "react";
import axios from "axios";

const CountryList = ({ countries,handleShow }) => {
  if (countries.length > 10) {
    return <p>Too many matches,specify another filter</p>;
  }
  if (countries.length > 1) {
    return (
      <div>
        {countries.map((c) => (
          <>
            <p>
              {c.name.common}
              <button onClick={()=>handleShow(c)}>show</button>
            </p>
          </>
        ))}
      </div>
    );
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]}/>
    
  }
};


const CountryDetails = ({country})=>{
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
    </div>
  );

}

function App() {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry,setSelectedCountry] = useState(null)

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((res) => {
        console.log(res.data);
        const filterCountries = res.data.filter((c) =>
          c.name.common.toLowerCase().includes(input.toLowerCase())
        );

        setCountries(filterCountries);
        selectedCountry(null)
      });
  }, [input]);

  return (
    <>
      <div>
        <label>find countries</label>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
      </div>

      {selectedCountry ? (
        <CountryDetails country={selectedCountry}/>
      ) :(
        <CountryList countries={countries} handleShow={setSelectedCountry}/>

      )
      }

    </>
  );
}

export default App;
