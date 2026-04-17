import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Notepad from "./pages/Notepad";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:filename" element={<Notepad />} />
      </Routes>
    </BrowserRouter>
  );
}