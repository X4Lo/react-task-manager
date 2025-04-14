import React from "react";
import Navbar from "./components/layout/Navbar";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className="container mx-auto min-h-screen">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects" element={<CartPage />} />
          <Route path="/tasks" element={<CartPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
