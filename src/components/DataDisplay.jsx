import React from 'react';
import { useSelector } from 'react-redux';
import { Cloud, Github, Zap } from 'lucide-react';

const DataDisplay = () => {
  const { data, selectedApi } = useSelector((state) => state.api);

  if (!data) return null;

  const renderPokemonData = (data) => (
    <div className="bg-gradient-to-br from-red-100 to-blue-100 p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold capitalize">{data.name}</h2>
        <Zap className="text-yellow-500" size={24} />
      </div>
      <img
        src={data.sprites.other['official-artwork'].front_default}
        alt={data.name}
        className="w-48 h-48 mx-auto my-4"
      />
      <div className="space-y-2">
        <div className="flex gap-2">
          {data.types.map((type) => (
            <span
              key={type.type.name}
              className="px-3 py-1 bg-white/50 rounded-full text-sm font-medium"
            >
              {type.type.name}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Abilities:</h3>
          <div className="flex flex-wrap gap-2">
            {data.abilities.map((ability) => (
              <span
                key={ability.ability.name}
                className="px-3 py-1 bg-white/50 rounded-full text-sm"
              >
                {ability.ability.name.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderGithubData = (data) => (
    <div className="bg-gradient-to-br from-gray-100 to-purple-100 p-6 rounded-xl shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={data.avatar_url}
          alt={data.login}
          className="w-16 h-16 rounded-full"
        />
        <div>
          <h2 className="text-xl font-bold">{data.login}</h2>
          <Github className="text-gray-600" size={20} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-white/50 p-3 rounded-lg">
          <div className="text-2xl font-bold">{data.public_repos}</div>
          <div className="text-sm text-gray-600">Repositories</div>
        </div>
        <div className="bg-white/50 p-3 rounded-lg">
          <div className="text-2xl font-bold">{data.followers}</div>
          <div className="text-sm text-gray-600">Followers</div>
        </div>
        <div className="bg-white/50 p-3 rounded-lg">
          <div className="text-2xl font-bold">{data.following}</div>
          <div className="text-sm text-gray-600">Following</div>
        </div>
      </div>
    </div>
  );

  const renderWeatherData = (data) => (
    <div className="bg-gradient-to-br from-blue-100 to-green-100 p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{data.name}</h2>
        <Cloud className="text-blue-500" size={24} />
      </div>
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-5xl font-bold">{Math.round(data.main.temp)}°C</div>
          <div className="text-lg capitalize">{data.weather[0].description}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white/50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-600">Feels Like</div>
            <div className="text-xl font-semibold">
              {Math.round(data.main.feels_like)}°C
            </div>
          </div>
          <div className="bg-white/50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-600">Humidity</div>
            <div className="text-xl font-semibold">{data.main.humidity}%</div>
          </div>
        </div>
      </div>
    </div>
  );

  switch (selectedApi) {
    case 'pokemon':
      return renderPokemonData(data);
    case 'github':
      return renderGithubData(data);
    case 'weather':
      return renderWeatherData(data);
    default:
      return null;
  }
};

export default DataDisplay;