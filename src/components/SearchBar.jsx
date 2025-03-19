import React from 'react';
import { Search } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery } from '../redux/apiSlice';

const placeholders = {
  pokemon: 'Enter Pokémon name (e.g., pikachu)',
  github: 'Enter GitHub username',
  weather: 'Enter city name',
};

const SearchBar = () => {
  const dispatch = useDispatch();
  const { selectedApi, query } = useSelector((state) => state.api);

  return (
    <div className="relative">
      <input
        type="text"
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholders[selectedApi]}
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
      />
      <Search
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={20}
      />
    </div>
  );
};

export default SearchBar;