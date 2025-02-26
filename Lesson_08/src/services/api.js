import axios from 'axios';

const API_URL = 'https://679286cdcf994cc6804a5368.mockapi.io/countries';

const countriesService = {
  getAll: () => axios.get(API_URL).then(({ data }) => data)
};

export default countriesService;