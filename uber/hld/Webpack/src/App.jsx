// src/App.jsx
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Workers from "./components/Workers";

// Lazy load About component
const About = lazy(() => import("./components/About"));

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <Suspense fallback={<h2>Loading...</h2>}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/workers"
          element={
            <Suspense fallback={<h2>Loading...</h2>}>
              <Workers />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
