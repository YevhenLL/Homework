import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCountry } from '../../store/countries/slice';

export default function CountriesList() {
  const { countries } = useSelector(state => state.countries);
  const dispatch = useDispatch();

  const handleDelete = (common) => {
    dispatch(deleteCountry(common));
  };

  return (
    <div>
      <h2>Countries list</h2>
      <div className="countries-list">
        {countries.map(country => (
          <div key={country.id} className="country-item">
            {country.flag}   
            <Link to={`/countries/${country.name.common}`}>
              {country.name.common}
            </Link>   
            <button onClick={() => handleDelete(country.name.common)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}