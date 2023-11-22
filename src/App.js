// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DetailPage from "./pages/DetailPage/DetailPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LandingPage from "./pages/LandingPage/LandingPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import IntroScreen from "./pages/IntroScreen/IntroScreen";
import CategoryPage from "./pages/CategoryPage/CategoryPage";

import Header from "./components/header";
import Navigation from "./components/navigation";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<IntroScreen />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/detail/:title/:author/:series" component={DetailPage} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Navigation />
      </Router>
    </div>
  );
}

export default App;
