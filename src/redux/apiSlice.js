import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon';
const GITHUB_API = 'https://api.github.com/users';
const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';

// Replace with your valid OpenWeather API key
const WEATHER_API_KEY = '838d91a3ebb405f50bbf37bf1b1e868c'; 

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
          break;
        case 'github':
          response = await fetch(`${GITHUB_API}/${normalizedQuery}`);
          break;
        case 'weather':
          response = await fetch(
            `${WEATHER_API}?q=${encodeURIComponent(normalizedQuery)}&units=metric&appid=${WEATHER_API_KEY}`
          );
          break;
        default:
          throw new Error('Invalid API type');
      }

      if (!response.ok) {
        const errorText = await response.text();
        if (response.status === 401 && apiType === 'weather') {
          throw new Error('Invalid Weather API key. Please check your API key in apiSlice.js.');
        } else if (response.status === 404) {
          throw new Error(`Weather data not found for "${normalizedQuery}". Try a different city.`);
        } else {
          throw new Error(`Failed to fetch ${apiType} data: ${errorText} (Status: ${response.status})`);
        }
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
      state.data = null; // Reset data
      state.error = null; // Reset error
      // Note: We DO NOT reset state.query here, so it persists (e.g., "Surat")
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