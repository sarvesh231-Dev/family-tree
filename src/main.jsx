import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

function TreePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f0e6] text-[#1f2937] p-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold">Family Tree</h2>
        <p className="mt-3">Placeholder — visualization comes next.</p>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tree" element={<TreePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
