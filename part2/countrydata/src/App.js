import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css';
import { CountryCard } from './components/CountryCard';

function App() {
  const [query, setQuery] = useState('')
  const [dataset, setDataset] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setDataset(response.data)
      })
  }, [])

  const countries = query.trim().length > 0
    ? dataset.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Find Countries <input type="search" value={query} onChange={e => setQuery(e.target.value)} />
        </p>
        <div>
          {countries.length > 10 ?
            <p>Too many matches, specify your filter</p> :
            countries.map(c => <CountryCard key={c.alpha3Code} country={c} />)
          }
        </div>

      </header>
    </div>
  );
}

export default App;
