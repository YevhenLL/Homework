import { createAsyncThunk } from '@reduxjs/toolkit';
import countriesService from '../../services/api';

export const fetchCountries = createAsyncThunk(
  'countries/fetchCountries',
  async () => {
    const response = await countriesService.getAll();
    return response;
  }
);