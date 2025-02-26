import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function CountryForm() {
  const countries = useSelector(state => state.countries.countries);
  const navigate = useNavigate();
  const [selectedCapital, setSelectedCapital] = useState('');
  const [selectedTranslation, setSelectedTranslation] = useState('');

  useEffect(() => {
    if (countries.length > 0) {
      setSelectedCapital(countries[0].capital[0]);
      setSelectedTranslation(Object.keys(countries[0].translations)[0]);
    }
  }, [countries]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const country = countries.find(c => c.capital[0] === selectedCapital);
    if (country) {
      navigate(`/countries/${country.name.common}?translation=${selectedTranslation}`);
    }
  };

  return (
    <div className="grey-background">
      <h2>Country Form Component</h2>
      <form onSubmit={handleSubmit} className="country-form">
        <h3>Select Capital</h3>
        <select 
          value={selectedCapital}
          onChange={(e) => setSelectedCapital(e.target.value)}
        >
          {countries.map(country => (
            <option key={country.id} value={country.capital[0]}>
              {country.flag} {country.capital[0]}
            </option>
          ))}
        </select>

        <h3>Select Translation</h3>
        <select
          value={selectedTranslation}
          onChange={(e) => setSelectedTranslation(e.target.value)}
        >
          {selectedCapital && countries
            .find(c => c.capital[0] === selectedCapital)?.translations &&
            Object.keys(countries.find(c => c.capital[0] === selectedCapital).translations)
            .map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))
          }
        </select>

        <button type="submit">
          Read more about {selectedCapital ? 
            countries.find(c => c.capital[0] === selectedCapital)?.name.common : 
            'country'}
        </button>
      </form>
    </div>
  );
}