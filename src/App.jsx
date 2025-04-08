import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';
import RandomItemPage from './pages/RandomItemPage'; // ถ้ามีหน้า UI สุ่ม

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RandomItemPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
