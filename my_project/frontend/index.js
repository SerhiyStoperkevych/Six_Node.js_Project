import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Hello from './Hello';
import SignUp from './SignUp';

// Create a root
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/hello" element={<Hello />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </Router>
);
