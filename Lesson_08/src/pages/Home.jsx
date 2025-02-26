import CountryForm from '../components/CountryForm/CountryForm';

export default function Home() {
  return (
    <div className="home-page">
      <div className="grey-background">
        <h3>Home Component 🏡</h3>
      </div>
      <CountryForm />
    </div>
  );
}