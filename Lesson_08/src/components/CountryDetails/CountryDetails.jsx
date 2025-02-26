import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCountry } from '../../store/countries/slice';

export default function CountryDetails() {
  const { country } = useParams();
  const [searchParams] = useSearchParams();
  const translation = searchParams.get('translation');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const countryData = useSelector(state => 
    state.countries.countries.find(c => c.name.common === country)
  );

  if (!countryData) return null;

  const handleDelete = () => {
    dispatch(deleteCountry(country));
    navigate('/countries');
  };

  const displayName = translation ? 
    countryData.translations[translation]?.official :
    countryData.name.official;

  const renderCountryData = (data, level = 0) => {
    return (
      <ul>
        {Object.entries(data).map(([key, value]) => {
          if (key === 'id') return null;
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return (
              <li key={key}>
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                {renderCountryData(value, level + 1)}
              </li>
            );
          }
          return (
            <li key={key}>
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{' '}
              {Array.isArray(value) ? value.join(', ') : value}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="country-details">
      <div className="grey-background">
        <h3>{displayName}</h3>
        {renderCountryData(countryData)}
        <div className="button-group">
          <button onClick={handleDelete}>Delete country</button>
        </div>
      </div>
      <button onClick={() => navigate('/countries')}>
        Back to Countries
      </button>
    </div>
  );
}