import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedApi } from '../redux/apiSlice';

const apiOptions = [
  { value: 'pokemon', label: 'Pokémon API' },
  { value: 'github', label: 'GitHub API' },
  { value: 'weather', label: 'OpenWeather API' },
];

const Dropdown = () => {
  const dispatch = useDispatch();
  const selectedApi = useSelector((state) => state.api.selectedApi);

  return (
    <div className="relative">
      <select
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={selectedApi}
        onChange={(e) => dispatch(setSelectedApi(e.target.value))}
      >
        {apiOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
        size={20}
      />
    </div>
  );
};

export default Dropdown;