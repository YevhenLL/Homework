import CountryForm from '../components/CountryForm/CountryForm';
import { useSelector } from 'react-redux';

export default function Home() {
  const { countries } = useSelector(state => state.countries);
  
  return (
    <div className="home-page">
      <div className="grey-background">
        <h3>Home Component 🏡</h3>
      </div>
      {countries.length > 0 && <CountryForm />}
    </div>
  );
}