// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Home from './pages/Home';
import Route2 from './components/Route2';
import Route3 from './components/Route3';
import Route4 from './components/Route4';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/route2" element={<Route2 />} />
          <Route path="/route3" element={<Route3 />} />
          <Route path="/route4" element={<Route4 />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;