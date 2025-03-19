// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, List, Map, Settings } from 'lucide-react'; // Icons for visual appeal

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4 fixed">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'flex items-center gap-2 bg-gray-600 p-2 rounded' : 'flex items-center gap-2 p-2 hover:bg-gray-700 rounded'
          }
        >
          <Home size={20} />
          Home
        </NavLink>
        <NavLink
          to="/route2"
          className={({ isActive }) =>
            isActive ? 'flex items-center gap-2 bg-gray-600 p-2 rounded' : 'flex items-center gap-2 p-2 hover:bg-gray-700 rounded'
          }
        >
          <List size={20} />
          Route 2
        </NavLink>
        <NavLink
          to="/route3"
          className={({ isActive }) =>
            isActive ? 'flex items-center gap-2 bg-gray-600 p-2 rounded' : 'flex items-center gap-2 p-2 hover:bg-gray-700 rounded'
          }
        >
          <Map size={20} />
          Route 3
        </NavLink>
        <NavLink
          to="/route4"
          className={({ isActive }) =>
            isActive ? 'flex items-center gap-2 bg-gray-600 p-2 rounded' : 'flex items-center gap-2 p-2 hover:bg-gray-700 rounded'
          }
        >
          <Settings size={20} />
          Route 4
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;