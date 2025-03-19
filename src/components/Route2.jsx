// src/components/Route2.jsx
import React from 'react';
import Sidebar from './Sidebar';

const Route2 = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">Route 2</h1>
          <p className="mt-4 text-gray-600">This is the Route 2 page.</p>
        </div>
      </div>
    </div>
  );
};

export default Route2;