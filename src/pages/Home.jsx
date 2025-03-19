// src/components/Home.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApiData } from '../redux/apiSlice';
import Dropdown from '../components/Dropdown';
import SearchBar from '../components/SearchBar';
import DataDisplay from '../components/DataDisplay';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import Sidebar from '../components/Sidebar'; // Import the new Sidebar
import { Database, Search } from 'lucide-react';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, selectedApi, query } = useSelector((state) => state.api);

  const handleFetch = () => {
    if (query.trim()) {
      dispatch(fetchApiData({ apiType: selectedApi, query: query.trim() }));
    }
  };

  return (
    <div className="flex">
      {/* Sidebar on the left */}
      <Sidebar />
      
      {/* Main content shifted to the right */}
      <div className="flex-1 ml-64 min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Database className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-800">API Explorer</h1>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Dropdown />
              <SearchBar />
            </div>
            <button
              onClick={handleFetch}
              disabled={!query.trim() || loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-lg px-4 py-2 flex items-center justify-center gap-2 transition-colors"
            >
              <Search size={20} />
              Fetch Data
            </button>
          </div>
          <div className="space-y-4">
            {loading && <Loader />}
            {error && <ErrorMessage message={error} onRetry={handleFetch} />}
            <DataDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;