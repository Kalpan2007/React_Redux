/**
 * @typedef {'pokemon' | 'github' | 'weather'} ApiType
 */

/**
 * @typedef {Object} ApiState
 * @property {any} data - The API response data
 * @property {boolean} loading - Whether the API is currently loading
 * @property {string | null} error - Error message if the API call fails
 * @property {ApiType} selectedApi - The currently selected API type
 * @property {string} query - The search query for the API
 */

/**
 * @typedef {Object} PokemonData
 * @property {string} name - The name of the Pokémon
 * @property {{ type: { name: string } }[]} types - Array of Pokémon types
 * @property {{ ability: { name: string } }[]} abilities - Array of Pokémon abilities
 * @property {{ other: { 'official-artwork': { front_default: string } } }} sprites - Pokémon sprite images
 */

/**
 * @typedef {Object} GithubData
 * @property {string} login - GitHub username
 * @property {string} avatar_url - URL to the user's avatar
 * @property {number} public_repos - Number of public repositories
 * @property {number} followers - Number of followers
 * @property {number} following - Number of users being followed
 */

/**
 * @typedef {Object} WeatherData
 * @property {string} name - City name
 * @property {{ temp: number, feels_like: number, humidity: number }} main - Main weather data
 * @property {{ main: string, description: string }[]} weather - Weather conditions
 */

export {};