import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Load API URLs and Keys from .env file
const POKEMON_API = import.meta.env.VITE_POKEMON_API;
const GITHUB_API = import.meta.env.VITE_GITHUB_API;
const WEATHER_API = import.meta.env.VITE_WEATHER_API;
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const initialState = {
  data: null,
  loading: false,
  error: null,
  selectedApi: 'pokemon',
  query: '',
};

export const fetchApiData = createAsyncThunk(
  'api/fetchData',
  async ({ apiType, query }, { rejectWithValue }) => {
    try {
      let response;
      const normalizedQuery = query.trim();
      switch (apiType) {
        case 'pokemon':
          response = await fetch(`${POKEMON_API}/${normalizedQuery.toLowerCase()}`);
          if (response.status === 404) {
            throw new Error('Pokemon not found. Please check the name.');
          }
          break;
        case 'github':
          response = await fetch(`${GITHUB_API}/${normalizedQuery}`);
          if (response.status === 404) {
            throw new Error('GitHub user not found. Please check the username.');
          }
          break;
        case 'weather':
          response = await fetch(
            `${WEATHER_API}?q=${encodeURIComponent(normalizedQuery)}&units=metric&appid=${WEATHER_API_KEY}`
          );
          if (response.status === 401) {
            throw new Error('Invalid Weather API key. Please check your API key.');
          } else if (response.status === 404) {
            throw new Error(`Weather data not found for "${normalizedQuery}". Try a different city.`);
          }
          break;
        default:
          throw new Error('Invalid API type');
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch ${apiType} data. Status: ${response.status}`);
      }

      const data = await response.json();
      return { data, apiType };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    setSelectedApi: (state, action) => {
      state.selectedApi = action.payload;
      state.data = null;
      state.error = null;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedApi, setQuery } = apiSlice.actions;
export default apiSlice.reducer;
