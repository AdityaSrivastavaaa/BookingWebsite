import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Flight from './pages/Flight.jsx';
import Hotel from './pages/Hotel.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="flight" element={<Flight />} />
        <Route path="hotel" element={<Hotel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
