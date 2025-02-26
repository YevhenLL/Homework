import { configureStore } from '@reduxjs/toolkit';
import countriesReducer from './countries/slice';

export const store = configureStore({
  reducer: {
    countries: countriesReducer
  }
});