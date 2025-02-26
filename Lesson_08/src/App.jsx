import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchCountries } from './store/countries/thunks';
import { ROUTES } from './constants/routes';
import Navigation from './components/Navigation/Navigation';
import Home from './pages/Home';
import Countries from './pages/Countries';
import CountryDetails from './components/CountryDetails/CountryDetails';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.COUNTRIES} element={<Countries />} />
        <Route path={ROUTES.COUNTRY} element={<CountryDetails />} />
      </Routes>
    </BrowserRouter>
  );
}