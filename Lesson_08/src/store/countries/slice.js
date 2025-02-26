import { createSlice } from '@reduxjs/toolkit';
import { fetchCountries } from './thunks';

const initialState = {
  countries: [],
  isLoading: false
};

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    deleteCountry: (state, action) => {
      state.countries = state.countries.filter(country => 
        country.name.common !== action.payload
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
        state.isLoading = false;
      });
  }
});

export const { deleteCountry } = countriesSlice.actions;
export default countriesSlice.reducer;