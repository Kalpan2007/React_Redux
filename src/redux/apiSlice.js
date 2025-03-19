import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const POKEMON_API = 'https://pokeapi.co/api/v2/pokemon';
const GITHUB_API = 'https://api.github.com/users';
const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_API_KEY = 'YOUR_API_KEY'; // Note: In production, use environment variables

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
      switch (apiType) {
        case 'pokemon':
          response = await fetch(`${POKEMON_API}/${query.toLowerCase()}`);
          break;
        case 'github':
          response = await fetch(`${GITHUB_API}/${query}`);
          break;
        case 'weather':
          response = await fetch(
            `${WEATHER_API}?q=${query}&units=metric&appid=${WEATHER_API_KEY}`
          );
          break;
        default:
          throw new Error('Invalid API type');
      }

      if (!response.ok) {
        throw new Error('Failed to fetch data');
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